import { NextResponse } from "next/server";
import { buildProviderChain, type GenInput } from "@/lib/llm";
import { getClientKey, getQuotaKV, incrementQuotaKV, parseCookieQuota, bumpCookieQuota } from "@/lib/quota";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { starter, format, tone, student, language, draft } = body as {
      starter: any; format: any; tone: string; student: string; language?: string; draft?: string;
    };

    // Determine provider order: env preferred, dev override via query (?provider=openai)
    const url = new URL(req.url);
    const override = url.searchParams.get("provider") as "anthropic" | "openai" | null;
    const preferred = override || (process.env.LLM_PROVIDER === "openai" ? "openai" : "anthropic");
    const chain = buildProviderChain(preferred);

    /* ---------- Monthly quota for anonymous users ---------- */
    const clientKey = await getClientKey(req);
    const hasKV = !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

    let limit = Number(process.env.FREE_TRIAL_LIMIT ?? 5);
    let remaining = limit;

    if (hasKV) {
      const q = await getQuotaKV(clientKey);
      limit = q.limit;
      remaining = q.remaining;
      if (remaining <= 0) {
        return NextResponse.json(
          { error: "Monthly free limit reached. Create an account to continue." },
          { status: 429 }
        );
      }
    } else {
      // cookie fallback
      const cookie = req.headers.get("cookie");
      const used = parseCookieQuota(cookie);
      remaining = Math.max(0, limit - used);
      if (remaining <= 0) {
        return NextResponse.json(
          { error: "Monthly free limit reached. Create an account to continue." },
          { status: 429 }
        );
      }
    }

    const input: GenInput = { starter, format, tone, student, language, draft };

    let lastErr: any;
    for (const provider of chain) {
      try {
        console.log(`Trying provider: ${provider.name}`);
        const text = (await provider.generate(input)).trim();
        if (text) {
          // success: bump quota
          if (hasKV) {
            await incrementQuotaKV(clientKey);
            return NextResponse.json({ text, limit, remaining: remaining - 1 });
          } else {
            const used = (limit - remaining); // current usage
            const res = NextResponse.json({ text, limit, remaining: remaining - 1 });
            res.headers.append("Set-Cookie", bumpCookieQuota(used));
            return res;
          }
        }
      } catch (e) {
        console.error(`Provider ${provider.name} failed:`, e);
        lastErr = e;
        // try next provider
      }
    }

    // Fallback to mock if all providers fail
    console.log('All providers failed, using fallback');
    const mockResponse = await generateMockResponse({
      starter,
      format,
      tone,
      student: student || "your child",
      language: language || "English",
      draft
    });

    // Still increment quota for mock response
    if (hasKV) {
      await incrementQuotaKV(clientKey);
      return NextResponse.json({ text: mockResponse, limit, remaining: remaining - 1 });
    } else {
      const used = (limit - remaining);
      const res = NextResponse.json({ text: mockResponse, limit, remaining: remaining - 1 });
      res.headers.append("Set-Cookie", bumpCookieQuota(used));
      return res;
    }

  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    );
  }
}

async function generateMockResponse({
  starter,
  format,
  tone,
  student,
  language,
  draft
}: {
  starter: string;
  format: string;
  tone: string;
  student: string;
  language: string;
  draft?: string;
}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Clean up draft if provided (fix spacing and punctuation)
  const cleanDraft = draft ? cleanupText(draft) : null;

  // Generate based on starter type and format
  if (format === 'sms') {
    return generateSMS(starter, tone, student, cleanDraft);
  } else {
    return generateEmail(starter, tone, student, cleanDraft);
  }
}

function cleanupText(text: string): string {
  // Fix common issues: missing spaces, punctuation
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add spaces between lowercase and uppercase
    .replace(/([.!?])([A-Za-z])/g, '$1 $2') // Add spaces after punctuation
    .replace(/\s+/g, ' ') // Normalize multiple spaces
    .replace(/([a-z])([.!?])/g, '$1$2') // Ensure punctuation stays attached
    .trim();
}

function generateSMS(starter: string, tone: string, student: string, draft?: string | null): string {
  const toneAdjective = getToneAdjective(tone);
  
  switch (starter) {
    case 'behaviour':
      return draft 
        ? `Hi! I wanted to share that ${student} has been showing ${toneAdjective} progress with classroom behavior. Let's continue supporting this positive growth together.`
        : `Hi! ${student} had a great day with positive classroom behavior. Thanks for your support at home!`;
        
    case 'praise':
      return draft
        ? `Hi! ${student} really stood out today with excellent work and positive attitude. So proud of their efforts!`
        : `Hi! ${student} did amazing work today and showed great effort. Well done!`;
        
    case 'homework':
      return draft
        ? `Hi! Just a quick note about ${student}'s homework completion. Let's work together to establish a consistent routine.`
        : `Hi! ${student}'s homework needs attention. Happy to discuss strategies that might help at home.`;
        
    case 'attendance':
      return draft
        ? `Hi! I wanted to touch base about ${student}'s recent attendance. Regular attendance really helps with learning continuity.`
        : `Hi! ${student} has been missing some school days. Let me know if there's anything I can help with.`;
        
    default:
      return `Hi! ${student} is doing well in class. Thanks for your continued support!`;
  }
}

function generateEmail(starter: string, tone: string, student: string, draft?: string | null): string {
  const greeting = `Hi there!`;
  const closing = getToneClosing(tone);
  
  switch (starter) {
    case 'behaviour':
      if (draft) {
        return `${greeting}

I wanted to share some observations about ${student}'s behavior in class. I've noticed they're making positive efforts to follow classroom expectations and interact respectfully with classmates.

This kind of growth shows real maturity, and it's making a positive impact on our learning environment. At home, you might continue reinforcing these same expectations to help maintain this momentum.

${closing}`;
      } else {
        return `${greeting}

${student} has been showing excellent behavior in class this week. They're following directions well, treating classmates with respect, and contributing positively to our classroom community.

I wanted to make sure you knew about this positive growth. Your support at home clearly makes a difference!

${closing}`;
      }
      
    case 'praise':
      if (draft) {
        return `${greeting}

I had to reach out and share how impressed I am with ${student}'s recent work and attitude in class. They've been putting in excellent effort and it really shows in their contributions.

This kind of dedication is exactly what helps students succeed, and ${student} should be proud of their hard work. Please let them know how pleased I am with their progress.

${closing}`;
      } else {
        return `${greeting}

${student} has been doing outstanding work lately! Their effort, participation, and positive attitude have been wonderful to see in class.

I wanted to make sure you heard about their excellent progress. They should be very proud of their achievements.

${closing}`;
      }
      
    case 'homework':
      if (draft) {
        return `${greeting}

I wanted to touch base about ${student}'s homework completion. We've had some inconsistency lately, and I'd love to work with you on strategies to support them at home.

Consistent homework completion really helps reinforce what we're learning in class. Perhaps we could discuss setting up a regular homework routine or breaking assignments into smaller chunks.

Please let me know what might work best for your family, and I'm happy to adjust assignments as needed.

${closing}`;
      } else {
        return `${greeting}

I wanted to check in about ${student}'s homework completion. We've noticed some missing assignments recently, and I'd like to work together to support them.

Regular homework helps reinforce classroom learning and builds important study habits. I'm happy to discuss strategies that might work well for your family's routine.

Would you be available for a quick chat about how we can best support ${student}?

${closing}`;
      }
      
    case 'attendance':
      if (draft) {
        return `${greeting}

I wanted to reach out regarding ${student}'s recent attendance. Regular school attendance is so important for keeping up with our lessons and maintaining connections with classmates.

I understand that life can get busy, and there may be circumstances I'm not aware of. I'm here to support ${student} and your family however I can.

Please let me know if there's anything affecting attendance that I should be aware of, or if there are ways I can help ${student} feel more connected to our classroom community.

${closing}`;
      } else {
        return `${greeting}

I've noticed ${student} has missed several days recently, and I wanted to check in with you. Regular attendance helps students stay connected with lessons and classmates.

I'm here to support ${student} in any way I can. If there are challenges affecting attendance, please don't hesitate to reach out so we can work together.

Looking forward to seeing ${student} back in class soon!

${closing}`;
      }
      
    default:
      return `${greeting}

I wanted to share a quick update about ${student}. They're doing well in class and I appreciate your continued support at home.

If you have any questions or concerns, please don't hesitate to reach out.

${closing}`;
  }
}

function getToneAdjective(tone: string): string {
  switch (tone) {
    case 'supportive': return 'encouraging';
    case 'concise': return 'steady';
    case 'friendly': return 'wonderful';
    case 'formal': return 'consistent';
    default: return 'positive';
  }
}

function getToneClosing(tone: string): string {
  switch (tone) {
    case 'supportive': 
      return `Thanks for being such a supportive partner in your child's education. Please feel free to reach out anytime!

Best regards,
[Your name]`;
    case 'concise':
      return `Please let me know if you have any questions.

Best,
[Your name]`;
    case 'friendly':
      return `Thanks so much for all you do to support learning at home! Feel free to reach out anytime.

Warm regards,
[Your name]`;
    case 'formal':
      return `Thank you for your continued support of your child's education. Please do not hesitate to contact me with any questions or concerns.

Sincerely,
[Your name]`;
    default:
      return `Please feel free to reach out if you have any questions.

Best regards,
[Your name]`;
  }
}
import { NextResponse } from "next/server";
import { buildProviderChain, type GenInput } from "@/lib/llm";
import { getClientKey, getQuotaKV, incrementQuotaKV, parseCookieQuota, bumpCookieQuota } from "@/lib/quota";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { starter, format, tone, student, language, draft, mode } = body as {
      starter: any; format: any; tone: string; student: string; language?: string; draft?: string; mode?: 'generate' | 'improve';
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

    const input: GenInput = { starter, format, tone, student, language, draft, mode: mode || 'generate' };

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
      draft,
      mode: mode || 'generate'
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
  draft,
  mode
}: {
  starter: string;
  format: string;
  tone: string;
  student: string;
  language: string;
  draft?: string;
  mode?: 'generate' | 'improve';
}) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // For improve mode, require draft
  if (mode === 'improve') {
    if (!draft?.trim()) {
      throw new Error("No draft provided for improvement.");
    }
    // Improve the draft while preserving its content
    if (format === 'sms') {
      return improveSMS(draft, tone, student);
    } else {
      return improveEmail(draft, tone, student);
    }
  } else {
    // Generate mode - optionally use draft as context
    if (format === 'sms') {
      return generateSMS(starter, tone, student, draft);
    } else {
      return generateEmail(starter, tone, student, draft);
    }
  }
}

function improveSMS(draft: string, tone: string, student: string): string {
  // Rewrite draft as SMS - keep it short and clear
  const essence = draft.toLowerCase().includes('positive') || draft.toLowerCase().includes('good') || draft.toLowerCase().includes('great')
    ? 'positive'
    : draft.toLowerCase().includes('concern') || draft.toLowerCase().includes('issue')
    ? 'concern'
    : 'update';
    
  switch (essence) {
    case 'positive':
      return `Hi! ${student} had a wonderful day today. Their effort and positive attitude really stood out. Thanks for your support!`;
    case 'concern':
      return `Hi! I wanted to check in about ${student}. Let's work together to support them. Happy to discuss strategies.`;
    default:
      return `Hi! Quick update about ${student}. They're doing well and I appreciate your partnership in their learning.`;
  }
}

function improveEmail(draft: string, tone: string, student: string): string {
  // Rewrite draft as a polished email while preserving the core message
  const greeting = 'Hi there!';
  const closing = getToneClosing(tone);
  
  // Detect the sentiment and main message
  const isPositive = draft.toLowerCase().includes('positive') || draft.toLowerCase().includes('good') || draft.toLowerCase().includes('great') || draft.toLowerCase().includes('excellent');
  const isConcern = draft.toLowerCase().includes('concern') || draft.toLowerCase().includes('issue') || draft.toLowerCase().includes('difficult') || draft.toLowerCase().includes('challenge');
  
  if (isPositive) {
    return `${greeting}

I wanted to reach out and share some positive news about ${student}. They've been making excellent progress and showing wonderful effort in class.

Their positive attitude and dedication have been noticed by both myself and their classmates. It's clear that the support you provide at home is making a real difference.

Please let ${student} know how proud I am of their continued growth and achievements.

${closing}`;
  } else if (isConcern) {
    return `${greeting}

I wanted to reach out regarding ${student} and some observations I've made in class recently. I believe it would be helpful for us to work together to support them.

I've noticed some areas where ${student} might benefit from additional support, and I'd love to discuss strategies that could help both at school and at home.

Would you be available for a brief conversation about how we can best support ${student}'s continued success?

${closing}`;
  } else {
    return `${greeting}

I wanted to share a quick update about ${student}. They continue to be an important part of our classroom community.

I appreciate the support you provide at home, which helps create consistency between school and home. This partnership makes such a difference in ${student}'s learning experience.

Please feel free to reach out if you have any questions or if there's anything specific you'd like to discuss about ${student}'s progress.

${closing}`;
  }
}

function generateSMS(starter: string, tone: string, student: string, draft?: string): string {
  const toneAdjective = getToneAdjective(tone);
  
  switch (starter) {
    case 'behaviour':
      if (draft) {
        return `Hi! I wanted to share that ${student} has been showing ${toneAdjective} progress with classroom behavior. Let's continue supporting this positive growth together.`;
      } else {
        return `Hi! ${student} had a great day with positive classroom behavior. Thanks for your support at home!`;
      }
        
    case 'praise':
      if (draft) {
        return `Hi! ${student} really stood out today with excellent work and positive attitude. So proud of their efforts!`;
      } else {
        return `Hi! ${student} did amazing work today and showed great effort. Well done!`;
      }
        
    case 'homework':
      if (draft) {
        return `Hi! Just a quick note about ${student}'s homework completion. Let's work together to establish a consistent routine.`;
      } else {
        return `Hi! ${student}'s homework needs attention. Happy to discuss strategies that might help at home.`;
      }
        
    case 'attendance':
      if (draft) {
        return `Hi! I wanted to touch base about ${student}'s recent attendance. Regular attendance really helps with learning continuity.`;
      } else {
        return `Hi! ${student} has been missing some school days. Let me know if there's anything I can help with.`;
      }
        
    default:
      return `Hi! ${student} is doing well in class. Thanks for your continued support!`;
  }
}

function generateEmail(starter: string, tone: string, student: string, draft?: string): string {
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
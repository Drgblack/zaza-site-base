import { NextRequest, NextResponse } from "next/server";
import { getClientIP, checkLimit } from "../route";

const DAILY_FREE_GEN = 5;

const rewriteSystemPrompt = `You are Promptly's Comment Agent. You rewrite a teacher's draft for a parent/caregiver audience.
Rules: keep all facts, names, dates/times; remove jargon and judgments; no diagnoses; kind, clear, specific; short sentences; 90–140 words unless SMS; invite a reply; respectful, collaborative tone.
Structure:
1) Warm opener + purpose
2) Specific positives (infer one if none supplied)
3) Observation as facts + impact on learning
4) Collaborative next step(s)
5) Invite reply + supportive close`;

function buildRewritePrompt(body: any): string {
  const { language = "English", tone = "Supportive", format = "default", length = 110, yourNote = "" } = body;
  
  return `Language: ${language}
Tone: ${tone}
Output format: ${format}
Length target: ${Math.max(60, Math.min(180, length))} words
Draft to improve (verbatim):
"""
${yourNote.trim()}
"""
Return only the improved message.`;
}

// TODO: Replace with actual LLM call (OpenAI, Claude, etc.)
async function rewriteWithLLM({ system, user }: { system: string; user: string }): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Parse the user prompt to extract details for a realistic demo response
  const languageMatch = user.match(/Language: (.+)/);
  const toneMatch = user.match(/Tone: (.+)/);
  const formatMatch = user.match(/Output format: (.+)/);
  const draftMatch = user.match(/Draft to improve \(verbatim\):\s*"""\s*([\s\S]*?)\s*"""/);
  
  const language = languageMatch?.[1] || "English";
  const tone = toneMatch?.[1] || "Supportive";
  const format = formatMatch?.[1] || "default";
  const originalDraft = draftMatch?.[1] || "";
  
  if (!originalDraft) {
    throw new Error("No draft provided to improve");
  }
  
  // Extract names and preserve them
  const nameMatches = originalDraft.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g) || [];
  const studentName = nameMatches.find(name => 
    !['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(name)
  ) || "your child";
  
  // Generate improved version based on draft content
  if (originalDraft.toLowerCase().includes('homework') || originalDraft.toLowerCase().includes('assignment')) {
    return `Hi! I hope you're doing well.

I wanted to touch base about ${studentName}'s recent assignments. They bring such great energy to our classroom discussions and always ask thoughtful questions.

I've noticed a few assignments haven't made it in yet, and I know how busy family life can be! Staying on top of homework can be challenging with everything going on.

Would it help to set up a simple reminder system or adjust the routine? I'm happy to work together to find what works best for your family.

Please feel free to reach out if you need any clarification on assignments or want to chat about support strategies.

Looking forward to hearing from you,
Ms. Johnson`;
  }
  
  if (originalDraft.toLowerCase().includes('behavior') || originalDraft.toLowerCase().includes('disrupting')) {
    return `Hello! I wanted to share a quick update about ${studentName}'s week.

${studentName} has so many wonderful qualities and contributes positively to our classroom community in many ways. I've noticed some moments where they're having trouble staying focused during lesson time.

This is completely normal for this developmental stage, and with some consistent strategies, I know ${studentName} will continue to grow. 

Would you be open to chatting about some simple approaches we could try both at home and school? Working together usually makes the biggest difference.

Please let me know if you'd like to set up a quick call this week. I'm here to support ${studentName}'s success!

Warm regards,
Ms. Johnson`;
  }
  
  // Default improvement - make any draft more parent-friendly
  return `Hi there! I hope you're having a good week.

I wanted to reach out about ${studentName} and share some thoughts from our classroom. They bring such positive energy and have many strengths that contribute to our learning community.

I've been thinking about how we can best support their continued growth, and I'd love to hear your perspective on how things are going at home.

Would you be available for a brief conversation this week? Your insights always help me understand how to best support ${studentName}.

Thank you for being such a wonderful partner in their education. Please feel free to reach out anytime!

Best,
Ms. Johnson`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userIP = getClientIP(req);
    
    // Check generation limit (shared with regular generation)
    const genLimit = checkLimit(`gen:${userIP}`, DAILY_FREE_GEN);
    if (genLimit.limited) {
      return NextResponse.json({ 
        limited: true, 
        message: "Daily generation limit reached. Start a free trial for unlimited access.",
        remaining: 0
      }, { status: 429 });
    }

    if (!body.yourNote || !body.yourNote.trim()) {
      return NextResponse.json({ 
        error: "No note provided to improve" 
      }, { status: 400 });
    }

    const userPrompt = buildRewritePrompt(body);
    const text = await rewriteWithLLM({ 
      system: rewriteSystemPrompt, 
      user: userPrompt 
    });

    return NextResponse.json({
      text,
      remaining: genLimit.remaining,
      watermark: true,
      type: 'rewrite'
    });
    
  } catch (error) {
    console.error('Snippet rewrite error:', error);
    return NextResponse.json({ 
      error: "Something went wrong. Please try again." 
    }, { status: 500 });
  }
}
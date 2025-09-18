import { NextRequest, NextResponse } from "next/server";
import { snippetSystem, buildUserPrompt } from "@/lib/snippetPrompt";

const DAILY_FREE_GEN = 5;
const DAILY_FREE_COPIES = 3;

export function getClientIP(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
         req.headers.get("x-real-ip") || 
         "127.0.0.1";
}

// Simple in-memory rate limiting (replace with Redis/KV in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export function checkLimit(key: string, max: number): { count: number; remaining: number; limited: boolean } {
  const now = Date.now();
  const today = new Date().toDateString();
  const fullKey = `${key}:${today}`;
  
  const existing = rateLimitStore.get(fullKey);
  if (!existing || now > existing.resetTime) {
    // Reset daily at midnight
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    rateLimitStore.set(fullKey, { count: 1, resetTime: tomorrow.getTime() });
    return { count: 1, remaining: max - 1, limited: false };
  }
  
  existing.count++;
  rateLimitStore.set(fullKey, existing);
  return { 
    count: existing.count, 
    remaining: Math.max(0, max - existing.count),
    limited: existing.count > max
  };
}

// TODO: Replace with actual LLM call (OpenAI, Claude, etc.)
async function generateWithLLM({ system, user }: { system: string; user: string }): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Parse the user prompt to extract details for a realistic demo response
  const topicMatch = user.match(/Topic: (.+)/);
  const studentMatch = user.match(/Student name \(optional\): (.+)/);
  const toneMatch = user.match(/Tone: (.+)/);
  const languageMatch = user.match(/Language: (.+)/);
  const positivesMatch = user.match(/- Positives: (.+)/);
  const focusMatch = user.match(/- Focus: (.+)/);
  const nextMatch = user.match(/- Next steps: (.+)/);
  
  const topic = topicMatch?.[1] || "general update";
  const student = studentMatch?.[1] !== "not provided" ? studentMatch?.[1] : "your child";
  const tone = toneMatch?.[1] || "Supportive";
  const language = languageMatch?.[1] || "English";
  const positives = positivesMatch?.[1] !== "none" ? positivesMatch?.[1] : "";
  const focus = focusMatch?.[1] !== "none" ? focusMatch?.[1] : "";
  const next = nextMatch?.[1] !== "none" ? nextMatch?.[1] : "";
  
  // Generate contextual response based on topic
  if (topic.includes("behaviour")) {
    return `Hi there! I wanted to share a quick update about ${student}'s week in class.

${positives ? positives + ". " : ""}${student} has been showing great effort in our classroom community. I've noticed ${focus || "some areas where we can work together to help them succeed even more"}.

This is very normal for this stage of learning, and with some consistent support, I know ${student} will continue to grow. ${next ? next + ". " : "Let's work together on a simple strategy that supports them both at home and school."}

Please feel free to reach out if you'd like to chat more about how we can best support ${student}. I'm here to help!

Warm regards,
Ms. Johnson`;
  }
  
  if (topic.includes("praise")) {
    return `Hello! I hope you're having a wonderful week.

I wanted to take a moment to share some lovely news about ${student}. ${positives || "They've been showing such wonderful growth in class"}. It's been a joy to see their confidence building.

${focus ? focus + ". " : "I'm particularly impressed with their willingness to try new challenges and support their classmates."} ${student} is developing into such a thoughtful learner.

${next || "Please ask them about their favorite part of our recent projects - I think you'll love hearing their perspective!"}

Thank you for the support you provide at home. It truly makes all the difference.

Best wishes,
Ms. Johnson`;
  }
  
  if (topic.includes("homework")) {
    return `Hi! I hope this message finds you well.

I wanted to touch base about ${student}'s assignments this week. ${positives || `${student} is such an engaged participant in our class discussions`}. 

We've noticed a few missing assignments lately, and I know how busy life can get! ${focus || "Staying on top of homework"} can be tricky, especially with everything families are juggling.

${next || "Would it help to set up a simple routine or reminder system?"} I'm happy to work with you to find strategies that fit your family's schedule.

Please don't hesitate to reach out if there's anything I can do to support ${student} - or if you need any clarification on assignments.

Looking forward to hearing from you,
Ms. Johnson`;
  }
  
  if (topic.includes("attendance")) {
    return `Hello! I wanted to reach out about ${student}'s attendance this week.

${positives || `${student} brings such positive energy to our classroom`}. When they're here, they contribute so much to our learning community.

I've noticed ${focus || "some missed days recently"}, and I want to make sure ${student} doesn't fall behind on the important concepts we're covering.

${next || "If there are any challenges with morning routines or transportation, please let me know how I can help."} We want to support your family in every way we can.

${student} is valued in our classroom, and we miss them when they're not here!

Warm regards,
Ms. Johnson`;
  }
  
  // Default general check-in
  return `Hi there! I hope you're doing well.

I wanted to reach out for a quick check-in about ${student}. ${positives || "They're such a wonderful addition to our classroom community"}. 

I've been thinking about ${focus || "how we can continue supporting their growth"}, and I'd love to hear your perspective on how things are going at home.

${next || "Perhaps we could have a brief chat this week if you have a few minutes?"} Your insights always help me understand how to best support ${student}.

Thank you for being such a supportive partner in ${student}'s education. Please feel free to reach out anytime!

Best,
Ms. Johnson`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userIP = getClientIP(req);
    
    // Check generation limit
    const genLimit = checkLimit(`gen:${userIP}`, DAILY_FREE_GEN);
    if (genLimit.limited) {
      return NextResponse.json({ 
        limited: true, 
        message: "Daily generation limit reached. Start a free trial for unlimited access.",
        remaining: 0
      }, { status: 429 });
    }

    const userPrompt = buildUserPrompt(body);
    const text = await generateWithLLM({ 
      system: snippetSystem, 
      user: userPrompt 
    });

    return NextResponse.json({
      text,
      remaining: genLimit.remaining,
      watermark: true
    });
    
  } catch (error) {
    console.error('Snippet generation error:', error);
    return NextResponse.json({ 
      error: "Something went wrong. Please try again." 
    }, { status: 500 });
  }
}

// Copy counter endpoint
export async function PUT(req: NextRequest) {
  try {
    const userIP = getClientIP(req);
    const copyLimit = checkLimit(`copy:${userIP}`, DAILY_FREE_COPIES);
    
    if (copyLimit.limited) {
      return NextResponse.json({ 
        limited: true, 
        message: "Daily copy limit reached. Start a free trial to copy unlimited messages.",
        remaining: 0
      }, { status: 429 });
    }
    
    return NextResponse.json({ 
      remaining: copyLimit.remaining,
      success: true
    });
    
  } catch (error) {
    console.error('Copy limit check error:', error);
    return NextResponse.json({ 
      error: "Something went wrong." 
    }, { status: 500 });
  }
}
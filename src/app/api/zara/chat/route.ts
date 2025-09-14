// src/app/api/zara/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

type Tone = "neutral" | "warm" | "formal" | "friendly";
type ContextType = "parent_email" | "report_comment" | "student_feedback" | "staff_note";

interface ApiRequest {
  message: string;
  context?: {
    type?: ContextType;
    grade?: string | null;
    language?: string;
    tone?: Tone;
  };
  userPrefs?: {
    defaultTone?: Tone;
    defaultLanguage?: string;
  };
}

interface ApiResponse {
  text: string;
  explanation: string;
  alternatives: string[];
}

const SYSTEM_PROMPT = `
You are **Zara**, a concise, on-demand writing helper for teachers.
Your job: turn rough notes into clear, kind, professional messages across:
- parent emails
- report card comments and progress notes
- student feedback
- staff/admin notes

Rules:
- Be clear, concise, and kind. No slang. No filler.
- Respect requested tone and language. If none provided, use the user's defaults.
- NEVER invent facts, dates, grades, or attendance details. If missing, ask briefly.
- For report comments: avoid grades/marks unless provided. Focus on observable behavior, growth, next steps.
- For parent emails: be empathetic, action-forward, no confidential PII.
- For student feedback: specific, growth-oriented, short.
- For staff notes: neutral, factual, time-efficient.
- Always include a one-line explanation of what you changed and why (e.g., "Tightened repetition; clarified the request.")
- Provide up to 3 short alternative phrasings when asked, each on a new line.
- Keep outputs compact-teachers are busy.

Safety:
- Do not reveal private student info. If input contains sensitive data, generalize it (e.g., "the student").
- Do not fabricate policy references; if asked, suggest confirming school policy.
- If an instruction conflicts with safety, follow safety.
`.trim();

function basicRedactPII(input: string): string {
  // light-touch scrubbing; we avoid over-scrubbing teacher context
  return input
    // emails
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted email]")
    // phone numbers (very rough)
    .replace(/\+?\d[\d\s().-]{7,}\d/g, "[redacted number]");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as ApiRequest;
    
    if (!body?.message || typeof body.message !== "string") {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const message = basicRedactPII(body.message).slice(0, 4000); // clamp long inputs
    const tone = body.context?.tone || body.userPrefs?.defaultTone || "neutral";
    const language = body.context?.language || body.userPrefs?.defaultLanguage || "en";
    const ctype = body.context?.type || "parent_email";

    const userInstruction = `
Language: ${language}
Tone: ${tone}
Context: ${ctype}
Grade (if any): ${body.context?.grade ?? "none"}

User text:
"""${message}"""

Tasks:
1) Produce the best single improved version for this context.
2) Provide a one-line explanation of your edits.
3) Provide 3 concise alternative phrasings.

Return as JSON with keys: text, explanation, alternatives (array of 3).
`.trim();

    // ---- OpenAI (fetch) ----
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: "Service temporarily unavailable", 
          message: "AI assistance is currently disabled. Please try again later or contact support."
        }, 
        { status: 503 }
      );
    }

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.4,
        max_tokens: 600,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userInstruction },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!r.ok) {
      const text = await r.text();
      console.error('OpenAI API Error:', r.status, text);
      return NextResponse.json(
        { 
          error: "AI service temporarily unavailable", 
          message: "Please try again in a moment. If the problem persists, contact support."
        }, 
        { status: 503 }
      );
    }

    const data = await r.json();
    const parsed = JSON.parse(data.choices?.[0]?.message?.content ?? "{}");

    const payload: ApiResponse = {
      text: parsed.text ?? "",
      explanation: parsed.explanation ?? "",
      alternatives: Array.isArray(parsed.alternatives) ? parsed.alternatives.slice(0, 3) : [],
    };
    
    return NextResponse.json(payload);
  } catch (e: unknown) {
    console.error('Zara API Error:', e);
    return NextResponse.json(
      { 
        error: "Service temporarily unavailable", 
        message: "An unexpected error occurred. Please try again later."
      }, 
      { status: 500 }
    );
  }
}

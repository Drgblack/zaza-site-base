// lib/llm.ts
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

export type GenInput = {
  starter: "behaviour" | "praise" | "homework" | "attendance";
  format: "email" | "sms";
  tone: string;
  student: string;
  language?: string;
  draft?: string;
  mode?: 'generate' | 'improve';
};

export interface LLMProvider {
  name: "anthropic" | "openai";
  generate(input: GenInput): Promise<string>;
}

const baseSystem = `
You are an assistant that writes concise, professional, parent-ready messages for K-12 teachers.
You ALWAYS:
- keep a supportive, empathetic tone
- keep messages skimmable (short paragraphs, bullets when helpful)
- never disclose sensitive info
- avoid jargon and absolutes
`.trim();

function buildPrompt(inp: GenInput): { system: string; user: string } {
  const isImprove = inp.mode === 'improve';
  
  if (isImprove) {
    if (!inp.draft?.trim()) {
      throw new Error("No draft provided for improvement.");
    }
    
    const improveUser = `
Rewrite the teacher's draft into a polished ${inp.format} in a ${inp.tone} tone about ${inp.student}.
Keep meaning intact but improve clarity, grammar, and warmth.
Return only the final ${inp.format}:

Teacher's draft:
"""${inp.draft.trim()}"""
`.trim();
    
    return { system: baseSystem, user: improveUser };
  } else {
    // Generate mode
    const genUser = `
Context:
- Student: ${inp.student}
- Tone: ${inp.tone}
- Format: ${inp.format} (e.g., email/SMS), include an appropriate greeting and sign-off for ${inp.format}.
- Scenario starter: ${inp.starter}

${inp.draft?.trim() ? `Teacher notes (optional, summarize and integrate):\n"""${inp.draft.trim()}"""` : ""}

Task:
Write a polished ${inp.format} to the parent/guardian about ${inp.student}, aligned to the tone and scenario.
Keep it clear, kind, and specific. Prefer short paragraphs and minimal fluff.
`.trim();
    
    return { system: baseSystem, user: genUser };
  }
}

/* ---------------- Anthropic ---------------- */

export class AnthropicProvider implements LLMProvider {
  name = "anthropic" as const;
  private client: Anthropic;

  constructor(apiKey?: string) {
    this.client = new Anthropic({ apiKey: apiKey || process.env.ANTHROPIC_API_KEY! });
  }

  async generate(inp: GenInput): Promise<string> {
    const { system, user } = buildPrompt(inp);
    const res = await this.client.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 350,
      temperature: 0.4,
      system,
      messages: [{ role: "user", content: user }],
    });

    // @anthropic returns content blocks
    const text = res.content?.[0]?.type === "text" ? res.content[0].text : "";
    return (text || "").trim();
  }
}

/* ---------------- OpenAI ---------------- */

export class OpenAIProvider implements LLMProvider {
  name = "openai" as const;
  private client: OpenAI;

  constructor(apiKey?: string) {
    this.client = new OpenAI({ apiKey: apiKey || process.env.OPENAI_API_KEY! });
  }

  async generate(inp: GenInput): Promise<string> {
    const { system, user } = buildPrompt(inp);
    // gpt-4o-mini is fast/cheap; use gpt-4o if you prefer
    const res = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const text = res.choices?.[0]?.message?.content ?? "";
    return (text || "").trim();
  }
}

/* ---------------- Wiring + Fallback ---------------- */

export function buildProviderChain(preferred: "anthropic" | "openai") {
  const anth = new AnthropicProvider();
  const oai = new OpenAIProvider();
  return preferred === "openai" ? [oai, anth] : [anth, oai];
}
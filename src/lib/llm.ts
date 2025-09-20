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
};

export interface LLMProvider {
  name: "anthropic" | "openai";
  generate(input: GenInput): Promise<string>;
}

const SYSTEM_PROMPT = `
You are a helpful assistant for teachers writing short, professional parent messages.
- Always fix missing spaces and punctuation in the teacher's draft, if any.
- Keep it warm, respectful, and professional.
- Use the selected TONE.
- Use FORMAT: Email or SMS. Write SMS ~1–2 short sentences. Email can be 3–6 sentences.
- Starter types guide the focus:
  • Behaviour: observation + impact + collaborative next step.
  • Praise: specific positive behavior + impact + encouragement.
  • Homework: status + expectation + support options.
  • Attendance: status + impact + next step.
- Personalize with the STUDENT name where appropriate.
- Write in the selected LANGUAGE if provided.
- NEVER just repeat the draft. Always rewrite for clarity and kindness.
- Avoid sensitive data; keep it parent-friendly.
`;

function buildUserPrompt(inp: GenInput) {
  return `
STARTER: ${inp.starter}
FORMAT: ${inp.format}
TONE: ${inp.tone}
STUDENT: ${inp.student || "the student"}
LANGUAGE: ${inp.language || "English"}

TEACHER_DRAFT (may have no spaces/punctuation):
${inp.draft || "(none)"}

Please produce ONLY the message body (no subject).
`.trim();
}

/* ---------------- Anthropic ---------------- */

export class AnthropicProvider implements LLMProvider {
  name: "anthropic" = "anthropic";
  private client: Anthropic;

  constructor(apiKey?: string) {
    this.client = new Anthropic({ apiKey: apiKey || process.env.ANTHROPIC_API_KEY! });
  }

  async generate(inp: GenInput): Promise<string> {
    const res = await this.client.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 350,
      temperature: 0.4,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: buildUserPrompt(inp) }],
    });

    // @anthropic returns content blocks
    const text = res.content?.[0]?.type === "text" ? res.content[0].text : "";
    return (text || "").trim();
  }
}

/* ---------------- OpenAI ---------------- */

export class OpenAIProvider implements LLMProvider {
  name: "openai" = "openai";
  private client: OpenAI;

  constructor(apiKey?: string) {
    this.client = new OpenAI({ apiKey: apiKey || process.env.OPENAI_API_KEY! });
  }

  async generate(inp: GenInput): Promise<string> {
    // gpt-4o-mini is fast/cheap; use gpt-4o if you prefer
    const res = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(inp) },
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
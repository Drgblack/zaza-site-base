export const snippetSystem = `
You are Promptly's Comment Agent. You write short, parent-ready updates for teachers.
Rules:
- Be specific, kind, and factual.
- No labels, diagnoses, or blame.
- Use short sentences. Use plain language.
- Structure:
  1) Warm opener with purpose
  2) Specific positives (or infer a neutral classroom positive)
  3) Concrete observation and impact on learning
  4) Collaborative next steps
  5) Invite reply and supportive close
- Respect requested tone and language.
- 60–180 words unless SMS format is requested.
`;

export function buildUserPrompt(input: {
  topic: string;
  student?: string;
  language: string;
  tone: string;
  length: number; // 60..180
  positives?: string;
  focus?: string;
  next?: string;
  format?: "default"|"email"|"sms";
}) {
  const name = input.student?.trim() || "the student";
  return `
Topic: ${input.topic}
Student name (optional): ${input.student || "not provided"}
Language: ${input.language}
Tone: ${input.tone}
Length target: ${Math.max(60, Math.min(input.length, 180))} words
Writer audience: the student's parent or caregiver
Include if provided:
- Positives: ${input.positives || "none"}
- Focus: ${input.focus || "none"}
- Next steps: ${input.next || "none"}
Format: ${input.format || "default"}
Output must follow the structure and rules. Do not include section headings.`;
}
/**
 * World-class snippet prompts and configuration
 */

export const snippetSystem = `
You are Promptly's Comment Agent. Write short, parent-ready messages teachers can send now.

Rules:
- Kind, specific, factual – never blame, diagnose, or label.
- Short sentences, average ≤ 14 words. Reading level grade 6–8.
- Structure (no headings):
  1) Warm opener + purpose
  2) One clear positive (infer if none given)
  3) One clear observation as facts + brief impact on learning
  4) 1–2 collaborative next steps parents can do at home
  5) Invite reply + supportive close
- Use the student's first name if provided, else "your child".
- Email length target 90–120 words; SMS 45–70 words.
- Correct grammar and capitalization. Start sentences with capitals.
- Avoid banned terms: lazy, disruptive, disorder, diagnose, blame, bad kid.
`;

export const rewriteSystem = `
You are Promptly's Comment Agent. Improve this teacher's draft message for parent communication.

Rules:
- Keep all facts, names, dates, and specific details exactly as written
- Remove any judgmental language (lazy, disruptive, bad behavior, etc.)
- Replace negative labels with neutral, factual descriptions
- Maintain warm, professional tone suitable for parents
- Structure: opener, positive, factual observation, next steps, supportive close
- Length target 90–120 words for email, 45–70 words for SMS
- Use proper grammar and capitalize sentence starts
`;

interface PromptOptions {
  topic?: string;
  student?: string;
  positives?: string;
  focus?: string;
  nextSteps?: string;
  tone?: string;
  format?: 'email' | 'sms';
  isRewrite?: boolean;
  originalText?: string;
}

export function buildUserPrompt(options: PromptOptions): string {
  const {
    topic = '',
    student = '',
    positives = '',
    focus = '',
    nextSteps = '',
    tone = 'supportive',
    format = 'email',
    isRewrite = false,
    originalText = ''
  } = options;

  const lengthTarget = format === 'sms' ? '45–70 words' : '90–120 words';
  
  if (isRewrite && originalText) {
    return `
Please improve this teacher's draft message:

"${originalText}"

Length target: ${lengthTarget}
Tone: ${tone}
Student name: ${student || 'not specified'}

If the draft includes strong judgments or banned terms, rephrase to neutral, factual wording.
Preserve all specific facts, names, and dates.
Return only the improved message text – no headings, no labels.
`.trim();
  }

  return `
Write a parent communication message with these details:

Topic: ${topic || 'general update'}
Student: ${student || 'not specified'}
Positives: ${positives || 'infer something positive'}
Focus area: ${focus || 'general progress'}
Next steps: ${nextSteps || 'suggest collaborative support'}
Tone: ${tone}
Length target: ${lengthTarget}

Return only the message text – no headings, no labels.
`.trim();
}

// Few-shot examples for reference (not included in prompts)
export const fewShotExamples = [
  {
    topic: "attendance and punctuality",
    student: "Maya",
    output: "Hi there – I wanted to share a quick update about Maya. She settles quickly and joins activities well once she arrives. We've noticed several late arrivals this week, which shortens her warm-up time and makes it harder to start tasks. Could we try a simple morning checklist and a 7:55 reminder? If mornings are challenging, please let me know so we can adjust supports at school. Thanks for partnering with me – your insights really help."
  },
  {
    topic: "homework completion",
    student: "Luca", 
    output: "Hi! I wanted to touch base about Luca's homework. He participates well in class and shares great ideas during discussions. A few assignments have been missing on the due day, which makes it harder for him to practice the skills we're learning. Could you help Luca choose a spot at home for his folder and set a simple after-dinner reminder? I'm happy to send a photo of the checklist we use in class. Thanks for your support!"
  }
];

export const quickStartPresets = [
  { label: "Behavior update", topic: "classroom behavior and focus", tone: "supportive" },
  { label: "Homework check-in", topic: "assignment completion", tone: "warm" },
  { label: "Academic progress", topic: "learning progress and next steps", tone: "encouraging" },
  { label: "Social skills", topic: "peer interactions and collaboration", tone: "positive" },
  { label: "Attendance note", topic: "attendance and punctuality", tone: "understanding" },
  { label: "Parent conference", topic: "upcoming conference planning", tone: "professional" }
];
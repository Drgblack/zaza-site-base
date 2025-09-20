import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { draft, student, tone, format } = await req.json();
    
    if (!draft || draft.trim().length < 10) {
      return NextResponse.json({ preview: "" });
    }

    // Quick preview generation - simpler and faster than full generation
    const preview = generateQuickPreview({
      draft: draft.trim(),
      student: student || "the student",
      tone,
      format
    });

    return NextResponse.json({ preview });
  } catch (error) {
    console.error('Preview generation error:', error);
    return NextResponse.json({ preview: "" });
  }
}

function generateQuickPreview({
  draft,
  student,
  tone,
  format
}: {
  draft: string;
  student: string;
  tone: string;
  format: string;
}): string {
  // Quick heuristic-based preview without LLM calls
  const isPositive = draft.toLowerCase().includes('positive') || 
                    draft.toLowerCase().includes('good') || 
                    draft.toLowerCase().includes('great') ||
                    draft.toLowerCase().includes('excellent') ||
                    draft.toLowerCase().includes('wonderful');

  const isConcern = draft.toLowerCase().includes('concern') || 
                   draft.toLowerCase().includes('issue') || 
                   draft.toLowerCase().includes('problem') ||
                   draft.toLowerCase().includes('difficulty') ||
                   draft.toLowerCase().includes('challenge');

  const greeting = format === 'sms' ? 'Hi!' : 'Hi there!';
  const closing = format === 'sms' 
    ? 'Thanks!' 
    : getToneClosing(tone);

  // Clean up the draft slightly
  const cleanDraft = draft
    .replace(/\s+/g, ' ')
    .trim();

  if (format === 'sms') {
    if (isPositive) {
      return `${greeting} ${student} had a great day! ${cleanDraft.slice(0, 50)}... Looking forward to more success!`;
    } else if (isConcern) {
      return `${greeting} I wanted to touch base about ${student}. ${cleanDraft.slice(0, 40)}... Let's work together on this.`;
    } else {
      return `${greeting} Quick update about ${student}. ${cleanDraft.slice(0, 50)}... ${closing}`;
    }
  } else {
    // Email format
    if (isPositive) {
      return `${greeting}

I wanted to share some positive news about ${student}. ${cleanDraft}

Their progress has been wonderful to see, and I thought you should know about these achievements.

${closing}`;
    } else if (isConcern) {
      return `${greeting}

I wanted to reach out regarding ${student}. ${cleanDraft}

I'd love to work together to support them and discuss some strategies that might help.

${closing}`;
    } else {
      return `${greeting}

I wanted to share an update about ${student}. ${cleanDraft}

Please feel free to reach out if you have any questions or would like to discuss this further.

${closing}`;
    }
  }
}

function getToneClosing(tone: string): string {
  switch (tone) {
    case 'supportive': 
      return `Thanks for being such a supportive partner in your child's education!

Best regards,
[Your name]`;
    case 'concise':
      return `Best,
[Your name]`;
    case 'friendly':
      return `Thanks so much for all you do!

Warm regards,
[Your name]`;
    case 'formal':
      return `Thank you for your continued support.

Sincerely,
[Your name]`;
    default:
      return `Best regards,
[Your name]`;
  }
}
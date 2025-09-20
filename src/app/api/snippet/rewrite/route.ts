import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT, buildUserPrompt, buildRefinementPrompt } from '@/lib/snippetPrompt';
import { polish, failsRubric, getWordCount, createFallbackMessage } from '@/lib/snippetPolish';

const MAX_FREE_PER_MONTH = 5;

// Rate limiting helper (same as main route)
async function checkRateLimit(request: NextRequest): Promise<{ allowed: boolean; used: number; limit: number }> {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous';
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const key = `tryrewrite:${ip}:${monthKey}`;
    
    // TODO: Implement proper KV store (Redis/Vercel KV)
    const used = 0; // Would be: await kv.incr(key); await kv.expire(key, endOfMonth);
    
    return {
      allowed: used < MAX_FREE_PER_MONTH,
      used,
      limit: MAX_FREE_PER_MONTH
    };
  } catch (error) {
    console.error('Rate limit check failed:', error);
    return { allowed: true, used: 0, limit: MAX_FREE_PER_MONTH };
  }
}

// Stub LLM call - replace with actual API integration
async function callLLM(systemPrompt: string, userPrompt: string): Promise<string> {
  // TODO: Replace with actual LLM API call (OpenAI, Anthropic, etc.)
  console.log('LLM Rewrite Call - System:', systemPrompt.slice(0, 100) + '...');
  console.log('LLM Rewrite Call - User:', userPrompt.slice(0, 100) + '...');
  
  // Return a simple improvement for now
  return `Hi there! I wanted to share a quick update about Max's day.

Max is always kind to his classmates and brings such positive energy to our room. Today I noticed he had some trouble staying focused during writing time, which meant he didn't finish his story.

At home, you might try a simple 2-step cue to help him refocus - maybe a gentle hand on his shoulder and a quiet "eyes on your work." This can really help build that focus muscle.

Please let me know if you have any questions. Thanks for being such a supportive partner!`;
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimit = await checkRateLimit(request);
    if (!rateLimit.allowed) {
      return NextResponse.json({
        success: false,
        error: 'Monthly limit reached',
        used: rateLimit.used,
        limit: rateLimit.limit
      }, { status: 429 });
    }

    const body = await request.json();
    const {
      originalText = '',
      student = '',
      language = 'English',
      tone = 'supportive',
      format = 'email'
    } = body;

    if (!originalText.trim()) {
      return NextResponse.json({
        success: false,
        error: 'Original text is required'
      }, { status: 400 });
    }

    // Build rewrite prompt with emphasis on preserving facts
    const rewriteSystemPrompt = `${SYSTEM_PROMPT}

REWRITE MODE: Preserve all facts, names, dates; remove judgments; plain words; structure as specified.`;

    const userPrompt = buildUserPrompt({
      topic: 'improving teacher draft',
      student,
      language,
      tone,
      format,
      draft: originalText
    });

    // First attempt
    let draft = await callLLM(rewriteSystemPrompt, userPrompt);
    let polished = polish(draft);

    // Quality gate - refinement if needed
    if (failsRubric(polished, format)) {
      console.log('First rewrite attempt failed rubric, refining...');
      const refinementPrompt = buildRefinementPrompt(format);
      draft = await callLLM(refinementPrompt, polished);
      polished = polish(draft);
    }

    // If still fails, basic cleanup of original
    if (failsRubric(polished, format)) {
      console.log('Second rewrite attempt failed, doing basic cleanup');
      let improved = originalText;
      
      // Remove banned language
      const bannedWords = ['lazy', 'disruptive', 'bad kid', 'disorder', 'diagnosis', 'blame'];
      bannedWords.forEach(banned => {
        const regex = new RegExp(`\\b${banned}\\b`, 'gi');
        improved = improved.replace(regex, 'challenging');
      });
      
      polished = polish(improved);
    }

    return NextResponse.json({
      success: true,
      message: polished,
      wordCount: getWordCount(polished),
      improved: true,
      used: rateLimit.used + 1,
      limit: rateLimit.limit
    });

  } catch (error) {
    console.error('Snippet rewrite error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to improve message'
    }, { status: 500 });
  }
}
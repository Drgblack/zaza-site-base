import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT, buildUserPrompt, buildRefinementPrompt, FEW_SHOT_EXAMPLES } from '@/lib/snippetPrompt';
import { polish, failsRubric, getWordCount, createFallbackMessage } from '@/lib/snippetPolish';

const MAX_FREE_PER_MONTH = 5;

// Rate limiting helper
async function checkRateLimit(request: NextRequest): Promise<{ allowed: boolean; used: number; limit: number }> {
  try {
    // Use IP address or anonymous ID for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'anonymous';
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const key = `trygen:${ip}:${monthKey}`;
    
    // TODO: Implement proper KV store (Redis/Vercel KV)
    // For now, we'll allow all requests but return usage info
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
  console.log('LLM Call - System:', systemPrompt.slice(0, 100) + '...');
  console.log('LLM Call - User:', userPrompt.slice(0, 100) + '...');
  
  // Return a deterministic fallback for now
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
      topic = 'classroom behaviour',
      student = 'Max',
      language = 'English',
      tone = 'supportive',
      format = 'email',
      positives = '',
      focus = '',
      next = ''
    } = body;

    const userPrompt = buildUserPrompt({
      topic,
      student,
      language,
      tone,
      format,
      positives,
      focus,
      next
    });

    // First attempt
    let draft = await callLLM(SYSTEM_PROMPT, userPrompt);
    let polished = polish(draft);

    // Quality gate - refinement if needed
    if (failsRubric(polished, format)) {
      console.log('First attempt failed rubric, refining...');
      const refinementPrompt = buildRefinementPrompt(format);
      draft = await callLLM(refinementPrompt, polished);
      polished = polish(draft);
    }

    // If still fails, use fallback but don't return error
    if (failsRubric(polished, format)) {
      console.log('Second attempt failed, using fallback');
      polished = polish(createFallbackMessage(student, topic));
    }

    return NextResponse.json({
      success: true,
      message: polished,
      wordCount: getWordCount(polished),
      used: rateLimit.used + 1,
      limit: rateLimit.limit
    });

  } catch (error) {
    console.error('Snippet generation error:', error);
    
    // Return polished fallback on any error
    const fallback = createFallbackMessage();
    const polished = polish(fallback);
    
    return NextResponse.json({
      success: true,
      message: polished,
      wordCount: getWordCount(polished),
      fallback: true
    });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { rewriteSystem, buildUserPrompt } from '@/lib/snippetPrompt';
import { polish } from '@/lib/textPostProcess';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      originalText = '',
      tone = 'supportive',
      format = 'email',
      student = ''
    } = body;

    if (!originalText.trim()) {
      return NextResponse.json({
        success: false,
        error: 'Original text is required'
      }, { status: 400 });
    }

    // TODO: Integrate with actual LLM API for rewriting
    // For now, apply basic improvements with polishing
    let improved = originalText;
    
    // Remove banned language
    const bannedWords = ['lazy', 'disruptive', 'bad kid', 'disorder', 'diagnosis', 'blame'];
    bannedWords.forEach(banned => {
      const regex = new RegExp(`\\b${banned}\\b`, 'gi');
      improved = improved.replace(regex, 'challenging');
    });
    
    // Apply post-processing
    const polished = polish(improved);

    return NextResponse.json({
      success: true,
      message: polished,
      wordCount: polished.split(/\s+/).length,
      improved: true
    });

  } catch (error) {
    console.error('Snippet rewrite error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Failed to improve message'
    }, { status: 500 });
  }
}
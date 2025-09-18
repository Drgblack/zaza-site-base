import { NextRequest, NextResponse } from 'next/server';
import { polish, fallbackMessage } from '@/lib/textPostProcess';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      student = ''
    } = body;

    // TODO: Integrate with actual LLM API (OpenAI, Anthropic, etc.)
    // For now, return fallback message with polishing
    const result = fallbackMessage(student || undefined);
    const polished = polish(result);

    return NextResponse.json({
      success: true,
      message: polished,
      wordCount: polished.split(/\s+/).length
    });

  } catch (error) {
    console.error('Snippet generation error:', error);
    
    // Return fallback on any error
    const fallback = fallbackMessage();
    const polished = polish(fallback);
    
    return NextResponse.json({
      success: true,
      message: polished,
      wordCount: polished.split(/\s+/).length,
      fallback: true
    });
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { createCustomSnippet, getUserCustomSnippets } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'User ID is required' },
        { status: 400 }
      );
    }

    const snippets = await getUserCustomSnippets(userId);
    
    return NextResponse.json({
      success: true,
      data: snippets
    });
  } catch (error) {
    console.error('Error fetching custom snippets:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch custom snippets' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, title, content, category, tags, isPublic } = body;

    if (!userId || !title || !content || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const snippetId = await createCustomSnippet(userId, {
      title,
      content,
      category,
      tags: tags || [],
      isPublic: isPublic || false
    });
    
    return NextResponse.json({
      success: true,
      data: { id: snippetId }
    });
  } catch (error) {
    console.error('Error creating custom snippet:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create custom snippet' 
      },
      { status: 500 }
    );
  }
}

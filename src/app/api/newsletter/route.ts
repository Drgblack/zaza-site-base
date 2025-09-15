import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const locale = formData.get('locale') as string;

    // Basic email validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Log the signup (in production, you would save this to a database)
    console.log('Newsletter signup:', { email, locale, timestamp: new Date().toISOString() });

    // Return success response with redirect
    return NextResponse.redirect(new URL('/en/resources?subscribed=true', request.url));
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}
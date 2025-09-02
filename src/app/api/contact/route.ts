import { NextRequest, NextResponse } from 'next/server';

interface ContactRequest {
  email: string;
  name?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequest = await request.json();
    
    if (!body.email) {
      return NextResponse.json(
        { ok: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    // Brevo (Sendinblue) integration
    const brevoApiKey = process.env.BREVO_API_KEY;
    const brevoListId = process.env.BREVO_LIST_ID || '1';

    if (!brevoApiKey) {
      console.error('BREVO_API_KEY not configured');
      return NextResponse.json(
        { ok: false, error: 'Service configuration error' },
        { status: 500 }
      );
    }

    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        email: body.email,
        attributes: {
          FNAME: body.name || '',
          MESSAGE: body.message || '',
        },
        listIds: [parseInt(brevoListId)],
        updateEnabled: true,
      }),
    });

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      console.error('Brevo error:', errorText);
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Brevo error',
          status: brevoResponse.status,
          detail: errorText,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ 
      ok: true,
      message: 'Successfully subscribed to our newsletter' 
    });
    
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

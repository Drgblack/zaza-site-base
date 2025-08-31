import type { NextApiRequest, NextApiResponse } from 'next'

type SubscribeBody = {
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  source?: string;
  tags?: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(400).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { email, firstName, lastName, name, source, tags } = req.body as SubscribeBody;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ ok: false, error: 'Invalid email address' });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (!apiKey || !listId) {
      // Don't leak secrets—just indicate misconfig
      return res.status(500).json({ ok: false, error: 'Server not configured' });
    }

    // Prepare contact data for Brevo
    const contactData: any = {
      email,
      listIds: [Number(listId)],
      updateEnabled: true,
    };

    // Add attributes if provided
    const attributes: any = {};
    if (firstName) attributes.FIRSTNAME = firstName;
    if (lastName) attributes.LASTNAME = lastName;
    if (name) attributes.NAME = name;
    if (source) attributes.SOURCE = source;
    if (tags && tags.length > 0) attributes.TAGS = tags.join(',');

    if (Object.keys(attributes).length > 0) {
      contactData.attributes = attributes;
    }

    // Upsert contact and add to list
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify(contactData),
    });

    if (brevoResponse.status === 201 || brevoResponse.status === 200) {
      return res.status(200).json({ ok: true });
    }

    // Handle known Brevo errors
    const errorText = await brevoResponse.text();
    console.error('Brevo API error:', errorText);
    
    return res.status(400).json({ 
      ok: false, 
      error: 'Failed to subscribe. Please try again.' 
    });

  } catch (error) {
    console.error('Subscribe API error:', error);
    return res.status(500).json({ 
      ok: false, 
      error: 'Unexpected error occurred. Please try again.' 
    });
  }
}
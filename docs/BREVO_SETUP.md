# Brevo Email Integration Setup

This guide explains how to set up Brevo (formerly Sendinblue) email capture for the Zaza Promptly website.

## Overview

The website uses Brevo's API v3 to capture email addresses from various forms across the site, including:
- Main email capture forms
- Exit-intent modals  
- Blog newsletter signups
- Contact forms
- Resource download forms

## Prerequisites

1. **Brevo Account**: Sign up at [brevo.com](https://brevo.com)
2. **API Key**: Generate from Brevo dashboard
3. **Contact List**: Create a list to store subscribers

## Configuration Steps

### 1. Get Brevo API Key

1. Log into your Brevo account
2. Go to **Account** > **SMTP & API**
3. Click **Generate a new API key**
4. Copy the generated key

### 2. Create Contact List

1. Go to **Contacts** > **Lists**
2. Click **Create a list**
3. Name it (e.g., "Zaza Promptly Subscribers")
4. Note the List ID from the URL or list settings

### 3. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```bash
BREVO_API_KEY=your_actual_api_key_here
BREVO_LIST_ID=123  # Replace with your list ID number
```

### 4. Test Integration

1. Start the development server: `npm run dev`
2. Navigate to a page with email capture
3. Submit a test email
4. Check your Brevo contacts list for the new subscriber

## API Integration Details

### Endpoint: `/api/subscribe`

**Request Format:**
```json
{
  "email": "teacher@school.edu",
  "firstName": "Jane", // optional
  "lastName": "Smith",  // optional  
  "name": "Jane Smith", // optional
  "source": "homepage_signup",
  "tags": ["homepage", "lead_magnet"]
}
```

**Success Response:**
```json
{
  "ok": true,
  "brevoStatus": 201
}
```

**Error Response:**
```json
{
  "ok": false,
  "error": "Invalid email"
}
```

### Form Components

The main email capture component is `EmailCaptureForm.tsx` with these features:
- Client and server-side email validation
- Loading states and error handling
- Google Analytics event tracking
- Teacher-friendly messaging
- GDPR-compliant language

### Brevo Contact Attributes

The integration maps form fields to Brevo contact attributes:
- `FIRSTNAME` - First name
- `LASTNAME` - Last name  
- `NAME` - Full name
- `SOURCE` - Form source (e.g., "homepage_signup")
- `TAGS` - Array of tags for segmentation

## Customization

### Adding New Forms

1. Use the existing `EmailCaptureForm` component
2. Set appropriate `source` and `tags` props
3. Or call `/api/subscribe` directly from custom forms

### Form Variants

```tsx
// Hero section form
<EmailCaptureForm 
  variant="hero"
  size="lg"
  source="homepage_hero"
  tags={['homepage', 'hero']}
/>

// Sidebar form
<EmailCaptureForm
  variant="sidebar" 
  size="sm"
  source="blog_sidebar"
  tags={['blog', 'sidebar']}
/>
```

## Troubleshooting

### Common Issues

1. **"Server not configured" error**
   - Check that `BREVO_API_KEY` and `BREVO_LIST_ID` are set
   - Verify `.env.local` is not committed to git

2. **"Invalid email" error**  
   - Email format validation is strict
   - Check for trailing spaces or invalid characters

3. **Brevo API errors**
   - Check API key permissions in Brevo dashboard
   - Verify list ID exists and is active
   - Check API rate limits

### Testing

Test email capture with these scenarios:
- Valid email address
- Invalid email format
- Empty email field
- Network connectivity issues
- API key/list ID errors

## Security Considerations

- API keys are server-side only (not exposed to client)
- Email validation on both client and server
- No PII stored in application database
- GDPR-compliant opt-in language
- Rate limiting recommended for production

## Analytics Integration

Email captures trigger Google Analytics events:
- Event: `email_capture`
- Category: `engagement`
- Label: Form source
- Value: 1

Track conversions in GA4 using the `email_capture` event.

## Production Deployment

1. Set environment variables on Vercel:
   - Go to Project Settings > Environment Variables
   - Add `BREVO_API_KEY` and `BREVO_LIST_ID`
   - Deploy changes

2. Test production forms after deployment

3. Monitor Brevo dashboard for new subscribers

## Support

- Brevo API Documentation: https://developers.brevo.com/
- Contact support for integration issues
- Check server logs for detailed error messages
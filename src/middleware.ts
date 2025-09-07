import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Handle referral tracking first
  const url = request.nextUrl.clone();
  const referralCode = url.searchParams.get('ref');
  
  if (referralCode) {
    // Store referral code in cookie for later processing
    const response = intlMiddleware(request);
    response.cookies.set('referral_code', referralCode, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    });
    
    // Clean up URL by removing ref parameter for better UX
    url.searchParams.delete('ref');
    if (url.search === '') {
      url.search = '';
    }
    
    return NextResponse.redirect(url);
  }
  
  // Continue with internationalization middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match the root
    '/',
    // Match all pathnames except for
    // - Next.js internals and all static files, unless found in search params
    // - API routes
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
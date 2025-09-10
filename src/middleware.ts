import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '../i18n';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always' // Changed from 'as-needed' to 'always' to ensure locale is always in URL
});

export default function middleware(request: NextRequest) {
  // Explicitly handle root path
  const pathname = request.nextUrl.pathname;
  
  // If accessing root without locale, redirect to default locale
  if (pathname === '/') {
    const url = new URL(`/${defaultLocale}`, request.url);
    return Response.redirect(url);
  }
  
  // For all other paths, use the intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
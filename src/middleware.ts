import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '../i18n';

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Always redirect root to default locale - this is our primary guard
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url), 308);
  }
  
  // Check if the pathname has a valid locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // If no locale and not root, add default locale prefix
  if (!pathnameHasLocale && pathname !== '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url), 308);
  }
  
  // For all other cases, use next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always'
  });
  
  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - files with extensions
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)' 
  ]
};
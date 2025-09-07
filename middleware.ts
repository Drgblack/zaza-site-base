import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from '@/i18n/routing';

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)'],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const { locales, defaultLocale } = routing;

  // Redirect root to default locale
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }

  // Ensure every path has a supported locale prefix
  const hasLocale = new RegExp(`^/(${locales.join('|')})(/|$)`).test(pathname);
  if (!hasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

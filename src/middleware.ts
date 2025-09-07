import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const locales = ['en', 'es', 'fr', 'de', 'it'] as const;
const DEFAULT_LOCALE = 'en';

export const config = {
  // everything except Next internals/files/api
  matcher: ['/((?!_next|.*\\..*|api).*)'],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Root → default landing
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}`;
    return NextResponse.redirect(url);
  }

  // If path has no locale, redirect to default locale (preserve path)
  const hasLocale = new RegExp(`^/(${locales.join('|')})(/|$)`).test(pathname);
  if (!hasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

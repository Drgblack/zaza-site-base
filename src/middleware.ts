import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const locales = ['en', 'es', 'fr', 'de', 'it'];

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)'], // everything except Next internals/files/api
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Root → default landing
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/en';
    return NextResponse.redirect(url);
  }

  // If path has no locale, redirect to default locale
  const hasLocale = locales.some(
    (l) => pathname === /{l} || pathname.startsWith(/{l}/)
  );
  if (!hasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = '/en' + pathname;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

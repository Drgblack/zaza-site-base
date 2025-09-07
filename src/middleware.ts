import { NextRequest, NextResponse } from "next/server";
const locales = ["en","es","fr","de","it"]; // keep "en" at least

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next internals & file requests
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // Root → /en
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }

  // Already localized? allow
  if (locales.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  // Otherwise prefix with default locale
  const url = req.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

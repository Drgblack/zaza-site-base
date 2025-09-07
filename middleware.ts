import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCALES = ["en","es","de","fr","it"];
const PUBLIC_FILE = /\.(?:.*)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }
  const hasLocale = new RegExp(`^/(${LOCALES.join("|")})(/|$)`).test(pathname);
  if (!hasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] };

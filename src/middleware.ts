import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const SUPPORTED = new Set(["en","es","fr","de","it"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip static assets and API
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || /\.[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }

  // Root -> default locale landing
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en/resources", req.url));
  }

  // If first segment is not a supported locale, prefix with default
  const first = pathname.split("/")[1];
  if (!SUPPORTED.has(first)) {
    return NextResponse.redirect(new URL(`/en${pathname}`, req.url));
  }

  return NextResponse.next();
}

// Match everything; we early-return above for assets/API.
export const config = { matcher: ["/:path*"] };

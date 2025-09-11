import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intl = createMiddleware({
  defaultLocale: "en",
  locales: ["en","de","fr","es","it"],
  localePrefix: "always"
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en/resources", request.url));
  }
  return intl(request);
}

export const config = {
  matcher: ["/", "/((?!_next|api|.*\\..*).*)"]
};
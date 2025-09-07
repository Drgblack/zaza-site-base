import { NextResponse, type NextRequest } from "next/server"

const SUPPORTED = ["en","es","fr","de","it"]

function pickLocale(req: NextRequest): string {
  const header = req.headers.get("accept-language") ?? ""
  const langs = header.split(",").map(s => s.split(";")[0].toLowerCase())
  for (const lang of langs) {
    const base = lang.split("-")[0]
    if (SUPPORTED.includes(base)) return base
  }
  return "en"
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || /\.[^/]+$/.test(pathname)) {
    return NextResponse.next()
  }

  if (pathname === "/") {
    const locale = pickLocale(req)
    return NextResponse.redirect(new URL(`/${locale}/resources`, req.url))
  }

  const first = pathname.split("/")[1]
  if (!SUPPORTED.includes(first)) {
    const locale = pickLocale(req)
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ["/((?!_next|api|.*\\..*).*)"] }

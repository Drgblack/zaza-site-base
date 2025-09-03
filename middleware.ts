import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-Commit", process.env.VERCEL_GIT_COMMIT_SHA || "dev");
  return res;
}

export const config = { matcher: ["/en/blog", "/en/blog/:path*"] };
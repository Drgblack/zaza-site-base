import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_req: NextRequest) {
  const res = NextResponse.next();
  // Safely handle commit SHA - only set if available
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA;
  if (commitSha) {
    res.headers.set("X-Commit", commitSha);
  }
  return res;
}

export const config = { matcher: ["/en/blog", "/en/blog/:path*"] };
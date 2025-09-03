import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    commit: process.env.VERCEL_GIT_COMMIT_SHA || 'local',
    routes: ["blog2-index", "blog2-article"]
  });
}
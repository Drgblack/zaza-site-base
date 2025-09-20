import { NextResponse } from "next/server";
import { getClientKey, getQuotaKV, parseCookieQuota } from "@/lib/quota";

export async function GET(req: Request) {
  try {
    const key = await getClientKey(req);
    const limit = Number(process.env.FREE_TRIAL_LIMIT ?? 5);

    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      const q = await getQuotaKV(key);
      return NextResponse.json(q);
    } else {
      const cookie = req.headers.get("cookie");
      const used = parseCookieQuota(cookie);
      const remaining = Math.max(0, limit - used);
      return NextResponse.json({ limit, remaining, period: "month" });
    }
  } catch (error) {
    console.error('Quota check error:', error);
    const limit = Number(process.env.FREE_TRIAL_LIMIT ?? 5);
    return NextResponse.json({ limit, remaining: limit, period: "month" });
  }
}
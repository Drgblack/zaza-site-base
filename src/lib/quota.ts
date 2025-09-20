// lib/quota.ts
import crypto from "crypto";

const DEFAULT_LIMIT = Number(process.env.FREE_TRIAL_LIMIT ?? 5);

function monthKey() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

function ttlToMonthEndSeconds(): number {
  const now = new Date();
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0));
  return Math.max(60, Math.floor((end.getTime() - now.getTime()) / 1000));
}

export type QuotaInfo = { limit: number; remaining: number; period: "month" };

export async function getClientKey(req: Request) {
  // Use IP + UA; feel free to add a cookie or session ID if you have one
  const ip =
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "0.0.0.0";
  const ua = req.headers.get("user-agent") || "";
  return crypto.createHash("sha256").update(ip + ua).digest("hex");
}

export async function getQuotaKV(key: string): Promise<QuotaInfo> {
  // For now, we'll implement this without @vercel/kv dependency
  // In production, you would use Vercel KV if configured
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    // KV not configured; caller should use cookie fallback
    return { limit: DEFAULT_LIMIT, remaining: DEFAULT_LIMIT, period: "month" };
  }
  
  try {
    // Mock KV implementation for now - in production use actual Vercel KV
    const mkey = `snippet:${monthKey()}:${key}`;
    // This would be: const used = Number((await kv.get(mkey)) || 0);
    const used = 0; // Mock - always return fresh quota for now
    return { limit: DEFAULT_LIMIT, remaining: Math.max(0, DEFAULT_LIMIT - used), period: "month" };
  } catch (error) {
    console.error('KV error, falling back to default:', error);
    return { limit: DEFAULT_LIMIT, remaining: DEFAULT_LIMIT, period: "month" };
  }
}

export async function incrementQuotaKV(key: string) {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return;
  
  try {
    const mkey = `snippet:${monthKey()}:${key}`;
    const ttl = ttlToMonthEndSeconds();
    // This would be: 
    // const newVal = await kv.incr(mkey);
    // if (newVal === 1) await kv.expire(mkey, ttl);
    console.log(`Would increment KV key: ${mkey} with TTL: ${ttl}`);
  } catch (error) {
    console.error('KV increment error:', error);
  }
}

/* -------- Cookie fallback (if KV not present) -------- */

export function parseCookieQuota(cookie: string | null): number {
  if (!cookie) return 0;
  
  // Parse the current month's usage from cookie
  const currentMonth = monthKey();
  const pattern = new RegExp(`snippet_${currentMonth.replace('-', '_')}=(\\d+)`);
  const match = cookie.match(pattern);
  return match ? Number(match[1]) : 0;
}

export function bumpCookieQuota(previous: number): string {
  // Cookie with current month key and 35 days expiry (covers month rolling)
  const currentMonth = monthKey().replace('-', '_');
  const next = previous + 1;
  const maxAge = 35 * 24 * 60 * 60;
  return `snippet_${currentMonth}=${next}; Path=/; Max-Age=${maxAge}; SameSite=Lax; HttpOnly`;
}
import "server-only";
import fs from "fs";
import path from "path";

export function normalizeImage(src?: string): string {
  if (!src) return "/images/blog/default.jpg";
  try {
    const dec = decodeURIComponent(src);
    if (/^https?:\/\//i.test(dec)) return dec;
    const cleaned = dec.replace(/^\/?public\//, "");
    return cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
  } catch {
    return "/images/blog/default.jpg";
  }
}

export function ensureLocalOrFallback(p: string): string {
  if (/^https?:\/\//.test(p)) return p;
  const disk = path.join(process.cwd(), "public", p);
  return fs.existsSync(disk) ? p : "/images/blog/default.jpg";
}

export function resolveImage(src?: string) {
  return ensureLocalOrFallback(normalizeImage(src));
}
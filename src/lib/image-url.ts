import "server-only";
import fs from "fs";
import path from "path";

export function normalizeImage(src?: string): string {
  if (!src) return "/images/blog/default.jpg";
  let v = src;
  try { v = decodeURIComponent(src); } catch {}
  if (/^https?:\/\//i.test(v)) return v;
  v = v.replace(/^\/?public\//, "");
  return v.startsWith("/") ? v : `/${v}`;
}

export function ensureLocalOrFallback(p: string) {
  if (/^https?:\/\//.test(p)) return p;
  const disk = path.join(process.cwd(), "public", p);
  return fs.existsSync(disk) ? p : "/images/blog/default.jpg";
}

export function resolveImage(src?: string) {
  return ensureLocalOrFallback(normalizeImage(src));
}
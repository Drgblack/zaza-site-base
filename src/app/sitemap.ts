// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getAllSlugs } from "@/lib/blog2.server";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zaza-site-base.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages per locale
  for (const locale of routing.locales) {
    for (const path of ["", "/pricing", "/resources", "/community", "/faq", "/about", "/press"]) {
      entries.push({ url: `${BASE}/${locale}${path}`, changeFrequency: "weekly", priority: 0.7 });
    }
    entries.push({ url: `${BASE}/${locale}/blog`, changeFrequency: "daily", priority: 0.8 });
  }

  // Blog posts per locale
  const slugs = await getAllSlugs();
  for (const slug of slugs) {
    for (const locale of routing.locales) {
      entries.push({ url: `${BASE}/${locale}/blog/${slug}`, changeFrequency: "monthly", priority: 0.6 });
    }
  }

  return entries;
}
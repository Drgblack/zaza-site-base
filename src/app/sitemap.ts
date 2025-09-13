// src/app/sitemap.ts
import {getAllSlugs} from '@/lib/blog2.server';
import {routing} from '@/i18n/routing';

export const revalidate = 3600;

export default async function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://zaza-site-base.vercel.app';
  const slugs = await getAllSlugs(); // returns ['ai-tools-for-teachers', ...]
  const urls: { url: string; lastModified?: string }[] = [];

  // Locale roots
  for (const loc of routing.locales) {
    urls.push({ url: `${base}/${loc}` });
    urls.push({ url: `${base}/${loc}/pricing` });
    urls.push({ url: `${base}/${loc}/resources` });
    urls.push({ url: `${base}/${loc}/blog` });
  }

  // Blog posts per locale
  for (const loc of routing.locales) {
    for (const slug of slugs) {
      urls.push({ url: `${base}/${loc}/blog/${slug}` });
    }
  }

  return urls;
}
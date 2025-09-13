import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getAllSlugs } from '@/lib/blog2.server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zaza-site-base.vercel.app';
  const staticPaths = ['', '/resources', '/pricing', '/community', '/faq', '/about', '/press', '/blog'];

  const entries: MetadataRoute.Sitemap = [];
  
  // Add static pages for all locales
  for (const locale of routing.locales) {
    for (const p of staticPaths) {
      entries.push({ 
        url: `${base}/${locale}${p}`, 
        changeFrequency: 'weekly', 
        priority: 0.7,
        lastModified: new Date()
      });
    }
  }

  // Add blog posts for all locales
  try {
    const slugs = await getAllSlugs();
    for (const slug of slugs) {
      for (const locale of routing.locales) {
        entries.push({ 
          url: `${base}/${locale}/blog/${slug}`, 
          changeFrequency: 'weekly', 
          priority: 0.6,
          lastModified: new Date()
        });
      }
    }
  } catch (error) {
    console.error('[sitemap] Failed to load blog slugs:', error);
  }
  
  return entries;
}
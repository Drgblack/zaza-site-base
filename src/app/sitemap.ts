// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog2.server';

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 86400;

// Only include enabled locales in sitemap
const LOCALES = ['en'] as const;
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://zaza-site-base.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Never show drafts in sitemap
  const posts = await getAllPosts(false).then(posts => 
    posts.filter(post => !post.draft)
  );
  const now = new Date();

  const staticPages = LOCALES.flatMap((l) => [
    { url: `${BASE}/${l}`, lastModified: now, changefreq: 'daily', priority: 1.0 },
    { url: `${BASE}/${l}/blog`, lastModified: now, changefreq: 'daily', priority: 0.9 },
    { url: `${BASE}/${l}/resources`, lastModified: now, changefreq: 'weekly', priority: 0.8 },
    { url: `${BASE}/${l}/pricing`, lastModified: now, changefreq: 'weekly', priority: 0.8 },
    { url: `${BASE}/${l}/faq`, lastModified: now, changefreq: 'weekly', priority: 0.7 },
    { url: `${BASE}/${l}/community`, lastModified: now, changefreq: 'daily', priority: 0.8 },
    { url: `${BASE}/${l}/about`, lastModified: now, changefreq: 'monthly', priority: 0.6 },
    { url: `${BASE}/${l}/press`, lastModified: now, changefreq: 'monthly', priority: 0.6 },
  ] as const);

  const blog = LOCALES.flatMap((l) =>
    posts.map((post) => ({
      url: `${BASE}/${l}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : (post.mtime instanceof Date ? post.mtime : now),
      changefreq: 'monthly',
      priority: 0.7
    } as const))
  );

  return [...staticPages, ...blog];
}

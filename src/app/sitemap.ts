// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog2.server';
import { siteUrl } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 86400;

const LOCALES = ['en','de','fr','es','it'] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Never show drafts in sitemap
  const posts = await getAllPosts(false).then(posts => 
    posts.filter(post => !post.draft)
  );
  const now = new Date();

  const staticPages = LOCALES.flatMap((l) => [
    { url: `${siteUrl}/${l}`, lastModified: now, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${siteUrl}/${l}/blog`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${siteUrl}/${l}/resources`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${siteUrl}/${l}/pricing`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${siteUrl}/${l}/faq`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${siteUrl}/${l}/community`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${siteUrl}/${l}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${siteUrl}/${l}/press`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    // Add new SEO pages
    { url: `${siteUrl}/${l}/facts`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${siteUrl}/${l}/ai-usage`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${siteUrl}/${l}/tool/zaza-promptly`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
  ] as const);

  const blog = LOCALES.flatMap((l) =>
    posts.map((post) => ({
      url: `${siteUrl}/${l}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : (post.mtime instanceof Date ? post.mtime : now),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    }))
  );

  return [...staticPages, ...blog];
}

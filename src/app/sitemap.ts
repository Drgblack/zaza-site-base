// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog2.server';

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = 86400;

const LOCALES = ['en','de','fr','es','it'] as const;
const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://zaza-site-base.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const now = new Date();

  const staticPages = LOCALES.flatMap((l) => [
    { url: `${BASE}/${l}`, lastModified: now },
    { url: `${BASE}/${l}/blog`, lastModified: now },
    { url: `${BASE}/${l}/resources`, lastModified: now },
    { url: `${BASE}/${l}/pricing`, lastModified: now },
    { url: `${BASE}/${l}/faq`, lastModified: now },
    { url: `${BASE}/${l}/community`, lastModified: now },
    { url: `${BASE}/${l}/about`, lastModified: now },
    { url: `${BASE}/${l}/press`, lastModified: now },
  ]);

  const blog = LOCALES.flatMap((l) =>
    posts.map((post) => ({
      url: `${BASE}/${l}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : (post.mtime ?? now)
    }))
  );

  return [...staticPages, ...blog];
}

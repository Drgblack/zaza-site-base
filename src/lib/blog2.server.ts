import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export async function getAllSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(BLOG_DIR);
    return files
      .filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
      .map(f => f.replace(/\.mdx?$/, ''));
  } catch (e) {
    console.error('[blog] Failed to read blog directory:', e);
    return [];
  }
}

export type PostMeta = {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  image?: string | null;
  mtime?: Date;
  draft?: boolean;
};

export async function getAllPosts(includeDrafts?: boolean): Promise<PostMeta[]> {
  // Show drafts only in dev with flag, never in production
  const showDrafts = process.env.NODE_ENV !== 'production' && 
    (includeDrafts ?? process.env.NEXT_PUBLIC_SHOW_DRAFTS === "1");
  const slugs = await getAllSlugs();
  const posts: PostMeta[] = [];

  for (const slug of slugs) {
    try {
      const file = await readFirstExisting(slug, ['.mdx', '.md']);
      const { data, content } = matter(file.raw);
      const stats = await fs.stat(path.join(BLOG_DIR, slug + file.ext));
      // Skip drafts unless explicitly showing drafts
      if (!showDrafts && data.draft === true) {
        continue;
      }
      
      posts.push({
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        excerpt: data.excerpt ?? data.description ?? content.slice(0, 180),
        image: data.image ?? data.heroImage ?? data.featuredImage ?? null,
        mtime: stats.mtime,
        draft: data.draft === true
      });
    } catch (e) {
      console.error('[blog] skipping', slug, e);
    }
  }

  posts.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  return posts;
}

async function readFirstExisting(slug: string, exts: string[]) {
  for (const ext of exts) {
    const p = path.join(BLOG_DIR, slug + ext);
    try {
      return { raw: await fs.readFile(p, 'utf8'), ext };
    } catch {
      // File doesn't exist, try next extension
    }
  }
  throw new Error(`No file for ${slug}`);
}

export async function getPostBySlug(slug: string, includeDrafts?: boolean): Promise<PostMeta | null> {
  try {
    const file = await readFirstExisting(slug, ['.mdx', '.md']);
    const { data, content } = matter(file.raw);
    // Hide drafts in production, respect dev flag
    if (data.draft === true && (
      process.env.NODE_ENV === 'production' || 
      !includeDrafts && process.env.NEXT_PUBLIC_SHOW_DRAFTS !== "1"
    )) {
      return null;
    }

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      excerpt: data.excerpt ?? data.description ?? content.slice(0, 180),
      image: data.image ?? data.heroImage ?? data.featuredImage ?? null,
      draft: data.draft === true
    };
  } catch (e) {
    console.error('[blog] Failed to get post by slug', slug, e);
    return null;
  }
}

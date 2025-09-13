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
};

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = await getAllSlugs();
  const posts: PostMeta[] = [];

  for (const slug of slugs) {
    try {
      const file = await readFirstExisting(slug, ['.mdx', '.md']);
      const { data, content } = matter(file.raw);
      posts.push({
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        excerpt: data.excerpt ?? data.description ?? content.slice(0, 180),
        image: data.image ?? data.heroImage ?? data.featuredImage ?? null
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

export async function getPostBySlug(slug: string): Promise<PostMeta | null> {
  try {
    const file = await readFirstExisting(slug, ['.mdx', '.md']);
    const { data, content } = matter(file.raw);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      excerpt: data.excerpt ?? data.description ?? content.slice(0, 180),
      image: data.image ?? data.heroImage ?? data.featuredImage ?? null
    };
  } catch (e) {
    console.error('[blog] Failed to get post by slug', slug, e);
    return null;
  }
}
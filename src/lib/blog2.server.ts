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
  content?: string; // Add full content for single post view
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
      
      // Enforce author guard - default to greg-blackburn
      const author = data.author ?? 'greg-blackburn';
      
      // Enforce cover guard - replace placeholder/default images
      let image = data.image ?? data.heroImage ?? data.featuredImage ?? null;
      if (image && (image.includes('default') || image.includes('placeholder'))) {
        // Replace with a unique Unsplash image based on slug hash
        const fallbackImages = [
          'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=400&fit=crop',
          'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop',
          'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=400&fit=crop',
          'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop'
        ];
        const hashCode = slug.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
        image = fallbackImages[Math.abs(hashCode) % fallbackImages.length];
      }
      
      posts.push({
        slug,
        title: data.title ?? slug,
        date: data.date ?? '',
        excerpt: data.excerpt ?? data.description ?? content.slice(0, 180),
        image,
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

    // Enforce author guard - default to greg-blackburn
    const author = data.author ?? 'greg-blackburn';
    
    // Enforce cover guard - replace placeholder/default images
    let image = data.image ?? data.heroImage ?? data.featuredImage ?? null;
    if (image && (image.includes('default') || image.includes('placeholder'))) {
      // Replace with a unique Unsplash image based on slug hash
      const fallbackImages = [
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=400&fit=crop',
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop',
        'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=400&fit=crop',
        'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop'
      ];
      const hashCode = slug.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
      image = fallbackImages[Math.abs(hashCode) % fallbackImages.length];
    }

    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      excerpt: data.excerpt ?? data.description ?? content.slice(0, 180),
      image,
      draft: data.draft === true,
      content: content // Include full MDX content
    };
  } catch (e) {
    console.error('[blog] Failed to get post by slug', slug, e);
    return null;
  }
}

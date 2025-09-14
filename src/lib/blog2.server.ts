import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const DEFAULT_BLOG_IMAGE = '/images/blog/default.jpg';

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
  content?: string;
  readingTime?: string;
  author?: string;
  category?: string;
  tags?: string[];
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
        image: processImagePath(data.image ?? data.heroImage ?? data.featuredImage),
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
    const stats = await fs.stat(path.join(BLOG_DIR, slug + file.ext));
    
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
      date: data.date ?? data.publishDate ?? '',
      excerpt: data.excerpt ?? data.description ?? content.slice(0, 180),
      image: processImagePath(data.image ?? data.heroImage ?? data.featuredImage),
      content,
      readingTime: data.readingTime ?? calculateReadingTime(content),
      author: data.author ?? 'Zaza Team',
      category: data.category ?? 'Education',
      tags: data.tags ?? [],
      mtime: stats.mtime,
      draft: data.draft === true
    };
  } catch (e) {
    console.error('[blog] Failed to get post by slug', slug, e);
    return null;
  }
}

// Process image path with fallback to default
function processImagePath(imagePath: string | null | undefined): string {
  if (!imagePath) {
    return DEFAULT_BLOG_IMAGE;
  }

  // If already a full path starting with /, return as is
  if (imagePath.startsWith('/')) {
    return imagePath;
  }

  // If it's a filename without extension, add .jpg and path
  if (!imagePath.includes('.')) {
    return `/images/blog/${imagePath}.jpg`;
  }

  // If it's just a filename, add the blog images path
  if (!imagePath.includes('/')) {
    return `/images/blog/${imagePath}`;
  }

  // For external URLs, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Default fallback
  return DEFAULT_BLOG_IMAGE;
}

// Simple reading time calculation
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / wordsPerMinute));
  return `${minutes} min read`;
}

// Get adjacent posts for navigation
export async function getAdjacentPosts(currentSlug: string): Promise<{
  prevPost: PostMeta | null;
  nextPost: PostMeta | null;
}> {
  try {
    const allPosts = await getAllPosts(false);
    const currentIndex = allPosts.findIndex(post => post.slug === currentSlug);
    
    if (currentIndex === -1) {
      return { prevPost: null, nextPost: null };
    }

    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    return { prevPost, nextPost };
  } catch (e) {
    console.error('[blog] Failed to get adjacent posts', e);
    return { prevPost: null, nextPost: null };
  }
}

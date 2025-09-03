// server-only ensures this file is never bundled for the client
import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Blog2Post = {
  title: string;
  slug: string;
  description: string; // always present (never empty)
  date: string; // ISO string
  author: string; // always present
  category: string; // always present
  readingTime: number; // always present
  featured: boolean;
  image: string; // always present (never empty)
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const stem = (f:string) => f.replace(/\.[mc]?mdx?$/i,'');
export function canonicalSlug(fileBase:string, fmSlug?:string): string {
  const s = (fmSlug || stem(fileBase)).toLowerCase().trim();
  return s.replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
}

export function resolveImage(i?:string): string {
  const v = (i || '').trim();
  if (!v) return '/images/blog/default.jpg';
  try {
    if (/^https?:\/\//i.test(v)) return v;            // external ok
    const u = decodeURIComponent(v).replace(/^public\//,'');
    return u.startsWith('/') ? u : '/'+u;
  } catch { return '/images/blog/default.jpg'; }
}

export function toExcerpt(md:string, words=28): string {
  return md.replace(/```[\s\S]*?```/g,' ')
           .replace(/[#>*_`[\]()-]/g,' ')
           .replace(/\s+/g,' ').trim().split(' ').slice(0,words).join(' ')+'…';
}

function readAllBlog2Posts(): Blog2Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  
  const files = fs.readdirSync(BLOG_DIR).filter(f => /\.mdx?$/.test(f));
  const posts = files.map(file => {
    const fp = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fp, "utf8");
    const { data, content } = matter(raw);
    
    const fileName = file.replace(/\.[mc]?mdx?$/i, "");
    const slug = canonicalSlug(fileName, data.slug);
    const image = resolveImage(data.image || data.featuredImage || data.heroImage);
    const description = data.description?.trim() || toExcerpt(content);
    
    // Guaranteed fields with fallbacks
    const title = data.title?.trim() || slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    const author = data.author?.name || data.author || "Zaza Team";
    const category = data.category || "General";
    const readingTime = typeof data.readingTime === 'number' ? data.readingTime : 
                       typeof data.readingTime === 'string' ? parseInt(data.readingTime.replace(/\D/g, ''), 10) || 4 : 4;
    const featured = Boolean(data.featured);
    
    // Handle date with fallback
    let postDate: string;
    try {
      const rawDate = data.date || data.publishDate || data.publishedAt || "2024-12-01";
      postDate = new Date(rawDate).toISOString();
    } catch {
      postDate = new Date("2024-12-01").toISOString();
    }
    
    return {
      title,
      slug,
      description,
      date: postDate,
      author,
      category,
      readingTime,
      featured,
      image,
      content,
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));

  // Audit missing images (only in development)
  if (process.env.NODE_ENV === 'development') {
    const missingImages = posts
      .filter(p => !/^https?:\/\//.test(p.image))
      .filter(p => !fs.existsSync(path.join(process.cwd(), "public", p.image)))
      .map(p => `${p.slug} -> ${p.image}`);
    
    if (missingImages.length) {
      console.warn("[blog2] Missing local images:\n" + missingImages.join("\n"));
    }
  }

  return posts;
}

export function getAllBlog2Posts(): Blog2Post[] {
  return readAllBlog2Posts();
}

export function getBlog2PostBySlug(slug: string): Blog2Post | null {
  return readAllBlog2Posts().find(p => p.slug === slug) ?? null;
}
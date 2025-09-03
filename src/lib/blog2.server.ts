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

function canonicalSlug(fileName: string, fmSlug?: string): string {
  const stem = fileName.replace(/\.mdx?$/i, "");
  const s = (fmSlug ?? stem).trim().toLowerCase();
  return s
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function resolveImage(src?: string): string {
  if (!src) return "/images/blog/default.jpg";
  
  let v = src;
  try { 
    v = decodeURIComponent(src); 
  } catch {}
  
  if (/^https?:\/\//i.test(v)) return v;
  
  // Strip /public prefix if present
  v = v.replace(/^\/?public\//, "");
  
  // Ensure leading slash
  const normalized = v.startsWith("/") ? v : `/${v}`;
  
  // Check if file exists, fallback to default if not
  const diskPath = path.join(process.cwd(), "public", normalized);
  if (fs.existsSync(diskPath)) {
    return normalized;
  }
  
  return "/images/blog/default.jpg";
}

function toExcerpt(md: string, n = 28): string {
  const txt = md.replace(/[`*_>#\-!\[\]\(\)]/g, " ").replace(/\s+/g, " ").trim();
  const words = txt.split(" ").slice(0, n);
  return words.join(" ") + (words.length === n ? "…" : "");
}

function readAllBlog2Posts(): Blog2Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  
  const files = fs.readdirSync(BLOG_DIR).filter(f => /\.mdx?$/.test(f));
  const posts = files.map(file => {
    const fp = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fp, "utf8");
    const { data, content } = matter(raw);
    
    const slug = canonicalSlug(file, data.slug);
    
    // Guaranteed fields with fallbacks
    const title = data.title?.trim() || slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    const description = data.description?.trim() || toExcerpt(content);
    const author = data.author?.name || data.author || "Zaza Team";
    const category = data.category || "General";
    const readingTime = typeof data.readingTime === 'number' ? data.readingTime : 
                       typeof data.readingTime === 'string' ? parseInt(data.readingTime.replace(/\D/g, ''), 10) || 4 : 4;
    const featured = Boolean(data.featured);
    const image = resolveImage(data.image || data.featuredImage || data.heroImage);
    
    // Handle date with fallback
    let postDate: string;
    try {
      const rawDate = data.date || data.publishDate || new Date(0);
      postDate = new Date(rawDate).toISOString();
    } catch {
      postDate = new Date(0).toISOString();
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

  // Audit missing images
  const missingImages = posts
    .filter(p => !/^https?:\/\//.test(p.image))
    .filter(p => !fs.existsSync(path.join(process.cwd(), "public", p.image)))
    .map(p => `${p.slug} -> ${p.image}`);
  
  if (missingImages.length) {
    console.warn("[blog2] Missing local images:\n" + missingImages.join("\n"));
  }

  return posts;
}

export function getAllBlog2Posts(): Blog2Post[] {
  return readAllBlog2Posts();
}

export function getBlog2PostBySlug(slug: string): Blog2Post | null {
  return readAllBlog2Posts().find(p => p.slug === slug) ?? null;
}
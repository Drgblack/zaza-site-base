// server-only ensures this file is never bundled for the client
import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { resolveImage } from "@/lib/image-url";

export type Post = {
  title: string;
  slug: string;
  description?: string;
  date: string;       // ISO string
  author?: string;
  category?: string;
  readingTime?: number;
  featured?: boolean;
  image?: string;
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function toExcerpt(md: string, n=28) {
  const txt = md.replace(/[`*_>#\-!\[\]\(\)]/g, " ").replace(/\s+/g, " ").trim();
  return txt.split(" ").slice(0,n).join(" ") + "…";
}

// Helper function to get the correct image path
function getImagePath(data: any, slug?: string): string {
  // Try different image field names in order of preference
  const imageFields = [
    data.image,
    data.featuredImage, 
    data.ogImage,
    data.heroImage,
    data.coverImage,
    data.thumbnail
  ];
  
  for (const imageField of imageFields) {
    if (imageField && typeof imageField === 'string' && imageField.trim()) {
      return resolveImage(imageField.trim());
    }
  }
  
  // Fallback to default image using unified resolver
  return resolveImage();
}

function readAll(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => /\.mdx?$/.test(f));
  const posts = files.map(file => {
    const fp = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fp, "utf8");
    const { data, content } = matter(raw);
    const slug = (data.slug || file.replace(/\.mdx?$/, "")).toString();
    
    // Handle author field - could be string or object
    let authorName = "";
    if (data.author) {
      if (typeof data.author === 'string') {
        authorName = data.author;
      } else if (typeof data.author === 'object' && data.author.name) {
        authorName = data.author.name;
      }
    }
    
    // Handle date field - could be 'date' or 'publishDate'
    let postDate = data.date || data.publishDate;
    if (!postDate) {
      postDate = new Date(0).toISOString();
    } else {
      postDate = new Date(postDate).toISOString();
    }
    
    // Handle reading time - could be 'readingTime', 'readTime', or string with 'min'
    let readingTimeNum = 4; // default
    if (data.readingTime) {
      readingTimeNum = typeof data.readingTime === 'string' 
        ? parseInt(data.readingTime.replace(/\D/g, ''), 10) || 4
        : Number(data.readingTime);
    } else if (data.readTime) {
      readingTimeNum = typeof data.readTime === 'string'
        ? parseInt(data.readTime.replace(/\D/g, ''), 10) || 4
        : Number(data.readTime);
    }
    
    // Normalize category names
    let categoryName = data.category ?? "General";
    if (typeof categoryName === 'string') {
      // Convert "ai-tools" to "AI Tools", "parent communication" to "Parent Communication"
      categoryName = categoryName
        .split(/[-\s]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      // Special cases for AI
      categoryName = categoryName.replace(/^Ai\s/, 'AI ');
      categoryName = categoryName.replace(/\sAi$/, ' AI');
      categoryName = categoryName.replace(/\sAi\s/, ' AI ');
    }
    
    return {
      title: data.title ?? slug,
      slug,
      description: (data.description?.trim() || toExcerpt(content)),
      date: postDate,
      author: authorName,
      category: categoryName,
      readingTime: readingTimeNum,
      featured: Boolean(data.featured ?? false),
      image: getImagePath(data, slug),
      content,
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));

  // Build-time diagnostics for missing images
  if (process.env.NODE_ENV === "production") {
    const missing = posts
      .filter(p => !/^https?:\/\//.test(p.image))
      .filter(p => !fs.existsSync(path.join(process.cwd(), "public", p.image)))
      .map(p => `${p.slug} -> ${p.image}`);
    if (missing.length) {
      console.warn("[blog] Missing local images:\n" + missing.join("\n"));
    }
  }

  return posts;
}

export function getAllPosts(): Post[] {
  return readAll();
}

export function getPostBySlug(slug: string): Post | null {
  return readAll().find(p => p.slug === slug) ?? null;
}
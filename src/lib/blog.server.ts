// server-only ensures this file is never bundled for the client
import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";

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

// Helper function to normalize and sanitize image paths
function normalizeImage(src?: string): string {
  if (!src) return "/images/blog/default.svg";
  try {
    // Undo accidental double-encoding like "%2F"
    const decoded = decodeURIComponent(src);
    // If external URL: return as-is (Next config must allow host)
    if (/^https?:\/\//i.test(decoded)) return decoded;
    // Normalize local paths: strip leading "/public", ensure "/"
    const local = decoded.replace(/^\/?public\//, "");
    return local.startsWith("/") ? local : `/${local}`;
  } catch {
    return "/images/blog/default.svg";
  }
}

function ensureLocalOrFallback(p: string): string {
  if (/^https?:\/\//.test(p)) return p;
  const disk = path.join(process.cwd(), "public", p);
  return fs.existsSync(disk) ? p : "/images/blog/default.svg";
}

function toExcerpt(md: string, words = 28): string {
  const txt = md.replace(/[`*_>#\-!\[\]\(\)]/g, " ").replace(/\s+/g, " ").trim();
  return txt.split(" ").slice(0, words).join(" ") + "…";
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
      return ensureLocalOrFallback(normalizeImage(imageField.trim()));
    }
  }
  
  // If no image found in frontmatter, try to match by slug
  if (slug) {
    const imageMap: { [key: string]: string } = {
      'best-ai-tools-for-teachers-2025': '/images/blog/ai-tools-teachers.svg',
      'ai-tools-for-teachers': '/images/blog/ai-tools-teachers.svg',
      'parent-teacher-communication-ai': '/images/blog/parent-communication-ai.svg',
      'parent-communication': '/images/blog/parent-communication-ai.svg',
      'ai-parent-communication': '/images/blog/parent-communication-ai.svg',
    };
    
    if (imageMap[slug]) {
      return imageMap[slug];
    }
    
    // Try partial matches
    for (const [key, image] of Object.entries(imageMap)) {
      if (slug.includes(key.split('-')[0]) || key.includes(slug.split('-')[0])) {
        return image;
      }
    }
  }
  
  // Fallback to default image
  return "/images/blog/default.svg";
}

function readAll(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => /\.mdx?$/.test(f));
  return files.map(file => {
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
      description: data.description?.trim() || toExcerpt(content),
      date: postDate,
      author: authorName,
      category: categoryName,
      readingTime: readingTimeNum,
      featured: Boolean(data.featured ?? false),
      image: getImagePath(data, slug),
      content,
    };
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPosts(): Post[] {
  return readAll();
}

export function getPostBySlug(slug: string): Post | null {
  return readAll().find(p => p.slug === slug) ?? null;
}
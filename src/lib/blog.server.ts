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
    
    return {
      title: data.title ?? slug,
      slug,
      description: data.description ?? "",
      date: (data.date ? new Date(data.date).toISOString() : new Date(0).toISOString()),
      author: authorName,
      category: data.category ?? "General",
      readingTime: Number(data.readingTime ?? 4),
      featured: Boolean(data.featured ?? false),
      image: data.image ?? "/images/blog/default.jpg",
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
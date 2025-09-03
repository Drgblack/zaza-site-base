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

// Helper function to get the correct image path
function getImagePath(data: any, slug?: string): string {
  // Try different image field names in order of preference
  const imageFields = [
    data.image,
    data.featuredImage, 
    data.ogImage,
    data.heroImage,
    data.coverImage
  ];
  
  for (const imageField of imageFields) {
    if (imageField && typeof imageField === 'string' && imageField.trim()) {
      const imagePath = imageField.trim();
      
      // If it's an external URL (starts with http), use it directly
      if (imagePath.startsWith('http')) {
        return imagePath;
      }
      
      // Normalize internal paths - ensure they start with /images/blog/
      if (imagePath.startsWith('/blog/')) {
        return imagePath.replace('/blog/', '/images/blog/');
      }
      
      // If it already starts with /images/blog/, use it as is
      if (imagePath.startsWith('/images/blog/')) {
        return imagePath;
      }
      
      // If it's just a filename, prepend the blog path
      if (!imagePath.startsWith('/')) {
        return `/images/blog/${imagePath}`;
      }
      
      // Default case - use the path as provided
      return imagePath;
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
    
    return {
      title: data.title ?? slug,
      slug,
      description: data.description ?? "",
      date: (data.date ? new Date(data.date).toISOString() : new Date(0).toISOString()),
      author: authorName,
      category: data.category ?? "General",
      readingTime: Number(data.readingTime ?? 4),
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
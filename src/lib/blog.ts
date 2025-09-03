import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  title: string;
  slug: string;
  description?: string;
  date: string;
  author?: string;
  category?: string;
  readingTime?: number;
  featured?: boolean;
  image?: string;
  content: string;
  views?: number;
  isEditorsPick?: boolean;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md") || f.endsWith(".mdx"));
  return files
    .map(file => {
      const fp = path.join(BLOG_DIR, file);
      const raw = fs.readFileSync(fp, "utf8");
      const { data, content } = matter(raw);
      const slug = (data.slug || file.replace(/\.mdx?$/, "")).toString();
      
      // Normalize category names to match expected categories
      let category = data.category ?? "General";
      if (typeof category === 'string') {
        // Map various category formats to standard ones
        const lowerCategory = category.toLowerCase();
        if (lowerCategory.includes('ai') && lowerCategory.includes('tool')) category = "Teacher Tips";
        else if (lowerCategory.includes('communication')) category = "Parent Communication";
        else if (lowerCategory.includes('productivity') || lowerCategory.includes('time')) category = "Productivity";
        else if (lowerCategory.includes('classroom') || lowerCategory.includes('management')) category = "Teacher Tips";
        else if (lowerCategory.includes('wellbeing') || lowerCategory.includes('wellness')) category = "Wellbeing";
        else if (lowerCategory === "ai tools" || lowerCategory === "ai-tools") category = "Teacher Tips";
      }
      
      // Handle different reading time formats
      let readingTime = 4; // default
      if (data.readingTime) {
        const match = data.readingTime.toString().match(/(\d+)/);
        readingTime = match ? parseInt(match[1]) : 4;
      } else if (data.readTime) {
        const match = data.readTime.toString().match(/(\d+)/);
        readingTime = match ? parseInt(match[1]) : 4;
      } else {
        // Estimate reading time: ~200 words per minute
        const wordCount = content.split(/\s+/).length;
        readingTime = Math.max(1, Math.ceil(wordCount / 200));
      }
      
      // Handle author field - could be string or object
      let authorName = "Zaza Team";
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
        description: data.description ?? data.excerpt ?? "",
        date: data.date ?? data.publishDate ?? "1970-01-01",
        author: authorName,
        category,
        readingTime,
        featured: Boolean(data.featured ?? false),
        image: data.image ?? data.featuredImage ?? data.ogImage ?? "/images/blog/default.jpg",
        content,
        views: data.views ?? 0,
        isEditorsPick: Boolean(data.isEditorsPick ?? data.featured ?? false),
      } as Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug) ?? null;
}

// Helper functions for organizing posts
export function getFeaturedPost(): Post | null {
  const posts = getAllPosts();
  return posts.find(p => p.featured) ?? posts[0] ?? null;
}

export function getPostsByCategory(category: string): Post[] {
  const posts = getAllPosts();
  if (category === "All Articles") return posts;
  return posts.filter(p => p.category === category);
}

export function getRecentPosts(days: number = 14): Post[] {
  const posts = getAllPosts();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  return posts.filter(p => {
    const postDate = new Date(p.date);
    return postDate >= cutoff;
  }).slice(0, 10);
}

export function getPopularPosts(): Post[] {
  const posts = getAllPosts();
  return posts
    .sort((a, b) => {
      // Sort by views (if available) then by featured status, then by date
      const aScore = (a.views || 0) + (a.featured ? 1000 : 0) + (a.isEditorsPick ? 500 : 0);
      const bScore = (b.views || 0) + (b.featured ? 1000 : 0) + (b.isEditorsPick ? 500 : 0);
      return bScore - aScore;
    })
    .slice(0, 10);
}

export function getEditorsPicks(): Post[] {
  const posts = getAllPosts();
  return posts.filter(p => p.isEditorsPick || p.featured).slice(0, 10);
}
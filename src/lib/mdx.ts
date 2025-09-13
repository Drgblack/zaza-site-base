import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  author: string;
  readTime?: string;
  image?: string;
  content: string;
  published?: boolean;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  return fs.readdirSync(postsDirectory)
    .filter((item) => {
      const itemPath = path.join(postsDirectory, item);
      return fs.statSync(itemPath).isDirectory() && 
             fs.existsSync(path.join(itemPath, 'index.mdx'));
    });
}

export function getPostBySlug(slug: string): BlogPost | null {
  // Check for subdirectory structure first
  const subdirPath = path.join(postsDirectory, slug, 'index.mdx');
  // Fallback to direct .mdx file
  const directPath = path.join(postsDirectory, `${slug}.mdx`);
  
  let fullPath = '';
  if (fs.existsSync(subdirPath)) {
    fullPath = subdirPath;
  } else if (fs.existsSync(directPath)) {
    fullPath = directPath;
  } else {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date || data.publishDate,
    category: data.category,
    author: data.author,
    readTime: data.readTime || data.readingTime,
    image: data.image || data.featuredImage,
    content,
    published: data.published !== false && data.isPublished !== false && !data.isDraft, // Default to true if not specified
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean) as BlogPost[];
    
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
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
  
  const slugs: string[] = [];
  
  fs.readdirSync(postsDirectory).forEach((item) => {
    const itemPath = path.join(postsDirectory, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      // Check for index.mdx in subdirectory
      if (fs.existsSync(path.join(itemPath, 'index.mdx'))) {
        slugs.push(item);
      }
    } else if (stat.isFile()) {
      // Check for direct .mdx or .md files
      if (item.endsWith('.mdx') || item.endsWith('.md')) {
        slugs.push(item.replace(/\.(mdx?|md)$/, ''));
      }
    }
  });
  
  return slugs;
}

export function getPostBySlug(slug: string): BlogPost | null {
  // Check for subdirectory structure first
  const subdirPath = path.join(postsDirectory, slug, 'index.mdx');
  // Fallback to direct files
  const directMdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const directMdPath = path.join(postsDirectory, `${slug}.md`);
  
  let fullPath = '';
  if (fs.existsSync(subdirPath)) {
    fullPath = subdirPath;
  } else if (fs.existsSync(directMdxPath)) {
    fullPath = directMdxPath;
  } else if (fs.existsSync(directMdPath)) {
    fullPath = directMdPath;
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
    published: data.published !== undefined ? data.published : 
               data.isPublished !== undefined ? data.isPublished : 
               data.isDraft !== undefined ? !data.isDraft : true,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean) as BlogPost[];
    
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
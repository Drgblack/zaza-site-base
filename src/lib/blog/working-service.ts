import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Simple, working blog service
const BLOG_CONTENT_PATH = path.join(process.cwd(), 'content', 'blog');

// Simple blog post interface
export interface SimpleBlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  author: {
    name: string;
    bio: string;
    avatar: string;
    role: string;
  };
  readingTime: number;
  category: {
    name: string;
    slug: string;
    color: string;
  };
  tags: string[];
  featured: boolean;
}

// Simple category mapping
const getSimpleCategory = (categoryName?: string) => {
  const categories = {
    'productivity': { name: 'Productivity', slug: 'productivity', color: 'bg-blue-500' },
    'ai-tools': { name: 'AI Tools', slug: 'ai-tools', color: 'bg-purple-500' },
    'teaching-strategies': { name: 'Teaching Strategies', slug: 'teaching-strategies', color: 'bg-green-500' },
    'classroom-management': { name: 'Classroom Management', slug: 'classroom-management', color: 'bg-orange-500' },
    'parent-communication': { name: 'Parent Communication', slug: 'parent-communication', color: 'bg-pink-500' }
  };
  
  const key = categoryName?.toLowerCase() || 'teaching-strategies';
  return categories[key as keyof typeof categories] || categories['teaching-strategies'];
};

// Simple slug creation
const createSimpleSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Parse a single blog post - simplified
function parseSimpleBlogPost(filePath: string, fileName: string): SimpleBlogPost | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    // Basic validation
    if (!frontmatter.title) {
      console.warn(`Missing title in ${fileName}`);
      return null;
    }
    
    // Extract data with defaults
    const slug = frontmatter.slug || createSimpleSlug(fileName.replace(/\.(md|mdx)$/, ''));
    const category = getSimpleCategory(frontmatter.category);
    
    // Simple reading time calculation (200 words per minute)
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    
    // Parse tags
    let tags = [];
    if (Array.isArray(frontmatter.tags)) {
      tags = frontmatter.tags;
    } else if (typeof frontmatter.tags === 'string') {
      tags = [frontmatter.tags];
    }
    
    // Create post object
    const post: SimpleBlogPost = {
      id: slug,
      slug,
      title: frontmatter.title,
      description: frontmatter.description || 'No description available',
      content,
      publishedAt: frontmatter.date || frontmatter.publishedAt || new Date().toISOString(),
      author: {
        name: frontmatter.author || 'Zaza Team',
        bio: frontmatter.authorBio || 'Educational AI experts',
        avatar: frontmatter.authorAvatar || '/images/team/zaza-team.jpg',
        role: frontmatter.authorRole || 'Education Specialist'
      },
      readingTime: parseInt(frontmatter.readingTime) || readingTime,
      category,
      tags,
      featured: frontmatter.featured || false
    };
    
    return post;
    
  } catch (error) {
    console.error(`Error parsing ${fileName}:`, error);
    return null;
  }
}

// Get all blog posts - simplified
export async function getAllSimpleBlogPosts(): Promise<SimpleBlogPost[]> {
  try {
    if (!fs.existsSync(BLOG_CONTENT_PATH)) {
      console.warn('Blog content directory does not exist');
      return [];
    }
    
    const files = fs.readdirSync(BLOG_CONTENT_PATH);
    const blogFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
    
    const posts: SimpleBlogPost[] = [];
    
    for (const fileName of blogFiles) {
      const filePath = path.join(BLOG_CONTENT_PATH, fileName);
      const post = parseSimpleBlogPost(filePath, fileName);
      if (post) {
        posts.push(post);
      }
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return posts;
    
  } catch (error) {
    console.error('Error getting blog posts:', error);
    return [];
  }
}

// Get a single blog post by slug
export async function getSimpleBlogPostBySlug(slug: string): Promise<SimpleBlogPost | null> {
  const posts = await getAllSimpleBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}
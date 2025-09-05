import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost, BlogStats } from './types';
import { BLOG_CATEGORIES, getCategoryBySlug } from './categories';
import { 
  calculateReadingTime, 
  countWords, 
  createExcerpt, 
  createSlug,
  filterPosts,
  sortPosts 
} from './utils';

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'content', 'blog');

// Parse frontmatter and create BlogPost
function parseBlogPost(filePath: string, fileName: string): BlogPost | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontmatter, content } = matter(fileContent);
    
    // Validate required fields
    if (!frontmatter.title) {
      console.warn(`Missing title in ${fileName}`);
      return null;
    }
    
    // Extract slug from filename or frontmatter
    const slug = frontmatter.slug || createSlug(fileName.replace(/\.(md|mdx)$/, ''));
    
    // Get category
    const categorySlug = frontmatter.category || 'teaching-strategies';
    const category = getCategoryBySlug(categorySlug) || BLOG_CATEGORIES[1]; // Default to teaching-strategies
    
    // Calculate content metrics
    const wordCount = countWords(content);
    const readingTime = frontmatter.readingTime || calculateReadingTime(content);
    const excerpt = frontmatter.excerpt || createExcerpt(content, 30);
    
    // Parse dates
    const publishedAt = frontmatter.date || frontmatter.publishedAt || new Date().toISOString();
    const updatedAt = frontmatter.updatedAt;
    
    // Parse author (default to Zaza team if not specified)
    const author = {
      name: frontmatter.author || 'Zaza Team',
      bio: frontmatter.authorBio || 'Educational AI experts dedicated to helping teachers succeed',
      avatar: frontmatter.authorAvatar || '/images/team/zaza-team.jpg',
      role: frontmatter.authorRole || 'Education Specialist'
    };
    
    // Parse teacher levels
    const teacherLevel = frontmatter.teacherLevel || frontmatter.grade_level || [];
    
    // Parse subjects
    const subject = frontmatter.subject || [];
    
    // Parse difficulty
    const difficulty = frontmatter.difficulty || 'intermediate';
    
    // Parse tags
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : 
                 typeof frontmatter.tags === 'string' ? [frontmatter.tags] : [];
    
    // SEO metadata
    const seo = {
      metaTitle: frontmatter.metaTitle || frontmatter.title,
      metaDescription: frontmatter.metaDescription || frontmatter.description || excerpt,
      keywords: frontmatter.keywords || tags,
      ogImage: frontmatter.ogImage || frontmatter.image
    };
    
    const blogPost: BlogPost = {
      id: slug,
      slug,
      title: frontmatter.title,
      description: frontmatter.description || excerpt,
      content,
      excerpt,
      publishedAt,
      updatedAt,
      author,
      readingTime,
      wordCount,
      category,
      tags,
      featured: frontmatter.featured || false,
      teacherLevel: Array.isArray(teacherLevel) ? teacherLevel : [teacherLevel].filter(Boolean),
      subject: Array.isArray(subject) ? subject : [subject].filter(Boolean),
      difficulty,
      seo,
      views: frontmatter.views || 0,
      likes: frontmatter.likes || 0,
      status: frontmatter.status || 'published'
    };
    
    return blogPost;
  } catch (error) {
    console.error(`Error parsing blog post ${fileName}:`, error);
    return null;
  }
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_CONTENT_PATH)) {
    console.warn('Blog content directory does not exist');
    return [];
  }
  
  const files = fs.readdirSync(BLOG_CONTENT_PATH);
  const blogFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
  
  const posts = blogFiles
    .map(fileName => {
      const filePath = path.join(BLOG_CONTENT_PATH, fileName);
      return parseBlogPost(filePath, fileName);
    })
    .filter((post): post is BlogPost => post !== null)
    .filter(post => post.status === 'published');
  
  return sortPosts(posts, 'date', 'desc');
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Get featured blog posts
export async function getFeaturedBlogPosts(limit?: number): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  const featuredPosts = posts.filter(post => post.featured);
  return limit ? featuredPosts.slice(0, limit) : featuredPosts;
}

// Get posts by category
export async function getBlogPostsByCategory(categorySlug: string, limit?: number): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  const categoryPosts = posts.filter(post => post.category.slug === categorySlug);
  return limit ? categoryPosts.slice(0, limit) : categoryPosts;
}

// Search and filter posts
export async function searchBlogPosts(
  query?: string,
  categorySlug?: string,
  tags?: string[],
  limit?: number
): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  
  const filteredPosts = filterPosts(allPosts, {
    search: query,
    category: categorySlug,
    tags
  });
  
  return limit ? filteredPosts.slice(0, limit) : filteredPosts;
}

// Get recent posts
export async function getRecentBlogPosts(limit: number = 5): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.slice(0, limit);
}

// Get blog statistics
export async function getBlogStats(): Promise<BlogStats> {
  const posts = await getAllBlogPosts();
  
  const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
  const averageReadingTime = Math.round(
    posts.reduce((sum, post) => sum + post.readingTime, 0) / posts.length
  );
  
  // Find most popular category by post count
  const categoryCount = posts.reduce((acc, post) => {
    acc[post.category.slug] = (acc[post.category.slug] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const mostPopularCategory = Object.entries(categoryCount)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'teaching-strategies';
  
  return {
    totalPosts: posts.length,
    totalCategories: BLOG_CATEGORIES.length,
    averageReadingTime,
    totalViews,
    mostPopularCategory
  };
}
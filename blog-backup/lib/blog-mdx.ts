import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content/blog');

function getLocalizedContentDirectory(locale: string = 'en'): string {
  if (locale === 'en') {
    return contentDirectory;
  }
  return path.join(contentDirectory, locale);
}

export interface BlogPostMeta {
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  authorBio?: string;
  publishDate: string;
  readingTime: string;
  featuredImage: string;
  featured?: boolean;
  seoKeywords: string[];
  slug: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
  excerpt: string;
}

export async function getAllPosts(locale: string = 'en'): Promise<BlogPost[]> {
  try {
    const localizedDir = getLocalizedContentDirectory(locale);
    
    // Try localized directory first, fallback to default
    const dirsToCheck = locale !== 'en' ? [localizedDir, contentDirectory] : [contentDirectory];
    
    const allPosts: BlogPost[] = [];
    
    for (const dir of dirsToCheck) {
      if (!fs.existsSync(dir)) continue;
    
    const fileNames = fs.readdirSync(dir).filter(name => 
      name.endsWith('.md') || name.endsWith('.mdx')
    );
    
    const posts = await Promise.all(
      fileNames.map(async (fileName) => {
        const slug = fileName.replace(/\.mdx?$/, '');
        const fullPath = path.join(dir, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        const { data, content } = matter(fileContents);
        
        // Process markdown to HTML
        const processedContent = await remark()
          .use(html, { sanitize: false })
          .process(content);
        
        const contentHtml = processedContent.toString();
        
        // Generate excerpt (first paragraph)
        const excerpt = content.split('\n\n')[1] || content.substring(0, 150) + '...';

        return {
          slug,
          title: data.title || 'Untitled',
          description: data.description || data.excerpt || '',
          category: data.category || 'General',
          tags: Array.isArray(data.tags) ? data.tags : [],
          author: data.author || (data.author?.name) || 'Zaza Team',
          authorBio: data.authorBio || (data.author?.bio) || '',
          publishDate: data.publishDate || data.date || new Date().toISOString().split('T')[0],
          readingTime: data.readingTime || data.readTime || estimateReadingTime(content),
          featuredImage: data.featuredImage || data.image || data.ogImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
          featured: data.featured || false,
          seoKeywords: Array.isArray(data.seoKeywords) ? data.seoKeywords : (Array.isArray(data.tags) ? data.tags : []),
          content: contentHtml,
          excerpt: data.excerpt || excerpt
        } as BlogPost;
      })
    );
    
    allPosts.push(...posts);
  }
  
  // Remove duplicates (prefer localized content)
  const uniquePosts = allPosts.reduce((acc, post) => {
    if (!acc.find(p => p.slug === post.slug)) {
      acc.push(post);
    }
    return acc;
  }, [] as BlogPost[]);

  // Sort posts by date, newest first
  return uniquePosts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
  } catch (error) {
    console.error('Error loading blog posts:', error);
    // Return empty array instead of throwing error to prevent 500
    return [];
  }
}

export async function getPostBySlug(slug: string, locale: string = 'en'): Promise<BlogPost | null> {
  try {
    const localizedDir = getLocalizedContentDirectory(locale);
    const dirsToCheck = locale !== 'en' ? [localizedDir, contentDirectory] : [contentDirectory];
    
    for (const dir of dirsToCheck) {
      // Try .mdx first, then .md
      const mdxPath = path.join(dir, `${slug}.mdx`);
      const mdPath = path.join(dir, `${slug}.md`);
      
      let fileContents: string;
      let fullPath: string;
      
      if (fs.existsSync(mdxPath)) {
        fileContents = fs.readFileSync(mdxPath, 'utf8');
        fullPath = mdxPath;
      } else if (fs.existsSync(mdPath)) {
        fileContents = fs.readFileSync(mdPath, 'utf8');
        fullPath = mdPath;
      } else {
        continue;
      }

      const { data, content } = matter(fileContents);
      
      // Process markdown to HTML
      const processedContent = await remark()
        .use(html, { sanitize: false })
        .process(content);
      
      const contentHtml = processedContent.toString();
      
      // Generate excerpt
      const excerpt = content.split('\n\n')[1] || content.substring(0, 150) + '...';

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || data.excerpt || '',
        category: data.category || 'General',
        tags: Array.isArray(data.tags) ? data.tags : [],
        author: data.author || (data.author?.name) || 'Zaza Team',
        authorBio: data.authorBio || (data.author?.bio) || '',
        publishDate: data.publishDate || data.date || new Date().toISOString().split('T')[0],
        readingTime: data.readingTime || estimateReadingTime(content),
        featuredImage: data.featuredImage || data.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
        featured: data.featured || false,
        seoKeywords: Array.isArray(data.seoKeywords) ? data.seoKeywords : (Array.isArray(data.tags) ? data.tags : []),
        content: contentHtml,
        excerpt: data.excerpt || excerpt
      } as BlogPost;
    }
    
    return null;
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
}

export async function getPostsByCategory(category: string, locale: string = 'en'): Promise<BlogPost[]> {
  const allPosts = await getAllPosts(locale);
  return allPosts.filter(post => post.category === category);
}

export async function getFeaturedPosts(locale: string = 'en'): Promise<BlogPost[]> {
  try {
    const allPosts = await getAllPosts(locale);
    return allPosts.filter(post => post.featured);
  } catch (error) {
    console.error('Error loading featured posts:', error);
    return [];
  }
}

export async function getAllCategories(locale: string = 'en'): Promise<string[]> {
  try {
    const allPosts = await getAllPosts(locale);
    const categories = allPosts.map(post => post.category);
    return Array.from(new Set(categories)).sort();
  } catch (error) {
    console.error('Error loading categories:', error);
    return ['General', 'Teaching Tips', 'AI Tools'];
  }
}

export async function getAllTags(locale: string = 'en'): Promise<string[]> {
  const allPosts = await getAllPosts(locale);
  const allTags = allPosts.flatMap(post => post.tags);
  return Array.from(new Set(allTags)).sort();
}

export async function getRelatedPosts(currentSlug: string, limit: number = 3, locale: string = 'en'): Promise<BlogPost[]> {
  const currentPost = await getPostBySlug(currentSlug, locale);
  if (!currentPost) return [];

  const allPosts = await getAllPosts(locale);
  
  // Filter out current post
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug);
  
  // Score posts based on category and tag matches
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Same category gets higher score
    if (post.category === currentPost.category) {
      score += 10;
    }
    
    // Shared tags get points
    const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
    score += sharedTags.length * 2;
    
    return { post, score };
  });
  
  // Sort by score and return top matches
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

export function generatePostUrl(slug: string, locale?: string): string {
  return locale ? `/${locale}/blog/${slug}` : `/blog/${slug}`;
}

export function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}
// Final blog service using static TypeScript data
import { allBlogPosts, type BlogPost } from './static-blog-data';

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return allBlogPosts;
}

// Get single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return allBlogPosts.find(post => post.slug === slug) || null;
}

// Get featured posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return allBlogPosts.filter(post => post.featured);
}

// Get posts by category
export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  return allBlogPosts.filter(post => post.category.slug === categorySlug);
}

// Get all categories with counts
export async function getAllCategories(): Promise<Array<{ category: BlogPost['category'], count: number }>> {
  const categoryCounts = new Map<string, { category: BlogPost['category'], count: number }>();
  
  allBlogPosts.forEach(post => {
    const key = post.category.slug;
    if (categoryCounts.has(key)) {
      categoryCounts.get(key)!.count++;
    } else {
      categoryCounts.set(key, { category: post.category, count: 1 });
    }
  });
  
  return Array.from(categoryCounts.values()).sort((a, b) => b.count - a.count);
}

// Search posts
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const lowerQuery = query.toLowerCase();
  return allBlogPosts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.description.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// Get recent posts
export async function getRecentPosts(limit: number = 10): Promise<BlogPost[]> {
  return allBlogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

// Export the BlogPost type
export type { BlogPost };
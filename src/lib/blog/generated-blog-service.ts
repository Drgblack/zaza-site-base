// Generated blog service using build-time data
import blogData from './blog-data.json';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  fullContent: string;
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
    icon: string;
    description: string;
  };
  tags: string[];
  gradeLevels: string[];
  featured: boolean;
  image: string | null;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  difficulty: string;
  isVideo: boolean;
  videoUrl: string | null;
}

// Type the imported data
const typedBlogData = blogData as BlogPost[];

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return typedBlogData;
}

// Get featured posts
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  return typedBlogData.filter(post => post.featured);
}

// Get posts by category
export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  return typedBlogData.filter(post => post.category.slug === categorySlug);
}

// Get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  return typedBlogData.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

// Get posts by grade level
export async function getPostsByGradeLevel(gradeLevel: string): Promise<BlogPost[]> {
  return typedBlogData.filter(post => 
    post.gradeLevels.includes(gradeLevel)
  );
}

// Search posts
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const lowerQuery = query.toLowerCase();
  return typedBlogData.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.description.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

// Get single post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return typedBlogData.find(post => post.slug === slug) || null;
}

// Get recent posts
export async function getRecentPosts(limit: number = 10): Promise<BlogPost[]> {
  return typedBlogData
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

// Get related posts
export async function getRelatedPosts(currentPost: BlogPost, limit: number = 4): Promise<BlogPost[]> {
  return typedBlogData
    .filter(post => 
      post.id !== currentPost.id && (
        post.category.slug === currentPost.category.slug ||
        post.tags.some(tag => currentPost.tags.includes(tag))
      )
    )
    .sort(() => Math.random() - 0.5)
    .slice(0, limit);
}

// Get all categories with post counts
export async function getAllCategories(): Promise<Array<{ category: BlogPost['category'], count: number }>> {
  const categoryCounts = new Map<string, { category: BlogPost['category'], count: number }>();
  
  typedBlogData.forEach(post => {
    const key = post.category.slug;
    if (categoryCounts.has(key)) {
      categoryCounts.get(key)!.count++;
    } else {
      categoryCounts.set(key, { category: post.category, count: 1 });
    }
  });
  
  return Array.from(categoryCounts.values())
    .sort((a, b) => b.count - a.count);
}

// Get all tags with counts
export async function getAllTags(): Promise<Array<{ tag: string, count: number }>> {
  const tagCounts = new Map<string, number>();
  
  typedBlogData.forEach(post => {
    post.tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    });
  });
  
  return Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// Get posts for teachers by difficulty
export async function getPostsByDifficulty(difficulty: string): Promise<BlogPost[]> {
  return typedBlogData.filter(post => post.difficulty === difficulty);
}

// Get video posts
export async function getVideoPosts(): Promise<BlogPost[]> {
  return typedBlogData.filter(post => post.isVideo);
}
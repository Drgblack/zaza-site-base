// Simple, reliable blog service using direct JSON import
import fs from 'fs';
import path from 'path';

export interface SimpleBlogPost {
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
  difficulty: string;
}

// Static blog data loaded at runtime
let blogPosts: SimpleBlogPost[] | null = null;

// Load blog data from JSON file
function loadBlogData(): SimpleBlogPost[] {
  if (blogPosts !== null) {
    return blogPosts;
  }

  try {
    const jsonPath = path.join(process.cwd(), 'src', 'lib', 'blog', 'blog-data.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const rawPosts = JSON.parse(jsonData);
    
    // Transform to our interface and add images
    blogPosts = rawPosts.map((post: any, index: number) => ({
      id: post.slug || `post-${index}`,
      slug: post.slug || `post-${index}`,
      title: post.title || 'Untitled Post',
      description: post.description || 'No description available',
      content: (post.content || post.fullContent || '').substring(0, 300) + '...',
      fullContent: post.fullContent || post.content || 'Content coming soon...',
      publishedAt: post.publishedAt || new Date().toISOString(),
      author: {
        name: post.author?.name || 'Zaza Team',
        bio: post.author?.bio || 'Educational experts',
        avatar: post.author?.avatar || '/images/team/zaza-team.jpg',
        role: post.author?.role || 'Education Specialist'
      },
      readingTime: post.readingTime || 5,
      category: {
        name: post.category?.name || 'Teacher Tips',
        slug: post.category?.slug || 'teacher-tips',
        color: getCategoryColor(post.category?.name || 'Teacher Tips'),
        icon: getCategoryIcon(post.category?.name || 'Teacher Tips'),
        description: post.category?.description || 'Educational insights'
      },
      tags: Array.isArray(post.tags) ? post.tags : [],
      gradeLevels: Array.isArray(post.gradeLevels) ? post.gradeLevels : [],
      featured: post.featured || false,
      image: getPostImage(post.category?.name || 'Teacher Tips', index),
      difficulty: post.difficulty || 'intermediate'
    }));

    console.log(`Loaded ${blogPosts.length} blog posts`);
    return blogPosts;
  } catch (error) {
    console.error('Error loading blog data:', error);
    // Return fallback data
    return [{
      id: 'fallback-post',
      slug: 'fallback-post',
      title: 'Welcome to Our Blog',
      description: 'Educational content for teachers',
      content: 'Blog content is being loaded...',
      fullContent: '# Welcome to Our Blog\n\nEducational content for teachers is being loaded. Please check back soon!',
      publishedAt: new Date().toISOString(),
      author: {
        name: 'Zaza Team',
        bio: 'Educational experts',
        avatar: '/images/team/zaza-team.jpg',
        role: 'Education Specialist'
      },
      readingTime: 2,
      category: {
        name: 'Teacher Tips',
        slug: 'teacher-tips',
        color: 'bg-blue-500',
        icon: '💡',
        description: 'Educational insights'
      },
      tags: ['welcome'],
      gradeLevels: [],
      featured: true,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop',
      difficulty: 'beginner'
    }];
  }
}

function getCategoryColor(categoryName: string): string {
  const colors: { [key: string]: string } = {
    'Teacher Tips': 'bg-blue-500',
    'AI Tools': 'bg-purple-500',
    'Productivity': 'bg-orange-500',
    'Parent Communication': 'bg-pink-500',
    'Lesson Planning': 'bg-green-500',
    'Classroom Management': 'bg-red-500'
  };
  return colors[categoryName] || 'bg-blue-500';
}

function getCategoryIcon(categoryName: string): string {
  const icons: { [key: string]: string } = {
    'Teacher Tips': '💡',
    'AI Tools': '🤖',
    'Productivity': '⚡',
    'Parent Communication': '💬',
    'Lesson Planning': '📝',
    'Classroom Management': '🎯'
  };
  return icons[categoryName] || '💡';
}

function getPostImage(category: string, index: number): string {
  const images = {
    'Teacher Tips': [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop'
    ],
    'AI Tools': [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1555949963-ff9fe496c531?w=800&h=400&fit=crop'
    ],
    'Productivity': [
      'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&h=400&fit=crop'
    ]
  };

  const categoryImages = images[category as keyof typeof images] || images['Teacher Tips'];
  return categoryImages[index % categoryImages.length];
}

// Export functions
export async function getAllBlogPosts(): Promise<SimpleBlogPost[]> {
  return loadBlogData();
}

export async function getBlogPostBySlug(slug: string): Promise<SimpleBlogPost | null> {
  const posts = loadBlogData();
  return posts.find(post => post.slug === slug) || null;
}

export async function getFeaturedPosts(): Promise<SimpleBlogPost[]> {
  const posts = loadBlogData();
  return posts.filter(post => post.featured);
}

export async function getPostsByCategory(categorySlug: string): Promise<SimpleBlogPost[]> {
  const posts = loadBlogData();
  return posts.filter(post => post.category.slug === categorySlug);
}

export async function getAllCategories(): Promise<Array<{ category: SimpleBlogPost['category'], count: number }>> {
  const posts = loadBlogData();
  const categoryCounts = new Map<string, { category: SimpleBlogPost['category'], count: number }>();
  
  posts.forEach(post => {
    const key = post.category.slug;
    if (categoryCounts.has(key)) {
      categoryCounts.get(key)!.count++;
    } else {
      categoryCounts.set(key, { category: post.category, count: 1 });
    }
  });
  
  return Array.from(categoryCounts.values()).sort((a, b) => b.count - a.count);
}
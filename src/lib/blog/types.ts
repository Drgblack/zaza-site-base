// Modern Blog Type System
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  excerpt: string;
  
  // Publication details
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    bio?: string;
    avatar?: string;
    role?: string;
  };
  
  // Content metadata
  readingTime: number; // in minutes
  wordCount: number;
  
  // Organization
  category: BlogCategory;
  tags: string[];
  featured: boolean;
  
  // Teacher-specific
  teacherLevel?: TeacherLevel[];
  subject?: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  
  // SEO & Social
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
  };
  
  // Analytics
  views?: number;
  likes?: number;
  
  // Content flags
  status: 'draft' | 'published' | 'archived';
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string; // Tailwind color class
  icon: string; // Lucide icon name
  order: number;
}

export type TeacherLevel = 
  | 'early-childhood' 
  | 'elementary' 
  | 'middle-school' 
  | 'high-school' 
  | 'higher-education'
  | 'admin'
  | 'new-teacher'
  | 'veteran';

export interface BlogFilter {
  category?: string;
  tags?: string[];
  teacherLevel?: TeacherLevel;
  difficulty?: BlogPost['difficulty'];
  readingTime?: 'quick' | 'medium' | 'long'; // <5min, 5-15min, >15min
  search?: string;
}

export interface BlogStats {
  totalPosts: number;
  totalCategories: number;
  averageReadingTime: number;
  totalViews: number;
  mostPopularCategory: string;
}
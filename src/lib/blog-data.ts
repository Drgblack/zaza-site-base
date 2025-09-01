export interface BlogPost {
  title: string;
  description: string;
  date: string;
  slug: string;
  image: string;
  category: string;
  author?: string;
  readTime?: string;
}

export const blogPosts: BlogPost[] = [
  // Featured Post - Teacher Tips
  {
    title: "5 Phrases That Turn Parent Emails From Stressful to Supportive",
    description: "Transform difficult parent conversations with these proven communication strategies that build trust and collaboration. Real examples included.",
    date: "2024-01-15",
    slug: "parent-emails-stressful-to-supportive",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop",
    category: "Teacher Tips",
    author: "Sarah Mitchell",
    readTime: "4 min read"
  },

  // Productivity Category
  {
    title: "How I Won Back My Sunday Afternoons",
    description: "A teacher's honest story about reclaiming weekend time by automating reports and administrative tasks. Plus the tools that made it possible.",
    date: "2024-01-12",
    slug: "won-back-sunday-afternoons",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    category: "Productivity",
    author: "Jessica Chen",
    readTime: "5 min read"
  },

  // Parent Communication Category  
  {
    title: "The Secret to Confident Parent Reports",
    description: "Step-by-step approach to writing parent reports that communicate effectively while maintaining professional confidence. Discover how AI assistants can help.",
    date: "2024-01-10",
    slug: "secret-confident-parent-reports",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop",
    category: "Parent Communication",
    author: "Michael Rodriguez",
    readTime: "6 min read"
  },

  // Wellbeing Category
  {
    title: "Less Time Writing, More Time Living",
    description: "Discover the emotional freedom that comes from streamlining your administrative tasks. A motivational piece about reclaiming your evenings and weekends.",
    date: "2024-01-08",
    slug: "less-time-writing-more-living",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop",
    category: "Wellbeing",
    author: "Emma Thompson",
    readTime: "3 min read"
  },

  // Additional Teacher Tips
  {
    title: "AI-Powered Lesson Planning: A Step-by-Step Guide",
    description: "Transform your lesson planning process with AI tools that align with curriculum standards and student needs.",
    date: "2024-01-05",
    slug: "ai-lesson-planning-guide",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop",
    category: "Teacher Tips",
    author: "Michael Chen",
    readTime: "10 min read"
  },
  {
    title: "Classroom Management with AI Assistants",
    description: "Discover how AI can help you maintain positive classroom environments and track student behavior patterns.",
    date: "2024-01-03",
    slug: "classroom-management-ai-assistant",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop",
    category: "Teacher Tips",
    author: "Emily Rodriguez",
    readTime: "7 min read"
  },

  // Additional Productivity
  {
    title: "Automate Your Grading Workflow",
    description: "Cut your grading time in half with smart AI tools that provide consistent, meaningful feedback on student work.",
    date: "2024-01-07",
    slug: "automate-grading-workflow",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    category: "Productivity",
    author: "Lisa Thompson",
    readTime: "5 min read"
  },
  {
    title: "Time Management Strategies for Modern Teachers",
    description: "Practical techniques to reclaim your evenings and weekends while maintaining teaching excellence.",
    date: "2024-01-02",
    slug: "teacher-time-management",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=600&fit=crop",
    category: "Productivity",
    author: "Jennifer Wu",
    readTime: "8 min read"
  },

  // Additional Parent Communication
  {
    title: "Difficult Conversations Made Easier",
    description: "Navigate challenging parent conversations with confidence using AI-powered communication strategies.",
    date: "2024-01-06",
    slug: "difficult-parent-conversations",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
    category: "Parent Communication",
    author: "Thomas Anderson",
    readTime: "9 min read"
  },
  {
    title: "Building Parent Partnerships Through Technology",
    description: "Use digital tools to create stronger relationships with parents and improve student outcomes.",
    date: "2024-01-01",
    slug: "parent-partnerships-technology",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    category: "Parent Communication",
    author: "Rachel Green",
    readTime: "8 min read"
  }
];

export function getFeaturedPost(): BlogPost {
  return blogPosts[0]; // First post is featured
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getAllCategories(): string[] {
  const categories = blogPosts.map(post => post.category);
  return Array.from(new Set(categories));
}

export function getRecentPosts(limit: number = 6): BlogPost[] {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
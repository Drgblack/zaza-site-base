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
  // Featured Post
  {
    title: "10 Time-Saving AI Tools for Teachers",
    description: "Discover the latest AI tools that can help you save hours every week in lesson planning, grading, and parent communication. From Zaza Promptly to classroom management assistants.",
    date: "2024-01-15",
    slug: "ai-tools-for-teachers",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
    category: "Teacher Tips",
    author: "Zaza Team",
    readTime: "8 min read"
  },

  // Teacher Tips Category
  {
    title: "Effective Feedback Strategies with AI",
    description: "Learn how to combine AI assistance with personal touch to provide meaningful student feedback that drives learning outcomes.",
    date: "2024-01-10",
    slug: "effective-feedback-ai",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
    category: "Teacher Tips",
    author: "Sarah Johnson",
    readTime: "6 min read"
  },
  {
    title: "AI-Powered Lesson Planning: A Step-by-Step Guide",
    description: "Transform your lesson planning process with AI tools that align with curriculum standards and student needs.",
    date: "2024-01-08",
    slug: "ai-lesson-planning-guide",
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop",
    category: "Teacher Tips",
    author: "Michael Chen",
    readTime: "10 min read"
  },
  {
    title: "Classroom Management with AI Assistants",
    description: "Discover how AI can help you maintain positive classroom environments and track student behavior patterns.",
    date: "2024-01-05",
    slug: "classroom-management-ai-assistant",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop",
    category: "Teacher Tips",
    author: "Emily Rodriguez",
    readTime: "7 min read"
  },
  {
    title: "Creating Personalized Learning Paths with AI",
    description: "Use AI to identify learning gaps and create customized educational experiences for each student.",
    date: "2024-01-03",
    slug: "personalized-learning-ai",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    category: "Teacher Tips",
    author: "David Park",
    readTime: "9 min read"
  },

  // Productivity Category
  {
    title: "Automate Your Grading Workflow",
    description: "Cut your grading time in half with smart AI tools that provide consistent, meaningful feedback on student work.",
    date: "2024-01-12",
    slug: "automate-grading-workflow",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    category: "Productivity",
    author: "Lisa Thompson",
    readTime: "5 min read"
  },
  {
    title: "Time Management Strategies for Modern Teachers",
    description: "Practical techniques to reclaim your evenings and weekends while maintaining teaching excellence.",
    date: "2024-01-07",
    slug: "teacher-time-management",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=800&h=600&fit=crop",
    category: "Productivity",
    author: "Jennifer Wu",
    readTime: "8 min read"
  },
  {
    title: "Streamline Administrative Tasks with AI",
    description: "From attendance tracking to progress reports, discover how AI can handle routine administrative work.",
    date: "2024-01-02",
    slug: "streamline-admin-tasks-ai",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    category: "Productivity",
    author: "Robert Kim",
    readTime: "6 min read"
  },
  {
    title: "Digital Organization for Teachers",
    description: "Create a digital workspace that keeps your lessons, resources, and communications perfectly organized.",
    date: "2023-12-28",
    slug: "digital-organization-teachers",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=600&fit=crop",
    category: "Productivity",
    author: "Amanda Foster",
    readTime: "7 min read"
  },

  // Parent Communication Category
  {
    title: "AI-Generated Parent Messages That Work",
    description: "Master the art of parent communication with AI tools that help you craft professional, empathetic messages.",
    date: "2024-01-11",
    slug: "ai-parent-messages",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
    category: "Parent Communication",
    author: "Maria Garcia",
    readTime: "6 min read"
  },
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
  },
  {
    title: "Multilingual Communication with AI",
    description: "Break down language barriers and communicate effectively with diverse parent communities.",
    date: "2023-12-30",
    slug: "multilingual-communication-ai",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
    category: "Parent Communication",
    author: "Carlos Martinez",
    readTime: "5 min read"
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
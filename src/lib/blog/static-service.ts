// Static blog service that works with Next.js
// This loads blog posts at build time

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

// Hardcoded blog posts from the saved content
// This is a temporary solution to get the blog working
export const blogPosts: SimpleBlogPost[] = [
  {
    id: "understanding-ai-learning-model",
    slug: "understanding-ai-learning-model",
    title: "Understanding AI Learning Models in Education",
    description: "A comprehensive guide to how AI adapts to student needs in modern educational settings.",
    content: "AI learning models are revolutionizing education...",
    publishedAt: "2024-01-15T00:00:00Z",
    author: {
      name: "Dr. Sarah Chen",
      bio: "AI Education Specialist",
      avatar: "/images/team/sarah-chen.jpg",
      role: "Education Technology Expert"
    },
    readingTime: 8,
    category: {
      name: "AI Tools",
      slug: "ai-tools",
      color: "bg-purple-500"
    },
    tags: ["AI", "Machine Learning", "EdTech"],
    featured: true
  },
  {
    id: "classroom-management-strategies",
    slug: "classroom-management-strategies",
    title: "Effective Classroom Management Strategies for 2024",
    description: "Modern approaches to creating a positive and productive learning environment.",
    content: "Classroom management in 2024 requires new approaches...",
    publishedAt: "2024-01-12T00:00:00Z",
    author: {
      name: "Michael Thompson",
      bio: "Veteran Educator",
      avatar: "/images/team/michael-thompson.jpg",
      role: "Classroom Management Expert"
    },
    readingTime: 6,
    category: {
      name: "Classroom Management",
      slug: "classroom-management",
      color: "bg-orange-500"
    },
    tags: ["Classroom", "Behavior", "Teaching"],
    featured: false
  },
  {
    id: "parent-teacher-communication",
    slug: "parent-teacher-communication",
    title: "Building Strong Parent-Teacher Relationships",
    description: "Strategies for effective communication with parents in the digital age.",
    content: "Strong parent-teacher relationships are crucial...",
    publishedAt: "2024-01-10T00:00:00Z",
    author: {
      name: "Emily Rodriguez",
      bio: "Communication Specialist",
      avatar: "/images/team/emily-rodriguez.jpg",
      role: "Parent Engagement Expert"
    },
    readingTime: 5,
    category: {
      name: "Parent Communication",
      slug: "parent-communication",
      color: "bg-pink-500"
    },
    tags: ["Parents", "Communication", "Engagement"],
    featured: false
  },
  {
    id: "productivity-tools-teachers",
    slug: "productivity-tools-teachers",
    title: "Top 10 Productivity Tools for Teachers",
    description: "Essential digital tools to streamline your teaching workflow and save time.",
    content: "In today's fast-paced educational environment...",
    publishedAt: "2024-01-08T00:00:00Z",
    author: {
      name: "Jason Park",
      bio: "EdTech Enthusiast",
      avatar: "/images/team/jason-park.jpg",
      role: "Productivity Coach"
    },
    readingTime: 7,
    category: {
      name: "Productivity",
      slug: "productivity",
      color: "bg-blue-500"
    },
    tags: ["Productivity", "Tools", "Technology"],
    featured: true
  },
  {
    id: "differentiated-instruction",
    slug: "differentiated-instruction",
    title: "Mastering Differentiated Instruction",
    description: "How to tailor your teaching to meet diverse student needs effectively.",
    content: "Every student learns differently...",
    publishedAt: "2024-01-05T00:00:00Z",
    author: {
      name: "Dr. Lisa Wang",
      bio: "Curriculum Designer",
      avatar: "/images/team/lisa-wang.jpg",
      role: "Differentiation Specialist"
    },
    readingTime: 9,
    category: {
      name: "Teaching Strategies",
      slug: "teaching-strategies",
      color: "bg-green-500"
    },
    tags: ["Differentiation", "Teaching", "Learning Styles"],
    featured: false
  },
  {
    id: "ai-grading-systems",
    slug: "ai-grading-systems",
    title: "How AI is Transforming Grading and Assessment",
    description: "Explore the benefits and considerations of AI-powered grading systems.",
    content: "AI grading systems are becoming increasingly sophisticated...",
    publishedAt: "2024-01-03T00:00:00Z",
    author: {
      name: "Dr. Robert James",
      bio: "Assessment Technology Expert",
      avatar: "/images/team/robert-james.jpg",
      role: "AI Assessment Specialist"
    },
    readingTime: 6,
    category: {
      name: "AI Tools",
      slug: "ai-tools",
      color: "bg-purple-500"
    },
    tags: ["AI", "Grading", "Assessment"],
    featured: false
  },
  {
    id: "student-engagement-techniques",
    slug: "student-engagement-techniques",
    title: "Innovative Student Engagement Techniques",
    description: "Creative ways to keep students motivated and actively participating.",
    content: "Student engagement is the key to successful learning...",
    publishedAt: "2024-01-01T00:00:00Z",
    author: {
      name: "Amanda Foster",
      bio: "Engagement Strategist",
      avatar: "/images/team/amanda-foster.jpg",
      role: "Student Engagement Expert"
    },
    readingTime: 7,
    category: {
      name: "Teaching Strategies",
      slug: "teaching-strategies",
      color: "bg-green-500"
    },
    tags: ["Engagement", "Motivation", "Active Learning"],
    featured: true
  },
  {
    id: "digital-citizenship",
    slug: "digital-citizenship",
    title: "Teaching Digital Citizenship in the Modern Classroom",
    description: "Essential skills for responsible online behavior and digital literacy.",
    content: "Digital citizenship is more important than ever...",
    publishedAt: "2023-12-28T00:00:00Z",
    author: {
      name: "Kevin Liu",
      bio: "Digital Literacy Advocate",
      avatar: "/images/team/kevin-liu.jpg",
      role: "Digital Citizenship Expert"
    },
    readingTime: 8,
    category: {
      name: "Teaching Strategies",
      slug: "teaching-strategies",
      color: "bg-green-500"
    },
    tags: ["Digital Citizenship", "Online Safety", "Technology"],
    featured: false
  },
  {
    id: "time-management-teachers",
    slug: "time-management-teachers",
    title: "Time Management Strategies for Busy Teachers",
    description: "Practical tips to balance teaching, planning, and personal life effectively.",
    content: "Time management is crucial for teacher wellbeing...",
    publishedAt: "2023-12-25T00:00:00Z",
    author: {
      name: "Sarah Mitchell",
      bio: "Teacher Wellness Coach",
      avatar: "/images/team/sarah-mitchell.jpg",
      role: "Time Management Expert"
    },
    readingTime: 5,
    category: {
      name: "Productivity",
      slug: "productivity",
      color: "bg-blue-500"
    },
    tags: ["Time Management", "Work-Life Balance", "Productivity"],
    featured: false
  },
  {
    id: "inclusive-classroom-practices",
    slug: "inclusive-classroom-practices",
    title: "Creating an Inclusive Classroom Environment",
    description: "Strategies for ensuring all students feel welcomed and supported.",
    content: "Inclusive education benefits all students...",
    publishedAt: "2023-12-22T00:00:00Z",
    author: {
      name: "Dr. Maria Gonzalez",
      bio: "Inclusion Specialist",
      avatar: "/images/team/maria-gonzalez.jpg",
      role: "Diversity & Inclusion Expert"
    },
    readingTime: 10,
    category: {
      name: "Teaching Strategies",
      slug: "teaching-strategies",
      color: "bg-green-500"
    },
    tags: ["Inclusion", "Diversity", "Equity"],
    featured: true
  }
];

// Get all blog posts
export async function getAllSimpleBlogPosts(): Promise<SimpleBlogPost[]> {
  return blogPosts;
}

// Get a single blog post by slug
export async function getSimpleBlogPostBySlug(slug: string): Promise<SimpleBlogPost | null> {
  return blogPosts.find(post => post.slug === slug) || null;
}
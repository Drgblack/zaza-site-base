// Fallback blog service with hardcoded data to work around production issues
import { TeacherBlogPost, BlogFilter } from './teacher-blog-types';

// Hardcoded blog posts data
const BLOG_POSTS: TeacherBlogPost[] = [
  {
    id: "5-minute-ai-wins-busy-teachers",
    slug: "5-minute-ai-wins-busy-teachers",
    title: "5 Minute AI Wins for Busy Teachers",
    description: "Quick AI tools that save time and boost productivity in the classroom",
    content: "Discover powerful AI tools that can be implemented in just 5 minutes to transform your teaching workflow...",
    fullContent: "# 5 Minute AI Wins for Busy Teachers\n\nAs teachers, we're always looking for ways to save time and improve our effectiveness. AI tools can be game-changers, but many educators feel overwhelmed by the learning curve. The good news? You can start seeing benefits in just 5 minutes.\n\n## Quick AI Tools for Teachers\n\n### 1. AI Writing Assistant\nUse ChatGPT or Claude to help with:\n- Writing lesson plan outlines\n- Creating quiz questions\n- Drafting parent communication emails\n- Generating creative writing prompts\n\n### 2. Content Creation\nAI can help you:\n- Create visual aids and infographics\n- Design engaging presentations\n- Generate examples and analogies\n- Adapt content for different learning levels\n\n### 3. Administrative Tasks\n- Grading assistance for open-ended questions\n- Feedback generation\n- Meeting notes summarization\n- Calendar and task management\n\n## Getting Started\n\n1. Choose one tool that addresses your biggest time sink\n2. Spend 5 minutes learning the basics\n3. Use it for one task this week\n4. Gradually expand to other areas\n\nRemember: AI is a teaching assistant, not a replacement. Use it to amplify your expertise and free up time for what matters most - connecting with your students.",
    publishedAt: "2024-01-15T10:00:00Z",
    lastUpdated: "2024-01-15T10:00:00Z",
    readingTime: 5,
    readingTimeCategory: "5-min",
    author: {
      name: "Zaza Education Team",
      bio: "Dedicated to empowering teachers with AI",
      avatar: "/images/team/zaza-team.jpg",
      classroomCredentials: "Education Specialist",
      expertise: ["AI in Education", "Teacher Productivity"]
    },
    subjects: ["ela"],
    gradeBands: ["k-2"],
    contentType: "how-to",
    standards: [],
    tags: ["ai", "productivity", "time-saving", "quick-wins"],
    materials: [
      { item: "Computer or tablet", optional: false },
      { item: "Internet access", optional: false }
    ],
    prepTime: "5 minutes",
    classTime: "Ongoing",
    keyTakeaways: [
      "AI tools can save hours of prep time with just minutes of setup",
      "Start small - pick one tool that solves your biggest challenge",
      "AI works best as a teaching assistant, not a replacement"
    ],
    teacherBlocks: [],
    downloads: [],
    featured: true,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=630&fit=crop",
    imageAlt: "Teacher using laptop with AI assistant - Educational technology",
    helpfulVotes: { positive: 0, negative: 0 },
    saveCount: 0,
    downloadCount: 0
  },
  {
    id: "ai-tools-for-teachers",
    slug: "ai-tools-for-teachers",
    title: "Essential AI Tools Every Teacher Should Know",
    description: "A comprehensive guide to the most useful AI tools for educators",
    content: "Explore the essential AI tools that can revolutionize your teaching practice and save valuable time...",
    fullContent: "# Essential AI Tools Every Teacher Should Know\n\nAI is transforming education, offering teachers powerful new ways to create content, provide feedback, and manage their workload. Here are the essential tools every educator should have in their toolkit.\n\n## Content Creation Tools\n\n### ChatGPT/Claude\n- **Best for:** Lesson planning, quiz generation, email drafting\n- **Time saved:** 2-3 hours per week\n- **Getting started:** Create free account, start with simple prompts\n\n### Canva AI\n- **Best for:** Visual content, presentations, worksheets\n- **Time saved:** 1-2 hours per week\n- **Getting started:** Use Magic Design feature\n\n### Grammarly\n- **Best for:** Writing feedback, document editing\n- **Time saved:** 30 minutes per day\n- **Getting started:** Browser extension installation\n\n## Assessment and Feedback\n\n### Turnitin\n- **Best for:** Plagiarism detection, originality checking\n- **Time saved:** 1 hour per assignment\n- **Getting started:** School subscription required\n\n### Gradescope\n- **Best for:** Streamlined grading, rubric creation\n- **Time saved:** 2-4 hours per week\n- **Getting started:** Upload assignment template\n\n## Classroom Management\n\n### ClassDojo\n- **Best for:** Behavior tracking, parent communication\n- **Time saved:** 30 minutes per day\n- **Getting started:** Create class, invite students\n\n### Google Classroom AI\n- **Best for:** Assignment distribution, feedback loops\n- **Time saved:** 1-2 hours per week\n- **Getting started:** Enable AI features in settings\n\n## Implementation Tips\n\n1. **Start small** - Choose one tool per month to learn\n2. **Focus on pain points** - Address your biggest time wasters first\n3. **Share with colleagues** - Build a supportive AI learning community\n4. **Stay ethical** - Always maintain academic integrity\n5. **Keep learning** - AI tools evolve rapidly\n\n## Next Steps\n\nPick one tool from this list that addresses your biggest challenge. Spend 15 minutes this week exploring it. You'll be amazed at how much time you can save!",
    publishedAt: "2024-01-10T10:00:00Z",
    lastUpdated: "2024-01-10T10:00:00Z",
    readingTime: 8,
    readingTimeCategory: "10-min",
    author: {
      name: "Zaza Education Team", 
      bio: "Dedicated to empowering teachers with AI",
      avatar: "/images/team/zaza-team.jpg",
      classroomCredentials: "Education Technology Specialist",
      expertise: ["AI Tools", "Educational Technology"]
    },
    subjects: ["technology"],
    gradeBands: ["3-5"],
    contentType: "explainer",
    standards: [],
    tags: ["ai-tools", "technology", "efficiency", "teaching-resources"],
    materials: [
      { item: "Computer or tablet", optional: false },
      { item: "Reliable internet connection", optional: false },
      { item: "Email account for tool registration", optional: false }
    ],
    prepTime: "15 minutes",
    classTime: "Varies by tool",
    keyTakeaways: [
      "AI tools can save teachers 5-10 hours per week when properly implemented",
      "Start with one tool and master it before adding others",
      "Focus on tools that solve your specific teaching challenges",
      "Always maintain ethical standards when using AI in education"
    ],
    teacherBlocks: [],
    downloads: [],
    featured: false,
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=630&fit=crop",
    imageAlt: "Various AI tools displayed on computer screen - Technology for teachers",
    helpfulVotes: { positive: 0, negative: 0 },
    saveCount: 0,
    downloadCount: 0
  }
];

// Get all blog posts with filtering
export async function getAllTeacherBlogPosts(filter?: BlogFilter): Promise<TeacherBlogPost[]> {
  let posts = [...BLOG_POSTS];
  
  // Apply filters if provided
  if (filter) {
    if (filter.subjects && filter.subjects.length > 0) {
      posts = posts.filter(post => 
        post.subjects.some(subject => filter.subjects!.includes(subject))
      );
    }
    
    if (filter.gradeBands && filter.gradeBands.length > 0) {
      posts = posts.filter(post => 
        post.gradeBands.some(grade => filter.gradeBands!.includes(grade))
      );
    }
    
    if (filter.contentTypes && filter.contentTypes.length > 0) {
      posts = posts.filter(post => 
        filter.contentTypes!.includes(post.contentType)
      );
    }
    
    if (filter.readingTime && filter.readingTime.length > 0) {
      posts = posts.filter(post => 
        filter.readingTime!.includes(post.readingTimeCategory)
      );
    }
    
    if (filter.hasDownloads) {
      posts = posts.filter(post => post.downloads.length > 0);
    }
    
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.keyTakeaways.some(takeaway => takeaway.toLowerCase().includes(query))
      );
    }
  }
  
  // Sort by featured first, then by date
  posts.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
  
  return posts;
}

// Get single blog post by slug
export async function getTeacherBlogPostBySlug(slug: string): Promise<TeacherBlogPost | null> {
  const posts = BLOG_POSTS;
  
  // Try exact match first
  let post = posts.find(p => p.slug === slug);
  
  // Try case-insensitive match
  if (!post) {
    post = posts.find(p => p.slug.toLowerCase() === slug.toLowerCase());
  }
  
  return post || null;
}

// Get available filter options
export async function getFilterOptions() {
  const posts = BLOG_POSTS;
  
  const subjects = new Map<string, number>();
  const gradeBands = new Map<string, number>();
  const contentTypes = new Map<string, number>();
  
  posts.forEach(post => {
    post.subjects.forEach(subject => {
      subjects.set(subject, (subjects.get(subject) || 0) + 1);
    });
    
    post.gradeBands.forEach(grade => {
      gradeBands.set(grade, (gradeBands.get(grade) || 0) + 1);
    });
    
    contentTypes.set(post.contentType, (contentTypes.get(post.contentType) || 0) + 1);
  });
  
  return {
    subjects: Array.from(subjects.entries()).map(([value, count]) => ({
      value,
      label: value.toUpperCase(),
      count
    })),
    gradeBands: Array.from(gradeBands.entries()).map(([value, count]) => ({
      value,
      label: value.toUpperCase(),
      count
    })),
    contentTypes: Array.from(contentTypes.entries()).map(([value, count]) => ({
      value,
      label: value.replace('-', ' ').toUpperCase(),
      count
    }))
  };
}
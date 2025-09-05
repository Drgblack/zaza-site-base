// Enhanced teacher-focused blog types based on comprehensive spec
export type SubjectType = 
  | 'math' | 'ela' | 'science' | 'social-studies' | 'art' | 'music' 
  | 'pe' | 'technology' | 'world-languages' | 'special-education';

export type GradeBand = 'k-2' | '3-5' | '6-8' | '9-12';

export type ContentType = 
  | 'lesson-plan' | 'how-to' | 'explainer' | 'case-study' 
  | 'research-to-practice' | 'newsletter';

export type ReadingTime = '2-min' | '5-min' | '10-min' | '15-min' | '20-min+';

export interface TeacherBlogPost {
  // Core identifiers
  id: string;
  slug: string;
  
  // Content
  title: string;
  description: string; // dek/summary
  content: string;
  fullContent: string;
  
  // Meta
  publishedAt: string;
  lastUpdated: string;
  readingTime: number;
  readingTimeCategory: ReadingTime;
  
  // Author
  author: {
    name: string;
    bio: string;
    avatar: string;
    classroomCredentials: string; // "5th grade teacher, 12 years"
    expertise: string[];
  };
  
  // Taxonomy
  subjects: SubjectType[];
  gradeBands: GradeBand[];
  contentType: ContentType;
  standards: string[]; // e.g., ["CCSS.MATH.3.OA.A.1", "NGSS.K-2-ETS1-1"]
  tags: string[];
  
  // Teacher-specific metadata
  materials: TeacherMaterial[];
  prepTime: string; // "10 minutes"
  classTime: string; // "45 minutes"
  
  // Content structure
  keyTakeaways: string[];
  lessonAtAGlance?: LessonAtAGlance;
  teacherBlocks: TeacherBlock[];
  differentiation?: DifferentiationBlock;
  assessment?: AssessmentBlock;
  
  // Downloads & integration
  downloads: DownloadResource[];
  googleClassroomUrl?: string;
  microsoftTeamsUrl?: string;
  
  // Engagement
  featured: boolean;
  seriesId?: string;
  seriesOrder?: number;
  relatedPosts?: string[];
  
  // Media
  image: string;
  imageAlt: string;
  
  // SEO & social
  metaDescription?: string;
  ogImage?: string;
  
  // Analytics
  helpfulVotes: { positive: number; negative: number };
  saveCount: number;
  downloadCount: number;
}

export interface TeacherMaterial {
  item: string;
  quantity?: string;
  optional?: boolean;
  notes?: string;
}

export interface LessonAtAGlance {
  materials: TeacherMaterial[];
  prepTime: string;
  classTime: string;
  standards: string[];
  objectives: string[];
}

export interface TeacherBlock {
  type: 'materials' | 'prep-time' | 'class-time' | 'standards' | 'differentiation' | 'assessment';
  title: string;
  content: string;
  items?: string[];
}

export interface DifferentiationBlock {
  supports: string[];
  extensions: string[];
  ellNotes: string[];
}

export interface AssessmentBlock {
  formativeChecks: string[];
  rubrics: DownloadResource[];
  exitTickets?: string[];
}

export interface DownloadResource {
  title: string;
  type: 'pdf' | 'docx' | 'pptx' | 'google-doc' | 'google-slides' | 'google-sheets';
  url: string;
  makeCopyUrl?: string; // For Google Workspace
}

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  subjects: SubjectType[];
  gradeBands: GradeBand[];
}

export interface BlogSeries {
  id: string;
  title: string;
  description: string;
  posts: TeacherBlogPost[];
  totalLessons: number;
  estimatedTime: string;
}

export interface BlogFilter {
  subjects: SubjectType[];
  gradeBands: GradeBand[];
  contentTypes: ContentType[];
  readingTime: ReadingTime[];
  hasDownloads?: boolean;
  searchQuery?: string;
}

// Navigation structure
export interface BlogNavigation {
  subjects: {
    [K in SubjectType]: {
      name: string;
      icon: string;
      gradeBands: GradeBand[];
    };
  };
  gradeBands: {
    [K in GradeBand]: {
      name: string;
      subjects: SubjectType[];
    };
  };
}

// Component props
export interface TeacherBlogCardProps {
  post: TeacherBlogPost;
  locale: string;
  showQuickActions?: boolean;
  onSave?: (postId: string) => void;
  onAddToClassroom?: (post: TeacherBlogPost) => void;
}

export interface TeacherBlogFilterProps {
  currentFilter: BlogFilter;
  onFilterChange: (filter: BlogFilter) => void;
  availableFilters: {
    subjects: Array<{ value: SubjectType; label: string; count: number }>;
    gradeBands: Array<{ value: GradeBand; label: string; count: number }>;
    contentTypes: Array<{ value: ContentType; label: string; count: number }>;
  };
}
// Teacher-focused blog service with enhanced functionality
'use server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { 
  TeacherBlogPost, 
  BlogFilter, 
  SubjectType, 
  GradeBand, 
  ContentType,
  ReadingTime,
  TeacherMaterial,
  DownloadResource 
} from './teacher-blog-types';

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'content', 'blog');

// Enhanced subject mapping with teacher-friendly labels
const SUBJECTS: Record<string, { type: SubjectType; name: string; icon: string }> = {
  'math': { type: 'math', name: 'Math', icon: '🧮' },
  'mathematics': { type: 'math', name: 'Math', icon: '🧮' },
  'ela': { type: 'ela', name: 'English Language Arts', icon: '📚' },
  'english': { type: 'ela', name: 'English Language Arts', icon: '📚' },
  'science': { type: 'science', name: 'Science', icon: '🔬' },
  'social studies': { type: 'social-studies', name: 'Social Studies', icon: '🌍' },
  'history': { type: 'social-studies', name: 'Social Studies', icon: '🌍' },
  'art': { type: 'art', name: 'Art', icon: '🎨' },
  'music': { type: 'music', name: 'Music', icon: '🎵' },
  'pe': { type: 'pe', name: 'Physical Education', icon: '⚽' },
  'technology': { type: 'technology', name: 'Technology', icon: '💻' },
  'world languages': { type: 'world-languages', name: 'World Languages', icon: '🗣️' },
  'special education': { type: 'special-education', name: 'Special Education', icon: '🤝' }
};

const GRADE_BANDS: Record<string, { type: GradeBand; name: string; ages: string }> = {
  'k-2': { type: 'k-2', name: 'K-2', ages: 'Ages 5-8' },
  '3-5': { type: '3-5', name: '3-5', ages: 'Ages 8-11' },
  '6-8': { type: '6-8', name: '6-8', ages: 'Ages 11-14' },
  '9-12': { type: '9-12', name: '9-12', ages: 'Ages 14-18' },
  'elementary': { type: 'k-2', name: 'K-2', ages: 'Ages 5-8' },
  'middle': { type: '6-8', name: '6-8', ages: 'Ages 11-14' },
  'high school': { type: '9-12', name: '9-12', ages: 'Ages 14-18' }
};

const CONTENT_TYPES: Record<string, { type: ContentType; name: string; icon: string }> = {
  'lesson plan': { type: 'lesson-plan', name: 'Lesson Plan', icon: '📋' },
  'how-to': { type: 'how-to', name: 'How-To Guide', icon: '🛠️' },
  'explainer': { type: 'explainer', name: 'Explainer', icon: '💡' },
  'case study': { type: 'case-study', name: 'Case Study', icon: '📊' },
  'research': { type: 'research-to-practice', name: 'Research to Practice', icon: '🔬' },
  'newsletter': { type: 'newsletter', name: 'Newsletter', icon: '📰' }
};

// Enhanced teacher-focused images
const TEACHER_IMAGES = [
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop'
];

function parseSubjects(subjectString?: string): SubjectType[] {
  if (!subjectString) return ['ela'];
  
  const subjects = subjectString.toLowerCase().split(',').map(s => s.trim());
  return subjects
    .map(subject => SUBJECTS[subject]?.type)
    .filter(Boolean) as SubjectType[];
}

function parseGradeBands(gradeString?: string): GradeBand[] {
  if (!gradeString) return ['k-2'];
  
  const grades = gradeString.toLowerCase().split(',').map(g => g.trim());
  return grades
    .map(grade => GRADE_BANDS[grade]?.type)
    .filter(Boolean) as GradeBand[];
}

function parseContentType(typeString?: string): ContentType {
  if (!typeString) return 'explainer';
  
  const type = typeString.toLowerCase().trim();
  return CONTENT_TYPES[type]?.type || 'explainer';
}

function calculateReadingTimeCategory(minutes: number): ReadingTime {
  if (minutes <= 2) return '2-min';
  if (minutes <= 5) return '5-min';
  if (minutes <= 10) return '10-min';
  if (minutes <= 15) return '15-min';
  return '20-min+';
}

function parseMaterials(materialsString?: string): TeacherMaterial[] {
  if (!materialsString) return [];
  
  return materialsString.split(',').map(item => ({
    item: item.trim(),
    optional: item.includes('(optional)'),
    notes: item.includes('(') ? item.match(/\((.*?)\)/)?.[1] : undefined
  }));
}

function parseDownloads(downloadsData?: any): DownloadResource[] {
  if (!downloadsData || !Array.isArray(downloadsData)) return [];
  
  return downloadsData.map(download => ({
    title: download.title || 'Download',
    type: download.type || 'pdf',
    url: download.url || '#',
    makeCopyUrl: download.makeCopyUrl
  }));
}

function findContentPath(): string | null {
  const possiblePaths = [
    BLOG_CONTENT_PATH,
    path.join(process.cwd(), 'content/blog'),
    path.join('/var/task', 'content', 'blog'),
    path.join(__dirname, '../../../content/blog')
  ];

  for (const checkPath of possiblePaths) {
    if (fs.existsSync(checkPath)) {
      return checkPath;
    }
  }
  
  return null;
}

function parseTeacherBlogPost(filePath: string, fileName: string, index: number): TeacherBlogPost | null {
  try {
    if (!fs.existsSync(filePath)) {
      console.error(`File does not exist: ${filePath}`);
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    if (!fileContent || fileContent.trim().length === 0) {
      console.error(`File is empty: ${fileName}`);
      return null;
    }

    const { data: frontmatter, content } = matter(fileContent);

    // Skip if no title
    if (!frontmatter.title && !fileName.includes('sample')) {
      console.warn(`No title found in ${fileName}, skipping`);
      return null;
    }

    const title = frontmatter.title || fileName.replace(/\.(md|mdx)$/, '').replace(/-/g, ' ');
    const slug = frontmatter.slug || fileName.replace(/\.(md|mdx)$/, '').toLowerCase();
    
    // Parse teacher-specific fields
    const subjects = parseSubjects(frontmatter.subjects || frontmatter.subject);
    const gradeBands = parseGradeBands(frontmatter.gradeBands || frontmatter.gradeLevel);
    const contentType = parseContentType(frontmatter.contentType || frontmatter.type);
    
    // Calculate reading time
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 250));
    
    // Parse key takeaways
    const keyTakeaways = Array.isArray(frontmatter.keyTakeaways) 
      ? frontmatter.keyTakeaways 
      : [];
    
    // Parse materials
    const materials = parseMaterials(frontmatter.materials);
    
    // Parse downloads
    const downloads = parseDownloads(frontmatter.downloads);
    
    // Ensure content exists
    const safeContent = content || 'Content coming soon...';

    const post: TeacherBlogPost = {
      // Core identifiers
      id: slug,
      slug,
      
      // Content
      title,
      description: frontmatter.description || `Educational insights about ${title.toLowerCase()}`,
      content: safeContent.substring(0, 300) + (safeContent.length > 300 ? '...' : ''),
      fullContent: safeContent,
      
      // Meta
      publishedAt: frontmatter.date || frontmatter.publishDate || new Date().toISOString(),
      lastUpdated: frontmatter.lastUpdated || frontmatter.date || new Date().toISOString(),
      readingTime,
      readingTimeCategory: calculateReadingTimeCategory(readingTime),
      
      // Author
      author: {
        name: frontmatter.author || 'Zaza Education Team',
        bio: frontmatter.authorBio || 'Dedicated to empowering teachers with AI',
        avatar: '/images/team/zaza-team.jpg',
        classroomCredentials: frontmatter.authorCredentials || 'Education Specialist',
        expertise: Array.isArray(frontmatter.authorExpertise) ? frontmatter.authorExpertise : []
      },
      
      // Taxonomy
      subjects,
      gradeBands,
      contentType,
      standards: Array.isArray(frontmatter.standards) ? frontmatter.standards : [],
      tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
      
      // Teacher-specific metadata
      materials,
      prepTime: frontmatter.prepTime || '10 minutes',
      classTime: frontmatter.classTime || '45 minutes',
      
      // Content structure
      keyTakeaways,
      teacherBlocks: [], // Will be parsed from content structure
      
      // Downloads & integration
      downloads,
      googleClassroomUrl: frontmatter.googleClassroomUrl,
      microsoftTeamsUrl: frontmatter.microsoftTeamsUrl,
      
      // Engagement
      featured: frontmatter.featured || false,
      seriesId: frontmatter.seriesId,
      seriesOrder: frontmatter.seriesOrder,
      relatedPosts: Array.isArray(frontmatter.relatedPosts) ? frontmatter.relatedPosts : [],
      
      // Media
      image: TEACHER_IMAGES[index % TEACHER_IMAGES.length],
      imageAlt: frontmatter.imageAlt || `${title} - Educational resource for teachers`,
      
      // SEO & social
      metaDescription: frontmatter.metaDescription || frontmatter.description,
      ogImage: frontmatter.ogImage,
      
      // Analytics (placeholder values)
      helpfulVotes: { positive: 0, negative: 0 },
      saveCount: 0,
      downloadCount: 0
    };

    return post;
  } catch (error) {
    console.error(`Error parsing ${fileName}:`, error);
    return null;
  }
}

// Get all blog posts with teacher-focused filtering
export async function getAllTeacherBlogPosts(filter?: BlogFilter): Promise<TeacherBlogPost[]> {
  try {
    const contentPath = findContentPath();
    
    if (!contentPath) {
      console.error('Blog content directory not found');
      return [];
    }

    console.log('Found blog content at:', contentPath);

    const files = fs.readdirSync(contentPath);
    const blogFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

    console.log(`Found ${blogFiles.length} blog files`);

    const posts: TeacherBlogPost[] = [];

    blogFiles.forEach((fileName, index) => {
      const filePath = path.join(contentPath, fileName);
      const post = parseTeacherBlogPost(filePath, fileName, index);
      if (post) {
        posts.push(post);
      }
    });

    console.log(`Successfully parsed ${posts.length} blog posts`);

    // Apply filters
    let filteredPosts = posts;
    
    if (filter) {
      if (filter.subjects.length > 0) {
        filteredPosts = filteredPosts.filter(post => 
          post.subjects.some(subject => filter.subjects.includes(subject))
        );
      }
      
      if (filter.gradeBands.length > 0) {
        filteredPosts = filteredPosts.filter(post => 
          post.gradeBands.some(grade => filter.gradeBands.includes(grade))
        );
      }
      
      if (filter.contentTypes.length > 0) {
        filteredPosts = filteredPosts.filter(post => 
          filter.contentTypes.includes(post.contentType)
        );
      }
      
      if (filter.readingTime.length > 0) {
        filteredPosts = filteredPosts.filter(post => 
          filter.readingTime.includes(post.readingTimeCategory)
        );
      }
      
      if (filter.hasDownloads) {
        filteredPosts = filteredPosts.filter(post => post.downloads.length > 0);
      }
      
      if (filter.searchQuery) {
        const query = filter.searchQuery.toLowerCase();
        filteredPosts = filteredPosts.filter(post =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.tags.some(tag => tag.toLowerCase().includes(query)) ||
          post.keyTakeaways.some(takeaway => takeaway.toLowerCase().includes(query))
        );
      }
    }

    // Sort by featured first, then by date (newest first)
    filteredPosts.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    return filteredPosts;
  } catch (error) {
    console.error('Error getting teacher blog posts:', error);
    return [];
  }
}

// Get single blog post by slug
export async function getTeacherBlogPostBySlug(slug: string): Promise<TeacherBlogPost | null> {
  const posts = await getAllTeacherBlogPosts();
  return posts.find(post => post.slug === slug) || null;
}

// Get available filter options
export async function getFilterOptions() {
  const posts = await getAllTeacherBlogPosts();
  
  const subjects = new Map<SubjectType, number>();
  const gradeBands = new Map<GradeBand, number>();
  const contentTypes = new Map<ContentType, number>();
  
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
      label: SUBJECTS[value]?.name || value,
      count
    })),
    gradeBands: Array.from(gradeBands.entries()).map(([value, count]) => ({
      value,
      label: GRADE_BANDS[value]?.name || value,
      count
    })),
    contentTypes: Array.from(contentTypes.entries()).map(([value, count]) => ({
      value,
      label: CONTENT_TYPES[value]?.name || value,
      count
    }))
  };
}
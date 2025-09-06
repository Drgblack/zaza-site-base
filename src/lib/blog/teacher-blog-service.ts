// Teacher-focused blog service with enhanced functionality
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

// Enhanced teacher-focused images - 44 unique images for 44 blog posts
const TEACHER_IMAGES = [
  // Teaching & Classroom (1-10)
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1509869175650-a1d97972541a?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=630&fit=crop',
  
  // Education & Learning (11-20)
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1555949963-ff9fe496c531?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=630&fit=crop',
  
  // Technology & AI (21-30)
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop',
  
  // Students & Collaboration (31-40)
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=630&fit=crop',
  
  // Professional & Modern (41-44)
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1573164574472-797cdf4a583a?w=1200&h=630&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop'
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

    // Sort files alphabetically first to ensure consistent ordering
    const sortedBlogFiles = blogFiles.sort();
    
    const posts: TeacherBlogPost[] = [];

    sortedBlogFiles.forEach((fileName, index) => {
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
  try {
    console.log(`Looking for blog post with slug: ${slug}`);
    const posts = await getAllTeacherBlogPosts();
    console.log(`Total posts found: ${posts.length}`);
    
    // Log first few post slugs for debugging
    if (posts.length > 0) {
      console.log('Available slugs:', posts.slice(0, 5).map(p => p.slug));
    }
    
    const post = posts.find(post => post.slug === slug);
    
    if (!post) {
      console.log(`No post found for slug: ${slug}`);
      // Try case-insensitive match
      const caseInsensitivePost = posts.find(post => post.slug.toLowerCase() === slug.toLowerCase());
      if (caseInsensitivePost) {
        console.log(`Found post with case-insensitive match: ${caseInsensitivePost.slug}`);
        return caseInsensitivePost;
      }
    }
    
    return post || null;
  } catch (error) {
    console.error('Error in getTeacherBlogPostBySlug:', error);
    return null;
  }
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
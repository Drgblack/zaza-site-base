// Static teacher blog service that uses pre-generated data
import { TeacherBlogPost, BlogFilter } from './teacher-blog-types';
import blogData from './generated-blog-data.json';

// Get all blog posts from static data
export async function getAllTeacherBlogPosts(filter?: BlogFilter): Promise<TeacherBlogPost[]> {
  let posts = blogData as TeacherBlogPost[];
  
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

// Get single blog post by slug from static data
export async function getTeacherBlogPostBySlug(slug: string): Promise<TeacherBlogPost | null> {
  const posts = blogData as TeacherBlogPost[];
  
  // Try exact match first
  let post = posts.find(p => p.slug === slug);
  
  // Try case-insensitive match
  if (!post) {
    post = posts.find(p => p.slug.toLowerCase() === slug.toLowerCase());
  }
  
  return post || null;
}

// Get available filter options from static data
export async function getFilterOptions() {
  const posts = blogData as TeacherBlogPost[];
  
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
      label: value,
      count
    })),
    gradeBands: Array.from(gradeBands.entries()).map(([value, count]) => ({
      value,
      label: value.toUpperCase(),
      count
    })),
    contentTypes: Array.from(contentTypes.entries()).map(([value, count]) => ({
      value,
      label: value.replace('-', ' '),
      count
    }))
  };
}
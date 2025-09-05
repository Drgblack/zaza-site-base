import { BlogPost, BlogFilter } from './types';

// Calculate reading time based on average 200 words per minute
export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = countWords(text);
  return Math.ceil(wordCount / wordsPerMinute);
}

// Count words in text content
export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Create excerpt from content
export function createExcerpt(content: string, maxWords: number = 30): string {
  const words = content.replace(/#+\s/g, '').trim().split(/\s+/);
  if (words.length <= maxWords) return content;
  return words.slice(0, maxWords).join(' ') + '...';
}

// Generate URL-friendly slug
export function createSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format date relative to now
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

// Filter posts based on criteria
export function filterPosts(posts: BlogPost[], filters: BlogFilter): BlogPost[] {
  return posts.filter(post => {
    // Category filter
    if (filters.category && post.category.slug !== filters.category) {
      return false;
    }
    
    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        post.tags.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase()))
      );
      if (!hasMatchingTag) return false;
    }
    
    // Teacher level filter
    if (filters.teacherLevel && post.teacherLevel) {
      if (!post.teacherLevel.includes(filters.teacherLevel)) {
        return false;
      }
    }
    
    // Difficulty filter
    if (filters.difficulty && post.difficulty !== filters.difficulty) {
      return false;
    }
    
    // Reading time filter
    if (filters.readingTime) {
      const { readingTime } = post;
      switch (filters.readingTime) {
        case 'quick':
          if (readingTime > 5) return false;
          break;
        case 'medium':
          if (readingTime <= 5 || readingTime > 15) return false;
          break;
        case 'long':
          if (readingTime <= 15) return false;
          break;
      }
    }
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableContent = [
        post.title,
        post.description,
        post.excerpt,
        post.category.name,
        ...post.tags,
        post.author.name
      ].join(' ').toLowerCase();
      
      if (!searchableContent.includes(searchTerm)) {
        return false;
      }
    }
    
    return true;
  });
}

// Sort posts by various criteria
export function sortPosts(
  posts: BlogPost[], 
  sortBy: 'date' | 'title' | 'readingTime' | 'views' = 'date',
  order: 'asc' | 'desc' = 'desc'
): BlogPost[] {
  return [...posts].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'readingTime':
        comparison = a.readingTime - b.readingTime;
        break;
      case 'views':
        comparison = (a.views || 0) - (b.views || 0);
        break;
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
}

// Get related posts based on category and tags
export function getRelatedPosts(
  currentPost: BlogPost, 
  allPosts: BlogPost[], 
  limit: number = 3
): BlogPost[] {
  const otherPosts = allPosts.filter(post => 
    post.id !== currentPost.id && post.status === 'published'
  );
  
  // Score posts based on similarity
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Same category gets high score
    if (post.category.id === currentPost.category.id) {
      score += 10;
    }
    
    // Shared tags get medium score
    const sharedTags = post.tags.filter(tag => 
      currentPost.tags.includes(tag)
    );
    score += sharedTags.length * 5;
    
    // Same teacher level gets low score
    if (post.teacherLevel && currentPost.teacherLevel) {
      const sharedLevels = post.teacherLevel.filter(level =>
        currentPost.teacherLevel?.includes(level)
      );
      score += sharedLevels.length * 2;
    }
    
    // Same difficulty gets low score
    if (post.difficulty === currentPost.difficulty) {
      score += 1;
    }
    
    return { post, score };
  });
  
  // Sort by score and return top results
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}
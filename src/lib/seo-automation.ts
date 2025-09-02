export interface SEOContent {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  twitterCard: string;
  structuredData: any;
}

export interface BlogPostSEO {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  readingTime: number;
  seo: SEOContent;
}

export interface ResourceSEO {
  id: string;
  title: string;
  description: string;
  type: 'template' | 'guide' | 'tool' | 'assessment';
  category: string;
  tags: string[];
  downloadCount: number;
  rating: number;
  seo: SEOContent;
}

// SEO Templates for different content types
export const seoTemplates = {
  blog: {
    titleTemplate: '{title} - Zaza Promptly Blog',
    descriptionTemplate: '{excerpt} Learn how AI is transforming education and helping teachers save time.',
    keywordsTemplate: ['teacher', 'education', 'AI', 'teaching', 'classroom', 'parent communication', '{category}', '{tags}']
  },
  resource: {
    titleTemplate: '{title} - Free Teaching Resource | Zaza Promptly',
    descriptionTemplate: '{description} Download this free teaching resource to improve your classroom communication.',
    keywordsTemplate: ['teaching resource', 'classroom', 'education', 'teacher', 'free download', '{category}', '{tags}']
  },
  community: {
    titleTemplate: 'Zaza Community Hub - Teacher Marketplace for AI Resources',
    descriptionTemplate: 'Discover, share, and trade AI-powered teaching resources with educators worldwide.',
    keywordsTemplate: ['teacher community', 'teaching resources', 'AI education', 'teacher marketplace', 'educational resources']
  }
};

// Content generation helpers
export function generateBlogSEO(post: BlogPostSEO): SEOContent {
  const title = seoTemplates.blog.titleTemplate.replace('{title}', post.title);
  const description = seoTemplates.blog.descriptionTemplate.replace('{excerpt}', post.excerpt);
  const keywords = [
    ...seoTemplates.blog.keywordsTemplate,
    ...post.tags,
    post.category
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    canonicalUrl: `https://zaza.com/blog/${post.slug}`,
    ogImage: `/og/blog/${post.slug}.png`,
    ogTitle: title,
    ogDescription: description,
    twitterCard: 'summary_large_image',
    structuredData: generateBlogStructuredData(post)
  };
}

export function generateResourceSEO(resource: ResourceSEO): SEOContent {
  const title = seoTemplates.resource.titleTemplate.replace('{title}', resource.title);
  const description = seoTemplates.resource.descriptionTemplate.replace('{description}', resource.description);
  const keywords = [
    ...seoTemplates.resource.keywordsTemplate,
    ...resource.tags,
    resource.category
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    canonicalUrl: `https://zaza.com/resources/${resource.id}`,
    ogImage: `/og/resources/${resource.id}.png`,
    ogTitle: title,
    ogDescription: description,
    twitterCard: 'summary_large_image',
    structuredData: generateResourceStructuredData(resource)
  };
}

// Structured Data Generation
function generateBlogStructuredData(post: BlogPostSEO) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zaza Promptly',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zaza.com/images/zaza-logo.png'
      }
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://zaza.com/blog/${post.slug}`
    },
    image: `/og/blog/${post.slug}.png`,
    keywords: post.tags.join(', '),
    articleSection: post.category,
    wordCount: post.content.split(' ').length,
    timeRequired: `PT${post.readingTime}M`
  };
}

function generateResourceStructuredData(resource: ResourceSEO) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: resource.title,
    description: resource.description,
    author: {
      '@type': 'Organization',
      name: 'Zaza Promptly'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Zaza Promptly',
      logo: {
        '@type': 'ImageObject',
        url: 'https://zaza.com/images/zaza-logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://zaza.com/resources/${resource.id}`
    },
    image: `/og/resources/${resource.id}.png`,
    keywords: resource.tags.join(', '),
    genre: resource.category,
    educationalUse: resource.type,
    audience: {
      '@type': 'Audience',
      audienceType: 'Teachers and Educators'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: resource.rating,
      reviewCount: resource.downloadCount
    }
  };
}

// Content optimization helpers
export function optimizeContentForSEO(content: string): string {
  // Add semantic HTML structure
  let optimized = content;
  
  // Ensure proper heading hierarchy
  optimized = optimized.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  optimized = optimized.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  optimized = optimized.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  
  // Add alt text placeholders for images
  optimized = optimized.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '![$1]($2 "$1")');
  
  // Add internal linking suggestions
  optimized = addInternalLinkingSuggestions(optimized);
  
  return optimized;
}

function addInternalLinkingSuggestions(content: string): string {
  const internalLinks = [
    { keyword: 'parent communication', url: '/features/parent-communication' },
    { keyword: 'lesson planning', url: '/features/lesson-planning' },
    { keyword: 'progress reports', url: '/features/progress-reports' },
    { keyword: 'AI tools', url: '/features/ai-tools' },
    { keyword: 'teacher resources', url: '/resources' },
    { keyword: 'community', url: '/community' }
  ];

  let optimized = content;
  
  internalLinks.forEach(link => {
    const regex = new RegExp(`\\b${link.keyword}\\b`, 'gi');
    optimized = optimized.replace(regex, `<a href="${link.url}" class="internal-link">$&</a>`);
  });
  
  return optimized;
}

// Meta tag generation
export function generateMetaTags(seo: SEOContent): Record<string, string> {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords.join(', '),
    'og:title': seo.ogTitle,
    'og:description': seo.ogDescription,
    'og:image': seo.ogImage,
    'og:url': seo.canonicalUrl,
    'og:type': 'article',
    'twitter:card': seo.twitterCard,
    'twitter:title': seo.ogTitle,
    'twitter:description': seo.ogDescription,
    'twitter:image': seo.ogImage,
    'canonical': seo.canonicalUrl
  };
}

// Content performance tracking
export interface ContentPerformance {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  timeOnPage: number;
  conversionRate: number;
  seoScore: number;
}

export function calculateSEOScore(seo: SEOContent): number {
  let score = 0;
  
  // Title optimization (0-25 points)
  if (seo.title.length >= 30 && seo.title.length <= 60) score += 25;
  else if (seo.title.length >= 20 && seo.title.length <= 70) score += 15;
  
  // Description optimization (0-25 points)
  if (seo.description.length >= 120 && seo.description.length <= 160) score += 25;
  else if (seo.description.length >= 100 && seo.description.length <= 180) score += 15;
  
  // Keywords optimization (0-25 points)
  if (seo.keywords.length >= 5 && seo.keywords.length <= 15) score += 25;
  else if (seo.keywords.length >= 3 && seo.keywords.length <= 20) score += 15;
  
  // Structured data (0-25 points)
  if (seo.structuredData) score += 25;
  
  return score;
}

// Automated content suggestions
export function generateContentSuggestions(content: string): string[] {
  const suggestions: string[] = [];
  
  // Check for common SEO issues
  if (content.length < 300) {
    suggestions.push('Consider expanding this content to at least 300 words for better SEO');
  }
  
  if (!content.includes('h1') && !content.includes('h2')) {
    suggestions.push('Add heading tags (H1, H2) to improve content structure');
  }
  
  if (!content.includes('img')) {
    suggestions.push('Consider adding relevant images to improve engagement');
  }
  
  if (!content.includes('http')) {
    suggestions.push('Add internal and external links to improve SEO value');
  }
  
  return suggestions;
}

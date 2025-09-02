import fs from 'fs';
import path from 'path';
import { blogPosts, BlogPost as BlogPostMeta } from './blog-data';

const contentDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export function getPostBySlug(slug: string): BlogPost | null {
  // Get metadata from blog-data.ts
  const postMeta = blogPosts.find(post => post.slug === slug);
  if (!postMeta) {
    return null;
  }

  // Try to load content from markdown file
  const contentPath = path.join(contentDirectory, `${slug}.md`);
  let content = '';
  
  if (fs.existsSync(contentPath)) {
    content = fs.readFileSync(contentPath, 'utf8');
  } else {
    // Fallback content for posts without dedicated content files
    content = generateFallbackContent(postMeta);
  }

  return {
    ...postMeta,
    content
  };
}

export function getAllPosts(): BlogPost[] {
  return blogPosts
    .map((postMeta) => {
      const contentPath = path.join(contentDirectory, `${postMeta.slug}.md`);
      let content = '';
      
      if (fs.existsSync(contentPath)) {
        content = fs.readFileSync(contentPath, 'utf8');
      } else {
        content = generateFallbackContent(postMeta);
      }

      return {
        ...postMeta,
        content
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPostSlugs(): string[] {
  return blogPosts.map(post => post.slug);
}

function generateFallbackContent(postMeta: BlogPostMeta): string {
  return `# ${postMeta.title}

${postMeta.description}

This article is part of our comprehensive AI in Education blog series. We're working on expanding our content library to provide you with detailed insights and practical strategies.

## Key Highlights

- Expert insights from experienced educators
- Practical strategies you can implement immediately
- Real-world examples from classrooms using AI tools
- Step-by-step guidance for better outcomes

## Related Topics

This article covers important concepts in the **${postMeta.category}** category, connecting with broader themes of educational technology, teaching efficiency, and student success.

## About the Author

**${postMeta.author}** brings years of educational experience and insights to help teachers leverage AI tools effectively while maintaining the personal touch that makes great teaching possible.

---

*Want to stay updated with more articles like this? Join our community of educators transforming their practice with AI.*`;
}

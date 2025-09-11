import fs from 'fs';
import path from 'path';
import https from 'https';

// Read the blog data file as raw text to extract posts
const blogDataPath = path.join(process.cwd(), 'content-source/blog-posts-data.ts');
const blogDataContent = fs.readFileSync(blogDataPath, 'utf8');

// Find the blogPosts array start and end
const startMatch = blogDataContent.match(/export const blogPosts: BlogPostType\[\] = \[/);
if (!startMatch) {
  throw new Error('Could not find blogPosts array in blog-posts-data.ts');
}

const startIndex = startMatch.index! + startMatch[0].length;

// Find the closing bracket by counting braces
let braceCount = 1;
let endIndex = startIndex;
for (let i = startIndex; i < blogDataContent.length; i++) {
  const char = blogDataContent[i];
  if (char === '[') braceCount++;
  if (char === ']') braceCount--;
  if (braceCount === 0) {
    endIndex = i;
    break;
  }
}

if (braceCount !== 0) {
  throw new Error('Could not find matching closing bracket for blogPosts array');
}

// Extract the posts array content
const postsContent = blogDataContent.slice(startIndex, endIndex);

// Parse individual blog posts using a more robust approach
const posts: any[] = [];
let currentPost = '';
let braceDepth = 0;
let inString = false;
let stringChar = '';

for (let i = 0; i < postsContent.length; i++) {
  const char = postsContent[i];
  const prevChar = i > 0 ? postsContent[i - 1] : '';
  
  // Track string boundaries
  if ((char === '"' || char === '`') && prevChar !== '\\') {
    if (!inString) {
      inString = true;
      stringChar = char;
    } else if (char === stringChar) {
      inString = false;
      stringChar = '';
    }
  }
  
  if (!inString) {
    if (char === '{') braceDepth++;
    if (char === '}') braceDepth--;
    
    if (braceDepth === 0 && char === '}') {
      currentPost += char;
      // We've completed a post object
      try {
        // Clean up the post string and evaluate it as a JavaScript object
        const cleanPost = currentPost.trim().replace(/,\s*$/, ''); // Remove trailing comma
        const postObject = eval('(' + cleanPost + ')');
        posts.push(postObject);
      } catch (error) {
        console.warn('Failed to parse post:', error);
      }
      currentPost = '';
    } else {
      currentPost += char;
    }
  } else {
    currentPost += char;
  }
}

console.log(`Found ${posts.length} blog posts to extract`);

// Ensure content and images directories exist
const contentDir = path.join(process.cwd(), 'content');
const blogDir = path.join(contentDir, 'blog');
const imagesDir = path.join(process.cwd(), 'public', 'images', 'blog');

fs.mkdirSync(contentDir, { recursive: true });
fs.mkdirSync(blogDir, { recursive: true });
fs.mkdirSync(imagesDir, { recursive: true });

// Function to generate unique placeholder image based on slug
function generatePlaceholderImage(slug: string, filepath: string): void {
  // Create a simple SVG placeholder with the post title/category
  const colors = [
    '#7E3AF2', '#F472B6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'
  ];
  const color = colors[slug.length % colors.length];
  
  const svg = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="${color}"/>
  <text x="400" y="280" font-family="Arial, sans-serif" font-size="28" font-weight="bold" 
        text-anchor="middle" fill="white" opacity="0.9">Zaza Promptly</text>
  <text x="400" y="320" font-family="Arial, sans-serif" font-size="18" 
        text-anchor="middle" fill="white" opacity="0.8">Blog Post</text>
  <text x="400" y="350" font-family="Arial, sans-serif" font-size="14" 
        text-anchor="middle" fill="white" opacity="0.6">${slug}</text>
</svg>`;
  
  fs.writeFileSync(filepath, svg, 'utf8');
}

// Helper function to extract author name
function getAuthorName(author: any): string {
  if (typeof author === 'string') return author;
  if (typeof author === 'object' && author.name) return author.name;
  return 'Zaza Team';
}

// Helper function to create slug from id or title
function createSlug(post: any): string {
  if (post.id) return post.id;
  if (post.slug) return post.slug;
  return post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// Process each post
for (const post of posts) {
  const slug = createSlug(post);
  const postDir = path.join(blogDir, slug);
  const mdxFile = path.join(postDir, 'index.mdx');
  const imageDir = path.join(imagesDir, slug);
  const imageFile = path.join(imageDir, 'cover.svg');
  
  // Create post directory
  fs.mkdirSync(postDir, { recursive: true });
  fs.mkdirSync(imageDir, { recursive: true });

  // Check if post already exists to make script idempotent
  if (fs.existsSync(mdxFile)) {
    console.log(`✓ Post already exists: ${slug}`);
    continue;
  }

  // Generate unique ID from slug and date
  const postId = post.id || `${slug}-${post.date.replace(/-/g, '')}`;

  // Extract tags (convert to array if needed)
  let tags = post.tags || [];
  if (typeof tags === 'string') {
    tags = tags.split(',').map((tag: string) => tag.trim());
  }

  // Create MDX content with frontmatter
  const frontmatter = `---
id: "${postId}"
title: "${post.title.replace(/"/g, '\\"')}"
description: "${(post.description || post.excerpt || '').replace(/"/g, '\\"')}"
date: "${post.date}"
author:
  name: "${getAuthorName(post.author)}"
tags: ${JSON.stringify(tags)}
category: "${post.category || 'Teaching'}"
coverImage: "/images/blog/${slug}/cover.svg"
canonical: "/en/blog/${slug}"
---

`;

  // Use the post content if available, otherwise create placeholder
  let content = post.content || `# ${post.title}

${post.description || post.excerpt || ''}

*This content is being migrated from our archive. Full content will be available soon.*

## Overview

This post covers important insights about ${(post.category || 'teaching').toLowerCase()} for educators.

**Key takeaways:**
- Practical strategies that work
- Real-world examples 
- Time-saving approaches
- Evidence-based methods

---

*Ready to transform your teaching practice? Try [Zaza Promptly](/) and discover how AI can help you save time and improve student outcomes.*
`;

  // Write MDX file
  fs.writeFileSync(mdxFile, frontmatter + content, 'utf8');

  // Generate unique cover image
  generatePlaceholderImage(slug, imageFile);

  console.log(`✓ Created post: ${slug}`);
}

console.log('\n🎉 Blog extraction complete!');
console.log(`✓ Extracted ${posts.length} posts to /content/blog/`);
console.log('✓ Generated unique cover images for each post');
console.log('✓ Script is idempotent - safe to run multiple times');
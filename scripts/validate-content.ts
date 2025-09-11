#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

interface ValidationError {
  file: string;
  errors: string[];
}

interface FrontmatterData {
  id?: string;
  title?: string;
  description?: string;
  date?: string;
  author?: {
    name?: string;
  };
  tags?: string[];
  category?: string;
  coverImage?: string;
  canonical?: string;
}

// Track all cover images to detect duplicates
const coverImages = new Map<string, string[]>();
const errors: ValidationError[] = [];
let totalFiles = 0;
let validFiles = 0;

// Helper to add error
function addError(file: string, error: string) {
  const existingError = errors.find(e => e.file === file);
  if (existingError) {
    existingError.errors.push(error);
  } else {
    errors.push({ file, errors: [error] });
  }
}

// Validate required frontmatter fields
function validateFrontmatter(file: string, data: FrontmatterData) {
  const requiredFields = ['id', 'title', 'description', 'date', 'coverImage', 'canonical'];
  
  requiredFields.forEach(field => {
    if (!data[field as keyof FrontmatterData]) {
      addError(file, `Missing required frontmatter field: ${field}`);
    }
  });

  // Validate date format
  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    addError(file, `Invalid date format: ${data.date}. Expected YYYY-MM-DD`);
  }

  // Validate author
  if (!data.author || !data.author.name) {
    addError(file, `Missing or invalid author information`);
  }

  // Validate tags
  if (!data.tags || !Array.isArray(data.tags) || data.tags.length === 0) {
    addError(file, `Missing or invalid tags array`);
  }

  // Track cover images for duplicate detection
  if (data.coverImage) {
    const existing = coverImages.get(data.coverImage) || [];
    existing.push(file);
    coverImages.set(data.coverImage, existing);

    // Check if cover image exists
    const imagePath = path.join(process.cwd(), 'public', data.coverImage.replace(/^\//, ''));
    if (!fs.existsSync(imagePath)) {
      addError(file, `Cover image not found: ${data.coverImage}`);
    }
  }

  // Validate canonical URL format
  if (data.canonical && !data.canonical.match(/^\/[a-z]{2}\//)) {
    addError(file, `Invalid canonical URL format: ${data.canonical}. Expected /locale/path format`);
  }
}

// Validate content structure
function validateContent(file: string, content: string) {
  const lines = content.split('\n');
  let hasH1 = false;
  let h1Count = 0;

  lines.forEach((line, index) => {
    // Check for H1
    if (line.match(/^#\s+/)) {
      hasH1 = true;
      h1Count++;
    }

    // Check for broken markdown links
    const linkMatches = line.matchAll(/\[([^\]]*)\]\(([^)]*)\)/g);
    for (const match of linkMatches) {
      if (!match[2]) {
        addError(file, `Empty link URL at line ${index + 1}: ${match[0]}`);
      }
    }

    // Check for unescaped special characters in frontmatter region
    if (index < 20 && line.includes('"') && !line.includes('\\"') && line.includes(':')) {
      // This is a heuristic check - might need refinement
    }
  });

  if (!hasH1) {
    addError(file, `No H1 heading found in content`);
  } else if (h1Count > 1) {
    addError(file, `Multiple H1 headings found (${h1Count}). Should have exactly one.`);
  }

  // Check content length
  if (content.trim().length < 100) {
    addError(file, `Content too short (${content.trim().length} chars). Minimum 100 characters expected.`);
  }
}

// Main validation function
function validateBlogPosts() {
  console.log('🔍 Validating blog content...\n');

  const blogDir = path.join(process.cwd(), 'content', 'blog');
  
  if (!fs.existsSync(blogDir)) {
    console.error('❌ Blog directory not found:', blogDir);
    process.exit(1);
  }

  // Find all MDX files
  const findMdxFiles = (dir: string): string[] => {
    const files: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...findMdxFiles(fullPath));
      } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
    
    return files;
  };

  const mdxFiles = findMdxFiles(blogDir);
  totalFiles = mdxFiles.length;

  console.log(`Found ${totalFiles} blog posts to validate\n`);

  // Validate each file
  mdxFiles.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const { data, content: body } = matter(content);
      
      validateFrontmatter(file, data as FrontmatterData);
      validateContent(file, body);
      
      if (!errors.find(e => e.file === file)) {
        validFiles++;
      }
    } catch (error) {
      addError(file, `Failed to parse file: ${error}`);
    }
  });

  // Check for duplicate cover images
  coverImages.forEach((files, image) => {
    if (files.length > 1) {
      files.forEach(file => {
        addError(file, `Duplicate cover image "${image}" used in ${files.length} posts: ${files.join(', ')}`);
      });
    }
  });

  // Report results
  console.log('\n📊 Validation Results:\n');
  console.log(`✅ Valid posts: ${validFiles}/${totalFiles}`);
  
  if (errors.length > 0) {
    console.log(`\n❌ Found ${errors.length} posts with errors:\n`);
    
    errors.forEach(({ file, errors }) => {
      console.log(`\n📄 ${path.relative(process.cwd(), file)}`);
      errors.forEach(error => {
        console.log(`   ❌ ${error}`);
      });
    });
    
    console.log('\n❌ Validation failed!');
    process.exit(1);
  } else {
    console.log('\n✅ All posts validated successfully!');
    console.log(`✅ No duplicate cover images found`);
    console.log(`✅ All required frontmatter fields present`);
    console.log(`✅ All content meets minimum requirements`);
  }
}

// Run validation
validateBlogPosts();
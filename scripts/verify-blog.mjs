#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');

function verifyBlog() {
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'));
  let failed = false;
  const usedImages = new Set();
  const imageUsageCounts = new Map();

  console.log(`🔍 Verifying ${files.length} blog posts...\n`);

  files.forEach((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: body } = matter(content);
    
    // Check word count (should be 600+ words)
    const words = body.split(/\s+/).filter(Boolean).length;
    if (words < 600) {
      console.error(`❌ Too short (<600 words): ${file} (${words} words)`);
      failed = true;
    }

    // Check author (should be greg-blackburn)
    if (frontmatter.author !== 'greg-blackburn') {
      console.error(`❌ Wrong author: ${file} (${frontmatter.author})`);
      failed = true;
    }

    // Check for featured image
    const image = frontmatter.featuredImage || frontmatter.image;
    if (!image) {
      console.error(`❌ Missing featured image: ${file}`);
      failed = true;
    } else {
      // Track image usage
      const count = imageUsageCounts.get(image) || 0;
      imageUsageCounts.set(image, count + 1);
      
      if (usedImages.has(image)) {
        console.warn(`⚠️  Duplicate image: ${file} uses ${image}`);
      }
      usedImages.add(image);
    }

    // Check publication status
    if (!frontmatter.isPublished) {
      console.error(`❌ Not published: ${file}`);
      failed = true;
    }

    if (frontmatter.isDraft) {
      console.error(`❌ Still in draft: ${file}`);
      failed = true;
    }
  });

  // Check for image uniqueness
  console.log('\n📊 Image Usage Summary:');
  let duplicateImages = 0;
  imageUsageCounts.forEach((count, image) => {
    if (count > 1) {
      console.warn(`⚠️  Image used ${count} times: ${image}`);
      duplicateImages++;
    }
  });

  console.log('\n✅ Verification Summary:');
  console.log(`- Total posts: ${files.length}`);
  console.log(`- Unique images: ${usedImages.size}`);
  console.log(`- Duplicate images: ${duplicateImages}`);
  
  if (failed) {
    console.log('\n❌ Blog verification FAILED');
    process.exit(1);
  } else {
    console.log('\n✅ Blog verification PASSED');
  }
}

verifyBlog();
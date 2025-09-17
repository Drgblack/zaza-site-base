#!/usr/bin/env node
/* Run with: node scripts/verify-blog.js */
const fs = require('fs');
const path = require('path');

// Simple recursive directory walk to find MDX files
function findMdxFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...findMdxFiles(fullPath));
    } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

const posts = findMdxFiles('content/blog');
let failed = false;

const slugs = new Set();
const covers = new Set();

function checkWhiteText(md) {
  return /text-white|color:\s*white|color:\s*#fff/i.test(md);
}

for (const file of posts) {
  const text = fs.readFileSync(file, 'utf8');
  const fm = text.split('---');
  if (fm.length < 3) { console.error(`Missing front-matter: ${file}`); failed = true; continue; }
  const body = fm.slice(2).join('---').trim();
  
  // Check for disallowed white text
  if (checkWhiteText(text)) {
    console.error(`❌ Disallowed white text found in: ${file}`);
    failed = true;
  }
  
  // Check for CTA marker
  if (!/<!--\s*CTA-OK\s*-->/.test(text)) {
    console.error(`❌ Missing CTA marker <!-- CTA-OK --> at end: ${file}`);
    failed = true;
  }
  const words = body.split(/\s+/).filter(Boolean).length;
  if (words < 600) { console.error(`Too short (<600 words): ${file} (${words})`); failed = true; }
  const mSlug = text.match(/slug:\s*["']?([a-z0-9-]+)["']?/i);
  const mAuthor = text.match(/author:\s*["']?([a-z0-9-]+)["']?/i);
  const mCover = text.match(/cover:\s*[^]*?src:\s*["']([^"']+)["']/i);
  const mFeaturedImage = text.match(/featuredImage:\s*["']?([^"'\n]+)["']?/i);

  if (!mSlug) { console.error(`Missing slug: ${file}`); failed = true; }
  else if (slugs.has(mSlug[1])) { console.error(`Duplicate slug: ${mSlug[1]}`); failed = true; }
  else slugs.add(mSlug[1]);

  if (!mAuthor || mAuthor[1] !== 'greg-blackburn') {
    console.error(`Author must be greg-blackburn: ${file} (found: ${mAuthor ? mAuthor[1] : 'none'})`);
    failed = true;
  }

  const coverSrc = mCover ? mCover[1] : (mFeaturedImage ? mFeaturedImage[1] : null);
  if (!coverSrc) { console.error(`Missing cover.src or featuredImage: ${file}`); failed = true; }
  else {
    if (coverSrc.includes('default.jpg')) {
      console.error(`Cover must be unique (not default.jpg): ${file}`);
      failed = true;
    }
    if (covers.has(coverSrc)) { console.error(`Duplicate cover image: ${coverSrc}`); failed = true; }
    covers.add(coverSrc);
    
    // Only check local images, not external URLs
    if (!coverSrc.startsWith('http')) {
      const imagePath = path.join(process.cwd(), 'public', coverSrc);
      if (!fs.existsSync(imagePath)) { console.error(`Cover image missing on disk: ${imagePath}`); failed = true; }
    }
  }
}

if (failed) { process.exit(1); }
console.log('✅ Blog content OK - no white text issues');
#!/usr/bin/env node
/**
 * Pre-commit content verification
 * Ensures resources and blog content remain intact
 */

const fs = require('fs');
const path = require('path');

function checkExists(file) {
  return fs.existsSync(file);
}

function checkResourcesManifest() {
  const manifestPath = 'public/resources/resources.manifest.json';
  
  if (!checkExists(manifestPath)) {
    console.error('❌ Missing resources.manifest.json');
    return false;
  }

  try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    if (!Array.isArray(manifest) || manifest.length < 4) {
      console.error(`❌ Expected >=4 resources in manifest, got: ${manifest.length}`);
      return false;
    }

    // Check each PDF exists and is substantial
    for (const resource of manifest) {
      const pdfPath = 'public' + resource.pdf;
      
      if (!checkExists(pdfPath)) {
        console.error(`❌ Missing PDF: ${pdfPath}`);
        return false;
      }

      const stats = fs.statSync(pdfPath);
      if (stats.size < 20000) {
        console.error(`❌ PDF too small: ${pdfPath} (${stats.size}B, expected >=20KB)`);
        return false;
      }
    }

    console.log(`✅ Resources verified: ${manifest.length} resources with proper PDFs`);
    return true;
  } catch (error) {
    console.error('❌ Error reading manifest:', error.message);
    return false;
  }
}

function checkBlogPosts() {
  const blogDirs = ['content/blog', 'blog', 'posts'];
  const blogDir = blogDirs.find(dir => checkExists(dir));
  
  if (!blogDir) {
    console.error('❌ No blog content folder found');
    return false;
  }

  try {
    const files = fs.readdirSync(blogDir);
    const posts = files.filter(file => /\.(md|mdx)$/.test(file));
    
    if (posts.length < 3) {
      console.error(`❌ Expected >=3 blog posts, got: ${posts.length}`);
      return false;
    }

    console.log(`✅ Blog verified: ${posts.length} posts found`);
    return true;
  } catch (error) {
    console.error('❌ Error reading blog directory:', error.message);
    return false;
  }
}

function main() {
  console.log('🔍 Verifying content integrity...');
  
  const checks = [
    checkResourcesManifest(),
    checkBlogPosts()
  ];

  if (checks.every(Boolean)) {
    console.log('✅ All content checks passed');
    process.exit(0);
  } else {
    console.log('❌ Content verification failed');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
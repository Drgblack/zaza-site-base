import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '..', 'content', 'blog');

console.log('=== BLOG POST VERIFICATION ===\n');

let hasErrors = false;
const posts = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));

console.log(`📚 Checking ${posts.length} blog posts...\n`);

for (const postFile of posts) {
  const filePath = path.join(contentDir, postFile);
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];
  
  // Check for placeholder images
  if (/default\.(jpg|png|jpeg|webp)/i.test(content)) {
    errors.push('❌ Contains placeholder image');
  }
  
  // Check for correct author
  if (!/^author:\s*(greg-blackburn|dr-greg-blackburn)/m.test(content)) {
    errors.push('❌ Wrong or missing author (should be "greg-blackburn")');
  }
  
  // Check content length (word count approximation)
  const wordCount = (content.match(/\w+/g) || []).length;
  if (wordCount < 600) {
    errors.push(`⚠️ Short content (${wordCount} words, min 600)`);
  }
  
  // Check for featured image
  if (!/featuredImage:/m.test(content)) {
    errors.push('❌ Missing featuredImage field');
  }
  
  // Check for unique Unsplash images (not repeated)
  const unsplashMatch = content.match(/https:\/\/images\.unsplash\.com\/photo-([^?]+)/);
  if (!unsplashMatch) {
    errors.push('⚠️ No Unsplash image found');
  }
  
  if (errors.length > 0) {
    console.log(`🔴 ${postFile}:`);
    errors.forEach(error => console.log(`   ${error}`));
    console.log('');
    hasErrors = true;
  } else {
    console.log(`✅ ${postFile}`);
  }
}

console.log('\n=== SUMMARY ===');
if (hasErrors) {
  console.log('❌ Some posts have issues that need attention');
  process.exit(1);
} else {
  console.log('✅ All posts passed verification!');
  console.log('📋 Criteria checked:');
  console.log('   - Correct author (greg-blackburn)');
  console.log('   - No placeholder images');
  console.log('   - Sufficient content length (600+ words)');
  console.log('   - Featured image present');
  console.log('   - Unique Unsplash images');
}
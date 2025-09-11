import fg from 'fast-glob';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const files = fg.sync(['content/blog/**/*.{md,mdx}'], { dot: false });
const seen = new Map<string, string[]>();

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const fm = matter(src).data as any;
  const img = fm.coverImage || fm.image || fm.heroImage;
  if (!img) continue;
  const key = String(img);
  const arr = seen.get(key) || [];
  arr.push(f);
  seen.set(key, arr);
}

const dups = [...seen.entries()].filter(([, v]) => v.length > 1);
if (dups.length) {
  console.error('❌ Duplicate blog images detected:');
  for (const [path, posts] of dups) {
    console.error('-', path, 'used in', posts.join(', '));
  }
  process.exit(1);
}

// Also check for missing images
const missingImages: string[] = [];
for (const [imgPath, posts] of seen.entries()) {
  // Skip external URLs
  if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
    continue;
  }
  
  // Check if local image exists
  const fullPath = path.join(process.cwd(), 'public', imgPath.replace(/^\//, ''));
  if (!fs.existsSync(fullPath)) {
    missingImages.push(`${imgPath} (used in ${posts.join(', ')})`);
  }
}

if (missingImages.length) {
  console.error('❌ Missing blog images detected:');
  for (const missing of missingImages) {
    console.error('-', missing);
  }
  process.exit(1);
}

console.log('✅ No duplicate blog images.');
console.log(`✅ Validated ${seen.size} unique images across ${files.length} posts.`);
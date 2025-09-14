import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const POSTS_DIR = path.join(process.cwd(), 'src/content/blog');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

let ok = true;

// Check if blog posts directory exists
if (!fs.existsSync(POSTS_DIR)) {
  console.log('[blog] No blog posts directory found at src/content/blog - skipping validation');
  process.exit(0);
}

const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.mdx'));

if (files.length === 0) {
  console.log('[blog] No MDX files found - skipping validation');
  process.exit(0);
}

console.log(`[blog] Validating images for ${files.length} blog posts...`);

for (const file of files) {
  const fullPath = path.join(POSTS_DIR, file);
  const content = fs.readFileSync(fullPath, 'utf8');
  const fm = matter(content);
  const slug = file.replace(/\.mdx$/, '');
  
  // Check for image in frontmatter, or use convention
  const image = fm.data.image ?? `/blog/${slug}/cover.jpg`;
  const imageOnDisk = path.join(PUBLIC_DIR, image);
  
  if (!fs.existsSync(imageOnDisk)) {
    // Check for alternative formats
    const basePath = path.join(PUBLIC_DIR, `blog/${slug}`);
    const alternatives = ['cover.png', 'cover.webp', 'cover.jpeg'];
    let found = false;
    
    for (const alt of alternatives) {
      if (fs.existsSync(path.join(basePath, alt))) {
        console.log(`[blog] ${slug}: Found alternative image ${alt}`);
        found = true;
        break;
      }
    }
    
    if (!found) {
      console.error(`[blog] Missing image for ${slug}: expected ${image}`);
      ok = false;
    }
  } else {
    console.log(`[blog] ✓ ${slug}: ${image}`);
  }
}

if (!ok) {
  console.error('\n[blog] Some blog posts are missing images. Please add them to continue.');
  process.exit(1);
} else {
  console.log('\n[blog] ✓ All blog post images validated successfully');
}
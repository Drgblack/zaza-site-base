import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const POSTS = path.join(process.cwd(), 'src/content/blog');
const PUB = path.join(process.cwd(), 'public/blog');
const fallback = path.join(process.cwd(), 'public/blog/fallback.jpg');

// Skip if no blog content directory
if (!fs.existsSync(POSTS)) {
  console.log('[blog] No blog content directory found - skipping image validation');
  process.exit(0);
}

// Ensure fallback image exists
if (!fs.existsSync(fallback)) {
  const fallbackDefault = path.join(process.cwd(), 'public/images/blog/default.jpg');
  if (fs.existsSync(fallbackDefault)) {
    fs.mkdirSync(path.dirname(fallback), { recursive: true });
    fs.copyFileSync(fallbackDefault, fallback);
    console.log('[blog] Created fallback image from default.jpg');
  } else {
    console.warn('[blog] No fallback image found - blog posts without images may fail');
  }
}

let ok = true;
const files = fs.readdirSync(POSTS).filter(f => f.endsWith('.mdx'));

if (files.length === 0) {
  console.log('[blog] No MDX files found - skipping');
  process.exit(0);
}

console.log(`[blog] Processing ${files.length} blog posts...`);

for (const file of files) {
  const full = path.join(POSTS, file);
  const src = fs.readFileSync(full, 'utf8'); // force utf8
  const fm = matter(src);
  const slug = file.replace(/\.mdx$/, '');
  const expected = `/blog/${slug}/cover.jpg`;
  const dir = path.join(PUB, slug);
  const imgPath = path.join(PUB, expected.replace('/blog/', ''));

  if (!fm.data.image) {
    console.log(`[blog] Adding image field to ${slug}: ${expected}`);
    fm.data.image = expected;
    fs.mkdirSync(dir, { recursive: true });
    
    if (!fs.existsSync(imgPath) && fs.existsSync(fallback)) {
      fs.copyFileSync(fallback, imgPath);
      console.log(`[blog] Created cover image for ${slug} from fallback`);
    }
    
    const next = matter.stringify(fm.content, fm.data);
    fs.writeFileSync(full, next, 'utf8');
  } else {
    const disk = path.join(process.cwd(), 'public', fm.data.image);
    if (!fs.existsSync(disk)) {
      ok = false;
      console.error(`[blog] Missing cover: ${slug} -> ${fm.data.image}`);
    } else {
      console.log(`[blog] ✓ ${slug}: ${fm.data.image}`);
    }
  }
}

if (!ok) {
  console.error('[blog] Some blog posts are missing images');
  process.exit(1);
}

console.log('[blog] All blog images validated successfully');
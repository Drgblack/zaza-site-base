import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.resolve(__dirname, '..', 'content', 'blog');
const FALLBACK_IMAGES = [
  // category-tinted Unsplash images
  'https://images.unsplash.com/photo-1544739313-6fad4b2abf19?w=800&h=400&fit=crop', // AI/tech
  'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=800&h=400&fit=crop', // classroom
  'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?w=800&h=400&fit=crop', // writing/notes
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&h=400&fit=crop', // grading/books
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop', // teacher at board
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop', // education
  'https://images.unsplash.com/photo-1581333971358-2c8b550f87b3?w=800&h=400&fit=crop', // AI concept
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop', // classroom learning
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=400&fit=crop', // writing/planning
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop', // studying
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop', // tech education
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop', // collaboration
  'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop', // charts/assessment
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop', // coding/tech
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop', // technology
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop', // online learning
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop', // male teacher
  'https://images.unsplash.com/photo-1573164574511-73c773193279?w=800&h=400&fit=crop', // female teacher
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop', // school hallway
  'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&h=400&fit=crop', // online teaching
  'https://images.unsplash.com/photo-1486312338219-ce68e2c6b7a4?w=800&h=400&fit=crop', // idea/lightbulb
  'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&h=400&fit=crop', // notebooks
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop', // coffee & laptop
  'https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&h=400&fit=crop', // curriculum
  'https://images.unsplash.com/photo-1509869175650-a1d97972541a?w=800&h=400&fit=crop', // creative teaching
  'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop', // office/grading
  'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=400&fit=crop', // education tech
  'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=400&fit=crop', // mobile learning
  'https://images.unsplash.com/photo-1532153955177-f59af40d6472?w=800&h=400&fit=crop', // teacher helping
  'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop'  // virtual classroom
];

function pickCover(i) { 
  return FALLBACK_IMAGES[i % FALLBACK_IMAGES.length]; 
}

console.log('🔧 Fixing blog frontmatter...\n');

let i = 0;
let fixCount = 0;
const files = fs.readdirSync(BLOG_DIR);

for (const file of files) {
  if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
  
  const p = path.join(BLOG_DIR, file);
  const raw = fs.readFileSync(p, 'utf8');
  const fm = matter(raw);
  let changed = false;

  // 1) Force author to greg-blackburn
  const author = (fm.data.author || '').toString().trim();
  if (!author || /zaza team/i.test(author) || author !== 'greg-blackburn') {
    fm.data.author = 'greg-blackburn';
    changed = true;
    console.log(`  ✓ Fixed author in ${file}`);
  }

  // 2) Fix cover/image
  const existingCover = fm.data.cover || fm.data.featuredImage || fm.data.image;
  let needNewCover = false;

  if (typeof existingCover === 'string') {
    // Check if it's a placeholder
    if (!existingCover || /default\.jpg|placeholder|undraw|image\-placeholder/i.test(existingCover)) {
      needNewCover = true;
    }
    // Convert string to object format
    if (!needNewCover) {
      fm.data.cover = {
        src: existingCover,
        alt: fm.data.title || 'Article cover',
        width: 1600,
        height: 900
      };
      changed = true;
    }
  } else if (typeof existingCover === 'object') {
    const coverSrc = existingCover.src || '';
    if (!coverSrc || /default\.jpg|placeholder|undraw|image\-placeholder/i.test(coverSrc)) {
      needNewCover = true;
    }
  } else {
    needNewCover = true;
  }

  if (needNewCover) {
    fm.data.cover = {
      src: pickCover(i++),
      alt: fm.data.title || 'Article cover',
      width: 1600,
      height: 900
    };
    changed = true;
    console.log(`  ✓ Added cover image to ${file}`);
  }

  // Also set featuredImage for compatibility
  if (fm.data.cover) {
    fm.data.featuredImage = fm.data.cover.src;
    changed = true;
  }

  // 3) Normalize dates
  if (!fm.data.publishedAt && fm.data.date) {
    fm.data.publishedAt = fm.data.date;
    changed = true;
  }

  // 4) Ensure proper publication status
  if (fm.data.isPublished === undefined) {
    fm.data.isPublished = true;
    changed = true;
  }
  if (fm.data.isDraft === undefined) {
    fm.data.isDraft = false;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(p, matter.stringify(fm.content, fm.data));
    fixCount++;
  }
}

console.log(`\n✅ Fixed ${fixCount} blog posts with proper author and images`);
console.log(`📊 Processed ${files.filter(f => f.endsWith('.md') || f.endsWith('.mdx')).length} total posts`);
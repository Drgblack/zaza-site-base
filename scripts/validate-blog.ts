#!/usr/bin/env tsx
import { readdir, readFile, writeFile, copyFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { z } from 'zod';
import matter from 'gray-matter';

const FrontmatterSchema = z.object({
  title: z.string().min(1),
  date: z.string(),
  excerpt: z.string().min(1),
  image: z.string().min(1),
  author: z.string().min(1),
  readingTime: z.string().min(1),
});

const CONTENT_DIR = 'src/content/blog';
const FALLBACK_IMAGE = 'public/images/blog/default-cover.jpg';

async function ensureDirExists(dir: string) {
  if (!existsSync(dir)) {
    await mkdir(dir, { recursive: true });
  }
}

async function validateBlogPosts() {
  console.log('🔍 Validating blog posts...');

  if (!existsSync(CONTENT_DIR)) {
    console.log(`📁 Creating blog content directory: ${CONTENT_DIR}`);
    await ensureDirExists(CONTENT_DIR);
    return;
  }

  const files = await readdir(CONTENT_DIR);
  const mdxFiles = files.filter(f => f.endsWith('.mdx'));

  if (mdxFiles.length === 0) {
    console.log('📝 No blog posts found');
    return;
  }

  for (const file of mdxFiles) {
    const filePath = join(CONTENT_DIR, file);
    const content = await readFile(filePath, 'utf-8');
    const { data: frontmatter, content: body } = matter(content);

    console.log(`📄 Processing: ${file}`);

    // Auto-inject missing image field
    if (!frontmatter.image) {
      const imageName = file.replace('.mdx', '.jpg');
      frontmatter.image = `/images/blog/${imageName}`;
      console.log(`  ✅ Auto-injected image: ${frontmatter.image}`);
    }

    // Validate with Zod
    try {
      FrontmatterSchema.parse(frontmatter);
    } catch (error) {
      console.error(`  ❌ Invalid frontmatter in ${file}:`, error);
      continue;
    }

    // Check if cover image exists
    const imagePath = join('public', frontmatter.image);
    if (!existsSync(imagePath)) {
      console.log(`  📷 Creating missing image: ${imagePath}`);
      await ensureDirExists(dirname(imagePath));
      await copyFile(FALLBACK_IMAGE, imagePath);
    }

    // Write back the updated frontmatter
    const updatedContent = matter.stringify(body, frontmatter);
    await writeFile(filePath, updatedContent);
  }

  console.log('✅ Blog validation complete');
}

if (require.main === module) {
  validateBlogPosts().catch(console.error);
}

export { validateBlogPosts };
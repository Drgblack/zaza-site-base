import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'blog');

interface ImageValidationResult {
  slug: string;
  title: string;
  imageField: string | null;
  imageExists: boolean;
  imagePath: string;
  status: 'found' | 'missing' | 'fallback';
}

async function validateBlogImages(strict: boolean = false): Promise<void> {
  try {
    // Get all blog posts
    const files = await fs.readdir(BLOG_DIR);
    const postFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    
    const results: ImageValidationResult[] = [];
    let missingCount = 0;

    console.log('📸 Blog Image Validation Report');
    console.log('━'.repeat(60));

    for (const file of postFiles) {
      const slug = file.replace(/\.mdx?$/, '');
      const filePath = path.join(BLOG_DIR, file);
      const content = await fs.readFile(filePath, 'utf8');
      const { data } = matter(content);
      
      // Check for image field in frontmatter
      const imageField = data.image || data.heroImage || data.featuredImage || null;
      
      let imageExists = false;
      let imagePath = '';
      let status: 'found' | 'missing' | 'fallback' = 'fallback';

      if (imageField) {
        // Handle relative paths
        if (imageField.startsWith('/images/blog/')) {
          imagePath = path.join(process.cwd(), 'public', imageField);
        } else if (imageField.startsWith('/')) {
          imagePath = path.join(process.cwd(), 'public', imageField);
        } else {
          // Assume it's a filename in blog images directory
          imagePath = path.join(IMAGES_DIR, imageField);
        }
        
        try {
          await fs.access(imagePath);
          imageExists = true;
          status = 'found';
        } catch {
          imageExists = false;
          status = 'missing';
          missingCount++;
        }
      } else {
        // No image specified, will use default
        status = 'fallback';
        imagePath = path.join(IMAGES_DIR, 'default.jpg');
      }

      results.push({
        slug,
        title: data.title || slug,
        imageField,
        imageExists,
        imagePath: imageField || '/images/blog/default.jpg',
        status
      });
    }

    // Sort results: missing first, then found, then fallback
    results.sort((a, b) => {
      if (a.status === 'missing' && b.status !== 'missing') return -1;
      if (a.status !== 'missing' && b.status === 'missing') return 1;
      if (a.status === 'found' && b.status === 'fallback') return -1;
      if (a.status === 'fallback' && b.status === 'found') return 1;
      return a.slug.localeCompare(b.slug);
    });

    // Print results table
    console.log();
    console.log(`Found ${results.length} blog posts`);
    console.log();

    // Group by status
    const groupedResults = results.reduce((acc, result) => {
      if (!acc[result.status]) acc[result.status] = [];
      acc[result.status].push(result);
      return acc;
    }, {} as Record<string, ImageValidationResult[]>);

    // Print missing images (red)
    if (groupedResults.missing) {
      console.log(`❌ Missing Images (${groupedResults.missing.length}):`);
      console.log('━'.repeat(60));
      groupedResults.missing.forEach(result => {
        console.log(`  ${result.slug}`);
        console.log(`    Title: ${result.title}`);
        console.log(`    Expected: ${result.imageField}`);
        console.log();
      });
    }

    // Print found images (green)
    if (groupedResults.found) {
      console.log(`✅ Found Images (${groupedResults.found.length}):`);
      console.log('━'.repeat(60));
      groupedResults.found.forEach(result => {
        console.log(`  ${result.slug} → ${result.imageField}`);
      });
      console.log();
    }

    // Print fallback images (yellow)
    if (groupedResults.fallback) {
      console.log(`🔄 Using Fallback (${groupedResults.fallback.length}):`);
      console.log('━'.repeat(60));
      groupedResults.fallback.forEach(result => {
        console.log(`  ${result.slug} → default.jpg`);
      });
      console.log();
    }

    // Summary
    console.log('📊 Summary:');
    console.log('━'.repeat(60));
    console.log(`Total posts: ${results.length}`);
    console.log(`✅ With unique images: ${groupedResults.found?.length || 0}`);
    console.log(`🔄 Using fallback: ${groupedResults.fallback?.length || 0}`);
    console.log(`❌ Missing images: ${missingCount}`);
    console.log();

    // Suggestions
    if (missingCount > 0) {
      console.log('💡 Suggestions:');
      console.log('━'.repeat(60));
      console.log('1. Add missing images to public/images/blog/');
      console.log('2. Update frontmatter to point to existing images');
      console.log('3. Remove image field to use default fallback');
      console.log();
    }

    // Exit with error only in strict mode and if there are missing images
    if (strict && missingCount > 0) {
      console.log('🚫 Strict mode: Exiting with error due to missing images');
      process.exit(1);
    } else if (missingCount > 0) {
      console.log('⚠️  Non-strict mode: Missing images will fallback to default');
    } else {
      console.log('🎉 All images validated successfully!');
    }

  } catch (error) {
    console.error('❌ Error validating blog images:', error);
    process.exit(1);
  }
}

// Check for CLI arguments
const args = process.argv.slice(2);
const strict = args.includes('--strict');

validateBlogImages(strict);
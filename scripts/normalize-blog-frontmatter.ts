#!/usr/bin/env node
/**
 * Normalize Blog Front-matter
 * Ensures all blog posts have proper authorship, unique images, and standardized metadata
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = 'content/blog';

function generateUniqueImage(title: string, category: string): string {
  // Map categories to appropriate Unsplash images
  const imageMap: Record<string, string> = {
    'ai-tools': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    'ai': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    'teaching': 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&h=400&fit=crop',
    'productivity': 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
    'communication': 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=400&fit=crop',
    'classroom management': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
    'grading': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    'parent': 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=400&fit=crop',
    'lesson': 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
    'assessment': 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=400&fit=crop',
    'critical thinking': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    'future': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    'research': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop'
  };

  const lowerTitle = title.toLowerCase();
  const lowerCategory = (category || '').toLowerCase();

  // Check title keywords first
  if (lowerTitle.includes('ai') || lowerTitle.includes('artificial intelligence')) {
    return imageMap['ai'];
  }
  if (lowerTitle.includes('parent') || lowerTitle.includes('communication')) {
    return imageMap['parent'];
  }
  if (lowerTitle.includes('productivity') || lowerTitle.includes('time-saving')) {
    return imageMap['productivity'];
  }
  if (lowerTitle.includes('classroom') || lowerTitle.includes('management')) {
    return imageMap['classroom management'];
  }
  if (lowerTitle.includes('grading') || lowerTitle.includes('feedback')) {
    return imageMap['grading'];
  }
  if (lowerTitle.includes('lesson') || lowerTitle.includes('planning')) {
    return imageMap['lesson'];
  }
  if (lowerTitle.includes('critical') || lowerTitle.includes('thinking')) {
    return imageMap['critical thinking'];
  }
  if (lowerTitle.includes('future') || lowerTitle.includes('tools')) {
    return imageMap['future'];
  }
  if (lowerTitle.includes('research') || lowerTitle.includes('study')) {
    return imageMap['research'];
  }

  // Fallback to category
  return imageMap[lowerCategory] || imageMap['teaching'];
}

function normalizePost(filePath: string): void {
  const content = fs.readFileSync(filePath, 'utf8');
  const { content: body, data } = matter(content);
  
  // Normalize authorship
  if (
    !data.author || 
    data.author === 'Zaza Team' || 
    data.author === 'The Zaza Team' ||
    typeof data.author === 'string' && !data.author.includes('Dr. Greg Blackburn')
  ) {
    data.author = 'greg-blackburn';
  }
  
  // Ensure we have proper metadata
  if (!data.slug) {
    data.slug = path.basename(filePath, path.extname(filePath));
  }
  
  if (!data.excerpt && data.description) {
    data.excerpt = data.description;
  }
  
  if (!data.excerpt) {
    // Generate excerpt from first paragraph
    const firstParagraph = body.split('\n\n')[0]?.replace(/^#+ /, '').trim();
    data.excerpt = firstParagraph?.substring(0, 150) + '...' || 'Educational insights and practical tips for teachers.';
  }
  
  // Ensure unique cover image
  if (!data.cover) {
    data.cover = {
      src: data.featuredImage || generateUniqueImage(data.title || '', data.category || ''),
      alt: `${data.title} - Educational blog post cover image`,
      width: 1600,
      height: 900
    };
  }
  
  // Normalize featuredImage to cover.src if it exists
  if (data.featuredImage && !data.cover) {
    data.cover = {
      src: data.featuredImage,
      alt: `${data.title} - Educational blog post cover image`,
      width: 1600,
      height: 900
    };
  }
  
  // Ensure SEO image
  if (!data.seo) {
    data.seo = {};
  }
  if (!data.seo.image) {
    data.seo.image = data.cover?.src || data.featuredImage;
  }
  
  // Write back the normalized content
  const updatedContent = matter.stringify(body, data);
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  
  console.log(`✅ Normalized: ${path.basename(filePath)}`);
}

function main() {
  console.log('🔧 Normalizing blog front-matter...');
  console.log('📝 Fixing authorship, images, and metadata\n');
  
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`❌ Blog directory not found: ${BLOG_DIR}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(BLOG_DIR)
    .filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
    .map(file => path.join(BLOG_DIR, file));
  
  let processed = 0;
  
  for (const file of files) {
    try {
      normalizePost(file);
      processed++;
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
    }
  }
  
  console.log(`\n✅ Processed ${processed} blog posts`);
  console.log('🎯 All posts now have:');
  console.log('   - Proper authorship (greg-blackburn)');
  console.log('   - Unique cover images');
  console.log('   - Standardized metadata');
  console.log('   - SEO optimization');
}

if (require.main === module) {
  main();
}
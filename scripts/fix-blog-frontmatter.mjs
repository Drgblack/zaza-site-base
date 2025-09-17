#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');

// Unsplash images for unique covers
const UNIQUE_IMAGES = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1573164574511-73c773193279?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1532153955177-f59af40d6472?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1559301452-8c176ca59bd2?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1486312338219-ce68e2c6b7a4?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop'
];

function fixBlogFrontmatter() {
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.mdx'));
  let fixed = 0;

  files.forEach((file, index) => {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content: body } = matter(content);
    
    let changed = false;

    // Fix author to greg-blackburn if it's currently "Zaza Team" or similar
    if (frontmatter.author === 'Zaza Team' || 
        frontmatter.author === 'The Zaza Team' ||
        !frontmatter.author || 
        typeof frontmatter.author === 'object' ||
        (typeof frontmatter.author === 'string' && frontmatter.author !== 'greg-blackburn')) {
      frontmatter.author = 'greg-blackburn';
      changed = true;
    }

    // Add unique cover image if missing or using default
    if (!frontmatter.featuredImage || 
        frontmatter.featuredImage === 'default.jpg' ||
        frontmatter.featuredImage.includes('default') ||
        frontmatter.image === 'default.jpg' ||
        !frontmatter.image) {
      
      // Use a unique image for each post
      const uniqueImage = UNIQUE_IMAGES[index % UNIQUE_IMAGES.length];
      frontmatter.featuredImage = uniqueImage;
      
      // Also set image field if it exists
      if (frontmatter.image) {
        frontmatter.image = uniqueImage;
      }
      
      changed = true;
    }

    // Ensure proper publication status
    if (frontmatter.isPublished === undefined) {
      frontmatter.isPublished = true;
      changed = true;
    }

    if (frontmatter.isDraft === undefined) {
      frontmatter.isDraft = false;
      changed = true;
    }

    // Add locale if missing
    if (!frontmatter.locale) {
      frontmatter.locale = 'en';
      changed = true;
    }

    if (changed) {
      const newContent = matter.stringify(body, frontmatter);
      fs.writeFileSync(filePath, newContent);
      fixed++;
      console.log(`Fixed: ${file}`);
    }
  });

  console.log(`\n✅ Fixed ${fixed} blog posts with proper authorship and unique images`);
}

fixBlogFrontmatter();
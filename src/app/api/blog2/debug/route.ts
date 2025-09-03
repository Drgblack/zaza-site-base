import { NextResponse } from 'next/server';
import { getAllBlog2Posts } from '@/lib/blog2.server';
import fs from 'fs';
import path from 'path';

export function GET() {
  const posts = getAllBlog2Posts();
  const missingImages = posts
    .filter(p => !/^https?:/.test(p.image))
    .filter(p => !fs.existsSync(path.join(process.cwd(), 'public', p.image)))
    .map(p => ({ slug: p.slug, image: p.image }));
    
  return NextResponse.json({ 
    count: posts.length, 
    slugs: posts.map(p => p.slug), 
    missingImages 
  });
}
// src/app/api/blog2/debug/route.ts
import { NextResponse } from "next/server";
import { getAllBlog2Posts } from "@/lib/blog2.server";
import fs from "fs";

export async function GET() {
  const posts = getAllBlog2Posts();
  const missing = posts.filter(p => !/^https?:/.test(p.image))
    .filter(p => !fs.existsSync(process.cwd()+"/public"+p.image));
  
  return NextResponse.json({ 
    count: posts.length, 
    slugs: posts.map(p=>p.slug), 
    missing: missing.map(p => ({ slug: p.slug, image: p.image }))
  });
}
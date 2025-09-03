// Main blog debug endpoint (now using blog2 system)
import { NextResponse } from "next/server";
import { getAllBlog2Posts } from "@/lib/blog2.server";
import fs from "fs";

export async function GET() {
  const posts = getAllBlog2Posts();
  const missing = posts.filter(p => !/^https?:/.test(p.image))
    .filter(p => !fs.existsSync(process.cwd()+"/public"+p.image));
  
  return NextResponse.json({ 
    system: "main-blog-blog2",
    count: posts.length, 
    slugs: posts.map(p=>p.slug), 
    missing: missing.map(p => ({ slug: p.slug, image: p.image }))
  });
}
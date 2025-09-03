// scripts/audit-blog2.ts
import { getAllBlog2Posts } from "../src/lib/blog2.server.js";
import fs from "fs";
import path from "path";

const posts = getAllBlog2Posts();

console.log("\n=== BLOG2 AUDIT REPORT ===\n");

console.log(`Total posts: ${posts.length}\n`);

// List all slugs
console.log("All slugs:");
posts.forEach(p => console.log(`  ${p.slug}`));

// Check for duplicate slugs
const slugCounts = posts.reduce((acc, p) => {
  acc[p.slug] = (acc[p.slug] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const duplicates = Object.entries(slugCounts).filter(([_, count]) => count > 1);
if (duplicates.length) {
  console.log("\n⚠️ DUPLICATE SLUGS:");
  duplicates.forEach(([slug, count]) => console.log(`  ${slug} (${count} times)`));
}

// Check missing images
const missingImages = posts
  .filter(p => !/^https?:\/\//.test(p.image))
  .filter(p => !fs.existsSync(path.join(process.cwd(), "public", p.image)));

if (missingImages.length) {
  console.log("\n⚠️ MISSING IMAGES:");
  missingImages.forEach(p => console.log(`  ${p.slug} -> ${p.image}`));
} else {
  console.log("\n✅ All images found or using defaults");
}

// Check posts without descriptions
const noDescription = posts.filter(p => !p.description || p.description.endsWith("…"));
if (noDescription.length) {
  console.log("\n⚠️ POSTS WITH AUTO-GENERATED EXCERPTS:");
  noDescription.forEach(p => console.log(`  ${p.slug} -> "${p.description.slice(0, 50)}..."`));
}

// Summary stats
console.log("\n=== STATS ===");
console.log(`Posts with custom descriptions: ${posts.filter(p => !p.description.endsWith("…")).length}`);
console.log(`Posts with default images: ${posts.filter(p => p.image === "/images/blog/default.jpg").length}`);
console.log(`Featured posts: ${posts.filter(p => p.featured).length}`);
console.log(`Categories: ${[...new Set(posts.map(p => p.category))].join(", ")}`);

console.log("\n=== BLOG2 AUDIT COMPLETE ===");
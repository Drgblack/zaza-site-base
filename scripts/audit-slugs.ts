// scripts/audit-slugs.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content", "blog");

console.log("Auditing blog post slugs...\n");

for (const f of fs.readdirSync(dir).filter(x => /\.mdx?$/.test(x))) {
  const raw = fs.readFileSync(path.join(dir, f), "utf8");
  const { data } = matter(raw);
  const fn = f.replace(/\.mdx?$/, "");
  const fm = (data.slug || "").trim();
  
  console.log(`${f}:`);
  console.log(`  filename: ${fn}`);
  console.log(`  frontmatter slug: ${fm || "(none)"}`);
  
  if (fm && fm !== fm.toLowerCase()) {
    console.warn(`  ⚠️  [slug case] ${f}: ${fm}`);
  }
  if (fm && fm !== fm.replace(/\s+/g, "-")) {
    console.warn(`  ⚠️  [slug spaces] ${f}: ${fm}`);
  }
  
  console.log("");
}

console.log("Slug audit complete");
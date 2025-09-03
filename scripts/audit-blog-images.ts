import fs from "fs"; 
import path from "path"; 
import matter from "gray-matter";
import { normalizeImage } from "../src/lib/image-url";

const dir = path.join(process.cwd(), "content", "blog");
const files = fs.readdirSync(dir).filter(f=>/\.mdx?$/.test(f));

const rows: any[] = [];
for (const f of files) {
  const raw = fs.readFileSync(path.join(dir, f), "utf8");
  const { data } = matter(raw);
  const slug = (data.slug || f.replace(/\.mdx?$/,"")).toString();
  const img = normalizeImage(data.image || "");
  const local = !/^https?:\/\//.test(img);
  const exists = local ? fs.existsSync(path.join(process.cwd(),"public",img)) : true;
  rows.push({ slug, image: img, local, exists });
}
console.table(rows);
const missing = rows.filter(r=>r.local && !r.exists);
if (missing.length) {
  console.warn("Missing local images:\n" + missing.map(m=>`${m.slug} -> ${m.image}`).join("\n"));
  process.exitCode = 1;
}
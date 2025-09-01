import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type MdxFrontmatter = {
  title?: string;
  date?: string;
  summary?: string;
  cover?: string;
  tags?: string[];
  [key: string]: unknown;
};

export type MdxPost = {
  slug: string;
  content: string;
  frontmatter: MdxFrontmatter;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): MdxPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".mdx"));
  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { content, data } = matter(raw);
    return { slug, content, frontmatter: data as MdxFrontmatter };
  }).sort((a, b) => {
    const da = new Date(a.frontmatter.date ?? 0).getTime();
    const db = new Date(b.frontmatter.date ?? 0).getTime();
    return db - da;
  });
}

export function getPost(slug: string): MdxPost | null {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { content, data } = matter(raw);
  return { slug, content, frontmatter: data as MdxFrontmatter };
}

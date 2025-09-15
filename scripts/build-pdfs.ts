#!/usr/bin/env tsx
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { mdToPdf } from 'md-to-pdf';

const SRC = path.join(process.cwd(), 'resources-src');
const OUT = path.join(process.cwd(), 'public', 'resources');
const CSS = path.join(SRC, 'style', 'resource-theme.css');

function safe(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

async function run() {
  const css = fs.readFileSync(CSS, 'utf8');
  const files = fs.readdirSync(SRC).filter(f => f.endsWith('.md'));
  let count = 0;

  for (const file of files) {
    const fp = path.join(SRC, file);
    const raw = fs.readFileSync(fp, 'utf8');
    const { data, content } = matter(raw);
    const title = data.title ?? 'Resource';
    const slug  = data.slug ?? safe(title);
    const cat   = data.category ?? 'general';
    const lang  = data.lang ?? 'en';
    const ver   = data.version ?? '1.0';

    const outDir = path.join(OUT, cat);
    fs.mkdirSync(outDir, { recursive: true });

    const pdfPath = path.join(outDir, `${slug}-v${ver}-${lang}.pdf`);
    const pdf = await mdToPdf(
      { content, md_options: { },
        document_title: title },
      { stylesheet: css }
    ).catch(err => { console.error(`[md-to-pdf] ${file} failed`, err); return null; });

    if (pdf?.content) {
      fs.writeFileSync(pdfPath, pdf.content);
      console.log(`[resources] wrote: ${pdfPath}`);
      count++;
    }
  }
  console.log(`[resources] generated PDFs: ${count}`);
}

if (require.main === module) {
  run().catch(console.error);
}

export { run };
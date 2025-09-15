import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { mdToPdf } from 'md-to-pdf';

const SRC = path.join(process.cwd(), 'resources-src');
const OUT = path.join(process.cwd(), 'public', 'resources');
const CSS = path.join(SRC, 'style', 'resource-theme.css');

function safe(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const headerTemplate = `
<style>
  .head, .foot { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; font-size:10px; color:#6b7280; width:100%; margin: 0 18mm; }
  .head > div, .foot > div { display:flex; justify-content:space-between; align-items:center; width:100%; }
  .l { text-align:left; } .r { text-align:right; }
</style>
<div class="head"><div>
  <span class="l">Promptly — Teacher Resources</span>
  <span class="r"></span>
</div></div>`;

const footerTemplate = `
<style>
  .head, .foot { font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial; font-size:10px; color:#6b7280; width:100%; margin: 0 18mm; }
  .head > div, .foot > div { display:flex; justify-content:space-between; align-items:center; width:100%; }
  .l { text-align:left; } .r { text-align:right; }
</style>
<div class="foot"><div>
  <span class="l">Zaza Technologies GmbH, Gumbertstraße 150, 40229 Düsseldorf, Deutschland</span>
  <span class="r">Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
</div></div>`;

function generateTOC(content: string): string {
  const headings = content.match(/^## (.+)$/gm);
  if (!headings || headings.length === 0) return '';
  
  const tocItems = headings.map(heading => {
    const title = heading.replace(/^## /, '');
    return `  <li>${title}</li>`;
  }).join('\n');
  
  return `<div class="toc">
  <h3>Contents</h3>
  <ol>
${tocItems}
  </ol>
</div>\n\n`;
}

function generateCover(data: any): string {
  if (!data.coverTitle) return '';
  
  return `<div class="cover">
  <h1>${data.coverTitle}</h1>
  ${data.coverSubtitle ? `<div class="subtitle">${data.coverSubtitle}</div>` : ''}
  ${data.coverBadge ? `<div class="badges"><span class="badge">${data.coverBadge}</span></div>` : ''}
</div>

<hr class="m-0" />

`;
}

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

    // Process content with cover and TOC
    let processedContent = content;
    
    // Add cover if specified
    const coverBlock = generateCover(data);
    if (coverBlock) {
      processedContent = coverBlock + processedContent;
    }
    
    // Add TOC if specified
    if (data.toc) {
      const tocBlock = generateTOC(content);
      if (tocBlock) {
        // Insert TOC after the first H1 or at the beginning
        const firstH1Index = processedContent.indexOf('\n# ');
        if (firstH1Index !== -1) {
          const afterH1 = processedContent.indexOf('\n', firstH1Index + 1);
          processedContent = processedContent.slice(0, afterH1 + 1) + '\n' + tocBlock + processedContent.slice(afterH1 + 1);
        } else {
          processedContent = tocBlock + processedContent;
        }
      }
    }

    const result = await mdToPdf(
      { content: processedContent, document_title: title },
      {
        stylesheet: css,
        pdf_options: {
          format: 'A4',
          margin: { top: '24mm', bottom: '18mm', left: '18mm', right: '18mm' },
          displayHeaderFooter: true,
          headerTemplate,
          footerTemplate,
          printBackground: true
        }
      }
    ).catch(err => { console.error(`[md-to-pdf] ${file} failed`, err); return null; });

    if (result?.content) {
      fs.writeFileSync(pdfPath, result.content);
      console.log(`[resources] wrote: ${pdfPath}`);
      count++;
    }
  }

  console.log(`[resources] generated PDFs: ${count}`);
}

run();
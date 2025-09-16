#!/usr/bin/env tsx
// scripts/generate-resources-pdf.ts
import { chromium } from 'playwright';
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from 'fs';
import { join, dirname, basename } from 'path';

const ROOT = process.cwd();
const HTML_ROOT = join(ROOT, 'public', 'resources');

async function run() {
  console.log('🎯 Converting HTML resources to PDFs...');
  
  const browser = await chromium.launch();
  const page = await browser.newPage();

  function walk(dir: string, htmls: string[]) {
    for (const name of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, name.name);
      if (name.isDirectory()) {
        walk(p, htmls);
      } else if (name.isFile() && name.name.endsWith('.html') && (name.name.includes('v1.1') || name.name.includes('v1.2') || name.name.includes('v1.3'))) {
        htmls.push(p);
      }
    }
  }

  const htmls: string[] = [];
  walk(HTML_ROOT, htmls);

  if (htmls.length === 0) {
    console.log('❌ No HTML files found to convert');
    await browser.close();
    return;
  }

  console.log(`📄 Found ${htmls.length} HTML files to convert`);

  for (const htmlPath of htmls) {
    try {
      const html = readFileSync(htmlPath, 'utf8');
      
      // Load as data URL to avoid file:// font CORS issues
      await page.setContent(html, { waitUntil: 'networkidle' });
      
      const pdfPath = htmlPath.replace(/\.html$/, '.pdf');
      if (!existsSync(dirname(pdfPath))) {
        mkdirSync(dirname(pdfPath), { recursive: true });
      }
      
      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: { 
          top: '24mm', 
          right: '18mm', 
          bottom: '18mm', 
          left: '18mm' 
        },
        preferCSSPageSize: true
      });
      
      const stats = statSync(pdfPath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`✅ PDF ${basename(pdfPath)} (${sizeMB} MB)`);
      
    } catch (error) {
      console.error(`❌ Failed to convert ${basename(htmlPath)}:`, error);
    }
  }

  await browser.close();
  console.log('🎉 PDF generation complete!');
}

if (require.main === module) {
  run().catch(console.error);
}

export { run };
#!/usr/bin/env ts-node
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

interface ResourceMetadata {
  title: string;
  slug: string;
  category: string;
  version: string;
  lang: string;
  summary: string;
  audience: string[];
  tags: string[];
  toc?: boolean;
  coverTitle?: string;
  coverSubtitle?: string;
  coverBadge?: string;
}

interface ResourceManifest {
  title: string;
  slug: string;
  category: string;
  lang: string;
  version: string;
  pdf: string;
  html: string;
  size: string;
}

const RESOURCES_SRC = 'resources-src';
const PUBLIC_RESOURCES = 'public/resources';
const CSS_PATH = 'resources-src/theme/resources-pdf.css';

async function ensureDirectoryExists(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

function generateTOC(content: string): string {
  const headings = content.match(/^## (.+)$/gm);
  if (!headings || headings.length === 0) return '';
  
  const tocItems = headings.map(heading => {
    const title = heading.replace(/^## /, '').replace(/\*\*/g, '');
    return `  <li>${title}</li>`;
  }).join('\n');
  
  return `<div class="toc">
  <h3>Contents</h3>
  <ol>
${tocItems}
  </ol>
</div>`;
}

function generateCover(metadata: ResourceMetadata): string {
  if (!metadata.coverTitle) return '';
  
  return `<div class="cover">
  <h1>${metadata.coverTitle}</h1>
  ${metadata.coverSubtitle ? `<div class="subtitle">${metadata.coverSubtitle}</div>` : ''}
  ${metadata.coverBadge ? `<div class="badges"><span class="badge">${metadata.coverBadge}</span></div>` : ''}
</div>

<hr class="m-0" />
`;
}

async function createHTMLTemplate(content: string, metadata: ResourceMetadata, css: string): Promise<string> {
  // Generate cover and TOC
  const coverHtml = generateCover(metadata);
  const tocHtml = metadata.toc ? generateTOC(content) : '';
  
  // Convert markdown to HTML using remark
  const processor = remark().use(remarkGfm).use(remarkHtml);
  const htmlContent = await processor.process(content);
  const htmlString = htmlContent.toString();
  
  // Inject TOC after first H1 if present
  let finalContent = htmlString;
  if (tocHtml) {
    const h1Match = finalContent.match(/(<h1[^>]*>.*?<\/h1>)/);
    if (h1Match) {
      const afterH1 = finalContent.indexOf('</h1>') + 5;
      finalContent = finalContent.slice(0, afterH1) + '\n' + tocHtml + '\n' + finalContent.slice(afterH1);
    } else {
      finalContent = tocHtml + '\n' + finalContent;
    }
  }
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${metadata.title}</title>
  <style>
    ${css}
  </style>
</head>
<body>
  ${coverHtml}
  ${finalContent}
  
  <div class="footer">
    © Zaza Technologies — Teacher resources. Use within your school. Not for resale.
  </div>
</body>
</html>`;
}

async function generateHTML(htmlContent: string, outputPath: string): Promise<void> {
  await fs.writeFile(outputPath, htmlContent, 'utf8');
  console.log(`✅ Generated HTML: ${outputPath}`);
}

async function processMarkdownFile(filePath: string, css: string): Promise<ResourceManifest | null> {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const { data: metadata, content: markdownContent } = matter(content);
    
    // Validate required metadata
    if (!metadata.title || !metadata.slug || !metadata.category) {
      console.warn(`⚠️ Skipping ${filePath}: missing required metadata`);
      return null;
    }
    
    const resourceMetadata = metadata as ResourceMetadata;
    
    // Ensure category directory exists
    const categoryDir = path.join(PUBLIC_RESOURCES, resourceMetadata.category.toLowerCase());
    await ensureDirectoryExists(categoryDir);
    
    // Generate output filename
    const version = resourceMetadata.version || '1.1';
    const lang = resourceMetadata.lang || 'en';
    const htmlFileName = `${resourceMetadata.slug}-v${version}-${lang}.html`;
    const pdfFileName = `${resourceMetadata.slug}-v${version}-${lang}.pdf`;
    const htmlPath = path.join(categoryDir, htmlFileName);
    const pdfPath = path.join(categoryDir, pdfFileName);
    
    // Create HTML template
    const htmlContent = await createHTMLTemplate(markdownContent, resourceMetadata, css);
    await generateHTML(htmlContent, htmlPath);
    
    // Copy HTML to PDF (placeholder until proper PDF generation)
    await fs.copyFile(htmlPath, pdfPath);
    console.log(`📄 Created PDF placeholder: ${pdfPath}`);
    
    // Get file size from HTML
    const stats = await fs.stat(htmlPath);
    const sizeMB = (stats.size / 1024).toFixed(1) + ' KB';
    
    // Return manifest entry with both HTML and PDF paths
    const pdfHref = `/${path.relative('public', pdfPath).replace(/\\/g, '/')}`;
    const htmlHref = `/${path.relative('public', htmlPath).replace(/\\/g, '/')}`;
    
    return {
      title: resourceMetadata.title,
      slug: `${resourceMetadata.slug}-v${version}-${lang}`,
      category: resourceMetadata.category,
      lang,
      version,
      pdf: pdfHref,
      html: htmlHref,
      size: sizeMB
    };
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error);
    return null;
  }
}

async function findMarkdownFiles(dir: string, basePath: string = ''): Promise<string[]> {
  const files: string[] = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = basePath ? path.join(basePath, entry.name) : entry.name;
    
    if (entry.isDirectory()) {
      // Recursively scan subdirectories
      const subFiles = await findMarkdownFiles(fullPath, relativePath);
      files.push(...subFiles);
    } else if (entry.isFile() && entry.name.endsWith('.md') && (entry.name.includes('v1-1') || entry.name.includes('v1.2'))) {
      files.push(relativePath);
    }
  }
  
  return files;
}

async function main(): Promise<void> {
  console.log('🚀 Generating Resources v1.1 & v1.2...');
  
  try {
    // Ensure output directory exists
    await ensureDirectoryExists(PUBLIC_RESOURCES);
    
    // Load CSS
    const css = await fs.readFile(CSS_PATH, 'utf8');
    
    // Find all markdown files recursively
    const markdownFiles = await findMarkdownFiles(RESOURCES_SRC);
    
    console.log(`📄 Found ${markdownFiles.length} markdown files (v1.1 & v1.2)`);
    
    // Process each file
    const manifest: ResourceManifest[] = [];
    
    for (const file of markdownFiles) {
      const filePath = path.join(RESOURCES_SRC, file);
      const result = await processMarkdownFile(filePath, css);
      
      if (result) {
        manifest.push(result);
      }
    }
    
    // Write manifest
    const manifestPath = path.join(PUBLIC_RESOURCES, 'resources.manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    
    console.log(`✅ Generated ${manifest.length} HTML files (PDFs will be generated separately)`);
    console.log(`📋 Manifest written to: ${manifestPath}`);
    
    // Summary
    const totalSizeKB = manifest.reduce((sum, item) => {
      const sizeStr = item.size.replace(' KB', '');
      return sum + parseFloat(sizeStr);
    }, 0);
    const avgSizeKB = totalSizeKB / manifest.length;
    
    console.log(`📊 Total size: ${totalSizeKB.toFixed(1)}KB`);
    console.log(`📊 Average size: ${avgSizeKB.toFixed(1)}KB`);
    
    if (avgSizeKB < 100) {
      console.warn('⚠️ Warning: Average file size is less than 100KB');
    }
    
  } catch (error) {
    console.error('❌ Generation failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
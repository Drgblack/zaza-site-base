#!/usr/bin/env tsx
import { readdir, stat, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';

const RESOURCES_DIR = 'public/resources';
const OUTPUT_FILE = 'src/data/resources-manifest.json';
const MIN_FILE_SIZE = 8 * 1024; // 8KB minimum

interface ResourceFile {
  name: string;
  filename: string;
  size: number;
  sizeFormatted: string;
  downloadUrl: string;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function filenameToTitle(filename: string): string {
  return filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[-_]/g, ' ')    // Replace dashes/underscores with spaces
    .replace(/\b\w/g, l => l.toUpperCase()); // Title case
}

async function buildResourcesManifest() {
  console.log('📚 Building resources manifest...');

  if (!existsSync(RESOURCES_DIR)) {
    console.log(`📁 Resources directory not found: ${RESOURCES_DIR}`);
    console.log('📝 Creating empty manifest');
    await writeFile(OUTPUT_FILE, JSON.stringify([], null, 2));
    return;
  }

  const files = await readdir(RESOURCES_DIR);
  const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));

  if (pdfFiles.length === 0) {
    console.log('📝 No PDF files found in resources directory');
    await writeFile(OUTPUT_FILE, JSON.stringify([], null, 2));
    return;
  }

  const resources: ResourceFile[] = [];

  for (const file of pdfFiles) {
    const filePath = join(RESOURCES_DIR, file);
    const stats = await stat(filePath);
    
    console.log(`📄 Processing: ${file} (${formatBytes(stats.size)})`);
    
    if (stats.size < MIN_FILE_SIZE) {
      console.log(`  ⚠️  File too small (< 8KB), skipping`);
      continue;
    }

    resources.push({
      name: filenameToTitle(file),
      filename: file,
      size: stats.size,
      sizeFormatted: formatBytes(stats.size),
      downloadUrl: `/resources/${file}`
    });
  }

  // Sort by size (largest first)
  resources.sort((a, b) => b.size - a.size);

  await writeFile(OUTPUT_FILE, JSON.stringify(resources, null, 2));
  
  console.log(`✅ Built manifest with ${resources.length} resources`);
  console.log(`📄 Output: ${OUTPUT_FILE}`);

  if (resources.length === 0) {
    console.log('⚠️  No valid resources found (all files < 8KB)');
  }
}

if (require.main === module) {
  buildResourcesManifest().catch(console.error);
}

export { buildResourcesManifest };
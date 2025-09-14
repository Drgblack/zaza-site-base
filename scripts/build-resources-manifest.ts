import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'public', 'resources');
const out = path.join(process.cwd(), 'src/data/resources.manifest.json');

if (!fs.existsSync(ROOT)) {
  console.log('[resources] No resources directory found - creating empty manifest');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify([], null, 2));
  process.exit(0);
}

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.pdf'));

if (files.length === 0) {
  console.log('[resources] No PDF files found - creating empty manifest');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify([], null, 2));
  process.exit(0);
}

console.log(`[resources] Processing ${files.length} resource files...`);

const manifest = files.map(f => {
  const full = path.join(ROOT, f);
  const { size } = fs.statSync(full);
  const title = f
    .replace(/[-_]/g, ' ')
    .replace(/\.pdf$/, '')
    .replace(/\b\w/g, l => l.toUpperCase()); // Title case
  
  return { 
    id: f.replace(/\.pdf$/, ''),
    title, 
    path: `/resources/${f}`, 
    bytes: size,
    size: formatBytes(size)
  };
});

const tooSmall = manifest.filter(x => x.bytes < 2048);
if (tooSmall.length) {
  console.warn('[resources] Warning: Some PDFs are very small (< 2KB):', tooSmall.map(x => x.title).slice(0, 5));
  console.warn('[resources] Consider replacing these with proper PDF content for production');
}

// Ensure directory exists
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(manifest, null, 2));

console.log(`[resources] ✓ Manifest written: ${out}`);
console.log(`[resources] ✓ ${manifest.length} resources validated`);

// Helper function
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let i = -1;
  let size = bytes;
  
  do {
    size = size / 1024;
    i++;
  } while (size >= 1024 && i < units.length - 1);
  
  return `${size.toFixed(1)} ${units[i]}`;
}
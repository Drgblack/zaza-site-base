// scripts/export-blog.ts
import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'content/blog');
if (!fs.existsSync(dir)) {
  console.error('Blog directory not found:', dir);
  process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => /\.(md|mdx)$/i.test(f));
const out = files.map(f => ({
  file: f,
  content: fs.readFileSync(path.join(dir, f), 'utf8')
}));

fs.mkdirSync('backups', { recursive: true });
fs.writeFileSync('backups/blog-export.json', JSON.stringify(out, null, 2));
console.log(`✅ Exported ${out.length} posts to backups/blog-export.json`);

// Also backup images if they exist
const imageDir = path.join(process.cwd(), 'public/images/blog');
if (fs.existsSync(imageDir)) {
  const backupImageDir = path.join(process.cwd(), 'backups/blog-images');
  fs.mkdirSync(backupImageDir, { recursive: true });
  
  const copyDir = (src: string, dest: string) => {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        copyDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  };
  
  copyDir(imageDir, backupImageDir);
  console.log(`✅ Backed up blog images to backups/blog-images/`);
} else {
  console.log('📁 No blog images directory found to backup');
}
#!/usr/bin/env tsx
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const LEAK_PATTERNS = [
  /navigation\./g,
  /hero\./g,
  /community\./g,
  /footer\./g,
  /resources\./g,
  /brand\./g,
];

const SOURCE_DIRECTORIES = [
  'src/app',
  'src/components',
];

const FILE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

async function scanFileForLeaks(filePath: string): Promise<{ file: string; leaks: string[] }> {
  const content = await readFile(filePath, 'utf-8');
  const leaks: string[] = [];

  for (const pattern of LEAK_PATTERNS) {
    const matches = content.match(pattern);
    if (matches) {
      leaks.push(...matches.map(match => match.slice(0, -1))); // Remove trailing dot
    }
  }

  // Remove duplicates
  const uniqueLeaks = [...new Set(leaks)];
  
  return { file: filePath, leaks: uniqueLeaks };
}

async function scanDirectory(dirPath: string): Promise<string[]> {
  if (!existsSync(dirPath)) {
    return [];
  }

  const files: string[] = [];
  const items = await readdir(dirPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = join(dirPath, item.name);
    
    if (item.isDirectory()) {
      // Skip node_modules and .next directories
      if (!item.name.startsWith('.') && item.name !== 'node_modules') {
        const subFiles = await scanDirectory(fullPath);
        files.push(...subFiles);
      }
    } else if (item.isFile()) {
      const hasValidExtension = FILE_EXTENSIONS.some(ext => item.name.endsWith(ext));
      if (hasValidExtension) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function testRawKeys() {
  console.log('🔍 Scanning for raw i18n key leaks...');
  
  const allFiles: string[] = [];
  
  for (const dir of SOURCE_DIRECTORIES) {
    const files = await scanDirectory(dir);
    allFiles.push(...files);
  }

  console.log(`📁 Scanning ${allFiles.length} files...`);

  const results: Array<{ file: string; leaks: string[] }> = [];
  let totalLeaks = 0;

  for (const file of allFiles) {
    try {
      const result = await scanFileForLeaks(file);
      if (result.leaks.length > 0) {
        results.push(result);
        totalLeaks += result.leaks.length;
      }
    } catch (error) {
      console.warn(`⚠️  Could not scan ${file}: ${error}`);
    }
  }

  // Report results
  if (results.length === 0) {
    console.log('✅ No raw i18n key leaks detected!');
  } else {
    console.log(`❌ Found ${totalLeaks} potential raw key leaks in ${results.length} files:`);
    console.log('');
    
    for (const result of results) {
      console.log(`📄 ${result.file}:`);
      for (const leak of result.leaks) {
        console.log(`  - ${leak}.*`);
      }
      console.log('');
    }
  }

  return { totalLeaks, affectedFiles: results.length };
}

if (require.main === module) {
  testRawKeys()
    .then(({ totalLeaks, affectedFiles }) => {
      process.exit(totalLeaks > 0 ? 1 : 0);
    })
    .catch(console.error);
}

export { testRawKeys };
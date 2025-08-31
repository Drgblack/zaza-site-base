#!/usr/bin/env node

/**
 * Basic usage example for the Salvage library
 * 
 * This example demonstrates:
 * - Scanning a directory for files
 * - Getting file metadata
 * - Basic analysis operations
 */

const { SalvageCore, SalvageAnalyzer, SalvageSearch } = require('../dist');
const path = require('path');

async function main() {
  console.log('🔍 Salvage Library - Basic Usage Example\n');
  
  // Configuration
  const targetDirectory = process.argv[2] || './examples/sample-data';
  const options = {
    verbose: true,
    includeHidden: false,
    maxDepth: 3,
  };

  try {
    // 1. Basic directory scanning
    console.log('📁 Step 1: Scanning directory...');
    const salvage = new SalvageCore(options);
    
    // Set up event listeners
    salvage.onEvent((event) => {
      if (event.type === 'progress' && options.verbose) {
        console.log(`   ${event.message}`);
      }
    });

    const files = await salvage.scanDirectory(targetDirectory);
    console.log(`   Found ${files.length} items\n`);

    // 2. Display basic statistics
    console.log('📊 Step 2: Basic Statistics');
    const regularFiles = files.filter(f => !f.isDirectory);
    const directories = files.filter(f => f.isDirectory);
    const totalSize = regularFiles.reduce((sum, f) => sum + f.size, 0);

    console.log(`   Files: ${regularFiles.length}`);
    console.log(`   Directories: ${directories.length}`);
    console.log(`   Total size: ${formatBytes(totalSize)}\n`);

    // 3. Show largest files
    console.log('📏 Step 3: Largest Files');
    const sortedFiles = regularFiles.sort((a, b) => b.size - a.size).slice(0, 5);
    for (const file of sortedFiles) {
      console.log(`   ${formatBytes(file.size).padEnd(10)} ${path.basename(file.path)}`);
    }
    console.log('');

    // 4. File type breakdown
    console.log('📋 Step 4: File Types');
    const fileTypes = {};
    for (const file of regularFiles) {
      const ext = path.extname(file.path).toLowerCase() || 'no extension';
      fileTypes[ext] = (fileTypes[ext] || 0) + 1;
    }

    const sortedTypes = Object.entries(fileTypes)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    for (const [ext, count] of sortedTypes) {
      console.log(`   ${ext.padEnd(15)}: ${count} files`);
    }
    console.log('');

    // 5. Basic analysis
    console.log('🔬 Step 5: Analysis');
    const analyzer = new SalvageAnalyzer(options);
    const analysisResults = await analyzer.analyzeFiles(files);

    console.log(`   Duplicate groups: ${analysisResults.duplicateFiles.length}`);
    console.log(`   Suspicious files: ${analysisResults.suspiciousFiles.length}`);
    console.log(`   Timeline entries: ${analysisResults.timeline.length}\n`);

    // 6. Search example
    console.log('🔍 Step 6: Search Example');
    const searcher = new SalvageSearch(options);
    
    // Search for text files
    const searchResults = await searcher.search(targetDirectory, {
      fileType: 'txt'
    });

    console.log(`   Found ${searchResults.totalMatches} text files`);
    console.log(`   Search took ${searchResults.searchTime}ms\n`);

    // 7. Show some metadata examples
    console.log('📋 Step 7: File Metadata Examples');
    const sampleFiles = regularFiles.slice(0, 3);
    
    for (const file of sampleFiles) {
      console.log(`   File: ${path.basename(file.path)}`);
      console.log(`     Size: ${formatBytes(file.size)}`);
      console.log(`     Modified: ${file.modifiedAt.toISOString()}`);
      console.log(`     MIME type: ${file.mimeType || 'unknown'}`);
      console.log(`     Hash: ${file.hash ? file.hash.substring(0, 16) + '...' : 'N/A'}`);
      console.log('');
    }

    console.log('✅ Example completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Utility function to format bytes
function formatBytes(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 B';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

// Run the example
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
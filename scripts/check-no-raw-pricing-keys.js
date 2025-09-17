#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to recursively find all HTML and JS files in build output
function findFiles(dir, extensions = ['.html', '.js']) {
  const files = [];
  
  if (!fs.existsSync(dir)) {
    console.log('Build directory not found, skipping raw key check');
    return files;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...findFiles(fullPath, extensions));
    } else if (extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// Check for raw pricing keys in content
function checkForRawKeys() {
  // Try different possible build output directories
  const possibleDirs = ['.next', 'out', 'dist', 'build'];
  let buildDir = null;
  
  for (const dir of possibleDirs) {
    if (fs.existsSync(dir)) {
      buildDir = dir;
      break;
    }
  }
  
  if (!buildDir) {
    console.log('⚠️  No build directory found, skipping raw key check');
    return;
  }
  
  console.log(`🔍 Checking for raw pricing keys in ${buildDir}/...`);
  
  const files = findFiles(buildDir);
  const badKeys = new Set();
  
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      
      // Look for pricing.pricing or pricing_ patterns
      const matches = content.match(/pricing(\.|_)[A-Za-z0-9._-]+/g);
      
      if (matches) {
        matches.forEach(match => {
          // Filter out legitimate analytics event names
          if (!match.includes('pricing_cta_click') && 
              !match.includes('pricing_billing_cycle') && 
              !match.includes('pricing_suite_toggled') &&
              !match.includes('pricing_banner_')) {
            badKeys.add(match);
          }
        });
      }
    } catch (error) {
      // Skip files that can't be read (binary files, etc.)
      continue;
    }
  }
  
  if (badKeys.size > 0) {
    console.error('❌ Raw pricing keys detected in build output:');
    [...badKeys].slice(0, 20).forEach(key => {
      console.error(`   - ${key}`);
    });
    
    if (badKeys.size > 20) {
      console.error(`   ... and ${badKeys.size - 20} more`);
    }
    
    console.error('');
    console.error('These keys suggest i18n translation failures.');
    console.error('Check your pricing page components for missing translations.');
    process.exit(1);
  }
  
  console.log('✅ No raw pricing keys found in build output');
}

// Run the check
checkForRawKeys();
#!/usr/bin/env node

/**
 * Smoke test for Zaza Promptly site
 * Checks for common issues like placeholders and undefined variables
 */

const https = require('https');

const SITE_URL = process.env.SITE_URL || 'https://zaza-site-base.vercel.app';
const TEST_PATHS = ['/en', '/de', '/fr', '/es', '/it'];

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function runSmokeTest() {
  console.log(`🔍 Running smoke tests for ${SITE_URL}`);
  
  let hasErrors = false;
  
  for (const path of TEST_PATHS) {
    const url = `${SITE_URL}${path}`;
    console.log(`\n📄 Testing ${path}...`);
    
    try {
      const html = await fetchPage(url);
      
      // Check for placeholders
      const placeholderMatches = html.match(/\?\?\?|\$undefined/g);
      if (placeholderMatches) {
        console.error(`❌ Found ${placeholderMatches.length} placeholder(s):`, placeholderMatches.slice(0, 5));
        hasErrors = true;
      } else {
        console.log('✅ No placeholders found');
      }
      
      // Check for footer year
      const yearMatch = html.match(/© (20\d{2}) Zaza Technologies/);
      if (yearMatch) {
        const currentYear = new Date().getFullYear();
        const footerYear = parseInt(yearMatch[1]);
        if (footerYear === currentYear) {
          console.log(`✅ Footer year is current: ${footerYear}`);
        } else {
          console.error(`⚠️  Footer year is outdated: ${footerYear} (should be ${currentYear})`);
        }
      } else {
        console.error('❌ Footer copyright not found or malformed');
        hasErrors = true;
      }
      
      // Check for proper UTF-8 encoding
      if (html.includes('Düsseldorf') || html.includes('Gumbertstraße')) {
        console.log('✅ UTF-8 characters rendered correctly');
      }
      
    } catch (error) {
      console.error(`❌ Failed to fetch ${path}:`, error.message);
      hasErrors = true;
    }
  }
  
  if (hasErrors) {
    console.log('\n❌ Smoke test failed');
    process.exit(1);
  } else {
    console.log('\n✅ All smoke tests passed!');
    process.exit(0);
  }
}

runSmokeTest();
#!/usr/bin/env tsx

/**
 * Manual ingestion script for testing and development
 * Run with: npm run ingest
 */

import dotenv from 'dotenv';
import { TrendsCollector } from '../ingest/collect.js';
import { firestoreStore } from '../store/firestore.js';
import { SourceConfig } from '../types/index.js';

// Load environment variables
dotenv.config();

async function runManualIngest() {
  console.log('🔧 Manual Trends Ingestion');
  console.log('========================');

  try {
    // Check required environment variables
    const requiredEnvVars = ['CRON_TOKEN'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('❌ Missing required environment variables:', missingVars);
      process.exit(1);
    }

    // Build source configuration
    const sourceConfig: SourceConfig = {
      reddit: process.env.REDDIT_CLIENT_ID ? {
        clientId: process.env.REDDIT_CLIENT_ID!,
        clientSecret: process.env.REDDIT_CLIENT_SECRET!,
        username: process.env.REDDIT_USERNAME!,
        password: process.env.REDDIT_PASSWORD!,
        subreddits: ['Teachers', 'EdTech', 'Professors', 'education'],
      } : undefined,
      twitter: process.env.TWITTER_BEARER_TOKEN ? {
        bearerToken: process.env.TWITTER_BEARER_TOKEN,
      } : undefined,
      facebook: (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) ? {
        appId: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET,
      } : undefined,
      rss: {
        feeds: [
          { url: 'https://www.edsurge.com/news.rss', name: 'EdSurge' },
          { url: 'https://feeds.feedburner.com/EducationWeek', name: 'Education Week' },
          { url: 'https://www.teachthought.com/feed/', name: 'TeachThought' },
        ],
      },
    };

    console.log('📊 Available sources:');
    console.log(`  RSS: ✅ (${sourceConfig.rss.feeds.length} feeds)`);
    console.log(`  Reddit: ${sourceConfig.reddit ? '✅' : '❌'}`);
    console.log(`  Twitter: ${sourceConfig.twitter ? '✅' : '❌'}`);
    console.log(`  Facebook: ${sourceConfig.facebook ? '✅' : '❌'}`);
    console.log('');

    // Initialize collector
    const collector = new TrendsCollector(sourceConfig);

    // Get hours back from command line args or default to 24
    const hoursBack = process.argv[2] ? parseInt(process.argv[2]) : 24;
    console.log(`⏰ Ingesting data from last ${hoursBack} hours`);
    console.log('');

    // Run ingestion
    const startTime = Date.now();
    const results = await collector.ingest(hoursBack);
    const duration = Math.round((Date.now() - startTime) / 1000);

    console.log('');
    console.log('✅ Manual ingestion completed!');
    console.log('==============================');
    console.log(`📊 Results:`);
    console.log(`   Raw items stored: ${results.rawItems}`);
    console.log(`   Trend signals generated: ${results.trendSignals}`);
    console.log(`   Duration: ${duration}s`);
    console.log('');

    // Show some sample trends
    if (results.trendSignals > 0) {
      console.log('🔥 Latest trends:');
      const trends = await firestoreStore.getLatestTrendSignals(5);
      trends.forEach((trend, index) => {
        console.log(`   ${index + 1}. ${trend.topic} (${trend.volume} items, ${trend.sentimentLabel})`);
      });
    }

    console.log('');
    console.log('🚀 Next steps:');
    console.log('   1. Check Firestore console for stored data');
    console.log('   2. Test the /debug/trends endpoint');
    console.log('   3. Export sample data with /debug/export');

  } catch (error) {
    console.error('❌ Manual ingestion failed:', error);
    process.exit(1);
  }
}

// Handle command line usage
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
Usage: npm run ingest [hours]

Arguments:
  hours    Number of hours to look back (default: 24)

Examples:
  npm run ingest       # Last 24 hours
  npm run ingest 72    # Last 72 hours

Environment variables required:
  CRON_TOKEN           Random string for API authentication
  REDDIT_CLIENT_ID     Reddit API credentials (optional)
  REDDIT_CLIENT_SECRET
  REDDIT_USERNAME
  REDDIT_PASSWORD
  TWITTER_BEARER_TOKEN Twitter API v2 Bearer Token (optional)
  FACEBOOK_APP_ID      Facebook Graph API credentials (optional)
  FACEBOOK_APP_SECRET

At minimum, RSS feeds will be used even without other API keys.
  `);
  process.exit(0);
}

// Run the script
runManualIngest().catch(console.error);
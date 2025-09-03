import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { TrendsCollector } from './ingest/collect.js';
import { firestoreStore } from './store/firestore.js';
import { SourceConfig } from './types/index.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Main ingestion endpoint (protected by token)
app.get('/cron/ingest', async (req, res) => {
  try {
    // Verify cron token
    const token = req.query.token as string;
    const expectedToken = process.env.CRON_TOKEN;
    
    if (!token || !expectedToken || token !== expectedToken) {
      console.warn('⚠️  Unauthorized ingest attempt');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('🚀 Starting scheduled ingestion...');
    
    // Build source configuration from environment
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

    // Initialize collector and run ingestion
    const collector = new TrendsCollector(sourceConfig);
    const results = await collector.ingest(72); // Last 72 hours
    
    console.log('✅ Ingestion completed successfully');
    
    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      results,
      message: `Ingested ${results.rawItems} raw items, generated ${results.trendSignals} trend signals`,
    });
    
  } catch (error) {
    console.error('❌ Ingestion failed:', error);
    
    res.status(500).json({
      success: false,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Debug endpoint to view latest trends
app.get('/debug/trends', async (req, res) => {
  try {
    const trends = await firestoreStore.getLatestTrendSignals(20);
    
    res.json({
      count: trends.length,
      trends: trends.map(trend => ({
        id: trend.id,
        topic: trend.topic,
        sources: trend.sources,
        volume: trend.volume,
        engagement: trend.engagement,
        sentiment: trend.sentimentLabel,
        createdAt: trend.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Export sample data endpoint
app.get('/debug/export', async (req, res) => {
  try {
    const trends = await firestoreStore.getLatestTrendSignals(50);
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="trends-sample.json"');
    
    res.json({
      exported_at: new Date().toISOString(),
      count: trends.length,
      trends,
    });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Zaza Trends Worker running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 Debug trends: http://localhost:${PORT}/debug/trends`);
  console.log(`📥 Manual ingest: http://localhost:${PORT}/cron/ingest?token=${process.env.CRON_TOKEN}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully');  
  process.exit(0);
});
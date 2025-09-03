# Zaza Trends Worker

Decoupled trends intelligence service for educational content. Collects data from Reddit, RSS feeds, and social APIs, processes with NLP, and generates trend signals for content creation.

## Architecture

- **Data Sources**: Reddit API, RSS feeds, Twitter/Facebook (stubbed)
- **NLP Pipeline**: VADER sentiment analysis, keyword-based topic extraction
- **Storage**: Google Cloud Firestore
- **Deployment**: Cloud Run with scheduled ingestion (Mon/Wed/Fri 06:00 CET)

## Quick Start

### Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment**:
   ```bash
   cp .env.sample .env
   # Edit .env with your API credentials
   ```

3. **Run manual ingestion**:
   ```bash
   npm run ingest        # Last 24 hours
   npm run ingest 72     # Last 72 hours
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

### Cloud Deployment

1. **Setup secrets**:
   ```bash
   chmod +x deploy/setup-secrets.sh
   ./deploy/setup-secrets.sh your-project-id
   ```

2. **Deploy service**:
   ```bash
   chmod +x deploy/deploy.sh
   ./deploy/deploy.sh your-project-id
   ```

## API Endpoints

- `GET /health` - Health check
- `GET /cron/ingest?token=TOKEN` - Scheduled ingestion (token-protected)
- `GET /debug/trends` - View latest trend signals
- `GET /debug/export` - Export sample data as JSON

## Data Model

### Raw Items
```typescript
interface RawItem {
  id: string;           // Unique identifier
  title: string;        // Content title
  content: string;      // Full text content
  url?: string;         // Source URL
  author?: string;      // Author/username
  source: string;       // 'reddit', 'rss', etc.
  sourceId: string;     // Platform-specific ID
  publishedAt: string;  // ISO timestamp
  engagement: {         // Social metrics
    score?: number;     // Reddit score, likes, etc.
    comments?: number;  // Comment count
    shares?: number;    // Share count
  };
  metadata: {           // Source-specific data
    subreddit?: string;
    feedName?: string;
    tags?: string[];
  };
  createdAt: string;    // Storage timestamp
}
```

### Trend Signals
```typescript
interface TrendSignal {
  id: string;           // Unique identifier
  topic: string;        // Extracted topic/theme
  sources: string[];    // Contributing sources
  windowStart: string;  // Time window start
  windowEnd: string;    // Time window end
  volume: number;       // Number of raw items
  engagement: number;   // Total engagement score
  sentimentAvg: number; // Average sentiment (-1 to 1)
  sentimentLabel: 'negative' | 'neutral' | 'positive';
  sampleItemIds: string[]; // Reference raw items
  createdAt: string;    // Generation timestamp
}
```

## Environment Variables

### Required
- `CRON_TOKEN` - Secure token for API authentication
- `GOOGLE_CLOUD_PROJECT_ID` - GCP project identifier

### Optional (API Credentials)
- `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `REDDIT_USERNAME`, `REDDIT_PASSWORD`
- `TWITTER_BEARER_TOKEN`
- `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`

*Note: RSS feeds work without any API credentials.*

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build TypeScript
npm run start        # Start production server
npm run ingest       # Manual ingestion script
npm run test         # Run tests (if added)
```

## Monitoring

- **Cloud Run Logs**: `gcloud logging read 'resource.type="cloud_run_revision"'`
- **Scheduler Jobs**: `gcloud scheduler jobs list --location=europe-west1`
- **Firestore Data**: Google Cloud Console > Firestore

## Next Steps (Phase 8)

1. **Content Pipeline Generator**: Transform trend signals into educational content outlines
2. **Slack Integration**: Content approval workflow for educators
3. **Advanced NLP**: Topic clustering, trend prediction, content gap analysis
4. **Multi-language**: Support for international educational content

---

*Built for Phase 7→8 transition. Provides foundation for AI-driven educational content creation.*
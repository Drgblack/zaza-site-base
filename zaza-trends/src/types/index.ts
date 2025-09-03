// Data model types

export interface RawItem {
  id: string; // hash of source+nativeId
  source: 'reddit' | 'rss' | 'twitter' | 'facebook';
  sourceMeta: {
    subreddit?: string;
    feedUrl?: string;
    handle?: string;
    pageId?: string;
    permalink?: string;
    counts?: {
      upvotes?: number;
      comments?: number;
      retweets?: number;
      likes?: number;
      shares?: number;
    };
  };
  text: string;
  createdAt: string;
  capturedAt: string;
  lang: string;
  sentimentScore: number; // -1 to 1
  sentimentLabel: 'negative' | 'neutral' | 'positive';
}

export interface TrendSignal {
  topic: string;
  sources: string[];
  windowStart: string;
  windowEnd: string;
  volume: number;
  engagement: number;
  sentimentAvg: number;
  sentimentLabel: 'negative' | 'neutral' | 'positive';
  sampleItemIds: string[];
  createdAt: string;
}

export interface ContentPipelineItem {
  id: string;
  trendSignalIds: string[];
  weekOf: string; // YYYY-WW format
  status: 'draft' | 'waiting_approval' | 'approved' | 'published' | 'rejected';
  outputs: {
    blog?: {
      title: string;
      slug: string;
      body: string;
      heroImage: string;
      seo: {
        title: string;
        description: string;
        keywords: string[];
      };
    };
    linkedin?: {
      text: string;
    };
    twitter?: {
      thread: string[];
    };
    tiktok?: {
      script: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface SourceConfig {
  reddit: {
    clientId: string;
    clientSecret: string;
    username: string;
    password: string;
    subreddits: string[];
  };
  twitter?: {
    bearerToken: string;
  };
  facebook?: {
    appId: string;
    appSecret: string;
  };
  rss: {
    feeds: Array<{
      url: string;
      name: string;
    }>;
  };
}
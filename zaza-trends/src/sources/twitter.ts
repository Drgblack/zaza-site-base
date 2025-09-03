import { RawItem } from '../types/index.js';

export class TwitterSource {
  private bearerToken?: string;

  constructor(config?: { bearerToken: string }) {
    this.bearerToken = config?.bearerToken;
  }

  async fetchItems(hoursBack = 72): Promise<Omit<RawItem, 'id' | 'sentimentScore' | 'sentimentLabel'>[]> {
    console.log(`🔍 Twitter: Checking for API access...`);

    if (!this.bearerToken) {
      console.warn(`⚠️  Twitter: No bearer token provided, skipping Twitter source`);
      return [];
    }

    console.log(`🔍 Fetching Twitter posts from last ${hoursBack} hours...`);
    
    // Stub implementation - would use Twitter API v2
    const items: Omit<RawItem, 'id' | 'sentimentScore' | 'sentimentLabel'>[] = [];
    
    try {
      // Educational hashtags and handles to monitor
      const queries = [
        '#EdTech',
        '#TeacherLife', 
        '#Education',
        '#Teachers',
        'from:EdWeek OR from:EdSurge',
      ];

      // This would be the actual Twitter API v2 call:
      // const response = await fetch('https://api.twitter.com/2/tweets/search/recent', {
      //   headers: { 'Authorization': `Bearer ${this.bearerToken}` },
      //   ...
      // });

      console.log(`🎯 Twitter: API implementation pending - collected ${items.length} items`);
      console.log(`📝 Twitter: Would query: ${queries.join(', ')}`);
      
    } catch (error) {
      console.error(`❌ Error fetching Twitter:`, error);
    }

    return items;
  }
}

// Future implementation notes:
/*
For Twitter API v2 integration:

1. Use search/recent endpoint with queries:
   - #EdTech #TeacherLife #Education #Teachers
   - from:EdWeek from:EdSurge from:teachthought
   
2. Request fields: text, created_at, public_metrics, author_id
   
3. Transform to RawItem:
   - source: 'twitter'
   - sourceMeta: { handle, permalink, counts: { retweets, likes } }
   - text: tweet.text
   - createdAt: tweet.created_at
   
4. Rate limits: 300 requests per 15-min window
   
5. Requires Twitter Developer Account + Elevated access for v2 API
*/
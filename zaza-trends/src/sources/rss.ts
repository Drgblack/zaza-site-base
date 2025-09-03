import Parser from 'rss-parser';
import { RawItem } from '../types/index.js';

export class RSSSource {
  private parser: Parser;
  private feeds = [
    { url: 'https://www.edsurge.com/news.rss', name: 'EdSurge' },
    { url: 'https://feeds.feedburner.com/EducationWeek', name: 'Education Week' },
    { url: 'https://www.teachthought.com/feed/', name: 'TeachThought' },
  ];

  constructor() {
    this.parser = new Parser({
      timeout: 10000,
      headers: {
        'User-Agent': 'zaza-trends/1.0.0 (educational content analysis)',
      },
    });
  }

  async fetchItems(hoursBack = 72): Promise<Omit<RawItem, 'id' | 'sentimentScore' | 'sentimentLabel'>[]> {
    const items: Omit<RawItem, 'id' | 'sentimentScore' | 'sentimentLabel'>[] = [];
    const cutoffTime = new Date(Date.now() - hoursBack * 60 * 60 * 1000);

    console.log(`🔍 Fetching RSS feeds from last ${hoursBack} hours...`);

    for (const feedConfig of this.feeds) {
      try {
        console.log(`  📰 Processing ${feedConfig.name}...`);
        
        const feed = await this.parser.parseURL(feedConfig.url);
        
        for (const item of feed.items) {
          const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
          if (pubDate < cutoffTime) continue;

          const text = `${item.title || ''}\n\n${this.stripHtml(item.contentSnippet || item.content || '')}`.trim();
          
          if (text.length < 100) continue; // Skip very short items

          items.push({
            source: 'rss',
            sourceMeta: {
              feedUrl: feedConfig.url,
              permalink: item.link || '',
            },
            text,
            createdAt: pubDate.toISOString(),
            capturedAt: new Date().toISOString(),
            lang: 'en',
          });
        }

        console.log(`  ✅ Processed ${feedConfig.name}: ${feed.items.length} items`);
      } catch (error) {
        console.error(`❌ Error fetching ${feedConfig.name}:`, error);
      }
    }

    console.log(`🎯 RSS: Collected ${items.length} total items`);
    return items;
  }

  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&[^;]+;/g, ' ') // Remove HTML entities
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }
}
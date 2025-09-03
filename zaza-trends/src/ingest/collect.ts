import { RedditSource } from '../sources/reddit.js';
import { RSSSource } from '../sources/rss.js';
import { TwitterSource } from '../sources/twitter.js';
import { FacebookSource } from '../sources/facebook.js';
import { SentimentAnalyzer } from '../nlp/sentiment.js';
import { TopicExtractor } from '../nlp/topics.js';
import { firestoreStore } from '../store/firestore.js';
import { RawItem, TrendSignal, SourceConfig } from '../types/index.js';

export class TrendsCollector {
  private sources: {
    reddit?: RedditSource;
    rss: RSSSource;
    twitter?: TwitterSource;
    facebook?: FacebookSource;
  };

  constructor(config: SourceConfig) {
    this.sources = {
      rss: new RSSSource(),
    };

    // Initialize sources based on available config
    if (config.reddit) {
      this.sources.reddit = new RedditSource(config.reddit);
      console.log('✅ Reddit source initialized');
    } else {
      console.warn('⚠️  Reddit credentials not found, skipping Reddit source');
    }

    if (config.twitter?.bearerToken) {
      this.sources.twitter = new TwitterSource(config.twitter);
      console.log('✅ Twitter source initialized');
    } else {
      console.warn('⚠️  Twitter credentials not found, skipping Twitter source');
    }

    if (config.facebook?.appId && config.facebook?.appSecret) {
      this.sources.facebook = new FacebookSource(config.facebook);
      console.log('✅ Facebook source initialized');
    } else {
      console.warn('⚠️  Facebook credentials not found, skipping Facebook source');
    }
  }

  /**
   * Main ingestion workflow
   */
  async ingest(hoursBack = 72): Promise<{ rawItems: number; trendSignals: number }> {
    console.log(`🚀 Starting trend ingestion for last ${hoursBack} hours...`);
    
    const windowEnd = new Date().toISOString();
    const windowStart = new Date(Date.now() - hoursBack * 60 * 60 * 1000).toISOString();

    // Step 1: Collect raw items from all sources
    const allRawItems = await this.collectFromAllSources(hoursBack);
    console.log(`📊 Collected ${allRawItems.length} total raw items`);

    if (allRawItems.length === 0) {
      console.log('⚠️  No items collected, ending ingestion');
      return { rawItems: 0, trendSignals: 0 };
    }

    // Step 2: Analyze sentiment for all items
    const itemsWithSentiment = await this.analyzeSentiment(allRawItems);
    console.log(`💭 Analyzed sentiment for ${itemsWithSentiment.length} items`);

    // Step 3: Store raw items (with deduplication)
    const storedItems = await this.storeRawItems(itemsWithSentiment);
    console.log(`💾 Stored ${storedItems} unique raw items`);

    // Step 4: Extract topics and create trend signals
    const trendSignals = await this.generateTrendSignals(
      itemsWithSentiment, 
      windowStart, 
      windowEnd
    );
    console.log(`🔥 Generated ${trendSignals.length} trend signals`);

    // Step 5: Store trend signals
    let storedSignals = 0;
    for (const signal of trendSignals) {
      await firestoreStore.storeTrendSignal(signal);
      storedSignals++;
    }

    console.log(`✅ Ingestion complete: ${storedItems} raw items, ${storedSignals} trend signals`);
    
    return { rawItems: storedItems, trendSignals: storedSignals };
  }

  /**
   * Collect items from all available sources
   */
  private async collectFromAllSources(hoursBack: number): Promise<Omit<RawItem, 'id' | 'sentimentScore' | 'sentimentLabel'>[]> {
    const allItems: Omit<RawItem, 'id' | 'sentimentScore' | 'sentimentLabel'>[] = [];

    // Collect from each source in parallel
    const sourcePromises: Promise<Omit<RawItem, 'id' | 'sentimentScore' | 'sentimentLabel'>[]>[] = [];

    if (this.sources.reddit) {
      sourcePromises.push(this.sources.reddit.fetchItems(hoursBack));
    }

    sourcePromises.push(this.sources.rss.fetchItems(hoursBack));

    if (this.sources.twitter) {
      sourcePromises.push(this.sources.twitter.fetchItems(hoursBack));
    }

    if (this.sources.facebook) {
      sourcePromises.push(this.sources.facebook.fetchItems(hoursBack));
    }

    try {
      const results = await Promise.allSettled(sourcePromises);
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          allItems.push(...result.value);
        } else {
          console.error(`❌ Source ${index} failed:`, result.reason);
        }
      });
    } catch (error) {
      console.error('❌ Error collecting from sources:', error);
    }

    return allItems;
  }

  /**
   * Analyze sentiment for all collected items
   */
  private async analyzeSentiment(
    items: Omit<RawItem, 'id' | 'sentimentScore' | 'sentimentLabel'>[]
  ): Promise<Omit<RawItem, 'id'>[]> {
    console.log(`🧠 Analyzing sentiment for ${items.length} items...`);
    
    const itemsWithSentiment: Omit<RawItem, 'id'>[] = [];
    
    for (const item of items) {
      try {
        const sentiment = SentimentAnalyzer.analyze(item.text);
        
        itemsWithSentiment.push({
          ...item,
          sentimentScore: sentiment.score,
          sentimentLabel: sentiment.label,
        });
      } catch (error) {
        console.warn(`⚠️  Sentiment analysis failed for item, using neutral:`, error);
        itemsWithSentiment.push({
          ...item,
          sentimentScore: 0,
          sentimentLabel: 'neutral',
        });
      }
    }

    return itemsWithSentiment;
  }

  /**
   * Store raw items with deduplication
   */
  private async storeRawItems(items: Omit<RawItem, 'id'>[]): Promise<number> {
    let stored = 0;
    
    for (const item of items) {
      try {
        await firestoreStore.storeRawItem(item);
        stored++;
      } catch (error) {
        console.warn(`⚠️  Failed to store raw item:`, error);
      }
    }
    
    return stored;
  }

  /**
   * Generate trend signals from processed items
   */
  private async generateTrendSignals(
    items: Omit<RawItem, 'id'>[],
    windowStart: string,
    windowEnd: string
  ): Promise<TrendSignal[]> {
    console.log(`📈 Generating trend signals...`);
    
    // Group items by source for better topic clustering
    const itemsBySource = items.reduce((acc, item) => {
      if (!acc[item.source]) acc[item.source] = [];
      acc[item.source].push(item);
      return acc;
    }, {} as Record<string, typeof items>);

    const allSignals: TrendSignal[] = [];

    // Generate trends per source
    for (const [source, sourceItems] of Object.entries(itemsBySource)) {
      console.log(`  🔍 Processing ${source}: ${sourceItems.length} items`);
      
      // Prepare items for topic clustering
      const itemsForClustering = sourceItems.map((item, index) => ({
        id: `${source}-${index}`, // temporary ID for clustering
        text: item.text,
        item, // reference to original item
      }));

      // Extract topics
      const clusters = TopicExtractor.clusterByTopics(itemsForClustering, 2);
      
      // Convert clusters to trend signals
      for (const cluster of clusters.slice(0, 5)) { // Top 5 trends per source
        const clusterItems = cluster.items.map(id => {
          const index = parseInt(id.split('-')[1]);
          return sourceItems[index];
        });

        // Calculate engagement
        const engagement = clusterItems.reduce((sum, item) => {
          const counts = item.sourceMeta.counts || {};
          return sum + (counts.upvotes || 0) + (counts.retweets || 0) + (counts.likes || 0);
        }, 0);

        // Calculate sentiment
        const sentiments = clusterItems.map(item => ({
          score: item.sentimentScore,
          label: item.sentimentLabel,
          confidence: 1,
        }));
        const avgSentiment = SentimentAnalyzer.aggregateSentiment(sentiments);

        // Create trend signal
        const signal: TrendSignal = {
          topic: cluster.topic,
          sources: [source],
          windowStart,
          windowEnd,
          volume: cluster.volume,
          engagement,
          sentimentAvg: avgSentiment.score,
          sentimentLabel: avgSentiment.label,
          sampleItemIds: cluster.items.slice(0, 5), // Keep first 5 as samples
          createdAt: new Date().toISOString(),
        };

        allSignals.push(signal);
      }
    }

    // Sort by volume * engagement score
    allSignals.sort((a, b) => (b.volume * b.engagement) - (a.volume * a.engagement));

    console.log(`✅ Generated ${allSignals.length} trend signals`);
    return allSignals;
  }
}
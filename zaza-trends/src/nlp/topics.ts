// @ts-ignore - keyword-extractor doesn't have proper types
import * as keywordExtractor from 'keyword-extractor';

export interface TopicCluster {
  topic: string;
  keywords: string[];
  items: string[]; // item IDs
  volume: number;
  confidence: number;
}

export class TopicExtractor {
  private static readonly EDUCATION_STOPWORDS = [
    // Common stopwords
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
    'between', 'among', 'this', 'that', 'these', 'those', 'i', 'me', 'my', 'myself', 'we',
    'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he',
    'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself',
    'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom',
    'where', 'when', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most',
    'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than',
    'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now', 'get', 'go',
    'make', 'take', 'come', 'see', 'know', 'think', 'say', 'way', 'could', 'would',
    // Common but not meaningful in education context
    'really', 'actually', 'definitely', 'probably', 'maybe', 'perhaps', 'certainly',
    'always', 'never', 'sometimes', 'often', 'usually', 'generally', 'specifically',
    'basically', 'literally', 'obviously', 'honestly', 'frankly', 'clearly',
  ];

  /**
   * Extract keywords from a single text using TF-IDF-like approach
   */
  static extractKeywords(text: string, maxKeywords = 10): string[] {
    try {
      const keywords = keywordExtractor.extract(text, {
        language: 'english',
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true,
        return_chained_words: true,
        remove_stopwords: true,
        custom_stopwords: this.EDUCATION_STOPWORDS,
      });

      // Filter and score keywords
      const scoredKeywords = keywords
        .filter(keyword => keyword.length > 2) // Remove very short words
        .filter(keyword => /^[a-zA-Z\s]+$/.test(keyword)) // Only letters and spaces
        .map(keyword => ({
          keyword: keyword.toLowerCase().trim(),
          score: this.calculateKeywordScore(keyword, text),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, maxKeywords)
        .map(item => item.keyword);

      return scoredKeywords;
    } catch (error) {
      console.warn('Keyword extraction failed:', error);
      return [];
    }
  }

  /**
   * Cluster items by topic similarity using simple keyword overlap
   */
  static clusterByTopics(
    items: Array<{ id: string; text: string; keywords?: string[] }>,
    minClusterSize = 2
  ): TopicCluster[] {
    // Extract keywords for all items if not provided
    const itemsWithKeywords = items.map(item => ({
      ...item,
      keywords: item.keywords || this.extractKeywords(item.text, 15),
    }));

    const clusters: TopicCluster[] = [];
    const processed = new Set<string>();

    for (const item of itemsWithKeywords) {
      if (processed.has(item.id)) continue;

      const cluster: TopicCluster = {
        topic: '',
        keywords: [...item.keywords],
        items: [item.id],
        volume: 1,
        confidence: 0,
      };

      processed.add(item.id);

      // Find similar items
      for (const otherItem of itemsWithKeywords) {
        if (processed.has(otherItem.id)) continue;

        const similarity = this.calculateSimilarity(item.keywords, otherItem.keywords);
        if (similarity > 0.3) { // 30% keyword overlap threshold
          cluster.items.push(otherItem.id);
          cluster.volume++;
          // Merge keywords
          cluster.keywords = [...new Set([...cluster.keywords, ...otherItem.keywords])];
          processed.add(otherItem.id);
        }
      }

      // Only keep clusters with minimum size
      if (cluster.volume >= minClusterSize) {
        // Generate topic name from top keywords
        cluster.topic = this.generateTopicName(cluster.keywords);
        cluster.confidence = Math.min(cluster.volume / items.length, 1);
        clusters.push(cluster);
      }
    }

    // Sort by volume (biggest topics first)
    return clusters.sort((a, b) => b.volume - a.volume);
  }

  /**
   * Calculate keyword importance score based on frequency and position
   */
  private static calculateKeywordScore(keyword: string, text: string): number {
    const lowerText = text.toLowerCase();
    const lowerKeyword = keyword.toLowerCase();
    
    // Count occurrences
    const occurrences = (lowerText.match(new RegExp(lowerKeyword, 'g')) || []).length;
    
    // Boost score if keyword appears in first 100 characters (title/beginning)
    const earlyAppearance = lowerText.substring(0, 100).includes(lowerKeyword) ? 1.5 : 1;
    
    // Boost longer keywords (multi-word phrases are more specific)
    const lengthBoost = keyword.split(' ').length > 1 ? 1.3 : 1;
    
    return occurrences * earlyAppearance * lengthBoost;
  }

  /**
   * Calculate similarity between two keyword arrays using Jaccard similarity
   */
  private static calculateSimilarity(keywords1: string[], keywords2: string[]): number {
    const set1 = new Set(keywords1.map(k => k.toLowerCase()));
    const set2 = new Set(keywords2.map(k => k.toLowerCase()));
    
    const intersection = new Set([...set1].filter(k => set2.has(k)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  }

  /**
   * Generate a readable topic name from keywords
   */
  private static generateTopicName(keywords: string[]): string {
    // Take top 3 most relevant keywords
    const topKeywords = keywords
      .slice(0, 5)
      .filter(k => k.length > 3) // Prefer longer, more specific terms
      .slice(0, 3);
    
    if (topKeywords.length === 0) {
      return 'General Discussion';
    }
    
    // Try to create a natural phrase
    return topKeywords.join(' & ');
  }

  /**
   * Get trending topics from clustered data
   */
  static getTrendingTopics(
    clusters: TopicCluster[],
    limit = 10
  ): Array<TopicCluster & { trendScore: number }> {
    return clusters
      .map(cluster => ({
        ...cluster,
        trendScore: cluster.volume * cluster.confidence,
      }))
      .sort((a, b) => b.trendScore - a.trendScore)
      .slice(0, limit);
  }
}
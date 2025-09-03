import { SentimentAnalyzer, PorterStemmer } from 'natural';
// @ts-ignore - vader-sentiment doesn't have proper types
import * as vader from 'vader-sentiment';

export interface SentimentResult {
  score: number; // -1 to 1
  label: 'negative' | 'neutral' | 'positive';
  confidence: number;
}

export class SentimentAnalyzer {
  /**
   * Analyze sentiment using VADER (Valence Aware Dictionary and sEntiment Reasoner)
   * VADER is specifically good for social media text and handles:
   * - Punctuation, capitalization, emoticons
   * - Degree modifiers (very, extremely, etc.)
   * - Contractions and slang
   */
  static analyze(text: string): SentimentResult {
    try {
      // Clean text for better analysis
      const cleanText = this.preprocessText(text);
      
      // Use VADER for sentiment analysis
      const vaderResult = vader.SentimentIntensityAnalyzer.polarity_scores(cleanText);
      
      // VADER returns: neg, neu, pos, compound
      // compound score ranges from -1 (most negative) to +1 (most positive)
      const score = vaderResult.compound;
      
      // Determine label based on compound score
      let label: 'negative' | 'neutral' | 'positive';
      if (score >= 0.05) {
        label = 'positive';
      } else if (score <= -0.05) {
        label = 'negative';
      } else {
        label = 'neutral';
      }
      
      // Calculate confidence based on the strength of the dominant sentiment
      const confidence = Math.max(vaderResult.pos, vaderResult.neu, vaderResult.neg);
      
      return {
        score,
        label,
        confidence
      };
    } catch (error) {
      console.warn('Sentiment analysis failed:', error);
      return {
        score: 0,
        label: 'neutral',
        confidence: 0
      };
    }
  }

  /**
   * Batch analyze multiple texts
   */
  static analyzeBatch(texts: string[]): SentimentResult[] {
    return texts.map(text => this.analyze(text));
  }

  /**
   * Preprocess text for better sentiment analysis
   */
  private static preprocessText(text: string): string {
    return text
      .toLowerCase()
      // Preserve important punctuation for VADER
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  /**
   * Get aggregated sentiment for a collection of texts
   */
  static aggregateSentiment(sentiments: SentimentResult[]): SentimentResult {
    if (sentiments.length === 0) {
      return { score: 0, label: 'neutral', confidence: 0 };
    }

    const avgScore = sentiments.reduce((sum, s) => sum + s.score, 0) / sentiments.length;
    const avgConfidence = sentiments.reduce((sum, s) => sum + s.confidence, 0) / sentiments.length;
    
    let label: 'negative' | 'neutral' | 'positive';
    if (avgScore >= 0.05) {
      label = 'positive';
    } else if (avgScore <= -0.05) {
      label = 'negative';
    } else {
      label = 'neutral';
    }

    return {
      score: avgScore,
      label,
      confidence: avgConfidence
    };
  }
}
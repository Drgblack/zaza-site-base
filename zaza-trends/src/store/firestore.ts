import { Firestore } from '@google-cloud/firestore';
import { RawItem, TrendSignal, ContentPipelineItem } from '../types/index.js';
import crypto from 'crypto';

export class FirestoreStore {
  private db: Firestore;

  constructor() {
    this.db = new Firestore({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    });
  }

  // Create composite hash for deduplication
  private createItemId(source: string, nativeId: string): string {
    return crypto.createHash('sha256')
      .update(`${source}:${nativeId}`)
      .digest('hex');
  }

  // Raw Items Collection
  async storeRawItem(item: Omit<RawItem, 'id'>): Promise<string> {
    const id = this.createItemId(item.source, item.sourceMeta.permalink || '');
    const docRef = this.db.collection('raw_items').doc(id);
    
    // Check if already exists
    const existing = await docRef.get();
    if (existing.exists) {
      console.log(`Item ${id} already exists, skipping`);
      return id;
    }

    const rawItem: RawItem = { ...item, id };
    await docRef.set(rawItem);
    console.log(`Stored raw item: ${id}`);
    return id;
  }

  async getRawItemsByWindow(windowStart: string, windowEnd: string): Promise<RawItem[]> {
    const snapshot = await this.db.collection('raw_items')
      .where('capturedAt', '>=', windowStart)
      .where('capturedAt', '<=', windowEnd)
      .get();
    
    return snapshot.docs.map(doc => doc.data() as RawItem);
  }

  // Trend Signals Collection
  async storeTrendSignal(signal: TrendSignal): Promise<string> {
    const docRef = await this.db.collection('trend_signals').add(signal);
    console.log(`Stored trend signal: ${docRef.id} - ${signal.topic}`);
    return docRef.id;
  }

  async getTrendSignalsByWindow(windowEnd: string, limit = 50): Promise<TrendSignal[]> {
    const snapshot = await this.db.collection('trend_signals')
      .where('windowEnd', '<=', windowEnd)
      .orderBy('windowEnd', 'desc')
      .limit(limit)
      .get();
    
    return snapshot.docs.map(doc => ({ 
      ...(doc.data() as TrendSignal),
      id: doc.id 
    } as TrendSignal & { id: string }));
  }

  // Content Pipeline Collection
  async storeContentPipelineItem(item: ContentPipelineItem): Promise<string> {
    const docRef = await this.db.collection('content_pipeline').add(item);
    console.log(`Stored content pipeline item: ${docRef.id}`);
    return docRef.id;
  }

  async updateContentPipelineStatus(
    id: string, 
    status: ContentPipelineItem['status']
  ): Promise<void> {
    await this.db.collection('content_pipeline').doc(id).update({
      status,
      updatedAt: new Date().toISOString()
    });
  }

  // Utility methods
  async getLatestTrendSignals(limit = 20): Promise<Array<TrendSignal & { id: string }>> {
    const snapshot = await this.db.collection('trend_signals')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();
    
    return snapshot.docs.map(doc => ({ 
      ...(doc.data() as TrendSignal),
      id: doc.id 
    }));
  }

  // Initialize Firestore indexes (run once)
  async createIndexes(): Promise<void> {
    console.log('📊 Firestore indexes should be created via gcloud CLI:');
    console.log('gcloud firestore indexes composite create --collection-group=trend_signals --field-config field-path=windowEnd,order=descending --field-config field-path=source,order=ascending');
    console.log('gcloud firestore indexes composite create --collection-group=raw_items --field-config field-path=capturedAt,order=descending --field-config field-path=source,order=ascending');
  }
}

export const firestoreStore = new FirestoreStore();
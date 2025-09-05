export interface TrendSignal {
  id: string;
  topic: string;
  windowStart?: string | FirebaseFirestore.Timestamp | null;
  windowEnd?: string | FirebaseFirestore.Timestamp | null;
  sources: string[];
  sentimentLabel: 'positive' | 'neutral' | 'negative';
  volume?: number;
  score?: number;
}

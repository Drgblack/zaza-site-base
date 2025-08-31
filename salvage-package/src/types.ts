export interface SalvageOptions {
  verbose?: boolean;
  outputDir?: string;
  includeHidden?: boolean;
  includeDeleted?: boolean;
  maxDepth?: number;
  followSymlinks?: boolean;
  preserveTimestamps?: boolean;
}

export interface FileMetadata {
  path: string;
  size: number;
  createdAt: Date;
  modifiedAt: Date;
  accessedAt: Date;
  permissions: string;
  owner?: string;
  group?: string;
  mimeType?: string;
  hash?: string;
  isDeleted: boolean;
  isHidden: boolean;
  isDirectory: boolean;
  isSymlink: boolean;
}

export interface RecoveryResult {
  success: boolean;
  recoveredFiles: FileMetadata[];
  errors: string[];
  totalFiles: number;
  totalSize: number;
  duration: number;
}

export interface AnalysisResult {
  totalFiles: number;
  totalDirectories: number;
  totalSize: number;
  fileTypes: Record<string, number>;
  largestFiles: FileMetadata[];
  duplicateFiles: FileMetadata[][];
  suspiciousFiles: FileMetadata[];
  timeline: TimelineEntry[];
}

export interface TimelineEntry {
  timestamp: Date;
  event: 'created' | 'modified' | 'accessed' | 'deleted';
  file: FileMetadata;
}

export interface SearchOptions {
  pattern?: string;
  regex?: boolean;
  caseSensitive?: boolean;
  fileType?: string;
  minSize?: number;
  maxSize?: number;
  dateFrom?: Date;
  dateTo?: Date;
  content?: boolean;
}

export interface SearchResult {
  matches: FileMetadata[];
  totalMatches: number;
  searchTime: number;
  query: SearchOptions;
}

export interface ReportOptions {
  format: 'json' | 'csv' | 'html' | 'txt';
  outputFile?: string;
  includeContent?: boolean;
  includeHashes?: boolean;
  includeTimeline?: boolean;
}

export interface SalvageEvent {
  type: 'progress' | 'error' | 'warning' | 'info';
  message: string;
  data?: any;
  timestamp: Date;
}

export type EventCallback = (event: SalvageEvent) => void;
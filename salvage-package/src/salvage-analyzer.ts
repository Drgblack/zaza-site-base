import * as path from 'path';
import { 
  FileMetadata, 
  AnalysisResult, 
  TimelineEntry, 
  SalvageOptions 
} from './types';
import { SalvageCore } from './salvage-core';
import { CryptoUtils } from './utils/crypto-utils';

export class SalvageAnalyzer extends SalvageCore {
  private cryptoUtils: CryptoUtils;

  constructor(options: SalvageOptions = {}) {
    super(options);
    this.cryptoUtils = new CryptoUtils();
  }

  public async analyzeDirectory(dirPath: string): Promise<AnalysisResult> {
    this.emitEvent('info', `Starting analysis of directory: ${dirPath}`);
    
    const files = await this.scanDirectory(dirPath);
    return this.analyzeFiles(files);
  }

  public async analyzeFiles(files: FileMetadata[]): Promise<AnalysisResult> {
    const startTime = Date.now();
    
    const result: AnalysisResult = {
      totalFiles: 0,
      totalDirectories: 0,
      totalSize: 0,
      fileTypes: {},
      largestFiles: [],
      duplicateFiles: [],
      suspiciousFiles: [],
      timeline: [],
    };

    // Basic statistics
    for (const file of files) {
      if (file.isDirectory) {
        result.totalDirectories++;
      } else {
        result.totalFiles++;
        result.totalSize += file.size;

        // File type analysis
        const ext = path.extname(file.path).toLowerCase();
        const fileType = ext || 'no extension';
        result.fileTypes[fileType] = (result.fileTypes[fileType] || 0) + 1;
      }
    }

    // Find largest files
    const regularFiles = files.filter(f => !f.isDirectory);
    result.largestFiles = regularFiles
      .sort((a, b) => b.size - a.size)
      .slice(0, 10);

    // Find duplicate files
    result.duplicateFiles = await this.findDuplicateFiles(regularFiles);

    // Find suspicious files
    result.suspiciousFiles = this.findSuspiciousFiles(regularFiles);

    // Create timeline
    result.timeline = this.createTimeline(files);

    const duration = Date.now() - startTime;
    this.emitEvent('info', `Analysis completed in ${duration}ms`);

    return result;
  }

  private async findDuplicateFiles(files: FileMetadata[]): Promise<FileMetadata[][]> {
    this.emitEvent('info', 'Searching for duplicate files...');
    
    const hashGroups: Record<string, FileMetadata[]> = {};
    
    for (const file of files) {
      if (file.hash && file.size > 0) {
        if (!hashGroups[file.hash]) {
          hashGroups[file.hash] = [];
        }
        hashGroups[file.hash].push(file);
      }
    }

    return Object.values(hashGroups).filter(group => group.length > 1);
  }

  private findSuspiciousFiles(files: FileMetadata[]): FileMetadata[] {
    this.emitEvent('info', 'Identifying suspicious files...');
    
    const suspicious: FileMetadata[] = [];
    const suspiciousExtensions = [
      '.exe', '.bat', '.cmd', '.com', '.pif', '.scr',
      '.js', '.jse', '.vbs', '.vbe', '.ws', '.wsf',
      '.ps1', '.ps1xml', '.ps2', '.ps2xml', '.psc1', '.psc2',
      '.msh', '.msh1', '.msh2', '.mshxml', '.msh1xml', '.msh2xml'
    ];
    
    const suspiciousNames = [
      'password', 'passwd', 'secret', 'private', 'key',
      'config', 'settings', 'database', 'backup'
    ];

    for (const file of files) {
      const fileName = path.basename(file.path).toLowerCase();
      const ext = path.extname(fileName);
      
      // Check for suspicious extensions
      if (suspiciousExtensions.includes(ext)) {
        suspicious.push(file);
        continue;
      }

      // Check for suspicious filenames
      if (suspiciousNames.some(name => fileName.includes(name))) {
        suspicious.push(file);
        continue;
      }

      // Check for hidden files with unusual characteristics
      if (file.isHidden && file.size > 1024 * 1024) { // Hidden files > 1MB
        suspicious.push(file);
        continue;
      }

      // Check for files with unusual timestamps
      const now = new Date();
      const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      const oneYearFuture = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
      
      if (file.modifiedAt < oneYearAgo || file.modifiedAt > oneYearFuture) {
        suspicious.push(file);
      }
    }

    return suspicious;
  }

  private createTimeline(files: FileMetadata[]): TimelineEntry[] {
    this.emitEvent('info', 'Creating file timeline...');
    
    const timeline: TimelineEntry[] = [];

    for (const file of files) {
      // Add creation event
      timeline.push({
        timestamp: file.createdAt,
        event: 'created',
        file,
      });

      // Add modification event (if different from creation)
      if (file.modifiedAt.getTime() !== file.createdAt.getTime()) {
        timeline.push({
          timestamp: file.modifiedAt,
          event: 'modified',
          file,
        });
      }

      // Add access event (if different from modification)
      if (file.accessedAt.getTime() !== file.modifiedAt.getTime()) {
        timeline.push({
          timestamp: file.accessedAt,
          event: 'accessed',
          file,
        });
      }
    }

    // Sort by timestamp
    return timeline.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  }

  public async compareDirectories(dir1: string, dir2: string): Promise<{
    onlyInFirst: FileMetadata[];
    onlyInSecond: FileMetadata[];
    different: { file1: FileMetadata; file2: FileMetadata }[];
    identical: FileMetadata[];
  }> {
    this.emitEvent('info', `Comparing directories: ${dir1} vs ${dir2}`);
    
    const files1 = await this.scanDirectory(dir1);
    const files2 = await this.scanDirectory(dir2);

    const map1 = new Map(files1.map(f => [path.relative(dir1, f.path), f]));
    const map2 = new Map(files2.map(f => [path.relative(dir2, f.path), f]));

    const onlyInFirst: FileMetadata[] = [];
    const onlyInSecond: FileMetadata[] = [];
    const different: { file1: FileMetadata; file2: FileMetadata }[] = [];
    const identical: FileMetadata[] = [];

    // Check files in first directory
    for (const [relativePath, file1] of map1) {
      const file2 = map2.get(relativePath);
      
      if (!file2) {
        onlyInFirst.push(file1);
      } else if (file1.hash !== file2.hash || file1.size !== file2.size) {
        different.push({ file1, file2 });
      } else {
        identical.push(file1);
      }
    }

    // Check files only in second directory
    for (const [relativePath, file2] of map2) {
      if (!map1.has(relativePath)) {
        onlyInSecond.push(file2);
      }
    }

    return { onlyInFirst, onlyInSecond, different, identical };
  }

  private emitEvent(type: 'info' | 'progress' | 'error' | 'warning', message: string): void {
    this.emit(type, { type, message, timestamp: new Date() });
  }
}
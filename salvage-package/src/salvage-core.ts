import { EventEmitter } from 'events';
import * as path from 'path';
import { 
  SalvageOptions, 
  FileMetadata, 
  SalvageEvent, 
  EventCallback 
} from './types';
import { FileSystemUtils } from './utils/fs-utils';
import { CryptoUtils } from './utils/crypto-utils';
import { LoggerUtils } from './utils/logger-utils';

export class SalvageCore extends EventEmitter {
  private options: SalvageOptions;
  private logger: LoggerUtils;
  private fsUtils: FileSystemUtils;
  private cryptoUtils: CryptoUtils;

  constructor(options: SalvageOptions = {}) {
    super();
    this.options = {
      verbose: false,
      includeHidden: false,
      includeDeleted: false,
      maxDepth: -1,
      followSymlinks: false,
      preserveTimestamps: true,
      ...options,
    };

    this.logger = new LoggerUtils(this.options.verbose);
    this.fsUtils = new FileSystemUtils();
    this.cryptoUtils = new CryptoUtils();

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.on('progress', (event: SalvageEvent) => {
      this.logger.info(event.message);
    });

    this.on('error', (event: SalvageEvent) => {
      this.logger.error(event.message);
    });

    this.on('warning', (event: SalvageEvent) => {
      this.logger.warn(event.message);
    });
  }

  public async scanDirectory(dirPath: string): Promise<FileMetadata[]> {
    this.emitEvent('info', `Starting scan of directory: ${dirPath}`);
    
    const startTime = Date.now();
    const files: FileMetadata[] = [];

    try {
      await this.scanDirectoryRecursive(dirPath, files, 0);
      
      const duration = Date.now() - startTime;
      this.emitEvent('info', `Scan completed in ${duration}ms. Found ${files.length} items.`);
      
      return files;
    } catch (error) {
      this.emitEvent('error', `Failed to scan directory: ${error.message}`);
      throw error;
    }
  }

  private async scanDirectoryRecursive(
    dirPath: string,
    files: FileMetadata[],
    depth: number
  ): Promise<void> {
    if (this.options.maxDepth !== -1 && depth > this.options.maxDepth) {
      return;
    }

    try {
      const entries = await this.fsUtils.readDirectory(dirPath, {
        includeHidden: this.options.includeHidden,
        includeDeleted: this.options.includeDeleted,
      });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        
        try {
          const metadata = await this.getFileMetadata(fullPath);
          files.push(metadata);

          this.emitEvent('progress', `Scanned: ${fullPath}`);

          if (metadata.isDirectory && (!metadata.isSymlink || this.options.followSymlinks)) {
            await this.scanDirectoryRecursive(fullPath, files, depth + 1);
          }
        } catch (error) {
          this.emitEvent('warning', `Failed to process ${fullPath}: ${error.message}`);
        }
      }
    } catch (error) {
      this.emitEvent('error', `Failed to read directory ${dirPath}: ${error.message}`);
    }
  }

  public async getFileMetadata(filePath: string): Promise<FileMetadata> {
    const stats = await this.fsUtils.getFileStats(filePath);
    
    const metadata: FileMetadata = {
      path: filePath,
      size: stats.size,
      createdAt: stats.birthtime,
      modifiedAt: stats.mtime,
      accessedAt: stats.atime,
      permissions: this.fsUtils.getPermissionsString(stats.mode),
      owner: await this.fsUtils.getFileOwner(filePath),
      group: await this.fsUtils.getFileGroup(filePath),
      mimeType: await this.fsUtils.getMimeType(filePath),
      isDeleted: false, // TODO: Implement deleted file detection
      isHidden: this.fsUtils.isHidden(filePath),
      isDirectory: stats.isDirectory(),
      isSymlink: stats.isSymbolicLink(),
    };

    if (!metadata.isDirectory) {
      metadata.hash = await this.cryptoUtils.calculateFileHash(filePath);
    }

    return metadata;
  }

  public onEvent(callback: EventCallback): void {
    this.on('progress', callback);
    this.on('error', callback);
    this.on('warning', callback);
    this.on('info', callback);
  }

  private emitEvent(type: SalvageEvent['type'], message: string, data?: any): void {
    const event: SalvageEvent = {
      type,
      message,
      data,
      timestamp: new Date(),
    };
    
    this.emit(type, event);
  }

  public getOptions(): SalvageOptions {
    return { ...this.options };
  }

  public updateOptions(newOptions: Partial<SalvageOptions>): void {
    this.options = { ...this.options, ...newOptions };
    this.logger.setVerbose(this.options.verbose || false);
  }
}

import * as path from 'path';
import * as fs from 'fs/promises';
import { 
  FileMetadata, 
  RecoveryResult, 
  SalvageOptions 
} from './types';
import { SalvageCore } from './salvage-core';
import { FileSystemUtils } from './utils/fs-utils';
import { CompressionUtils } from './utils/compression-utils';

export class SalvageRecovery extends SalvageCore {
  private fsUtils: FileSystemUtils;
  private compressionUtils: CompressionUtils;

  constructor(options: SalvageOptions = {}) {
    super(options);
    this.fsUtils = new FileSystemUtils();
    this.compressionUtils = new CompressionUtils();
  }

  public async recoverDirectory(
    sourcePath: string, 
    outputPath: string
  ): Promise<RecoveryResult> {
    this.emitEvent('info', `Starting recovery from ${sourcePath} to ${outputPath}`);
    
    const startTime = Date.now();
    const result: RecoveryResult = {
      success: false,
      recoveredFiles: [],
      errors: [],
      totalFiles: 0,
      totalSize: 0,
      duration: 0,
    };

    try {
      // Ensure output directory exists
      await this.fsUtils.ensureDirectory(outputPath);

      // Scan source directory
      const files = await this.scanDirectory(sourcePath);
      result.totalFiles = files.length;

      // Recover each file
      for (const file of files) {
        try {
          const success = await this.recoverFile(file, sourcePath, outputPath);
          if (success) {
            result.recoveredFiles.push(file);
            result.totalSize += file.size;
          }
        } catch (error) {
          const errorMsg = `Failed to recover ${file.path}: ${error.message}`;
          result.errors.push(errorMsg);
          this.emitEvent('warning', errorMsg);
        }
      }

      result.success = result.errors.length === 0;
      result.duration = Date.now() - startTime;

      this.emitEvent('info', 
        `Recovery completed. ${result.recoveredFiles.length}/${result.totalFiles} files recovered`
      );

      return result;
    } catch (error) {
      result.errors.push(error.message);
      result.duration = Date.now() - startTime;
      this.emitEvent('error', `Recovery failed: ${error.message}`);
      return result;
    }
  }

  private async recoverFile(
    file: FileMetadata,
    sourcePath: string,
    outputPath: string
  ): Promise<boolean> {
    const relativePath = path.relative(sourcePath, file.path);
    const targetPath = path.join(outputPath, relativePath);

    this.emitEvent('progress', `Recovering: ${relativePath}`);

    if (file.isDirectory) {
      await this.fsUtils.ensureDirectory(targetPath);
      return true;
    }

    try {
      // Ensure target directory exists
      const targetDir = path.dirname(targetPath);
      await this.fsUtils.ensureDirectory(targetDir);

      // Copy file
      await this.copyFileWithVerification(file.path, targetPath);

      // Preserve timestamps if requested
      if (this.getOptions().preserveTimestamps) {
        await this.fsUtils.setFileTimes(targetPath, file.accessedAt, file.modifiedAt);
      }

      return true;
    } catch (error) {
      throw new Error(`Recovery failed for ${file.path}: ${error.message}`);
    }
  }

  private async copyFileWithVerification(sourcePath: string, targetPath: string): Promise<void> {
    const originalHash = await this.cryptoUtils.calculateFileHash(sourcePath);
    
    await fs.copyFile(sourcePath, targetPath);
    
    const copiedHash = await this.cryptoUtils.calculateFileHash(targetPath);
    
    if (originalHash !== copiedHash) {
      throw new Error('File verification failed - hash mismatch after copy');
    }
  }

  public async recoverDeletedFiles(
    sourcePath: string,
    outputPath: string
  ): Promise<RecoveryResult> {
    this.emitEvent('info', 'Starting deleted file recovery...');
    
    const startTime = Date.now();
    const result: RecoveryResult = {
      success: false,
      recoveredFiles: [],
      errors: [],
      totalFiles: 0,
      totalSize: 0,
      duration: 0,
    };

    try {
      // Scan for deleted files (placeholder implementation)
      const deletedFiles = await this.scanForDeletedFiles(sourcePath);
      result.totalFiles = deletedFiles.length;

      for (const file of deletedFiles) {
        try {
          const success = await this.recoverDeletedFile(file, outputPath);
          if (success) {
            result.recoveredFiles.push(file);
            result.totalSize += file.size;
          }
        } catch (error) {
          const errorMsg = `Failed to recover deleted file: ${error.message}`;
          result.errors.push(errorMsg);
          this.emitEvent('warning', errorMsg);
        }
      }

      result.success = result.errors.length === 0;
      result.duration = Date.now() - startTime;

      return result;
    } catch (error) {
      result.errors.push(error.message);
      result.duration = Date.now() - startTime;
      return result;
    }
  }

  private async scanForDeletedFiles(_sourcePath: string): Promise<FileMetadata[]> {
    // Placeholder implementation for deleted file detection
    // In a real implementation, this would involve:
    // - Reading filesystem metadata
    // - Analyzing unallocated disk space
    // - Using filesystem-specific recovery techniques
    this.emitEvent('warning', 'Deleted file detection not fully implemented');
    return [];
  }

  private async recoverDeletedFile(_file: FileMetadata, _outputPath: string): Promise<boolean> {
    // Placeholder implementation for deleted file recovery
    this.emitEvent('warning', 'Deleted file recovery not fully implemented');
    return false;
  }

  public async createBackup(
    sourcePath: string,
    outputPath: string,
    compress: boolean = true
  ): Promise<RecoveryResult> {
    this.emitEvent('info', `Creating backup from ${sourcePath} to ${outputPath}`);
    
    if (compress) {
      return this.createCompressedBackup(sourcePath, outputPath);
    } else {
      return this.recoverDirectory(sourcePath, outputPath);
    }
  }

  private async createCompressedBackup(
    sourcePath: string,
    outputPath: string
  ): Promise<RecoveryResult> {
    const startTime = Date.now();
    const result: RecoveryResult = {
      success: false,
      recoveredFiles: [],
      errors: [],
      totalFiles: 0,
      totalSize: 0,
      duration: 0,
    };

    try {
      const files = await this.scanDirectory(sourcePath);
      result.totalFiles = files.length;

      // Create compressed archive
      const archivePath = path.join(outputPath, `backup-${Date.now()}.zip`);
      await this.fsUtils.ensureDirectory(outputPath);

      const filePaths = files
        .filter(f => !f.isDirectory)
        .map(f => f.path);

      await this.compressionUtils.compressFiles(filePaths, archivePath, sourcePath);

      // Verify archive
      const archiveFiles = await this.compressionUtils.listArchiveContents(archivePath);
      
      result.recoveredFiles = files.filter(f => 
        archiveFiles.some(af => af.endsWith(path.relative(sourcePath, f.path)))
      );
      
      result.totalSize = (await fs.stat(archivePath)).size;
      result.success = true;
      result.duration = Date.now() - startTime;

      this.emitEvent('info', `Compressed backup created: ${archivePath}`);

      return result;
    } catch (error) {
      result.errors.push(error.message);
      result.duration = Date.now() - startTime;
      this.emitEvent('error', `Backup failed: ${error.message}`);
      return result;
    }
  }

  private emitEvent(type: 'info' | 'progress' | 'error' | 'warning', message: string): void {
    this.emit(type, { type, message, timestamp: new Date() });
  }
}

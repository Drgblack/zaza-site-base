import * as fs from 'fs/promises';
import * as path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import * as zlib from 'zlib';

export interface CompressionOptions {
  level?: number; // 0-9, where 9 is highest compression
  chunkSize?: number;
  preservePaths?: boolean;
}

export interface ArchiveEntry {
  name: string;
  path: string;
  size: number;
  compressedSize: number;
  isDirectory: boolean;
}

export class CompressionUtils {
  public async compressFile(
    inputPath: string,
    outputPath: string,
    options: CompressionOptions = {}
  ): Promise<void> {
    const { level = 6, chunkSize = 16384 } = options;

    try {
      const readStream = createReadStream(inputPath, { highWaterMark: chunkSize });
      const writeStream = createWriteStream(outputPath);
      const gzipStream = zlib.createGzip({ level, chunkSize });

      await pipeline(readStream, gzipStream, writeStream);
    } catch (error) {
      throw new Error(`Failed to compress file ${inputPath}: ${error.message}`);
    }
  }

  public async decompressFile(
    inputPath: string,
    outputPath: string,
    options: CompressionOptions = {}
  ): Promise<void> {
    const { chunkSize = 16384 } = options;

    try {
      const readStream = createReadStream(inputPath, { highWaterMark: chunkSize });
      const writeStream = createWriteStream(outputPath);
      const gunzipStream = zlib.createGunzip({ chunkSize });

      await pipeline(readStream, gunzipStream, writeStream);
    } catch (error) {
      throw new Error(`Failed to decompress file ${inputPath}: ${error.message}`);
    }
  }

  public async compressBuffer(
    buffer: Buffer,
    options: CompressionOptions = {}
  ): Promise<Buffer> {
    const { level = 6 } = options;

    try {
      return await new Promise((resolve, reject) => {
        zlib.gzip(buffer, { level }, (error, result) => {
          if (error) {
            reject(new Error(`Failed to compress buffer: ${error.message}`));
          } else {
            resolve(result);
          }
        });
      });
    } catch (error) {
      throw new Error(`Buffer compression failed: ${error.message}`);
    }
  }

  public async decompressBuffer(buffer: Buffer): Promise<Buffer> {
    try {
      return await new Promise((resolve, reject) => {
        zlib.gunzip(buffer, (error, result) => {
          if (error) {
            reject(new Error(`Failed to decompress buffer: ${error.message}`));
          } else {
            resolve(result);
          }
        });
      });
    } catch (error) {
      throw new Error(`Buffer decompression failed: ${error.message}`);
    }
  }

  public async compressFiles(
    filePaths: string[],
    outputArchive: string,
    baseDir?: string,
    options: CompressionOptions = {}
  ): Promise<void> {
    // This is a simplified implementation using gzip
    // In a production environment, you might want to use a proper archive library like tar or zip
    
    const { level = 6 } = options;
    
    try {
      // Create a simple archive format: JSON metadata + compressed data
      const archive: { files: any[], data: Buffer[] } = { files: [], data: [] };

      for (const filePath of filePaths) {
        try {
          const stats = await fs.stat(filePath);
          if (stats.isFile()) {
            const fileData = await fs.readFile(filePath);
            const compressedData = await this.compressBuffer(fileData, { level });
            
            const relativePath = baseDir ? path.relative(baseDir, filePath) : filePath;
            
            archive.files.push({
              path: relativePath,
              originalSize: stats.size,
              compressedSize: compressedData.length,
              modified: stats.mtime.toISOString(),
            });
            
            archive.data.push(compressedData);
          }
        } catch (error) {
          console.warn(`Skipping file ${filePath}: ${error.message}`);
        }
      }

      // Write archive
      const archiveJson = JSON.stringify(archive.files, null, 2);
      const archiveData = Buffer.concat([
        Buffer.from(archiveJson.length.toString().padStart(8, '0')),
        Buffer.from(archiveJson),
        ...archive.data
      ]);

      const compressedArchive = await this.compressBuffer(archiveData, { level });
      await fs.writeFile(outputArchive, compressedArchive);
    } catch (error) {
      throw new Error(`Failed to create archive ${outputArchive}: ${error.message}`);
    }
  }

  public async extractArchive(
    archivePath: string,
    outputDir: string,
    options: CompressionOptions = {}
  ): Promise<ArchiveEntry[]> {
    try {
      // Read and decompress archive
      const compressedData = await fs.readFile(archivePath);
      const archiveData = await this.decompressBuffer(compressedData);

      // Parse archive structure
      const metadataLengthStr = archiveData.slice(0, 8).toString();
      const metadataLength = parseInt(metadataLengthStr, 10);
      
      const metadataBuffer = archiveData.slice(8, 8 + metadataLength);
      const files = JSON.parse(metadataBuffer.toString());
      
      let dataOffset = 8 + metadataLength;
      const extractedFiles: ArchiveEntry[] = [];

      // Ensure output directory exists
      await fs.mkdir(outputDir, { recursive: true });

      for (const fileInfo of files) {
        const compressedFileData = archiveData.slice(
          dataOffset,
          dataOffset + fileInfo.compressedSize
        );
        
        const decompressedData = await this.decompressBuffer(compressedFileData);
        
        const outputPath = path.join(outputDir, fileInfo.path);
        const outputFileDir = path.dirname(outputPath);
        
        // Ensure file directory exists
        await fs.mkdir(outputFileDir, { recursive: true });
        
        // Write file
        await fs.writeFile(outputPath, decompressedData);
        
        // Restore file timestamp if available
        if (fileInfo.modified) {
          const modifiedDate = new Date(fileInfo.modified);
          await fs.utimes(outputPath, modifiedDate, modifiedDate);
        }

        extractedFiles.push({
          name: path.basename(fileInfo.path),
          path: fileInfo.path,
          size: fileInfo.originalSize,
          compressedSize: fileInfo.compressedSize,
          isDirectory: false,
        });

        dataOffset += fileInfo.compressedSize;
      }

      return extractedFiles;
    } catch (error) {
      throw new Error(`Failed to extract archive ${archivePath}: ${error.message}`);
    }
  }

  public async listArchiveContents(archivePath: string): Promise<string[]> {
    try {
      const compressedData = await fs.readFile(archivePath);
      const archiveData = await this.decompressBuffer(compressedData);

      const metadataLengthStr = archiveData.slice(0, 8).toString();
      const metadataLength = parseInt(metadataLengthStr, 10);
      
      const metadataBuffer = archiveData.slice(8, 8 + metadataLength);
      const files = JSON.parse(metadataBuffer.toString());

      return files.map((file: any) => file.path);
    } catch (error) {
      throw new Error(`Failed to list archive contents: ${error.message}`);
    }
  }

  public async getCompressionRatio(
    inputPath: string,
    outputPath?: string
  ): Promise<number> {
    try {
      const inputStats = await fs.stat(inputPath);
      const inputSize = inputStats.size;

      let outputSize: number;

      if (outputPath) {
        const outputStats = await fs.stat(outputPath);
        outputSize = outputStats.size;
      } else {
        // Compress in memory to calculate ratio
        const inputData = await fs.readFile(inputPath);
        const compressedData = await this.compressBuffer(inputData);
        outputSize = compressedData.length;
      }

      return inputSize > 0 ? (outputSize / inputSize) : 1;
    } catch (error) {
      throw new Error(`Failed to calculate compression ratio: ${error.message}`);
    }
  }

  public async compressDirectory(
    dirPath: string,
    outputArchive: string,
    options: CompressionOptions = {}
  ): Promise<void> {
    try {
      const files: string[] = [];
      
      async function collectFiles(currentDir: string): Promise<void> {
        const entries = await fs.readdir(currentDir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(currentDir, entry.name);
          
          if (entry.isDirectory()) {
            await collectFiles(fullPath);
          } else if (entry.isFile()) {
            files.push(fullPath);
          }
        }
      }

      await collectFiles(dirPath);
      await this.compressFiles(files, outputArchive, dirPath, options);
    } catch (error) {
      throw new Error(`Failed to compress directory ${dirPath}: ${error.message}`);
    }
  }

  public async isCompressed(filePath: string): Promise<boolean> {
    try {
      const data = await fs.readFile(filePath);
      
      // Check for common compression magic numbers
      const magicNumbers = [
        [0x1f, 0x8b], // gzip
        [0x42, 0x5a], // bzip2
        [0x50, 0x4b], // zip
        [0x52, 0x61], // rar
        [0x37, 0x7a], // 7zip
      ];

      for (const magic of magicNumbers) {
        if (data.length >= magic.length) {
          const match = magic.every((byte, index) => data[index] === byte);
          if (match) return true;
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  public async getOptimalCompressionLevel(
    inputPath: string,
    testLevels: number[] = [1, 6, 9]
  ): Promise<{ level: number; ratio: number; time: number }> {
    const results: Array<{ level: number; ratio: number; time: number }> = [];

    for (const level of testLevels) {
      const startTime = Date.now();
      
      try {
        const inputData = await fs.readFile(inputPath);
        const compressedData = await this.compressBuffer(inputData, { level });
        
        const time = Date.now() - startTime;
        const ratio = compressedData.length / inputData.length;
        
        results.push({ level, ratio, time });
      } catch (error) {
        console.warn(`Failed to test compression level ${level}: ${error.message}`);
      }
    }

    if (results.length === 0) {
      throw new Error('No compression levels could be tested');
    }

    // Find the best balance of compression ratio and time
    // This prioritizes compression ratio but considers time
    return results.reduce((best, current) => {
      const bestScore = best.ratio + (best.time / 10000); // Weight time less than ratio
      const currentScore = current.ratio + (current.time / 10000);
      return currentScore < bestScore ? current : best;
    });
  }
}

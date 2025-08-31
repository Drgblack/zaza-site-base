import * as crypto from 'crypto';
import * as fs from 'fs';
import { createReadStream } from 'fs';

export type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha512';

export class CryptoUtils {
  private defaultAlgorithm: HashAlgorithm = 'sha256';

  public setDefaultAlgorithm(algorithm: HashAlgorithm): void {
    this.defaultAlgorithm = algorithm;
  }

  public async calculateFileHash(
    filePath: string, 
    algorithm: HashAlgorithm = this.defaultAlgorithm
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash(algorithm);
      const stream = createReadStream(filePath);

      stream.on('error', (error) => {
        reject(new Error(`Failed to read file for hashing: ${error.message}`));
      });

      stream.on('data', (data) => {
        hash.update(data);
      });

      stream.on('end', () => {
        resolve(hash.digest('hex'));
      });
    });
  }

  public async calculateBufferHash(
    buffer: Buffer, 
    algorithm: HashAlgorithm = this.defaultAlgorithm
  ): Promise<string> {
    const hash = crypto.createHash(algorithm);
    hash.update(buffer);
    return hash.digest('hex');
  }

  public async calculateStringHash(
    text: string, 
    algorithm: HashAlgorithm = this.defaultAlgorithm,
    encoding: BufferEncoding = 'utf8'
  ): Promise<string> {
    const hash = crypto.createHash(algorithm);
    hash.update(text, encoding);
    return hash.digest('hex');
  }

  public async compareFileHashes(
    filePath1: string, 
    filePath2: string, 
    algorithm: HashAlgorithm = this.defaultAlgorithm
  ): Promise<boolean> {
    try {
      const [hash1, hash2] = await Promise.all([
        this.calculateFileHash(filePath1, algorithm),
        this.calculateFileHash(filePath2, algorithm)
      ]);
      
      return hash1 === hash2;
    } catch (error) {
      throw new Error(`Failed to compare file hashes: ${error.message}`);
    }
  }

  public async verifyFileIntegrity(
    filePath: string, 
    expectedHash: string, 
    algorithm: HashAlgorithm = this.defaultAlgorithm
  ): Promise<boolean> {
    try {
      const actualHash = await this.calculateFileHash(filePath, algorithm);
      return actualHash.toLowerCase() === expectedHash.toLowerCase();
    } catch (error) {
      throw new Error(`Failed to verify file integrity: ${error.message}`);
    }
  }

  public generateRandomHash(
    length: number = 32, 
    algorithm: HashAlgorithm = this.defaultAlgorithm
  ): string {
    const randomBytes = crypto.randomBytes(length);
    const hash = crypto.createHash(algorithm);
    hash.update(randomBytes);
    return hash.digest('hex');
  }

  public async calculateDirectoryHash(
    dirPath: string,
    algorithm: HashAlgorithm = this.defaultAlgorithm
  ): Promise<string> {
    const fs = require('fs').promises;
    const path = require('path');
    
    async function getFileHashes(dir: string): Promise<string[]> {
      const hashes: string[] = [];
      const entries = await fs.readdir(dir, { withFileTypes: true });

      // Sort entries for consistent ordering
      entries.sort((a: any, b: any) => a.name.localeCompare(b.name));

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          const subHashes = await getFileHashes(fullPath);
          hashes.push(...subHashes);
        } else if (entry.isFile()) {
          try {
            const fileHash = await this.calculateFileHash(fullPath, algorithm);
            hashes.push(`${entry.name}:${fileHash}`);
          } catch (error) {
            // Skip files that can't be read
            console.warn(`Skipping file ${fullPath}: ${error.message}`);
          }
        }
      }

      return hashes;
    }

    try {
      const allHashes = await getFileHashes(dirPath);
      const combinedHash = allHashes.join('|');
      return await this.calculateStringHash(combinedHash, algorithm);
    } catch (error) {
      throw new Error(`Failed to calculate directory hash: ${error.message}`);
    }
  }

  public createHashStream(algorithm: HashAlgorithm = this.defaultAlgorithm): crypto.Hash {
    return crypto.createHash(algorithm);
  }

  public async hashLargeFile(
    filePath: string, 
    algorithm: HashAlgorithm = this.defaultAlgorithm,
    chunkSize: number = 64 * 1024 // 64KB chunks
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash(algorithm);
      const stream = createReadStream(filePath, { highWaterMark: chunkSize });

      let totalBytes = 0;

      stream.on('error', (error) => {
        reject(new Error(`Failed to read large file for hashing: ${error.message}`));
      });

      stream.on('data', (chunk) => {
        totalBytes += chunk.length;
        hash.update(chunk);
      });

      stream.on('end', () => {
        const finalHash = hash.digest('hex');
        resolve(finalHash);
      });
    });
  }

  public async createFileChecksum(
    filePath: string,
    algorithms: HashAlgorithm[] = ['md5', 'sha1', 'sha256']
  ): Promise<Record<string, string>> {
    const checksums: Record<string, string> = {};
    
    for (const algorithm of algorithms) {
      try {
        checksums[algorithm] = await this.calculateFileHash(filePath, algorithm);
      } catch (error) {
        throw new Error(`Failed to create ${algorithm} checksum: ${error.message}`);
      }
    }

    return checksums;
  }

  public getSupportedAlgorithms(): HashAlgorithm[] {
    return ['md5', 'sha1', 'sha256', 'sha512'];
  }

  public validateAlgorithm(algorithm: string): algorithm is HashAlgorithm {
    return this.getSupportedAlgorithms().includes(algorithm as HashAlgorithm);
  }

  public async createManifest(
    filePaths: string[],
    algorithm: HashAlgorithm = this.defaultAlgorithm
  ): Promise<Record<string, string>> {
    const manifest: Record<string, string> = {};

    for (const filePath of filePaths) {
      try {
        const hash = await this.calculateFileHash(filePath, algorithm);
        manifest[filePath] = hash;
      } catch (error) {
        throw new Error(`Failed to create manifest for ${filePath}: ${error.message}`);
      }
    }

    return manifest;
  }

  public async verifyManifest(
    manifest: Record<string, string>,
    algorithm: HashAlgorithm = this.defaultAlgorithm
  ): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];

    for (const [filePath, expectedHash] of Object.entries(manifest)) {
      try {
        const isValid = await this.verifyFileIntegrity(filePath, expectedHash, algorithm);
        if (!isValid) {
          errors.push(`Hash mismatch for file: ${filePath}`);
        }
      } catch (error) {
        errors.push(`Failed to verify ${filePath}: ${error.message}`);
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
import * as fs from 'fs/promises';
import * as path from 'path';
import { constants } from 'fs';

export interface DirectoryEntry {
  name: string;
  isDirectory: boolean;
  isSymlink: boolean;
  size: number;
}

export interface ReadDirectoryOptions {
  includeHidden?: boolean;
  includeDeleted?: boolean;
}

export class FileSystemUtils {
  public async readDirectory(
    dirPath: string, 
    options: ReadDirectoryOptions = {}
  ): Promise<DirectoryEntry[]> {
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      const result: DirectoryEntry[] = [];

      for (const entry of entries) {
        // Skip hidden files if not requested
        if (!options.includeHidden && entry.name.startsWith('.')) {
          continue;
        }

        try {
          const fullPath = path.join(dirPath, entry.name);
          const stats = await fs.stat(fullPath);

          result.push({
            name: entry.name,
            isDirectory: entry.isDirectory(),
            isSymlink: entry.isSymbolicLink(),
            size: stats.size,
          });
        } catch (error) {
          // File might have been deleted or inaccessible
          if (options.includeDeleted) {
            result.push({
              name: entry.name,
              isDirectory: entry.isDirectory(),
              isSymlink: entry.isSymbolicLink(),
              size: 0,
            });
          }
        }
      }

      return result;
    } catch (error) {
      throw new Error(`Failed to read directory ${dirPath}: ${error.message}`);
    }
  }

  public async getFileStats(filePath: string): Promise<fs.Stats> {
    try {
      return await fs.stat(filePath);
    } catch (error) {
      throw new Error(`Failed to get file stats for ${filePath}: ${error.message}`);
    }
  }

  public async ensureDirectory(dirPath: string): Promise<void> {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      throw new Error(`Failed to create directory ${dirPath}: ${error.message}`);
    }
  }

  public async fileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath, constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }

  public async isReadable(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath, constants.R_OK);
      return true;
    } catch {
      return false;
    }
  }

  public async isWritable(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath, constants.W_OK);
      return true;
    } catch {
      return false;
    }
  }

  public getPermissionsString(mode: number): string {
    const permissions = [];
    
    // Owner permissions
    permissions.push(mode & 0o400 ? 'r' : '-');
    permissions.push(mode & 0o200 ? 'w' : '-');
    permissions.push(mode & 0o100 ? 'x' : '-');
    
    // Group permissions
    permissions.push(mode & 0o040 ? 'r' : '-');
    permissions.push(mode & 0o020 ? 'w' : '-');
    permissions.push(mode & 0o010 ? 'x' : '-');
    
    // Other permissions
    permissions.push(mode & 0o004 ? 'r' : '-');
    permissions.push(mode & 0o002 ? 'w' : '-');
    permissions.push(mode & 0o001 ? 'x' : '-');

    return permissions.join('');
  }

  public async getFileOwner(filePath: string): Promise<string | undefined> {
    try {
      const stats = await fs.stat(filePath);
      return stats.uid?.toString();
    } catch {
      return undefined;
    }
  }

  public async getFileGroup(filePath: string): Promise<string | undefined> {
    try {
      const stats = await fs.stat(filePath);
      return stats.gid?.toString();
    } catch {
      return undefined;
    }
  }

  public async getMimeType(filePath: string): Promise<string | undefined> {
    const ext = path.extname(filePath).toLowerCase();
    
    // Basic MIME type mapping
    const mimeTypes: Record<string, string> = {
      '.txt': 'text/plain',
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
      '.json': 'application/json',
      '.xml': 'application/xml',
      '.pdf': 'application/pdf',
      '.doc': 'application/msword',
      '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.xls': 'application/vnd.ms-excel',
      '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.ppt': 'application/vnd.ms-powerpoint',
      '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      '.zip': 'application/zip',
      '.rar': 'application/vnd.rar',
      '.7z': 'application/x-7z-compressed',
      '.tar': 'application/x-tar',
      '.gz': 'application/gzip',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.bmp': 'image/bmp',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp',
      '.mp4': 'video/mp4',
      '.avi': 'video/x-msvideo',
      '.mkv': 'video/x-matroska',
      '.mov': 'video/quicktime',
      '.mp3': 'audio/mpeg',
      '.wav': 'audio/wav',
      '.flac': 'audio/flac',
      '.ogg': 'audio/ogg',
    };

    return mimeTypes[ext];
  }

  public isHidden(filePath: string): boolean {
    const basename = path.basename(filePath);
    
    // Unix-style hidden files (start with .)
    if (basename.startsWith('.')) {
      return true;
    }

    // Windows hidden files would require additional system calls
    // This is a simplified implementation
    return false;
  }

  public async readFileAsText(filePath: string, encoding: BufferEncoding = 'utf8'): Promise<string> {
    try {
      return await fs.readFile(filePath, encoding);
    } catch (error) {
      throw new Error(`Failed to read file ${filePath}: ${error.message}`);
    }
  }

  public async readFileAsBuffer(filePath: string): Promise<Buffer> {
    try {
      return await fs.readFile(filePath);
    } catch (error) {
      throw new Error(`Failed to read file ${filePath}: ${error.message}`);
    }
  }

  public async setFileTimes(filePath: string, accessTime: Date, modifyTime: Date): Promise<void> {
    try {
      await fs.utimes(filePath, accessTime, modifyTime);
    } catch (error) {
      throw new Error(`Failed to set file times for ${filePath}: ${error.message}`);
    }
  }

  public async getDirectorySize(dirPath: string): Promise<number> {
    let totalSize = 0;

    try {
      const entries = await this.readDirectory(dirPath, { includeHidden: true });

      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory && !entry.isSymlink) {
          totalSize += await this.getDirectorySize(fullPath);
        } else {
          totalSize += entry.size;
        }
      }

      return totalSize;
    } catch (error) {
      throw new Error(`Failed to calculate directory size for ${dirPath}: ${error.message}`);
    }
  }

  public async copyFile(sourcePath: string, targetPath: string): Promise<void> {
    try {
      await fs.copyFile(sourcePath, targetPath);
    } catch (error) {
      throw new Error(`Failed to copy file from ${sourcePath} to ${targetPath}: ${error.message}`);
    }
  }

  public async moveFile(sourcePath: string, targetPath: string): Promise<void> {
    try {
      await fs.rename(sourcePath, targetPath);
    } catch (error) {
      throw new Error(`Failed to move file from ${sourcePath} to ${targetPath}: ${error.message}`);
    }
  }

  public async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      throw new Error(`Failed to delete file ${filePath}: ${error.message}`);
    }
  }

  public async deleteDirectory(dirPath: string, recursive: boolean = false): Promise<void> {
    try {
      if (recursive) {
        await fs.rmdir(dirPath, { recursive: true });
      } else {
        await fs.rmdir(dirPath);
      }
    } catch (error) {
      throw new Error(`Failed to delete directory ${dirPath}: ${error.message}`);
    }
  }

  public sanitizeFilename(filename: string): string {
    // Remove or replace invalid characters for cross-platform compatibility
    return filename
      .replace(/[<>:"\/\\|?*\x00-\x1f]/g, '_')
      .replace(/^\.+/, '')
      .substring(0, 255);
  }

  public normalizePath(filePath: string): string {
    return path.normalize(filePath);
  }

  public resolvePath(filePath: string): string {
    return path.resolve(filePath);
  }

  public getRelativePath(from: string, to: string): string {
    return path.relative(from, to);
  }
}

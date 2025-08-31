import * as path from 'path';
import { 
  FileMetadata, 
  SearchOptions, 
  SearchResult, 
  SalvageOptions 
} from './types';
import { SalvageCore } from './salvage-core';
import { FileSystemUtils } from './utils/fs-utils';

export class SalvageSearch extends SalvageCore {
  private fsUtils: FileSystemUtils;

  constructor(options: SalvageOptions = {}) {
    super(options);
    this.fsUtils = new FileSystemUtils();
  }

  public async search(
    searchPath: string,
    searchOptions: SearchOptions
  ): Promise<SearchResult> {
    this.emitEvent('info', `Starting search in: ${searchPath}`);
    
    const startTime = Date.now();
    const files = await this.scanDirectory(searchPath);
    
    let matches: FileMetadata[] = [];

    // Apply file pattern filter
    if (searchOptions.pattern) {
      matches = this.filterByPattern(files, searchOptions.pattern, searchOptions);
    } else {
      matches = files;
    }

    // Apply size filters
    if (searchOptions.minSize !== undefined || searchOptions.maxSize !== undefined) {
      matches = this.filterBySize(matches, searchOptions);
    }

    // Apply date filters
    if (searchOptions.dateFrom || searchOptions.dateTo) {
      matches = this.filterByDate(matches, searchOptions);
    }

    // Apply file type filter
    if (searchOptions.fileType) {
      matches = this.filterByFileType(matches, searchOptions.fileType);
    }

    // Search content if requested
    if (searchOptions.content && searchOptions.pattern) {
      matches = await this.filterByContent(matches, searchOptions.pattern, searchOptions);
    }

    const searchTime = Date.now() - startTime;
    
    this.emitEvent('info', `Search completed. Found ${matches.length} matches in ${searchTime}ms`);

    return {
      matches,
      totalMatches: matches.length,
      searchTime,
      query: searchOptions,
    };
  }

  private filterByPattern(
    files: FileMetadata[],
    pattern: string,
    options: SearchOptions
  ): FileMetadata[] {
    const isRegex = options.regex || false;
    const caseSensitive = options.caseSensitive || false;
    
    let matcher: (filename: string) => boolean;

    if (isRegex) {
      const flags = caseSensitive ? 'g' : 'gi';
      const regex = new RegExp(pattern, flags);
      matcher = (filename: string) => regex.test(filename);
    } else {
      const normalizedPattern = caseSensitive ? pattern : pattern.toLowerCase();
      matcher = (filename: string) => {
        const normalizedFilename = caseSensitive ? filename : filename.toLowerCase();
        return normalizedFilename.includes(normalizedPattern);
      };
    }

    return files.filter(file => {
      const filename = path.basename(file.path);
      return matcher(filename);
    });
  }

  private filterBySize(files: FileMetadata[], options: SearchOptions): FileMetadata[] {
    return files.filter(file => {
      if (options.minSize !== undefined && file.size < options.minSize) {
        return false;
      }
      if (options.maxSize !== undefined && file.size > options.maxSize) {
        return false;
      }
      return true;
    });
  }

  private filterByDate(files: FileMetadata[], options: SearchOptions): FileMetadata[] {
    return files.filter(file => {
      if (options.dateFrom && file.modifiedAt < options.dateFrom) {
        return false;
      }
      if (options.dateTo && file.modifiedAt > options.dateTo) {
        return false;
      }
      return true;
    });
  }

  private filterByFileType(files: FileMetadata[], fileType: string): FileMetadata[] {
    const normalizedType = fileType.toLowerCase();
    
    return files.filter(file => {
      if (file.isDirectory) {
        return normalizedType === 'directory' || normalizedType === 'folder';
      }

      const ext = path.extname(file.path).toLowerCase().substring(1);
      const mimeType = file.mimeType?.toLowerCase() || '';

      return ext === normalizedType || 
             mimeType.includes(normalizedType) ||
             this.matchesFileTypeCategory(ext, mimeType, normalizedType);
    });
  }

  private matchesFileTypeCategory(ext: string, mimeType: string, category: string): boolean {
    const categories: Record<string, string[]> = {
      image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg', 'webp'],
      video: ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'],
      audio: ['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma'],
      document: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'],
      archive: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'],
      code: ['js', 'ts', 'py', 'java', 'cpp', 'c', 'h', 'cs', 'php', 'rb'],
      executable: ['exe', 'msi', 'app', 'deb', 'rpm'],
    };

    const typeExtensions = categories[category];
    if (typeExtensions) {
      return typeExtensions.includes(ext);
    }

    // Also check MIME type categories
    if (category === 'image') return mimeType.startsWith('image/');
    if (category === 'video') return mimeType.startsWith('video/');
    if (category === 'audio') return mimeType.startsWith('audio/');
    if (category === 'text') return mimeType.startsWith('text/');

    return false;
  }

  private async filterByContent(
    files: FileMetadata[],
    pattern: string,
    options: SearchOptions
  ): Promise<FileMetadata[]> {
    this.emitEvent('info', 'Searching file contents...');
    
    const matches: FileMetadata[] = [];
    const textFiles = files.filter(file => 
      !file.isDirectory && 
      file.size > 0 && 
      file.size < 10 * 1024 * 1024 && // Limit to files < 10MB
      this.isTextFile(file)
    );

    for (const file of textFiles) {
      try {
        this.emitEvent('progress', `Searching content: ${file.path}`);
        
        const hasMatch = await this.searchFileContent(file.path, pattern, options);
        if (hasMatch) {
          matches.push(file);
        }
      } catch (error) {
        this.emitEvent('warning', `Failed to search content in ${file.path}: ${error.message}`);
      }
    }

    return matches;
  }

  private isTextFile(file: FileMetadata): boolean {
    const textExtensions = [
      '.txt', '.md', '.json', '.xml', '.html', '.css', '.js', '.ts',
      '.py', '.java', '.cpp', '.c', '.h', '.cs', '.php', '.rb',
      '.yml', '.yaml', '.ini', '.conf', '.log', '.csv'
    ];

    const ext = path.extname(file.path).toLowerCase();
    return textExtensions.includes(ext) || 
           (file.mimeType && file.mimeType.startsWith('text/'));
  }

  private async searchFileContent(
    filePath: string,
    pattern: string,
    options: SearchOptions
  ): Promise<boolean> {
    try {
      const content = await this.fsUtils.readFileAsText(filePath);
      
      if (options.regex) {
        const flags = options.caseSensitive ? 'g' : 'gi';
        const regex = new RegExp(pattern, flags);
        return regex.test(content);
      } else {
        const searchText = options.caseSensitive ? content : content.toLowerCase();
        const searchPattern = options.caseSensitive ? pattern : pattern.toLowerCase();
        return searchText.includes(searchPattern);
      }
    } catch (error) {
      throw new Error(`Failed to read file content: ${error.message}`);
    }
  }

  public async findDuplicatesByName(searchPath: string): Promise<FileMetadata[][]> {
    this.emitEvent('info', 'Searching for files with duplicate names...');
    
    const files = await this.scanDirectory(searchPath);
    const nameGroups: Record<string, FileMetadata[]> = {};

    for (const file of files) {
      if (!file.isDirectory) {
        const filename = path.basename(file.path);
        if (!nameGroups[filename]) {
          nameGroups[filename] = [];
        }
        nameGroups[filename].push(file);
      }
    }

    return Object.values(nameGroups).filter(group => group.length > 1);
  }

  public async findEmptyFiles(searchPath: string): Promise<FileMetadata[]> {
    this.emitEvent('info', 'Searching for empty files...');
    
    const files = await this.scanDirectory(searchPath);
    return files.filter(file => !file.isDirectory && file.size === 0);
  }

  public async findLargeFiles(
    searchPath: string,
    minSize: number = 100 * 1024 * 1024 // 100MB default
  ): Promise<FileMetadata[]> {
    this.emitEvent('info', `Searching for files larger than ${minSize} bytes...`);
    
    const files = await this.scanDirectory(searchPath);
    return files
      .filter(file => !file.isDirectory && file.size >= minSize)
      .sort((a, b) => b.size - a.size);
  }

  private emitEvent(type: 'info' | 'progress' | 'error' | 'warning', message: string): void {
    this.emit(type, { type, message, timestamp: new Date() });
  }
}
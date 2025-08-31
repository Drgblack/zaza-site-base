import { FileSystemUtils } from '../../src/utils/fs-utils';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

describe('FileSystemUtils', () => {
  let tempDir: string;
  let fsUtils: FileSystemUtils;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'fs-test-'));
    fsUtils = new FileSystemUtils();
  });

  afterEach(async () => {
    try {
      await fs.rmdir(tempDir, { recursive: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('readDirectory', () => {
    it('should read empty directory', async () => {
      const entries = await fsUtils.readDirectory(tempDir);
      expect(entries).toHaveLength(0);
    });

    it('should read directory with files', async () => {
      const testFile1 = path.join(tempDir, 'test1.txt');
      const testFile2 = path.join(tempDir, 'test2.txt');
      
      await fs.writeFile(testFile1, 'content1');
      await fs.writeFile(testFile2, 'content2');

      const entries = await fsUtils.readDirectory(tempDir);
      
      expect(entries).toHaveLength(2);
      expect(entries.map(e => e.name)).toContain('test1.txt');
      expect(entries.map(e => e.name)).toContain('test2.txt');
    });

    it('should identify directories and files', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      const testDir = path.join(tempDir, 'testdir');
      
      await fs.writeFile(testFile, 'content');
      await fs.mkdir(testDir);

      const entries = await fsUtils.readDirectory(tempDir);
      
      const fileEntry = entries.find(e => e.name === 'test.txt');
      const dirEntry = entries.find(e => e.name === 'testdir');
      
      expect(fileEntry?.isDirectory).toBe(false);
      expect(dirEntry?.isDirectory).toBe(true);
    });

    it('should handle includeHidden option', async () => {
      const normalFile = path.join(tempDir, 'normal.txt');
      const hiddenFile = path.join(tempDir, '.hidden');
      
      await fs.writeFile(normalFile, 'normal');
      await fs.writeFile(hiddenFile, 'hidden');

      // Without hidden files
      const entriesNoHidden = await fsUtils.readDirectory(tempDir, { includeHidden: false });
      expect(entriesNoHidden).toHaveLength(1);
      expect(entriesNoHidden[0].name).toBe('normal.txt');

      // With hidden files
      const entriesWithHidden = await fsUtils.readDirectory(tempDir, { includeHidden: true });
      expect(entriesWithHidden).toHaveLength(2);
      expect(entriesWithHidden.map(e => e.name)).toContain('.hidden');
    });
  });

  describe('getFileStats', () => {
    it('should get stats for file', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      const content = 'test content';
      await fs.writeFile(testFile, content);

      const stats = await fsUtils.getFileStats(testFile);
      
      expect(stats.size).toBe(content.length);
      expect(stats.isFile()).toBe(true);
      expect(stats.isDirectory()).toBe(false);
    });

    it('should get stats for directory', async () => {
      const testDir = path.join(tempDir, 'testdir');
      await fs.mkdir(testDir);

      const stats = await fsUtils.getFileStats(testDir);
      
      expect(stats.isFile()).toBe(false);
      expect(stats.isDirectory()).toBe(true);
    });

    it('should throw error for non-existent path', async () => {
      const nonExistentPath = path.join(tempDir, 'nonexistent');
      
      await expect(fsUtils.getFileStats(nonExistentPath))
        .rejects
        .toThrow();
    });
  });

  describe('ensureDirectory', () => {
    it('should create directory', async () => {
      const newDir = path.join(tempDir, 'newdir');
      
      await fsUtils.ensureDirectory(newDir);
      
      const stats = await fs.stat(newDir);
      expect(stats.isDirectory()).toBe(true);
    });

    it('should create nested directories', async () => {
      const nestedDir = path.join(tempDir, 'level1', 'level2', 'level3');
      
      await fsUtils.ensureDirectory(nestedDir);
      
      const stats = await fs.stat(nestedDir);
      expect(stats.isDirectory()).toBe(true);
    });

    it('should not fail if directory exists', async () => {
      const existingDir = path.join(tempDir, 'existing');
      await fs.mkdir(existingDir);
      
      await expect(fsUtils.ensureDirectory(existingDir))
        .resolves
        .not.toThrow();
    });
  });

  describe('fileExists', () => {
    it('should return true for existing file', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      await fs.writeFile(testFile, 'content');

      const exists = await fsUtils.fileExists(testFile);
      expect(exists).toBe(true);
    });

    it('should return true for existing directory', async () => {
      const testDir = path.join(tempDir, 'testdir');
      await fs.mkdir(testDir);

      const exists = await fsUtils.fileExists(testDir);
      expect(exists).toBe(true);
    });

    it('should return false for non-existent path', async () => {
      const nonExistentPath = path.join(tempDir, 'nonexistent');

      const exists = await fsUtils.fileExists(nonExistentPath);
      expect(exists).toBe(false);
    });
  });

  describe('isReadable', () => {
    it('should return true for readable file', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      await fs.writeFile(testFile, 'content');

      const readable = await fsUtils.isReadable(testFile);
      expect(readable).toBe(true);
    });

    it('should return false for non-existent file', async () => {
      const nonExistentFile = path.join(tempDir, 'nonexistent.txt');

      const readable = await fsUtils.isReadable(nonExistentFile);
      expect(readable).toBe(false);
    });
  });

  describe('isWritable', () => {
    it('should return true for writable location', async () => {
      const writable = await fsUtils.isWritable(tempDir);
      expect(writable).toBe(true);
    });

    it('should return true for writable existing file', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      await fs.writeFile(testFile, 'content');

      const writable = await fsUtils.isWritable(testFile);
      expect(writable).toBe(true);
    });
  });

  describe('getPermissionsString', () => {
    it('should convert mode to permissions string', () => {
      // rwxrwxrwx = 0o777
      const permissions777 = fsUtils.getPermissionsString(0o777);
      expect(permissions777).toBe('rwxrwxrwx');

      // rw-r--r-- = 0o644
      const permissions644 = fsUtils.getPermissionsString(0o644);
      expect(permissions644).toBe('rw-r--r--');

      // rwxr-xr-x = 0o755
      const permissions755 = fsUtils.getPermissionsString(0o755);
      expect(permissions755).toBe('rwxr-xr-x');
    });
  });

  describe('getMimeType', () => {
    it('should detect common file types', () => {
      expect(fsUtils.getMimeType('test.txt')).toBe('text/plain');
      expect(fsUtils.getMimeType('test.json')).toBe('application/json');
      expect(fsUtils.getMimeType('test.html')).toBe('text/html');
      expect(fsUtils.getMimeType('test.jpg')).toBe('image/jpeg');
      expect(fsUtils.getMimeType('test.png')).toBe('image/png');
      expect(fsUtils.getMimeType('test.pdf')).toBe('application/pdf');
    });

    it('should handle case insensitive extensions', () => {
      expect(fsUtils.getMimeType('test.TXT')).toBe('text/plain');
      expect(fsUtils.getMimeType('test.JPG')).toBe('image/jpeg');
    });

    it('should return undefined for unknown extensions', () => {
      expect(fsUtils.getMimeType('test.unknown')).toBeUndefined();
      expect(fsUtils.getMimeType('noextension')).toBeUndefined();
    });
  });

  describe('isHidden', () => {
    it('should detect hidden files', () => {
      expect(fsUtils.isHidden('.hidden')).toBe(true);
      expect(fsUtils.isHidden('/path/to/.hidden')).toBe(true);
      expect(fsUtils.isHidden('normal.txt')).toBe(false);
      expect(fsUtils.isHidden('/path/to/normal.txt')).toBe(false);
    });
  });

  describe('readFileAsText', () => {
    it('should read file as text', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      const content = 'Hello, World!';
      await fs.writeFile(testFile, content);

      const readContent = await fsUtils.readFileAsText(testFile);
      expect(readContent).toBe(content);
    });

    it('should handle different encodings', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      const content = 'UTF-8 content: äöü';
      await fs.writeFile(testFile, content, 'utf8');

      const readContent = await fsUtils.readFileAsText(testFile, 'utf8');
      expect(readContent).toBe(content);
    });

    it('should throw error for non-existent file', async () => {
      const nonExistentFile = path.join(tempDir, 'nonexistent.txt');
      
      await expect(fsUtils.readFileAsText(nonExistentFile))
        .rejects
        .toThrow();
    });
  });

  describe('readFileAsBuffer', () => {
    it('should read file as buffer', async () => {
      const testFile = path.join(tempDir, 'test.bin');
      const content = Buffer.from([1, 2, 3, 4, 5]);
      await fs.writeFile(testFile, content);

      const readBuffer = await fsUtils.readFileAsBuffer(testFile);
      expect(readBuffer).toEqual(content);
    });
  });

  describe('copyFile', () => {
    it('should copy file', async () => {
      const sourceFile = path.join(tempDir, 'source.txt');
      const targetFile = path.join(tempDir, 'target.txt');
      const content = 'File content to copy';
      
      await fs.writeFile(sourceFile, content);
      await fsUtils.copyFile(sourceFile, targetFile);

      const copiedContent = await fs.readFile(targetFile, 'utf8');
      expect(copiedContent).toBe(content);
    });

    it('should throw error if source does not exist', async () => {
      const nonExistentSource = path.join(tempDir, 'nonexistent.txt');
      const targetFile = path.join(tempDir, 'target.txt');

      await expect(fsUtils.copyFile(nonExistentSource, targetFile))
        .rejects
        .toThrow();
    });
  });

  describe('moveFile', () => {
    it('should move file', async () => {
      const sourceFile = path.join(tempDir, 'source.txt');
      const targetFile = path.join(tempDir, 'target.txt');
      const content = 'File content to move';
      
      await fs.writeFile(sourceFile, content);
      await fsUtils.moveFile(sourceFile, targetFile);

      const movedContent = await fs.readFile(targetFile, 'utf8');
      expect(movedContent).toBe(content);

      const sourceExists = await fsUtils.fileExists(sourceFile);
      expect(sourceExists).toBe(false);
    });
  });

  describe('getDirectorySize', () => {
    it('should calculate directory size', async () => {
      const file1 = path.join(tempDir, 'file1.txt');
      const file2 = path.join(tempDir, 'file2.txt');
      const content1 = 'content1'; // 8 bytes
      const content2 = 'content2'; // 8 bytes
      
      await fs.writeFile(file1, content1);
      await fs.writeFile(file2, content2);

      const size = await fsUtils.getDirectorySize(tempDir);
      expect(size).toBe(16); // 8 + 8 bytes
    });

    it('should calculate nested directory size', async () => {
      const subDir = path.join(tempDir, 'subdir');
      await fs.mkdir(subDir);
      
      const file1 = path.join(tempDir, 'file1.txt');
      const file2 = path.join(subDir, 'file2.txt');
      const content = 'test'; // 4 bytes each
      
      await fs.writeFile(file1, content);
      await fs.writeFile(file2, content);

      const size = await fsUtils.getDirectorySize(tempDir);
      expect(size).toBe(8); // 4 + 4 bytes
    });
  });

  describe('path utilities', () => {
    it('should sanitize filenames', () => {
      expect(fsUtils.sanitizeFilename('valid_file.txt')).toBe('valid_file.txt');
      expect(fsUtils.sanitizeFilename('file<with>invalid:chars')).toBe('file_with_invalid_chars');
      expect(fsUtils.sanitizeFilename('file|with"more*invalid?chars')).toBe('file_with_more_invalid_chars');
    });

    it('should normalize paths', () => {
      const normalized = fsUtils.normalizePath('/path/./to/../file.txt');
      expect(normalized).toBe(path.normalize('/path/./to/../file.txt'));
    });

    it('should resolve paths', () => {
      const resolved = fsUtils.resolvePath('./test.txt');
      expect(path.isAbsolute(resolved)).toBe(true);
    });

    it('should get relative paths', () => {
      const from = '/path/to/source';
      const to = '/path/to/target/file.txt';
      const relative = fsUtils.getRelativePath(from, to);
      expect(relative).toBe(path.relative(from, to));
    });
  });
});

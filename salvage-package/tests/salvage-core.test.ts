import { SalvageCore } from '../src/salvage-core';
import { FileSystemUtils } from '../src/utils/fs-utils';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

describe('SalvageCore', () => {
  let tempDir: string;
  let salvage: SalvageCore;

  beforeEach(async () => {
    // Create temporary test directory
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'salvage-test-'));
    salvage = new SalvageCore({ verbose: false });
  });

  afterEach(async () => {
    // Clean up temporary directory
    try {
      await fs.rmdir(tempDir, { recursive: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('constructor', () => {
    it('should create instance with default options', () => {
      const core = new SalvageCore();
      expect(core).toBeInstanceOf(SalvageCore);
    });

    it('should create instance with custom options', () => {
      const options = {
        verbose: true,
        includeHidden: true,
        maxDepth: 5,
      };
      const core = new SalvageCore(options);
      expect(core).toBeInstanceOf(SalvageCore);
      expect(core.getOptions()).toMatchObject(options);
    });
  });

  describe('scanDirectory', () => {
    it('should scan empty directory', async () => {
      const files = await salvage.scanDirectory(tempDir);
      expect(files).toHaveLength(0);
    });

    it('should scan directory with files', async () => {
      // Create test files
      const testFile1 = path.join(tempDir, 'test1.txt');
      const testFile2 = path.join(tempDir, 'test2.txt');
      
      await fs.writeFile(testFile1, 'Test content 1');
      await fs.writeFile(testFile2, 'Test content 2');

      const files = await salvage.scanDirectory(tempDir);
      expect(files).toHaveLength(2);
      expect(files.map(f => f.path)).toContain(testFile1);
      expect(files.map(f => f.path)).toContain(testFile2);
    });

    it('should scan directory with subdirectories', async () => {
      // Create nested structure
      const subDir = path.join(tempDir, 'subdir');
      await fs.mkdir(subDir);
      
      const testFile1 = path.join(tempDir, 'test1.txt');
      const testFile2 = path.join(subDir, 'test2.txt');
      
      await fs.writeFile(testFile1, 'Test content 1');
      await fs.writeFile(testFile2, 'Test content 2');

      const files = await salvage.scanDirectory(tempDir);
      expect(files).toHaveLength(3); // 2 files + 1 directory
      
      const filePaths = files.map(f => f.path);
      expect(filePaths).toContain(testFile1);
      expect(filePaths).toContain(testFile2);
      expect(filePaths).toContain(subDir);
    });

    it('should respect maxDepth option', async () => {
      // Create nested structure
      const subDir1 = path.join(tempDir, 'level1');
      const subDir2 = path.join(subDir1, 'level2');
      
      await fs.mkdir(subDir1, { recursive: true });
      await fs.mkdir(subDir2, { recursive: true });
      
      await fs.writeFile(path.join(tempDir, 'root.txt'), 'root');
      await fs.writeFile(path.join(subDir1, 'level1.txt'), 'level1');
      await fs.writeFile(path.join(subDir2, 'level2.txt'), 'level2');

      const salvageDepth1 = new SalvageCore({ maxDepth: 1 });
      const files = await salvageDepth1.scanDirectory(tempDir);
      
      // Should include root.txt, level1 dir, and level1.txt
      // Should NOT include level2 dir or level2.txt
      const filePaths = files.map(f => f.path);
      expect(filePaths).toContain(path.join(tempDir, 'root.txt'));
      expect(filePaths).toContain(path.join(subDir1, 'level1.txt'));
      expect(filePaths).not.toContain(path.join(subDir2, 'level2.txt'));
    });

    it('should handle includeHidden option', async () => {
      // Create hidden file (starts with .)
      const hiddenFile = path.join(tempDir, '.hidden');
      const normalFile = path.join(tempDir, 'normal.txt');
      
      await fs.writeFile(hiddenFile, 'hidden content');
      await fs.writeFile(normalFile, 'normal content');

      // Test without hidden files
      const filesNoHidden = await salvage.scanDirectory(tempDir);
      expect(filesNoHidden).toHaveLength(1);
      expect(filesNoHidden[0].path).toBe(normalFile);

      // Test with hidden files
      const salvageWithHidden = new SalvageCore({ includeHidden: true });
      const filesWithHidden = await salvageWithHidden.scanDirectory(tempDir);
      expect(filesWithHidden).toHaveLength(2);
      
      const filePaths = filesWithHidden.map(f => f.path);
      expect(filePaths).toContain(hiddenFile);
      expect(filePaths).toContain(normalFile);
    });
  });

  describe('getFileMetadata', () => {
    it('should get metadata for regular file', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      const testContent = 'Test content';
      await fs.writeFile(testFile, testContent);

      const metadata = await salvage.getFileMetadata(testFile);
      
      expect(metadata.path).toBe(testFile);
      expect(metadata.size).toBe(testContent.length);
      expect(metadata.isDirectory).toBe(false);
      expect(metadata.isSymlink).toBe(false);
      expect(metadata.hash).toBeDefined();
      expect(metadata.createdAt).toBeInstanceOf(Date);
      expect(metadata.modifiedAt).toBeInstanceOf(Date);
      expect(metadata.accessedAt).toBeInstanceOf(Date);
    });

    it('should get metadata for directory', async () => {
      const testDir = path.join(tempDir, 'testdir');
      await fs.mkdir(testDir);

      const metadata = await salvage.getFileMetadata(testDir);
      
      expect(metadata.path).toBe(testDir);
      expect(metadata.isDirectory).toBe(true);
      expect(metadata.isSymlink).toBe(false);
      expect(metadata.hash).toBeUndefined();
    });

    it('should throw error for non-existent file', async () => {
      const nonExistentFile = path.join(tempDir, 'nonexistent.txt');
      
      await expect(salvage.getFileMetadata(nonExistentFile))
        .rejects
        .toThrow();
    });
  });

  describe('event handling', () => {
    it('should emit events during operation', async () => {
      const events: any[] = [];
      
      salvage.onEvent((event) => {
        events.push(event);
      });

      // Create test file
      const testFile = path.join(tempDir, 'test.txt');
      await fs.writeFile(testFile, 'Test content');

      await salvage.scanDirectory(tempDir);
      
      expect(events).toHaveLength(3); // Start, progress, complete
      expect(events[0].type).toBe('info');
      expect(events[1].type).toBe('progress');
      expect(events[2].type).toBe('info');
    });
  });

  describe('options management', () => {
    it('should return current options', () => {
      const options = {
        verbose: true,
        includeHidden: true,
        maxDepth: 10,
      };
      
      const core = new SalvageCore(options);
      const currentOptions = core.getOptions();
      
      expect(currentOptions).toMatchObject(options);
    });

    it('should update options', () => {
      const core = new SalvageCore({ verbose: false });
      
      core.updateOptions({ verbose: true, maxDepth: 5 });
      
      const updatedOptions = core.getOptions();
      expect(updatedOptions.verbose).toBe(true);
      expect(updatedOptions.maxDepth).toBe(5);
    });
  });
});

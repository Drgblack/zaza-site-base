import { CryptoUtils } from '../../src/utils/crypto-utils';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

describe('CryptoUtils', () => {
  let tempDir: string;
  let cryptoUtils: CryptoUtils;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'crypto-test-'));
    cryptoUtils = new CryptoUtils();
  });

  afterEach(async () => {
    try {
      await fs.rmdir(tempDir, { recursive: true });
    } catch (error) {
      // Ignore cleanup errors
    }
  });

  describe('calculateFileHash', () => {
    it('should calculate hash for file', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      const testContent = 'Hello, World!';
      await fs.writeFile(testFile, testContent);

      const hash = await cryptoUtils.calculateFileHash(testFile);
      
      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
      expect(hash).toHaveLength(64); // SHA256 hex length
    });

    it('should calculate consistent hashes', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      const testContent = 'Consistent content';
      await fs.writeFile(testFile, testContent);

      const hash1 = await cryptoUtils.calculateFileHash(testFile);
      const hash2 = await cryptoUtils.calculateFileHash(testFile);
      
      expect(hash1).toBe(hash2);
    });

    it('should calculate different hashes for different content', async () => {
      const testFile1 = path.join(tempDir, 'test1.txt');
      const testFile2 = path.join(tempDir, 'test2.txt');
      
      await fs.writeFile(testFile1, 'Content 1');
      await fs.writeFile(testFile2, 'Content 2');

      const hash1 = await cryptoUtils.calculateFileHash(testFile1);
      const hash2 = await cryptoUtils.calculateFileHash(testFile2);
      
      expect(hash1).not.toBe(hash2);
    });

    it('should support different algorithms', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      await fs.writeFile(testFile, 'Test content');

      const sha256Hash = await cryptoUtils.calculateFileHash(testFile, 'sha256');
      const md5Hash = await cryptoUtils.calculateFileHash(testFile, 'md5');
      const sha1Hash = await cryptoUtils.calculateFileHash(testFile, 'sha1');

      expect(sha256Hash).toHaveLength(64);
      expect(md5Hash).toHaveLength(32);
      expect(sha1Hash).toHaveLength(40);
      
      expect(sha256Hash).not.toBe(md5Hash);
      expect(sha256Hash).not.toBe(sha1Hash);
      expect(md5Hash).not.toBe(sha1Hash);
    });

    it('should throw error for non-existent file', async () => {
      const nonExistentFile = path.join(tempDir, 'nonexistent.txt');
      
      await expect(cryptoUtils.calculateFileHash(nonExistentFile))
        .rejects
        .toThrow();
    });
  });

  describe('calculateBufferHash', () => {
    it('should calculate hash for buffer', async () => {
      const testBuffer = Buffer.from('Test buffer content');
      
      const hash = await cryptoUtils.calculateBufferHash(testBuffer);
      
      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
      expect(hash).toHaveLength(64);
    });

    it('should produce consistent results', async () => {
      const testBuffer = Buffer.from('Consistent buffer');
      
      const hash1 = await cryptoUtils.calculateBufferHash(testBuffer);
      const hash2 = await cryptoUtils.calculateBufferHash(testBuffer);
      
      expect(hash1).toBe(hash2);
    });
  });

  describe('calculateStringHash', () => {
    it('should calculate hash for string', async () => {
      const testString = 'Test string content';
      
      const hash = await cryptoUtils.calculateStringHash(testString);
      
      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
      expect(hash).toHaveLength(64);
    });

    it('should handle different encodings', async () => {
      const testString = 'Test string';
      
      const utf8Hash = await cryptoUtils.calculateStringHash(testString, 'sha256', 'utf8');
      const base64Hash = await cryptoUtils.calculateStringHash(testString, 'sha256', 'base64');
      
      expect(utf8Hash).not.toBe(base64Hash);
    });
  });

  describe('compareFileHashes', () => {
    it('should return true for identical files', async () => {
      const testFile1 = path.join(tempDir, 'test1.txt');
      const testFile2 = path.join(tempDir, 'test2.txt');
      const testContent = 'Identical content';
      
      await fs.writeFile(testFile1, testContent);
      await fs.writeFile(testFile2, testContent);

      const isEqual = await cryptoUtils.compareFileHashes(testFile1, testFile2);
      
      expect(isEqual).toBe(true);
    });

    it('should return false for different files', async () => {
      const testFile1 = path.join(tempDir, 'test1.txt');
      const testFile2 = path.join(tempDir, 'test2.txt');
      
      await fs.writeFile(testFile1, 'Content 1');
      await fs.writeFile(testFile2, 'Content 2');

      const isEqual = await cryptoUtils.compareFileHashes(testFile1, testFile2);
      
      expect(isEqual).toBe(false);
    });
  });

  describe('verifyFileIntegrity', () => {
    it('should verify correct hash', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      const testContent = 'Verify me!';
      await fs.writeFile(testFile, testContent);

      const expectedHash = await cryptoUtils.calculateFileHash(testFile);
      const isValid = await cryptoUtils.verifyFileIntegrity(testFile, expectedHash);
      
      expect(isValid).toBe(true);
    });

    it('should reject incorrect hash', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      await fs.writeFile(testFile, 'Test content');

      const wrongHash = 'a'.repeat(64); // Invalid SHA256 hash
      const isValid = await cryptoUtils.verifyFileIntegrity(testFile, wrongHash);
      
      expect(isValid).toBe(false);
    });

    it('should handle case insensitive comparison', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      await fs.writeFile(testFile, 'Test content');

      const hash = await cryptoUtils.calculateFileHash(testFile);
      const upperCaseHash = hash.toUpperCase();
      
      const isValid = await cryptoUtils.verifyFileIntegrity(testFile, upperCaseHash);
      
      expect(isValid).toBe(true);
    });
  });

  describe('generateRandomHash', () => {
    it('should generate random hash', () => {
      const hash = cryptoUtils.generateRandomHash();
      
      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
      expect(hash).toHaveLength(64);
    });

    it('should generate different hashes', () => {
      const hash1 = cryptoUtils.generateRandomHash();
      const hash2 = cryptoUtils.generateRandomHash();
      
      expect(hash1).not.toBe(hash2);
    });

    it('should respect length parameter', () => {
      const hash16 = cryptoUtils.generateRandomHash(16);
      const hash32 = cryptoUtils.generateRandomHash(32);
      
      expect(hash16).toHaveLength(64); // SHA256 is always 64 chars
      expect(hash32).toHaveLength(64);
    });
  });

  describe('createFileChecksum', () => {
    it('should create checksums for multiple algorithms', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      await fs.writeFile(testFile, 'Checksum test');

      const checksums = await cryptoUtils.createFileChecksum(testFile);
      
      expect(checksums).toHaveProperty('md5');
      expect(checksums).toHaveProperty('sha1');
      expect(checksums).toHaveProperty('sha256');
      
      expect(checksums.md5).toHaveLength(32);
      expect(checksums.sha1).toHaveLength(40);
      expect(checksums.sha256).toHaveLength(64);
    });

    it('should allow custom algorithms', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      await fs.writeFile(testFile, 'Custom checksum test');

      const checksums = await cryptoUtils.createFileChecksum(testFile, ['sha512']);
      
      expect(checksums).toHaveProperty('sha512');
      expect(checksums.sha512).toHaveLength(128);
    });
  });

  describe('createManifest', () => {
    it('should create manifest for multiple files', async () => {
      const testFile1 = path.join(tempDir, 'test1.txt');
      const testFile2 = path.join(tempDir, 'test2.txt');
      
      await fs.writeFile(testFile1, 'File 1 content');
      await fs.writeFile(testFile2, 'File 2 content');

      const manifest = await cryptoUtils.createManifest([testFile1, testFile2]);
      
      expect(manifest).toHaveProperty(testFile1);
      expect(manifest).toHaveProperty(testFile2);
      expect(typeof manifest[testFile1]).toBe('string');
      expect(typeof manifest[testFile2]).toBe('string');
      expect(manifest[testFile1]).not.toBe(manifest[testFile2]);
    });
  });

  describe('verifyManifest', () => {
    it('should verify valid manifest', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      await fs.writeFile(testFile, 'Manifest test');

      const hash = await cryptoUtils.calculateFileHash(testFile);
      const manifest = { [testFile]: hash };

      const result = await cryptoUtils.verifyManifest(manifest);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect invalid manifest', async () => {
      const testFile = path.join(tempDir, 'test.txt');
      await fs.writeFile(testFile, 'Manifest test');

      const wrongHash = 'a'.repeat(64);
      const manifest = { [testFile]: wrongHash };

      const result = await cryptoUtils.verifyManifest(manifest);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toHaveLength(1);
    });
  });

  describe('algorithm validation', () => {
    it('should validate supported algorithms', () => {
      expect(cryptoUtils.validateAlgorithm('sha256')).toBe(true);
      expect(cryptoUtils.validateAlgorithm('md5')).toBe(true);
      expect(cryptoUtils.validateAlgorithm('sha1')).toBe(true);
      expect(cryptoUtils.validateAlgorithm('sha512')).toBe(true);
      
      expect(cryptoUtils.validateAlgorithm('invalid')).toBe(false);
      expect(cryptoUtils.validateAlgorithm('')).toBe(false);
    });

    it('should return supported algorithms', () => {
      const algorithms = cryptoUtils.getSupportedAlgorithms();
      
      expect(algorithms).toContain('md5');
      expect(algorithms).toContain('sha1');
      expect(algorithms).toContain('sha256');
      expect(algorithms).toContain('sha512');
    });
  });
});
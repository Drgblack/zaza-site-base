import * as fs from 'fs/promises';
import * as path from 'path';

export interface ValidationRule<T = any> {
  name: string;
  validate: (value: T) => boolean | Promise<boolean>;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export class ValidationUtils {
  public static async validatePath(filePath: string): Promise<ValidationResult> {
    const result: ValidationResult = { valid: true, errors: [], warnings: [] };

    // Check if path is provided
    if (!filePath || typeof filePath !== 'string') {
      result.errors.push('Path must be a non-empty string');
      result.valid = false;
      return result;
    }

    // Check for null characters (security issue)
    if (filePath.includes('\0')) {
      result.errors.push('Path contains null characters');
      result.valid = false;
    }

    // Check path length
    if (filePath.length > 4096) {
      result.errors.push('Path is too long (max 4096 characters)');
      result.valid = false;
    }

    // Check for dangerous path traversal
    const normalized = path.normalize(filePath);
    if (normalized.includes('..')) {
      result.warnings.push('Path contains parent directory references (..)');
    }

    // Platform-specific validations
    if (process.platform === 'win32') {
      // Windows path validation
      const invalidChars = /[<>:"|?*]/;
      if (invalidChars.test(filePath)) {
        result.errors.push('Path contains invalid Windows characters: < > : " | ? *');
        result.valid = false;
      }

      // Check for reserved names
      const basename = path.basename(filePath).toLowerCase();
      const reservedNames = [
        'con', 'prn', 'aux', 'nul',
        'com1', 'com2', 'com3', 'com4', 'com5', 'com6', 'com7', 'com8', 'com9',
        'lpt1', 'lpt2', 'lpt3', 'lpt4', 'lpt5', 'lpt6', 'lpt7', 'lpt8', 'lpt9'
      ];
      
      if (reservedNames.includes(basename) || reservedNames.includes(basename.split('.')[0])) {
        result.errors.push(`Path uses reserved Windows name: ${basename}`);
        result.valid = false;
      }
    }

    return result;
  }

  public static async validateFileExists(filePath: string): Promise<ValidationResult> {
    const result: ValidationResult = { valid: true, errors: [], warnings: [] };

    const pathValidation = await this.validatePath(filePath);
    if (!pathValidation.valid) {
      return pathValidation;
    }

    try {
      await fs.access(filePath);
    } catch (error) {
      result.errors.push(`File does not exist or is not accessible: ${filePath}`);
      result.valid = false;
    }

    return result;
  }

  public static async validateDirectoryExists(dirPath: string): Promise<ValidationResult> {
    const result: ValidationResult = { valid: true, errors: [], warnings: [] };

    const pathValidation = await this.validatePath(dirPath);
    if (!pathValidation.valid) {
      return pathValidation;
    }

    try {
      const stats = await fs.stat(dirPath);
      if (!stats.isDirectory()) {
        result.errors.push(`Path exists but is not a directory: ${dirPath}`);
        result.valid = false;
      }
    } catch (error) {
      result.errors.push(`Directory does not exist or is not accessible: ${dirPath}`);
      result.valid = false;
    }

    return result;
  }

  public static async validateFileReadable(filePath: string): Promise<ValidationResult> {
    const result: ValidationResult = { valid: true, errors: [], warnings: [] };

    const existsValidation = await this.validateFileExists(filePath);
    if (!existsValidation.valid) {
      return existsValidation;
    }

    try {
      await fs.access(filePath, fs.constants.R_OK);
    } catch (error) {
      result.errors.push(`File is not readable: ${filePath}`);
      result.valid = false;
    }

    return result;
  }

  public static async validateFileWritable(filePath: string): Promise<ValidationResult> {
    const result: ValidationResult = { valid: true, errors: [], warnings: [] };

    try {
      // Check if file exists
      await fs.access(filePath);
      
      // File exists, check if writable
      try {
        await fs.access(filePath, fs.constants.W_OK);
      } catch (error) {
        result.errors.push(`File is not writable: ${filePath}`);
        result.valid = false;
      }
    } catch (error) {
      // File doesn't exist, check if parent directory is writable
      const parentDir = path.dirname(filePath);
      
      try {
        await fs.access(parentDir, fs.constants.W_OK);
      } catch (error) {
        result.errors.push(`Parent directory is not writable: ${parentDir}`);
        result.valid = false;
      }
    }

    return result;
  }

  public static validateFileSize(size: number, minSize?: number, maxSize?: number): ValidationResult {
    const result: ValidationResult = { valid: true, errors: [], warnings: [] };

    if (typeof size !== 'number' || size < 0) {
      result.errors.push('File size must be a non-negative number');
      result.valid = false;
      return result;
    }

    if (minSize !== undefined && size < minSize) {
      result.errors.push(`File size (${size}) is below minimum (${minSize})`);
      result.valid = false;
    }

    if (maxSize !== undefined && size > maxSize) {
      result.errors.push(`File size (${size}) exceeds maximum (${maxSize})`);
      result.valid = false;
    }

    // Warning for very large files
    if (size > 1024 * 1024 * 1024) { // 1GB
      result.warnings.push(`File is very large (${this.formatBytes(size)})`);
    }

    return result;
  }

  public static validateFileExtension(filePath: string, allowedExtensions: string[]): ValidationResult {
    const result: ValidationResult = { valid: true, errors: [], warnings: [] };

    if (!allowedExtensions || allowedExtensions.length === 0) {
      return result;
    }

    const ext = path.extname(filePath).toLowerCase();
    const normalizedAllowed = allowedExtensions.map(e => e.toLowerCase().startsWith('.') ? e.toLowerCase() : `.${e.toLowerCase()}`);

    if (!normalizedAllowed.includes(ext)) {
      result.errors.push(`File extension '${ext}' is not allowed. Allowed: ${normalizedAllowed.join(', ')}`);
      result.valid = false;
    }

    return result;
  }

  public static async validateDiskSpace(
    filePath: string, 
    requiredSpace: number
  ): Promise<ValidationResult> {
    const result: ValidationResult = { valid: true, errors: [], warnings: [] };

    try {
      // This is a simplified implementation
      // In a production environment, you'd want to use a library like 'statvfs' for accurate disk space checking
      const stats = await fs.stat(path.dirname(filePath));
      
      // For now, we'll just warn if the required space is very large
      if (requiredSpace > 10 * 1024 * 1024 * 1024) { // 10GB
        result.warnings.push(`Operation requires large amount of disk space: ${this.formatBytes(requiredSpace)}`);
      }
    } catch (error) {
      result.warnings.push('Could not check available disk space');
    }

    return result;
  }

  public static async validateWithRules<T>(
    value: T, 
    rules: ValidationRule<T>[]
  ): Promise<ValidationResult> {
    const result: ValidationResult = { valid: true, errors: [], warnings: [] };

    for (const rule of rules) {
      try {
        const isValid = await rule.validate(value);
        if (!isValid) {
          result.errors.push(`${rule.name}: ${rule.message}`);
          result.valid = false;
        }
      } catch (error) {
        result.errors.push(`${rule.name}: Validation failed - ${error.message}`);
        result.valid = false;
      }
    }

    return result;
  }

  public static createFileExistsRule(): ValidationRule<string> {
    return {
      name: 'FileExists',
      validate: async (filePath: string) => {
        try {
          await fs.access(filePath);
          return true;
        } catch {
          return false;
        }
      },
      message: 'File must exist and be accessible'
    };
  }

  public static createFileSizeRule(minSize?: number, maxSize?: number): ValidationRule<string> {
    return {
      name: 'FileSize',
      validate: async (filePath: string) => {
        try {
          const stats = await fs.stat(filePath);
          const validation = ValidationUtils.validateFileSize(stats.size, minSize, maxSize);
          return validation.valid;
        } catch {
          return false;
        }
      },
      message: `File size must be${minSize ? ` at least ${ValidationUtils.formatBytes(minSize)}` : ''}${minSize && maxSize ? ' and' : ''}${maxSize ? ` at most ${ValidationUtils.formatBytes(maxSize)}` : ''}`
    };
  }

  public static createExtensionRule(allowedExtensions: string[]): ValidationRule<string> {
    return {
      name: 'FileExtension',
      validate: (filePath: string) => {
        const validation = ValidationUtils.validateFileExtension(filePath, allowedExtensions);
        return validation.valid;
      },
      message: `File extension must be one of: ${allowedExtensions.join(', ')}`
    };
  }

  public static createRegexRule(pattern: RegExp, fieldName: string = 'value'): ValidationRule<string> {
    return {
      name: 'RegexMatch',
      validate: (value: string) => pattern.test(value),
      message: `${fieldName} does not match required pattern`
    };
  }

  public static createRangeRule(min: number, max: number): ValidationRule<number> {
    return {
      name: 'NumberRange',
      validate: (value: number) => value >= min && value <= max,
      message: `Value must be between ${min} and ${max}`
    };
  }

  public static combineResults(...results: ValidationResult[]): ValidationResult {
    const combined: ValidationResult = { valid: true, errors: [], warnings: [] };

    for (const result of results) {
      if (!result.valid) {
        combined.valid = false;
      }
      
      combined.errors.push(...result.errors);
      combined.warnings.push(...result.warnings);
    }

    return combined;
  }

  public static formatBytes(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  }

  public static async validateBatchFiles(
    filePaths: string[],
    rules: ValidationRule<string>[] = []
  ): Promise<{ filePath: string; result: ValidationResult }[]> {
    const results = await Promise.all(
      filePaths.map(async (filePath) => ({
        filePath,
        result: await this.validateWithRules(filePath, rules)
      }))
    );

    return results;
  }

  public static getValidationSummary(results: ValidationResult[]): {
    totalValid: number;
    totalInvalid: number;
    totalWarnings: number;
    totalErrors: number;
  } {
    return results.reduce(
      (summary, result) => ({
        totalValid: summary.totalValid + (result.valid ? 1 : 0),
        totalInvalid: summary.totalInvalid + (result.valid ? 0 : 1),
        totalWarnings: summary.totalWarnings + result.warnings.length,
        totalErrors: summary.totalErrors + result.errors.length,
      }),
      { totalValid: 0, totalInvalid: 0, totalWarnings: 0, totalErrors: 0 }
    );
  }
}

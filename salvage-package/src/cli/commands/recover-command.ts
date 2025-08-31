import { Command } from 'commander';
import chalk from 'chalk';
import { BaseCommand, CommandOptions } from '../base-command';
import { SalvageRecovery } from '../../salvage-recovery';

interface RecoverCommandOptions extends CommandOptions {
  backup?: boolean;
  compress?: boolean;
  verify?: boolean;
  force?: boolean;
}

export class RecoverCommand extends BaseCommand {
  public register(program: Command): void {
    program
      .command('recover')
      .description('Recover files from damaged or deleted sources')
      .addCommand(this.createCopyCommand())
      .addCommand(this.createBackupCommand())
      .addCommand(this.createRestoreCommand());
  }

  private createCopyCommand(): Command {
    return new Command('copy')
      .description('Copy files from source to destination with verification')
      .argument('<source>', 'Source directory to recover from')
      .argument('<destination>', 'Destination directory for recovered files')
      .option('-v, --verbose', 'Enable verbose output')
      .option('--include-hidden', 'Include hidden files')
      .option('--include-deleted', 'Include deleted files (if detectable)')
      .option('--max-depth <depth>', 'Maximum directory depth (-1 for unlimited)', parseInt)
      .option('--follow-symlinks', 'Follow symbolic links')
      .option('--no-preserve-timestamps', 'Don\'t preserve original timestamps')
      .option('--verify', 'Verify copied files with checksums')
      .option('--force', 'Overwrite existing files without confirmation')
      .action(async (source: string, destination: string, options: RecoverCommandOptions) => {
        await this.executeCopy(source, destination, options);
      });
  }

  private createBackupCommand(): Command {
    return new Command('backup')
      .description('Create backup archive of directory')
      .argument('<source>', 'Source directory to backup')
      .argument('[destination]', 'Destination file for backup archive')
      .option('-v, --verbose', 'Enable verbose output')
      .option('--compress', 'Create compressed backup', true)
      .option('--no-compress', 'Create uncompressed backup')
      .option('--include-hidden', 'Include hidden files')
      .option('--max-depth <depth>', 'Maximum directory depth (-1 for unlimited)', parseInt)
      .option('--follow-symlinks', 'Follow symbolic links')
      .action(async (source: string, destination: string | undefined, options: RecoverCommandOptions & { compress: boolean }) => {
        await this.executeBackup(source, destination, options);
      });
  }

  private createRestoreCommand(): Command {
    return new Command('restore')
      .description('Restore files from backup archive')
      .argument('<archive>', 'Backup archive to restore from')
      .argument('<destination>', 'Destination directory for restored files')
      .option('-v, --verbose', 'Enable verbose output')
      .option('--verify', 'Verify restored files')
      .option('--force', 'Overwrite existing files without confirmation')
      .action(async (archive: string, destination: string, options: RecoverCommandOptions) => {
        await this.executeRestore(archive, destination, options);
      });
  }

  private async executeCopy(source: string, destination: string, options: RecoverCommandOptions): Promise<void> {
    try {
      // Setup and validation
      this.setupLogger(options.verbose || false);
      await this.validatePath(source);
      await this.validateOutputPath(destination);

      // Confirm if destination exists and not forced
      if (!options.force) {
        const fs = require('fs/promises');
        try {
          const stats = await fs.stat(destination);
          if (stats.isDirectory()) {
            const entries = await fs.readdir(destination);
            if (entries.length > 0) {
              const confirmed = await this.confirmAction(
                `Destination directory is not empty. Continue recovery?`
              );
              if (!confirmed) {
                console.log(chalk.yellow('Recovery cancelled.'));
                return;
              }
            }
          }
        } catch {
          // Destination doesn't exist, which is fine
        }
      }

      const salvageOptions = this.createSalvageOptions(options);
      const recovery = new SalvageRecovery(salvageOptions);
      this.setupEventHandlers(recovery);

      // Start recovery
      this.startSpinner(`Recovering files from ${source} to ${destination}...`);
      const startTime = Date.now();
      
      const result = await recovery.recoverDirectory(source, destination);
      
      const duration = Date.now() - startTime;
      
      if (result.success) {
        this.succeedSpinner(`Recovery completed successfully`);
      } else {
        this.failSpinner(`Recovery completed with ${result.errors.length} errors`);
      }

      // Display results
      this.displayRecoveryResults(result, duration, options.verify);

      // Verify if requested
      if (options.verify && result.success) {
        await this.verifyRecoveredFiles(source, destination, result.recoveredFiles);
      }

    } catch (error) {
      this.handleError(error, 'Recovery failed');
    }
  }

  private async executeBackup(source: string, destination: string | undefined, options: RecoverCommandOptions & { compress: boolean }): Promise<void> {
    try {
      // Setup and validation
      this.setupLogger(options.verbose || false);
      await this.validatePath(source);

      // Generate destination if not provided
      if (!destination) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const path = require('path');
        const sourceName = path.basename(source);
        const extension = options.compress ? '.zip' : '';
        destination = `${sourceName}-backup-${timestamp}${extension}`;
      }

      await this.validateOutputPath(destination!);

      const salvageOptions = this.createSalvageOptions(options);
      const recovery = new SalvageRecovery(salvageOptions);
      this.setupEventHandlers(recovery);

      // Start backup
      this.startSpinner(`Creating backup from ${source}...`);
      const startTime = Date.now();
      
      const result = await recovery.createBackup(source, destination!, options.compress);
      
      const duration = Date.now() - startTime;
      
      if (result.success) {
        this.succeedSpinner(`Backup created successfully`);
      } else {
        this.failSpinner(`Backup completed with ${result.errors.length} errors`);
      }

      // Display results
      this.displayBackupResults(result, duration, destination!, options.compress);

    } catch (error) {
      this.handleError(error, 'Backup failed');
    }
  }

  private async executeRestore(archive: string, destination: string, options: RecoverCommandOptions): Promise<void> {
    try {
      // Setup and validation
      this.setupLogger(options.verbose || false);
      await this.validatePath(archive);
      await this.validateOutputPath(destination);

      // Confirm if destination exists and not forced
      if (!options.force) {
        const fs = require('fs/promises');
        try {
          const entries = await fs.readdir(destination);
          if (entries.length > 0) {
            const confirmed = await this.confirmAction(
              `Destination directory is not empty. Continue restore?`
            );
            if (!confirmed) {
              console.log(chalk.yellow('Restore cancelled.'));
              return;
            }
          }
        } catch {
          // Destination doesn't exist, which is fine
        }
      }

      const { CompressionUtils } = require('../../utils/compression-utils');
      const compression = new CompressionUtils();

      // Start restore
      this.startSpinner(`Restoring from ${archive}...`);
      const startTime = Date.now();
      
      const extractedFiles = await compression.extractArchive(archive, destination);
      
      const duration = Date.now() - startTime;
      this.succeedSpinner('Restore completed successfully');

      // Display results
      this.displayRestoreResults(extractedFiles, duration, options.verify);

      // Verify if requested
      if (options.verify) {
        await this.verifyRestoredFiles(extractedFiles, destination);
      }

    } catch (error) {
      this.handleError(error, 'Restore failed');
    }
  }

  private displayRecoveryResults(result: any, duration: number, verified: boolean = false): void {
    const successRate = result.totalFiles > 0 ? (result.recoveredFiles.length / result.totalFiles * 100).toFixed(1) : '0';
    
    this.displaySummary('Recovery Summary', [
      { label: 'Files Processed', value: result.totalFiles, color: 'blue' },
      { label: 'Files Recovered', value: result.recoveredFiles.length, color: 'green' },
      { label: 'Success Rate', value: `${successRate}%`, color: 'yellow' },
      { label: 'Total Size', value: this.formatBytes(result.totalSize), color: 'cyan' },
      { label: 'Duration', value: this.formatDuration(duration), color: 'white' },
      { label: 'Errors', value: result.errors.length, color: result.errors.length > 0 ? 'red' : 'green' },
    ]);

    // Show errors if any
    if (result.errors.length > 0) {
      console.log(chalk.bold.red('\n❌ Errors:'));
      console.log('─'.repeat(50));
      for (const error of result.errors.slice(0, 10)) {
        console.log(chalk.red(`  • ${error}`));
      }
      if (result.errors.length > 10) {
        console.log(chalk.gray(`  ... and ${result.errors.length - 10} more errors`));
      }
      console.log('');
    }
  }

  private displayBackupResults(result: any, duration: number, destination: string, compressed: boolean): void {
    const fs = require('fs');
    let backupSize = 0;
    
    try {
      const stats = fs.statSync(destination);
      backupSize = stats.size;
    } catch {
      // Ignore if we can't get backup size
    }

    const compressionRatio = result.totalSize > 0 ? (backupSize / result.totalSize * 100).toFixed(1) : '0';
    
    this.displaySummary('Backup Summary', [
      { label: 'Files Backed Up', value: result.recoveredFiles.length, color: 'green' },
      { label: 'Original Size', value: this.formatBytes(result.totalSize), color: 'cyan' },
      { label: 'Backup Size', value: this.formatBytes(backupSize), color: 'yellow' },
      { label: 'Compression', value: compressed ? `${compressionRatio}%` : 'None', color: 'blue' },
      { label: 'Duration', value: this.formatDuration(duration), color: 'white' },
      { label: 'Backup File', value: destination, color: 'green' },
    ]);
  }

  private displayRestoreResults(files: any[], duration: number, verified: boolean): void {
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    
    this.displaySummary('Restore Summary', [
      { label: 'Files Restored', value: files.length, color: 'green' },
      { label: 'Total Size', value: this.formatBytes(totalSize), color: 'cyan' },
      { label: 'Duration', value: this.formatDuration(duration), color: 'white' },
      { label: 'Verified', value: verified ? 'Yes' : 'No', color: verified ? 'green' : 'yellow' },
    ]);
  }

  private async verifyRecoveredFiles(source: string, destination: string, files: any[]): Promise<void> {
    this.startSpinner('Verifying recovered files...');
    
    const { CryptoUtils } = require('../../utils/crypto-utils');
    const crypto = new CryptoUtils();
    const path = require('path');
    
    let verified = 0;
    let failed = 0;
    
    for (const file of files) {
      if (!file.isDirectory && file.hash) {
        try {
          const relativePath = path.relative(source, file.path);
          const recoveredPath = path.join(destination, relativePath);
          
          const recoveredHash = await crypto.calculateFileHash(recoveredPath);
          
          if (recoveredHash === file.hash) {
            verified++;
          } else {
            failed++;
            this.logger.warn(`Hash mismatch for ${recoveredPath}`);
          }
        } catch (error) {
          failed++;
          this.logger.warn(`Failed to verify ${file.path}: ${error.message}`);
        }
      }
    }
    
    if (failed === 0) {
      this.succeedSpinner(`Verification completed: ${verified} files verified`);
    } else {
      this.failSpinner(`Verification completed with ${failed} failures`);
    }
  }

  private async verifyRestoredFiles(files: any[], destination: string): Promise<void> {
    this.startSpinner('Verifying restored files...');
    
    const fs = require('fs/promises');
    const path = require('path');
    
    let verified = 0;
    let failed = 0;
    
    for (const file of files) {
      try {
        const filePath = path.join(destination, file.path);
        const stats = await fs.stat(filePath);
        
        if (stats.size === file.size) {
          verified++;
        } else {
          failed++;
          this.logger.warn(`Size mismatch for ${filePath}`);
        }
      } catch (error) {
        failed++;
        this.logger.warn(`Failed to verify ${file.path}: ${error.message}`);
      }
    }
    
    if (failed === 0) {
      this.succeedSpinner(`Verification completed: ${verified} files verified`);
    } else {
      this.failSpinner(`Verification completed with ${failed} failures`);
    }
  }
}
import { Command } from 'commander';
import chalk from 'chalk';
import { BaseCommand, CommandOptions } from '../base-command';
import { SalvageCore } from '../../salvage-core';

interface ScanCommandOptions extends CommandOptions {
  format?: 'json' | 'csv' | 'table';
  output?: string;
  showHashes?: boolean;
}

export class ScanCommand extends BaseCommand {
  public register(program: Command): void {
    program
      .command('scan <path>')
      .description('Scan directory and list all files with metadata')
      .option('-v, --verbose', 'Enable verbose output')
      .option('-o, --output <file>', 'Output results to file')
      .option('-f, --format <format>', 'Output format (json, csv, table)', 'table')
      .option('--include-hidden', 'Include hidden files')
      .option('--include-deleted', 'Include deleted files (if detectable)')
      .option('--max-depth <depth>', 'Maximum directory depth (-1 for unlimited)', parseInt)
      .option('--follow-symlinks', 'Follow symbolic links')
      .option('--show-hashes', 'Calculate and show file hashes')
      .action(async (path: string, options: ScanCommandOptions) => {
        await this.execute(path, options);
      });
  }

  private async execute(scanPath: string, options: ScanCommandOptions): Promise<void> {
    try {
      // Setup
      this.setupLogger(options.verbose || false);
      await this.validatePath(scanPath);

      const salvageOptions = this.createSalvageOptions(options);
      const salvage = new SalvageCore(salvageOptions);
      this.setupEventHandlers(salvage);

      // Start scan
      this.startSpinner(`Scanning directory: ${scanPath}`);
      const files = await salvage.scanDirectory(scanPath);
      this.succeedSpinner(`Scan completed: ${files.length} items found`);

      // Display results
      await this.displayResults(files, options);

      // Summary
      const totalFiles = files.filter(f => !f.isDirectory).length;
      const totalDirs = files.filter(f => f.isDirectory).length;
      const totalSize = files.reduce((sum, f) => sum + f.size, 0);

      this.displaySummary('Scan Summary', [
        { label: 'Total Files', value: totalFiles, color: 'green' },
        { label: 'Total Directories', value: totalDirs, color: 'blue' },
        { label: 'Total Size', value: this.formatBytes(totalSize), color: 'yellow' },
      ]);

    } catch (error) {
      this.handleError(error, 'Scan failed');
    }
  }

  private async displayResults(files: any[], options: ScanCommandOptions): Promise<void> {
    switch (options.format) {
      case 'json':
        await this.outputJSON(files, options.output);
        break;
      case 'csv':
        await this.outputCSV(files, options.output);
        break;
      case 'table':
      default:
        this.outputTable(files, options.output);
        break;
    }
  }

  private async outputJSON(files: any[], outputFile?: string): Promise<void> {
    const json = JSON.stringify(files, null, 2);
    
    if (outputFile) {
      const fs = require('fs/promises');
      await fs.writeFile(outputFile, json);
      console.log(chalk.green(`✓ Results saved to: ${outputFile}`));
    } else {
      console.log(json);
    }
  }

  private async outputCSV(files: any[], outputFile?: string): Promise<void> {
    const headers = ['Path', 'Type', 'Size', 'Modified', 'Permissions', 'Hash'];
    const rows = files.map(file => [
      file.path,
      file.isDirectory ? 'Directory' : 'File',
      file.size.toString(),
      file.modifiedAt.toISOString(),
      file.permissions || '',
      file.hash || ''
    ]);

    const csv = [headers.join(','), ...rows.map(row => 
      row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
    )].join('\n');

    if (outputFile) {
      const fs = require('fs/promises');
      await fs.writeFile(outputFile, csv);
      console.log(chalk.green(`✓ Results saved to: ${outputFile}`));
    } else {
      console.log(csv);
    }
  }

  private outputTable(files: any[], outputFile?: string): void {
    if (files.length === 0) {
      console.log(chalk.yellow('No files found.'));
      return;
    }

    // Limit table output for readability
    const displayFiles = files.slice(0, 50);
    const hasMore = files.length > displayFiles.length;

    console.log(chalk.bold('\n📁 Files Found:'));
    console.log('─'.repeat(80));

    for (const file of displayFiles) {
      const typeIcon = file.isDirectory ? '📁' : '📄';
      const sizeStr = file.isDirectory ? '' : ` (${this.formatBytes(file.size)})`;
      const hiddenStr = file.isHidden ? chalk.gray(' [hidden]') : '';
      const symlinkStr = file.isSymlink ? chalk.cyan(' [symlink]') : '';
      
      console.log(`${typeIcon} ${file.path}${chalk.gray(sizeStr)}${hiddenStr}${symlinkStr}`);
    }

    if (hasMore) {
      console.log(chalk.gray(`\n... and ${files.length - displayFiles.length} more files`));
      console.log(chalk.gray('Use --format json or --format csv for complete output'));
    }

    if (outputFile) {
      // Save full results to file in JSON format
      this.outputJSON(files, outputFile);
    }
  }
}

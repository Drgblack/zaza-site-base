import { Command } from 'commander';
import chalk from 'chalk';
import { BaseCommand, CommandOptions } from '../base-command';
import { SalvageSearch } from '../../salvage-search';
import { SearchOptions } from '../../types';

interface SearchCommandOptions extends CommandOptions {
  pattern?: string;
  regex?: boolean;
  caseSensitive?: boolean;
  content?: boolean;
  type?: string;
  minSize?: string;
  maxSize?: string;
  after?: string;
  before?: string;
  format?: 'json' | 'csv' | 'table';
  output?: string;
}

export class SearchCommand extends BaseCommand {
  public register(program: Command): void {
    program
      .command('search <path>')
      .description('Search for files based on various criteria')
      .option('-p, --pattern <pattern>', 'Search pattern (filename)')
      .option('-r, --regex', 'Use regular expressions in pattern')
      .option('-i, --case-sensitive', 'Case sensitive search')
      .option('-c, --content', 'Search within file content')
      .option('-t, --type <type>', 'File type filter (e.g., js, image, video)')
      .option('--min-size <size>', 'Minimum file size (e.g., 1MB, 500KB)')
      .option('--max-size <size>', 'Maximum file size (e.g., 10MB, 2GB)')
      .option('--after <date>', 'Files modified after date (YYYY-MM-DD)')
      .option('--before <date>', 'Files modified before date (YYYY-MM-DD)')
      .option('-v, --verbose', 'Enable verbose output')
      .option('-o, --output <file>', 'Output results to file')
      .option('-f, --format <format>', 'Output format (json, csv, table)', 'table')
      .option('--include-hidden', 'Include hidden files')
      .option('--max-depth <depth>', 'Maximum directory depth (-1 for unlimited)', parseInt)
      .option('--follow-symlinks', 'Follow symbolic links')
      .action(async (path: string, options: SearchCommandOptions) => {
        await this.execute(path, options);
      });

    // Add convenience subcommands
    this.addConvenienceCommands(program);
  }

  private addConvenienceCommands(program: Command): void {
    // Duplicates command
    program
      .command('duplicates <path>')
      .description('Find duplicate files by hash')
      .option('-v, --verbose', 'Enable verbose output')
      .option('-o, --output <file>', 'Output results to file')
      .option('-f, --format <format>', 'Output format (json, csv, table)', 'table')
      .option('--include-hidden', 'Include hidden files')
      .action(async (path: string, options: SearchCommandOptions) => {
        await this.findDuplicates(path, options);
      });

    // Empty files command
    program
      .command('empty <path>')
      .description('Find empty files and directories')
      .option('-v, --verbose', 'Enable verbose output')
      .option('-o, --output <file>', 'Output results to file')
      .option('--include-hidden', 'Include hidden files')
      .action(async (path: string, options: SearchCommandOptions) => {
        await this.findEmpty(path, options);
      });

    // Large files command
    program
      .command('large <path>')
      .description('Find large files')
      .option('--min-size <size>', 'Minimum file size', '100MB')
      .option('-v, --verbose', 'Enable verbose output')
      .option('-o, --output <file>', 'Output results to file')
      .option('--include-hidden', 'Include hidden files')
      .action(async (path: string, options: SearchCommandOptions) => {
        await this.findLarge(path, options);
      });
  }

  private async execute(searchPath: string, options: SearchCommandOptions): Promise<void> {
    try {
      // Setup and validation
      this.setupLogger(options.verbose || false);
      await this.validatePath(searchPath);

      if (!options.pattern && !options.type && !options.minSize && !options.maxSize && !options.after && !options.before) {
        console.error(chalk.red('Error: At least one search criteria must be specified'));
        console.log(chalk.yellow('Use --pattern, --type, --min-size, --max-size, --after, or --before'));
        process.exit(1);
      }

      const searchOptions = this.createSearchOptions(options);
      const salvageOptions = this.createSalvageOptions(options);
      
      const searcher = new SalvageSearch(salvageOptions);
      this.setupEventHandlers(searcher);

      // Perform search
      this.startSpinner(`Searching in: ${searchPath}`);
      const results = await searcher.search(searchPath, searchOptions);
      this.succeedSpinner(`Search completed: ${results.totalMatches} matches found`);

      // Display results
      await this.displaySearchResults(results, options);

    } catch (error) {
      this.handleError(error, 'Search failed');
    }
  }

  private async findDuplicates(searchPath: string, options: SearchCommandOptions): Promise<void> {
    try {
      this.setupLogger(options.verbose || false);
      await this.validatePath(searchPath);

      const salvageOptions = this.createSalvageOptions(options);
      const searcher = new SalvageSearch(salvageOptions);
      this.setupEventHandlers(searcher);

      this.startSpinner(`Finding duplicate files in: ${searchPath}`);
      
      // First find duplicates by hash
      const analyzer = new (require('../../salvage-analyzer')).SalvageAnalyzer(salvageOptions);
      const analysisResults = await analyzer.analyzeDirectory(searchPath);
      
      this.succeedSpinner(`Found ${analysisResults.duplicateFiles.length} duplicate groups`);

      // Display results
      await this.displayDuplicateResults(analysisResults.duplicateFiles, options);

    } catch (error) {
      this.handleError(error, 'Duplicate search failed');
    }
  }

  private async findEmpty(searchPath: string, options: SearchCommandOptions): Promise<void> {
    try {
      this.setupLogger(options.verbose || false);
      await this.validatePath(searchPath);

      const salvageOptions = this.createSalvageOptions(options);
      const searcher = new SalvageSearch(salvageOptions);
      this.setupEventHandlers(searcher);

      this.startSpinner(`Finding empty files in: ${searchPath}`);
      const emptyFiles = await searcher.findEmptyFiles(searchPath);
      this.succeedSpinner(`Found ${emptyFiles.length} empty files`);

      // Display results
      await this.displayEmptyResults(emptyFiles, options);

    } catch (error) {
      this.handleError(error, 'Empty file search failed');
    }
  }

  private async findLarge(searchPath: string, options: SearchCommandOptions): Promise<void> {
    try {
      this.setupLogger(options.verbose || false);
      await this.validatePath(searchPath);

      const minSize = this.parseSize(options.minSize || '100MB');
      const salvageOptions = this.createSalvageOptions(options);
      const searcher = new SalvageSearch(salvageOptions);
      this.setupEventHandlers(searcher);

      this.startSpinner(`Finding large files (>${this.formatBytes(minSize)}) in: ${searchPath}`);
      const largeFiles = await searcher.findLargeFiles(searchPath, minSize);
      this.succeedSpinner(`Found ${largeFiles.length} large files`);

      // Display results
      await this.displayLargeResults(largeFiles, options);

    } catch (error) {
      this.handleError(error, 'Large file search failed');
    }
  }

  private createSearchOptions(options: SearchCommandOptions): SearchOptions {
    const searchOptions: SearchOptions = {};

    if (options.pattern) {
      searchOptions.pattern = options.pattern;
      searchOptions.regex = options.regex || false;
      searchOptions.caseSensitive = options.caseSensitive || false;
      searchOptions.content = options.content || false;
    }

    if (options.type) {
      searchOptions.fileType = options.type;
    }

    if (options.minSize) {
      searchOptions.minSize = this.parseSize(options.minSize);
    }

    if (options.maxSize) {
      searchOptions.maxSize = this.parseSize(options.maxSize);
    }

    if (options.after) {
      searchOptions.dateFrom = new Date(options.after);
    }

    if (options.before) {
      searchOptions.dateTo = new Date(options.before);
    }

    return searchOptions;
  }

  private parseSize(sizeStr: string): number {
    const units: { [key: string]: number } = {
      'B': 1,
      'KB': 1024,
      'MB': 1024 * 1024,
      'GB': 1024 * 1024 * 1024,
      'TB': 1024 * 1024 * 1024 * 1024,
    };

    const match = sizeStr.match(/^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB|TB)$/i);
    if (!match) {
      throw new Error(`Invalid size format: ${sizeStr}`);
    }

    const value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();
    
    return Math.floor(value * units[unit]);
  }

  private async displaySearchResults(results: any, options: SearchCommandOptions): Promise<void> {
    if (results.totalMatches === 0) {
      console.log(chalk.yellow('No files found matching the search criteria.'));
      return;
    }

    // Summary
    this.displaySummary('Search Results', [
      { label: 'Matches Found', value: results.totalMatches, color: 'green' },
      { label: 'Search Time', value: this.formatDuration(results.searchTime), color: 'cyan' },
    ]);

    // Display matches based on format
    switch (options.format) {
      case 'json':
        await this.outputJSON(results, options.output);
        break;
      case 'csv':
        await this.outputCSV(results.matches, options.output);
        break;
      case 'table':
      default:
        this.displayMatchesTable(results.matches, options.output);
        break;
    }
  }

  private async displayDuplicateResults(duplicateGroups: any[], options: SearchCommandOptions): Promise<void> {
    if (duplicateGroups.length === 0) {
      console.log(chalk.yellow('No duplicate files found.'));
      return;
    }

    console.log(chalk.bold.red(`🔄 Found ${duplicateGroups.length} groups of duplicate files:`));
    console.log('─'.repeat(70));

    for (let i = 0; i < Math.min(duplicateGroups.length, 10); i++) {
      const group = duplicateGroups[i];
      const wastedSpace = group[0].size * (group.length - 1);
      
      console.log(chalk.yellow(`\nGroup ${i + 1}: ${group.length} files (${this.formatBytes(group[0].size)} each)`));
      console.log(chalk.gray(`Wasted space: ${this.formatBytes(wastedSpace)}`));
      
      for (const file of group) {
        console.log(`  • ${file.path}`);
      }
    }

    if (duplicateGroups.length > 10) {
      console.log(chalk.gray(`\n... and ${duplicateGroups.length - 10} more duplicate groups`));
    }

    // Calculate total wasted space
    const totalWasted = duplicateGroups.reduce((total, group) => {
      return total + (group[0].size * (group.length - 1));
    }, 0);

    console.log(chalk.bold(`\n💾 Total wasted space: ${this.formatBytes(totalWasted)}`));

    if (options.output) {
      await this.outputJSON({ duplicateGroups, totalWasted }, options.output);
    }
  }

  private async displayEmptyResults(emptyFiles: any[], options: SearchCommandOptions): Promise<void> {
    if (emptyFiles.length === 0) {
      console.log(chalk.yellow('No empty files found.'));
      return;
    }

    console.log(chalk.bold(`📄 Found ${emptyFiles.length} empty files:`));
    console.log('─'.repeat(50));

    for (const file of emptyFiles.slice(0, 20)) {
      console.log(`  • ${file.path}`);
    }

    if (emptyFiles.length > 20) {
      console.log(chalk.gray(`\n... and ${emptyFiles.length - 20} more empty files`));
    }

    if (options.output) {
      await this.outputJSON(emptyFiles, options.output);
    }
  }

  private async displayLargeResults(largeFiles: any[], options: SearchCommandOptions): Promise<void> {
    if (largeFiles.length === 0) {
      console.log(chalk.yellow('No large files found.'));
      return;
    }

    console.log(chalk.bold(`📏 Found ${largeFiles.length} large files:`));
    console.log('─'.repeat(70));

    for (const file of largeFiles.slice(0, 20)) {
      console.log(`${this.formatBytes(file.size).padEnd(12)} ${file.path}`);
    }

    if (largeFiles.length > 20) {
      console.log(chalk.gray(`\n... and ${largeFiles.length - 20} more large files`));
    }

    const totalSize = largeFiles.reduce((sum, file) => sum + file.size, 0);
    console.log(chalk.bold(`\n💾 Total size: ${this.formatBytes(totalSize)}`));

    if (options.output) {
      await this.outputJSON(largeFiles, options.output);
    }
  }

  private displayMatchesTable(matches: any[], outputFile?: string): void {
    console.log(chalk.bold('\n🔍 Search Results:'));
    console.log('─'.repeat(80));

    const displayMatches = matches.slice(0, 50);

    for (const match of displayMatches) {
      const typeIcon = match.isDirectory ? '📁' : '📄';
      const sizeStr = match.isDirectory ? '' : ` (${this.formatBytes(match.size)})`;
      const dateStr = match.modifiedAt.toISOString().substring(0, 10);
      
      console.log(`${typeIcon} ${match.path}${chalk.gray(sizeStr)} ${chalk.blue(dateStr)}`);
    }

    if (matches.length > 50) {
      console.log(chalk.gray(`\n... and ${matches.length - 50} more matches`));
      console.log(chalk.gray('Use --format json or --format csv for complete output'));
    }

    if (outputFile) {
      this.outputJSON(matches, outputFile);
    }
  }

  private async outputJSON(data: any, outputFile?: string): Promise<void> {
    const json = JSON.stringify(data, null, 2);
    
    if (outputFile) {
      const fs = require('fs/promises');
      await fs.writeFile(outputFile, json);
      console.log(chalk.green(`✓ Results saved to: ${outputFile}`));
    } else {
      console.log(json);
    }
  }

  private async outputCSV(matches: any[], outputFile?: string): Promise<void> {
    const headers = ['Path', 'Type', 'Size', 'Modified', 'Created', 'Hash'];
    const rows = matches.map(match => [
      match.path,
      match.isDirectory ? 'Directory' : 'File',
      match.size.toString(),
      match.modifiedAt.toISOString(),
      match.createdAt.toISOString(),
      match.hash || ''
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
}

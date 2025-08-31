import { Command } from 'commander';
import chalk from 'chalk';
import { BaseCommand, CommandOptions } from '../base-command';
import { SalvageAnalyzer } from '../../salvage-analyzer';

interface AnalyzeCommandOptions extends CommandOptions {
  report?: string;
  format?: 'json' | 'html' | 'txt';
  timeline?: boolean;
  duplicates?: boolean;
  suspicious?: boolean;
}

export class AnalyzeCommand extends BaseCommand {
  public register(program: Command): void {
    program
      .command('analyze <path>')
      .description('Analyze directory for insights, duplicates, and suspicious files')
      .option('-v, --verbose', 'Enable verbose output')
      .option('-r, --report <file>', 'Generate analysis report')
      .option('-f, --format <format>', 'Report format (json, html, txt)', 'html')
      .option('--include-hidden', 'Include hidden files in analysis')
      .option('--include-deleted', 'Include deleted files in analysis')
      .option('--max-depth <depth>', 'Maximum directory depth (-1 for unlimited)', parseInt)
      .option('--follow-symlinks', 'Follow symbolic links')
      .option('--timeline', 'Include file timeline analysis')
      .option('--duplicates', 'Focus on duplicate file analysis')
      .option('--suspicious', 'Focus on suspicious file detection')
      .action(async (path: string, options: AnalyzeCommandOptions) => {
        await this.execute(path, options);
      });
  }

  private async execute(analyzePath: string, options: AnalyzeCommandOptions): Promise<void> {
    try {
      // Setup
      this.setupLogger(options.verbose || false);
      await this.validatePath(analyzePath);

      if (options.report) {
        await this.validateOutputPath(options.report);
      }

      const salvageOptions = this.createSalvageOptions(options);
      const analyzer = new SalvageAnalyzer(salvageOptions);
      this.setupEventHandlers(analyzer);

      // Start analysis
      this.startSpinner(`Analyzing directory: ${analyzePath}`);
      const results = await analyzer.analyzeDirectory(analyzePath);
      this.succeedSpinner('Analysis completed');

      // Display results
      this.displayAnalysisResults(results, options);

      // Generate report if requested
      if (options.report) {
        await this.generateReport(results, options);
      }

    } catch (error) {
      this.handleError(error, 'Analysis failed');
    }
  }

  private displayAnalysisResults(results: any, options: AnalyzeCommandOptions): void {
    // Summary
    this.displaySummary('Analysis Summary', [
      { label: 'Total Files', value: results.totalFiles, color: 'green' },
      { label: 'Total Directories', value: results.totalDirectories, color: 'blue' },
      { label: 'Total Size', value: this.formatBytes(results.totalSize), color: 'yellow' },
      { label: 'File Types Found', value: Object.keys(results.fileTypes).length, color: 'cyan' },
      { label: 'Duplicate Groups', value: results.duplicateFiles.length, color: 'red' },
      { label: 'Suspicious Files', value: results.suspiciousFiles.length, color: 'magenta' },
    ]);

    // File types breakdown
    if (Object.keys(results.fileTypes).length > 0) {
      console.log(chalk.bold('📊 File Types:'));
      console.log('─'.repeat(40));
      
      const sortedTypes = Object.entries(results.fileTypes)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .slice(0, 10);
      
      for (const [type, count] of sortedTypes) {
        const percentage = ((count as number) / results.totalFiles * 100).toFixed(1);
        console.log(`${type.padEnd(15)}: ${count} (${percentage}%)`);
      }
      console.log('');
    }

    // Largest files
    if (results.largestFiles.length > 0) {
      console.log(chalk.bold('📏 Largest Files:'));
      console.log('─'.repeat(50));
      
      for (const file of results.largestFiles.slice(0, 5)) {
        console.log(`${this.formatBytes(file.size).padEnd(12)} ${file.path}`);
      }
      console.log('');
    }

    // Duplicate files
    if (results.duplicateFiles.length > 0 && (!options.suspicious || options.duplicates)) {
      console.log(chalk.bold.red(`🔄 Duplicate Files (${results.duplicateFiles.length} groups):`));
      console.log('─'.repeat(60));
      
      for (const group of results.duplicateFiles.slice(0, 3)) {
        console.log(chalk.yellow(`Group of ${group.length} files (${this.formatBytes(group[0].size)} each):`));
        for (const file of group) {
          console.log(`  • ${file.path}`);
        }
        console.log('');
      }
      
      if (results.duplicateFiles.length > 3) {
        console.log(chalk.gray(`... and ${results.duplicateFiles.length - 3} more duplicate groups`));
        console.log('');
      }
    }

    // Suspicious files
    if (results.suspiciousFiles.length > 0 && (!options.duplicates || options.suspicious)) {
      console.log(chalk.bold.red(`⚠️  Suspicious Files (${results.suspiciousFiles.length}):`));
      console.log('─'.repeat(50));
      
      for (const file of results.suspiciousFiles.slice(0, 10)) {
        const reasons = this.getSuspiciousReasons(file);
        console.log(`${file.path}`);
        console.log(chalk.gray(`  → ${reasons.join(', ')}`));
      }
      console.log('');
      
      if (results.suspiciousFiles.length > 10) {
        console.log(chalk.gray(`... and ${results.suspiciousFiles.length - 10} more suspicious files`));
        console.log('');
      }
    }

    // Timeline highlights
    if (options.timeline && results.timeline.length > 0) {
      console.log(chalk.bold('⏰ Recent Activity:'));
      console.log('─'.repeat(60));
      
      const recentEvents = results.timeline
        .slice(-10)
        .sort((a: any, b: any) => b.timestamp.getTime() - a.timestamp.getTime());
      
      for (const event of recentEvents) {
        const timeStr = event.timestamp.toISOString().replace('T', ' ').substring(0, 19);
        const eventIcon = this.getEventIcon(event.event);
        console.log(`${timeStr} ${eventIcon} ${event.event} ${event.file.path}`);
      }
      console.log('');
    }
  }

  private getSuspiciousReasons(file: any): string[] {
    const reasons = [];
    const path = require('path');
    const fileName = path.basename(file.path).toLowerCase();
    const ext = path.extname(fileName);
    
    // Suspicious extensions
    const suspiciousExts = ['.exe', '.bat', '.cmd', '.scr', '.vbs', '.js', '.ps1'];
    if (suspiciousExts.includes(ext)) {
      reasons.push('executable file');
    }
    
    // Suspicious names
    const suspiciousNames = ['password', 'secret', 'private', 'key', 'config'];
    if (suspiciousNames.some(name => fileName.includes(name))) {
      reasons.push('sensitive filename');
    }
    
    // Hidden files
    if (file.isHidden) {
      reasons.push('hidden file');
    }
    
    // Large hidden files
    if (file.isHidden && file.size > 1024 * 1024) {
      reasons.push('large hidden file');
    }
    
    // Unusual timestamps
    const now = new Date();
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    const oneYearFuture = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    
    if (file.modifiedAt < oneYearAgo || file.modifiedAt > oneYearFuture) {
      reasons.push('unusual timestamp');
    }
    
    return reasons.length > 0 ? reasons : ['flagged by analysis'];
  }

  private getEventIcon(event: string): string {
    const icons = {
      created: '📝',
      modified: '✏️',
      accessed: '👁️',
      deleted: '🗑️',
    };
    return icons[event] || '❓';
  }

  private async generateReport(results: any, options: AnalyzeCommandOptions): Promise<void> {
    const { SalvageReporter } = require('../../salvage-reporter');
    const reporter = new SalvageReporter();
    
    this.startSpinner(`Generating ${options.format} report...`);
    
    const reportOptions = {
      format: options.format || 'html',
      outputFile: options.report,
      includeTimeline: options.timeline || false,
    };
    
    try {
      await reporter.generateAnalysisReport(results, reportOptions);
      this.succeedSpinner(`Report generated: ${options.report}`);
    } catch (error) {
      this.failSpinner('Report generation failed');
      throw error;
    }
  }
}
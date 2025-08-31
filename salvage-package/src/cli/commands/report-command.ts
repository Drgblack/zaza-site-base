import { Command } from 'commander';
import chalk from 'chalk';
import { BaseCommand, CommandOptions } from '../base-command';
import { SalvageAnalyzer } from '../../salvage-analyzer';
import { SalvageReporter } from '../../salvage-reporter';

interface ReportCommandOptions extends CommandOptions {
  format?: 'json' | 'html' | 'txt' | 'csv';
  template?: string;
  timeline?: boolean;
  hashes?: boolean;
  content?: boolean;
}

export class ReportCommand extends BaseCommand {
  public register(program: Command): void {
    program
      .command('report <path> <output>')
      .description('Generate comprehensive analysis report')
      .option('-f, --format <format>', 'Report format (json, html, txt, csv)', 'html')
      .option('-v, --verbose', 'Enable verbose output')
      .option('--include-hidden', 'Include hidden files in report')
      .option('--include-deleted', 'Include deleted files in report')
      .option('--max-depth <depth>', 'Maximum directory depth (-1 for unlimited)', parseInt)
      .option('--follow-symlinks', 'Follow symbolic links')
      .option('--timeline', 'Include detailed file timeline')
      .option('--hashes', 'Include file hash information')
      .option('--content', 'Include content analysis (for text files)')
      .option('--template <file>', 'Custom report template file')
      .action(async (path: string, output: string, options: ReportCommandOptions) => {
        await this.execute(path, output, options);
      });

    // Add specialized report commands
    this.addSpecializedCommands(program);
  }

  private addSpecializedCommands(program: Command): void {
    // Security report
    program
      .command('security-report <path> <output>')
      .description('Generate security-focused analysis report')
      .option('-f, --format <format>', 'Report format (json, html, txt)', 'html')
      .option('-v, --verbose', 'Enable verbose output')
      .option('--include-hidden', 'Include hidden files')
      .action(async (path: string, output: string, options: ReportCommandOptions) => {
        await this.generateSecurityReport(path, output, options);
      });

    // Forensics report
    program
      .command('forensics-report <path> <output>')
      .description('Generate forensics-focused analysis report')
      .option('-f, --format <format>', 'Report format (json, html, txt)', 'html')
      .option('-v, --verbose', 'Enable verbose output')
      .option('--include-hidden', 'Include hidden files')
      .option('--include-deleted', 'Include deleted files')
      .option('--timeline', 'Include detailed timeline', true)
      .option('--hashes', 'Include file hashes', true)
      .action(async (path: string, output: string, options: ReportCommandOptions) => {
        await this.generateForensicsReport(path, output, options);
      });

    // Cleanup report
    program
      .command('cleanup-report <path> <output>')
      .description('Generate cleanup recommendations report')
      .option('-f, --format <format>', 'Report format (json, html, txt)', 'html')
      .option('-v, --verbose', 'Enable verbose output')
      .option('--include-hidden', 'Include hidden files')
      .action(async (path: string, output: string, options: ReportCommandOptions) => {
        await this.generateCleanupReport(path, output, options);
      });
  }

  private async execute(analysisPath: string, outputPath: string, options: ReportCommandOptions): Promise<void> {
    try {
      // Setup and validation
      this.setupLogger(options.verbose || false);
      await this.validatePath(analysisPath);
      await this.validateOutputPath(outputPath);

      // Perform analysis
      const analysisResults = await this.performAnalysis(analysisPath, options);

      // Generate report
      await this.generateStandardReport(analysisResults, outputPath, options);

      console.log(chalk.green(`✅ Report generated successfully: ${outputPath}`));

    } catch (error) {
      this.handleError(error, 'Report generation failed');
    }
  }

  private async generateSecurityReport(analysisPath: string, outputPath: string, options: ReportCommandOptions): Promise<void> {
    try {
      this.setupLogger(options.verbose || false);
      await this.validatePath(analysisPath);
      await this.validateOutputPath(outputPath);

      this.startSpinner('Performing security analysis...');
      
      const salvageOptions = this.createSalvageOptions(options);
      const analyzer = new SalvageAnalyzer(salvageOptions);
      this.setupEventHandlers(analyzer);

      const results = await analyzer.analyzeDirectory(analysisPath);
      
      // Focus on security-relevant data
      const securityReport = this.createSecurityReport(results);
      
      this.succeedSpinner('Security analysis completed');

      // Generate report
      const reporter = new SalvageReporter();
      const reportOptions = {
        format: options.format || 'html',
        outputFile: outputPath,
        includeHashes: true,
        includeTimeline: true,
      };

      await reporter.generateAnalysisReport(securityReport, reportOptions);
      
      this.displaySecuritySummary(securityReport);
      console.log(chalk.green(`🔒 Security report generated: ${outputPath}`));

    } catch (error) {
      this.handleError(error, 'Security report generation failed');
    }
  }

  private async generateForensicsReport(analysisPath: string, outputPath: string, options: ReportCommandOptions): Promise<void> {
    try {
      this.setupLogger(options.verbose || false);
      await this.validatePath(analysisPath);
      await this.validateOutputPath(outputPath);

      this.startSpinner('Performing forensics analysis...');
      
      const salvageOptions = this.createSalvageOptions({
        ...options,
        includeHidden: true,
        includeDeleted: true,
        preserveTimestamps: true,
      });
      
      const analyzer = new SalvageAnalyzer(salvageOptions);
      this.setupEventHandlers(analyzer);

      const results = await analyzer.analyzeDirectory(analysisPath);
      
      // Enhance for forensics
      const forensicsReport = this.createForensicsReport(results);
      
      this.succeedSpinner('Forensics analysis completed');

      // Generate comprehensive report
      const reporter = new SalvageReporter();
      const reportOptions = {
        format: options.format || 'html',
        outputFile: outputPath,
        includeHashes: true,
        includeTimeline: true,
        includeContent: true,
      };

      await reporter.generateAnalysisReport(forensicsReport, reportOptions);
      
      this.displayForensicsSummary(forensicsReport);
      console.log(chalk.green(`🔬 Forensics report generated: ${outputPath}`));

    } catch (error) {
      this.handleError(error, 'Forensics report generation failed');
    }
  }

  private async generateCleanupReport(analysisPath: string, outputPath: string, options: ReportCommandOptions): Promise<void> {
    try {
      this.setupLogger(options.verbose || false);
      await this.validatePath(analysisPath);
      await this.validateOutputPath(outputPath);

      this.startSpinner('Analyzing for cleanup opportunities...');
      
      const salvageOptions = this.createSalvageOptions(options);
      const analyzer = new SalvageAnalyzer(salvageOptions);
      this.setupEventHandlers(analyzer);

      const results = await analyzer.analyzeDirectory(analysisPath);
      
      // Focus on cleanup opportunities
      const cleanupReport = this.createCleanupReport(results);
      
      this.succeedSpinner('Cleanup analysis completed');

      // Generate report
      const reporter = new SalvageReporter();
      const reportOptions = {
        format: options.format || 'html',
        outputFile: outputPath,
      };

      await reporter.generateAnalysisReport(cleanupReport, reportOptions);
      
      this.displayCleanupSummary(cleanupReport);
      console.log(chalk.green(`🧹 Cleanup report generated: ${outputPath}`));

    } catch (error) {
      this.handleError(error, 'Cleanup report generation failed');
    }
  }

  private async performAnalysis(analysisPath: string, options: ReportCommandOptions): Promise<any> {
    this.startSpinner(`Analyzing directory: ${analysisPath}`);
    
    const salvageOptions = this.createSalvageOptions(options);
    const analyzer = new SalvageAnalyzer(salvageOptions);
    this.setupEventHandlers(analyzer);

    const results = await analyzer.analyzeDirectory(analysisPath);
    
    this.succeedSpinner('Analysis completed');
    
    return results;
  }

  private async generateStandardReport(results: any, outputPath: string, options: ReportCommandOptions): Promise<void> {
    this.startSpinner('Generating report...');
    
    const reporter = new SalvageReporter();
    const reportOptions = {
      format: options.format || 'html',
      outputFile: outputPath,
      includeHashes: options.hashes || false,
      includeTimeline: options.timeline || false,
      includeContent: options.content || false,
    };

    await reporter.generateAnalysisReport(results, reportOptions);
    
    this.succeedSpinner('Report generated');
  }

  private createSecurityReport(results: any): any {
    // Filter and enhance results for security focus
    const securityFiles = results.suspiciousFiles.concat(
      results.largestFiles.filter((file: any) => this.isSecurityRelevant(file))
    );

    return {
      ...results,
      securityFiles,
      securityScore: this.calculateSecurityScore(results),
      recommendations: this.generateSecurityRecommendations(results),
    };
  }

  private createForensicsReport(results: any): any {
    // Enhance results for forensics analysis
    return {
      ...results,
      forensicsMetadata: {
        analysisDate: new Date().toISOString(),
        toolVersion: require('../../../package.json').version,
        analysisDepth: 'comprehensive',
      },
      evidenceChain: this.createEvidenceChain(results),
      recommendations: this.generateForensicsRecommendations(results),
    };
  }

  private createCleanupReport(results: any): any {
    // Calculate potential space savings
    const duplicateSpace = results.duplicateFiles.reduce((total: number, group: any[]) => {
      return total + (group[0].size * (group.length - 1));
    }, 0);

    const emptyFileCount = results.largestFiles.filter((file: any) => file.size === 0).length;
    
    return {
      ...results,
      cleanupOpportunities: {
        duplicateSpace,
        emptyFileCount,
        totalSavings: duplicateSpace,
      },
      recommendations: this.generateCleanupRecommendations(results, duplicateSpace),
    };
  }

  private isSecurityRelevant(file: any): boolean {
    const path = require('path');
    const fileName = path.basename(file.path).toLowerCase();
    const securityKeywords = [
      'password', 'secret', 'key', 'token', 'cert', 'private',
      'config', 'env', 'credential', 'auth', 'login'
    ];
    
    return securityKeywords.some(keyword => fileName.includes(keyword)) ||
           file.isHidden ||
           file.size > 100 * 1024 * 1024; // Large files > 100MB
  }

  private calculateSecurityScore(results: any): number {
    let score = 100;
    
    // Deduct points for suspicious files
    score -= Math.min(results.suspiciousFiles.length * 5, 30);
    
    // Deduct points for hidden files
    const hiddenFiles = results.largestFiles.filter((f: any) => f.isHidden).length;
    score -= Math.min(hiddenFiles * 2, 20);
    
    return Math.max(score, 0);
  }

  private generateSecurityRecommendations(results: any): string[] {
    const recommendations = [];
    
    if (results.suspiciousFiles.length > 0) {
      recommendations.push(`Review ${results.suspiciousFiles.length} suspicious files for potential security risks`);
    }
    
    if (results.duplicateFiles.length > 0) {
      recommendations.push('Remove duplicate files to reduce attack surface');
    }
    
    const hiddenFiles = results.largestFiles.filter((f: any) => f.isHidden);
    if (hiddenFiles.length > 0) {
      recommendations.push(`Investigate ${hiddenFiles.length} hidden files`);
    }
    
    return recommendations;
  }

  private createEvidenceChain(results: any): any {
    return {
      preservationMethod: 'hash-based integrity verification',
      chainOfCustody: [{
        timestamp: new Date().toISOString(),
        action: 'analysis performed',
        tool: 'salvage-cli',
        hash: 'sha256', // Would contain actual hash in real implementation
      }],
      integrityChecks: results.largestFiles.map((file: any) => ({
        path: file.path,
        hash: file.hash,
        timestamp: file.modifiedAt,
      })),
    };
  }

  private generateForensicsRecommendations(results: any): string[] {
    const recommendations = [];
    
    recommendations.push('Preserve original timestamps and file metadata');
    recommendations.push('Verify file integrity using provided hashes');
    
    if (results.timeline.length > 0) {
      recommendations.push('Review timeline for suspicious activity patterns');
    }
    
    if (results.suspiciousFiles.length > 0) {
      recommendations.push('Perform detailed analysis of flagged suspicious files');
    }
    
    return recommendations;
  }

  private generateCleanupRecommendations(results: any, duplicateSpace: number): string[] {
    const recommendations = [];
    
    if (duplicateSpace > 0) {
      recommendations.push(`Remove duplicate files to free up ${this.formatBytes(duplicateSpace)}`);
    }
    
    const largeFiles = results.largestFiles.filter((f: any) => f.size > 100 * 1024 * 1024);
    if (largeFiles.length > 0) {
      recommendations.push(`Review ${largeFiles.length} large files for archival or deletion`);
    }
    
    const oldFiles = results.largestFiles.filter((f: any) => {
      const age = Date.now() - new Date(f.modifiedAt).getTime();
      return age > 365 * 24 * 60 * 60 * 1000; // Older than 1 year
    });
    
    if (oldFiles.length > 0) {
      recommendations.push(`Consider archiving ${oldFiles.length} files older than 1 year`);
    }
    
    return recommendations;
  }

  private displaySecuritySummary(report: any): void {
    this.displaySummary('Security Analysis', [
      { label: 'Security Score', value: `${report.securityScore}/100`, color: report.securityScore > 80 ? 'green' : 'red' },
      { label: 'Suspicious Files', value: report.suspiciousFiles.length, color: 'red' },
      { label: 'Recommendations', value: report.recommendations.length, color: 'yellow' },
    ]);
  }

  private displayForensicsSummary(report: any): void {
    this.displaySummary('Forensics Analysis', [
      { label: 'Evidence Files', value: report.evidenceChain.integrityChecks.length, color: 'blue' },
      { label: 'Timeline Events', value: report.timeline.length, color: 'cyan' },
      { label: 'Hash Verified', value: report.largestFiles.filter((f: any) => f.hash).length, color: 'green' },
    ]);
  }

  private displayCleanupSummary(report: any): void {
    const opportunities = report.cleanupOpportunities;
    
    this.displaySummary('Cleanup Opportunities', [
      { label: 'Duplicate Space', value: this.formatBytes(opportunities.duplicateSpace), color: 'yellow' },
      { label: 'Empty Files', value: opportunities.emptyFileCount, color: 'gray' },
      { label: 'Total Savings', value: this.formatBytes(opportunities.totalSavings), color: 'green' },
    ]);
  }
}
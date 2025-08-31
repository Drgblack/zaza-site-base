import * as fs from 'fs/promises';
import * as path from 'path';
import { 
  FileMetadata, 
  AnalysisResult, 
  SearchResult, 
  RecoveryResult, 
  ReportOptions,
  SalvageOptions 
} from './types';
import { SalvageCore } from './salvage-core';
import { FileSystemUtils } from './utils/fs-utils';

export class SalvageReporter extends SalvageCore {
  private fsUtils: FileSystemUtils;

  constructor(options: SalvageOptions = {}) {
    super(options);
    this.fsUtils = new FileSystemUtils();
  }

  public async generateAnalysisReport(
    analysisResult: AnalysisResult,
    options: ReportOptions
  ): Promise<string> {
    this.emitEvent('info', `Generating ${options.format} analysis report`);

    const reportContent = await this.formatAnalysisReport(analysisResult, options);
    
    if (options.outputFile) {
      await this.writeReportToFile(reportContent, options.outputFile);
      this.emitEvent('info', `Report saved to: ${options.outputFile}`);
      return options.outputFile;
    }

    return reportContent;
  }

  public async generateSearchReport(
    searchResult: SearchResult,
    options: ReportOptions
  ): Promise<string> {
    this.emitEvent('info', `Generating ${options.format} search report`);

    const reportContent = await this.formatSearchReport(searchResult, options);
    
    if (options.outputFile) {
      await this.writeReportToFile(reportContent, options.outputFile);
      this.emitEvent('info', `Report saved to: ${options.outputFile}`);
      return options.outputFile;
    }

    return reportContent;
  }

  public async generateRecoveryReport(
    recoveryResult: RecoveryResult,
    options: ReportOptions
  ): Promise<string> {
    this.emitEvent('info', `Generating ${options.format} recovery report`);

    const reportContent = await this.formatRecoveryReport(recoveryResult, options);
    
    if (options.outputFile) {
      await this.writeReportToFile(reportContent, options.outputFile);
      this.emitEvent('info', `Report saved to: ${options.outputFile}`);
      return options.outputFile;
    }

    return reportContent;
  }

  private async formatAnalysisReport(
    result: AnalysisResult,
    options: ReportOptions
  ): Promise<string> {
    switch (options.format) {
      case 'json':
        return JSON.stringify(result, null, 2);
      
      case 'csv':
        return this.formatAnalysisAsCSV(result, options);
      
      case 'html':
        return this.formatAnalysisAsHTML(result, options);
      
      case 'txt':
      default:
        return this.formatAnalysisAsText(result, options);
    }
  }

  private formatAnalysisAsText(result: AnalysisResult, options: ReportOptions): string {
    const lines: string[] = [];
    
    lines.push('SALVAGE ANALYSIS REPORT');
    lines.push('======================');
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push('');
    
    // Summary
    lines.push('SUMMARY');
    lines.push('-------');
    lines.push(`Total Files: ${result.totalFiles.toLocaleString()}`);
    lines.push(`Total Directories: ${result.totalDirectories.toLocaleString()}`);
    lines.push(`Total Size: ${this.formatBytes(result.totalSize)}`);
    lines.push('');

    // File Types
    lines.push('FILE TYPES');
    lines.push('----------');
    const sortedTypes = Object.entries(result.fileTypes)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20); // Top 20 file types
    
    for (const [type, count] of sortedTypes) {
      lines.push(`${type.padEnd(20)}: ${count.toLocaleString()}`);
    }
    lines.push('');

    // Largest Files
    if (result.largestFiles.length > 0) {
      lines.push('LARGEST FILES');
      lines.push('-------------');
      for (const file of result.largestFiles.slice(0, 10)) {
        lines.push(`${this.formatBytes(file.size).padEnd(12)} ${file.path}`);
      }
      lines.push('');
    }

    // Duplicate Files
    if (result.duplicateFiles.length > 0) {
      lines.push('DUPLICATE FILES');
      lines.push('---------------');
      lines.push(`Found ${result.duplicateFiles.length} groups of duplicate files:`);
      for (const group of result.duplicateFiles.slice(0, 10)) {
        lines.push(`\nGroup (${group.length} files, ${this.formatBytes(group[0].size)} each):`);
        for (const file of group) {
          lines.push(`  ${file.path}`);
        }
      }
      lines.push('');
    }

    // Suspicious Files
    if (result.suspiciousFiles.length > 0) {
      lines.push('SUSPICIOUS FILES');
      lines.push('----------------');
      for (const file of result.suspiciousFiles.slice(0, 20)) {
        lines.push(`${file.path} (${this.formatBytes(file.size)})`);
      }
      lines.push('');
    }

    // Timeline
    if (options.includeTimeline && result.timeline.length > 0) {
      lines.push('RECENT ACTIVITY');
      lines.push('---------------');
      const recentEvents = result.timeline
        .slice(-20)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      
      for (const event of recentEvents) {
        lines.push(`${event.timestamp.toISOString()} ${event.event.padEnd(10)} ${event.file.path}`);
      }
    }

    return lines.join('\n');
  }

  private formatAnalysisAsCSV(result: AnalysisResult, _options: ReportOptions): string {
    const lines: string[] = [];
    
    // Header
    lines.push('Type,Path,Size,Modified,Created,Accessed,Hash');
    
    // Combine all files for CSV export
    const allFiles: FileMetadata[] = [];
    
    // Add largest files
    allFiles.push(...result.largestFiles);
    
    // Add suspicious files
    allFiles.push(...result.suspiciousFiles);
    
    // Add duplicate files
    for (const group of result.duplicateFiles) {
      allFiles.push(...group);
    }

    // Remove duplicates and sort
    const uniqueFiles = Array.from(
      new Map(allFiles.map(f => [f.path, f])).values()
    ).sort((a, b) => a.path.localeCompare(b.path));

    for (const file of uniqueFiles) {
      const row = [
        file.isDirectory ? 'Directory' : 'File',
        `"${file.path.replace(/"/g, '""')}"`,
        file.size.toString(),
        file.modifiedAt.toISOString(),
        file.createdAt.toISOString(),
        file.accessedAt.toISOString(),
        file.hash || ''
      ];
      lines.push(row.join(','));
    }

    return lines.join('\n');
  }

  private formatAnalysisAsHTML(result: AnalysisResult, options: ReportOptions): string {
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Salvage Analysis Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; border-bottom: 2px solid #333; }
        h2 { color: #666; border-bottom: 1px solid #ccc; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .number { text-align: right; }
        .suspicious { background-color: #fff3cd; }
        .duplicate { background-color: #d1ecf1; }
    </style>
</head>
<body>
    <h1>Salvage Analysis Report</h1>
    <p><strong>Generated:</strong> ${new Date().toISOString()}</p>
    
    <h2>Summary</h2>
    <table>
        <tr><td>Total Files</td><td class="number">${result.totalFiles.toLocaleString()}</td></tr>
        <tr><td>Total Directories</td><td class="number">${result.totalDirectories.toLocaleString()}</td></tr>
        <tr><td>Total Size</td><td class="number">${this.formatBytes(result.totalSize)}</td></tr>
    </table>

    <h2>File Types</h2>
    <table>
        <tr><th>Extension</th><th>Count</th></tr>
        ${Object.entries(result.fileTypes)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 20)
          .map(([type, count]) => 
            `<tr><td>${type}</td><td class="number">${count.toLocaleString()}</td></tr>`
          ).join('')}
    </table>

    <h2>Largest Files</h2>
    <table>
        <tr><th>Path</th><th>Size</th><th>Modified</th></tr>
        ${result.largestFiles.slice(0, 10).map(file =>
          `<tr><td>${file.path}</td><td class="number">${this.formatBytes(file.size)}</td><td>${file.modifiedAt.toISOString()}</td></tr>`
        ).join('')}
    </table>

    ${result.suspiciousFiles.length > 0 ? `
    <h2>Suspicious Files</h2>
    <table>
        <tr><th>Path</th><th>Size</th><th>Modified</th></tr>
        ${result.suspiciousFiles.slice(0, 20).map(file =>
          `<tr class="suspicious"><td>${file.path}</td><td class="number">${this.formatBytes(file.size)}</td><td>${file.modifiedAt.toISOString()}</td></tr>`
        ).join('')}
    </table>
    ` : ''}

    ${result.duplicateFiles.length > 0 ? `
    <h2>Duplicate Files</h2>
    ${result.duplicateFiles.slice(0, 10).map(group => `
        <h3>Duplicate Group (${group.length} files, ${this.formatBytes(group[0].size)} each)</h3>
        <table>
            <tr><th>Path</th><th>Modified</th></tr>
            ${group.map(file =>
              `<tr class="duplicate"><td>${file.path}</td><td>${file.modifiedAt.toISOString()}</td></tr>`
            ).join('')}
        </table>
    `).join('')}
    ` : ''}

    ${options.includeTimeline && result.timeline.length > 0 ? `
    <h2>Recent Activity</h2>
    <table>
        <tr><th>Timestamp</th><th>Event</th><th>File</th></tr>
        ${result.timeline.slice(-20).reverse().map(event =>
          `<tr><td>${event.timestamp.toISOString()}</td><td>${event.event}</td><td>${event.file.path}</td></tr>`
        ).join('')}
    </table>
    ` : ''}
</body>
</html>`;

    return html;
  }

  private async formatSearchReport(result: SearchResult, options: ReportOptions): Promise<string> {
    switch (options.format) {
      case 'json':
        return JSON.stringify(result, null, 2);
      
      case 'csv':
        return this.formatSearchAsCSV(result);
      
      case 'html':
        return this.formatSearchAsHTML(result);
      
      case 'txt':
      default:
        return this.formatSearchAsText(result);
    }
  }

  private formatSearchAsText(result: SearchResult): string {
    const lines: string[] = [];
    
    lines.push('SALVAGE SEARCH REPORT');
    lines.push('====================');
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push(`Search completed in: ${result.searchTime}ms`);
    lines.push(`Total matches: ${result.totalMatches}`);
    lines.push('');

    // Search parameters
    lines.push('SEARCH PARAMETERS');
    lines.push('-----------------');
    if (result.query.pattern) lines.push(`Pattern: ${result.query.pattern}`);
    if (result.query.regex) lines.push(`Regex: ${result.query.regex}`);
    if (result.query.caseSensitive) lines.push(`Case sensitive: ${result.query.caseSensitive}`);
    if (result.query.fileType) lines.push(`File type: ${result.query.fileType}`);
    if (result.query.minSize) lines.push(`Min size: ${this.formatBytes(result.query.minSize)}`);
    if (result.query.maxSize) lines.push(`Max size: ${this.formatBytes(result.query.maxSize)}`);
    lines.push('');

    // Results
    lines.push('RESULTS');
    lines.push('-------');
    for (const file of result.matches) {
      lines.push(`${this.formatBytes(file.size).padEnd(12)} ${file.modifiedAt.toISOString()} ${file.path}`);
    }

    return lines.join('\n');
  }

  private formatSearchAsCSV(result: SearchResult): string {
    const lines: string[] = [];
    
    lines.push('Path,Size,Type,Modified,Created,Hash');
    
    for (const file of result.matches) {
      const row = [
        `"${file.path.replace(/"/g, '""')}"`,
        file.size.toString(),
        file.isDirectory ? 'Directory' : 'File',
        file.modifiedAt.toISOString(),
        file.createdAt.toISOString(),
        file.hash || ''
      ];
      lines.push(row.join(','));
    }

    return lines.join('\n');
  }

  private formatSearchAsHTML(result: SearchResult): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Salvage Search Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; border-bottom: 2px solid #333; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .number { text-align: right; }
    </style>
</head>
<body>
    <h1>Salvage Search Report</h1>
    <p><strong>Generated:</strong> ${new Date().toISOString()}</p>
    <p><strong>Search Time:</strong> ${result.searchTime}ms</p>
    <p><strong>Total Matches:</strong> ${result.totalMatches}</p>
    
    <h2>Results</h2>
    <table>
        <tr><th>Path</th><th>Size</th><th>Type</th><th>Modified</th></tr>
        ${result.matches.map(file =>
          `<tr><td>${file.path}</td><td class="number">${this.formatBytes(file.size)}</td><td>${file.isDirectory ? 'Directory' : 'File'}</td><td>${file.modifiedAt.toISOString()}</td></tr>`
        ).join('')}
    </table>
</body>
</html>`;
  }

  private async formatRecoveryReport(result: RecoveryResult, options: ReportOptions): Promise<string> {
    switch (options.format) {
      case 'json':
        return JSON.stringify(result, null, 2);
      
      case 'csv':
        return this.formatRecoveryAsCSV(result);
      
      case 'html':
        return this.formatRecoveryAsHTML(result);
      
      case 'txt':
      default:
        return this.formatRecoveryAsText(result);
    }
  }

  private formatRecoveryAsText(result: RecoveryResult): string {
    const lines: string[] = [];
    
    lines.push('SALVAGE RECOVERY REPORT');
    lines.push('======================');
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push(`Recovery Duration: ${result.duration}ms`);
    lines.push(`Success: ${result.success ? 'YES' : 'NO'}`);
    lines.push('');

    lines.push('SUMMARY');
    lines.push('-------');
    lines.push(`Total Files: ${result.totalFiles}`);
    lines.push(`Recovered Files: ${result.recoveredFiles.length}`);
    lines.push(`Total Size: ${this.formatBytes(result.totalSize)}`);
    lines.push(`Errors: ${result.errors.length}`);
    lines.push('');

    if (result.errors.length > 0) {
      lines.push('ERRORS');
      lines.push('------');
      for (const error of result.errors) {
        lines.push(`- ${error}`);
      }
      lines.push('');
    }

    lines.push('RECOVERED FILES');
    lines.push('---------------');
    for (const file of result.recoveredFiles) {
      lines.push(`${this.formatBytes(file.size).padEnd(12)} ${file.path}`);
    }

    return lines.join('\n');
  }

  private formatRecoveryAsCSV(result: RecoveryResult): string {
    const lines: string[] = [];
    
    lines.push('Status,Path,Size,Type,Modified');
    
    for (const file of result.recoveredFiles) {
      const row = [
        'Recovered',
        `"${file.path.replace(/"/g, '""')}"`,
        file.size.toString(),
        file.isDirectory ? 'Directory' : 'File',
        file.modifiedAt.toISOString()
      ];
      lines.push(row.join(','));
    }

    return lines.join('\n');
  }

  private formatRecoveryAsHTML(result: RecoveryResult): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Salvage Recovery Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #333; border-bottom: 2px solid #333; }
        .success { color: #28a745; }
        .error { color: #dc3545; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .number { text-align: right; }
    </style>
</head>
<body>
    <h1>Salvage Recovery Report</h1>
    <p><strong>Generated:</strong> ${new Date().toISOString()}</p>
    <p><strong>Duration:</strong> ${result.duration}ms</p>
    <p><strong>Status:</strong> <span class="${result.success ? 'success' : 'error'}">${result.success ? 'SUCCESS' : 'FAILED'}</span></p>
    
    <h2>Summary</h2>
    <table>
        <tr><td>Total Files</td><td class="number">${result.totalFiles}</td></tr>
        <tr><td>Recovered Files</td><td class="number">${result.recoveredFiles.length}</td></tr>
        <tr><td>Total Size</td><td class="number">${this.formatBytes(result.totalSize)}</td></tr>
        <tr><td>Errors</td><td class="number">${result.errors.length}</td></tr>
    </table>

    ${result.errors.length > 0 ? `
    <h2>Errors</h2>
    <ul>
        ${result.errors.map(error => `<li class="error">${error}</li>`).join('')}
    </ul>
    ` : ''}

    <h2>Recovered Files</h2>
    <table>
        <tr><th>Path</th><th>Size</th><th>Type</th><th>Modified</th></tr>
        ${result.recoveredFiles.map(file =>
          `<tr><td>${file.path}</td><td class="number">${this.formatBytes(file.size)}</td><td>${file.isDirectory ? 'Directory' : 'File'}</td><td>${file.modifiedAt.toISOString()}</td></tr>`
        ).join('')}
    </table>
</body>
</html>`;
  }

  private async writeReportToFile(content: string, filePath: string): Promise<void> {
    const dir = path.dirname(filePath);
    await this.fsUtils.ensureDirectory(dir);
    await fs.writeFile(filePath, content, 'utf8');
  }

  private formatBytes(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  }

  private emitEvent(type: 'info' | 'progress' | 'error' | 'warning', message: string): void {
    this.emit(type, { type, message, timestamp: new Date() });
  }
}

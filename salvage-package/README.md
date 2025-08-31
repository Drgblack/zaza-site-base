# Salvage

A comprehensive data recovery and analysis toolkit for file system forensics.

## Overview

Salvage is a powerful Node.js library and CLI tool designed for data recovery, file system analysis, and digital forensics. It provides a comprehensive set of tools for scanning directories, analyzing file metadata, detecting suspicious files, recovering data, and generating detailed reports.

## Features

- **🔍 Directory Scanning**: Deep scan directories with configurable options
- **📊 File Analysis**: Comprehensive file metadata analysis and reporting
- **💾 Data Recovery**: Recover files from damaged or corrupted sources
- **🔍 Advanced Search**: Search files by name, content, size, date, and type
- **📋 Report Generation**: Generate detailed reports in multiple formats (HTML, JSON, CSV, TXT)
- **🔒 Security Analysis**: Detect suspicious files and security threats
- **🔬 Forensics Tools**: Timeline analysis and evidence preservation
- **📦 Backup & Archive**: Create compressed backups and archives
- **⚡ Progress Tracking**: Real-time progress monitoring and ETA calculation
- **🛡️ Integrity Verification**: Hash-based file integrity checking

## Installation

```bash
npm install salvage
```

Or install globally for CLI usage:

```bash
npm install -g salvage
```

## Quick Start

### CLI Usage

```bash
# Scan a directory
salvage scan /path/to/directory

# Analyze for security issues
salvage analyze /path/to/directory --report analysis.html

# Search for specific files
salvage search /path/to/directory --pattern "*.pdf" --min-size 1MB

# Recover data
salvage recover copy /source/path /destination/path

# Generate forensics report
salvage forensics-report /path/to/directory forensics.html
```

### Library Usage

```javascript
const { SalvageCore, SalvageAnalyzer, SalvageRecovery } = require('salvage');

// Basic directory scanning
const salvage = new SalvageCore({
  verbose: true,
  includeHidden: false,
  maxDepth: 5
});

const files = await salvage.scanDirectory('/path/to/scan');
console.log(`Found ${files.length} files`);

// Advanced analysis
const analyzer = new SalvageAnalyzer();
const results = await analyzer.analyzeDirectory('/path/to/analyze');

console.log(`Suspicious files: ${results.suspiciousFiles.length}`);
console.log(`Duplicate groups: ${results.duplicateFiles.length}`);

// Data recovery
const recovery = new SalvageRecovery();
const result = await recovery.recoverDirectory('/source', '/destination');

if (result.success) {
  console.log(`Recovered ${result.recoveredFiles.length} files`);
}
```

## API Reference

### SalvageCore

The core scanning and file metadata functionality.

```javascript
const core = new SalvageCore(options);

// Options:
// - verbose: boolean - Enable verbose logging
// - includeHidden: boolean - Include hidden files
// - includeDeleted: boolean - Include deleted files (if detectable)
// - maxDepth: number - Maximum directory depth (-1 for unlimited)
// - followSymlinks: boolean - Follow symbolic links
// - preserveTimestamps: boolean - Preserve original timestamps

// Scan directory
const files = await core.scanDirectory('/path');

// Get file metadata
const metadata = await core.getFileMetadata('/path/to/file');
```

### SalvageAnalyzer

Advanced analysis and pattern detection.

```javascript
const analyzer = new SalvageAnalyzer(options);

// Analyze directory
const results = await analyzer.analyzeDirectory('/path');

// Results include:
// - totalFiles, totalDirectories, totalSize
// - fileTypes breakdown
// - largestFiles array
// - duplicateFiles array (grouped by hash)
// - suspiciousFiles array
// - timeline array of file events

// Compare directories
const comparison = await analyzer.compareDirectories('/path1', '/path2');
```

### SalvageSearch

File search and filtering capabilities.

```javascript
const searcher = new SalvageSearch(options);

// Search with various criteria
const results = await searcher.search('/path', {
  pattern: '*.pdf',           // Filename pattern
  regex: false,               // Use regex for pattern
  caseSensitive: false,       // Case sensitive search
  content: true,              // Search within file content
  fileType: 'document',       // File type category
  minSize: 1024 * 1024,      // Minimum size in bytes
  maxSize: 100 * 1024 * 1024, // Maximum size in bytes
  dateFrom: new Date('2023-01-01'),
  dateTo: new Date('2023-12-31')
});

// Find duplicates
const duplicates = await searcher.findDuplicatesByName('/path');

// Find empty files
const empty = await searcher.findEmptyFiles('/path');

// Find large files
const large = await searcher.findLargeFiles('/path', 100 * 1024 * 1024);
```

### SalvageRecovery

Data recovery and backup functionality.

```javascript
const recovery = new SalvageRecovery(options);

// Recover directory
const result = await recovery.recoverDirectory('/source', '/destination');

// Create backup
const backup = await recovery.createBackup('/source', '/backup.zip', true);

// Recovery results include:
// - success: boolean
// - recoveredFiles: FileMetadata[]
// - errors: string[]
// - totalFiles, totalSize, duration
```

### SalvageReporter

Report generation in multiple formats.

```javascript
const reporter = new SalvageReporter();

// Generate analysis report
await reporter.generateAnalysisReport(analysisResults, {
  format: 'html',              // 'json', 'csv', 'html', 'txt'
  outputFile: 'report.html',
  includeHashes: true,
  includeTimeline: true,
  includeContent: false
});

// Generate search report
await reporter.generateSearchReport(searchResults, options);

// Generate recovery report
await reporter.generateRecoveryReport(recoveryResults, options);
```

## CLI Commands

### scan

Scan directory and list all files with metadata.

```bash
salvage scan <path> [options]

Options:
  -o, --output <file>      Output results to file
  -f, --format <format>    Output format (json, csv, table)
  --include-hidden         Include hidden files
  --include-deleted        Include deleted files
  --max-depth <depth>      Maximum directory depth
  --follow-symlinks        Follow symbolic links
  --show-hashes           Calculate and show file hashes
```

### analyze

Analyze directory for insights, duplicates, and suspicious files.

```bash
salvage analyze <path> [options]

Options:
  -r, --report <file>      Generate analysis report
  -f, --format <format>    Report format (json, html, txt)
  --include-hidden         Include hidden files
  --timeline              Include file timeline analysis
  --duplicates            Focus on duplicate file analysis
  --suspicious            Focus on suspicious file detection
```

### search

Search for files based on various criteria.

```bash
salvage search <path> [options]

Options:
  -p, --pattern <pattern>  Search pattern (filename)
  -r, --regex             Use regular expressions
  -i, --case-sensitive    Case sensitive search
  -c, --content           Search within file content
  -t, --type <type>       File type filter
  --min-size <size>       Minimum file size
  --max-size <size>       Maximum file size
  --after <date>          Files modified after date
  --before <date>         Files modified before date
```

### recover

Recover files from damaged or deleted sources.

```bash
# Copy files with verification
salvage recover copy <source> <destination> [options]

# Create backup archive
salvage recover backup <source> [destination] [options]

# Restore from backup
salvage recover restore <archive> <destination> [options]

Options:
  --verify                Verify files with checksums
  --compress              Create compressed backup
  --force                 Overwrite existing files
  --no-preserve-timestamps Don't preserve timestamps
```

### report

Generate comprehensive analysis reports.

```bash
salvage report <path> <output> [options]

Options:
  -f, --format <format>    Report format (json, html, txt, csv)
  --timeline              Include detailed timeline
  --hashes                Include file hash information
  --content               Include content analysis
```

### Specialized Commands

```bash
# Find duplicate files
salvage duplicates <path> [options]

# Find empty files
salvage empty <path> [options]

# Find large files
salvage large <path> [options]

# Security-focused report
salvage security-report <path> <output> [options]

# Forensics analysis
salvage forensics-report <path> <output> [options]

# Cleanup recommendations
salvage cleanup-report <path> <output> [options]
```

## Configuration

### Environment Variables

- `SALVAGE_LOG_LEVEL`: Set logging level (error, warn, info, debug, trace)
- `SALVAGE_MAX_FILE_SIZE`: Maximum file size to process (default: 1GB)
- `SALVAGE_TEMP_DIR`: Temporary directory for processing

### Configuration File

Create a `.salvagerc.json` file in your project root:

```json
{
  "verbose": false,
  "includeHidden": false,
  "maxDepth": -1,
  "preserveTimestamps": true,
  "defaultOutputFormat": "html",
  "hashAlgorithm": "sha256",
  "compressionLevel": 6
}
```

## Examples

See the `/examples` directory for detailed usage examples:

- `basic-usage.js` - Basic library usage and directory scanning
- `forensics-analysis.js` - Advanced forensics analysis workflow
- `data-recovery.js` - Comprehensive data recovery example

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testNamePattern="SalvageCore"
```

## Performance

Salvage is designed to handle large file systems efficiently:

- **Streaming**: Large files are processed in chunks to minimize memory usage
- **Parallel Processing**: Multiple files can be processed concurrently
- **Progress Tracking**: Real-time progress reporting for long operations
- **Configurable Limits**: Adjustable depth and size limits to control resource usage

Typical performance on modern hardware:
- **Scanning**: ~1000-5000 files/second
- **Hashing**: ~50-200 MB/second depending on storage speed
- **Recovery**: ~30-100 MB/second depending on source/destination performance

## Security Considerations

- **Input Validation**: All file paths and parameters are validated
- **Path Traversal Protection**: Built-in protection against directory traversal attacks
- **Permission Checking**: Respects file system permissions
- **Safe Defaults**: Conservative defaults for potentially dangerous operations
- **Hash Verification**: Integrity checking for recovered files

## Troubleshooting

### Common Issues

**"Permission denied" errors:**
- Ensure you have appropriate read permissions
- Try running with elevated privileges if necessary
- Check file system permissions and ownership

**"Out of memory" errors:**
- Reduce `maxDepth` to limit recursion
- Process directories in smaller batches
- Increase Node.js memory limit: `node --max-old-space-size=4096`

**Slow performance:**
- Enable progress tracking to monitor operations
- Reduce concurrent operations for slower storage
- Use SSD storage for better performance

**Hash verification failures:**
- Check for file corruption or modification during processing
- Verify storage integrity
- Try different hash algorithms if needed

### Debug Mode

Enable verbose logging for troubleshooting:

```bash
salvage scan /path --verbose
```

Or programmatically:

```javascript
const salvage = new SalvageCore({ verbose: true });
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
git clone https://github.com/yourusername/salvage.git
cd salvage
npm install
npm run build
npm test
```

### Code Style

- Use TypeScript for type safety
- Follow existing code formatting
- Add tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.0
- Initial release
- Core scanning and analysis functionality
- CLI interface with multiple commands
- Report generation in multiple formats
- Data recovery capabilities
- Comprehensive test suite
- Documentation and examples

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/salvage/issues)
- **Documentation**: [API Documentation](https://salvage-docs.example.com)
- **Examples**: See `/examples` directory in this repository

## Related Tools

- **File Recovery**: PhotoRec, TestDisk
- **Forensics**: Autopsy, Sleuth Kit
- **File Analysis**: ExifTool, file command
- **Backup Tools**: rsync, tar, 7-zip

---

**Note**: This tool is designed for legitimate data recovery and analysis purposes. Always ensure you have proper authorization before analyzing or recovering data from systems you do not own.
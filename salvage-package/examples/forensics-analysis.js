#!/usr/bin/env node

/**
 * Forensics Analysis Example
 * 
 * This example demonstrates advanced forensics capabilities:
 * - Comprehensive directory analysis
 * - Suspicious file detection
 * - Timeline reconstruction
 * - Evidence preservation
 * - Report generation
 */

const { SalvageAnalyzer, SalvageReporter } = require('../dist');
const path = require('path');
const fs = require('fs').promises;

async function main() {
  console.log('🔬 Salvage Library - Forensics Analysis Example\n');
  
  // Configuration for forensics analysis
  const targetDirectory = process.argv[2] || './examples/sample-data';
  const outputDir = './forensics-output';
  
  const options = {
    verbose: true,
    includeHidden: true,      // Include hidden files for forensics
    includeDeleted: true,     // Include deleted files if detectable
    preserveTimestamps: true, // Preserve original timestamps
    followSymlinks: false,    // Don't follow symlinks for security
  };

  try {
    // Ensure output directory exists
    await ensureDirectory(outputDir);
    
    console.log('🔍 Starting Forensics Analysis...');
    console.log(`Target: ${path.resolve(targetDirectory)}`);
    console.log(`Output: ${path.resolve(outputDir)}\n`);

    // 1. Create forensics analyzer
    const analyzer = new SalvageAnalyzer(options);
    
    // Set up detailed event logging
    const eventLog = [];
    analyzer.onEvent((event) => {
      eventLog.push({
        timestamp: event.timestamp,
        type: event.type,
        message: event.message
      });
      
      if (options.verbose) {
        const time = event.timestamp.toISOString();
        console.log(`[${time}] ${event.type.toUpperCase()}: ${event.message}`);
      }
    });

    // 2. Perform comprehensive analysis
    console.log('📊 Performing comprehensive analysis...');
    const results = await analyzer.analyzeDirectory(targetDirectory);
    
    console.log('✅ Analysis completed\n');

    // 3. Display forensics summary
    displayForensicsSummary(results);

    // 4. Analyze suspicious files in detail
    if (results.suspiciousFiles.length > 0) {
      console.log('⚠️  Suspicious Files Analysis');
      console.log('─'.repeat(50));
      
      for (let i = 0; i < Math.min(results.suspiciousFiles.length, 10); i++) {
        const file = results.suspiciousFiles[i];
        const reasons = analyzeSuspiciousFile(file);
        
        console.log(`\n${i + 1}. ${path.basename(file.path)}`);
        console.log(`   Path: ${file.path}`);
        console.log(`   Size: ${formatBytes(file.size)}`);
        console.log(`   Modified: ${file.modifiedAt.toISOString()}`);
        console.log(`   Hidden: ${file.isHidden ? 'Yes' : 'No'}`);
        console.log(`   Hash: ${file.hash || 'N/A'}`);
        console.log(`   Reasons: ${reasons.join(', ')}`);
      }
      console.log('');
    }

    // 5. Timeline analysis
    if (results.timeline.length > 0) {
      console.log('⏰ Timeline Analysis');
      console.log('─'.repeat(50));
      
      // Show recent activity
      const recentEvents = results.timeline
        .slice(-20)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      
      console.log('\nRecent File Activity:');
      for (const event of recentEvents.slice(0, 10)) {
        const eventIcon = getEventIcon(event.event);
        const timeStr = event.timestamp.toISOString().replace('T', ' ').substring(0, 19);
        console.log(`${timeStr} ${eventIcon} ${event.event.padEnd(8)} ${path.basename(event.file.path)}`);
      }

      // Detect unusual activity patterns
      const activityPatterns = analyzeActivityPatterns(results.timeline);
      if (activityPatterns.length > 0) {
        console.log('\n⚡ Unusual Activity Patterns:');
        for (const pattern of activityPatterns) {
          console.log(`   • ${pattern}`);
        }
      }
      console.log('');
    }

    // 6. Compare with known good state (if baseline exists)
    const baselineFile = path.join(outputDir, 'baseline.json');
    try {
      const baselineContent = await fs.readFile(baselineFile, 'utf8');
      const baseline = JSON.parse(baselineContent);
      
      console.log('🔍 Comparing with baseline...');
      const comparison = compareWithBaseline(results, baseline);
      displayComparisonResults(comparison);
    } catch (error) {
      console.log('📝 No baseline found. Current state will be saved as baseline.');
      await saveBaseline(results, baselineFile);
    }

    // 7. Generate forensics reports
    console.log('📋 Generating forensics reports...');
    const reporter = new SalvageReporter();

    // HTML report
    const htmlReport = path.join(outputDir, 'forensics-report.html');
    await reporter.generateAnalysisReport(results, {
      format: 'html',
      outputFile: htmlReport,
      includeTimeline: true,
      includeHashes: true
    });
    console.log(`   HTML report: ${htmlReport}`);

    // JSON report for further analysis
    const jsonReport = path.join(outputDir, 'forensics-data.json');
    const forensicsData = {
      analysis: results,
      metadata: {
        analysisDate: new Date().toISOString(),
        targetDirectory: path.resolve(targetDirectory),
        toolVersion: '1.0.0',
        options: options
      },
      eventLog: eventLog,
      evidenceChain: createEvidenceChain(results)
    };
    
    await fs.writeFile(jsonReport, JSON.stringify(forensicsData, null, 2));
    console.log(`   JSON data: ${jsonReport}`);

    // CSV report for spreadsheet analysis
    const csvReport = path.join(outputDir, 'forensics-files.csv');
    await reporter.generateAnalysisReport(results, {
      format: 'csv',
      outputFile: csvReport
    });
    console.log(`   CSV data: ${csvReport}`);

    // 8. Generate security recommendations
    const recommendations = generateSecurityRecommendations(results);
    console.log('\n🛡️  Security Recommendations');
    console.log('─'.repeat(30));
    for (let i = 0; i < recommendations.length; i++) {
      console.log(`${i + 1}. ${recommendations[i]}`);
    }

    console.log('\n✅ Forensics analysis completed successfully!');
    console.log(`📁 All outputs saved to: ${path.resolve(outputDir)}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (options.verbose) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Helper functions

async function ensureDirectory(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
}

function displayForensicsSummary(results) {
  console.log('📊 Forensics Summary');
  console.log('─'.repeat(20));
  console.log(`Files: ${results.totalFiles}`);
  console.log(`Directories: ${results.totalDirectories}`);
  console.log(`Total size: ${formatBytes(results.totalSize)}`);
  console.log(`File types: ${Object.keys(results.fileTypes).length}`);
  console.log(`Duplicate groups: ${results.duplicateFiles.length}`);
  console.log(`Suspicious files: ${results.suspiciousFiles.length}`);
  console.log(`Timeline events: ${results.timeline.length}`);
  console.log('');
}

function analyzeSuspiciousFile(file) {
  const reasons = [];
  const fileName = path.basename(file.path).toLowerCase();
  const ext = path.extname(fileName);
  
  // Check for executable files
  const executableExts = ['.exe', '.bat', '.cmd', '.com', '.scr', '.msi'];
  if (executableExts.includes(ext)) {
    reasons.push('executable file');
  }
  
  // Check for script files
  const scriptExts = ['.vbs', '.js', '.ps1', '.py', '.sh'];
  if (scriptExts.includes(ext)) {
    reasons.push('script file');
  }
  
  // Check for sensitive filenames
  const sensitiveKeywords = ['password', 'passwd', 'secret', 'private', 'key', 'token'];
  if (sensitiveKeywords.some(keyword => fileName.includes(keyword))) {
    reasons.push('sensitive filename');
  }
  
  // Check if hidden
  if (file.isHidden) {
    reasons.push('hidden file');
  }
  
  // Check for unusual size
  if (file.size > 100 * 1024 * 1024) { // > 100MB
    reasons.push('large file');
  }
  
  if (file.size === 0) {
    reasons.push('empty file');
  }
  
  // Check for unusual timestamps
  const now = new Date();
  const age = now.getTime() - file.modifiedAt.getTime();
  const dayMs = 24 * 60 * 60 * 1000;
  
  if (age < 0) {
    reasons.push('future timestamp');
  } else if (age > 365 * dayMs) {
    reasons.push('very old file');
  }
  
  return reasons.length > 0 ? reasons : ['flagged by heuristics'];
}

function getEventIcon(event) {
  const icons = {
    created: '📝',
    modified: '✏️',
    accessed: '👁️',
    deleted: '🗑️'
  };
  return icons[event] || '❓';
}

function analyzeActivityPatterns(timeline) {
  const patterns = [];
  
  // Group events by hour
  const hourlyActivity = {};
  for (const event of timeline) {
    const hour = event.timestamp.getHours();
    hourlyActivity[hour] = (hourlyActivity[hour] || 0) + 1;
  }
  
  // Detect unusual activity times (late night/early morning)
  const nightActivity = hourlyActivity[22] + hourlyActivity[23] + hourlyActivity[0] + hourlyActivity[1] + hourlyActivity[2] + hourlyActivity[3];
  const totalActivity = timeline.length;
  
  if (nightActivity > totalActivity * 0.3) {
    patterns.push('High activity during night hours (10PM-4AM)');
  }
  
  // Detect bulk operations
  const recentEvents = timeline.filter(event => {
    const age = Date.now() - event.timestamp.getTime();
    return age < 24 * 60 * 60 * 1000; // Last 24 hours
  });
  
  if (recentEvents.length > 100) {
    patterns.push(`High recent activity: ${recentEvents.length} events in last 24 hours`);
  }
  
  return patterns;
}

function compareWithBaseline(current, baseline) {
  return {
    newFiles: current.totalFiles - baseline.totalFiles,
    sizeChange: current.totalSize - baseline.totalSize,
    newSuspicious: current.suspiciousFiles.length - baseline.suspiciousFiles.length,
    newDuplicates: current.duplicateFiles.length - baseline.duplicateFiles.length
  };
}

function displayComparisonResults(comparison) {
  console.log('🔍 Changes from baseline:');
  console.log(`   Files: ${comparison.newFiles >= 0 ? '+' : ''}${comparison.newFiles}`);
  console.log(`   Size: ${comparison.sizeChange >= 0 ? '+' : ''}${formatBytes(comparison.sizeChange)}`);
  console.log(`   Suspicious files: ${comparison.newSuspicious >= 0 ? '+' : ''}${comparison.newSuspicious}`);
  console.log(`   Duplicate groups: ${comparison.newDuplicates >= 0 ? '+' : ''}${comparison.newDuplicates}`);
  console.log('');
}

async function saveBaseline(results, baselineFile) {
  const baseline = {
    timestamp: new Date().toISOString(),
    totalFiles: results.totalFiles,
    totalDirectories: results.totalDirectories,
    totalSize: results.totalSize,
    suspiciousFiles: results.suspiciousFiles.length,
    duplicateFiles: results.duplicateFiles.length,
    fileTypes: results.fileTypes
  };
  
  await fs.writeFile(baselineFile, JSON.stringify(baseline, null, 2));
}

function createEvidenceChain(results) {
  return {
    preservationMethod: 'hash-based verification',
    analysisTimestamp: new Date().toISOString(),
    fileCount: results.totalFiles,
    integrityHashes: results.largestFiles
      .filter(f => f.hash)
      .map(f => ({
        path: f.path,
        hash: f.hash,
        algorithm: 'sha256',
        timestamp: f.modifiedAt
      }))
  };
}

function generateSecurityRecommendations(results) {
  const recommendations = [];
  
  if (results.suspiciousFiles.length > 0) {
    recommendations.push(`Review ${results.suspiciousFiles.length} flagged suspicious files for potential threats`);
  }
  
  if (results.duplicateFiles.length > 0) {
    const wastedSpace = results.duplicateFiles.reduce((total, group) => {
      return total + (group[0].size * (group.length - 1));
    }, 0);
    recommendations.push(`Remove duplicate files to free ${formatBytes(wastedSpace)} and reduce attack surface`);
  }
  
  const largeFiles = results.largestFiles.filter(f => f.size > 100 * 1024 * 1024);
  if (largeFiles.length > 0) {
    recommendations.push(`Investigate ${largeFiles.length} files larger than 100MB for potential data exfiltration`);
  }
  
  const hiddenFiles = results.largestFiles.filter(f => f.isHidden).length;
  if (hiddenFiles > 0) {
    recommendations.push(`Examine ${hiddenFiles} hidden files for malicious content`);
  }
  
  recommendations.push('Implement regular baseline comparisons to detect unauthorized changes');
  recommendations.push('Enable file system monitoring for real-time threat detection');
  recommendations.push('Maintain secure backups of critical data and system configurations');
  
  return recommendations;
}

function formatBytes(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 B';
  
  const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

// Run the example
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
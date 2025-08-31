#!/usr/bin/env node

/**
 * Data Recovery Example
 * 
 * This example demonstrates data recovery capabilities:
 * - Scanning damaged or corrupted directories
 * - Recovering files with verification
 * - Creating backups with compression
 * - Handling errors gracefully
 * - Progress tracking and reporting
 */

const { SalvageRecovery, SalvageCore } = require('../dist');
const { ProgressTracker } = require('../dist/utils');
const path = require('path');
const fs = require('fs').promises;

async function main() {
  console.log('💾 Salvage Library - Data Recovery Example\n');
  
  // Configuration
  const sourceDirectory = process.argv[2] || './examples/sample-data';
  const recoveryDirectory = process.argv[3] || './recovery-output';
  
  const options = {
    verbose: true,
    includeHidden: true,
    preserveTimestamps: true,
    followSymlinks: false, // Don't follow symlinks for safety
  };

  try {
    console.log('🔍 Data Recovery Setup');
    console.log(`Source: ${path.resolve(sourceDirectory)}`);
    console.log(`Recovery destination: ${path.resolve(recoveryDirectory)}\n`);

    // 1. Initial assessment
    console.log('📊 Step 1: Initial Assessment');
    console.log('─'.repeat(30));
    
    const assessmentCore = new SalvageCore(options);
    const files = await assessmentCore.scanDirectory(sourceDirectory);
    
    const regularFiles = files.filter(f => !f.isDirectory);
    const directories = files.filter(f => f.isDirectory);
    const totalSize = regularFiles.reduce((sum, f) => sum + f.size, 0);
    
    console.log(`Files to recover: ${regularFiles.length}`);
    console.log(`Directories: ${directories.length}`);
    console.log(`Total size: ${formatBytes(totalSize)}`);
    console.log(`Estimated time: ${estimateRecoveryTime(totalSize)}\n`);

    // 2. Pre-recovery validation
    console.log('✅ Step 2: Pre-recovery Validation');
    console.log('─'.repeat(35));
    
    const validationIssues = await validateRecoveryConditions(sourceDirectory, recoveryDirectory, files);
    
    if (validationIssues.length > 0) {
      console.log('⚠️  Validation issues found:');
      for (const issue of validationIssues) {
        console.log(`   • ${issue}`);
      }
      console.log('');
    } else {
      console.log('✅ All validation checks passed\n');
    }

    // 3. Create recovery plan
    console.log('📋 Step 3: Recovery Plan');
    console.log('─'.repeat(25));
    
    const recoveryPlan = createRecoveryPlan(files, totalSize);
    
    console.log('Recovery strategy:');
    for (const step of recoveryPlan.steps) {
      console.log(`   ${step.order}. ${step.description} (${formatBytes(step.size)})`);
    }
    console.log(`\nEstimated phases: ${recoveryPlan.phases}`);
    console.log(`Priority files: ${recoveryPlan.priorityFiles}\n`);

    // 4. Initialize recovery system
    const recovery = new SalvageRecovery(options);
    
    // Set up progress tracking
    const progressTracker = new ProgressTracker({
      total: regularFiles.length,
      message: 'Recovering files...'
    });

    let processedFiles = 0;
    let recoveredSize = 0;
    const errors = [];

    // Progress reporting
    progressTracker.on('progress', (info) => {
      if (info.current % 10 === 0 || info.current === info.total) {
        const rate = info.rate ? ` (${info.rate.toFixed(1)} files/sec)` : '';
        const eta = info.eta ? ` ETA: ${formatDuration(info.eta * 1000)}` : '';
        console.log(`   Progress: ${info.percentage.toFixed(1)}%${rate}${eta}`);
      }
    });

    progressTracker.on('complete', () => {
      console.log('   ✅ Recovery completed!');
    });

    // Set up detailed event monitoring
    recovery.onEvent((event) => {
      switch (event.type) {
        case 'progress':
          processedFiles++;
          progressTracker.increment(1, `Processing: ${path.basename(event.message)}`);
          break;
          
        case 'error':
          errors.push(event.message);
          if (options.verbose) {
            console.log(`   ⚠️  ${event.message}`);
          }
          break;
          
        case 'warning':
          if (options.verbose) {
            console.log(`   ⚡ ${event.message}`);
          }
          break;
      }
    });

    // 5. Execute recovery
    console.log('💾 Step 4: Executing Recovery');
    console.log('─'.repeat(30));
    
    progressTracker.start();
    const startTime = Date.now();
    
    const result = await recovery.recoverDirectory(sourceDirectory, recoveryDirectory);
    
    const duration = Date.now() - startTime;
    progressTracker.complete(`Recovered ${result.recoveredFiles.length} files`);

    // 6. Recovery results
    console.log('\n📊 Step 5: Recovery Results');
    console.log('─'.repeat(28));
    
    displayRecoveryResults(result, duration);

    // 7. Verification phase
    if (result.success && result.recoveredFiles.length > 0) {
      console.log('🔍 Step 6: Verification');
      console.log('─'.repeat(22));
      
      const verificationResults = await verifyRecoveredFiles(
        sourceDirectory, 
        recoveryDirectory, 
        result.recoveredFiles.slice(0, 10) // Verify first 10 files
      );
      
      displayVerificationResults(verificationResults);
    }

    // 8. Create backup archive
    console.log('📦 Step 7: Creating Backup Archive');
    console.log('─'.repeat(35));
    
    const backupPath = path.join(path.dirname(recoveryDirectory), 'recovery-backup.zip');
    
    console.log('Creating compressed backup...');
    const backupResult = await recovery.createBackup(recoveryDirectory, backupPath, true);
    
    if (backupResult.success) {
      const backupStats = await fs.stat(backupPath);
      const compressionRatio = ((backupStats.size / result.totalSize) * 100).toFixed(1);
      
      console.log(`✅ Backup created: ${backupPath}`);
      console.log(`   Original size: ${formatBytes(result.totalSize)}`);
      console.log(`   Compressed size: ${formatBytes(backupStats.size)}`);
      console.log(`   Compression ratio: ${compressionRatio}%\n`);
    }

    // 9. Generate recovery report
    console.log('📋 Step 8: Generating Report');
    console.log('─'.repeat(29));
    
    const reportPath = path.join(path.dirname(recoveryDirectory), 'recovery-report.html');
    await generateRecoveryReport(result, duration, reportPath);
    
    console.log(`📄 Recovery report: ${reportPath}\n`);

    // 10. Post-recovery recommendations
    console.log('💡 Post-Recovery Recommendations');
    console.log('─'.repeat(33));
    
    const recommendations = generateRecommendations(result, errors);
    for (let i = 0; i < recommendations.length; i++) {
      console.log(`${i + 1}. ${recommendations[i]}`);
    }

    console.log('\n✅ Data recovery completed successfully!');

  } catch (error) {
    console.error('❌ Recovery failed:', error.message);
    if (options.verbose) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Helper functions

async function validateRecoveryConditions(source, destination, files) {
  const issues = [];
  
  try {
    // Check source accessibility
    await fs.access(source);
  } catch (error) {
    issues.push(`Source directory is not accessible: ${error.message}`);
  }
  
  try {
    // Check destination writability
    await fs.mkdir(destination, { recursive: true });
  } catch (error) {
    issues.push(`Cannot create destination directory: ${error.message}`);
  }
  
  // Check for potential issues
  const largeFiles = files.filter(f => f.size > 1024 * 1024 * 1024); // > 1GB
  if (largeFiles.length > 0) {
    issues.push(`${largeFiles.length} files are larger than 1GB - recovery may be slow`);
  }
  
  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > 10 * 1024 * 1024 * 1024) { // > 10GB
    issues.push('Total recovery size exceeds 10GB - ensure sufficient disk space');
  }
  
  return issues;
}

function createRecoveryPlan(files, totalSize) {
  const regularFiles = files.filter(f => !f.isDirectory);
  
  // Categorize files by priority
  const criticalFiles = regularFiles.filter(f => isCriticalFile(f));
  const largeFiles = regularFiles.filter(f => f.size > 100 * 1024 * 1024);
  const regularSmallFiles = regularFiles.filter(f => 
    !isCriticalFile(f) && f.size <= 100 * 1024 * 1024
  );
  
  const steps = [
    {
      order: 1,
      description: 'Recover critical files first',
      size: criticalFiles.reduce((sum, f) => sum + f.size, 0)
    },
    {
      order: 2,
      description: 'Recover small/medium files',
      size: regularSmallFiles.reduce((sum, f) => sum + f.size, 0)
    },
    {
      order: 3,
      description: 'Recover large files',
      size: largeFiles.reduce((sum, f) => sum + f.size, 0)
    }
  ];
  
  return {
    steps,
    phases: 3,
    priorityFiles: criticalFiles.length
  };
}

function isCriticalFile(file) {
  const criticalExtensions = ['.doc', '.docx', '.pdf', '.txt', '.xls', '.xlsx', '.ppt', '.pptx'];
  const ext = path.extname(file.path).toLowerCase();
  return criticalExtensions.includes(ext);
}

function estimateRecoveryTime(totalSize) {
  const bytesPerSecond = 50 * 1024 * 1024; // Assume 50MB/s recovery speed
  const estimatedSeconds = totalSize / bytesPerSecond;
  
  if (estimatedSeconds < 60) {
    return `${Math.ceil(estimatedSeconds)} seconds`;
  } else if (estimatedSeconds < 3600) {
    return `${Math.ceil(estimatedSeconds / 60)} minutes`;
  } else {
    return `${Math.ceil(estimatedSeconds / 3600)} hours`;
  }
}

function displayRecoveryResults(result, duration) {
  const successRate = result.totalFiles > 0 ? 
    ((result.recoveredFiles.length / result.totalFiles) * 100).toFixed(1) : '0';
  
  console.log(`Files processed: ${result.totalFiles}`);
  console.log(`Files recovered: ${result.recoveredFiles.length}`);
  console.log(`Success rate: ${successRate}%`);
  console.log(`Data recovered: ${formatBytes(result.totalSize)}`);
  console.log(`Duration: ${formatDuration(duration)}`);
  console.log(`Errors: ${result.errors.length}`);
  
  if (result.errors.length > 0) {
    console.log('\nRecent errors:');
    for (const error of result.errors.slice(-5)) {
      console.log(`   • ${error}`);
    }
  }
  console.log('');
}

async function verifyRecoveredFiles(source, destination, files) {
  console.log('Verifying file integrity...');
  
  let verified = 0;
  let failed = 0;
  
  const { CryptoUtils } = require('../dist/utils');
  const crypto = new CryptoUtils();
  
  for (const file of files) {
    try {
      if (!file.isDirectory && file.hash) {
        const relativePath = path.relative(source, file.path);
        const recoveredPath = path.join(destination, relativePath);
        
        const recoveredHash = await crypto.calculateFileHash(recoveredPath);
        
        if (recoveredHash === file.hash) {
          verified++;
        } else {
          failed++;
          console.log(`   ⚠️  Hash mismatch: ${path.basename(file.path)}`);
        }
      }
    } catch (error) {
      failed++;
      console.log(`   ❌ Verification failed: ${path.basename(file.path)}`);
    }
  }
  
  return { verified, failed, total: files.length };
}

function displayVerificationResults(results) {
  console.log(`Files verified: ${results.verified}/${results.total}`);
  console.log(`Verification failures: ${results.failed}`);
  
  if (results.failed === 0) {
    console.log('✅ All verified files passed integrity check');
  } else {
    console.log(`⚠️  ${results.failed} files failed verification`);
  }
  console.log('');
}

async function generateRecoveryReport(result, duration, reportPath) {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Data Recovery Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        h1 { color: #2c3e50; }
        .summary { background: #f8f9fa; padding: 20px; border-radius: 5px; }
        .success { color: #27ae60; }
        .warning { color: #f39c12; }
        .error { color: #e74c3c; }
        table { border-collapse: collapse; width: 100%; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <h1>Data Recovery Report</h1>
    
    <div class="summary">
        <h2>Recovery Summary</h2>
        <p><strong>Date:</strong> ${new Date().toISOString()}</p>
        <p><strong>Duration:</strong> ${formatDuration(duration)}</p>
        <p><strong>Files Processed:</strong> ${result.totalFiles}</p>
        <p><strong>Files Recovered:</strong> <span class="success">${result.recoveredFiles.length}</span></p>
        <p><strong>Success Rate:</strong> ${((result.recoveredFiles.length / result.totalFiles) * 100).toFixed(1)}%</p>
        <p><strong>Data Recovered:</strong> ${formatBytes(result.totalSize)}</p>
        <p><strong>Errors:</strong> <span class="${result.errors.length > 0 ? 'error' : 'success'}">${result.errors.length}</span></p>
    </div>
    
    ${result.errors.length > 0 ? `
    <h2>Errors Encountered</h2>
    <ul>
        ${result.errors.map(error => `<li class="error">${error}</li>`).join('')}
    </ul>
    ` : ''}
    
    <h2>Recovered Files</h2>
    <table>
        <tr><th>File</th><th>Size</th><th>Type</th><th>Modified</th></tr>
        ${result.recoveredFiles.slice(0, 50).map(file => `
            <tr>
                <td>${path.basename(file.path)}</td>
                <td>${formatBytes(file.size)}</td>
                <td>${file.isDirectory ? 'Directory' : 'File'}</td>
                <td>${file.modifiedAt.toISOString().substring(0, 19)}</td>
            </tr>
        `).join('')}
        ${result.recoveredFiles.length > 50 ? `
            <tr><td colspan="4"><i>... and ${result.recoveredFiles.length - 50} more files</i></td></tr>
        ` : ''}
    </table>
</body>
</html>`;

  await fs.writeFile(reportPath, html);
}

function generateRecommendations(result, errors) {
  const recommendations = [];
  
  if (result.success) {
    recommendations.push('Verify the integrity of critical recovered files before use');
    recommendations.push('Create additional backups of recovered data in different locations');
  } else {
    recommendations.push('Investigate and resolve the issues that caused recovery failures');
  }
  
  if (errors.length > 0) {
    recommendations.push('Review error log to identify patterns and prevent future data loss');
  }
  
  recommendations.push('Implement regular backup procedures to prevent future data loss');
  recommendations.push('Consider using file system monitoring to detect corruption early');
  recommendations.push('Test recovery procedures regularly to ensure they work when needed');
  
  return recommendations;
}

function formatBytes(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 B';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

function formatDuration(ms) {
  if (ms < 1000) return `${ms}ms`;
  
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

// Run the example
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };
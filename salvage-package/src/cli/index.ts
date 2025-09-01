#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { VERSION } from '../index';
import { ScanCommand } from './commands/scan-command';
import { AnalyzeCommand } from './commands/analyze-command';
import { RecoverCommand } from './commands/recover-command';
import { SearchCommand } from './commands/search-command';
import { ReportCommand } from './commands/report-command';

const program = new Command();

program
  .name('salvage')
  .description('A comprehensive data recovery and analysis toolkit for file system forensics')
  .version(VERSION)
  .option('-v, --verbose', 'Enable verbose output')
  .option('--no-color', 'Disable colored output')
  .hook('preAction', (thisCommand) => {
    const options = thisCommand.opts();
    
    // Configure chalk based on color option
    if (options.color === false) {
      chalk.level = 0;
    }
    
    // Set up global error handling
    process.on('unhandledRejection', (reason, promise) => {
      console.error(chalk.red('Unhandled Rejection at:'), promise, chalk.red('reason:'), reason);
      process.exit(1);
    });
    
    process.on('uncaughtException', (error) => {
      console.error(chalk.red('Uncaught Exception:'), error);
      process.exit(1);
    });
  });

// Register commands
const scanCommand = new ScanCommand();
const analyzeCommand = new AnalyzeCommand();
const recoverCommand = new RecoverCommand();
const searchCommand = new SearchCommand();
const reportCommand = new ReportCommand();

scanCommand.register(program);
analyzeCommand.register(program);
recoverCommand.register(program);
searchCommand.register(program);
reportCommand.register(program);

// Show help by default if no command is provided
if (process.argv.length <= 2) {
  program.help();
}

// Parse command line arguments
program.parse(process.argv);

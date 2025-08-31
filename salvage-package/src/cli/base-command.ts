import { Command } from 'commander';
import chalk from 'chalk';
import ora, { Ora } from 'ora';
import { SalvageOptions, SalvageEvent } from '../types';
import { LoggerUtils, LogLevel } from '../utils/logger-utils';
import { ValidationUtils } from '../utils/validation-utils';

export interface CommandOptions {
  verbose?: boolean;
  outputDir?: string;
  includeHidden?: boolean;
  includeDeleted?: boolean;
  maxDepth?: number;
  followSymlinks?: boolean;
  preserveTimestamps?: boolean;
  color?: boolean;
}

export abstract class BaseCommand {
  protected logger: LoggerUtils;
  protected spinner?: Ora;

  constructor() {
    this.logger = new LoggerUtils(false);
  }

  public abstract register(program: Command): void;

  protected createSalvageOptions(options: CommandOptions): SalvageOptions {
    return {
      verbose: options.verbose || false,
      outputDir: options.outputDir,
      includeHidden: options.includeHidden || false,
      includeDeleted: options.includeDeleted || false,
      maxDepth: options.maxDepth || -1,
      followSymlinks: options.followSymlinks || false,
      preserveTimestamps: options.preserveTimestamps !== false, // Default to true
    };
  }

  protected setupLogger(verbose: boolean, logFile?: string): void {
    this.logger = new LoggerUtils(verbose, { logFile });
    
    if (verbose) {
      this.logger.setLogLevel(LogLevel.DEBUG);
    } else {
      this.logger.setLogLevel(LogLevel.INFO);
    }
  }

  protected startSpinner(message: string): void {
    if (!this.logger.getOptions().verbose) {
      this.spinner = ora(message).start();
    } else {
      this.logger.info(message);
    }
  }

  protected updateSpinner(message: string): void {
    if (this.spinner) {
      this.spinner.text = message;
    } else {
      this.logger.info(message);
    }
  }

  protected succeedSpinner(message?: string): void {
    if (this.spinner) {
      if (message) {
        this.spinner.succeed(message);
      } else {
        this.spinner.stop();
      }
      this.spinner = undefined;
    } else if (message) {
      this.logger.info(message);
    }
  }

  protected failSpinner(message?: string): void {
    if (this.spinner) {
      if (message) {
        this.spinner.fail(message);
      } else {
        this.spinner.stop();
      }
      this.spinner = undefined;
    } else if (message) {
      this.logger.error(message);
    }
  }

  protected setupEventHandlers(salvageInstance: any): void {
    salvageInstance.onEvent((event: SalvageEvent) => {
      switch (event.type) {
        case 'progress':
          if (this.logger.getOptions().verbose) {
            this.logger.debug(event.message);
          } else {
            this.updateSpinner(event.message);
          }
          break;
          
        case 'info':
          this.logger.info(event.message);
          break;
          
        case 'warning':
          this.logger.warn(event.message);
          break;
          
        case 'error':
          this.logger.error(event.message);
          break;
      }
    });
  }

  protected async validatePath(path: string, shouldExist: boolean = true): Promise<void> {
    const pathValidation = await ValidationUtils.validatePath(path);
    
    if (!pathValidation.valid) {
      this.handleValidationResult(pathValidation, `Invalid path: ${path}`);
    }
    
    if (shouldExist) {
      const existsValidation = await ValidationUtils.validateFileExists(path);
      if (!existsValidation.valid) {
        const dirValidation = await ValidationUtils.validateDirectoryExists(path);
        if (!dirValidation.valid) {
          this.handleValidationResult(dirValidation, `Path does not exist: ${path}`);
        }
      }
    }
  }

  protected async validateOutputPath(outputPath: string): Promise<void> {
    const pathValidation = await ValidationUtils.validatePath(outputPath);
    
    if (!pathValidation.valid) {
      this.handleValidationResult(pathValidation, `Invalid output path: ${outputPath}`);
    }
    
    const writableValidation = await ValidationUtils.validateFileWritable(outputPath);
    if (!writableValidation.valid) {
      this.handleValidationResult(writableValidation, `Output path is not writable: ${outputPath}`);
    }
  }

  private handleValidationResult(result: any, context: string): void {
    if (!result.valid) {
      this.failSpinner();
      console.error(chalk.red(`\n${context}`));
      
      for (const error of result.errors) {
        console.error(chalk.red(`  ✗ ${error}`));
      }
      
      for (const warning of result.warnings) {
        console.warn(chalk.yellow(`  ⚠ ${warning}`));
      }
      
      process.exit(1);
    }
    
    // Show warnings even for valid results
    for (const warning of result.warnings) {
      console.warn(chalk.yellow(`⚠ ${warning}`));
    }
  }

  protected formatBytes(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 B';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const size = (bytes / Math.pow(1024, i)).toFixed(1);
    return `${size} ${sizes[i]}`;
  }

  protected formatDuration(ms: number): string {
    if (ms < 1000) {
      return `${ms}ms`;
    }
    
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

  protected handleError(error: Error, context: string): never {
    this.failSpinner();
    
    this.logger.error(`${context}: ${error.message}`, error);
    
    console.error(chalk.red(`\n❌ ${context}`));
    console.error(chalk.red(`   ${error.message}`));
    
    if (this.logger.getOptions().verbose && error.stack) {
      console.error(chalk.gray(error.stack));
    }
    
    process.exit(1);
  }

  protected displaySummary(title: string, items: Array<{ label: string; value: string | number; color?: string }>): void {
    console.log(chalk.bold(`\n📊 ${title}`));
    console.log('─'.repeat(title.length + 4));
    
    for (const item of items) {
      const value = typeof item.value === 'number' ? item.value.toLocaleString() : item.value;
      const colorFn = item.color ? (chalk as any)[item.color] : chalk.white;
      console.log(`${item.label.padEnd(20)}: ${colorFn(value)}`);
    }
    
    console.log('');
  }

  protected async confirmAction(message: string): Promise<boolean> {
    const { default: inquirer } = await import('inquirer');
    
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmed',
        message,
        default: false,
      },
    ]);
    
    return answer.confirmed;
  }

  protected async promptForOutput(defaultPath: string, description: string): Promise<string> {
    const { default: inquirer } = await import('inquirer');
    
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'outputPath',
        message: `${description}:`,
        default: defaultPath,
        validate: async (input: string) => {
          try {
            await this.validateOutputPath(input);
            return true;
          } catch (error) {
            return error.message;
          }
        },
      },
    ]);
    
    return answer.outputPath;
  }
}
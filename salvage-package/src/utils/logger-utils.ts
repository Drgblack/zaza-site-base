import * as fs from 'fs/promises';
import * as path from 'path';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  TRACE = 4,
}

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  message: string;
  data?: any;
  category?: string;
}

export interface LoggerOptions {
  verbose?: boolean;
  logFile?: string;
  maxLogSize?: number;
  logLevel?: LogLevel;
  includeTimestamp?: boolean;
  includeCategory?: boolean;
}

export class LoggerUtils {
  private options: Required<LoggerOptions>;
  private logBuffer: LogEntry[] = [];
  private bufferSize = 100;

  constructor(verbose: boolean = false, options: LoggerOptions = {}) {
    this.options = {
      verbose,
      logFile: options.logFile || '',
      maxLogSize: options.maxLogSize || 10 * 1024 * 1024, // 10MB
      logLevel: options.logLevel || (verbose ? LogLevel.DEBUG : LogLevel.INFO),
      includeTimestamp: options.includeTimestamp ?? true,
      includeCategory: options.includeCategory ?? true,
      ...options,
    };
  }

  public setVerbose(verbose: boolean): void {
    this.options.verbose = verbose;
    if (verbose && this.options.logLevel < LogLevel.DEBUG) {
      this.options.logLevel = LogLevel.DEBUG;
    }
  }

  public setLogLevel(level: LogLevel): void {
    this.options.logLevel = level;
  }

  public setLogFile(filePath: string): void {
    this.options.logFile = filePath;
  }

  public error(message: string, data?: any, category?: string): void {
    this.log(LogLevel.ERROR, message, data, category);
  }

  public warn(message: string, data?: any, category?: string): void {
    this.log(LogLevel.WARN, message, data, category);
  }

  public info(message: string, data?: any, category?: string): void {
    this.log(LogLevel.INFO, message, data, category);
  }

  public debug(message: string, data?: any, category?: string): void {
    this.log(LogLevel.DEBUG, message, data, category);
  }

  public trace(message: string, data?: any, category?: string): void {
    this.log(LogLevel.TRACE, message, data, category);
  }

  private log(level: LogLevel, message: string, data?: any, category?: string): void {
    if (level > this.options.logLevel) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      data,
      category,
    };

    this.logBuffer.push(entry);

    // Console output
    this.outputToConsole(entry);

    // File output (if configured)
    if (this.options.logFile) {
      this.bufferLogEntry(entry);
    }

    // Trim buffer if too large
    if (this.logBuffer.length > this.bufferSize) {
      this.logBuffer = this.logBuffer.slice(-this.bufferSize);
    }
  }

  private outputToConsole(entry: LogEntry): void {
    const formattedMessage = this.formatLogEntry(entry, false);

    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(formattedMessage);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage);
        break;
      case LogLevel.DEBUG:
      case LogLevel.TRACE:
        if (this.options.verbose) {
          console.log(formattedMessage);
        }
        break;
    }
  }

  private async bufferLogEntry(entry: LogEntry): Promise<void> {
    try {
      const formattedMessage = this.formatLogEntry(entry, true);
      
      // Ensure log directory exists
      const logDir = path.dirname(this.options.logFile);
      if (logDir) {
        await fs.mkdir(logDir, { recursive: true });
      }

      // Check log file size and rotate if necessary
      await this.rotateLogIfNeeded();

      // Append to log file
      await fs.appendFile(this.options.logFile, formattedMessage + '\n');
    } catch (error) {
      console.error(`Failed to write to log file: ${error.message}`);
    }
  }

  private async rotateLogIfNeeded(): Promise<void> {
    try {
      const stats = await fs.stat(this.options.logFile);
      
      if (stats.size > this.options.maxLogSize) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const logExt = path.extname(this.options.logFile);
        const logBase = path.basename(this.options.logFile, logExt);
        const logDir = path.dirname(this.options.logFile);
        
        const archivePath = path.join(logDir, `${logBase}-${timestamp}${logExt}`);
        
        await fs.rename(this.options.logFile, archivePath);
      }
    } catch (error) {
      // File doesn't exist yet, which is fine
      if (error.code !== 'ENOENT') {
        console.error(`Failed to rotate log file: ${error.message}`);
      }
    }
  }

  private formatLogEntry(entry: LogEntry, forFile: boolean): string {
    const parts: string[] = [];

    // Timestamp
    if (this.options.includeTimestamp || forFile) {
      parts.push(`[${entry.timestamp.toISOString()}]`);
    }

    // Level
    const levelName = LogLevel[entry.level];
    const coloredLevel = forFile ? levelName : this.colorizeLevel(levelName, entry.level);
    parts.push(`[${coloredLevel}]`);

    // Category
    if (entry.category && this.options.includeCategory) {
      parts.push(`[${entry.category}]`);
    }

    // Message
    parts.push(entry.message);

    // Data (if present)
    if (entry.data) {
      const dataStr = typeof entry.data === 'string' 
        ? entry.data 
        : JSON.stringify(entry.data, null, 2);
      parts.push(`\nData: ${dataStr}`);
    }

    return parts.join(' ');
  }

  private colorizeLevel(levelName: string, level: LogLevel): string {
    if (!process.stdout.isTTY) {
      return levelName;
    }

    const colors = {
      [LogLevel.ERROR]: '\x1b[31m', // Red
      [LogLevel.WARN]: '\x1b[33m',  // Yellow
      [LogLevel.INFO]: '\x1b[32m',  // Green
      [LogLevel.DEBUG]: '\x1b[36m', // Cyan
      [LogLevel.TRACE]: '\x1b[37m', // White
    };

    const reset = '\x1b[0m';
    const color = colors[level] || '';

    return `${color}${levelName}${reset}`;
  }

  public async flush(): Promise<void> {
    // Force write any remaining buffered entries
    if (this.options.logFile && this.logBuffer.length > 0) {
      const entries = [...this.logBuffer];
      this.logBuffer = [];

      for (const entry of entries) {
        await this.bufferLogEntry(entry);
      }
    }
  }

  public getLogEntries(
    level?: LogLevel,
    category?: string,
    since?: Date
  ): LogEntry[] {
    return this.logBuffer.filter(entry => {
      if (level !== undefined && entry.level !== level) {
        return false;
      }
      
      if (category && entry.category !== category) {
        return false;
      }
      
      if (since && entry.timestamp < since) {
        return false;
      }
      
      return true;
    });
  }

  public clearBuffer(): void {
    this.logBuffer = [];
  }

  public async exportLogs(
    outputPath: string,
    format: 'json' | 'csv' | 'txt' = 'json'
  ): Promise<void> {
    try {
      let content: string;

      switch (format) {
        case 'json':
          content = JSON.stringify(this.logBuffer, null, 2);
          break;

        case 'csv':
          content = this.formatLogsAsCSV();
          break;

        case 'txt':
        default:
          content = this.logBuffer
            .map(entry => this.formatLogEntry(entry, true))
            .join('\n');
          break;
      }

      // Ensure output directory exists
      const outputDir = path.dirname(outputPath);
      await fs.mkdir(outputDir, { recursive: true });

      await fs.writeFile(outputPath, content);
    } catch (error) {
      throw new Error(`Failed to export logs: ${error.message}`);
    }
  }

  private formatLogsAsCSV(): string {
    const lines = ['Timestamp,Level,Category,Message,Data'];

    for (const entry of this.logBuffer) {
      const csvRow = [
        entry.timestamp.toISOString(),
        LogLevel[entry.level],
        entry.category || '',
        `"${entry.message.replace(/"/g, '""')}"`,
        entry.data ? `"${JSON.stringify(entry.data).replace(/"/g, '""')}"` : ''
      ];
      
      lines.push(csvRow.join(','));
    }

    return lines.join('\n');
  }

  public createChildLogger(category: string): LoggerUtils {
    const childLogger = new LoggerUtils(this.options.verbose, this.options);
    
    // Override logging methods to include category
    const originalLog = childLogger.log.bind(childLogger);
    childLogger.log = (level: LogLevel, message: string, data?: any, cat?: string) => {
      originalLog(level, message, data, cat || category);
    };

    return childLogger;
  }

  public measureTime<T>(operation: () => Promise<T>, operationName: string): Promise<T> {
    return this.measureTimeSync(operation, operationName);
  }

  public async measureTimeSync<T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T> {
    const startTime = Date.now();
    this.debug(`Starting operation: ${operationName}`);

    try {
      const result = await operation();
      const duration = Date.now() - startTime;
      this.info(`Operation completed: ${operationName} (${duration}ms)`);
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      this.error(`Operation failed: ${operationName} (${duration}ms)`, error);
      throw error;
    }
  }

  public getStats(): {
    totalEntries: number;
    entriesByLevel: Record<string, number>;
    oldestEntry?: Date;
    newestEntry?: Date;
  } {
    const entriesByLevel: Record<string, number> = {};

    for (const entry of this.logBuffer) {
      const levelName = LogLevel[entry.level];
      entriesByLevel[levelName] = (entriesByLevel[levelName] || 0) + 1;
    }

    return {
      totalEntries: this.logBuffer.length,
      entriesByLevel,
      oldestEntry: this.logBuffer.length > 0 ? this.logBuffer[0].timestamp : undefined,
      newestEntry: this.logBuffer.length > 0 
        ? this.logBuffer[this.logBuffer.length - 1].timestamp 
        : undefined,
    };
  }
}
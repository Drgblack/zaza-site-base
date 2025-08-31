import { EventEmitter } from 'events';

export interface ProgressInfo {
  current: number;
  total: number;
  percentage: number;
  rate?: number; // items per second
  eta?: number; // estimated time remaining in seconds
  message?: string;
  phase?: string;
}

export interface ProgressOptions {
  total: number;
  updateInterval?: number; // ms
  message?: string;
  phase?: string;
}

export class ProgressTracker extends EventEmitter {
  private current = 0;
  private total: number;
  private startTime: number;
  private lastUpdateTime: number;
  private lastCurrent = 0;
  private message?: string;
  private phase?: string;
  private updateInterval: number;
  private timer?: NodeJS.Timeout;

  constructor(options: ProgressOptions) {
    super();
    
    this.total = options.total;
    this.message = options.message;
    this.phase = options.phase;
    this.updateInterval = options.updateInterval || 100;
    this.startTime = Date.now();
    this.lastUpdateTime = this.startTime;
  }

  public start(): void {
    this.emit('start', this.getProgressInfo());
    this.scheduleUpdate();
  }

  public increment(amount: number = 1, message?: string): void {
    this.current = Math.min(this.current + amount, this.total);
    
    if (message) {
      this.message = message;
    }

    if (this.current >= this.total) {
      this.complete();
    } else {
      this.emit('progress', this.getProgressInfo());
    }
  }

  public setProgress(current: number, message?: string): void {
    this.current = Math.min(Math.max(current, 0), this.total);
    
    if (message) {
      this.message = message;
    }

    if (this.current >= this.total) {
      this.complete();
    } else {
      this.emit('progress', this.getProgressInfo());
    }
  }

  public setTotal(total: number): void {
    this.total = total;
    this.emit('progress', this.getProgressInfo());
  }

  public setPhase(phase: string, resetProgress: boolean = false): void {
    this.phase = phase;
    
    if (resetProgress) {
      this.current = 0;
      this.startTime = Date.now();
      this.lastUpdateTime = this.startTime;
      this.lastCurrent = 0;
    }
    
    this.emit('phase', { phase, progress: this.getProgressInfo() });
  }

  public setMessage(message: string): void {
    this.message = message;
    this.emit('progress', this.getProgressInfo());
  }

  public complete(message?: string): void {
    this.current = this.total;
    
    if (message) {
      this.message = message;
    }

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }

    this.emit('complete', this.getProgressInfo());
  }

  public fail(error: Error): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }

    this.emit('error', { error, progress: this.getProgressInfo() });
  }

  private scheduleUpdate(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.timer = setTimeout(() => {
      if (this.current < this.total) {
        this.emit('progress', this.getProgressInfo());
        this.scheduleUpdate();
      }
    }, this.updateInterval);
  }

  private getProgressInfo(): ProgressInfo {
    const now = Date.now();
    const elapsed = now - this.startTime;
    const percentage = this.total > 0 ? (this.current / this.total) * 100 : 0;
    
    let rate: number | undefined;
    let eta: number | undefined;

    if (elapsed > 0) {
      rate = this.current / (elapsed / 1000); // items per second
      
      if (rate > 0 && this.current < this.total) {
        eta = (this.total - this.current) / rate; // seconds remaining
      }
    }

    return {
      current: this.current,
      total: this.total,
      percentage: Math.round(percentage * 100) / 100,
      rate,
      eta,
      message: this.message,
      phase: this.phase,
    };
  }

  public getCurrent(): number {
    return this.current;
  }

  public getTotal(): number {
    return this.total;
  }

  public getPercentage(): number {
    return this.total > 0 ? (this.current / this.total) * 100 : 0;
  }

  public isComplete(): boolean {
    return this.current >= this.total;
  }

  public getElapsedTime(): number {
    return Date.now() - this.startTime;
  }

  public getEstimatedTimeRemaining(): number | undefined {
    const info = this.getProgressInfo();
    return info.eta;
  }

  public getRate(): number | undefined {
    const info = this.getProgressInfo();
    return info.rate;
  }

  public reset(newTotal?: number): void {
    this.current = 0;
    this.lastCurrent = 0;
    
    if (newTotal !== undefined) {
      this.total = newTotal;
    }
    
    this.startTime = Date.now();
    this.lastUpdateTime = this.startTime;
    this.message = undefined;
    
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
    
    this.emit('reset', this.getProgressInfo());
  }

  public pause(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
    
    this.emit('pause', this.getProgressInfo());
  }

  public resume(): void {
    // Adjust start time to account for paused time
    const pausedTime = Date.now() - this.lastUpdateTime;
    this.startTime += pausedTime;
    this.lastUpdateTime = Date.now();
    
    this.emit('resume', this.getProgressInfo());
    
    if (this.current < this.total) {
      this.scheduleUpdate();
    }
  }
}

export class MultiPhaseProgressTracker extends EventEmitter {
  private phases: Map<string, ProgressTracker> = new Map();
  private currentPhase?: string;
  private phaseOrder: string[] = [];

  public addPhase(name: string, total: number, message?: string): ProgressTracker {
    const tracker = new ProgressTracker({ total, message, phase: name });
    
    tracker.on('progress', (progress) => {
      this.emit('phaseProgress', { phase: name, progress });
      this.emit('overallProgress', this.getOverallProgress());
    });

    tracker.on('complete', (progress) => {
      this.emit('phaseComplete', { phase: name, progress });
      this.nextPhase();
    });

    tracker.on('error', ({ error, progress }) => {
      this.emit('phaseError', { phase: name, error, progress });
    });

    this.phases.set(name, tracker);
    this.phaseOrder.push(name);

    return tracker;
  }

  public startPhase(phaseName: string): ProgressTracker | undefined {
    const tracker = this.phases.get(phaseName);
    
    if (tracker) {
      this.currentPhase = phaseName;
      tracker.start();
      this.emit('phaseStart', { phase: phaseName, progress: tracker.getProgressInfo() });
    }

    return tracker;
  }

  public getCurrentPhase(): ProgressTracker | undefined {
    return this.currentPhase ? this.phases.get(this.currentPhase) : undefined;
  }

  public getPhase(name: string): ProgressTracker | undefined {
    return this.phases.get(name);
  }

  private nextPhase(): void {
    if (!this.currentPhase) return;

    const currentIndex = this.phaseOrder.indexOf(this.currentPhase);
    const nextIndex = currentIndex + 1;

    if (nextIndex < this.phaseOrder.length) {
      const nextPhaseName = this.phaseOrder[nextIndex];
      this.startPhase(nextPhaseName);
    } else {
      // All phases complete
      this.emit('allComplete', this.getOverallProgress());
    }
  }

  public getOverallProgress(): {
    currentPhase?: string;
    phaseIndex: number;
    totalPhases: number;
    overallPercentage: number;
    phases: Array<{ name: string; progress: ProgressInfo }>;
  } {
    const currentPhaseIndex = this.currentPhase 
      ? this.phaseOrder.indexOf(this.currentPhase)
      : -1;

    const phases = this.phaseOrder.map(name => ({
      name,
      progress: this.phases.get(name)!.getProgressInfo()
    }));

    // Calculate overall percentage
    let totalCompleted = 0;
    let totalWork = 0;

    for (const { progress } of phases) {
      totalWork += progress.total;
      totalCompleted += progress.current;
    }

    const overallPercentage = totalWork > 0 ? (totalCompleted / totalWork) * 100 : 0;

    return {
      currentPhase: this.currentPhase,
      phaseIndex: currentPhaseIndex,
      totalPhases: this.phaseOrder.length,
      overallPercentage: Math.round(overallPercentage * 100) / 100,
      phases,
    };
  }

  public isComplete(): boolean {
    return Array.from(this.phases.values()).every(tracker => tracker.isComplete());
  }

  public getTotalElapsedTime(): number {
    const startTimes = Array.from(this.phases.values())
      .map(tracker => tracker.getElapsedTime())
      .filter(time => time > 0);

    return startTimes.length > 0 ? Math.max(...startTimes) : 0;
  }

  public reset(): void {
    this.currentPhase = undefined;
    
    for (const tracker of this.phases.values()) {
      tracker.reset();
    }
    
    this.emit('reset');
  }

  public pauseAll(): void {
    for (const tracker of this.phases.values()) {
      tracker.pause();
    }
    
    this.emit('pauseAll');
  }

  public resumeAll(): void {
    for (const tracker of this.phases.values()) {
      tracker.resume();
    }
    
    this.emit('resumeAll');
  }
}
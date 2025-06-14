
interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
}

export class PerformanceMonitor {
  private static metrics = new Map<string, PerformanceMetric>();
  private static enabled = process.env.NODE_ENV === 'development';

  static startMeasure(name: string): void {
    if (!this.enabled) return;

    this.metrics.set(name, {
      name,
      startTime: performance.now()
    });
  }

  static endMeasure(name: string): number | null {
    if (!this.enabled) return null;

    const metric = this.metrics.get(name);
    if (!metric) {
      console.warn(`No metric found for: ${name}`);
      return null;
    }

    const endTime = performance.now();
    const duration = endTime - metric.startTime;

    metric.endTime = endTime;
    metric.duration = duration;

    console.log(`⏱️ ${name}: ${duration.toFixed(2)}ms`);
    return duration;
  }

  static measureAsync<T>(name: string, asyncFn: () => Promise<T>): Promise<T> {
    if (!this.enabled) return asyncFn();

    this.startMeasure(name);
    return asyncFn().finally(() => {
      this.endMeasure(name);
    });
  }

  static measureSync<T>(name: string, syncFn: () => T): T {
    if (!this.enabled) return syncFn();

    this.startMeasure(name);
    try {
      return syncFn();
    } finally {
      this.endMeasure(name);
    }
  }

  static getMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  static clearMetrics(): void {
    this.metrics.clear();
  }
}

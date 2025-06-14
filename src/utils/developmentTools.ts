
interface DevToolsConfig {
  enablePerformanceMonitoring: boolean;
  enableErrorBoundaryLogging: boolean;
  enableAccessibilityChecks: boolean;
  enableConsoleWarnings: boolean;
}

class DevelopmentTools {
  private config: DevToolsConfig;
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.config = {
      enablePerformanceMonitoring: this.isDevelopment,
      enableErrorBoundaryLogging: true,
      enableAccessibilityChecks: this.isDevelopment,
      enableConsoleWarnings: this.isDevelopment
    };

    if (this.isDevelopment) {
      this.initDevelopmentTools();
    }
  }

  private initDevelopmentTools() {
    this.setupPerformanceObserver();
    this.setupConsoleEnhancements();
    this.setupAccessibilityChecks();
  }

  private setupPerformanceObserver() {
    if (!this.config.enablePerformanceMonitoring || typeof PerformanceObserver === 'undefined') {
      return;
    }

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const navigationEntry = entry as PerformanceNavigationTiming;
            console.log(`🚀 Navigation Performance:`, {
              domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart,
              loadComplete: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
              totalTime: navigationEntry.loadEventEnd - navigationEntry.fetchStart
            });
          }
        });
      });

      observer.observe({ entryTypes: ['navigation', 'paint'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }
  }

  private setupConsoleEnhancements() {
    if (!this.config.enableConsoleWarnings) return;

    // Enhanced error logging
    const originalError = console.error;
    console.error = (...args) => {
      originalError.apply(console, ['❌', ...args]);
      
      // Log to performance monitor if available
      if (typeof window !== 'undefined' && window.PerformanceMonitor) {
        window.PerformanceMonitor.logError?.(args.join(' '));
      }
    };

    // Enhanced warning logging
    const originalWarn = console.warn;
    console.warn = (...args) => {
      originalWarn.apply(console, ['⚠️', ...args]);
    };
  }

  private setupAccessibilityChecks() {
    if (!this.config.enableAccessibilityChecks) return;

    // Check for missing alt attributes
    const checkImages = () => {
      const images = document.querySelectorAll('img:not([alt])');
      if (images.length > 0) {
        console.warn(`🔍 Accessibility: Found ${images.length} images without alt attributes`, images);
      }
    };

    // Check for proper heading hierarchy
    const checkHeadingHierarchy = () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let prevLevel = 0;
      
      headings.forEach((heading) => {
        const currentLevel = parseInt(heading.tagName.charAt(1));
        if (currentLevel > prevLevel + 1) {
          console.warn(`🔍 Accessibility: Heading hierarchy skip detected`, heading);
        }
        prevLevel = currentLevel;
      });
    };

    // Run checks after DOM updates
    const observer = new MutationObserver(() => {
      setTimeout(() => {
        checkImages();
        checkHeadingHierarchy();
      }, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  public logComponentRender(componentName: string, props?: any) {
    if (this.isDevelopment && this.config.enableConsoleWarnings) {
      console.log(`🔄 Component Render:`, componentName, props);
    }
  }

  public logPerformanceMetric(name: string, value: number, unit = 'ms') {
    if (this.isDevelopment && this.config.enablePerformanceMonitoring) {
      console.log(`📊 Performance:`, `${name}: ${value}${unit}`);
    }
  }

  public updateConfig(newConfig: Partial<DevToolsConfig>) {
    this.config = { ...this.config, ...newConfig };
  }
}

export const devTools = new DevelopmentTools();

// Global type declaration for PerformanceMonitor
declare global {
  interface Window {
    PerformanceMonitor?: any;
  }
}

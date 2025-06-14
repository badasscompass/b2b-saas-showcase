
import { UnifiedClientWork } from "@/types/unified";
import { dataService } from "./dataService";
import { PerformanceMonitor } from "@/utils/performanceMonitor";

export class OptimizedClientWorkService {
  private static instance: OptimizedClientWorkService;
  private cache = new Map<string, { data: UnifiedClientWork[]; timestamp: number }>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  public static getInstance(): OptimizedClientWorkService {
    if (!OptimizedClientWorkService.instance) {
      OptimizedClientWorkService.instance = new OptimizedClientWorkService();
    }
    return OptimizedClientWorkService.instance;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_TTL;
  }

  private getCachedData(key: string): UnifiedClientWork[] | null {
    const cached = this.cache.get(key);
    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: UnifiedClientWork[]): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  public async getClientWorksByService(serviceType: string): Promise<UnifiedClientWork[]> {
    const cacheKey = `service:${serviceType}`;
    const cached = this.getCachedData(cacheKey);
    
    if (cached) {
      console.log(`Cache hit for service: ${serviceType}`);
      return cached;
    }

    return PerformanceMonitor.measureAsync(
      `getClientWorksByService:${serviceType}`,
      async () => {
        // Simulate async operation for future API integration
        const data = await new Promise<UnifiedClientWork[]>(resolve => {
          setTimeout(() => {
            const result = dataService.getClientWorksByService(serviceType);
            resolve(result);
          }, 0);
        });

        this.setCachedData(cacheKey, data);
        return data;
      }
    );
  }

  public async getClientWorkById(id: string): Promise<UnifiedClientWork | undefined> {
    const cacheKey = `work:${id}`;
    const cached = this.getCachedData(cacheKey);
    
    if (cached && cached.length > 0) {
      return cached[0];
    }

    return PerformanceMonitor.measureAsync(
      `getClientWorkById:${id}`,
      async () => {
        const result = dataService.getClientWorkById(id);
        if (result) {
          this.setCachedData(cacheKey, [result]);
        }
        return result;
      }
    );
  }

  public async searchClientWorks(query: string): Promise<UnifiedClientWork[]> {
    const cacheKey = `search:${query.toLowerCase()}`;
    const cached = this.getCachedData(cacheKey);
    
    if (cached) {
      return cached;
    }

    return PerformanceMonitor.measureAsync(
      `searchClientWorks:${query}`,
      async () => {
        const result = dataService.searchClientWorks(query);
        this.setCachedData(cacheKey, result);
        return result;
      }
    );
  }

  public clearCache(): void {
    this.cache.clear();
    console.log('Client work cache cleared');
  }

  public getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

export const optimizedClientWorkService = OptimizedClientWorkService.getInstance();


import { ImageSource, ImageConfig } from '@/types/image';
import { ImageService } from './imageService';

export class OptimizedImageService extends ImageService {
  private static imageCache = new Map<string, string>();
  private static loadingPromises = new Map<string, Promise<string>>();

  static buildOptimizedUrl(source: ImageSource, config: ImageConfig = {}): string {
    const cacheKey = this.getCacheKey(source, config);
    
    if (this.imageCache.has(cacheKey)) {
      return this.imageCache.get(cacheKey)!;
    }

    const url = super.buildUrl(source, config);
    this.imageCache.set(cacheKey, url);
    return url;
  }

  static async preloadImage(source: ImageSource, config?: ImageConfig): Promise<string> {
    const cacheKey = this.getCacheKey(source, config);
    
    if (this.imageCache.has(cacheKey)) {
      return this.imageCache.get(cacheKey)!;
    }

    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!;
    }

    const loadPromise = new Promise<string>((resolve, reject) => {
      const img = new Image();
      const url = this.buildOptimizedUrl(source, config);
      
      img.onload = () => {
        this.imageCache.set(cacheKey, url);
        this.loadingPromises.delete(cacheKey);
        resolve(url);
      };
      
      img.onerror = () => {
        this.loadingPromises.delete(cacheKey);
        if (source.fallback) {
          this.preloadImage(source.fallback, config).then(resolve).catch(reject);
        } else {
          reject(new Error('Failed to load image'));
        }
      };
      
      img.src = url;
    });

    this.loadingPromises.set(cacheKey, loadPromise);
    return loadPromise;
  }

  private static getCacheKey(source: ImageSource, config?: ImageConfig): string {
    return JSON.stringify({ source, config });
  }

  static clearCache(): void {
    this.imageCache.clear();
    this.loadingPromises.clear();
  }

  static getCacheSize(): number {
    return this.imageCache.size;
  }
}

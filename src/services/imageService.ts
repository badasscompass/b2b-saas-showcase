
import { ImageSource, ImageConfig } from '@/types/image';

export class ImageService {
  static buildUrl(source: ImageSource, config: ImageConfig = {}): string {
    const { width = 400, height = 200, fit = 'crop', quality = 80 } = config;
    
    switch (source.type) {
      case 'unsplash':
        if (!source.id) throw new Error('Unsplash ID is required');
        return `https://images.unsplash.com/${source.id}?auto=format&fit=${fit}&w=${width}&h=${height}&q=${quality}`;
      
      case 'upload':
      case 'external':
        return source.url || '';
      
      default:
        return '';
    }
  }

  static getWithFallback(source: ImageSource, config?: ImageConfig): { url: string; alt: string } {
    try {
      const url = this.buildUrl(source, config);
      return { url, alt: source.alt };
    } catch (error) {
      console.log('Error building image URL:', error);
      if (source.fallback) {
        return this.getWithFallback(source.fallback, config);
      }
      return {
        url: `https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&h=200&q=80`,
        alt: 'Default placeholder image'
      };
    }
  }
}

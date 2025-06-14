
import { ImageSource, ImageConfig } from '@/types/image';

export const buildImageUrl = (source: ImageSource, config: ImageConfig = {}): string => {
  const { width = 400, height = 200, fit = 'crop', quality = 80 } = config;
  
  switch (source.type) {
    case 'unsplash':
      if (!source.id) throw new Error('Unsplash ID is required');
      return `https://images.unsplash.com/${source.id}?q=${quality}&w=${width}&h=${height}&fit=${fit}`;
    
    case 'upload':
    case 'external':
      return source.url || '';
    
    default:
      return '';
  }
};

export const getImageWithFallback = (source: ImageSource, config?: ImageConfig): { url: string; alt: string } => {
  try {
    const url = buildImageUrl(source, config);
    return { url, alt: source.alt };
  } catch (error) {
    if (source.fallback) {
      return getImageWithFallback(source.fallback, config);
    }
    // Default fallback
    return {
      url: `https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&h=200&fit=crop`,
      alt: 'Default placeholder image'
    };
  }
};

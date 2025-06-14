
import { ImageSource, ImageConfig } from '@/types/image';
import { ImageService } from '@/services/imageService';

// Legacy wrapper for backward compatibility
export const buildImageUrl = (source: ImageSource, config: ImageConfig = {}): string => {
  return ImageService.buildUrl(source, config);
};

export const getImageWithFallback = (source: ImageSource, config?: ImageConfig): { url: string; alt: string } => {
  return ImageService.getWithFallback(source, config);
};

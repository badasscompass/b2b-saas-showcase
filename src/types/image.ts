
export interface ImageSource {
  type: 'unsplash' | 'upload' | 'external';
  id?: string; // For Unsplash
  url?: string; // For uploads or external URLs
  alt: string;
  fallback?: ImageSource;
}

export interface ImageConfig {
  width?: number;
  height?: number;
  fit?: 'crop' | 'fill' | 'scale';
  quality?: number;
}

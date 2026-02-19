export interface ImageSource {
  type: 'unsplash' | 'upload' | 'external';
  id?: string; // For Unsplash
  url?: string; // For uploads or external URLs
  alt: string;
  fallback?: ImageSource;
}

/** Case study image: ImageSource with optional Unsplash fallback recommended for screenshots. */
export type CaseStudyImage = ImageSource & {
  fallback?: ImageSource & { type: 'unsplash'; id: string; alt: string };
};

export interface ImageConfig {
  width?: number;
  height?: number;
  fit?: 'crop' | 'fill' | 'scale';
  quality?: number;
}

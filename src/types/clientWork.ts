import type { ImageSource } from '@/types/image';

export interface GenericClientWork {
  id: string;
  title: string;
  scope: string;
  description: string;
  lead: string;
  email: string;
  image: ImageSource;
  sector?: string;
  product?: string;
  productUrl?: string;
  result?: string;
  metrics?: string;
  // Optional results content for dynamic generation
  resultsContent?: {
    timeframe: string;
    results: string[];
    insight?: string;
    outcome?: string;
  };
}

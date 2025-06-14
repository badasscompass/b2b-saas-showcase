
// Unified data types for the entire application
export interface UnifiedClientWork {
  id: string;
  title: string;
  scope: string;
  description: string;
  lead: string;
  email: string;
  image: {
    type: 'unsplash';
    id: string;
    alt: string;
    fallback: {
      type: 'unsplash';
      id: string;
      alt: string;
    };
  };
  sector: string;
  product: string;
  productUrl?: string;
  // Service-specific fields
  serviceType: 'strategic-advisory' | 'product-development' | 'product-marketing-gtm';
  // Optional results content for dynamic generation
  resultsContent?: {
    timeframe: string;
    results: string[];
    insight: string;
  };
  // Legacy fields for backward compatibility
  result?: string;
  metrics?: string;
}

export interface ServiceConfig {
  title: string;
  subtitle: string;
  showcaseTitle: string;
  showcaseSubtitle: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
}

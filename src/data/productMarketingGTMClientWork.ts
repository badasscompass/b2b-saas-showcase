
export interface ProductMarketingGTMWork {
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
  result: string;
  metrics: string;
}

export const productMarketingGTMClientWork: ProductMarketingGTMWork[] = [
  {
    title: "B2B SaaS Launch Strategy",
    scope: "Full GTM Strategy",
    description: "Developed comprehensive go-to-market strategy for B2B SaaS platform, including market segmentation, pricing strategy, and multi-channel launch plan.",
    lead: "Emily Johnson",
    email: "emily@lmn3consulting.com",
    image: {
      type: 'unsplash',
      id: 'Q1p7bh3SHj8',
      alt: 'Marketing strategy planning session',
      fallback: {
        type: 'unsplash',
        id: 'SpVHcbuKi6E',
        alt: 'Business strategy meeting'
      }
    },
    sector: "B2B SaaS",
    product: "DataSync Pro",
    productUrl: "https://datasyncpro.example.com",
    result: "Successful product launch exceeding targets",
    metrics: "150% of target signups, $2M pipeline in 90 days"
  },
  {
    title: "Market Positioning Transformation",
    scope: "Brand & Positioning",
    description: "Repositioned healthcare startup from generic wellness app to specialized chronic disease management platform, resulting in clearer market fit.",
    lead: "David Park",
    email: "david@lmn3consulting.com",
    image: {
      type: 'unsplash',
      id: 'hpjSkU2UYSU',
      alt: 'Healthcare technology interface',
      fallback: {
        type: 'unsplash',
        id: 'L8tWZT4CcVQ',
        alt: 'Medical technology dashboard'
      }
    },
    sector: "HealthTech",
    product: "CareTrack",
    productUrl: "https://caretrack.example.com",
    result: "Repositioned successfully with clear value prop",
    metrics: "3x increase in qualified leads, 40% higher conversion"
  },
  {
    title: "Customer Acquisition Optimization",
    scope: "Growth Marketing",
    description: "Optimized customer acquisition funnel for consumer app, implementing data-driven growth strategies and improving conversion rates across all channels.",
    lead: "Lisa Thompson",
    email: "lisa@lmn3consulting.com",
    image: {
      type: 'unsplash',
      id: 'luke-chesser-JKUTrJ4vK00-unsplash',
      alt: 'Marketing analytics dashboard',
      fallback: {
        type: 'unsplash',
        id: 'mjArpHO2iAI',
        alt: 'Growth marketing metrics'
      }
    },
    sector: "Consumer Tech",
    product: "FitConnect",
    result: "Achieved 200% improvement in CAC efficiency",
    metrics: "65% reduction in CAC, 180% increase in LTV"
  }
];

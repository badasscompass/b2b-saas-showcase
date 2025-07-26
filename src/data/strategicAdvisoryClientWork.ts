
import { FlexibleImage } from "@/components/FlexibleImage";

export interface ClientWork {
  title: string;
  scope: string;
  description: string;
  lead: string;
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
  email: string;
}

export const clientWorkData: ClientWork[] = [
  {
    title: "Product Positioning Clarity",
    scope: "Strategic Positioning & Market Alignment", 
    description: "Agency in-house team building an MVP (backend-as-a-service for content mmanagement use cases) needed help defining what their product actually is and who it's for. Working fractionally (~45 hrs) over 12 weeks, we co-created product vision, mission, and value proposition, developed elevator pitch for internal and external alignment, conducted competitive landscape research, and refined product scope based on strategic positioning.",
    lead: "Iva Rumora",
    image: {
      type: 'unsplash' as const,
      id: 'photo-1531297484001-80022131f5a1',
      alt: 'Gray and black laptop computer on surface',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1487058792275-0ad4aaf24ca7',
        alt: 'Colorful software or web code on a computer monitor'
      }
    },
    sector: "B2B SaaS / CMS/DMS",
    product: "contendo.io",
    productUrl: "https://contendo.io",
    email: "iva@lmn3.digital"
  }
];


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
  },
  {
    title: "Fractional Product Leadership in Proptech SaaS space",
    scope: "Fractional Product Leadership & Product Clarity Sprints",
    description: "A bootstrapped CEE proptech startup building a platform for resident communities engaged fractional product leadership to resolve unclear product direction, onboarding friction, and stalled momentum.\n\nOver a 5-month engagement, the focus was on stabilising the product core, clarifying target use cases, and strengthening collaboration within multi-owner residential communities. This included redefining community types and roles, improving onboarding UX, and introducing collaboration features beyond one-way admin communication.\n\nIn the final phase, a rapid Discovery-to-strategy sprint reframed the platform's growth path through a compliance-driven add-on aligned with upcoming EU regulatory mandates - connecting the existing community foundation to a scalable B2B opportunity.",
    lead: "Iva Rumora",
    image: {
      type: 'unsplash' as const,
      id: 'photo-1560518883-ce09059eeffa',
      alt: 'Modern apartment building with community spaces',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1582407947304-fd86f028f716',
        alt: 'Property management dashboard on laptop'
      }
    },
    sector: "PropTech / Community & Facility Management Platform",
    product: "Habiq",
    productUrl: "https://www.habiq.com/",
    email: "iva@lmn3.digital"
  }
];

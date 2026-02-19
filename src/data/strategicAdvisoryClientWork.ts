import type { ImageSource } from "@/types/image";

export interface ClientWork {
  id: string;
  title: string;
  scope: string;
  description: string;
  lead: string;
  engagementDuration?: string;
  image: ImageSource;
  sector: string;
  product: string;
  productUrl?: string;
  email: string;
}

export const clientWorkData: ClientWork[] = [
  {
    id: "product-positioning-clarity",
    title: "Product Positioning Clarity",
    scope: "Strategic Positioning & Market Alignment", 
    description: "Agency in-house team building an MVP (backend-as-a-service for content management use cases) needed help defining what their product actually is and who it's for. Working fractionally (~45 hrs) over 12 weeks, we co-created product vision, mission, and value proposition, developed elevator pitch for internal and external alignment, conducted competitive landscape research, and refined product scope based on strategic positioning.",
    lead: "Iva Rumora",
    engagementDuration: "12 weeks",
    image: {
      type: 'external' as const,
      url: '/case-studies/contendo.png',
      alt: 'Strategic product positioning and market alignment - contendo.io B2B SaaS / CMS',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1531297484001-80022131f5a1',
        alt: 'Strategic product positioning and market alignment consulting for B2B SaaS platform'
      }
    },
    sector: "B2B SaaS / CMS/DMS",
    product: "contendo.io",
    productUrl: "https://contendo.io",
    email: "iva@lmn3.digital"
  },
  {
    id: "fractional-product-leadership-proptech",
    title: "Fractional Product Leadership in Proptech SaaS space",
    scope: "Fractional Product Leadership & Product Clarity Sprints",
    description: "A bootstrapped CEE proptech startup building a platform for resident communities engaged fractional product leadership to resolve unclear product direction, onboarding friction, and stalled momentum.\n\nThe focus was on stabilising the product core, clarifying target use cases, and strengthening collaboration within multi-owner residential communities. This included redefining community types and roles, improving onboarding UX, and introducing collaboration features beyond one-way admin communication.\n\nIn the final phase, a rapid Discovery-to-strategy sprint reframed the platform's growth path through a compliance-driven module aligned with upcoming EU regulatory mandates - connecting the existing community foundation to a scalable B2B opportunity.",
    lead: "Iva Rumora",
    engagementDuration: "5 months",
    image: {
      type: 'external' as const,
      url: '/case-studies/habiq.png',
      alt: 'Proptech platform for residential community and facility management - Habiq',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1560518883-ce09059eeffa',
        alt: 'Proptech platform for residential community and facility management - fractional product leadership case study'
      }
    },
    sector: "PropTech / Community & Facility Management Platform",
    product: "Habiq",
    productUrl: "https://www.habiq.com/",
    email: "iva@lmn3.digital"
  }
];

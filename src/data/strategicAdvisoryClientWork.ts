
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
    title: "AI Trust & Adoption Strategy",
    scope: "User Experience & Trust Framework Design",
    description: "Enterprise client had a high-performing AI tool—accurate, fast, and reliable. But 80% of users bypassed it or manually rechecked results. The issue wasn't performance. It was trust. We identified decision-friction points, added explainability and confidence scores, integrated human benchmarks and educational UI, and reframed the AI as a user-controlled assistant, not a black box.",
    lead: "Anamarija Ledic",
    image: {
      type: 'unsplash' as const,
      id: 'photo-1581091226825-a6a2a5aee158',
      alt: 'Woman in white long sleeve shirt using black laptop computer',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1498050108023-c5249f4df085',
        alt: 'MacBook with lines of code on its screen on a busy desk'
      }
    },
    sector: "B2B SaaS / Legal Tech",
    product: "AI assistant",
    email: "anamarija@lmn3.digital"
  },
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
    title: "Onboarding Drop-Off Turned Into Activation Growth",
    scope: "User Activation & Retention Strategy",
    description: "A client faced a 15% user drop-off within 2 minutes of onboarding—despite clean UX and no bugs. Past fixes (redesigns, tooltips, shorter flows) had no impact. We uncovered the real issue: lack of emotional relevance. Solution included intent-based signup tagging, personalised onboarding copy and CTAs, visual progress tracker, and triggered 24h nudge campaign.",
    lead: "Anamarija Ledic",
    image: {
      type: 'unsplash' as const,
      id: 'photo-1460925895917-afdab827c52f',
      alt: 'Laptop computer on glass-top table',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1487058792275-0ad4aaf24ca7',
        alt: 'Colorful software or web code on a computer monitor'
      }
    },
    sector: "B2B SaaS / BI",
    product: "Analytics Platform",
    email: "anamarija@lmn3.digital"
  }
];

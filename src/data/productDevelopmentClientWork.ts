import type { ImageSource } from "@/types/image";

export interface ProductDevelopmentWork {
  id: string;
  title: string;
  year?: number;
  scope: string;
  description: string;
  lead: string;
  email: string;
  engagementDuration?: string;
  image: ImageSource;
  sector: string;
  product: string;
  productUrl?: string;
  result: string;
  metrics: string;
}

export const productDevelopmentClientWork: ProductDevelopmentWork[] = [
  {
    id: "beta-instability-to-mvp",
    title: "From Beta Instability to MVP in 1 Month",
    year: 2024,
    scope: "Discovery-to-Strategy Accelerator founder advisory focused (remote)",
    description: "Working in a lightweight advisory format with a solo founder. Initial challenge: An unstable beta MVP and unclear direction—at a time when the AI dev tool landscape was rapidly evolving.",
    lead: "Iva Rumora",
    email: "iva@lmn3.digital",
    engagementDuration: "1 month",
    result: "Product moved from beta to functional state. Clearer edge in UX and value delivery. Founder equipped with direction for next growth phase. (Ongoing)",
    metrics: "Product stabilized and positioned for growth",
    image: {
      type: 'external' as const,
      url: '/case-studies/codx-junior-kanban.png',
      alt: 'AI developer tools MVP development - transforming unstable beta to functional product',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1488590528505-98d2b5aba04b',
        alt: 'AI developer tools MVP development - transforming unstable beta to functional product'
      }
    },
    sector: "AI Developer Tools",
    product: "codx-junior",
    productUrl: "https://github.com/gbrian/codx-junior"
  },
  {
    id: "unblocking-remote-dev-team-2025",
    title: "Unblocking Remote Dev Team in 3 Weeks",
    year: 2025,
    scope: "Product Ops-in-a-Box sprint execution (remote)",
    description: "A remote dev team was stuck in legacy refactoring with no clear processes or guidelines, and async bottlenecks slowing every release. The backlog was restructured, Sprint 1 focused on bug fixes to stabilise delivery, and Sprint 2 resolved a key contributor bottleneck causing conflicts so implementation could move forward with clearer alignment.",
    lead: "Iva Rumora",
    email: "iva@lmn3.digital",
    engagementDuration: "3 weeks",
    result: "Functional delivery flow re-established in 2 sprints. Major bottleneck cleared. Delivery pace and team alignment restored.",
    metrics: "Team alignment and delivery flow restored",
    image: {
      type: 'external' as const,
      url: '/case-studies/FlightER - Hotel - Availability.png',
      alt: 'Flighter airline IROPS hotel availability module interface',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1436491863332-7dd61a1a7f99',
        alt: 'Airline operations and flight disruption management technology'
      }
    },
    sector: "B2B Traveltech | Platform for IROP management",
    product: "Flighter.ai",
    productUrl: "https://flighter.ai"
  },
  {
    id: "flighter-irops-module-expansion-2026",
    title: "Airline IROPS Module Expansion & AI Co-Pilot",
    year: 2026,
    scope: "Product ops in a box and fractional PM engagement (remote)",
    description: "Led an airline pilot readiness assessment for an IROPs (Irregular Operations) module, validating technical and domain assumptions with industry stakeholders and refining core business logic. Improved UX for operations-team workflows and prototyped an AI co-pilot to assist agents during disruption events.",
    lead: "Iva Rumora",
    email: "iva@lmn3.digital",
    engagementDuration: "3 months",
    result: "Pilot readiness validated, business logic refined, UX improved for operations workflows, and AI co-pilot interactions prototyped for faster disruption handling.",
    metrics: "Pilot readiness validated and AI co-pilot concept prototyped",
    image: {
      type: 'external' as const,
      url: '/case-studies/flighter-finance-dashboard.png',
      alt: 'Flighter Finance dashboard — spend tracking and EU261 compliance',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1605810230434-7631ac76ec81',
        alt: 'Remote development team collaboration and product operations optimization case study'
      }
    },
    sector: "B2B Traveltech | Airline IROP Management",
    product: "Flighter.ai",
    productUrl: "https://flighter.ai"
  }
];

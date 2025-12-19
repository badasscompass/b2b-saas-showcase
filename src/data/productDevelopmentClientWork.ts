
export interface ProductDevelopmentWork {
  id: string;
  title: string;
  scope: string;
  description: string;
  lead: string;
  email: string;
  engagementDuration?: string;
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

export const productDevelopmentClientWork: ProductDevelopmentWork[] = [
  {
    id: "beta-instability-to-mvp",
    title: "From Beta Instability to MVP in 1 Month",
    scope: "Discovery-to-Strategy Accelerator founder advisory focused (remote)",
    description: "Working in a lightweight advisory format with a solo founder. Initial challenge: An unstable beta MVP and unclear direction—at a time when the AI dev tool landscape was rapidly evolving.",
    lead: "Iva Rumora",
    email: "iva@lmn3.digital",
    engagementDuration: "1 month",
    result: "Product moved from beta to functional state. Clearer edge in UX and value delivery. Founder equipped with direction for next growth phase. (Ongoing)",
    metrics: "Product stabilized and positioned for growth",
    image: {
      type: 'unsplash' as const,
      id: 'photo-1488590528505-98d2b5aba04b',
      alt: 'AI developer tools MVP development - transforming unstable beta to functional product',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1498050108023-c5249f4df085',
        alt: 'Product development workspace with code and development tools'
      }
    },
    sector: "AI Developer Tools",
    product: "codx-junior",
    productUrl: "https://github.com/gbrian/codx-junior"
  },
  {
    id: "unblocking-remote-dev-team",
    title: "Unblocking Remote Dev Team in 3 Weeks",
    scope: "Product Ops-in-a-Box sprint execution (remote)", 
    description: "A client was stuck in legacy code refactoring—no dev processes, no guidelines, and async bottlenecks slowing progress. We structured the backlog and launched first sprint with release goals, focused on bug fixes to stabilise delivery. In Sprint 2, resolved a key contributor bottleneck causing conflicts and enabled smoother, aligned implementation across the team.",
    lead: "Iva Rumora",
    email: "iva@lmn3.digital",
    engagementDuration: "3 weeks",
    result: "Functional delivery flow re-established in 2 sprints. Major bottleneck cleared. Delivery pace and team alignment restored.",
    metrics: "Team alignment and delivery flow restored",
    image: {
      type: 'unsplash' as const,
      id: 'photo-1605810230434-7631ac76ec81',
      alt: 'Remote development team collaboration and product operations optimization case study',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1519389950473-47ba0277781c',
        alt: 'Remote team collaboration and agile development process'
      }
    },
    sector: "B2B Hospitality",
    product: "Tourism & Transport Platform"
  }
];


export interface ProductDevelopmentWork {
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

export const productDevelopmentClientWork: ProductDevelopmentWork[] = [
  {
    title: "SaaS Platform MVP Development",
    scope: "Full-Stack Development",
    description: "Built a comprehensive SaaS platform from concept to launch, including user authentication, subscription management, and core business logic.",
    lead: "Alex Chen",
    email: "alex@lmn3consulting.com",
    image: {
      type: 'unsplash',
      id: 'ule-AKWtfYc',
      alt: 'Modern SaaS dashboard interface',
      fallback: {
        type: 'unsplash',
        id: 'mcSDtbWXUZU',
        alt: 'Development workspace'
      }
    },
    sector: "B2B SaaS",
    product: "ProjectFlow",
    productUrl: "https://projectflow.example.com",
    result: "Successfully launched MVP with 500+ beta users",
    metrics: "40% user retention, $50K ARR in first 6 months"
  },
  {
    title: "E-commerce Mobile App",
    scope: "Mobile Development",
    description: "Developed a React Native e-commerce application with advanced features including AR product visualization and AI-powered recommendations.",
    lead: "Sarah Williams",
    email: "sarah@lmn3consulting.com",
    image: {
      type: 'unsplash',
      id: 'qC2n6RQU4Vw',
      alt: 'Mobile e-commerce app interface',
      fallback: {
        type: 'unsplash',
        id: 'yktK2qaiVHI',
        alt: 'Mobile app development'
      }
    },
    sector: "E-commerce",
    product: "ShopSmart",
    productUrl: "https://shopsmart.example.com",
    result: "Launched with 10K+ downloads in first month",
    metrics: "4.8 App Store rating, 35% conversion rate"
  },
  {
    title: "FinTech Dashboard Redesign",
    scope: "UI/UX & Frontend",
    description: "Complete redesign and frontend rebuild of a financial analytics dashboard, focusing on data visualization and user experience optimization.",
    lead: "Michael Rodriguez",
    email: "michael@lmn3consulting.com",
    image: {
      type: 'unsplash',
      id: 'JKUTrJ4vK00',
      alt: 'Financial dashboard with charts',
      fallback: {
        type: 'unsplash',
        id: 'qwtCeJ5cLYs',
        alt: 'Data visualization dashboard'
      }
    },
    sector: "FinTech",
    product: "InvestPro Analytics",
    result: "Improved user engagement by 60%",
    metrics: "85% user satisfaction, 45% reduction in support tickets"
  }
];

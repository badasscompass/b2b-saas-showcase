
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
];

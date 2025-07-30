
import React from 'react';
import LazyLoadError from '../components/LazyLoadError';

export interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  title: string;
  description?: string;
  keywords?: string[];
  preload?: boolean;
  guards?: RouteGuard[];
}

export interface RouteGuard {
  name: string;
  check: () => boolean | Promise<boolean>;
  redirect?: string;
}

const createLazyComponentWithErrorHandler = (importFn: () => Promise<any>) => {
  return React.lazy(() => 
    importFn().catch(() => ({ 
      default: () => React.createElement(LazyLoadError) 
    }))
  );
};

export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    component: React.lazy(() => import('../pages/Index')),
    title: 'Iva Rumora & LMN3 | Strategic Product Development & Advisory',
    description: 'Iva Rumora leads LMN3, providing strategic product development, advisory services, and go-to-market expertise for startups and enterprises.',
    keywords: ['Iva Rumora', 'LMN3', 'product development', 'strategic advisory', 'product consultant', 'startup advisor', 'product manager', 'product management', 'product leadership'],
    preload: true
  },
  {
    path: '/product-development',
    component: createLazyComponentWithErrorHandler(() => import('../pages/ProductDevelopment')),
    title: 'Product Development Services - LMN3',
    description: 'From MVP to launch - comprehensive product development services with proven processes.',
    keywords: ['product development', 'MVP', 'product strategy', 'development process', 'product manager', 'product management', 'senior product manager']
  },
  {
    path: '/strategic-advisory',
    component: createLazyComponentWithErrorHandler(() => import('../pages/StrategicAdvisory')),
    title: 'Strategic Advisory Services - LMN3',
    description: 'Clear direction and positioning for early-stage founders and product teams.',
    keywords: ['strategic advisory', 'positioning', 'value proposition', 'market strategy', 'product manager', 'product management', 'product leadership']
  },
  {
    path: '/product-marketing-gtm',
    component: createLazyComponentWithErrorHandler(() => import('../pages/ProductMarketingGTM')),
    title: 'Product Marketing & GTM - LMN3',
    description: 'Launch smarter and reach buyers faster with data-driven go-to-market strategies.',
    keywords: ['product marketing', 'go-to-market', 'GTM strategy', 'launch strategy', 'product manager', 'product management', 'product marketing manager']
  },
  {
    path: '/about-us',
    component: createLazyComponentWithErrorHandler(() => import('../pages/AboutUs')),
    title: 'About Iva Rumora & LMN3 | Strategic Product Leadership',
    description: 'Meet Iva Rumora and the strategic minds behind LMN3. Expert product development consultants helping startups and enterprises build products that scale.',
    keywords: ['Iva Rumora', 'LMN3', 'about', 'team', 'product consultant', 'strategic advisory', 'product manager', 'product management', 'senior product manager', 'product leadership']
  },
  {
    path: '/contact',
    component: createLazyComponentWithErrorHandler(() => import('../pages/Contact')),
    title: 'Contact LMN3 | Get in Touch with Our Product Development Team',
    description: 'Contact LMN3 for product development, strategic advisory, and go-to-market services. Send RFPs and project inquiries directly to our team.',
    keywords: ['contact', 'contact form', 'get in touch', 'RFP', 'project inquiry', 'product development', 'strategic advisory', 'LMN3']
  }
];


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
    title: 'LMN3 Collective - Fractional Product Leadership & Consulting',
    description: 'Transform your vision into ready-to-launch products with proven development processes and senior product expertise.',
    keywords: ['product development', 'strategic advisory', 'consulting', 'MVP', 'go-to-market'],
    preload: true
  },
  {
    path: '/product-development',
    component: createLazyComponentWithErrorHandler(() => import('../pages/ProductDevelopment')),
    title: 'Product Development Services - LMN3 Collective',
    description: 'From MVP to launch - comprehensive product development services with proven processes.',
    keywords: ['product development', 'MVP', 'product strategy', 'development process']
  },
  {
    path: '/strategic-advisory',
    component: createLazyComponentWithErrorHandler(() => import('../pages/StrategicAdvisory')),
    title: 'Strategic Advisory Services - LMN3 Collective',
    description: 'Clear direction and positioning for early-stage founders and product teams.',
    keywords: ['strategic advisory', 'positioning', 'value proposition', 'market strategy']
  },
  {
    path: '/product-marketing-gtm',
    component: createLazyComponentWithErrorHandler(() => import('../pages/ProductMarketingGTM')),
    title: 'Product Marketing & GTM - LMN3 Collective',
    description: 'Launch smarter and reach buyers faster with data-driven go-to-market strategies.',
    keywords: ['product marketing', 'go-to-market', 'GTM strategy', 'launch strategy']
  },
  {
    path: '/about-us',
    component: createLazyComponentWithErrorHandler(() => import('../pages/AboutUs')),
    title: 'About Us - LMN3 Collective',
    description: 'Meet the strategic minds behind LMN3 Collective and learn about our mission to transform product visions into market success.',
    keywords: ['about us', 'team', 'partners', 'product consultants', 'company mission']
  }
];

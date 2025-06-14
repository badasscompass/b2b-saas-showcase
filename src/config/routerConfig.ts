
import React from 'react';

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

export const routeConfig: RouteConfig[] = [
  {
    path: '/',
    component: React.lazy(() => import('../pages/Index')),
    title: 'LMN3 Consulting - Product Development & Strategic Advisory',
    description: 'Transform your vision into ready-to-launch products with proven development processes and senior product expertise.',
    keywords: ['product development', 'strategic advisory', 'consulting', 'MVP', 'go-to-market'],
    preload: true
  },
  {
    path: '/product-development',
    component: React.lazy(() => import('../pages/ProductDevelopment')),
    title: 'Product Development Services - LMN3 Consulting',
    description: 'From MVP to launch - comprehensive product development services with proven processes.',
    keywords: ['product development', 'MVP', 'product strategy', 'development process']
  },
  {
    path: '/strategic-advisory',
    component: React.lazy(() => import('../pages/StrategicAdvisory')),
    title: 'Strategic Advisory Services - LMN3 Consulting',
    description: 'Clear direction and positioning for early-stage founders and product teams.',
    keywords: ['strategic advisory', 'positioning', 'value proposition', 'market strategy']
  },
  {
    path: '/product-marketing-gtm',
    component: React.lazy(() => import('../pages/ProductMarketingGTM')),
    title: 'Product Marketing & GTM - LMN3 Consulting',
    description: 'Launch smarter and reach buyers faster with data-driven go-to-market strategies.',
    keywords: ['product marketing', 'go-to-market', 'GTM strategy', 'launch strategy']
  }
];

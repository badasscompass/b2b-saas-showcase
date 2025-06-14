
import { ReactNode } from 'react';

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  external?: boolean;
  children?: NavigationItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface RouteMetadata {
  title: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface NavigationState {
  isMenuOpen: boolean;
  activeSection: string | null;
  breadcrumbs: BreadcrumbItem[];
}

export type NavigationAction = 
  | { type: 'TOGGLE_MENU' }
  | { type: 'SET_ACTIVE_SECTION'; payload: string | null }
  | { type: 'SET_BREADCRUMBS'; payload: BreadcrumbItem[] }
  | { type: 'CLOSE_MENU' };

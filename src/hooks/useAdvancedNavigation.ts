
import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { routeConfig } from '@/config/routerConfig';
import { PerformanceMonitor } from '@/utils/performanceMonitor';

interface NavigationOptions {
  replace?: boolean;
  state?: any;
  preventScroll?: boolean;
  trackNavigation?: boolean;
}

export const useAdvancedNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const updateDocumentMeta = useCallback((path: string) => {
    const route = routeConfig.find(r => r.path === path);
    if (!route) return;

    // Update document title
    document.title = route.title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && route.description) {
      metaDescription.setAttribute('content', route.description);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && route.keywords) {
      metaKeywords.setAttribute('content', route.keywords.join(', '));
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', route.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && route.description) {
      ogDescription.setAttribute('content', route.description);
    }
  }, []);

  const navigateWithAnalytics = useCallback((
    to: string, 
    options: NavigationOptions = {}
  ) => {
    const { replace = false, state, preventScroll = false, trackNavigation = true } = options;

    if (trackNavigation) {
      PerformanceMonitor.startMeasure(`navigation-${to}`);
    }

    // Handle hash navigation
    if (to.startsWith('#')) {
      const element = document.getElementById(to.substring(1));
      if (element && !preventScroll) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // Navigate to route
    if (replace) {
      navigate(to, { replace: true, state });
    } else {
      navigate(to, { state });
    }

    // Update meta tags
    updateDocumentMeta(to);

    if (trackNavigation) {
      PerformanceMonitor.endMeasure(`navigation-${to}`);
    }

    // Handle scroll behavior
    if (!preventScroll) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, [navigate, updateDocumentMeta]);

  const preloadRoute = useCallback(async (path: string) => {
    const route = routeConfig.find(r => r.path === path);
    if (!route) return;

    try {
      await route.component();
      console.log(`Preloaded route: ${path}`);
    } catch (error) {
      console.warn(`Failed to preload route: ${path}`, error);
    }
  }, []);

  // Update meta tags on location change
  useEffect(() => {
    updateDocumentMeta(location.pathname);
  }, [location.pathname, updateDocumentMeta]);

  // Handle hash navigation on mount
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }
  }, [location.hash]);

  return {
    navigate: navigateWithAnalytics,
    preloadRoute,
    currentPath: location.pathname,
    currentHash: location.hash
  };
};

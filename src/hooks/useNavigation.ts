import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { routeConfig } from '@/config/routerConfig';

interface NavigationOptions {
  replace?: boolean;
  state?: any;
  preventScroll?: boolean;
}

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const updateDocumentMeta = useCallback((path: string) => {
    const route = routeConfig.find(r => r.path === path);
    if (!route) return;

    document.title = route.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && route.description) {
      metaDescription.setAttribute('content', route.description);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && route.keywords) {
      metaKeywords.setAttribute('content', route.keywords.join(', '));
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', route.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && route.description) {
      ogDescription.setAttribute('content', route.description);
    }
  }, []);

  const navigateWithMeta = useCallback((
    to: string, 
    options: NavigationOptions = {}
  ) => {
    const { replace = false, state, preventScroll = false } = options;

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

    // Handle scroll behavior
    if (!preventScroll) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }, [navigate, updateDocumentMeta]);

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
    navigate: navigateWithMeta,
    currentPath: location.pathname,
    currentHash: location.hash
  };
};
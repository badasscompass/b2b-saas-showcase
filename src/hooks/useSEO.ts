
import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { RouteMetadata } from '@/types/navigation';

interface SEOOptions extends RouteMetadata {
  structuredData?: object;
  openGraph?: {
    type?: string;
    image?: string;
    url?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
  };
}

export const useSEO = (options: SEOOptions) => {
  const location = useLocation();

  const updateMetaTags = useCallback(() => {
    // Update title
    if (options.title) {
      document.title = options.title;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.content = content;
    };

    // Basic meta tags
    if (options.description) {
      updateMetaTag('description', options.description);
    }

    if (options.keywords) {
      updateMetaTag('keywords', options.keywords.join(', '));
    }

    // Canonical URL
    if (options.canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = options.canonicalUrl;
    }

    // Robots meta tag
    if (options.noIndex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Open Graph tags
    if (options.openGraph) {
      updateMetaTag('og:title', options.title, true);
      if (options.description) {
        updateMetaTag('og:description', options.description, true);
      }
      if (options.openGraph.type) {
        updateMetaTag('og:type', options.openGraph.type, true);
      }
      if (options.openGraph.image) {
        updateMetaTag('og:image', options.openGraph.image, true);
      }
      if (options.openGraph.url) {
        updateMetaTag('og:url', options.openGraph.url, true);
      }
    }

    // Twitter Card tags
    if (options.twitter) {
      if (options.twitter.card) {
        updateMetaTag('twitter:card', options.twitter.card);
      }
      if (options.twitter.site) {
        updateMetaTag('twitter:site', options.twitter.site);
      }
      if (options.twitter.creator) {
        updateMetaTag('twitter:creator', options.twitter.creator);
      }
      updateMetaTag('twitter:title', options.title);
      if (options.description) {
        updateMetaTag('twitter:description', options.description);
      }
    }

    // Structured Data
    if (options.structuredData) {
      let structuredDataScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!structuredDataScript) {
        structuredDataScript = document.createElement('script');
        structuredDataScript.type = 'application/ld+json';
        document.head.appendChild(structuredDataScript);
      }
      structuredDataScript.textContent = JSON.stringify(options.structuredData);
    }
  }, [options]);

  useEffect(() => {
    updateMetaTags();
  }, [updateMetaTags, location.pathname]);

  return { updateMetaTags };
};

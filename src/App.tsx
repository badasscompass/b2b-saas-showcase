
// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, Suspense } from 'react';
import { useNavigation } from '@/hooks/useNavigation';
import { routeConfig } from '@/config/routerConfig';
import { CookieConsent } from "@/components/CookieConsent";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const queryClient = new QueryClient();

// Improved loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#EA3E3A] mx-auto mb-4"></div>
      <p className="text-gray-600 font-manrope">Loading...</p>
    </div>
  </div>
);

// Create a new component to house the routing logic and hooks that depend on BrowserRouter
const AppContent = () => {
  const location = useLocation();
  const { navigate } = useNavigation();

  // Add debugging for route changes
  useEffect(() => {
    console.log('Route changed to:', location.pathname);
    console.log('Current location:', location);
    
    // Start performance monitoring for route changes
    // Route measurement removed for performance

    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        requestAnimationFrame(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // End performance monitoring
    return () => {
      // Route measurement removed for performance
    };
  }, [location]);

  // Preload routes on app start
  useEffect(() => {
    const preloadRoutes = async () => {
      const routesToPreload = routeConfig.filter(route => route.preload);
      for (const route of routesToPreload) {
        try {
          await route.component;
          console.log(`Preloaded: ${route.path}`);
        } catch (error) {
          console.warn(`Failed to preload: ${route.path}`, error);
        }
      }
    };

    preloadRoutes();
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {routeConfig.map((route) => {
            const Component = route.component;
            console.log(`Rendering route: ${route.path}`, Component);
            return (
              <Route 
                key={route.path} 
                path={route.path} 
                element={
                  <ErrorBoundary>
                    <Component />
                  </ErrorBoundary>
                } 
              />
            );
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

const App = () => {
  // Add debugging for app initialization
  useEffect(() => {
    console.log('App initialized');
    console.log('Current URL:', window.location.href);
    console.log('Base URL:', window.location.origin);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
        <Sonner />
        <CookieConsent />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

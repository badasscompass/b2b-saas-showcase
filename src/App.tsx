
// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, Suspense } from 'react';
import { PerformanceMonitor } from '@/utils/performanceMonitor';
import { useAdvancedNavigation } from '@/hooks/useAdvancedNavigation';
import { routeConfig } from '@/config/routerConfig';
import { CookieConsent } from "@/components/CookieConsent";

const queryClient = new QueryClient();

// Create a new component to house the routing logic and hooks that depend on BrowserRouter
const AppContent = () => {
  const location = useLocation();
  const { navigate } = useAdvancedNavigation();

  useEffect(() => {
    // Start performance monitoring for route changes
    PerformanceMonitor.startMeasure(`route-${location.pathname}`);

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
      PerformanceMonitor.endMeasure(`route-${location.pathname}`);
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
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#EA3E3A]"></div>
      </div>
    }>
      <Routes>
        {routeConfig.map((route) => {
          const Component = route.component;
          return (
            <Route 
              key={route.path} 
              path={route.path} 
              element={<Component />} 
            />
          );
        })}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

const App = () => {
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

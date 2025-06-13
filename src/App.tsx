// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from 'react';

import Index from "./pages/Index";
import ProductDevelopment from "./pages/ProductDevelopment";
import StrategicAdvisory from "./pages/StrategicAdvisory";
import ProductMarketingGTM from "./pages/ProductMarketingGTM";
import { CookieConsent } from "@/components/CookieConsent";

const queryClient = new QueryClient();

// Create a new component to house the routing logic and hooks that depend on BrowserRouter
const AppContent = () => {
  const location = useLocation(); // Now useLocation is correctly inside a Router context

  useEffect(() => {
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
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/product-development" element={<ProductDevelopment />} />
      <Route path="/strategic-advisory" element={<StrategicAdvisory />} />
      <Route path="/product-marketing-gtm" element={<ProductMarketingGTM />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
        <Sonner />
        <CookieConsent /> {/* This is where your new banner will be rendered */}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App; // Ensure App is exported
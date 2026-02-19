import { useEffect, useRef } from "react";
import { analyticsService } from "@/services/analyticsService";

const MILESTONES = [25, 50, 75, 90];

export const useScrollDepth = (pageName?: string) => {
  const firedRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    firedRef.current = new Set(); // reset on page change

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of MILESTONES) {
        if (scrollPercent >= milestone && !firedRef.current.has(milestone)) {
          firedRef.current.add(milestone);
          analyticsService.trackEvent("scroll", {
            percent_scrolled: milestone,
            page_name: pageName || window.location.pathname,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageName]);
};

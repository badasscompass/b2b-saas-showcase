
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { analyticsService } from "@/services/analyticsService";

interface PageCTAProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick?: () => void;
}

export const PageCTA = ({ title, subtitle, ctaText, onCtaClick }: PageCTAProps) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#EA3E3A] to-[#F4A42C]">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-white">
            {title}
          </h2>
          <p className="text-xl text-white font-manrope mb-8 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          <Button
            className="bg-white text-[#EA3E3A] hover:bg-gray-100 font-manrope text-lg px-8 py-4"
            asChild
          >
            <a
              href="https://calendly.com/iva-lmn3/30min"
              onClick={() => analyticsService.trackEvent('calendly_click', { category: 'conversion', label: ctaText, location: typeof window !== 'undefined' ? window.location.pathname : '' })}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {ctaText}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

import { Button } from "@/components/ui/button";
import { Calendar, Compass } from "lucide-react";
import { analyticsService } from "@/services/analyticsService";

interface PageHeroProps {
  title: string;
  subtitle: string | React.ReactNode;
  ctaText: string;
  onCtaClick?: () => void;
  showGuideMe?: boolean;
  onGuideMeClick?: () => void;
}

export const PageHero = ({ title, subtitle, ctaText, onCtaClick, showGuideMe, onGuideMeClick }: PageHeroProps) => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#EA3E3A]/5 via-white to-[#F4A42C]/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
        <img
  src="/lovable-uploads/lmn3_logo_bullet.png"
  alt="LMN3 Logo - Iva Rumora Product Development Services"
  className="mx-auto mb-8 w-40 h-40 md:w-48 md:h-48 object-contain"
  style={{ maxWidth: "100%", height: "auto" }}
/>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-manrope text-gray-900">
            {title}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl text-gray-600 font-manrope mb-8 leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button
              className="bg-[#EA3E3A] hover:bg-[#F4A42C] text-white font-manrope text-lg px-8 py-4"
              asChild
            >
              <a
                href="https://calendly.com/iva-lmn3/30min"
                onClick={() => analyticsService.trackEvent('calendly_click', { category: 'conversion', label: ctaText, location: 'page_hero' })}
              >
                <Calendar className="mr-2 h-5 w-5" />
                {ctaText}
              </a>
            </Button>
            {showGuideMe && onGuideMeClick && (
              <Button
                type="button"
                variant="outline"
                className="border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A]/10 hover:text-primary font-manrope text-lg px-8 py-4"
                onClick={() => {
                  analyticsService.trackEvent('guide_wizard_open', { category: 'conversion', label: 'Guide me', location: 'page_hero' });
                  onGuideMeClick();
                }}
              >
                <Compass className="mr-2 h-5 w-5" />
                Guide me
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

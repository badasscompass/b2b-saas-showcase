import { ArrowRight, Calendar, CheckCircle, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConferenceRibbon } from "@/components/ConferenceRibbon";
import { analyticsService } from "@/services/analyticsService";

interface HeroSectionProps {
  onGuideMeClick?: () => void;
}

export const HeroSection = ({ onGuideMeClick }: HeroSectionProps) => {
  return (
    <section className="relative flex flex-col bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="flex-1 flex items-center">
        <div className="container mx-auto px-4 relative z-10 w-full py-16 lg:py-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Content Side */}
            <div className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left">
              <div className="space-y-5">
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EA3E3A]/5 border border-[#EA3E3A]/10 mx-auto lg:mx-0 w-fit">
                  <span className="flex h-2 w-2 rounded-full bg-[#EA3E3A]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#EA3E3A] font-manrope">
                    Fractional CPO & Product Strategy
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-manrope text-gray-900 leading-[1.1] tracking-tight">
                  Senior product leadership for{" "}
                  <span className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] bg-clip-text text-transparent">
                    fast-moving B2B teams
                  </span>
                </h1>

                {/* Subheading */}
                <p className="text-lg sm:text-xl text-gray-600 font-manrope leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                  Helping you ship faster, scale smarter, and launch with clarity — without hiring full-time.
                </p>
              </div>

              {/* Feature Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0 w-full">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <CheckCircle className="w-5 h-5 text-[#F4A42C] flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-800 font-manrope">PM on-the-go</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <CheckCircle className="w-5 h-5 text-[#F4A42C] flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-800 font-manrope">Fractional leadership</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <CheckCircle className="w-5 h-5 text-[#F4A42C] flex-shrink-0" />
                  <span className="text-sm font-semibold text-gray-800 font-manrope">Immediate impact</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start flex-wrap pt-2">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white hover:from-[#EA3E3A]/90 hover:to-[#F4A42C]/90 font-manrope font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:w-auto shadow-lg shadow-[#EA3E3A]/20"
                  asChild
                >
                  <a
                    href="https://calendly.com/iva-lmn3/30min"
                    onClick={() => analyticsService.trackEvent('calendly_click', { category: 'conversion', label: 'Book Discovery Call', location: 'hero' })}
                  >
                    <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Book Discovery Call
                  </a>
                </Button>
                {onGuideMeClick && (
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="border-2 border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A]/10 hover:text-primary font-manrope font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:w-auto"
                    onClick={() => {
                      analyticsService.trackEvent('home_guide_wizard_open', { category: 'conversion', label: 'Guide me', location: 'hero' });
                      onGuideMeClick();
                    }}
                  >
                    <Compass className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Guide me
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-gray-600 hover:text-gray-900 font-manrope font-semibold text-base sm:text-lg px-4 sm:px-6 py-3 sm:py-4 h-auto w-full sm:w-auto"
                  asChild
                >
                  <a href="#services">
                    Explore Services <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Visual Side */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end order-first lg:order-last">
              <div className="relative">
                {/* Blurred gradient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#EA3E3A] to-[#F4A42C] blur-[80px] opacity-20 rounded-full" />

                {/* Logo */}
                <a href="/" aria-label="LMN3 Home" className="relative block">
                  <img
                    src="/lovable-uploads/d0861208-c179-4143-aee3-7e3ec567a892.png"
                    alt="LMN3 - Strategic Product Development by Iva Rumora"
                    className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                  />
                </a>

                {/* Floating accents */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center rotate-12 border border-gray-100">
                  <div className="w-6 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] rounded-full" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center -rotate-6 border border-gray-100">
                  <div className="w-8 h-8 rounded-full border-4 border-[#F4A42C]/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConferenceRibbon />
    </section>
  );
};

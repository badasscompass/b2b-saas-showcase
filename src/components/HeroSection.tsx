
import { ArrowRight, Calendar, Check, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConferenceRibbon } from "@/components/ConferenceRibbon";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="max-w-5xl mx-auto text-center">
          {/* LMN3 Logo */}
          <a href="/" aria-label="LMN3 Home">
            <img src="/lovable-uploads/d0861208-c179-4143-aee3-7e3ec567a892.png"
              alt="LMN3 - Strategic Product Development by Iva Rumora"
              className="
                mx-auto mb-8
                w-64 h-64
                sm:w-72 sm:h-72
                md:w-80 md:h-80
                lg:w-96 lg:h-96
                xl:w-[28rem] xl:h-[28rem]
                object-contain
                drop-shadow-lg
                transition-all duration-300
                hover:scale-105 hover:drop-shadow-2xl
                cursor-pointer
              "
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </a>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-manrope text-gray-900 mb-6 leading-tight px-4">
            Senior product leadership for{" "}
            <span className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] bg-clip-text text-transparent">
              fast-moving B2B teams
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-6 font-manrope leading-relaxed max-w-3xl mx-auto px-4">
            We help you ship faster, scale smarter, and launch with clarity — without hiring full-time.
          </p>

          {/* Feature Bullets */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-10 px-4">
            <div className="flex items-center gap-2 text-gray-700 font-manrope">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#F4A42C] flex-shrink-0" />
              <span className="text-sm sm:text-base">PM on-the-go</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-manrope">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#F4A42C] flex-shrink-0" />
              <span className="text-sm sm:text-base">Fractional leadership</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-manrope">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#F4A42C] flex-shrink-0" />
              <span className="text-sm sm:text-base">Immediate impact</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white hover:from-[#EA3E3A]/90 hover:to-[#F4A42C]/90 font-manrope font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:w-auto"
              asChild
            >
              <a href="https://calendly.com/iva-lmn3/30min">
                <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Book Discovery Call
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A] hover:text-white font-manrope font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:w-auto"
              asChild
            >
              <a href="#services">
                Explore Services <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </Button>
          </div>
        </div>
        </div>
      </div>
      <ConferenceRibbon />
    </section>
  );
};

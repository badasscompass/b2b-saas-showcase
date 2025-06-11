
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* LMN3 Logo */}
          <a href="/" aria-label="LMN3 Home">
  <img
    src="public/lovable-uploads/d0861208-c179-4143-aee3-7e3ec567a892.png"
    alt="LMN3 Logo"
    className="
      mx-auto mb-8
      w-72 h-72
      md:w-[32rem] md:h-[32rem]  // 512px
      lg:w-[38rem] lg:h-[38rem]  // 608px
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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-manrope text-gray-900 mb-6 leading-tight">
            Senior product leadership for{" "}
            <span className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] bg-clip-text text-transparent">
              fast-moving B2B teams
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-600 mb-6 font-manrope leading-relaxed max-w-3xl mx-auto">
            We help you ship faster, scale smarter, and launch with clarity — without hiring full-time.
          </p>

          {/* Description */}
          <p className="mb-8 text-gray-600 font-manrope max-w-2xl mx-auto">
            A collective of senior PMs, growth specialists, and product marketers delivering product velocity, strategic alignment, and go-to-market readiness.
          </p>

          {/* Feature Bullets */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-10">
            <div className="flex items-center gap-2 text-gray-700 font-manrope">
              <span className="text-[#F4A42C] text-xl">✔</span> Embedded teams
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-manrope">
              <span className="text-[#F4A42C] text-xl">✔</span> Fractional leaders
            </div>
            <div className="flex items-center gap-2 text-gray-700 font-manrope">
              <span className="text-[#F4A42C] text-xl">✔</span> Ready in weeks, not months
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white hover:from-[#EA3E3A]/90 hover:to-[#F4A42C]/90 font-manrope font-semibold text-lg px-8 py-4 h-auto"
              asChild
            >
              <a href="https://calendly.com/d/cssk-mv3-n33/product-services-discovery">
                <Calendar className="mr-2 h-5 w-5" />
                Book Discovery Call
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A] hover:text-white font-manrope font-semibold text-lg px-8 py-4 h-auto"
              asChild
            >
              <a href="#services">
                Explore Services <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

import { Button } from "@/components/ui/button";
import { Rocket, CheckCircle } from "lucide-react";

export const HeroSection = () => {
  const benefits = [
    "Embedded teams",
    "Fractional leaders", 
    "Ready in weeks, not months"
  ];

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-[#FFF33B]/10"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Logo Section */}
          <div className="text-center mb-16">
            <div className="w-full max-w-[500px] mx-auto mb-8 transition-transform duration-300 hover:scale-105">
              <img 
                src="/lovable-uploads/8dda91e1-93fc-4702-b5cf-9dc6dd55412b.png" 
                alt="LMN3 Logo" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-8 animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-manrope text-gray-900 leading-tight">
              Senior product leadership for 
              <span className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] bg-clip-text text-transparent"> fast-moving B2B teams</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-manrope text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We help you ship faster, scale smarter, and launch with clarity — without hiring full-time.
            </p>
            
            <p className="text-lg md:text-xl font-manrope text-gray-600 max-w-3xl mx-auto">
              A collective of senior PMs, growth specialists, and product marketers delivering product velocity, strategic alignment, and go-to-market readiness.
            </p>

            {/* Benefits */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 my-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-[#F4A42C]" />
                  <span className="text-lg font-manrope text-gray-800 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Button 
                size="lg" 
                className="bg-[#EA3E3A] text-white hover:bg-[#F4A42C] font-manrope text-lg px-8 py-4 transition-all hover:scale-105"
                asChild
              >
                <a href="https://calendly.com/iva-rumora/lmn3-discovery" target="_blank" rel="noopener noreferrer">
                  <Rocket className="mr-2 h-5 w-5" />
                  Get a Free Discovery Session
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 relative flex flex-col items-center justify-center space-y-12">
        <div className="w-full max-w-[600px] relative transition-transform duration-300 hover:scale-105">
          <img 
            src="/lovable-uploads/8dda91e1-93fc-4702-b5cf-9dc6dd55412b.png" 
            alt="LMN3 Logo" 
            className="w-full h-auto"
          />
        </div>
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 font-manrope text-gray-900">
            Senior product leadership for fast-moving B2B teams
          </h1>
          <p className="text-lg md:text-xl mb-8 font-manrope text-gray-700">
            We help you ship faster, scale smarter, and launch with clarity — without hiring full-time.
          </p>
          <p className="text-base md:text-lg mb-8 font-manrope text-gray-600 max-w-3xl mx-auto">
            A collective of senior PMs, growth specialists, and product marketers delivering product velocity, strategic alignment, and go-to-market readiness.
          </p>
          <div className="mb-8 text-sm md:text-base font-manrope text-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <span className="flex items-center">✅ Embedded teams.</span>
              <span className="flex items-center">✅ Fractional leaders.</span>
              <span className="flex items-center">✅ Ready in weeks, not months.</span>
            </div>
          </div>
          <Button 
            size="lg" 
            className="bg-[#EA3E3A] text-white hover:bg-[#F4A42C] font-manrope transition-colors"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};

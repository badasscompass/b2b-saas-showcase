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
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <p className="text-xl md:text-2xl mb-12 font-manrope">
            Transform your B2B SaaS journey with expert product consulting that drives growth and innovation
          </p>
          <Button 
            size="lg" 
            className="bg-[#EA3E3A] text-white hover:bg-[#FF7A00] font-manrope transition-colors"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};
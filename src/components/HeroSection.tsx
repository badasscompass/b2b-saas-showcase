import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const HeroSection = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 relative flex flex-col items-center justify-center space-y-6">
        <div className="w-full max-w-[600px] relative">
          <img 
            src="/lovable-uploads/d0861208-c179-4143-aee3-7e3ec567a892.png" 
            alt="LMN3 Logo" 
            className="w-full h-auto"
          />
        </div>
        <Separator className="bg-black my-6" />
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <p className="text-xl md:text-2xl mb-6 font-manrope">
            Transform your B2B SaaS journey with expert product consulting that drives growth and innovation
          </p>
          <Button 
            size="lg" 
            className="bg-[#F49040] text-white hover:bg-[#F49040]/90 font-manrope"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};
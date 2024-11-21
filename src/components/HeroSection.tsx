import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/9e02f633-1ab0-44d5-9c81-769877a0e184.png')] opacity-10 bg-center bg-no-repeat bg-contain" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center animate-fade-up mt-20">
          <p className="text-xl md:text-2xl text-foreground/90 mb-12">
            Transform your B2B SaaS journey with expert product consulting that drives growth and innovation
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Rocket className="mr-2 h-5 w-5" />
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </section>
  );
};
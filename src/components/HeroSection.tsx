
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-manrope text-gray-900 mb-6 leading-tight">
            Scale your product with
            <span className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] bg-clip-text text-transparent"> strategic clarity</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-manrope leading-relaxed max-w-3xl mx-auto">
            We help early-stage founders and growing companies build products that users love and markets embrace.
          </p>
          
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
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold font-manrope text-[#EA3E3A] mb-2">50+</div>
              <div className="text-gray-600 font-manrope">Products Launched</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-manrope text-[#F4A42C] mb-2">$10M+</div>
              <div className="text-gray-600 font-manrope">Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold font-manrope text-[#EA3E3A] mb-2">98%</div>
              <div className="text-gray-600 font-manrope">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

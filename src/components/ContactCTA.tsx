import { Button } from "@/components/ui/button";
import { Mail, Calendar, ArrowRight } from "lucide-react";

export const ContactCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='m40 40c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm-10-8c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-manrope">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl md:text-2xl mb-12 font-manrope opacity-90 max-w-3xl mx-auto">
            Let's discuss how our senior product leadership can accelerate your growth and help you achieve your business goals faster.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <Button 
              size="lg"
              className="bg-white text-[#EA3E3A] hover:bg-gray-100 font-manrope text-lg px-8 py-4 transition-all hover:scale-105 shadow-lg"
              asChild
            >
              <a href="https://calendly.com/iva-rumora/lmn3-discovery" target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Consultation
              </a>
            </Button>
            <Button 
              size="lg"
              className="bg-white text-[#EA3E3A] hover:bg-gray-100 font-manrope text-lg px-8 py-4 transition-all shadow-lg"
              asChild
            >
              <a href="mailto:hello@lmn3.digital">
                <Mail className="mr-2 h-5 w-5" />
                Email Us
              </a>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 text-white/80">
            <div className="flex items-center space-x-2">
              <ArrowRight className="w-5 h-5" />
              <span className="font-manrope">Free 30-min consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <ArrowRight className="w-5 h-5" />
              <span className="font-manrope">No commitment required</span>
            </div>
            <div className="flex items-center space-x-2">
              <ArrowRight className="w-5 h-5" />
              <span className="font-manrope">Custom proposal within 48h</span>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <img 
              src="/lovable-uploads/ac928757-746d-4571-b2f0-de32e4c5470e.png"
              alt="LMN3 Logo"
              className="w-16 h-16 opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

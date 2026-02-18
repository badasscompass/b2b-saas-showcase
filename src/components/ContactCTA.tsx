
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { analyticsService } from "@/services/analyticsService";

export const ContactCTA = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-manrope mb-6">
            Ready to transform your product business?
          </h2>
          <p className="text-xl md:text-2xl mb-8 font-manrope opacity-90 leading-relaxed">
            Let's discuss how we can help you build products that users love and markets embrace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-[#EA3E3A] hover:bg-gray-100 font-manrope font-semibold text-lg px-8 py-4 h-auto"
              asChild
            >
              <a
                href="https://calendly.com/iva-lmn3/30min"
                onClick={() => analyticsService.trackEvent('calendly_click', { category: 'conversion', label: 'Schedule Discovery Call', location: 'contact_cta' })}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Discovery Call
              </a>
            </Button>
            <Button 
  variant="outline" 
  size="lg" 
  className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#EA3E3A] font-manrope font-semibold text-lg px-8 py-4 h-auto"
  asChild
>
  <a href="mailto:hello@lmn3.digital">
    Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
  </a>
</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

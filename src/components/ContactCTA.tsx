import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const ContactCTA = () => {
  return (
    <section className="py-20 bg-white transition-all hover:bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#EA3E3A] font-manrope">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-[#EA3E3A] mb-8 font-manrope">
            Let's discuss how we can help you achieve your business goals
          </p>
          <Button 
            size="lg"
            className="bg-[#EA3E3A] text-white hover:bg-[#FF7A00] font-manrope mb-12 transition-colors"
          >
            <Mail className="mr-2 h-5 w-5" />
            Contact Us Now
          </Button>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/ac928757-746d-4571-b2f0-de32e4c5470e.png"
              alt="LMN3 Logo"
              className="w-24 h-24"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
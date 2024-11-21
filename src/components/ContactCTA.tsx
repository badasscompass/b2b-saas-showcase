import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const ContactCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#EA3E3A] to-[#FFF33B]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white font-manrope">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white mb-8 font-manrope">
            Let's discuss how we can help you achieve your business goals
          </p>
          <Button 
            size="lg"
            className="bg-[#F49040] text-white hover:bg-[#F49040]/90 font-manrope"
          >
            <Mail className="mr-2 h-5 w-5" />
            Contact Us Now
          </Button>
        </div>
      </div>
    </section>
  );
};
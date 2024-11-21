import { Button } from "@/components/ui/button";

export const ContactCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Product?</h2>
        <p className="text-xl mb-8 text-white/90">
          Let's discuss how we can help you achieve your product goals
        </p>
        <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
          Get Started Today
        </Button>
      </div>
    </section>
  );
};
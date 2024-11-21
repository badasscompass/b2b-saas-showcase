import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ContactCTA } from "@/components/ContactCTA";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <WhyChooseUs />
      <ContactCTA />
    </main>
  );
};

export default Index;
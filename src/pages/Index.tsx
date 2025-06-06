
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { WhoWeServeSection } from "@/components/WhoWeServeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { ContactCTA } from "@/components/ContactCTA";

const Index = () => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <HeroSection />
        <WhoWeServeSection />
        <ServicesSection />
        <WhyChooseUs />
        <ContactCTA />
      </main>
    </>
  );
};

export default Index;

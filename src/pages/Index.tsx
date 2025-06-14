
import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/HeroSection";
import { WhoWeServeSection } from "@/components/WhoWeServeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";

const Index = () => {
  return (
    <PageLayout footerTagline="Building products that scale.">
      <HeroSection />
      <WhoWeServeSection />
      <ServicesSection />
      <WhyChooseUs />
    </PageLayout>
  );
};

export default Index;

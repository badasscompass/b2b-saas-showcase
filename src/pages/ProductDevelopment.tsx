
import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { ProductServicesSection } from "@/components/ProductServicesSection";
import { ProductProcessSection } from "@/components/ProductProcessSection";
import { ProductOutcomesSection } from "@/components/ProductOutcomesSection";
import { ClientWorkShowcase } from "@/components/ClientWorkShowcase";
import { PageCTA } from "@/components/PageCTA";
import { PageFooter } from "@/components/PageFooter";

const ProductDevelopment = () => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <PageHero
          title="Product Development"
          subtitle="Transform your vision into ready-to-launch products with proven development processes and senior product expertise."
          ctaText="Book a Product Audit Call"
        />

        <ProductServicesSection />
        <ProductProcessSection />
        <ProductOutcomesSection />
        <ClientWorkShowcase />

        <PageCTA
          title="Ready to Build Your Product?"
          subtitle="From MVP to scale, we'll help you build products that users love and investors fund. Let's discuss your product vision."
          ctaText="Book a Product Audit Call"
        />

        <PageFooter tagline="Building products that scale." />
      </main>
    </>
  );
};

export default ProductDevelopment;

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { ProductServicesSection } from "@/components/ProductServicesSection";
import { ProductProcessSection } from "@/components/ProductProcessSection";
import { ProductOutcomesSection } from "@/components/ProductOutcomesSection";
import { ClientWorkShowcase } from "@/components/ClientWorkShowcase";
import { PageCTA } from "@/components/PageCTA";
import { PricingTiers, PricingTier } from "@/components/PricingTiers";
import { clientWork } from "@/data/productDevelopmentData";
import { mapGenericClientWork } from "@/utils/clientWorkMappers";
import { productDevelopmentPricingTiers } from "@/data/productDevelopmentData";

const ProductDevelopment = () => {
  const mappedClientWork = clientWork.map(mapGenericClientWork);

  return (
    <ServicePageLayout
      title="Product Development"
      subtitle="Transform your vision into ready-to-launch products with proven development processes and senior product expertise."
      ctaText="Book a Product Audit Call"
      footerTagline="Building products that scale."
    >
      <ProductServicesSection />
      <ProductProcessSection />
      <ProductOutcomesSection />
      
      <PricingTiers 
        title="Product Development Packages"
        subtitle="Structured engagements designed to move your product forward efficiently"
        tiers={productDevelopmentPricingTiers}
        ctaText="Book a Product Audit Call"
      />

      <ClientWorkShowcase 
        title="Client Work Showcase"
        subtitle="See how we've helped companies build and scale successful products from concept to launch."
        clientWork={mappedClientWork}
      />

      <PageCTA
        title="Ready to Build Your Product?"
        subtitle="From MVP to scale, we'll help you build products that users love and investors fund. Let's discuss your product vision."
        ctaText="Book a Product Audit Call"
      />
    </ServicePageLayout>
  );
};

export default ProductDevelopment;

import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { ProductServicesSection } from "@/components/ProductServicesSection";
import { ProductProcessSection } from "@/components/ProductProcessSection";
import { ProductOutcomesSection } from "@/components/ProductOutcomesSection";
import { ProductDevelopmentClientWork } from "@/components/ProductDevelopmentClientWork";
import { PageCTA } from "@/components/PageCTA";
import { PricingTiers, PricingTier } from "@/components/PricingTiers";
import { productDevelopmentPricingTiers } from "@/data/productDevelopmentData";
import { useSEO } from "@/hooks/useSEO";

const ProductDevelopment = () => {
  useSEO({
    title: "Product Development Services by Iva Rumora | LMN3 Collective",
    description: "Transform your vision into ready-to-launch products with Iva Rumora's proven development processes and senior product expertise. MVP to scale solutions.",
    keywords: ["product development", "MVP development", "product strategy", "Iva Rumora", "LMN3 Collective", "startup product development", "product manager", "product management", "senior product manager", "product management services"],
    canonicalUrl: "https://lmn3collective.com/product-development",
    openGraph: {
      type: "service",
      url: "https://lmn3collective.com/product-development"
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Product Development Services",
      "provider": {
        "@type": "Organization",
        "name": "LMN3 Collective"
      },
      "description": "Comprehensive product development services from MVP to scale"
    }
  });
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

      <ProductDevelopmentClientWork />

      <PageCTA
        title="Ready to Build Your Product?"
        subtitle="From MVP to scale, we'll help you build products that users love and investors fund. Let's discuss your product vision."
        ctaText="Book a Product Audit Call"
      />
    </ServicePageLayout>
  );
};

export default ProductDevelopment;
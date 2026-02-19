import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { ProductServicesSection } from "@/components/ProductServicesSection";
import { ProductProcessSection } from "@/components/ProductProcessSection";
import { ProductOutcomesSection } from "@/components/ProductOutcomesSection";
import { ProductDevelopmentClientWork } from "@/components/ProductDevelopmentClientWork";
import { RelatedServices } from "@/components/RelatedServices";
import { PageCTA } from "@/components/PageCTA";
import { PricingTiers, PricingTier } from "@/components/PricingTiers";
import { productDevelopmentPricingTiers } from "@/data/productDevelopmentData";
import { useSEO } from "@/hooks/useSEO";
import { useEffect } from "react";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { analyticsService } from "@/services/analyticsService";

const ProductDevelopment = () => {
  useScrollDepth("product-development");
  useEffect(() => {
    analyticsService.trackEvent('view_item', {
      item_id: 'product-development',
      item_name: 'Product Development Services',
      item_category: 'Service',
    });
  }, []);

  useSEO({
    title: "Product Development Services by Iva Rumora | LMN3",
    description: "Transform your vision into ready-to-launch products with Iva Rumora's proven development processes and senior product expertise. MVP to scale solutions.",
    keywords: ["product development", "MVP development", "product strategy", "Iva Rumora", "LMN3", "startup product development", "product manager", "product management", "senior product manager", "product management services"],
    canonicalUrl: "https://lmn3.digital/product-development",
    openGraph: {
      type: "service",
      url: "https://lmn3.digital/product-development"
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Product Development Services",
      "url": "https://lmn3.digital/product-development",
      "provider": {
        "@type": "Organization",
        "name": "LMN3",
        "url": "https://lmn3.digital",
        "founder": { "@type": "Person", "name": "Iva Rumora" }
      },
      "description": "Senior fractional product management and development services — from MVP scoping to full product launches for B2B startups and SMBs.",
      "serviceType": "Product Development Consulting",
      "areaServed": "Worldwide",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "https://lmn3.digital/product-development"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Product Development Packages",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "MVP Scoping & Roadmap" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Product Sprint Leadership" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fractional Product Manager" } }
        ]
      }
    }
  });
  return (
    <ServicePageLayout
      title="Product Development"
      subtitle="Transform your vision into ready-to-launch products with proven development processes and senior product expertise."
      ctaText="Book a Product Audit Call"
      footerTagline="Building products that scale."
      serviceKey="product-development"
      serviceTitle="Product Development"
    >
      <ProductServicesSection />
      
      <PricingTiers 
        title="Product Development Packages"
        subtitle="Structured engagements designed to move your product forward efficiently"
        tiers={productDevelopmentPricingTiers}
        ctaText="Book a Product Audit Call"
        interest="product-development"
        serviceTitle="Product Development"
      />
      
      <ProductDevelopmentClientWork />
      
      <ProductProcessSection />
      <ProductOutcomesSection />
      
      <RelatedServices currentService="product-development" />

      <PageCTA
        title="Ready to Build Your Product?"
        subtitle="From MVP to scale, we'll help you build products that users love and investors fund. Let's discuss your product vision."
        ctaText="Book a Product Audit Call"
      />
    </ServicePageLayout>
  );
};

export default ProductDevelopment;
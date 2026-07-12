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
      "@graph": [
        {
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
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lmn3.digital/" },
            { "@type": "ListItem", "position": 2, "name": "Product Development", "item": "https://lmn3.digital/product-development" }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What does fractional product management include?",
              "acceptedAnswer": { "@type": "Answer", "text": "Fractional product management provides senior product leadership on a part-time basis — discovery, roadmap, prioritization, sprint leadership, and stakeholder alignment — without the cost of a full-time hire." }
            },
            {
              "@type": "Question",
              "name": "How do you scope an MVP?",
              "acceptedAnswer": { "@type": "Answer", "text": "MVP scoping starts with the core user problem, defines the smallest testable slice that validates the value hypothesis, and produces a prioritized backlog, milestones, and success metrics." }
            },
            {
              "@type": "Question",
              "name": "Do you write code or manage engineers?",
              "acceptedAnswer": { "@type": "Answer", "text": "The engagement focuses on product leadership: shaping what to build and why, working with your engineering team or trusted delivery partners to ship it." }
            },
            {
              "@type": "Question",
              "name": "How quickly can we start?",
              "acceptedAnswer": { "@type": "Answer", "text": "Most engagements kick off within 1–2 weeks of a discovery call, starting with a short audit of current product, users, and priorities." }
            },
            {
              "@type": "Question",
              "name": "What size of company do you work with?",
              "acceptedAnswer": { "@type": "Answer", "text": "Primarily early- and growth-stage B2B startups and SMBs building or scaling a product-led business." }
            }
          ]
        }
      ]
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
        subtitle="From MVP to scale, build products that users love and investors fund. Let's discuss your product vision."
        ctaText="Book a Product Audit Call"
      />
    </ServicePageLayout>
  );
};

export default ProductDevelopment;
import { useEffect } from "react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { StrategicAdvisoryServices } from "@/components/StrategicAdvisoryServices";
import { StrategicAdvisoryProcess } from "@/components/StrategicAdvisoryProcess";
import { StrategicAdvisoryOutcomes } from "@/components/StrategicAdvisoryOutcomes";
import { StrategicAdvisoryClientWork } from "@/components/StrategicAdvisoryClientWork";
import { RelatedServices } from "@/components/RelatedServices";
import { PricingTiers } from "@/components/PricingTiers";
import { strategicAdvisoryPricingTiers } from "@/data/strategicAdvisoryData";
import { PageCTA } from "@/components/PageCTA";
import { useSEO } from "@/hooks/useSEO";

const StrategicAdvisory = () => {
  useSEO({
    title: "Strategic Advisory Services by Iva Rumora | LMN3",
    description: "Get strategic guidance from Iva Rumora for product teams and founders. Define value proposition, market positioning, and go-to-market strategy with 9+ years experience.",
    keywords: ["strategic advisory", "product strategy", "market positioning", "Iva Rumora", "LMN3", "startup advisor", "product manager", "product management", "product leadership"],
    canonicalUrl: "https://lmn3.digital/strategic-advisory",
    openGraph: {
      type: "service",
      url: "https://lmn3.digital/strategic-advisory"
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Strategic Advisory Services",
      "url": "https://lmn3.digital/strategic-advisory",
      "provider": {
        "@type": "Organization",
        "name": "LMN3",
        "url": "https://lmn3.digital",
        "founder": { "@type": "Person", "name": "Iva Rumora" }
      },
      "description": "Expert strategic advisory for product founders and executives — value proposition, market positioning, and product-led growth strategy.",
      "serviceType": "Strategic Business Advisory",
      "areaServed": "Worldwide",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "https://lmn3.digital/strategic-advisory"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Strategic Advisory Packages",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Product Strategy Workshop" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fractional Chief Product Officer" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Investor-Ready Product Narrative" } }
        ]
      }
    }
  });
  return (
    <ServicePageLayout
      title="Strategic Advisory"
      subtitle="Guidance for product teams and founders in defining their value proposition, market positioning, and go-to-market strategy."
      ctaText="Book a Strategy Discovery Call"
      footerTagline="Strategic clarity for product success."
    >
      <StrategicAdvisoryServices />
      
      <PricingTiers 
        title="Strategic Advisory Packages"
        subtitle="Choose the right strategic engagement to accelerate your product vision"
        tiers={strategicAdvisoryPricingTiers}
        ctaText="Book a Strategy Discovery Call"
      />
      
      <StrategicAdvisoryClientWork />
      
      <StrategicAdvisoryProcess />
      <StrategicAdvisoryOutcomes />
      
      <RelatedServices currentService="strategic-advisory" />
      
      <PageCTA
      title="Ready to stop guessing and start leading with clarity?"
      subtitle= "We set the directions in the uncertainty and reframe product decisions so they align with your business, team, and growth goals."
      ctaText="Book a Strategy Discovery Call"
      />
      </ServicePageLayout>
  );
};

export default StrategicAdvisory;

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
      "provider": {
        "@type": "Organization",
        "name": "LMN3"
      },
      "description": "Strategic guidance for product teams and founders"
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
      
      <StrategicAdvisoryProcess />
      <StrategicAdvisoryOutcomes />
      <StrategicAdvisoryClientWork />
      
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


import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { ProductServicesSection } from "@/components/ProductServicesSection";
import { ProductProcessSection } from "@/components/ProductProcessSection";
import { ProductOutcomesSection } from "@/components/ProductOutcomesSection";
import { ClientWorkShowcase } from "@/components/ClientWorkShowcase";
import { PageCTA } from "@/components/PageCTA";
import { PricingTiers, PricingTier } from "@/components/PricingTiers";
import { clientWork } from "@/data/productDevelopmentData";
import { mapGenericClientWork } from "@/utils/clientWorkMappers";

const ProductDevelopment = () => {
  console.log('ProductDevelopment page rendering');
  
  const mappedClientWork = clientWork.map(mapGenericClientWork);

  const pricingTiers: PricingTier[] = [
    {
      packageName: "Product Clarity Sprint",
      tier: "Solo",
      lead: "Both",
      teamSetup: "1 PM",
      format: "4-6 weeks",
      useCase: "Post-MVP startups preparing to scale; founders unsure of PMF direction or if their PMs are executing against the right priorities.",
      outcomes: "Clear product roadmap, validated feature priorities, and strategic direction for scaling.",
      pricing: "2000 (starting at)"
    },
    {
      packageName: "Discovery-to-Strategy Accelerator",
      tier: "Collab",
      lead: "Both",
      teamSetup: "2 senior PMs",
      format: "6–8 weeks",
      useCase: "Founders/CPOs testing new product lines or repositioning to grow.",
      outcomes: "Prioritized opportunities, structured discovery docs, value hypotheses & next steps.",
      pricing: "Custom"
    },
    {
      packageName: "Product Ops-in-a-Box",
      tier: "Solo",
      lead: "Iva",
      teamSetup: "1 PM",
      format: "4–6 weeks",
      useCase: "Growing teams in need of structure, decision hygiene, and velocity.",
      outcomes: "Product rituals & decision models, team alignment on tools & tracking, lighter load for leadership.",
      pricing: "3000 (starting at)"
    }
  ];

  console.log('PricingTiers data:', pricingTiers);

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
        tiers={pricingTiers}
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

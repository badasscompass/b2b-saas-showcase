
import { PricingTier } from "@/components/PricingTiers";
import { PricingTierCard } from "./PricingTierCard";

interface PricingTierGridProps {
  tiers: PricingTier[];
  ctaText: string;
  onPartnerClick: (partnerName: string) => void;
}

export const PricingTierGrid = ({ tiers, ctaText, onPartnerClick }: PricingTierGridProps) => {
  // Center two columns when there are exactly 2 tiers
  const gridCols = tiers.length === 2 
    ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid ${gridCols} gap-6 lg:gap-8`}>
      {tiers.map((tier, index) => (
        <PricingTierCard
          key={index}
          tier={tier}
          index={index}
          ctaText={ctaText}
          onPartnerClick={onPartnerClick}
        />
      ))}
    </div>
  );
};

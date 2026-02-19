
import { PricingTier } from "@/components/PricingTiers";
import { PricingTierCard } from "./PricingTierCard";
import type { TierLabelState } from "./PricingTierLabelToggle";

interface PricingTierGridProps {
  tiers: PricingTier[];
  ctaText: string;
  onPartnerClick: (partnerName: string) => void;
  tierLabelState: TierLabelState;
  interest?: string;
  serviceTitle?: string;
  onRequestPackage?: (tier: PricingTier) => void;
}

export const PricingTierGrid = ({
  tiers,
  ctaText,
  onPartnerClick,
  tierLabelState,
  interest,
  serviceTitle,
  onRequestPackage,
}: PricingTierGridProps) => {
  const gridCols = tiers.length === 2
    ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto justify-items-center'
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
          labelState={tierLabelState}
          interest={interest}
          serviceTitle={serviceTitle}
          onRequestPackage={onRequestPackage}
        />
      ))}
    </div>
  );
};


import { Users, User } from "lucide-react";
import { PricingTier } from "@/components/PricingTiers";
import type { TierLabelState } from "./PricingTierLabelToggle";

interface PricingTierLeadProps {
  tier: PricingTier;
  onPartnerClick: (partnerName: string) => void;
  labelState: TierLabelState;
}

export const PricingTierLead = ({
  tier,
  onPartnerClick,
  labelState,
}: PricingTierLeadProps) => {
  // Remove AML logic, only keep Iva
  if (tier.lead === "Both") {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Users className="h-4 w-4" />
        <span className="font-manrope">Lead: </span>
        <button
          onClick={() => onPartnerClick('Iva')}
          className="text-[#EA3E3A] hover:text-[#EA3E3A]/80 underline font-medium transition-colors"
        >
          Iva
        </button>
      </div>
    );
  }
  // Solo tier with single lead
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <User className="h-4 w-4" />
      <span className="font-manrope">Lead: </span>
      <button
        onClick={() => onPartnerClick(tier.lead)}
        className="text-[#EA3E3A] hover:text-[#EA3E3A]/80 underline font-medium transition-colors"
      >
        {tier.lead}
      </button>
    </div>
  );
};

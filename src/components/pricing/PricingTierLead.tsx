
import { Users, User } from "lucide-react";
import { PricingTier } from "@/components/PricingTiers";

interface PricingTierLeadProps {
  tier: PricingTier;
  onPartnerClick: (partnerName: string) => void;
}

export const PricingTierLead = ({ tier, onPartnerClick }: PricingTierLeadProps) => {
  if (tier.tier === 'Collab') {
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
        <span className="font-manrope">AND</span>
        <button
          onClick={() => onPartnerClick('Anamarija')}
          className="text-[#EA3E3A] hover:text-[#EA3E3A]/80 underline font-medium transition-colors"
        >
          Anamarija
        </button>
      </div>
    );
  }
  
  if (tier.tier === 'Solo' && tier.lead === 'Both') {
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
        <span className="font-manrope">OR</span>
        <button
          onClick={() => onPartnerClick('Anamarija')}
          className="text-[#EA3E3A] hover:text-[#EA3E3A]/80 underline font-medium transition-colors"
        >
          Anamarija
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

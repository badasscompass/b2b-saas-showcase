
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, Euro } from "lucide-react";
import { PricingTier } from "@/components/PricingTiers";
import { PricingTierLead } from "./PricingTierLead";
import type { TierLabelState } from "./PricingTierLabelToggle";

interface PricingTierCardProps {
  tier: PricingTier;
  index: number;
  ctaText: string;
  onPartnerClick: (partnerName: string) => void;
  labelState: TierLabelState;
}

export const PricingTierCard = ({
  tier,
  index,
  ctaText,
  onPartnerClick,
  labelState,
}: PricingTierCardProps) => {
  const isFractional = tier.packageName.toLowerCase().includes('fractional');
  const currentLabelState = isFractional ? 'Solo' : labelState;

  // Pick what to display based on labelState, but fallback to tier content if not available
  const labelMap = {
    Solo: {
      lead: tier.lead === "Both" ? "Iva or Anamarija" : tier.lead,
      team: "1 PM",
      price: tier.pricing ?? "",
      color: "bg-[#EA3E3A] text-white",
    },
    Duo: {
      lead: "Iva & Anamarija",
      team: "2 PMs",
      price: "Custom",
      color: "bg-[#F4A42C] text-white",
    },
    Collab: {
      lead: "Iva & Anamarija",
      team: "2 senior PMs",
      price: "Custom",
      color: "bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white",
    },
  };

  // Always use "Duo" and "Collab" if the state is set, but if the tier doesn't match, keep the original
  // Best: only change the displayed label; leave card data as is (package name, description, etc)
  const label = labelMap[currentLabelState];

  return (
    <Card key={index} className="border-2 border-gray-200 hover:border-[#EA3E3A]/30 transition-colors duration-300 h-full flex flex-col">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <Badge className={`${label.color} font-manrope text-xs`}>
            {currentLabelState}
          </Badge>
          <div className="flex items-center space-x-1 text-sm font-semibold text-[#EA3E3A]">
            <Euro className="h-4 w-4" />
            <span className="font-manrope">
              {label.price}
            </span>
          </div>
        </div>
        <CardTitle className="text-lg lg:text-xl font-bold font-manrope text-gray-900 leading-tight">
          {tier.packageName}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0 flex flex-col flex-grow">
        <div className="space-y-3 mb-6 flex-shrink-0">
          <PricingTierLead
            tier={tier}
            onPartnerClick={onPartnerClick}
            labelState={currentLabelState}
          />

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span className="font-manrope">Team: {label.team}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span className="font-manrope">
              Duration: {tier.format}
              {currentLabelState === 'Collab' && ' (async work)'}
            </span>
          </div>
        </div>

        <div className="space-y-4 flex-grow">
          <div>
            <h4 className="font-semibold text-gray-900 font-manrope mb-2">Best Fit:</h4>
            <p className="text-sm text-gray-600 font-manrope leading-relaxed break-words">
              {tier.useCase}
            </p>
          </div>

          {tier.outcomes && (
            <div>
              <h4 className="font-semibold text-gray-900 font-manrope mb-2">Outcomes:</h4>
              <p className="text-sm text-gray-600 font-manrope leading-relaxed break-words">
                {tier.outcomes}
              </p>
            </div>
          )}
        </div>

        <Button
          className="w-full bg-[#EA3E3A] hover:bg-[#EA3E3A]/90 text-white font-manrope mt-6 flex-shrink-0"
          asChild
        >
          <a href="https://calendly.com/iva-lmn3/30min">
            {ctaText}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

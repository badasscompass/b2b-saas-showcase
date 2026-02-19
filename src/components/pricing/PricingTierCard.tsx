
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, Euro } from "lucide-react";
import { PricingTier } from "@/components/PricingTiers";
import { PricingTierLead } from "./PricingTierLead";
import type { TierLabelState } from "./PricingTierLabelToggle";
import { analyticsService } from "@/services/analyticsService";

interface PricingTierCardProps {
  tier: PricingTier;
  index: number;
  ctaText: string;
  onPartnerClick: (partnerName: string) => void;
  labelState: TierLabelState;
  interest?: string;
  serviceTitle?: string;
  onRequestPackage?: (tier: PricingTier) => void;
}

export const PricingTierCard = ({
  tier,
  index,
  ctaText,
  onPartnerClick,
  labelState,
  interest,
  serviceTitle,
  onRequestPackage,
}: PricingTierCardProps) => {
  const isFractional = tier.packageName.toLowerCase().includes('fractional');
  const currentLabelState = isFractional ? 'Solo' : labelState;

  // Calculate pricing based on tier and labelState
  const calculatePrice = (basePricing: string, tierState: TierLabelState): string => {
    if (!basePricing) return "";
    
    // Handle hourly rates (fractional packages)
    if (basePricing.includes('/h') || basePricing.includes('€/h')) {
      const baseRate = parseInt(basePricing.match(/\d+/)?.[0] || "0");
      if (tierState === "Scaleup") {
        const newRate = baseRate + 10; // Increase hourly rate by 10€ for Scaleups
        return basePricing.replace(/\d+/, newRate.toString());
      } else if (tierState === "Growth") {
        const newRate = baseRate + 20; // Increase hourly rate by 20€ for Growth (10€ more than Scaleups)
        return basePricing.replace(/\d+/, newRate.toString());
      }
      return basePricing;
    }
    
    // Handle fixed pricing packages
    const basePrice = parseInt(basePricing.match(/\d+/)?.[0] || "0");
    if (tierState === "Scaleup") {
      const newPrice = basePrice + 1000; // Increase by 1000 for Scaleups
      return basePricing.replace(/\d+/, newPrice.toString());
    } else if (tierState === "Growth") {
      const newPrice = basePrice + 2000; // Increase by 2000 for Growth (1000 more than Scaleups)
      return basePricing.replace(/\d+/, newPrice.toString());
    }
    
    return basePricing;
  };

  // Determine format based on package characteristics
  const getFormat = (): string => {
    // Fractional packages (hourly rates or daily format)
    if (tier.pricing?.includes('/h') || tier.pricing?.includes('€/h') || tier.format?.toLowerCase().includes('daily')) {
      return "Embedded (Remote)";
    }
    // Collab packages (multiple team members)
    if (tier.tier === "Collab" || tier.teamSetup?.includes('2')) {
      return "Embedded (Hybrid)";
    }
    // Solo packages (single person, fixed duration)
    return "Embedded+Async (Remote)";
  };

  // Pick what to display based on labelState, but fallback to tier content if not available
  const labelMap = {
    Startup: {
      lead: tier.lead === "Both" ? "Iva" : tier.lead,
      format: getFormat(),
      price: tier.pricing ?? "",
      color: "bg-[#EA3E3A] text-white",
    },
    Scaleup: {
      lead: tier.lead === "Both" ? "Iva" : tier.lead,
      format: getFormat(),
      price: calculatePrice(tier.pricing ?? "", "Scaleup"),
      color: "bg-[#F4A42C] text-white",
    },
    Growth: {
      lead: tier.lead === "Both" ? "Iva" : tier.lead,
      format: getFormat(),
      price: calculatePrice(tier.pricing ?? "", "Growth"),
      color: "bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white",
    }
  };

  const label = labelMap[labelState];

  return (
    <Card key={index} className="border-2 border-gray-200 hover:border-[#EA3E3A]/30 transition-colors duration-300 h-full flex flex-col">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <Badge className={`${label.color} font-manrope text-xs`}>
            {labelState}
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
            labelState={labelState}
          />

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span className="font-manrope">Format: {label.format}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span className="font-manrope">
              Duration: {tier.format}
              {/* Only Solo supported, so no async work note needed */}
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

        <div className="flex flex-col gap-2 mt-6 flex-shrink-0">
          <Button
            className="w-full bg-[#EA3E3A] hover:bg-[#EA3E3A]/90 text-white font-manrope"
            asChild
          >
            <a
              href="https://calendly.com/iva-lmn3/30min"
              onClick={() => analyticsService.trackEvent('calendly_click', { category: 'conversion', label: ctaText, location: 'pricing_tier' })}
            >
              {ctaText}
            </a>
          </Button>
          {onRequestPackage && interest && serviceTitle && (
            <Button
              type="button"
              variant="outline"
              className="w-full border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A]/10 hover:text-primary font-manrope"
              onClick={() => {
                onRequestPackage(tier);
                analyticsService.trackEvent('inquiry_modal_open', { category: 'conversion', label: 'Request package info', package_name: tier.packageName });
              }}
            >
              Request package info
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

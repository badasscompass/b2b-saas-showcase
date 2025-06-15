
import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { PartnerBioDialog } from "@/components/PartnerBioDialog";
import { getPartnerByName } from "@/data/partnerBios";
import { PricingTierGrid } from "./pricing/PricingTierGrid";
import { PricingDisclaimer } from "./pricing/PricingDisclaimer";

export interface PricingTier {
  packageName: string;
  tier: 'Solo' | 'Duo' | 'Collab';
  lead: 'Iva' | 'Anamarija' | 'Both';
  teamSetup: string;
  format: string;
  useCase: string;
  outcomes?: string;
  pricing?: string;
}

interface PricingTiersProps {
  title?: string;
  subtitle?: string;
  tiers: PricingTier[];
  ctaText?: string;
}

export const PricingTiers = ({ 
  title = "Service Packages", 
  subtitle = "Choose the right engagement model for your needs",
  tiers = [],
  ctaText = "Get Started"
}: PricingTiersProps) => {
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  // Add error logging for debugging
  console.log('PricingTiers rendered with:', { title, subtitle, tiersLength: tiers.length, ctaText });

  if (!tiers || tiers.length === 0) {
    console.warn('PricingTiers: No tiers provided');
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600 font-manrope">No pricing tiers available.</p>
          </div>
        </div>
      </section>
    );
  }

  const handlePartnerClick = (partnerName: string) => {
    try {
      const fullName = partnerName === 'Iva' ? 'Iva Rumora' : 'Anamarija Ledic';
      const partner = getPartnerByName(fullName);
      if (partner) {
        setSelectedPartner(partner);
      }
    } catch (error) {
      console.error('Error handling partner click:', error);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-manrope text-gray-900 mb-4">
              {title}
            </h2>
            <p className="text-xl text-gray-600 font-manrope max-w-3xl mx-auto">
              {subtitle}
            </p>
          </div>

          <PricingTierGrid 
            tiers={tiers}
            ctaText={ctaText}
            onPartnerClick={handlePartnerClick}
          />

          <PricingDisclaimer />
        </div>
      </div>

      <Dialog open={!!selectedPartner} onOpenChange={() => setSelectedPartner(null)}>
        {selectedPartner && (
          <PartnerBioDialog partner={selectedPartner} />
        )}
      </Dialog>
    </section>
  );
};

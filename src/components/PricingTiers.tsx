
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Users, Clock, User } from "lucide-react";
import { useState } from "react";
import { PartnerBioDialog } from "@/components/PartnerBioDialog";
import { getPartnerByName } from "@/data/partnerBios";

export interface PricingTier {
  packageName: string;
  tier: 'Solo' | 'Duo' | 'Collab';
  lead: 'Iva' | 'Anamarija' | 'Both';
  teamSetup: string;
  format: string;
  useCase: string;
  outcomes?: string;
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

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Solo':
        return 'bg-[#EA3E3A] text-white';
      case 'Duo':
        return 'bg-[#F4A42C] text-white';
      case 'Collab':
        return 'bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getLeadIcon = (lead: string) => {
    if (lead === 'Both') {
      return <Users className="h-4 w-4" />;
    }
    return <User className="h-4 w-4" />;
  };

  const handleLeadClick = (leadName: string) => {
    try {
      if (leadName === 'Both') {
        // For "Both", we could show Iva as the primary contact
        const partner = getPartnerByName('Iva Rumora');
        if (partner) {
          setSelectedPartner(partner);
        }
      } else {
        const fullName = leadName === 'Iva' ? 'Iva Rumora' : 'Anamarija Ledic';
        const partner = getPartnerByName(fullName);
        if (partner) {
          setSelectedPartner(partner);
        }
      }
    } catch (error) {
      console.error('Error handling lead click:', error);
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-[#EA3E3A]/30 transition-colors duration-300 h-full flex flex-col">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${getTierColor(tier.tier)} font-manrope text-xs`}>
                      {tier.tier}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg lg:text-xl font-bold font-manrope text-gray-900 leading-tight">
                    {tier.packageName}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0 flex flex-col flex-grow">
                  <div className="space-y-3 mb-6 flex-shrink-0">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      {getLeadIcon(tier.lead)}
                      <span className="font-manrope">Lead: </span>
                      <button
                        onClick={() => handleLeadClick(tier.lead)}
                        className="text-[#EA3E3A] hover:text-[#EA3E3A]/80 underline font-medium transition-colors"
                      >
                        {tier.lead}
                      </button>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4 flex-shrink-0" />
                      <span className="font-manrope">Team: {tier.teamSetup}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="font-manrope">Duration: {tier.format}</span>
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
            ))}
          </div>
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

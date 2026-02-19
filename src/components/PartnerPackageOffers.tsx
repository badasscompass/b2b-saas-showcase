import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Euro, Send } from "lucide-react";
import { PackageOffer } from "@/data/partnerBios";
import { useNavigate } from "react-router-dom";
import { InquiryModal, type InquiryModalContext } from "@/components/InquiryModal";
import { analyticsService } from "@/services/analyticsService";

interface PartnerPackageOffersProps {
  packages: PackageOffer[];
  partnerName: string;
}

export const PartnerPackageOffers = ({ packages, partnerName }: PartnerPackageOffersProps) => {
  const navigate = useNavigate();
  const [inquiryContext, setInquiryContext] = useState<InquiryModalContext | null>(null);

  // Helper for LMN3 partners to map tier to lead name(s)
  const getLeadForPackage = (offer: PackageOffer) => {
    // Determine lead based on the offer and partner name (for Solo only)
    if (offer.tier !== "Solo") return null;
    // For Iva's bio, all Solo are Iva; for Anamarija's, Solo are Anamarija
    // partnerName here is the display name, e.g. "Iva Rumora"
    if (partnerName.toLowerCase().includes("iva")) return "Iva Rumora";
    return null;
  };

  const getTierColor = (tierType: string) => {
    switch (tierType) {
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

  const handlePackageClick = (packageOffer: PackageOffer) => {
    navigate(packageOffer.servicePage);
  };

  const handleRequestPackage = (packageOffer: PackageOffer) => {
    const interest = packageOffer.servicePage.replace(/^\//, "");
    setInquiryContext({
      interest,
      serviceTitle: packageOffer.serviceTitle,
      packageName: packageOffer.packageName,
    });
    analyticsService.trackEvent("inquiry_modal_open", {
      category: "conversion",
      label: "Request package info",
      package_name: packageOffer.packageName,
      location: "partner_package_offers",
    });
  };

  if (packages.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-3">
        {partnerName.split(' ')[0]}'s Signature Sprints
      </h4>
      
      <div className="grid gap-3">
        {packages.map((packageOffer, index) => (
          <Card key={index} className="border border-gray-200 hover:border-[#EA3E3A]/30 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge className={`${getTierColor(packageOffer.tier)} font-manrope text-xs`}>
                    {packageOffer.tier}
                  </Badge>
                  {packageOffer.pricing && (
                    <div className="flex items-center space-x-1 text-sm font-semibold text-[#EA3E3A]">
                      <Euro className="h-3 w-3" />
                      <span className="font-manrope text-xs">{packageOffer.pricing}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <h5 className="font-manrope font-semibold text-gray-900 mb-1">
                {packageOffer.packageName}
              </h5>
              
              {/* Show lead only for Solo packages */}
              {packageOffer.tier === "Solo" && (
                <div className="text-xs text-gray-500 font-manrope mb-2">
                  Lead:&nbsp;
                  <span className="font-semibold text-[#EA3E3A]">
                    {getLeadForPackage(packageOffer)}
                  </span>
                </div>
              )}
                            <p className="text-sm text-gray-600 font-manrope mb-3">
                Part of {packageOffer.serviceTitle}
              </p>
              
              <div className="flex flex-wrap gap-2 justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleRequestPackage(packageOffer)}
                  className="border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A]/10 hover:text-primary text-xs"
                >
                  <Send className="mr-1 h-3 w-3" />
                  Request package info
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handlePackageClick(packageOffer)}
                  className="border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A] hover:text-white text-xs"
                >
                  View Service Page
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <InquiryModal
        open={!!inquiryContext}
        onOpenChange={(open) => !open && setInquiryContext(null)}
        context={inquiryContext}
      />
    </div>
  );
};

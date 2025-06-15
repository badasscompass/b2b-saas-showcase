
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Euro } from "lucide-react";
import { PackageOffer } from "@/data/partnerBios";
import { useNavigate } from "react-router-dom";

interface PartnerPackageOffersProps {
  packages: PackageOffer[];
  partnerName: string;
}

export const PartnerPackageOffers = ({ packages, partnerName }: PartnerPackageOffersProps) => {
  const navigate = useNavigate();

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

  if (packages.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-3">
        {partnerName.split(' ')[0]}'s Package Offers
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
              
              <p className="text-sm text-gray-600 font-manrope mb-3">
                Part of {packageOffer.serviceTitle}
              </p>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => handlePackageClick(packageOffer)}
                className="border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A] hover:text-white text-xs"
              >
                View Service Page
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

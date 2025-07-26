import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { PartnerBio } from "@/data/partnerBios";

interface PartnerBioCardProps {
  partner: PartnerBio;
  onClick: () => void;
}

export const PartnerBioCard = ({ partner, onClick }: PartnerBioCardProps) => {
  return (
    <Card className="group cursor-pointer border-2 border-[#EA3E3A]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
      <CardContent className="p-6 text-center">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
          <OptimizedImage
            source={{ type: 'upload', url: partner.image, alt: partner.name }}
            config={{ width: 128, height: 128, quality: 80 }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loadingClassName="w-full h-full bg-gray-200"
            lazy={true}
            priority={false}
          />
        </div>
        
        <h3 className="font-manrope text-xl font-bold text-gray-900 mb-1">
          {partner.name}
        </h3>
        
        <div className="text-[#F4A42C] font-manrope font-semibold mb-1 text-sm">
          "{partner.informalName}"
        </div>
        
        <p className="text-[#EA3E3A] font-manrope font-medium mb-3">
          {partner.role}
        </p>
        
        <p className="text-gray-600 font-manrope text-sm leading-relaxed mb-4">
          {partner.shortDescription}
        </p>
        
        <div className="flex items-center justify-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A] hover:text-white"
          >
            <a
              href={partner.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Linkedin className="w-4 h-4 mr-1" />
              LinkedIn
            </a>
          </Button>
          
          <Button
            size="sm"
            onClick={onClick}
            className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white hover:from-[#EA3E3A]/90 hover:to-[#F4A42C]/90"
          >
            View Bio
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

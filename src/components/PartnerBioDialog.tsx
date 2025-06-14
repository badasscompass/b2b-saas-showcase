
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Linkedin, Mail } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { PartnerBio } from "@/data/partnerBios";

interface PartnerBioDialogProps {
  partner: PartnerBio;
}

export const PartnerBioDialog = ({ partner }: PartnerBioDialogProps) => {
  return (
    <DialogContent className="sm:max-w-4xl max-h-[90vh] w-[95vw] p-0">
      <DialogHeader className="p-6 pb-4">
        <DialogTitle className="font-manrope text-xl md:text-2xl text-gray-900">
          {partner.name} - "{partner.informalName}"
        </DialogTitle>
      </DialogHeader>
      
      <ScrollArea className="max-h-[calc(90vh-120px)] px-6">
        <div className="space-y-6 pb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-48 h-48 mx-auto md:mx-0 rounded-lg overflow-hidden flex-shrink-0">
              <OptimizedImage
                source={{ type: 'upload', url: partner.image, alt: partner.name }}
                config={{ width: 192, height: 192, quality: 80 }}
                className="w-full h-full object-cover"
                loadingClassName="w-full h-full bg-gray-200"
                lazy={false}
                priority={true}
              />
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-manrope text-lg font-semibold text-[#EA3E3A] mb-1">
                  {partner.role}
                </h3>
                <div className="text-gray-700 font-manrope leading-relaxed whitespace-pre-line">
                  {partner.fullDescription}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(partner.linkedinUrl, '_blank')}
                  className="border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A] hover:text-white"
                >
                  <Linkedin className="w-4 h-4 mr-1" />
                  Connect on LinkedIn
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('mailto:hello@lmn3.digital', '_blank')}
                  className="border-[#F4A42C] text-[#F4A42C] hover:bg-[#F4A42C] hover:text-white"
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Get in Touch
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-3">
              Expertise Areas
            </h4>
            <div className="flex flex-wrap gap-2">
              {partner.expertise.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-[#F4A42C] text-[#F4A42C]"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button 
              className="w-full bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white hover:from-[#EA3E3A]/90 hover:to-[#F4A42C]/90"
              onClick={() => window.open('mailto:hello@lmn3.digital', '_blank')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Start a Conversation
            </Button>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, User } from "lucide-react";
import { FlexibleImage } from "@/components/FlexibleImage";
import { GenericClientWork } from "@/types/clientWork";
import { getPartnerByName } from "@/data/partnerBios";
import { useAdvancedNavigation } from "@/hooks/useAdvancedNavigation";

interface ClientWorkDialogProps {
  work: GenericClientWork;
}

export const ClientWorkDialog = ({ work }: ClientWorkDialogProps) => {
  const { navigate } = useAdvancedNavigation();
  
  const handlePartnerClick = () => {
    if (work.lead) {
      const partner = getPartnerByName(work.lead);
      if (partner) {
        navigate('/about-us');
      }
    }
  };

  return (
    <DialogContent className="sm:max-w-4xl max-h-[90vh] w-[95vw] p-0">
      <DialogHeader className="p-6 pb-4">
        <DialogTitle className="font-manrope text-xl md:text-2xl text-gray-900">
          {work.title}
        </DialogTitle>
      </DialogHeader>
      <ScrollArea className="max-h-[calc(90vh-120px)] px-6">
        <div className="space-y-6 pb-6">
          <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
            <FlexibleImage
              source={work.image}
              config={{ width: 800, height: 400, quality: 80 }}
              className="w-full h-full object-cover"
              loadingClassName="w-full h-full"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-2">Lead</h4>
              <div className="flex items-center space-x-4">
                {work.lead && getPartnerByName(work.lead) ? (
                  <button
                    onClick={handlePartnerClick}
                    className="flex items-center text-[#EA3E3A] hover:text-[#F4A42C] transition-colors group"
                  >
                    <User className="h-4 w-4 mr-1" />
                    <span className="font-manrope underline group-hover:no-underline">{work.lead}</span>
                  </button>
                ) : (
                  <p className="text-gray-700 font-manrope">{work.lead}</p>
                )}
                <a 
                  href={`mailto:${work.email}`}
                  className="flex items-center text-[#EA3E3A] hover:text-[#F4A42C] transition-colors"
                >
                  <Mail className="h-4 w-4 mr-1" />
                  <span className="text-sm font-manrope">Email</span>
                </a>
              </div>
            </div>
            {work.sector && work.product && (
              <div>
                <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Sector & Product</h4>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-700 font-manrope">{work.sector} | </p>
                  {work.productUrl ? (
                    <a 
                      href={work.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#EA3E3A] hover:text-[#F4A42C] font-manrope underline"
                    >
                      {work.product}
                    </a>
                  ) : (
                    <span className="text-gray-700 font-manrope">{work.product}</span>
                  )}
                </div>
              </div>
            )}
            <div>
              <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Scope of Work</h4>
              <p className="text-gray-700 font-manrope">{work.scope}</p>
            </div>
            <div>
              <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Project Description</h4>
              <p className="text-gray-700 font-manrope leading-relaxed">{work.description}</p>
            </div>
            {work.resultsContent && (
              <div>
                <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">{work.resultsContent.timeframe}</h4>
                <div className="space-y-1 text-gray-700 font-manrope">
                  {work.resultsContent.results.map((result, index) => (
                    <p key={index}>{result}</p>
                  ))}
                  <br />
                  <p className="font-semibold text-[#F4A42C]">{work.resultsContent.insight}</p>
                </div>
              </div>
            )}
            {work.result && (
              <div>
                <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Results</h4>
                <p className="text-gray-700 font-manrope">{work.result}</p>
                {work.metrics && (
                  <>
                    <br/>
                    <p className="text-[#F4A42C] font-manrope font-semibold">{work.metrics}</p>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="pt-4 border-t">
            <Button 
              className="w-full bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white hover:from-[#EA3E3A]/90 hover:to-[#F4A42C]/90"
              asChild
            >
              <a href="mailto:hello@lmn3.digital">
                <Calendar className="mr-2 h-4 w-4" />
                Discuss Your Project
              </a>
            </Button>
          </div>
        </div>
      </ScrollArea>
    </DialogContent>
  );
};

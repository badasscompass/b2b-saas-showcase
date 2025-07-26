
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { FlexibleImage } from "@/components/FlexibleImage";
import { GenericClientWork } from "@/types/clientWork";
import { UnifiedClientWork } from "@/types/unified";
import { getPartnerByName } from "@/data/partnerBios";
import { useNavigation } from "@/hooks/useNavigation";

interface ClientWorkCardProps {
  work: GenericClientWork | UnifiedClientWork;
  onClick: () => void;
}

export const ClientWorkCard = ({ work, onClick }: ClientWorkCardProps) => {
  const { navigate } = useNavigation();
  
  // Function to extract first sentence and add ellipsis
  const getFirstSentence = (text: string) => {
    const sentences = text.split(/[.!?]+/);
    if (sentences.length > 1 && sentences[0].trim()) {
      return sentences[0].trim() + "...";
    }
    return text;
  };

  const handlePartnerClick = (e: React.MouseEvent, partnerName: string) => {
    e.stopPropagation();
    const partner = getPartnerByName(partnerName);
    if (partner) {
      navigate('/about-us');
    }
  };

  return (
    <Card 
      className="cursor-pointer border-2 border-[#EA3E3A]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-gradient-to-br from-white to-gray-50 h-[350px] flex flex-col w-full"
      onClick={onClick}
    >
      <CardHeader className="p-4 md:p-6 flex-1 flex flex-col relative h-full">
        <div className="w-full h-32 bg-gray-200 rounded-lg mb-3 overflow-hidden flex-shrink-0">
          <FlexibleImage
            source={work.image}
            config={{ width: 600, height: 300, quality: 80 }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loadingClassName="w-full h-full"
          />
        </div>
        
        <div className="flex-1 flex flex-col min-h-0 pb-14">
          <CardTitle className="font-manrope text-lg text-gray-900 mb-2 line-clamp-2 leading-tight">
            {work.title}
          </CardTitle>
          <div className="text-[#F4A42C] font-manrope font-semibold mb-2 text-sm line-clamp-1">
            {work.scope}
          </div>
          {work.lead && (
            <div className="text-xs text-gray-500 font-manrope mb-2">
              Led by{' '}
              <button
                onClick={(e) => handlePartnerClick(e, work.lead)}
                className="text-[#EA3E3A] hover:text-[#F4A42C] underline transition-colors"
              >
                {work.lead}
              </button>
            </div>
          )}
          <CardDescription className="text-gray-600 font-manrope leading-snug text-sm flex-1 line-clamp-3">
            {getFirstSentence(work.description)}
          </CardDescription>
        </div>
        
        <div className="absolute bottom-4 right-4 left-4 flex items-center justify-end text-[#EA3E3A] font-manrope font-semibold text-sm">
          <span className="whitespace-nowrap">View Case Study</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </div>
      </CardHeader>
    </Card>
  );
};


import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { FlexibleImage } from "@/components/FlexibleImage";
import { ClientWork } from "@/data/strategicAdvisoryClientWork";

interface ClientWorkCardProps {
  work: ClientWork;
  onClick: () => void;
}

export const ClientWorkCard = ({ work, onClick }: ClientWorkCardProps) => {
  return (
    <Card 
      className="cursor-pointer border-2 border-[#EA3E3A]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-gradient-to-br from-white to-gray-50 h-[500px] flex flex-col"
      onClick={onClick}
    >
      <CardHeader className="p-6 md:p-8 flex-1 flex flex-col relative">
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden flex-shrink-0">
          <FlexibleImage
            source={work.image}
            config={{ width: 600, height: 300, quality: 80 }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loadingClassName="w-full h-full"
          />
        </div>
        
        <div className="flex-1 flex flex-col">
          <CardTitle className="font-manrope text-lg md:text-xl text-gray-900 mb-2">
            {work.title}
          </CardTitle>
          <div className="text-[#F4A42C] font-manrope font-semibold mb-3 text-sm md:text-base">
            {work.scope}
          </div>
          <CardDescription className="text-gray-600 font-manrope leading-relaxed text-sm md:text-base line-clamp-4 flex-1">
            {work.description}
          </CardDescription>
        </div>
        
        <div className="absolute bottom-6 right-6 flex items-center text-[#EA3E3A] font-manrope font-semibold text-sm">
          View Case Study <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardHeader>
    </Card>
  );
};

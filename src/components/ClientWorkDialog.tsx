
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Calendar, Mail } from "lucide-react";
import { FlexibleImage } from "@/components/FlexibleImage";
import { ClientWork } from "@/data/strategicAdvisoryClientWork";

interface ClientWorkDialogProps {
  work: ClientWork;
}

const getResultsContent = (title: string) => {
  switch (title) {
    case "AI Trust & Adoption Strategy":
      return {
        timeframe: "Results in 45 days",
        results: [
          "• 3× increase in AI usage",
          "• +22% time saved per session",
          "• +47% boost in user satisfaction",
          "• First enterprise deal closed, directly tied to improved UX"
        ],
        insight: "Insight: Trust, not tech, unlocks real adoption in AI-driven products."
      };
    case "Product Positioning Clarity":
      return {
        timeframe: "Results in 3 months",
        results: [
          "• Strategic clarity across team and stakeholders",
          "• Benchmarked missing feature areas against category leaders",
          "• Prioritised strategic feature set aligned with development roadmap",
          "• Stronger product narrative and pitch for early-stage buyers",
          "• Website and messaging aligned with market fit"
        ],
        insight: "From MVP confusion to clear market positioning"
      };
    case "Onboarding Drop-Off Turned Into Activation Growth":
      return {
        timeframe: "Results in 3 weeks",
        results: [
          "• +24% onboarding completion",
          "• +38% Day 1 activation",
          "• 2× feature engagement"
        ],
        insight: "Lesson: Motivation gaps kill retention. Fixing them delivers compounding growth."
      };
    default:
      return null;
  }
};

export const ClientWorkDialog = ({ work }: ClientWorkDialogProps) => {
  const resultsContent = getResultsContent(work.title);

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
                <p className="text-gray-700 font-manrope">{work.lead}</p>
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
            {resultsContent && (
              <div>
                <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">{resultsContent.timeframe}</h4>
                <div className="space-y-1 text-gray-700 font-manrope">
                  {resultsContent.results.map((result, index) => (
                    <p key={index}>{result}</p>
                  ))}
                  <br />
                  <p className="font-semibold text-[#F4A42C]">{resultsContent.insight}</p>
                </div>
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

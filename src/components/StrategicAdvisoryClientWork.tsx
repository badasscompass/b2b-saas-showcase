
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Mail, Globe } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

const clientWork = [
  {
    title: "AI Trust & Adoption Strategy",
    scope: "User Experience & Trust Framework Design",
    description: "A legal tech client had a high-performing AI tool—accurate, fast, and reliable. But 80% of users bypassed it or manually rechecked results. The issue wasn't performance. It was trust. We identified decision-friction points, added explainability and confidence scores, integrated human benchmarks and educational UI, and reframed the AI as a user-controlled assistant, not a black box.",
    lead: "anamarija@lmn3.digital",
    image: "photo-1581091226825-a6a2a5aee158",
    email: "anamarija@lmn3.digital",
    website: "lmn3.digital"
  },
  {
    title: "Product Positioning Clarity",
    scope: "Strategic Positioning & Market Alignment", 
    description: "A middleware startup building an MVP (backend-as-a-service for DMS use cases) needed help defining what their product actually is—and who it's for. Working fractionally over 12 weeks, we co-created product vision, mission, and value proposition, developed a clear elevator pitch for internal and external alignment, conducted competitive landscape research, and refined product scope and UX based on strategic positioning.",
    lead: "iva@lmn3.digital",
    image: "photo-1488590528505-98d2b5aba04b",
    sector: "Middleware / Content Management",
    product: "contendo.io",
    email: "iva@lmn3.digital",
    website: "lmn3.digital"
  }
];

export const StrategicAdvisoryClientWork = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Client Work Showcase"
            subtitle="Explore how we've helped companies transform their strategic positioning and go-to-market approach."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {clientWork.map((work, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer border-2 border-[#EA3E3A]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-gradient-to-br from-white to-gray-50">
                    <CardHeader className="p-6 md:p-8">
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                        <img 
                          src={`https://images.unsplash.com/${work.image}?q=80&w=600&h=300&fit=crop`}
                          alt={work.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardTitle className="font-manrope text-lg md:text-xl text-gray-900 mb-2">
                        {work.title}
                      </CardTitle>
                      <div className="text-[#F4A42C] font-manrope font-semibold mb-3 text-sm md:text-base">
                        {work.scope}
                      </div>
                      <CardDescription className="text-gray-600 font-manrope leading-relaxed text-sm md:text-base line-clamp-3">
                        {work.description}
                      </CardDescription>
                      <div className="mt-4 flex items-center text-[#EA3E3A] font-manrope font-semibold text-sm">
                        View Case Study <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl max-h-[90vh] w-[95vw] p-0">
                  <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="font-manrope text-xl md:text-2xl text-gray-900">
                      {work.title}
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-[calc(90vh-120px)] px-6">
                    <div className="space-y-6 pb-6">
                      <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={`https://images.unsplash.com/${work.image}?q=80&w=800&h=400&fit=crop`}
                          alt={work.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-2">Lead</h4>
                          <div className="flex items-center space-x-4">
                            <p className="text-gray-700 font-manrope">{work.lead}</p>
                            <div className="flex items-center space-x-2">
                              <a 
                                href={`mailto:${work.email}`}
                                className="flex items-center text-[#EA3E3A] hover:text-[#F4A42C] transition-colors"
                              >
                                <Mail className="h-4 w-4 mr-1" />
                                <span className="text-sm font-manrope">Email</span>
                              </a>
                              <a 
                                href={`https://${work.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-[#EA3E3A] hover:text-[#F4A42C] transition-colors"
                              >
                                <Globe className="h-4 w-4 mr-1" />
                                <span className="text-sm font-manrope">Website</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        {work.sector && work.product && (
                          <div>
                            <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Sector & Product</h4>
                            <p className="text-gray-700 font-manrope">{work.sector} | {work.product}</p>
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
                        {work.title === "AI Trust & Adoption Strategy" && (
                          <div>
                            <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Results in 45 days</h4>
                            <div className="space-y-1 text-gray-700 font-manrope">
                              <p>• 3× increase in AI usage</p>
                              <p>• +22% time saved per session</p>
                              <p>• +47% boost in user satisfaction</p>
                              <p>• First enterprise deal closed, directly tied to improved UX</p>
                              <p className="mt-2 font-semibold text-[#F4A42C]">Insight: Trust, not tech, unlocks real adoption in AI-driven products.</p>
                            </div>
                          </div>
                        )}
                        {work.title === "Product Positioning Clarity" && (
                          <div>
                            <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Results in 12 weeks</h4>
                            <div className="space-y-1 text-gray-700 font-manrope">
                              <p>• Strategic clarity across team and stakeholders</p>
                              <p>• Stronger product narrative and pitch for early-stage buyers</p>
                              <p>• Website and messaging aligned with market fit</p>
                              <p className="mt-2 font-semibold text-[#F4A42C]">Client Win: From MVP confusion to clear market positioning</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="pt-4 border-t">
                        <Button className="w-full bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white hover:from-[#EA3E3A]/90 hover:to-[#F4A42C]/90">
                          <Calendar className="mr-2 h-4 w-4" />
                          Discuss Your Project
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

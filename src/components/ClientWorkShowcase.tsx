
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Mail } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { clientWork } from "@/data/productDevelopmentData";

export const ClientWorkShowcase = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title="Client Work Showcase"
            subtitle="Explore how we've helped companies transform their product development approach and accelerate time-to-market."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {clientWork.map((work, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer border-2 border-[#EA3E3A]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-gradient-to-br from-white to-gray-50">
                    <CardHeader className="p-6">
                      <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                        <img 
                          src={`https://images.unsplash.com/${work.image}?q=80&w=400&h=200&fit=crop`}
                          alt={work.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardTitle className="font-manrope text-lg text-gray-900 mb-2 line-clamp-2">
                        {work.title}
                      </CardTitle>
                      <div className="text-[#F4A42C] font-manrope font-semibold mb-3 text-sm">
                        {work.scope}
                      </div>
                      <CardDescription className="text-gray-600 font-manrope leading-relaxed text-sm line-clamp-4">
                        {work.description}
                      </CardDescription>
                      <div className="mt-4 flex items-center text-[#EA3E3A] font-manrope font-semibold text-sm">
                        View Case Study <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardHeader>
                  </Card>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle className="font-manrope text-xl md:text-2xl text-gray-900 mb-4">
                      {work.title}
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="max-h-[70vh] pr-4">
                    <div className="space-y-4">
                      <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
                        <img 
                          src={`https://images.unsplash.com/${work.image}?q=80&w=800&h=300&fit=crop`}
                          alt={work.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Lead</h4>
                          <div className="flex items-center space-x-4">
                            <p className="text-gray-700 font-manrope">{work.lead}</p>
                            <a 
                              href={`mailto:${work.lead}`}
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
                        <div>
                          <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Results</h4>
                  
                          <p className="text-gray-700 font-manrope">{work.result}</p>
                          <br/>
                          <p className="text-[#F4A42C] font-manrope font-semibold">{work.metrics}</p>
                          <br/>
                        </div>
                      </div>
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

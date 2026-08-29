import { CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { Link } from "react-router-dom";

interface ClientShowcase {
  title: string;
  serviceLabel: string;
  snippet: string;
  results: string[];
  sector: string;
  product: string;
  link: string;
}

const clientShowcases: ClientShowcase[] = [
  {
    title: "Airline IROPS Module Expansion & AI Co-Pilot (2026)",
    serviceLabel: "Product Ops in a Box & Fractional PM",
    snippet: "Led an airline pilot readiness assessment for an IROPs module, validating technical and domain assumptions with industry stakeholders and refining core business logic.",
    results: [
      "Pilot readiness validated with industry stakeholders",
      "Technical and domain assumptions confirmed; business logic refined",
      "UX improved for operations-team workflows",
      "AI co-pilot prototyped for faster disruption handling"
    ],
    sector: "B2B TravelTech | Airline IROP Management",
    product: "Flighter.ai — Airline Disruption Operations Platform",
    link: "/product-development"
  },
  {
    title: "Strategic Use Case Pivot within 1 month",
    serviceLabel: "Fractional Product Leadership & Product Clarity Sprints",
    snippet: "A bootstrapped CEE proptech startup building a platform for resident communities needed to resolve unclear product direction, onboarding friction, and stalled momentum.",
    results: [
      "Clearer product positioning and strategic narrative",
      "Streamlined onboarding with defined roles",
      "Introduced features enabling multi-stakeholder participation",
      "Core platform model aligned with new scalable B2B use case",
  
    ],
    sector: "PropTech | B2B Property Management",
    product: "Community & Facility Management Platform (Slovenia/EU)",
    link: "/strategic-advisory"
  }
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <SectionHeader 
          title="Featured Case Studies"
          subtitle="Real results from product teams in the portfolio"
          alignment="left"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {clientShowcases.map((showcase, index) => (
            <Card 
              key={index} 
              className="group border-2 border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50/50"
            >
              <CardContent className="p-6 md:p-8 flex flex-col h-full">
                <div className="mb-4">
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-[#F4A42C] font-manrope px-3 py-1.5 bg-gradient-to-r from-[#F4A42C]/10 to-[#EA3E3A]/10 rounded-full border border-[#F4A42C]/20">
                      {showcase.serviceLabel}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold font-manrope text-gray-900 mb-3">
                    {showcase.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#EA3E3A] font-manrope px-2 py-1 bg-[#EA3E3A]/10 rounded">
                      {showcase.sector}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 mb-6">
                  <p className="text-gray-700 font-manrope leading-relaxed text-sm md:text-base mb-4">
                    {showcase.snippet}
                  </p>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <ul className="space-y-2">
                      {showcase.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-800 font-manrope font-medium">
                            {result}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm font-semibold text-gray-900 font-manrope mb-2">
                    {showcase.product}
                  </p>
                  <Link 
                    to={`${showcase.link}#client-showcase`}
                    className="flex items-center gap-1 text-[#EA3E3A] font-manrope text-sm font-medium group-hover:gap-2 transition-all hover:text-[#F4A42C]"
                  >
                    <span>Go To Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};


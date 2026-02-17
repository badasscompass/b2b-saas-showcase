import { CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/SectionHeader";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";

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
    title: "Unblocking Remote Dev Team in 3 Weeks",
    serviceLabel: "Product Ops in a Box",
    snippet: "A startup was stuck in legacy code refactoring—no dev processes, no guidelines, and async workflow bottlenecks slowing progress.",
    results: [
      "Functional delivery flow re-established in 2 sprints",
      "Major bottleneck identified and cleared",
      "Defined and designed a new expanded scope for the platform"
    ],
    sector: "TravelTech | B2B Hospitality",
    product: "Platform for Booking and Travel Management, (Portugal/Spain)",
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
    <section id="testimonials" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto container-padding">
        <ScrollReveal>
        <SectionHeader 
          title="Featured Case Studies"
          subtitle="Real results from product teams we've worked with"
        />
        </ScrollReveal>
        
        <ScrollReveal delay={0.15}>
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
        </ScrollReveal>
      </div>
    </section>
  );
};


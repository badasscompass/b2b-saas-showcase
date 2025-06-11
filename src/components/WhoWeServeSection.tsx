
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, Gift, Star } from "lucide-react";

export const WhoWeServeSection = () => {
  const sections = [
    {
      icon: <Target className="h-8 w-8 text-[#EA3E3A]" />,
      title: "Who we help",
      items: [
        "Funded startups and scaleups (Seed → Series B)",
        "In-house B2B SaaS teams with 5–20 engineers", 
        "Technical or commercial founders needing product guidance or leadership"
      ]
    },
    {
      icon: <Gift className="h-8 w-8 text-[#F4A42C]" />,
      title: "What we offer",
      items: [
        "Embedded product leadership pods (2 or more product experts)",
        "Flexible, fractional involvement across delivery, growth, and GTM",
        "Structured product ops, growth loops, and messaging refinement"
      ]
    },
    {
      icon: <Star className="h-8 w-8 text-[#EA3E3A]" />,
      title: "Why we're different", 
      items: [
        "Senior-only team: every partner has 7–12+ years' experience",
        "Cross-functional by design: delivery + growth + marketing",
        "Adaptable pricing: retainers, SOW-based, or project bundles"
      ]
    }
  ];

  return (
    <section id="who-we-serve" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-gray-900">
            Built for Growing B2B Teams
          </h2>
          <p className="text-xl text-gray-600 font-manrope max-w-3xl mx-auto">
            We understand the unique challenges of leading product teams and provide tailored solutions for your growth stage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
              <CardHeader className="text-center p-8">
                <div className="mb-6 flex justify-center">
                  {section.icon}
                </div>
                <CardTitle className="mb-6 font-manrope text-xl text-gray-900">
                  {section.title}
                </CardTitle>
                <CardDescription className="text-left space-y-4 font-manrope">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#F4A42C] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

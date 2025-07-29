
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Target, Gift, Building2 } from "lucide-react";

export const WhoWeServeSection = () => {
  const sections = [
    {
      icon: <Target className="h-8 w-8 text-[#EA3E3A]" />,
      title: "Startups",
      subtitle: "Bootstrapped, Seed to Series A",
      items: [
        "Product strategy blueprints and north star definition",
        "MVP validation and product-market fit optimization",
        "Fractional product leadership for founding teams",
        "Go-to-market strategy and messaging refinement"
      ]
    },
    {
      icon: <Gift className="h-8 w-8 text-[#F4A42C]" />,
      title: "Scaleups",
      subtitle: "Series A to Series B",
      items: [
        "Embedded product leadership and team scaling",
        "Growth loop optimization and retention strategies", 
        "Product operations and delivery process refinement",
        "Cross-functional alignment between product, sales, and marketing"
      ]
    },
    {
      icon: <Building2 className="h-8 w-8 text-[#EA3E3A]" />,
      title: "Empowered Product Teams", 
      subtitle: "SMBs, in-house teams & dev agencies",
      items: [
        "Product audit and optimization consulting",
        "Team structure and workflow consulting",
        "Agency partnership and white-label services",
        "Custom sprints and product leadership"
      ]
    }
  ];

  return (
    <section id="who-we-serve" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-gray-900">
            Built for Ambitious B2B Teams
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
                <CardTitle className="mb-2 font-manrope text-xl text-gray-900">
                  {section.title}
                </CardTitle>
                <p className="text-sm text-gray-500 font-manrope mb-6">
                  {section.subtitle}
                </p>
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

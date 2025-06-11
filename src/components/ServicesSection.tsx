import { Rocket, Users, Cog, ArrowRight, Target } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ServicesSection = () => {
  const services = [
    {
      icon: <Rocket className="h-12 w-12 text-[#EA3E3A]" />,
      title: "Product Development",
      subtitle: "From MVP to Launch",
      description: "Transform your vision into ready-to-launch products with proven development processes and senior product expertise.",
      features: ["MVP Strategy & Development", "Product Roadmapping", "Product Architecture", "User Testing & Validation"],
      link: "/product-development",
      gradient: "from-[#EA3E3A]/10 to-[#F4A42C]/10",
      borderColor: "border-[#EA3E3A]/20"
    },
    {
      icon: <Cog className="h-12 w-12 text-[#F4A42C]" />,
      title: "Strategic Advisory",
      subtitle: "Clear Direction & Positioning",
      description: "Guiding early-stage founders in defining their value proposition, market positioning, and go-to-market strategy.",
      features: ["Value Proposition Design", "Market Positioning", "Competitive Analysis", "GTM Strategy"],
      link: "/strategic-advisory",
      gradient: "from-[#F4A42C]/10 to-[#FFF33B]/10",
      borderColor: "border-[#F4A42C]/20"
    },
    {
      icon: <Target className="h-12 w-12 text-[#EA3E3A]" />,
      title: "Product Marketing & GTM",
      subtitle: "Strategy to Scale",
      description: "Launch smarter, reach buyers faster, and drive growth with a data-driven and creative go-to-market engine.",
      features: ["Unique Selling Proposition", "Market Segmentation", "GTM Planning & Support", "Sales Enablement & Metrics"],
      link: "/product-marketing-gtm",
      gradient: "from-[#EA3E3A]/10 to-[#F4A42C]/10",
      borderColor: "border-[#EA3E3A]/20"
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-manrope text-gray-900">
            Our Expertise
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-manrope max-w-3xl mx-auto leading-relaxed">
            Comprehensive product leadership across every stage of your growth journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card key={index} className={`relative overflow-hidden border-2 ${service.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group bg-gradient-to-br ${service.gradient}`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-80"></div>
              <CardHeader className="relative text-center p-6 md:p-8">
                <div className="mb-4 md:mb-6 flex justify-center">
                  <div className="p-3 md:p-4 bg-white rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                </div>
                <CardTitle className="mb-2 md:mb-3 font-manrope text-lg md:text-xl text-gray-900">
                  {service.title}
                </CardTitle>
                <p className="text-[#F4A42C] font-manrope font-semibold mb-3 md:mb-4 text-sm md:text-base">
                  {service.subtitle}
                </p>
                <CardDescription className="text-gray-600 font-manrope leading-relaxed text-sm md:text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative px-6 md:px-8 pb-6 md:pb-8">
                <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#F4A42C] rounded-full flex-shrink-0"></div>
                      <span className="text-gray-700 font-manrope text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A] hover:text-white group-hover:bg-[#EA3E3A] group-hover:text-white transition-all text-sm md:text-base"
                  asChild
                >
                  <Link to={service.link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

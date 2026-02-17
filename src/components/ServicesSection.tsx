import { Rocket, Users, Cog, ArrowRight, Target } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ScrollReveal";

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
    <section id="services" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto container-padding">
        <ScrollReveal>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 font-manrope text-gray-900">
            Our Expertise
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-manrope max-w-3xl mx-auto leading-relaxed">
            Comprehensive product leadership across every stage of your growth journey.
          </p>
        </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Card key={index} className={`relative overflow-hidden border-2 ${service.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group bg-white`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <CardHeader className="relative text-center p-6 md:p-8 bg-white group-hover:bg-transparent transition-colors duration-300">
                <div className="mb-4 md:mb-6 flex justify-center">
                  <div className="p-4 md:p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 border border-gray-100">
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
              <CardContent className="relative px-6 md:px-8 pb-6 md:pb-8 bg-white group-hover:bg-transparent transition-colors duration-300">
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${featureIndex * 50}ms` }}>
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="text-gray-700 font-manrope text-sm md:text-base leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A] hover:text-white group-hover:bg-gradient-to-r group-hover:from-[#EA3E3A] group-hover:to-[#F4A42C] group-hover:border-transparent transition-all duration-300 text-sm md:text-base font-semibold"
                  asChild
                >
                  <Link to={service.link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

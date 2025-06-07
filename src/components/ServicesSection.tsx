
import { Rocket, Users, Cog, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ServicesSection = () => {
  const services = [
    {
      icon: <Rocket className="h-12 w-12 text-[#EA3E3A]" />,
      title: "Product Development",
      subtitle: "From MVP to Scale",
      description: "Transform your vision into ready-to-launch products with proven development processes and senior product expertise.",
      features: ["MVP Strategy & Development", "Product Roadmapping", "Technical Architecture", "User Testing & Validation"],
      link: "/product-development"
    },
    {
      icon: <Cog className="h-12 w-12 text-[#F4A42C]" />,
      title: "Strategic Advisory",
      subtitle: "Clear Direction & Positioning",
      description: "Guide early-stage founders in defining their value proposition, market positioning, and go-to-market strategy.",
      features: ["Value Proposition Design", "Market Positioning", "Competitive Analysis", "GTM Strategy"],
      link: "#"
    },
    {
      icon: <Users className="h-12 w-12 text-[#EA3E3A]" />,
      title: "User Experience",
      subtitle: "Intuitive & Conversion-Focused",
      description: "Create intuitive experiences that delight users and drive adoption through data-driven design decisions.",
      features: ["UX/UI Design", "User Research", "Conversion Optimization", "Design Systems"],
      link: "#"
    },
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-gray-900">
            Our Expertise
          </h2>
          <p className="text-xl text-gray-600 font-manrope max-w-3xl mx-auto">
            Comprehensive product leadership across every stage of your growth journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="text-center p-8">
                <div className="mb-6 flex justify-center">
                  {service.icon}
                </div>
                <CardTitle className="mb-2 font-manrope text-xl text-gray-900">
                  {service.title}
                </CardTitle>
                <p className="text-[#F4A42C] font-manrope font-medium mb-4">
                  {service.subtitle}
                </p>
                <CardDescription className="text-gray-600 font-manrope leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#F4A42C] rounded-full"></div>
                      <span className="text-gray-700 font-manrope">{feature}</span>
                    </li>
                  ))}
                </ul>
                {service.link === "#" ? (
                  <Button 
                    variant="outline" 
                    className="w-full border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A] hover:text-white group-hover:bg-[#EA3E3A] group-hover:text-white transition-all"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A] hover:text-white group-hover:bg-[#EA3E3A] group-hover:text-white transition-all"
                    asChild
                  >
                    <Link to={service.link}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

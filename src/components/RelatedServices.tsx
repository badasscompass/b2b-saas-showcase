import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket, Cog, Target } from "lucide-react";

interface RelatedServicesProps {
  currentService: string;
}

export const RelatedServices = ({ currentService }: RelatedServicesProps) => {
  const allServices = [
    {
      icon: <Rocket className="h-8 w-8 text-[#EA3E3A]" />,
      title: "Product Development",
      description: "Transform your vision into ready-to-launch products",
      link: "/product-development",
      slug: "product-development"
    },
    {
      icon: <Cog className="h-8 w-8 text-[#F4A42C]" />,
      title: "Strategic Advisory",
      description: "Clear direction and positioning for product teams",
      link: "/strategic-advisory",
      slug: "strategic-advisory"
    },
    {
      icon: <Target className="h-8 w-8 text-[#EA3E3A]" />,
      title: "Product Marketing & GTM",
      description: "Data-driven go-to-market strategies that scale",
      link: "/product-marketing-gtm",
      slug: "product-marketing-gtm"
    }
  ];

  const relatedServices = allServices.filter(service => service.slug !== currentService);

  if (relatedServices.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-manrope text-gray-900 mb-4">
            Explore Our Other Services
          </h2>
          <p className="text-gray-600 font-manrope max-w-2xl mx-auto">
            Comprehensive product leadership across every stage of your growth journey with Iva Rumora and the LMN3 team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {relatedServices.map((service, index) => (
            <Card key={index} className="border-2 border-gray-200 hover:border-[#EA3E3A]/30 hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-[#EA3E3A]/10 transition-colors">
                    {service.icon}
                  </div>
                  <div>
                    <CardTitle className="font-manrope text-lg text-gray-900 group-hover:text-[#EA3E3A] transition-colors">
                      {service.title}
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="text-gray-600 font-manrope mb-4">
                  {service.description}
                </CardDescription>
                <Button 
                  variant="outline" 
                  className="w-full border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A] hover:text-white transition-all"
                  asChild
                >
                  <Link to={service.link}>
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
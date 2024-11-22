import { Database, Users, Cog } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const ServicesSection = () => {
  const services = [
    {
      icon: <Database className="h-12 w-12 text-primary" />,
      title: "Product Strategy",
      description: "Develop winning strategies that align with market demands and business goals",
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: "User Experience",
      description: "Create intuitive experiences that delight users and drive adoption",
    },
    {
      icon: <Cog className="h-12 w-12 text-primary" />,
      title: "Technical Advisory",
      description: "Navigate technical decisions with confidence and clarity",
    },
  ];

  return (
    <section className="py-20 bg-[#F6F6F7]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="text-center">
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <CardTitle className="mb-2">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
import { Rocket, Users, Cog } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const ServicesSection = () => {
  const services = [
    {
      icon: <Rocket className="h-12 w-12" style={{ stroke: "url(#gradient)" }} />,
      title: "MVP Development",
      description: "Transform your vision to ready to launch products",
    },
    {
      icon: <Cog className="h-12 w-12" style={{ stroke: "url(#gradient)" }} />,
      title: "Strategic Advisory",
      description: "Guiding early-stage founders in defining their value proposition and positioning",
    },
    {
      icon: <Users className="h-12 w-12" style={{ stroke: "url(#gradient)" }} />,
      title: "User Experience",
      description: "Create intuitive experiences that delight users and drive adoption",
    },
  ];

  return (
    <section className="py-20 bg-[#F6F6F7]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Expertise</h2>
        <div className="flex flex-col items-center gap-6">
          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#EA3E3A" }} />
                <stop offset="100%" style={{ stopColor: "#FFF33B" }} />
              </linearGradient>
            </defs>
          </svg>
          <div className="w-full md:w-1/2">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
              <CardHeader className="text-center flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-4 flex justify-center">{services[0].icon}</div>
                  <CardTitle className="mb-2">{services[0].title}</CardTitle>
                  <CardDescription>{services[0].description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.slice(1).map((service, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full">
                <CardHeader className="text-center flex-1 flex flex-col justify-between">
                  <div>
                    <div className="mb-4 flex justify-center">{service.icon}</div>
                    <CardTitle className="mb-2">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
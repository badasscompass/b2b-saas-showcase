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
      icon: <Users className="h-12 w-12" style={{ stroke: "url(#gradient)" }} />,
      title: "User Experience",
      description: "Create intuitive experiences that delight users and drive adoption",
    },
    {
      icon: <Cog className="h-12 w-12" style={{ stroke: "url(#gradient)" }} />,
      title: "Strategic Advisory",
      description: "Providing guidance to early-stage founders in proofing their value prop and positioning",
    },
  ];

  return (
    <section className="py-20 bg-[#F6F6F7]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <svg width="0" height="0">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: "#EA3E3A" }} />
                <stop offset="100%" style={{ stopColor: "#FFF33B" }} />
              </linearGradient>
            </defs>
          </svg>
          {services.map((service, index) => (
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
    </section>
  );
};
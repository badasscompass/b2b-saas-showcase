
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { Target, Rocket, Users, ArrowRight, Calendar } from "lucide-react";

export const WhoWeServeSection = () => {
  const sections = [
    {
      icon: Target,
      title: "Startups",
      subtitle: "Bootstrapped, Seed to Series A",
      gradient: "from-red-50 to-red-100",
      iconBg: "bg-gradient-to-br from-red-500 to-red-600",
      items: [
        "MVP validation and product-market fit optimization",
        "Product strategy blueprints and north star definition",
        "Fractional product leadership for founding teams",
        "Go-to-market strategy and messaging refinement"
      ],
      cta: "Validate Your Idea"
    },
    {
      icon: Rocket,
      title: "Scaleups",
      subtitle: "Series A to Series B",
      gradient: "from-orange-50 to-orange-100",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      items: [
        "Embedded product leadership and team scaling",
        "Growth loop optimization and retention strategies", 
        "Product operations and delivery process refinement",
        "Cross-functional alignment between product, sales, and marketing"
      ],
      cta: "Scale Your Growth"
    },
    {
      icon: Users,
      title: "Empowered Product Teams", 
      subtitle: "SMBs, in-house teams & dev agencies",
      gradient: "from-red-50 to-orange-50",
      iconBg: "bg-gradient-to-br from-red-500 to-orange-500",
      items: [
        "Product audit and optimization consulting",
        "Team structure and workflow consulting",
        "Agency partnership and white-label PM services",
        "Custom sprints and product leadership"
      ],
      cta: "Empower Your Team"
    }
  ];

  return (
    <section id="who-we-serve" className="section-padding bg-gradient-to-b from-white via-gray-50/30 to-white">
      <div className="container mx-auto container-padding">
        <SectionHeader 
          title="Designed for Ambitious B2B Teams"
          subtitle="We understand the unique challenges of leading product teams and provide tailored solutions for all your growth stages."
        />

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 lg:items-stretch">
  {sections.map((section, index) => {
    const IconComponent = section.icon;
    return (
      <Card 
        key={index} 
        className={`group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${section.gradient} overflow-hidden relative flex flex-col h-full`}
      >
  {/* Background pattern stays the same */}
  <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  
  <CardHeader className="relative p-8 text-center flex flex-col h-full">
    {/* Icon section - stays the same */}
    <div className="mb-6 flex justify-center">
      <div className={`w-16 h-16 rounded-2xl ${section.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <IconComponent className="h-8 w-8 text-white" />
      </div>
    </div>

    {/* Title and subtitle - stays the same */}
    <CardTitle className="mb-2 font-manrope text-xl text-gray-900 group-hover:text-gray-800 transition-colors">
      {section.title}
    </CardTitle>
    
    <p className="text-base text-gray-600 font-manrope mb-12 font-medium">
      {section.subtitle}
    </p>

    {/* Content area that grows to fill space */}
    <div className="flex-1 flex flex-col">
      <div className="text-left space-y-4 font-manrope mb-8 flex-1 text-sm text-muted-foreground">
        {section.items.map((item, itemIndex) => (
          <div key={itemIndex} className="flex items-start space-x-3 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${itemIndex * 50}ms` }}>
            <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mt-2.5 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
            <span className="text-gray-700 leading-relaxed text-base">{item}</span>
          </div>
        ))}
      </div>

      {/* CTA button - now at bottom */}
      <Button 
        variant="outline" 
        className="w-full group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-orange-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 font-manrope mt-auto"
        asChild
      >
        <a href="https://calendly.com/iva-lmn3/30min" className="flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" />
          {section.cta}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </a>
      </Button>
    </div>
  </CardHeader>
</Card>
           );
          })}
        </div>
      </div>
    </section>
  );
};

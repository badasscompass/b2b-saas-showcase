
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { Lightbulb, Target, TrendingUp, MessageSquare } from "lucide-react";

const services = [
  {
    icon: <Lightbulb className="h-8 w-8 text-[#EA3E3A]" />,
    title: "Value Proposition Design",
    description: "We help you define the core value your product delivers, using frameworks like Jobs-To-Be-Done and Value Proposition Canvas. This ensures messaging resonates with real customer needs and highlights your unique value over alternatives."
  },
  {
    icon: <Target className="h-8 w-8 text-[#F4A42C]" />,
    title: "Market Positioning & Competitive Analysis", 
    description: "We map your competitive landscape and identify gaps in the market to position you strategically. Expect a refined positioning statement and segmentation informed by buyer personas and competitor comparison."
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-[#EA3E3A]" />,
    title: "Go-to-Market (GTM) Strategy",
    description: "We craft a GTM roadmap that includes audience targeting, pricing strategy, channel selection, and launch planning, drawing on proven GTM frameworks."
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-[#F4A42C]" />,
    title: "Messaging Framework & Launch Readiness",
    description: "We create a coherent messaging system for internal and external communication. This includes positioning statements, feature–benefit messaging, and launch assets ready to activate."
  }
];

export const StrategicAdvisoryServices = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="What We Do" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

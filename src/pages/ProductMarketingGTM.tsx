
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { ServiceSection } from "@/components/layout/ServiceSection";
import { ServiceCard } from "@/components/ServiceCard";
import { ProcessStep } from "@/components/ProcessStep";
import { SuccessMetric } from "@/components/SuccessMetric";
import { PageCTA } from "@/components/PageCTA";
import { Target, Users, Rocket, BarChart3 } from "lucide-react";

const ProductMarketingGTM = () => {
  const whatWeDo = [
    {
      icon: <Target className="h-8 w-8 text-[#EA3E3A]" />,
      title: "Value Proposition & Messaging Frameworks",
      description: "We craft clear, compelling messaging rooted in frameworks like JTBD and STP—ensuring your story resonates deeply with your ideal buyers.",
    },
    {
      icon: <Users className="h-8 w-8 text-[#F4A42C]" />,
      title: "Market Segmentation & Positioning",
      description: "We break your market into high-opportunity segments, define buyer personas, and create positioning that clearly maps your unique value in context.",
    },
    {
      icon: <Rocket className="h-8 w-8 text-[#EA3E3A]" />,
      title: "Go-to-Market Planning & Launch Execution",
      description: "From channel selection to pricing strategy and launch readiness, we build and execute GTM roadmaps—collaborating across product, sales, and marketing for maximum impact.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-[#F4A42C]" />,
      title: "Sales Enablement & Performance Metrics",
      description: "We design playbooks, demos, case studies, and enablement tools—and track key metrics like CAC, CLV, and close rate to continuously optimize performance.",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Discovery & Benchmarking",
      description: "Audit current positioning, messaging, and pipeline performance to find gaps and opportunities.",
    },
    {
      step: "02",
      title: "Segmentation & Messaging Sprint",
      description: "Align on target segments, value propositions, and messaging frameworks to resonate with buyers.",
    },
    {
      step: "03",
      title: "GTM Roadmap & Asset Creation",
      description: "Build launch assets, define pricing tiers, map channels, and prepare sales teams.",
    },
    {
      step: "04",
      title: "Launch & Optimize",
      description: "Coordinate launch, calibrate messaging, and kick off early GTM initiatives with analytics support.",
    },
  ];

  const successMetrics = [
    "Messaging that converts — reducing CAC by x%",
    "Increased demo and trial conversion rates through clear positioning",
    "Sales-ready assets that reduce friction and align teams",
    "Measurable, evolving GTM engine with performance dashboards",
  ];

  const whyItWorks = [
    "Connects product and market through data-driven frameworks",
    "Anchored in buyer language, not feature lists",
    "Covers the full journey: messaging → launch → performance",
    "Offers measurable value tied to real business outcomes",
  ];

  return (
    <ServicePageLayout
      title="Product Marketing & GTM"
      subtitle="Launch smarter, reach buyers faster, and drive growth with a data-driven go-to-market engine."
      ctaText="Book a GTM Discovery Call"
      footerTagline="Launching products that win markets."
    >
      <ServiceSection title="What We Do" background="white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whatWeDo.map((item, index) => (
            <ServiceCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </ServiceSection>

      <ServiceSection title="How It Works" background="gray">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step, index) => (
            <ProcessStep
              key={index}
              step={step.step}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </ServiceSection>

      <ServiceSection title="What Success Looks Like" background="white">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 gap-4">
            {successMetrics.map((metric, index) => (
              <SuccessMetric key={index} text={metric} />
            ))}
          </div>
        </div>
      </ServiceSection>

      <ServiceSection title="Why This Works" background="gray">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyItWorks.map((reason, index) => (
              <div key={index} className="flex items-start space-x-3 p-4">
                <div className="w-2 h-2 bg-[#F4A42C] rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-gray-700 font-manrope text-lg leading-relaxed">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </ServiceSection>

      <PageCTA
        title="Ready to Transform Your GTM Strategy?"
        subtitle="Looking to launch with precision and scale efficiently? Let's book a call to design your tailored GTM strategy and activation plan."
        ctaText="Book a GTM Discovery Call"
      />
    </ServicePageLayout>
  );
};

export default ProductMarketingGTM;

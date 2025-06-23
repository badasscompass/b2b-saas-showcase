import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { ServiceSection } from "@/components/layout/ServiceSection";
import { ServiceCard } from "@/components/ServiceCard";
import { ProcessStep } from "@/components/ProcessStep";
import { SuccessMetric } from "@/components/SuccessMetric";
import { PageCTA } from "@/components/PageCTA";
import { PricingTiers } from "@/components/PricingTiers";
import { productMarketingGTMPricingTiers } from "@/data/productMarketingGTMData";
import { whatWeDo, howItWorks, successMetrics, whyItWorks } from "@/data/productMarketingGTMData";
import { Target, Users, Rocket, BarChart3 } from "lucide-react";

const ProductMarketingGTM = () => {
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

      <PricingTiers 
        title="Product Marketing & GTM Packages"
        subtitle="Choose the right marketing engagement to accelerate your go-to-market success"
        tiers={productMarketingGTMPricingTiers}
        ctaText="Book a GTM Discovery Call"
      />
      <PageCTA
        title="Ready to Transform Your GTM Strategy?"
        subtitle="Looking to launch with precision and scale efficiently? Let's book a call to design your tailored GTM strategy and activation plan."
        ctaText="Book a GTM Discovery Call"
      />
    </ServicePageLayout>
  );
};

export default ProductMarketingGTM;

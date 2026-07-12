import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { ServiceSection } from "@/components/layout/ServiceSection";
import { ServiceCard } from "@/components/ServiceCard";
import { ProcessStep } from "@/components/ProcessStep";
import { SuccessMetric } from "@/components/SuccessMetric";
import { PageCTA } from "@/components/PageCTA";
import { RelatedServices } from "@/components/RelatedServices";
import { PricingTiers } from "@/components/PricingTiers";
import { productMarketingGTMPricingTiers } from "@/data/productMarketingGTMData";
import { whatWeDo, howItWorks, successMetrics, whyItWorks } from "@/data/productMarketingGTMData";
import { Target, Users, Rocket, BarChart3 } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { useEffect } from "react";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { analyticsService } from "@/services/analyticsService";

const ProductMarketingGTM = () => {
  useScrollDepth("product-marketing-gtm");
  useEffect(() => {
    analyticsService.trackEvent('view_item', {
      item_id: 'product-marketing-gtm',
      item_name: 'Product Marketing & GTM Services',
      item_category: 'Service',
    });
  }, []);

  useSEO({
    title: "Product Marketing & GTM Services by Iva Rumora | LMN3",
    description: "Launch smarter with Iva Rumora's data-driven go-to-market strategies. Product marketing expertise to reach buyers faster and scale effectively.",
    keywords: ["product marketing", "go-to-market", "GTM strategy", "launch strategy", "Iva Rumora", "LMN3"],
    canonicalUrl: "https://lmn3.digital/product-marketing-gtm",
    openGraph: {
      type: "service",
      url: "https://lmn3.digital/product-marketing-gtm"
    },
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "name": "Product Marketing & Go-to-Market Services",
          "url": "https://lmn3.digital/product-marketing-gtm",
          "provider": {
            "@type": "Organization",
            "name": "LMN3",
            "url": "https://lmn3.digital",
            "founder": { "@type": "Person", "name": "Iva Rumora" }
          },
          "description": "Data-driven product marketing and go-to-market strategy services for B2B SaaS and product-led companies — positioning, launch, and growth.",
          "serviceType": "Product Marketing Consulting",
          "areaServed": "Worldwide",
          "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": "https://lmn3.digital/product-marketing-gtm"
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Product Marketing & GTM Packages",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "GTM Strategy Sprint" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Product Launch Playbook" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fractional Product Marketer" } }
            ]
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://lmn3.digital/" },
            { "@type": "ListItem", "position": 2, "name": "Product Marketing & GTM", "item": "https://lmn3.digital/product-marketing-gtm" }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is a go-to-market (GTM) strategy?",
              "acceptedAnswer": { "@type": "Answer", "text": "A GTM strategy defines who you sell to, how you position the product, which channels you use to reach them, and how you price, launch, and measure adoption — turning product capability into revenue." }
            },
            {
              "@type": "Question",
              "name": "How is product marketing different from product management?",
              "acceptedAnswer": { "@type": "Answer", "text": "Product management decides what to build and why. Product marketing decides how to position, launch, and communicate it so buyers understand the value and choose it over alternatives." }
            },
            {
              "@type": "Question",
              "name": "What does a product launch playbook include?",
              "acceptedAnswer": { "@type": "Answer", "text": "A launch playbook covers audience segmentation, messaging, positioning, channel plan, launch assets, internal enablement, and success metrics — everything the team needs to execute a coordinated launch." }
            },
            {
              "@type": "Question",
              "name": "Do you help with pricing and packaging?",
              "acceptedAnswer": { "@type": "Answer", "text": "Yes — pricing, packaging, and tier design are core parts of most GTM engagements, informed by buyer willingness-to-pay, competitive benchmarks, and business goals." }
            },
            {
              "@type": "Question",
              "name": "How do you measure GTM success?",
              "acceptedAnswer": { "@type": "Answer", "text": "Typical metrics include activation rate, time-to-value, pipeline created, win rate against key competitors, and revenue from the launched feature or segment within a defined window." }
            }
          ]
        }
      ]
    }
  });
  return (
    <ServicePageLayout
      title="Product Marketing & GTM"
      subtitle="Launch smarter, reach buyers faster, and drive growth with a data-driven go-to-market engine."
      ctaText="Book a GTM Discovery Call"
      footerTagline="Launching products that win markets."
      serviceKey="product-marketing-gtm"
      serviceTitle="Product Marketing & GTM"
    >
      <ServiceSection title="What's Included" background="white">
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

      <PricingTiers 
        title="Product Marketing & GTM Packages"
        subtitle="Choose the right marketing engagement to accelerate your go-to-market success"
        tiers={productMarketingGTMPricingTiers}
        ctaText="Book a GTM Discovery Call"
        interest="product-marketing-gtm"
        serviceTitle="Product Marketing & GTM"
      />

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
      
      <RelatedServices currentService="product-marketing-gtm" />
      
      <PageCTA
        title="Ready to Transform Your GTM Strategy?"
        subtitle="Looking to launch with precision and scale efficiently? Let's book a call to design your tailored GTM strategy and activation plan."
        ctaText="Book a GTM Discovery Call"
      />
    </ServicePageLayout>
  );
};

export default ProductMarketingGTM;

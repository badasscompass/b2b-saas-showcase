
import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/HeroSection";
import { WhoWeServeSection } from "@/components/WhoWeServeSection";
import { ServicesSection } from "@/components/ServicesSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { PageCTA } from "@/components/PageCTA";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Iva Rumora & LMN3 | Strategic Product Development & Advisory",
    description: "Iva Rumora leads LMN3, providing strategic product development, advisory services, and go-to-market expertise for startups and enterprises. 9+ years of product leadership experience.",
    keywords: ["Iva Rumora", "LMN3", "product development", "strategic advisory", "product consultant", "startup advisor", "product management", "product manager", "senior product manager", "product management consultant", "product leadership", "go-to-market strategy"],
    canonicalUrl: "https://lmn3.digital",
    openGraph: {
      type: "website",
      url: "https://lmn3.digital",
      image: "https://lmn3.digital/lovable-uploads/lmn3_logo_white.jpg"
    },
    twitter: {
      card: "summary_large_image",
      site: "@LMN3",
      creator: "@IvaRumora"
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "LMN3",
      "url": "https://lmn3.digital",
      "logo": "https://lmn3.digital/lovable-uploads/lmn3_logo_white.jpg",
      "description": "Strategic product development and advisory consulting led by Iva Rumora",
      "founder": {
        "@type": "Person",
        "name": "Iva Rumora",
        "jobTitle": "Strategic Product Partner & Founder"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Global",
        "addressCountry": "Worldwide"
      },
      "serviceArea": "Global",
      "priceRange": "$$$$",
      "serviceType": [
        "Product Development Consulting",
        "Strategic Advisory",
        "Product Marketing",
        "Go-to-Market Strategy"
      ]
    }
  });

  return (
    <PageLayout footerTagline="Building products that scale.">
    <HeroSection />
      <WhoWeServeSection />
      <ServicesSection />
      <WhyChooseUs />
    </PageLayout>
  );
};

export default Index;

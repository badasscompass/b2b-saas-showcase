
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { PartnersSection } from "@/components/PartnersSection";
import { BlogSection } from "@/components/BlogSection";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";

const AboutUs = () => {
  useSEO({
    title: "About Iva Rumora & LMN3 Collective | Strategic Product Leadership",
    description: "Meet Iva Rumora and the strategic minds behind LMN3 Collective. Expert product development consultants with 9+ years experience helping startups and enterprises build products that scale.",
    keywords: ["Iva Rumora", "LMN3 Collective", "product consultant", "strategic advisory", "product development", "startup advisor", "product management consultant"],
    canonicalUrl: "https://lmn3.digital/about-us",
    openGraph: {
      type: "website",
      url: "https://lmn3.digital/about-us",
      image: "https://lmn3.digital/lovable-uploads/lmn3_logo_white.jpg"
    },
    twitter: {
      card: "summary_large_image",
      site: "@LMN3Collective",
      creator: "@IvaRumora"
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "LMN3 Collective",
      "url": "https://lmn3.digital",
      "logo": "https://lmn3.digital/lovable-uploads/lmn3_logo_white.jpg",
      "description": "Strategic product development and advisory consulting collective led by Iva Rumora",
      "founder": {
        "@type": "Person",
        "name": "Iva Rumora",
        "jobTitle": "Strategic Product Partner & Founder",
        "url": "https://lmn3.digital/about-us",
        "sameAs": [
          "https://www.linkedin.com/in/ivarumora"
        ]
      },
      "serviceArea": "Global",
      "areaServed": "Worldwide",
      "knowsAbout": [
        "Product Development",
        "Strategic Advisory",
        "Product Marketing",
        "Go-to-Market Strategy",
        "Product Management"
      ]
    }
  });

  return (
    <PageLayout footerTagline="Building the future, one product at a time.">
      <PageHero
        title="About"
        subtitle={
          <>
            LMN3 is a collaborative product concept built on three foundational elements:
            <br />
            <span
              className="font-bold text-3xl md:text-4xl tracking-wide bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] bg-clip-text text-transparent"
            >
              emerge, engage, evolve
            </span>
            .
          </>
        }
        ctaText="Let's meet!"
      />

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader 
              title="Our Driving Principles"
              subtitle="We help ambitious product teams emerge with clarity, engage with confidence, and evolve with purpose."
            />
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-2 border-[#EA3E3A]/20 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">M</span>
                  </div>
                  <h3 className="font-manrope text-xl font-bold text-gray-900 mb-3">Mission</h3>
                  <p className="text-gray-600 font-manrope leading-relaxed">
                    To empower ambitious teams with the strategic clarity and development expertise needed to build products that create lasting impact in their markets.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#EA3E3A]/20 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">V</span>
                  </div>
                  <h3 className="font-manrope text-xl font-bold text-gray-900 mb-3">Vision</h3>
                  <p className="text-gray-600 font-manrope leading-relaxed">
                    A world where every great product idea has access to the strategic guidance and development expertise needed to succeed in the market.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#EA3E3A]/20 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">V</span>
                  </div>
                  <h3 className="font-manrope text-xl font-bold text-gray-900 mb-3">Values</h3>
                  <p className="text-gray-600 font-manrope leading-relaxed">
                    Strategic clarity, collaborative partnership, measurable impact, and sustainable growth. We believe in building products that matter.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Our Approach Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <SectionHeader 
              title="Our Approach"
              subtitle="How we transform product visions into market success"
            />
            
            <div className="space-y-8">
              <Card className="border-2 border-[#EA3E3A]/20 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="font-manrope text-xl font-bold text-[#EA3E3A] mb-4">
                    Strategic Foundation First
                  </h3>
                  <p className="text-gray-700 font-manrope leading-relaxed">
                    Before any development begins, we ensure your product has clear positioning, 
                    defined value propositions, and validated market opportunities. Strategy 
                    guides every decision we make.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#EA3E3A]/20 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="font-manrope text-xl font-bold text-[#EA3E3A] mb-4">
                    Collaborative Partnership
                  </h3>
                  <p className="text-gray-700 font-manrope leading-relaxed">
                    We don't just deliver recommendations—we work alongside your team as 
                    strategic partners, sharing knowledge and building internal capabilities 
                    that last beyond our engagement.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#EA3E3A]/20 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="font-manrope text-xl font-bold text-[#EA3E3A] mb-4">
                    Measurable Impact
                  </h3>
                  <p className="text-gray-700 font-manrope leading-relaxed">
                    Every project includes clear success metrics and regular progress reviews. 
                    We're committed to delivering tangible results that drive business growth 
                    and market success.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection />
    </PageLayout>
  );
};

export default AboutUs;

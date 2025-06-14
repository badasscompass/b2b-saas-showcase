
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/PageHero";
import { PartnersSection } from "@/components/PartnersSection";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";

const AboutUs = () => {
  useSEO({
    title: "About Us - LMN3 Consulting",
    description: "Meet the strategic minds behind LMN3 Consulting. Learn about our mission, values, and the expert partners who guide product development and growth.",
    keywords: ["about us", "team", "partners", "product consultants", "company mission"],
    openGraph: {
      type: "website",
      url: "https://lmn3.digital/about-us"
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "LMN3 Consulting",
      "url": "https://lmn3.digital",
      "description": "Product development and strategic advisory consulting",
      "employee": [
        {
          "@type": "Person",
          "name": "Iva Rumora",
          "jobTitle": "Strategic Product Partner",
          "worksFor": "LMN3 Consulting"
        },
        {
          "@type": "Person",
          "name": "Anamarija Ledic",
          "jobTitle": "Product Growth Catalyst",
          "worksFor": "LMN3 Consulting"
        }
      ]
    }
  });

  return (
    <PageLayout footerTagline="Building the future, one product at a time.">
      <PageHero
        title="About LMN3"
        subtitle="Strategic product consultancy focused on transforming visions into market-ready products. We combine deep product expertise with strategic thinking to help companies build products that matter, scale efficiently, and achieve sustainable growth."
        ctaText="Let's meet!"
      />

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader 
              title="Our Purpose"
              subtitle="Why we exist and what drives us every day"
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
    </PageLayout>
  );
};

export default AboutUs;


import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Target, Users, Rocket, BarChart3, CheckCircle, Calendar } from "lucide-react";

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
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#EA3E3A]/5 via-white to-[#F4A42C]/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-manrope text-gray-900">
                Product Marketing & GTM
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] mx-auto mb-6"></div>
              <p className="text-xl md:text-2xl text-gray-600 font-manrope mb-8 leading-relaxed">
                Launch smarter, reach buyers faster, and drive growth with a data-driven go-to-market engine.
              </p>
              <Button className="bg-[#EA3E3A] hover:bg-[#F4A42C] text-white font-manrope text-lg px-8 py-4">
                <Calendar className="mr-2 h-5 w-5" />
                Book a GTM Discovery Call
              </Button>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-gray-900">
                What We Do
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whatWeDo.map((item, index) => (
                <Card key={index} className="border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="p-6 md:p-8">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-white rounded-full shadow-lg border border-gray-100">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-manrope text-gray-900 mb-3">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 font-manrope leading-relaxed text-base">
                          {item.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-gray-900">
                How It Works
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {howItWorks.map((step, index) => (
                <Card key={index} className="text-center border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="p-6">
                    <div className="w-12 h-12 bg-[#EA3E3A] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg font-manrope text-gray-900 mb-3">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-manrope leading-relaxed">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What Success Looks Like Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-gray-900">
                What Success Looks Like
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] mx-auto"></div>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 gap-4">
                {successMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-[#EA3E3A] flex-shrink-0" />
                    <span className="text-gray-700 font-manrope text-lg">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why This Works Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-gray-900">
                Why This Works
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] mx-auto"></div>
            </div>
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
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#EA3E3A] to-[#F4A42C]">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-white">
                Ready to Transform Your GTM Strategy?
              </h2>
              <p className="text-xl text-white font-manrope mb-8 max-w-3xl mx-auto leading-relaxed">
                Looking to launch with precision and scale efficiently? Let's book a call to design your tailored GTM strategy and activation plan.
              </p>
              <Button className="bg-white text-[#EA3E3A] hover:bg-gray-100 font-manrope text-lg px-8 py-4">
                <Calendar className="mr-2 h-5 w-5" />
                Book a GTM Discovery Call
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-gray-100 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-gray-600 font-manrope text-sm">
                © 2024 LMN3 Consulting. Launching products that win markets.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default ProductMarketingGTM;

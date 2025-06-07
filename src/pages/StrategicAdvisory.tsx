
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Target, Users, MessageSquare, TrendingUp } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { ContactCTA } from "@/components/ContactCTA";

const StrategicAdvisory = () => {
  const services = [
    {
      title: "Value Proposition Design",
      description: "We help you define the core value your product delivers, using frameworks like Jobs-To-Be-Done and Value Proposition Canvas. This ensures messaging resonates with real customer needs and highlights your unique value over alternatives."
    },
    {
      title: "Market Positioning & Competitive Analysis", 
      description: "We map your competitive landscape and identify gaps in the market to position you strategically. Expect a refined positioning statement and segmentation informed by buyer personas and competitor comparison."
    },
    {
      title: "Go-to-Market (GTM) Strategy",
      description: "We craft a GTM roadmap that includes audience targeting, pricing strategy, channel selection, and launch planning, drawing on proven GTM frameworks."
    },
    {
      title: "Messaging Framework & Launch Readiness",
      description: "We create a coherent messaging system for internal and external communication. This includes positioning statements, feature–benefit messaging, and launch assets ready to activate."
    }
  ];

  const process = [
    {
      title: "Discovery Workshop",
      description: "1–2 hours: We align on business goals, current assumptions, and metrics for success",
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "Market & Competitor Deep Dive", 
      description: "Rich research paired with interviews, peer insights, and 2×2 segmentation workshops",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      title: "Value & Positioning Sprint",
      description: "We craft and iterate positioning, value props, and messaging frameworks",
      icon: <MessageSquare className="h-6 w-6" />
    },
    {
      title: "GTM Strategy & Rollout Plan",
      description: "A clear go-to-market roadmap with pricing, channels, messaging, and timing",
      icon: <ArrowRight className="h-6 w-6" />
    },
    {
      title: "Launch Calibration & Feedback",
      description: "Post-launch check-in to optimize the approach and pivot as needed",
      icon: <CheckCircle className="h-6 w-6" />
    }
  ];

  const outcomes = [
    "A crisp value proposition that resonates with target buyers",
    "Higher-quality buyer leads due to positioning alignment", 
    "A ready-to-launch GTM campaign in 4–6 weeks",
    "Insight-driven confidence in launch timing, channels, and messaging"
  ];

  const resources = [
    "Understand our value proposition toolkit →",
    "Explore the competitive analysis and positioning approach →", 
    "See how we build data-driven GTM plans →",
    "Preview messaging framework templates →"
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-white via-gray-50 to-[#FFF33B]/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-manrope text-gray-900 mb-4 md:mb-6">
                Strategic Advisory: 
                <span className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] bg-clip-text text-transparent"> Clear Direction & Positioning</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-manrope text-gray-700 leading-relaxed">
                Guidance for early-stage founders in defining their value proposition, market positioning, and go-to-market strategy.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-manrope text-gray-900 mb-8 md:mb-12 text-center">
                What We Do
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {services.map((service, index) => (
                  <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-50 to-white">
                    <CardHeader className="p-6 md:p-8">
                      <CardTitle className="font-manrope text-lg md:text-xl text-gray-900 mb-3 md:mb-4">
                        {index + 1}. {service.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 font-manrope leading-relaxed text-sm md:text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-manrope text-gray-900 mb-8 md:mb-12 text-center">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
                {process.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] rounded-full flex items-center justify-center text-white mb-4 mx-auto shadow-lg">
                      {step.icon}
                    </div>
                    <h3 className="text-base md:text-lg font-bold font-manrope text-gray-900 mb-2 md:mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 font-manrope text-xs md:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Outcomes Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-manrope text-gray-900 mb-6 md:mb-8 text-center">
                What Success Looks Like
              </h2>
              <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start space-x-3 md:space-x-4 bg-gray-50 p-4 md:p-6 rounded-lg hover:bg-gray-100 transition-colors">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#F4A42C] flex-shrink-0 mt-0.5" />
                    <span className="text-base md:text-lg font-manrope text-gray-800 leading-relaxed">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Learn More Resources Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-6 md:mb-8">
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-[#EA3E3A] mr-3" />
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-manrope text-gray-900">
                  Learn More
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-12">
                {resources.map((resource, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A] hover:text-white transition-all p-4 md:p-6 h-auto text-left justify-start text-sm md:text-base"
                  >
                    <span className="font-manrope">{resource}</span>
                  </Button>
                ))}
              </div>

              {/* Next Step CTA */}
              <div className="text-center bg-gradient-to-br from-[#EA3E3A]/5 to-[#F4A42C]/5 p-6 md:p-8 rounded-xl border border-[#EA3E3A]/20">
                <h3 className="text-xl md:text-2xl font-bold font-manrope text-gray-900 mb-3 md:mb-4">
                  Next Step
                </h3>
                <p className="text-gray-700 font-manrope mb-4 md:mb-6 text-sm md:text-base leading-relaxed">
                  If you're ready to move from concept to market-ready, let's schedule a discovery call to explore the fastest path to product-market alignment.
                </p>
                <Button 
                  className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white hover:from-[#EA3E3A]/90 hover:to-[#F4A42C]/90 transition-all px-6 md:px-8 py-2 md:py-3 text-sm md:text-base"
                  asChild
                >
                  <a href="mailto:contact@lmn3consulting.com">
                    ➡️ Book an intro call
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
    </>
  );
};

export default StrategicAdvisory;

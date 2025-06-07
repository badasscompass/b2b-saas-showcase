
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Clock, Target, Users, Zap } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { ContactCTA } from "@/components/ContactCTA";

const ProductDevelopment = () => {
  const services = [
    {
      title: "MVP Strategy & Development",
      description: "We guide you from problem definition through to the first shippable version. That includes lean validation, market-fit framing, critical feature identification, and launch planning."
    },
    {
      title: "Product Roadmapping", 
      description: "We take your initial ideas and shape them into a prioritized, actionable roadmap. Expect clear features, milestones, value hypotheses, and delivery timelines — anchored in business goals."
    },
    {
      title: "Technical Architecture Oversight",
      description: "Avoid common scaling bottlenecks by reviewing your current or planned architecture. We collaborate with your CTO or tech lead to ensure decisions support feature velocity, robustness, and future scalability."
    },
    {
      title: "User Testing & Validation",
      description: "We design rapid feedback loops — from paper prototypes to live usability testing. Insights from every sprint inform roadmap adjustments and product evolution."
    }
  ];

  const process = [
    {
      title: "Discovery Kickoff",
      description: "1–2-hour sprint to align on vision, success metrics, and current maturity"
    },
    {
      title: "MVP Design Sprint", 
      description: "2–4-week cycle: prototype, test, iterate"
    },
    {
      title: "Roadmap Sync",
      description: "Monthly planning that blends strategic milestones with sprint pods"
    },
    {
      title: "Continuous Feedback",
      description: "Bi-weekly usability sessions, insights-driven decisions, and iteration loops"
    }
  ];

  const outcomes = [
    "Launch your MVP in just 4–6 weeks",
    "Maintain 2–4 week sprint cycles post-MVP", 
    "Establish an architecture designed for feature velocity & scale",
    "Make informed roadmap pivots within 1–2 weeks of real user feedback"
  ];

  const resources = [
    "How our MVP kickoff works →",
    "Roadmapping process you can run from week two →", 
    "Include architectural readiness as a launch deliverable →",
    "Structure your user testing for ongoing learning →"
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-[#FFF33B]/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-manrope text-gray-900 mb-6">
                Product Development: 
                <span className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] bg-clip-text text-transparent"> From MVP to Scale</span>
              </h1>
              <p className="text-xl md:text-2xl font-manrope text-gray-700 leading-relaxed">
                Transform your vision into ready-to-launch products with proven development processes and senior product expertise.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-manrope text-gray-900 mb-12 text-center">
                What We Do
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="font-manrope text-xl text-gray-900 mb-4">
                        {index + 1}. {service.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 font-manrope leading-relaxed text-base">
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
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-manrope text-gray-900 mb-12 text-center">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {process.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-bold font-manrope text-gray-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 font-manrope text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Outcomes Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold font-manrope text-gray-900 mb-8 text-center">
                What Success Looks Like
              </h2>
              <p className="text-xl font-manrope text-gray-700 mb-8 text-center">
                We help you:
              </p>
              <div className="space-y-4 mb-12">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-[#F4A42C] flex-shrink-0" />
                    <span className="text-lg font-manrope text-gray-800">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Learn More Resources Section */}
        <section className="py-16 bg-gradient-to-r from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <ArrowRight className="w-8 h-8 text-[#EA3E3A] mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold font-manrope text-gray-900">
                  Learn More
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((resource, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="border-[#EA3E3A] text-[#EA3E3A] hover:bg-[#EA3E3A] hover:text-white transition-all p-6 h-auto text-left justify-start"
                  >
                    <span className="font-manrope">{resource}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
    </>
  );
};

export default ProductDevelopment;

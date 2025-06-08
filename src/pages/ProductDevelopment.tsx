
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Calendar, Target, Users, Zap, Clock } from "lucide-react";
import { Navigation } from "@/components/Navigation";

const ProductDevelopment = () => {
  const services = [
    {
      icon: <Target className="h-8 w-8 text-[#EA3E3A]" />,
      title: "MVP Strategy & Development",
      description: "We guide you from problem definition through to the first shippable version. That includes lean validation, market-fit framing, critical feature identification, and launch planning."
    },
    {
      icon: <Users className="h-8 w-8 text-[#F4A42C]" />,
      title: "Product Roadmapping", 
      description: "We take your initial ideas and shape them into a prioritized, actionable roadmap. Expect clear features, milestones, value hypotheses, and delivery timelines — anchored in business goals."
    },
    {
      icon: <Zap className="h-8 w-8 text-[#EA3E3A]" />,
      title: "Technical Architecture Oversight",
      description: "Avoid common scaling bottlenecks by reviewing your current or planned architecture. We collaborate with your CTO or tech lead to ensure decisions support feature velocity, robustness, and future scalability."
    },
    {
      icon: <Clock className="h-8 w-8 text-[#F4A42C]" />,
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

  const clientWork = [
    {
      title: "MVP to Series A in 8 Months",
      company: "FinTech Startup",
      result: "From concept to $5M funding round",
      metrics: "40% faster development cycles"
    },
    {
      title: "Product-Market Fit Discovery",
      company: "B2B SaaS Platform",
      result: "Identified winning feature set through rapid testing",
      metrics: "3x user engagement increase"
    },
    {
      title: "Architecture Redesign",
      company: "E-commerce Platform",
      result: "Scaled from 1K to 100K daily users",
      metrics: "99.9% uptime maintained"
    },
    {
      title: "Agile Transformation",
      company: "Enterprise Software",
      result: "Reduced time-to-market by 60%",
      metrics: "2-week sprint cycles achieved"
    }
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        {/* Hero Section with CTA */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#EA3E3A]/5 via-white to-[#F4A42C]/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-manrope text-gray-900">
                Product Development
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] mx-auto mb-6"></div>
              <p className="text-xl md:text-2xl text-gray-600 font-manrope mb-8 leading-relaxed">
                Transform your vision into ready-to-launch products with proven development processes and senior product expertise.
              </p>
              <Button className="bg-[#EA3E3A] hover:bg-[#F4A42C] text-white font-manrope text-lg px-8 py-4">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Product Strategy Call
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
              {services.map((service, index) => (
                <Card key={index} className="border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="p-6 md:p-8">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-white rounded-full shadow-lg border border-gray-100">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl font-manrope text-gray-900 mb-3">
                          {service.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 font-manrope leading-relaxed text-base">
                          {service.description}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {process.map((step, index) => (
                <Card key={index} className="border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="p-6 md:p-8 text-center">
                    <div className="w-12 h-12 bg-[#EA3E3A] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                      {index + 1}
                    </div>
                    <CardTitle className="text-xl font-manrope text-gray-900 mb-3">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 font-manrope leading-relaxed text-base">
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
              <p className="text-xl font-manrope text-gray-700 mb-8 text-center">
                We help you:
              </p>
              <div className="grid grid-cols-1 gap-4">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-[#EA3E3A] flex-shrink-0" />
                    <span className="text-gray-700 font-manrope text-lg">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Client Work Showcase Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-gray-900">
                Client Work
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clientWork.map((work, index) => (
                <Card key={index} className="border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <CardHeader className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <CardTitle className="text-lg font-manrope text-gray-900">
                        {work.title}
                      </CardTitle>
                      <ArrowRight className="h-5 w-5 text-[#EA3E3A]" />
                    </div>
                    <CardDescription className="text-gray-600 font-manrope mb-2">
                      {work.company}
                    </CardDescription>
                    <p className="text-gray-700 font-manrope mb-2">{work.result}</p>
                    <p className="text-[#F4A42C] font-manrope font-semibold">{work.metrics}</p>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#EA3E3A] to-[#F4A42C]">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-white">
                Ready to Build Your Product?
              </h2>
              <p className="text-xl text-white font-manrope mb-8 max-w-3xl mx-auto leading-relaxed">
                From MVP to scale, we'll help you build products that users love and investors fund. Let's discuss your product vision.
              </p>
              <Button className="bg-white text-[#EA3E3A] hover:bg-gray-100 font-manrope text-lg px-8 py-4">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Product Strategy Call
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 bg-gray-100 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-gray-600 font-manrope text-sm">
                © 2024 LMN3 Consulting. Building products that scale.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default ProductDevelopment;

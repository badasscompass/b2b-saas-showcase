
import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { ProcessStep } from "@/components/ProcessStep";
import { SuccessMetric } from "@/components/SuccessMetric";
import { PageCTA } from "@/components/PageCTA";
import { PageFooter } from "@/components/PageFooter";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Target, Users, Zap, Clock } from "lucide-react";

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
        <PageHero
          title="Product Development"
          subtitle="Transform your vision into ready-to-launch products with proven development processes and senior product expertise."
          ctaText="Book a Product Strategy Call"
        />

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <SectionHeader title="What We Do" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionHeader title="How It Works" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {process.map((step, index) => (
                <ProcessStep
                  key={index}
                  step={index + 1}
                  title={step.title}
                  description={step.description}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <SectionHeader title="What Success Looks Like" />
            <div className="max-w-3xl mx-auto">
              <p className="text-xl font-manrope text-gray-700 mb-8 text-center">
                We help you:
              </p>
              <div className="grid grid-cols-1 gap-4">
                {outcomes.map((outcome, index) => (
                  <SuccessMetric key={index} text={outcome} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionHeader title="Client Work" />
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

        <PageCTA
          title="Ready to Build Your Product?"
          subtitle="From MVP to scale, we'll help you build products that users love and investors fund. Let's discuss your product vision."
          ctaText="Book a Product Strategy Call"
        />

        <PageFooter tagline="Building products that scale." />
      </main>
    </>
  );
};

export default ProductDevelopment;

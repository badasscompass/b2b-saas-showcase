import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { ProcessStep } from "@/components/ProcessStep";
import { SuccessMetric } from "@/components/SuccessMetric";
import { PageCTA } from "@/components/PageCTA";
import { PageFooter } from "@/components/PageFooter";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, Zap, Clock, Calendar } from "lucide-react";

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
      scope: "Complete Product Development & Strategy",
      description: "Guided a FinTech startup from concept validation through MVP launch to Series A funding round. Implemented agile development processes, technical architecture planning, and user feedback loops that accelerated their time-to-market.",
      lead: "Sarah Chen, CTO",
      result: "From concept to $5M funding round",
      metrics: "40% faster development cycles",
      image: "photo-1488590528505-98d2b5aba04b"
    },
    {
      title: "Product-Market Fit Discovery",
      scope: "User Research & Feature Validation", 
      description: "Helped a B2B SaaS platform identify their winning feature set through rapid prototyping and user testing. Conducted over 50 user interviews and A/B tested key features to validate product-market fit assumptions.",
      lead: "Marcus Rodriguez, Head of Product",
      result: "Identified winning feature set through rapid testing",
      metrics: "3x user engagement increase",
      image: "photo-1486312338219-ce68d2c6f44d"
    },
    {
      title: "Unblocking Remote Dev Team in 4 Weeks",
      scope: "Development Process & Team Alignment",
      description: "A B2B hospitality client was stuck in legacy code refactoring with no dev processes, no guidelines, and async bottlenecks slowing progress. We structured the backlog, launched sprints with release goals, focused on bug fixes to stabilize delivery, and resolved key contributor bottlenecks causing conflicts.",
      lead: "iva@lmn3.digital",
      result: "Functional delivery flow re-established in 2 sprints",
      metrics: "Major bottleneck cleared, delivery pace restored",
      image: "photo-1522071820081-009f0129c71c"
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

        <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <SectionHeader 
                title="Client Work Showcase"
                subtitle="Explore how we've helped companies transform their product development approach and accelerate time-to-market."
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {clientWork.map((work, index) => (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      <Card className="cursor-pointer border-2 border-[#EA3E3A]/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-gradient-to-br from-white to-gray-50">
                        <CardHeader className="p-6 md:p-8">
                          <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                            <img 
                              src={`https://images.unsplash.com/${work.image}?q=80&w=600&h=300&fit=crop`}
                              alt={work.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <CardTitle className="font-manrope text-lg md:text-xl text-gray-900 mb-2">
                            {work.title}
                          </CardTitle>
                          <div className="text-[#F4A42C] font-manrope font-semibold mb-3 text-sm md:text-base">
                            {work.scope}
                          </div>
                          <CardDescription className="text-gray-600 font-manrope leading-relaxed text-sm md:text-base line-clamp-3">
                            {work.description}
                          </CardDescription>
                          <div className="mt-4 flex items-center text-[#EA3E3A] font-manrope font-semibold text-sm">
                            View Case Study <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </CardHeader>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle className="font-manrope text-xl md:text-2xl text-gray-900 mb-4">
                          {work.title}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                          <img 
                            src={`https://images.unsplash.com/${work.image}?q=80&w=800&h=400&fit=crop`}
                            alt={work.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Lead</h4>
                            <p className="text-gray-700 font-manrope">{work.lead}</p>
                          </div>
                          <div>
                            <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Scope of Work</h4>
                            <p className="text-gray-700 font-manrope">{work.scope}</p>
                          </div>
                          <div>
                            <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Project Description</h4>
                            <p className="text-gray-700 font-manrope leading-relaxed">{work.description}</p>
                          </div>
                          <div>
                            <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Results</h4>
                            <p className="text-gray-700 font-manrope">{work.result}</p>
                            <p className="text-[#F4A42C] font-manrope font-semibold">{work.metrics}</p>
                          </div>
                        </div>
                        <div className="pt-4 border-t">
                          <Button className="w-full bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white hover:from-[#EA3E3A]/90 hover:to-[#F4A42C]/90">
                            <Calendar className="mr-2 h-4 w-4" />
                            Discuss Your Project
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
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

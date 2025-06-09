import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { ProcessStep } from "@/components/ProcessStep";
import { SuccessMetric } from "@/components/SuccessMetric";
import { PageFooter } from "@/components/PageFooter";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, MessageSquare, TrendingUp, CheckCircle, Calendar, Lightbulb, BarChart3 } from "lucide-react";
import { ContactCTA } from "@/components/ContactCTA";

const StrategicAdvisory = () => {
  const services = [
    {
      icon: <Lightbulb className="h-8 w-8 text-[#EA3E3A]" />,
      title: "Value Proposition Design",
      description: "We help you define the core value your product delivers, using frameworks like Jobs-To-Be-Done and Value Proposition Canvas. This ensures messaging resonates with real customer needs and highlights your unique value over alternatives."
    },
    {
      icon: <Target className="h-8 w-8 text-[#F4A42C]" />,
      title: "Market Positioning & Competitive Analysis", 
      description: "We map your competitive landscape and identify gaps in the market to position you strategically. Expect a refined positioning statement and segmentation informed by buyer personas and competitor comparison."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-[#EA3E3A]" />,
      title: "Go-to-Market (GTM) Strategy",
      description: "We craft a GTM roadmap that includes audience targeting, pricing strategy, channel selection, and launch planning, drawing on proven GTM frameworks."
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-[#F4A42C]" />,
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

  const clientWork = [
    {
      title: "AI Trust & Adoption Strategy",
      scope: "User Experience & Trust Framework Design",
      description: "A legal tech client had a high-performing AI tool—accurate, fast, and reliable. But 80% of users bypassed it or manually rechecked results. The issue wasn't performance. It was trust. We identified decision-friction points, added explainability and confidence scores, integrated human benchmarks and educational UI, and reframed the AI as a user-controlled assistant, not a black box.",
      lead: "Dr. Elena Vasquez, Head of Product Strategy",
      image: "photo-1581091226825-a6a2a5aee158"
    },
    {
      title: "FinTech GTM Strategy", 
      scope: "Complete Go-to-Market Planning",
      description: "Developed comprehensive GTM strategy for a fintech platform, including pricing strategy, channel selection, and messaging framework. Conducted competitive analysis, defined target customer segments, and created launch sequences that positioned the company for successful Series A funding.",
      lead: "James Park, VP of Strategy",
      image: "photo-1488590528505-98d2b5aba04b"
    }
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <PageHero
          title="Strategic Advisory"
          subtitle="Guidance for early-stage founders in defining their value proposition, market positioning, and go-to-market strategy."
          ctaText="Book a Strategy Discovery Call"
        />

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <SectionHeader title="What We Do" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
          </div>
        </section>

        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <SectionHeader title="How It Works" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
                {process.slice(0, 3).map((step, index) => (
                  <ProcessStep
                    key={index}
                    step={index + 1}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    layout="icon"
                  />
                ))}
              </div>
              
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 max-w-2xl">
                  {process.slice(3, 5).map((step, index) => (
                    <ProcessStep
                      key={index + 3}
                      step={index + 4}
                      title={step.title}
                      description={step.description}
                      icon={step.icon}
                      layout="icon"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <SectionHeader title="What Success Looks Like" />
              <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
                {outcomes.map((outcome, index) => (
                  <SuccessMetric key={index} text={outcome} variant="highlight" />
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
                subtitle="Explore how we've helped companies transform their strategic positioning and go-to-market approach."
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
                          {work.title === "AI Trust & Adoption Strategy" && (
                            <div>
                              <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Results in 45 days</h4>
                              <div className="space-y-1 text-gray-700 font-manrope">
                                <p>• 3× increase in AI usage</p>
                                <p>• +22% time saved per session</p>
                                <p>• +47% boost in user satisfaction</p>
                                <p>• First enterprise deal closed, directly tied to improved UX</p>
                                <p className="mt-2 font-semibold text-[#F4A42C]">Insight: Trust, not tech, unlocks real adoption in AI-driven products.</p>
                              </div>
                            </div>
                          )}
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

        <ContactCTA />
        <PageFooter tagline="Strategic clarity for product success." />
      </main>
    </>
  );
};

export default StrategicAdvisory;

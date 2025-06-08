
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, CheckCircle, Target, Users, MessageSquare, TrendingUp, Calendar } from "lucide-react";
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

  const clientWork = [
    {
      title: "SaaS Platform Positioning",
      scope: "Value Proposition & Market Positioning",
      description: "Helped a B2B SaaS startup refine their value proposition and positioning strategy, resulting in a 40% increase in qualified leads within 3 months of launch.",
      image: "photo-1486312338219-ce68d2c6f44d"
    },
    {
      title: "FinTech GTM Strategy", 
      scope: "Complete Go-to-Market Planning",
      description: "Developed comprehensive GTM strategy for a fintech platform, including pricing strategy, channel selection, and messaging framework that led to successful Series A funding.",
      image: "photo-1488590528505-98d2b5aba04b"
    },
    {
      title: "HealthTech Competitive Analysis",
      scope: "Market Research & Competitive Intelligence", 
      description: "Conducted deep competitive analysis for a health tech company, identifying market gaps that informed their product roadmap and positioning strategy.",
      image: "photo-1581091226825-a6a2a5aee158"
    },
    {
      title: "EdTech Messaging Framework",
      scope: "Messaging & Communication Strategy",
      description: "Created cohesive messaging framework for an education technology startup, aligning internal teams and external communications for consistent brand voice.",
      image: "photo-1460925895917-afdab827c52f"
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
                Strategic Advisory
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] mx-auto mb-6"></div>
              <p className="text-xl md:text-2xl text-gray-600 font-manrope mb-8 leading-relaxed">
                Guidance for early-stage founders in defining their value proposition, market positioning, and go-to-market strategy.
              </p>
              <Button className="bg-[#EA3E3A] hover:bg-[#F4A42C] text-white font-manrope text-lg px-8 py-4">
                <Calendar className="mr-2 h-5 w-5" />
                Book a Strategy Discovery Call
              </Button>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-gray-900">
                  What We Do
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] mx-auto"></div>
              </div>
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

        {/* How It Works Section - Symmetric Layout */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-gray-900">
                  How It Works
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] mx-auto"></div>
              </div>
              
              {/* First Row - 3 elements */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
                {process.slice(0, 3).map((step, index) => (
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
              
              {/* Second Row - 2 elements centered */}
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 max-w-2xl">
                  {process.slice(3, 5).map((step, index) => (
                    <div key={index + 3} className="text-center">
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
          </div>
        </section>

        {/* Success Outcomes Section */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-gray-900">
                  What Success Looks Like
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] mx-auto"></div>
              </div>
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

        {/* Client Work Showcase Section */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-gray-900">
                  Client Work Showcase
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] mx-auto mb-6"></div>
                <p className="text-lg text-gray-600 font-manrope max-w-3xl mx-auto leading-relaxed">
                  Explore how we've helped companies transform their strategic positioning and go-to-market approach.
                </p>
              </div>
              
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
                            <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Scope of Work</h4>
                            <p className="text-gray-700 font-manrope">{work.scope}</p>
                          </div>
                          <div>
                            <h4 className="font-manrope font-semibold text-[#EA3E3A] mb-1">Project Description</h4>
                            <p className="text-gray-700 font-manrope leading-relaxed">{work.description}</p>
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

        <ContactCTA />
      </main>
    </>
  );
};

export default StrategicAdvisory;

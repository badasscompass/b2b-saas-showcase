import { useEffect } from "react";
import { ArrowRight, BarChart3, Calendar, Rocket, Target, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { PageFooter } from "@/components/PageFooter";
import { SectionHeader } from "@/components/SectionHeader";
import { useSEO } from "@/hooks/useSEO";
import { analyticsService } from "@/services/analyticsService";

const stuckSignals = [
  "building before you've resolved the critical customer uncertainty",
  "iterating endlessly without learning much",
  "prioritizing what's easy to tweak rather than what matters",
  "sitting on a technically strong product without a clear commercial proposition",
  "making roadmap decisions without a shared product strategy",
  "trying to figure out what AI should actually do in the product",
];

const layers = [
  {
    number: "01",
    icon: Target,
    title: "Product Strategy",
    description:
      "Clarify the product direction, customer problem, value proposition and strategic priorities.",
  },
  {
    number: "02",
    icon: Search,
    title: "Product Discovery",
    description:
      "Turn assumptions into testable hypotheses, evidence and decisions before more resources are committed to building.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Productization & AI",
    description:
      "Translate technology, emerging capabilities or existing products into coherent customer experiences and commercially meaningful product propositions.",
  },
];

const processFlow = [
  {
    steps: ["Understand", "Challenge"],
    outcome:
      "Naming it plainly when the wrong problem is being solved, or when another feature won't fix the underlying issue.",
  },
  {
    steps: ["Decide", "Test"],
    outcome: "A clear point of view — not a list of equally plausible options.",
  },
  {
    steps: ["Learn"],
    outcome: "Context and mechanisms that stay with the team after the engagement ends.",
  },
];

const bestFitGroups = [
  {
    label: "Launch & validation",
    items: [
      "a product is entering a new market",
      "a promising idea needs validation before significant investment",
    ],
  },
  {
    label: "Traction & focus",
    items: [
      "an existing product isn't translating into traction",
      "a technically strong capability needs to become a real product",
      "the roadmap has become reactive or unfocused",
    ],
  },
  {
    label: "High-stakes decisions",
    items: [
      "AI introduces new possibilities but also new product questions",
      "founders need an experienced product perspective before making a consequential bet",
    ],
  },
];

const IndexV2 = () => {
  useSEO({
    title: "Turn Product Uncertainty Into Confident Direction | LMN3",
    description:
      "Product strategy, discovery and AI-native product design for founders and teams facing consequential product decisions.",
  });

  // Hidden A/B variant — keep out of search results
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const previous = meta?.content ?? null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    meta.content = "noindex, nofollow";
    return () => {
      if (meta) {
        if (previous) meta.content = previous;
        else meta.remove();
      }
    };
  }, []);

  return (
    <>
      <Navigation />
      <main className="min-h-screen overflow-x-clip pt-20">
        {/* Hero */}
        <section className="relative flex flex-col bg-gradient-to-br from-gray-50 to-white overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 w-full py-16 lg:py-24">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left">
                <div className="space-y-5">
                  <div className="inline-flex max-w-full flex-wrap items-center gap-2 px-3 py-1 rounded-full bg-[#EA3E3A]/5 border border-[#EA3E3A]/10 mx-auto lg:mx-0 w-fit">
                    <span className="flex h-2 w-2 rounded-full bg-[#EA3E3A]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#EA3E3A] font-manrope text-balance">
                      Product strategy · AI products · Discovery · Productization
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-manrope text-gray-900 leading-[1.1] tracking-tight">
                    Turn product uncertainty into{" "}
                    <span className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] bg-clip-text text-transparent">
                      confident direction
                    </span>
                  </h1>

                  <p className="text-lg sm:text-xl text-gray-600 font-manrope leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
                    Helping founders and product teams make the hard product decisions that sit between
                    “we built something” and “this actually has a reason to exist. And someone who will buy it.”
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start flex-wrap pt-2">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white hover:from-[#EA3E3A]/90 hover:to-[#F4A42C]/90 font-manrope font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 h-auto w-full sm:w-auto shadow-lg shadow-[#EA3E3A]/20"
                    asChild
                  >
                    <a
                      href="https://calendly.com/iva-lmn3/30min"
                      onClick={() =>
                        analyticsService.trackEvent('calendly_click', { category: 'conversion', label: 'Work with me', location: 'hero_v2' })
                      }
                    >
                      <Calendar className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Work with me
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-gray-600 hover:text-gray-900 font-manrope font-semibold text-base sm:text-lg px-4 sm:px-6 py-3 sm:py-4 h-auto w-full sm:w-auto"
                    asChild
                  >
                    <a href="#engagements">
                      Explore engagements <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end order-first lg:order-last min-w-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EA3E3A] to-[#F4A42C] blur-[80px] opacity-20 rounded-full" />
                  <a href="/" aria-label="LMN3 Home" className="relative block">
                    <img
                      src="/lovable-uploads/logo-wordmark-448.webp"
                      srcSet="/lovable-uploads/logo-wordmark-448.webp 448w, /lovable-uploads/logo-wordmark-896.webp 896w"
                      sizes="(min-width: 1024px) 384px, (min-width: 640px) 320px, 256px"
                      width={448}
                      height={170}
                      fetchPriority="high"
                      decoding="async"
                      alt="LMN3 - Strategic Product Development by Iva Rumora"
                      className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                    />
                  </a>
                  <div className="hidden lg:flex absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-lg items-center justify-center rotate-12 border border-gray-100">
                    <Rocket className="w-6 h-6 text-[#EA3E3A]" />
                  </div>
                  <div className="hidden lg:flex absolute -bottom-6 -left-6 w-16 h-16 bg-white rounded-2xl shadow-xl items-center justify-center -rotate-6 border border-gray-100">
                    <BarChart3 className="w-8 h-8 text-[#F4A42C]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The problem */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <SectionHeader
                  title="Not another pair of hands. Thinking partner you can trust."
                  subtitle="When a product is stuck, the problem isn't always a lack of ideas or execution capacity."
                  alignment="left"
                />
              </div>
              <div className="lg:col-span-7">
                <p className="text-sm font-bold uppercase tracking-wider text-[#F4A42C] font-manrope mb-6">
                  Common signals
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                  {stuckSignals.map((signal) => (
                    <li
                      key={signal}
                      className="flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-100 p-4"
                    >
                      <span className="mt-2 h-2 w-2 rounded-full bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] flex-shrink-0" />
                      <span className="text-base text-gray-700 font-manrope leading-relaxed">{signal}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-lg text-gray-800 font-manrope leading-relaxed border-l-4 border-[#EA3E3A] pl-6">
                  These are the moments where the work is identifying what actually needs to be decided,
                  what evidence is missing, and where the next bet belongs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What the work is */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Diagnose the problem. Challenge the assumptions. Define the bet."
              subtitle="Three connected layers of work."
              alignment="left"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {layers.map((layer) => {
                const Icon = layer.icon;
                return (
                  <div
                    key={layer.number}
                    className="group relative bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="absolute top-6 right-7 text-5xl font-extrabold font-manrope text-gray-100 select-none">
                      {layer.number}
                    </span>
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#EA3E3A]/10 to-[#F4A42C]/10 flex items-center justify-center mb-6">
                      <Icon className="h-7 w-7 text-[#EA3E3A]" />
                    </div>
                    <h3 className="text-xl font-bold font-manrope text-gray-900 mb-3">{layer.title}</h3>
                    <p className="text-gray-600 font-manrope leading-relaxed">{layer.description}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-lg text-gray-800 font-manrope leading-relaxed mt-12 max-w-3xl">
              The output isn't a 40-page strategy deck. It's clarity about what matters, why it matters,
              and what to do next.
            </p>
          </div>
        </section>

        {/* How the work runs */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="[&>div]:mb-8 md:[&>div]:mb-10">
                <SectionHeader
                  title="Advice is cheap. Decisions are the deliverable."
                  subtitle="The goal isn't to permanently own your product — it's to leave the team able to decide without outside help."
                  alignment="left"
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 lg:items-stretch">
                {processFlow.map((phase) => (
                  <div key={phase.steps.join("-")} className="flex min-h-0 min-w-0 flex-col">
                    <div className="relative flex min-h-[3.25rem] w-full min-w-0 flex-wrap items-center justify-center gap-2">
                      <div
                        className="pointer-events-none absolute left-[12%] right-[12%] top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-[#EA3E3A]/20 via-[#F4A42C]/40 to-[#EA3E3A]/20 lg:block"
                        aria-hidden="true"
                      />
                      {phase.steps.map((step, stepIndex) => (
                        <div key={step} className="relative z-10 flex min-w-0 items-center gap-2">
                          <span className="rounded-full border border-[#F4A42C]/20 bg-white px-3 py-2 font-manrope text-sm font-semibold text-gray-900 shadow-sm sm:px-4">
                            {step}
                          </span>
                          {stepIndex < phase.steps.length - 1 && (
                            <ArrowRight className="h-4 w-4 flex-shrink-0 text-[#F4A42C]" aria-hidden="true" />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex shrink-0 flex-col items-center py-4" aria-hidden="true">
                      <div className="h-6 w-px bg-gradient-to-b from-[#F4A42C] to-[#EA3E3A]/30" />
                      <div className="h-3 w-3 rounded-full bg-gradient-to-br from-[#EA3E3A] to-[#F4A42C] ring-4 ring-white" />
                      <div className="h-4 w-px bg-gradient-to-b from-[#EA3E3A]/30 to-gray-200" />
                    </div>

                    <div className="relative flex flex-1 flex-col rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm before:absolute before:left-1/2 before:top-0 before:h-1 before:w-16 before:-translate-x-1/2 before:-translate-y-px before:rounded-full before:bg-gradient-to-r before:from-[#EA3E3A] before:to-[#F4A42C]">
                      <p className="font-manrope leading-relaxed text-gray-700">{phase.outcome}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who this fits */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <SectionHeader
                title="Best fit: teams at a product inflection point."
                subtitle="This work tends to be most useful when:"
                alignment="left"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 md:items-stretch">
                {bestFitGroups.map((group) => (
                  <div
                    key={group.label}
                    className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 lg:p-8 shadow-sm"
                  >
                    <p className="mb-5 font-manrope text-sm font-bold uppercase tracking-wider text-[#F4A42C]">
                      {group.label}
                    </p>
                    <ul className="flex flex-1 flex-col gap-3">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span
                            className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C]"
                            aria-hidden="true"
                          />
                          <span className="font-manrope leading-relaxed text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-10 max-w-3xl font-manrope text-lg leading-relaxed text-gray-800">
                Startups, scaleups and innovation teams where the cost of making the wrong product decision
                is becoming higher than the cost of bringing in outside expertise.
              </p>
            </div>
          </div>
        </section>

        {/* Why this partner */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-5">
                <SectionHeader
                  title="Broad product experience. Strong opinions. No attachment to your roadmap."
                  alignment="left"
                />
              </div>
              <div className="lg:col-span-7 space-y-5 text-lg text-gray-600 font-manrope leading-relaxed">
                <p>
                  A decade across products, markets and stages — from early-stage startups to complex
                  digital products and emerging AI use cases.
                </p>
                <p>That breadth means no rigid playbook arrives with the engagement.</p>
                <p>
                  The method is simple: find the underlying constraint, form a hypothesis, and test it with
                  the team.
                </p>
                <p className="text-gray-900 font-semibold text-xl border-l-4 border-[#F4A42C] pl-6">
                  Not here to validate what's already decided — here to help you decide better.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Engagements */}
        <section id="engagements" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <SectionHeader
                title="Focused interventions, not endless retainers."
                alignment="left"
              />
              <div className="space-y-5 text-lg text-gray-600 font-manrope leading-relaxed mb-10">
                <p>
                  Modular engagements built around specific product problems — from strategic diagnosis
                  and product discovery to AI product definition and validation.
                </p>
                <p>The scope depends on the problem. The principle doesn't:</p>
                <p className="text-2xl md:text-3xl font-bold font-manrope bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] bg-clip-text text-transparent">
                  Solve the highest-value uncertainty first.
                </p>
              </div>
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white hover:from-[#EA3E3A]/90 hover:to-[#F4A42C]/90 font-manrope font-semibold text-lg px-8 py-4 h-auto"
                asChild
              >
                <a href="/contact">
                  Explore engagements <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>


        {/* Closing CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C]">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-manrope mb-6">
                Have a product decision you can't confidently make?
              </h2>
              <p className="text-xl md:text-2xl mb-4 font-manrope opacity-90 leading-relaxed">
                Bring the messy version.
              </p>
              <p className="text-lg md:text-xl mb-8 font-manrope opacity-90 leading-relaxed">
                Together we'll pin down what's actually being decided, what evidence is missing, and
                where the next bet belongs.
              </p>
              <Button
                size="lg"
                className="bg-white text-[#EA3E3A] hover:bg-gray-100 font-manrope font-semibold text-lg px-8 py-4 h-auto"
                asChild
              >
                <a
                  href="https://calendly.com/iva-lmn3/30min"
                  onClick={() =>
                    analyticsService.trackEvent('calendly_click', { category: 'conversion', label: 'Start a conversation', location: 'closing_cta_v2' })
                  }
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Start a conversation
                </a>
              </Button>
            </div>
          </div>
        </section>

        <PageFooter tagline="Turning product uncertainty into confident bets." />
      </main>
    </>
  );
};

export default IndexV2;

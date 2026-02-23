
import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { PageFooter } from "@/components/PageFooter";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { analyticsService } from "@/services/analyticsService";
import { ArrowRight, Heart, Scale, Flame, Clock, Droplets, Activity } from "lucide-react";

interface HealthMetric {
  id: string;
  kpi: string;
  analogy: string;
  icon: React.ReactNode;
  bodyPart: string;
  color: string;
  description: string;
  insight: string;
  bodyPosition: { top: string; left: string };
  pulsePosition: { cx: string; cy: string };
}

const healthMetrics: HealthMetric[] = [
  {
    id: "mrr",
    kpi: "MRR",
    analogy: "Body Mass",
    icon: <Scale className="w-6 h-6" />,
    bodyPart: "torso",
    color: "#EA3E3A",
    description: "Monthly Recurring Revenue is like body mass. You can be heavy and unhealthy. You can be lean and powerful.",
    insight: "Big MRR doesn't tell you if the organism is viable — just that it's large.",
    bodyPosition: { top: "32%", left: "50%" },
    pulsePosition: { cx: "200", cy: "220" },
  },
  {
    id: "nrr",
    kpi: "NRR",
    analogy: "Cardiovascular Health",
    icon: <Heart className="w-6 h-6" />,
    bodyPart: "heart",
    color: "#E8453F",
    description: "Net Revenue Retention is your cardiovascular resilience. If NRR is 115%, your existing organs are strengthening without external stimulus.",
    insight: "If it's 85%, you're constantly losing internal capacity and must compensate by acquiring more customers.",
    bodyPosition: { top: "26%", left: "45%" },
    pulsePosition: { cx: "185", cy: "180" },
  },
  {
    id: "cac",
    kpi: "CAC",
    analogy: "Metabolic Cost",
    icon: <Flame className="w-6 h-6" />,
    bodyPart: "stomach",
    color: "#F4A42C",
    description: "Customer Acquisition Cost is metabolic cost. If it takes 3,000 calories to build 500 calories of muscle, your body collapses.",
    insight: "If LTV doesn't significantly exceed CAC, you're overtraining and under-recovering.",
    bodyPosition: { top: "38%", left: "55%" },
    pulsePosition: { cx: "215", cy: "260" },
  },
  {
    id: "ltv",
    kpi: "LTV",
    analogy: "Lifespan Potential",
    icon: <Activity className="w-6 h-6" />,
    bodyPart: "brain",
    color: "#FFF33B",
    description: "Lifetime Value is lifespan potential. Long-staying customers who generate margin and expand give you longevity.",
    insight: "Short LTV businesses are organisms with autoimmune conditions — burning cells faster than they regenerate.",
    bodyPosition: { top: "8%", left: "50%" },
    pulsePosition: { cx: "200", cy: "65" },
  },
  {
    id: "payback",
    kpi: "Payback Period",
    analogy: "Recovery Time",
    icon: <Clock className="w-6 h-6" />,
    bodyPart: "legs",
    color: "#F07A35",
    description: "If you sprint (acquire customers) but need 24 months to recover your energy, you better have serious reserves.",
    insight: "If recovery is 6–9 months, you can train repeatedly without cardiac arrest.",
    bodyPosition: { top: "65%", left: "45%" },
    pulsePosition: { cx: "185", cy: "430" },
  },
  {
    id: "churn",
    kpi: "Churn",
    analogy: "Internal Bleeding",
    icon: <Droplets className="w-6 h-6" />,
    bodyPart: "veins",
    color: "#EA3E3A",
    description: "Churn is your internal bleeding rate. Every lost customer is a wound that drains the system.",
    insight: "High MRR + high churn = obesity. High NRR + controlled CAC = endurance athlete.",
    bodyPosition: { top: "48%", left: "42%" },
    pulsePosition: { cx: "170", cy: "330" },
  },
];

const HumanBodySVG = ({ 
  activeMetric, 
  onHover 
}: { 
  activeMetric: string | null; 
  onHover: (id: string | null) => void;
}) => {
  return (
    <svg viewBox="0 0 400 600" className="w-full max-w-[320px] md:max-w-[400px] mx-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF33B" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#EA3E3A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#F4A42C" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EA3E3A" />
          <stop offset="100%" stopColor="#FFF33B" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Human body outline */}
      <g fill="url(#bodyGradient)" stroke="url(#glowGradient)" strokeWidth="1.5" opacity="0.9">
        {/* Head */}
        <ellipse cx="200" cy="60" rx="35" ry="42" />
        {/* Neck */}
        <rect x="188" y="100" width="24" height="25" rx="5" />
        {/* Torso */}
        <path d="M155 125 Q145 125 140 140 L130 230 Q128 260 140 280 L150 300 Q155 310 160 310 L240 310 Q245 310 250 300 L260 280 Q272 260 270 230 L260 140 Q255 125 245 125 Z" />
        {/* Left arm */}
        <path d="M140 135 Q120 140 110 170 L95 240 Q88 265 95 280 L100 290 Q108 295 112 285 L120 250 L135 180" fill="url(#bodyGradient)" />
        {/* Right arm */}
        <path d="M260 135 Q280 140 290 170 L305 240 Q312 265 305 280 L300 290 Q292 295 288 285 L280 250 L265 180" fill="url(#bodyGradient)" />
        {/* Left leg */}
        <path d="M160 310 L155 380 L150 450 Q148 470 152 490 L155 540 Q158 555 165 555 L175 555 Q182 555 182 540 L180 490 L185 400 L190 310" />
        {/* Right leg */}
        <path d="M210 310 L215 400 L220 490 Q220 540 218 540 L225 555 Q232 555 235 555 L245 555 Q252 555 252 540 L248 490 Q250 470 248 450 L245 380 L240 310" />
      </g>

      {/* Interactive pulse points */}
      {healthMetrics.map((metric) => {
        const isActive = activeMetric === metric.id;
        return (
          <g
            key={metric.id}
            onMouseEnter={() => onHover(metric.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onHover(isActive ? null : metric.id)}
            className="cursor-pointer"
          >
            {/* Pulse ring animation */}
            {isActive && (
              <>
                <circle
                  cx={metric.pulsePosition.cx}
                  cy={metric.pulsePosition.cy}
                  r="20"
                  fill="none"
                  stroke={metric.color}
                  strokeWidth="2"
                  opacity="0.6"
                >
                  <animate attributeName="r" from="12" to="28" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle
                  cx={metric.pulsePosition.cx}
                  cy={metric.pulsePosition.cy}
                  r="16"
                  fill="none"
                  stroke={metric.color}
                  strokeWidth="1.5"
                  opacity="0.4"
                >
                  <animate attributeName="r" from="12" to="24" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
                </circle>
              </>
            )}
            {/* Core dot */}
            <circle
              cx={metric.pulsePosition.cx}
              cy={metric.pulsePosition.cy}
              r={isActive ? "10" : "7"}
              fill={metric.color}
              filter={isActive ? "url(#glow)" : undefined}
              opacity={isActive ? 1 : 0.7}
              className="transition-all duration-300"
            />
            {/* Label */}
            <text
              x={Number(metric.pulsePosition.cx) + (Number(metric.pulsePosition.cx) > 200 ? 18 : -18)}
              y={Number(metric.pulsePosition.cy) + 4}
              textAnchor={Number(metric.pulsePosition.cx) > 200 ? "start" : "end"}
              fill={isActive ? metric.color : "#9ca3af"}
              fontSize="11"
              fontFamily="Manrope"
              fontWeight={isActive ? "700" : "500"}
              className="transition-all duration-300 select-none"
            >
              {metric.kpi}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const MetricCard = ({ metric, isActive, onClick }: { metric: HealthMetric; isActive: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full text-left p-4 md:p-5 rounded-xl border transition-all duration-300 group ${
      isActive
        ? "border-transparent bg-foreground/5 shadow-lg shadow-primary/10 scale-[1.02]"
        : "border-border/50 hover:border-primary/30 hover:bg-foreground/[0.02]"
    }`}
  >
    <div className="flex items-start gap-3">
      <div
        className="p-2 rounded-lg shrink-0 transition-colors duration-300"
        style={{ backgroundColor: isActive ? `${metric.color}20` : undefined }}
      >
        <span style={{ color: isActive ? metric.color : "#9ca3af" }} className="transition-colors duration-300">
          {metric.icon}
        </span>
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-bold text-foreground font-manrope">{metric.kpi}</span>
          <span className="text-xs font-medium text-muted-foreground">=</span>
          <span
            className="text-sm font-semibold transition-colors duration-300"
            style={{ color: isActive ? metric.color : "hsl(var(--muted-foreground))" }}
          >
            {metric.analogy}
          </span>
        </div>
        {isActive && (
          <div className="animate-fade-up">
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">{metric.description}</p>
            <p className="text-xs text-muted-foreground italic leading-relaxed">{metric.insight}</p>
          </div>
        )}
      </div>
    </div>
  </button>
);

export default function StartupHealth() {
  const [activeMetric, setActiveMetric] = useState<string | null>("nrr");

  useSEO({
    title: "Is Your Startup Healthy? | The Body Analogy for SaaS Metrics — LMN3",
    description: "MRR is weight. NRR is cardiovascular health. CAC is metabolic cost. LTV is lifespan. Discover whether your startup is an endurance athlete or headed for cardiac arrest.",
    keywords: ["startup health", "SaaS metrics", "MRR", "NRR", "CAC", "LTV", "churn", "startup KPIs", "product metrics", "LMN3"],
  });

  useScrollDepth("startup-health");

  useEffect(() => {
    analyticsService.trackEvent("view_item", {
      item_id: "startup-health-guide",
      item_name: "Startup Health Body Analogy",
      item_category: "lead_magnet",
    });
  }, []);

  const handleMetricClick = (id: string | null) => {
    setActiveMetric(id);
    if (id) {
      analyticsService.trackEvent("select_content", {
        content_type: "health_metric",
        content_id: id,
      });
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20 bg-background">
        {/* Hero */}
        <section className="section-padding container-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#EA3E3A]/5 via-transparent to-[#FFF33B]/5 pointer-events-none" />
          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary mb-6 font-manrope">
              Free Diagnostic Framework
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 font-manrope leading-tight">
              Is Your Startup{" "}
              <span className="gradient-text">Healthy?</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 font-manrope leading-relaxed">
              The real signal isn't one KPI — it's whether the organism recovers faster than it exhausts itself.
            </p>
            <p className="text-sm text-muted-foreground/70 max-w-xl mx-auto font-manrope">
              Six metrics. One body. Tap each organ to diagnose your startup.
            </p>
          </div>
        </section>

        {/* Interactive Body Section */}
        <section className="pb-16 md:pb-24 container-padding">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Body graphic */}
              <div className="relative flex justify-center lg:sticky lg:top-28">
                <div className="relative">
                  <HumanBodySVG activeMetric={activeMetric} onHover={handleMetricClick} />
                  {/* Ambient glow behind body */}
                  <div className="absolute inset-0 -z-10 blur-3xl opacity-20 bg-gradient-to-b from-[#EA3E3A] via-[#F4A42C] to-[#FFF33B] rounded-full scale-75" />
                </div>
              </div>

              {/* Metric cards */}
              <div className="space-y-3">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 font-manrope">
                  The Diagnostic
                </h2>
                {healthMetrics.map((metric) => (
                  <MetricCard
                    key={metric.id}
                    metric={metric}
                    isActive={activeMetric === metric.id}
                    onClick={() => handleMetricClick(activeMetric === metric.id ? null : metric.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Synthesis / Key Insight */}
        <section className="section-padding container-padding bg-foreground/[0.02]">
          <div className="container mx-auto max-w-3xl text-center">
            <blockquote className="text-xl md:text-2xl font-bold text-foreground font-manrope leading-relaxed mb-8">
              "A startup can look big (high MRR) and still be{" "}
              <span className="gradient-text">metabolically unhealthy</span>."
            </blockquote>
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="p-5 rounded-xl border border-destructive/20 bg-destructive/5">
                <p className="text-sm font-bold text-destructive mb-1 font-manrope">⚠ Warning Signal</p>
                <p className="text-sm text-foreground/80 font-manrope">High MRR + Low NRR = Obesity</p>
              </div>
              <div className="p-5 rounded-xl border border-green-500/20 bg-green-500/5">
                <p className="text-sm font-bold text-green-600 mb-1 font-manrope">✓ Healthy Signal</p>
                <p className="text-sm text-foreground/80 font-manrope">High NRR + Controlled CAC = Endurance Athlete</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding container-padding">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-manrope">
              Not sure where your startup stands?
            </h2>
            <p className="text-muted-foreground mb-8 font-manrope">
              We help founders and product teams diagnose what's really going on — and build the recovery plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] hover:from-[#d63531] hover:to-[#e09425] text-white font-manrope font-semibold group"
                onClick={() => {
                  analyticsService.trackEvent("calendly_click", { location: "startup_health_cta" });
                  window.open("https://calendly.com/iva-lmn3/30min", "_blank");
                }}
              >
                Book a Free Diagnostic Call
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-manrope font-semibold"
                onClick={() => window.location.href = "/contact"}
              >
                Send Us Your Metrics
              </Button>
            </div>
          </div>
        </section>

        <PageFooter tagline="Building products that scale." />
      </main>
    </>
  );
}

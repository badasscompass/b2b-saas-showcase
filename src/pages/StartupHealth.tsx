
import { useState, useEffect, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { PageFooter } from "@/components/PageFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSEO } from "@/hooks/useSEO";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { analyticsService } from "@/services/analyticsService";
import { ArrowRight, Heart, Scale, Flame, Clock, Droplets, Activity, Calculator } from "lucide-react";

interface HealthMetric {
  id: string;
  kpi: string;
  analogy: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  insight: string;
  pulsePosition: { cx: number; cy: number };
}

const healthMetrics: HealthMetric[] = [
  {
    id: "ltv",
    kpi: "LTV",
    analogy: "Lifespan Potential",
    icon: <Activity className="w-6 h-6" />,
    color: "#FFF33B",
    description: "Lifetime Value is lifespan potential. Long-staying customers who generate margin and expand give you longevity.",
    insight: "Short LTV businesses are organisms with autoimmune conditions — burning cells faster than they regenerate.",
    pulsePosition: { cx: 200, cy: 58 },
  },
  {
    id: "nrr",
    kpi: "NRR",
    analogy: "Cardiovascular Health",
    icon: <Heart className="w-6 h-6" />,
    color: "#E8453F",
    description: "Net Revenue Retention is your cardiovascular resilience. If NRR is 115%, your existing organs are strengthening without external stimulus.",
    insight: "If it's 85%, you're constantly losing internal capacity and must compensate by acquiring more customers.",
    pulsePosition: { cx: 188, cy: 195 },
  },
  {
    id: "mrr",
    kpi: "MRR",
    analogy: "Body Mass",
    icon: <Scale className="w-6 h-6" />,
    color: "#EA3E3A",
    description: "Monthly Recurring Revenue is like body mass. You can be heavy and unhealthy. You can be lean and powerful.",
    insight: "Big MRR doesn't tell you if the organism is viable — just that it's large.",
    pulsePosition: { cx: 212, cy: 230 },
  },
  {
    id: "cac",
    kpi: "CAC",
    analogy: "Metabolic Cost",
    icon: <Flame className="w-6 h-6" />,
    color: "#F4A42C",
    description: "Customer Acquisition Cost is metabolic cost. If it takes 3,000 calories to build 500 calories of muscle, your body collapses.",
    insight: "If LTV doesn't significantly exceed CAC, you're overtraining and under-recovering.",
    pulsePosition: { cx: 200, cy: 275 },
  },
  {
    id: "churn",
    kpi: "Churn",
    analogy: "Internal Bleeding",
    icon: <Droplets className="w-6 h-6" />,
    color: "#EA3E3A",
    description: "Churn is your internal bleeding rate. Every lost customer is a wound that drains the system.",
    insight: "High MRR + high churn = obesity. High NRR + controlled CAC = endurance athlete.",
    pulsePosition: { cx: 175, cy: 310 },
  },
  {
    id: "payback",
    kpi: "Payback Period",
    analogy: "Recovery Time",
    icon: <Clock className="w-6 h-6" />,
    color: "#F07A35",
    description: "If you sprint (acquire customers) but need 24 months to recover your energy, you better have serious reserves.",
    insight: "If recovery is 6–9 months, you can train repeatedly without cardiac arrest.",
    pulsePosition: { cx: 218, cy: 420 },
  },
];

const HumanBodySVG = ({
  activeMetric,
  onHover,
}: {
  activeMetric: string | null;
  onHover: (id: string | null) => void;
}) => {
  return (
    <svg
      viewBox="0 0 400 560"
      className="w-full max-w-[300px] md:max-w-[360px] mx-auto select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF33B" stopOpacity="0.12" />
          <stop offset="40%" stopColor="#EA3E3A" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#F4A42C" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="strokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EA3E3A" />
          <stop offset="100%" stopColor="#FFF33B" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Anatomically proportional human silhouette */}
      <g fill="url(#bodyGrad)" stroke="url(#strokeGrad)" strokeWidth="1.2" strokeLinejoin="round">
        {/* Head */}
        <ellipse cx="200" cy="55" rx="30" ry="36" />
        {/* Neck */}
        <rect x="190" y="90" width="20" height="20" rx="6" />
        {/* Shoulders + Torso */}
        <path d="
          M 148 112
          Q 140 112 135 118
          L 130 130
          Q 128 135 132 138
          L 155 140
          L 155 115
          Q 160 110 200 110
          Q 240 110 245 115
          L 245 140
          L 268 138
          Q 272 135 270 130
          L 265 118
          Q 260 112 252 112
          Z
        " />
        {/* Upper torso / chest */}
        <path d="
          M 155 140
          L 150 180
          Q 148 200 152 210
          L 155 220
          L 245 220
          L 248 210
          Q 252 200 250 180
          L 245 140
          Z
        " />
        {/* Lower torso / abdomen */}
        <path d="
          M 155 220
          L 158 260
          Q 160 280 165 295
          L 170 310
          Q 175 318 185 320
          L 215 320
          Q 225 318 230 310
          L 235 295
          Q 240 280 242 260
          L 245 220
          Z
        " />
        {/* Left arm */}
        <path d="
          M 132 138
          L 120 145
          Q 110 150 105 165
          L 95 210
          Q 90 230 88 250
          L 86 270
          Q 84 285 88 290
          L 92 295
          Q 98 298 100 290
          L 105 260
          L 112 225
          L 120 180
          L 135 150
        " />
        {/* Right arm */}
        <path d="
          M 268 138
          L 280 145
          Q 290 150 295 165
          L 305 210
          Q 310 230 312 250
          L 314 270
          Q 316 285 312 290
          L 308 295
          Q 302 298 300 290
          L 295 260
          L 288 225
          L 280 180
          L 265 150
        " />
        {/* Left leg */}
        <path d="
          M 185 320
          L 180 350
          L 175 390
          L 172 430
          L 170 460
          L 168 490
          L 168 510
          Q 168 525 172 530
          L 160 535
          Q 155 538 158 542
          L 178 542
          Q 185 542 185 535
          L 183 510
          L 185 470
          L 188 430
          L 192 380
          L 195 340
          L 200 320
        " />
        {/* Right leg */}
        <path d="
          M 200 320
          L 205 340
          L 208 380
          L 212 430
          L 215 470
          L 217 510
          L 215 535
          Q 215 542 222 542
          L 242 542
          Q 245 538 240 535
          L 228 530
          Q 232 525 232 510
          L 232 490
          L 230 460
          L 228 430
          L 225 390
          L 220 350
          L 215 320
        " />
      </g>

      {/* Internal organ hints (subtle) */}
      <g opacity="0.25" fill="none" stroke="url(#strokeGrad)" strokeWidth="0.8">
        {/* Brain outline */}
        <path d="M 185 42 Q 180 35 185 30 Q 195 22 205 25 Q 215 28 218 38 Q 220 48 215 52" />
        {/* Heart */}
        <path d="M 190 188 Q 185 180 190 175 Q 195 170 200 178 Q 205 170 210 175 Q 215 180 210 188 L 200 200 Z" />
        {/* Spine line */}
        <line x1="200" y1="95" x2="200" y2="310" strokeDasharray="4 4" />
      </g>

      {/* Interactive pulse points */}
      {healthMetrics.map((metric) => {
        const isActive = activeMetric === metric.id;
        const cx = metric.pulsePosition.cx;
        const cy = metric.pulsePosition.cy;
        const labelLeft = cx <= 200;
        return (
          <g
            key={metric.id}
            onMouseEnter={() => onHover(metric.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onHover(isActive ? null : metric.id)}
            className="cursor-pointer"
          >
            {isActive && (
              <>
                <circle cx={cx} cy={cy} r="20" fill="none" stroke={metric.color} strokeWidth="2" opacity="0.5">
                  <animate attributeName="r" from="10" to="26" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.4s" repeatCount="indefinite" />
                </circle>
                <circle cx={cx} cy={cy} r="14" fill="none" stroke={metric.color} strokeWidth="1.5" opacity="0.3">
                  <animate attributeName="r" from="10" to="22" dur="1.4s" begin="0.3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.3" to="0" dur="1.4s" begin="0.3s" repeatCount="indefinite" />
                </circle>
              </>
            )}
            {/* Dot */}
            <circle
              cx={cx}
              cy={cy}
              r={isActive ? 9 : 6}
              fill={metric.color}
              filter={isActive ? "url(#glow)" : undefined}
              opacity={isActive ? 1 : 0.65}
              className="transition-all duration-300"
            />
            {/* Connector line */}
            <line
              x1={cx}
              y1={cy}
              x2={labelLeft ? cx - 30 : cx + 30}
              y2={cy}
              stroke={isActive ? metric.color : "#d1d5db"}
              strokeWidth="1"
              opacity={isActive ? 0.6 : 0.3}
            />
            {/* Label */}
            <text
              x={labelLeft ? cx - 34 : cx + 34}
              y={cy + 4}
              textAnchor={labelLeft ? "end" : "start"}
              fill={isActive ? metric.color : "#9ca3af"}
              fontSize="11"
              fontFamily="Manrope"
              fontWeight={isActive ? "700" : "500"}
              className="transition-all duration-300 select-none pointer-events-none"
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

/* ── KPI Calculator ── */

interface KPIInputs {
  mrr: string;
  nrr: string;
  cac: string;
  ltv: string;
  payback: string;
  churn: string;
}

interface DiagnosisResult {
  label: string;
  emoji: string;
  color: string;
  overall: string;
  details: string[];
}

function diagnose(inputs: KPIInputs): DiagnosisResult | null {
  const mrr = parseFloat(inputs.mrr);
  const nrr = parseFloat(inputs.nrr);
  const cac = parseFloat(inputs.cac);
  const ltv = parseFloat(inputs.ltv);
  const payback = parseFloat(inputs.payback);
  const churn = parseFloat(inputs.churn);

  if ([mrr, nrr, cac, ltv, payback, churn].some(isNaN)) return null;

  let score = 0;
  const details: string[] = [];

  // NRR scoring (heart)
  if (nrr >= 115) { score += 2; details.push("💪 Excellent NRR — your heart is strong."); }
  else if (nrr >= 100) { score += 1; details.push("🫀 NRR is stable — heart is steady but not growing."); }
  else { score -= 1; details.push("🩸 NRR below 100% — you're losing blood internally."); }

  // LTV:CAC ratio
  const ltvCac = cac > 0 ? ltv / cac : 0;
  if (ltvCac >= 5) { score += 2; details.push("🏋️ LTV:CAC of " + ltvCac.toFixed(1) + "x — elite metabolic efficiency."); }
  else if (ltvCac >= 3) { score += 1; details.push("🔥 LTV:CAC of " + ltvCac.toFixed(1) + "x — healthy metabolism."); }
  else { score -= 1; details.push("⚠️ LTV:CAC of " + ltvCac.toFixed(1) + "x — overtraining, under-recovering."); }

  // Payback
  if (payback <= 9) { score += 1; details.push("⚡ Recovery under 9 months — you can sprint again."); }
  else if (payback <= 18) { details.push("🕐 Recovery 9–18 months — manageable but watch reserves."); }
  else { score -= 1; details.push("🛑 Recovery over 18 months — cardiac arrest risk."); }

  // Churn
  if (churn <= 2) { score += 1; details.push("🩹 Churn under 2% — minimal bleeding."); }
  else if (churn <= 5) { details.push("🩸 Churn 2–5% — some internal bleeding to address."); }
  else { score -= 1; details.push("🚨 Churn above 5% — severe internal bleeding."); }

  // MRR + NRR combo
  if (mrr > 100000 && nrr < 95) {
    details.push("⚠️ High MRR + low NRR = obesity pattern.");
  }

  if (score >= 4) return { label: "Endurance Athlete", emoji: "🏃", color: "#22c55e", overall: "Your startup is in peak condition.", details };
  if (score >= 2) return { label: "Fit & Improving", emoji: "💪", color: "#F4A42C", overall: "Healthy foundation with room to strengthen.", details };
  if (score >= 0) return { label: "Needs Attention", emoji: "🩺", color: "#F07A35", overall: "Several warning signs — time for a check-up.", details };
  return { label: "Critical Condition", emoji: "🚑", color: "#EA3E3A", overall: "Multiple red flags — intervention needed.", details };
}

const KPICalculator = () => {
  const [inputs, setInputs] = useState<KPIInputs>({
    mrr: "",
    nrr: "",
    cac: "",
    ltv: "",
    payback: "",
    churn: "",
  });

  const result = useMemo(() => diagnose(inputs), [inputs]);

  const handleChange = (field: keyof KPIInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const fields: { key: keyof KPIInputs; label: string; placeholder: string; suffix: string }[] = [
    { key: "mrr", label: "MRR ($)", placeholder: "50000", suffix: "/mo" },
    { key: "nrr", label: "NRR (%)", placeholder: "110", suffix: "%" },
    { key: "cac", label: "CAC ($)", placeholder: "500", suffix: "" },
    { key: "ltv", label: "LTV ($)", placeholder: "5000", suffix: "" },
    { key: "payback", label: "Payback (months)", placeholder: "8", suffix: "mo" },
    { key: "churn", label: "Monthly Churn (%)", placeholder: "3", suffix: "%" },
  ];

  return (
    <section className="section-padding container-padding">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary mb-4 font-manrope">
            <Calculator className="w-3.5 h-3.5" />
            Health Calculator
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-manrope mb-3">
            Run Your <span className="gradient-text">Diagnostic</span>
          </h2>
          <p className="text-muted-foreground font-manrope text-sm max-w-xl mx-auto">
            Enter your metrics and see how healthy your startup really is.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Inputs */}
          <div className="p-6 rounded-2xl border border-border/60 bg-background space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <Label className="text-xs font-semibold text-muted-foreground font-manrope mb-1.5 block">
                    {f.label}
                  </Label>
                  <Input
                    type="number"
                    placeholder={f.placeholder}
                    value={inputs[f.key]}
                    onChange={handleChange(f.key)}
                    className="font-manrope"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="p-6 rounded-2xl border border-border/60 bg-background min-h-[260px] flex flex-col justify-center">
            {result ? (
              <div className="space-y-4 animate-fade-up">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{result.emoji}</span>
                  <div>
                    <h3
                      className="text-xl font-bold font-manrope"
                      style={{ color: result.color }}
                    >
                      {result.label}
                    </h3>
                    <p className="text-sm text-muted-foreground font-manrope">{result.overall}</p>
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t border-border/40">
                  {result.details.map((d, i) => (
                    <p key={i} className="text-sm text-foreground/80 font-manrope leading-relaxed">{d}</p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground/50">
                <Activity className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-manrope">Fill in all six metrics to see your diagnosis.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Page ── */

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

        {/* KPI Calculator */}
        <KPICalculator />

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

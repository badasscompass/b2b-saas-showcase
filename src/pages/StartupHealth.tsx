
import { useState, useEffect, useMemo, useRef } from "react";
import { Navigation } from "@/components/Navigation";
import { PageFooter } from "@/components/PageFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSEO } from "@/hooks/useSEO";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { analyticsService } from "@/services/analyticsService";
import { ArrowRight, Heart, Clock, Activity, Calculator, Info, Flame, Scale, TrendingDown, Wind } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface HealthMetric {
  id: string;
  kpi: string;
  analogy: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  insight: string;
  pulsePosition: { cx: number; cy: number };
  calculationMethod: string;
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
    calculationMethod: "LTV = (ARR × margin%) ÷ (12 × monthly churn%)",
  },
  {
    id: "nrr",
    kpi: "NRR",
    analogy: "Cardiovascular Health",
    icon: <Heart className="w-6 h-6" />,
    color: "#E8453F",
    description: "Net Revenue Retention is your cardiovascular resilience. If NRR is 115%, your existing organs are strengthening without external stimulus.",
    insight: "If it's 85%, you're constantly losing internal capacity and must compensate by acquiring more customers.",
    pulsePosition: { cx: 195, cy: 178 },
    calculationMethod: "NRR = (Beginning revenue + expansions − contractions − churn) ÷ Beginning revenue × 100%",
  },
  {
    id: "margin",
    kpi: "Gross Margin",
    analogy: "Lung Capacity",
    icon: <Wind className="w-6 h-6" />,
    color: "#E87B50",
    description: "Margin reflects how effectively your lungs supply oxygen to your muscles during training — and how much strength (profit) remains after the effort (delivery costs). High margin means you can run a marathon; low margin means you're gasping for air.",
    insight: "You can have high MRR and still suffocate if margin is thin. Strong margins give you room to invest in growth.",
    pulsePosition: { cx: 182, cy: 208 },
    calculationMethod: "Gross Margin (%) = (Revenue − service delivery costs) ÷ Revenue × 100%",
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
    calculationMethod: "MRR = Sum of all recurring revenue in the month",
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
    calculationMethod: "CAC = Total sales & marketing spend ÷ New customers acquired",
  },
  {
    id: "churn",
    kpi: "Churn",
    analogy: "Muscle Loss",
    icon: <TrendingDown className="w-6 h-6" />,
    color: "#EA3E3A",
    description: "Churn is muscle loss. Every customer who leaves is strength you're not rebuilding — you shrink instead of grow.",
    insight: "High MRR + high churn = obesity. High NRR + controlled CAC = endurance athlete.",
    pulsePosition: { cx: 112, cy: 198 },
    calculationMethod: "Churn = (Customers lost in period ÷ Customers at start) × 100%",
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
    calculationMethod: "Payback (months) = CAC ÷ (ARR ÷ 12 × margin%)",
  },
];

const HumanBodyVisual = ({
  activeMetric,
  onHover,
}: {
  activeMetric: string | null;
  onHover: (id: string | null) => void;
}) => {
  return (
    <svg
      viewBox="0 0 400 560"
      className="w-full h-full select-none object-contain"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
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
        <filter id="healthGlow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Human silhouette — proportional outline */}
      <g fill="url(#bodyGrad)" stroke="url(#strokeGrad)" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx="200" cy="52" rx="28" ry="34" />
        <path d="M 188 86 Q 185 100 188 108 L 212 108 Q 215 100 212 86 Z" />
        <path d="M 152 108 Q 138 108 132 118 Q 128 128 132 138 L 155 142 L 155 118 Q 165 110 200 110 Q 235 110 245 118 L 245 142 L 268 138 Q 272 128 268 118 Q 262 108 248 108 Z" />
        <path d="M 155 142 L 152 175 Q 150 195 153 208 L 156 222 L 244 222 L 247 208 Q 250 195 248 175 L 245 142 Z" />
        <path d="M 156 222 L 158 258 Q 160 278 166 292 L 172 308 Q 178 318 188 320 L 212 320 Q 222 318 228 308 L 234 292 Q 240 278 242 258 L 244 222 Z" />
        <path d="M 132 138 Q 118 142 108 158 Q 98 175 95 198 L 92 235 Q 90 258 92 272 Q 94 282 100 288 Q 106 292 108 286 L 112 262 L 118 228 L 125 188 L 132 155 Z" />
        <path d="M 268 138 Q 282 142 292 158 Q 302 175 305 198 L 308 235 Q 310 258 308 272 Q 306 282 300 288 Q 294 292 292 286 L 288 262 L 282 228 L 275 188 L 268 155 Z" />
        <path d="M 188 320 L 182 352 Q 178 378 176 402 L 174 438 Q 172 468 172 492 L 172 518 Q 172 532 176 538 L 168 544 Q 162 548 166 552 L 182 552 Q 188 552 188 546 L 188 518 L 190 478 L 192 438 L 196 388 L 198 338 L 200 320 Z" />
        <path d="M 212 320 L 218 352 Q 222 378 224 402 L 226 438 Q 228 468 228 492 L 228 518 Q 228 532 224 538 L 232 544 Q 238 548 234 552 L 218 552 Q 212 552 212 546 L 212 518 L 210 478 L 208 438 L 204 388 L 202 338 L 200 320 Z" />
      </g>

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
            <title>{metric.calculationMethod}</title>
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
            <circle
              cx={cx}
              cy={cy}
              r={isActive ? 9 : 6}
              fill={metric.color}
              filter={isActive ? "url(#healthGlow)" : undefined}
              opacity={isActive ? 1 : 0.65}
              className="transition-all duration-300"
            />
            <line
              x1={cx}
              y1={cy}
              x2={labelLeft ? cx - 30 : cx + 30}
              y2={cy}
              stroke={isActive ? metric.color : "#d1d5db"}
              strokeWidth="1"
              opacity={isActive ? 0.6 : 0.3}
            />
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
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex cursor-help text-muted-foreground hover:text-foreground focus:outline-none" aria-label="Calculation method">
                <Info className="w-3.5 h-3.5 shrink-0" />
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs font-manrope">
              {metric.calculationMethod}
            </TooltipContent>
          </Tooltip>
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

interface CalculatorInputs {
  arr: string;
  margin: string;
  churn: string;
  cac: string;
}

interface DiagnosisResult {
  label: string;
  emoji: string;
  color: string;
  overall: string;
  details: string[];
}

function computeLTV(arr: number, marginPct: number, churnPct: number): number | null {
  if (!arr || !marginPct || !churnPct || churnPct <= 0) return null;
  return (arr * (marginPct / 100)) / (12 * (churnPct / 100));
}

function computePaybackMonths(cac: number, arr: number, marginPct: number): number | null {
  if (!cac || !arr || !marginPct || marginPct <= 0) return null;
  const monthlyMarginPerCustomer = (arr / 12) * (marginPct / 100);
  return monthlyMarginPerCustomer > 0 ? cac / monthlyMarginPerCustomer : null;
}

function getFitnessInterpretation(
  ltv: number | null,
  ltvCac: number | null,
  payback: number | null,
  churnPct: number
): DiagnosisResult | null {
  if (ltv == null || ltvCac == null || payback == null) return null;
  let score = 0;
  const details: string[] = [];

  // LTV:CAC
  if (ltvCac >= 5) { score += 2; details.push("🏋️ LTV:CAC of " + ltvCac.toFixed(1) + "x — elite metabolic efficiency."); }
  else if (ltvCac >= 3) { score += 1; details.push("🔥 LTV:CAC of " + ltvCac.toFixed(1) + "x — healthy metabolism."); }
  else { score -= 1; details.push("⚠️ LTV:CAC of " + ltvCac.toFixed(1) + "x — overtraining, under-recovering."); }

  // Payback
  if (payback <= 9) { score += 1; details.push("⚡ Payback under 9 months — you can sprint again."); }
  else if (payback <= 18) { details.push("🕐 Payback 9–18 months — manageable but watch reserves."); }
  else { score -= 1; details.push("🛑 Payback over 18 months — cardiac arrest risk."); }

  // Churn (muscle loss)
  if (churnPct <= 2) { score += 1; details.push("💪 Churn under 2% — minimal muscle loss."); }
  else if (churnPct <= 5) { details.push("📉 Churn 2–5% — some muscle loss to address."); }
  else { score -= 1; details.push("⚠️ Churn above 5% — severe muscle loss."); }

  if (score >= 4) return { label: "Endurance Athlete", emoji: "🏃", color: "#22c55e", overall: "Your startup is in peak condition.", details };
  if (score >= 2) return { label: "Fit & Improving", emoji: "💪", color: "#F4A42C", overall: "Healthy foundation with room to strengthen.", details };
  if (score >= 0) return { label: "Needs Attention", emoji: "🩺", color: "#F07A35", overall: "Several warning signs — time for a check-up.", details };
  return { label: "Critical Condition", emoji: "🚑", color: "#EA3E3A", overall: "Multiple red flags — intervention needed.", details };
}

const KPICalculator = () => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    arr: "",
    margin: "",
    churn: "",
    cac: "",
  });

  const { ltv, payback, ltvCac, interpretation } = useMemo(() => {
    const arr = parseFloat(inputs.arr);
    const margin = parseFloat(inputs.margin);
    const churn = parseFloat(inputs.churn);
    const cac = parseFloat(inputs.cac);
    const ltvVal = !isNaN(arr) && !isNaN(margin) && !isNaN(churn) ? computeLTV(arr, margin, churn) : null;
    const paybackVal = !isNaN(cac) && !isNaN(arr) && !isNaN(margin) ? computePaybackMonths(cac, arr, margin) : null;
    const ltvCacVal = ltvVal != null && cac > 0 && !isNaN(cac) ? ltvVal / cac : null;
    const canInterpret = ltvVal != null && ltvCacVal != null && paybackVal != null && !isNaN(churn);
    const interpretationVal = canInterpret ? getFitnessInterpretation(ltvVal, ltvCacVal, paybackVal, churn) : null;
    return {
      ltv: ltvVal,
      payback: paybackVal,
      ltvCac: ltvCacVal,
      interpretation: interpretationVal,
    };
  }, [inputs]);

  const calculatorConversionFired = useRef(false);
  useEffect(() => {
    if (interpretation && !calculatorConversionFired.current) {
      calculatorConversionFired.current = true;
      analyticsService.trackConversion("startup_health_calculator_complete", {
        conversion_type: "micro",
        fitness_label: interpretation.label,
        location: "startup_health_calculator",
      });
    }
  }, [interpretation]);

  const handleChange = (field: keyof CalculatorInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const hasOutput = ltv != null || payback != null;

  return (
    <section className="section-padding container-padding">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary mb-4 font-manrope">
            <Calculator className="w-3.5 h-3.5" />
            Fitness Readout
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-manrope mb-3">
            Check Your <span className="gradient-text">Vital Signs</span>
          </h2>
          <p className="text-muted-foreground font-manrope text-sm max-w-xl mx-auto">
            Enter your numbers once — see lifespan potential, recovery speed, and fitness level.
          </p>
        </div>

        <div className="space-y-6">
          {/* Single input block */}
          <div className="p-6 rounded-2xl border border-border/60 bg-background">
            <h3 className="text-lg font-bold text-foreground font-manrope mb-2">
              Your vital inputs
            </h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-sm text-muted-foreground font-manrope mb-4 cursor-help inline-flex items-center gap-1.5">
                  ARR, margin, churn & CAC → lifespan (LTV) & recovery (payback)
                  <Info className="w-3.5 h-3.5 shrink-0" />
                </p>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-sm font-manrope">
                <span className="block mb-1">LTV = (ARR × margin%) ÷ (12 × monthly churn%)</span>
                <span className="block">Payback (mo) = CAC ÷ (ARR ÷ 12 × margin%)</span>
              </TooltipContent>
            </Tooltip>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-xs font-semibold text-muted-foreground font-manrope mb-1.5 block">ARR ($)</Label>
                <Input type="number" placeholder="60000" value={inputs.arr} onChange={handleChange("arr")} className="font-manrope" />
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-foreground font-manrope mb-1.5 block">Margin (%)</Label>
                <Input type="number" placeholder="70" value={inputs.margin} onChange={handleChange("margin")} className="font-manrope" />
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-foreground font-manrope mb-1.5 block">Monthly Churn (%)</Label>
                <Input type="number" placeholder="2" value={inputs.churn} onChange={handleChange("churn")} className="font-manrope" />
              </div>
              <div>
                <Label className="text-xs font-semibold text-muted-foreground font-manrope mb-1.5 block">CAC ($)</Label>
                <Input type="number" placeholder="800" value={inputs.cac} onChange={handleChange("cac")} className="font-manrope" />
              </div>
            </div>
          </div>

          {/* Output block */}
          <div className="p-6 md:p-8 rounded-2xl border border-border/60 bg-background">
            <h3 className="text-lg font-bold text-foreground font-manrope mb-2">Your readout</h3>
            <div className="pt-6 pb-1 border-t border-border/50 mt-1">
            {hasOutput ? (
              <div className="space-y-6 animate-fade-up">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 rounded-xl border border-border/40 bg-foreground/[0.02]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-xs font-semibold text-muted-foreground font-manrope mb-2 cursor-help inline-flex items-center gap-1">
                          Lifespan (LTV)
                          <Info className="w-3 h-3 shrink-0" />
                        </p>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-sm font-manrope">
                        LTV = (ARR × margin%) ÷ (12 × monthly churn%)
                      </TooltipContent>
                    </Tooltip>
                    <p className="text-xl font-bold text-foreground font-manrope">
                      {ltv != null ? `$${Math.round(ltv).toLocaleString()}` : "—"}
                    </p>
                  </div>
                  <div className="p-5 rounded-xl border border-border/40 bg-foreground/[0.02]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-xs font-semibold text-muted-foreground font-manrope mb-2 cursor-help inline-flex items-center gap-1">
                          Efficiency (LTV:CAC)
                          <Info className="w-3 h-3 shrink-0" />
                        </p>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-sm font-manrope">
                        LTV:CAC = LTV ÷ CAC
                      </TooltipContent>
                    </Tooltip>
                    <p className="text-xl font-bold text-foreground font-manrope">
                      {ltvCac != null ? ltvCac.toFixed(1) + "x" : "—"}
                    </p>
                  </div>
                  <div className="p-5 rounded-xl border border-border/40 bg-foreground/[0.02]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-xs font-semibold text-muted-foreground font-manrope mb-2 cursor-help inline-flex items-center gap-1">
                          Recovery (Payback)
                          <Info className="w-3 h-3 shrink-0" />
                        </p>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-sm font-manrope">
                        Payback (months) = CAC ÷ (ARR ÷ 12 × margin%)
                      </TooltipContent>
                    </Tooltip>
                    <p className="text-xl font-bold text-foreground font-manrope">
                      {payback != null ? payback.toFixed(1) + " mo" : "—"}
                    </p>
                  </div>
                </div>
                {interpretation && (
                  <div className="pt-6 border-t border-border/40">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{interpretation.emoji}</span>
                      <div>
                        <h4 className="text-lg font-bold font-manrope" style={{ color: interpretation.color }}>
                          {interpretation.label}
                        </h4>
                        <p className="text-sm text-muted-foreground font-manrope">{interpretation.overall}</p>
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      {interpretation.details.map((d, i) => (
                        <p key={i} className="text-sm text-foreground/80 font-manrope leading-relaxed">{d}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground/50 py-8">
                <Activity className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm font-manrope">Fill in ARR, margin, churn, and CAC to see your readout and fitness level.</p>
              </div>
            )}
            </div>
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
    analyticsService.trackConversion("startup_health_guide_view", {
      conversion_type: "micro",
      location: "startup_health_page",
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
              Seven metrics. One body. Tap each organ to diagnose your startup.
            </p>
          </div>
        </section>

        {/* Interactive Body Section */}
        <section className="pb-16 md:pb-24 container-padding">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Body graphic — proportional container so silhouette scales with layout */}
              <div className="relative flex justify-center lg:sticky lg:top-28 min-h-[420px] md:min-h-[520px] flex items-center">
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] aspect-[400/560]">
                  <HumanBodyVisual activeMetric={activeMetric} onHover={handleMetricClick} />
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

        {/* Synthesis / Key Insight (quote) */}
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

        {/* KPI Calculator */}
        <KPICalculator />

        {/* CTA */}
        <section className="section-padding container-padding">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 font-manrope">
              Ready to get back in shape?
            </h2>
            <p className="text-muted-foreground mb-8 font-manrope">
              We help founders and product teams build the habits and systems that keep the business fit — so you can grow without burning out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] hover:from-[#d63531] hover:to-[#e09425] text-white font-manrope font-semibold group"
                onClick={() => {
                  analyticsService.trackEvent("calendly_click", {
                    location: "startup_health_cta",
                    label: "Book a Free Strategy Call",
                    category: "conversion",
                  });
                  analyticsService.trackConversion("startup_health_book_strategy_call", {
                    conversion_type: "primary",
                    location: "startup_health_cta",
                  });
                  window.open("https://calendly.com/iva-lmn3/30min", "_blank");
                }}
              >
                Book a Free Strategy Call
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="font-manrope font-semibold"
                onClick={() => {
                  analyticsService.trackEvent("contact_click", {
                    location: "startup_health_cta",
                    label: "Get in Touch",
                    category: "conversion",
                  });
                  analyticsService.trackConversion("startup_health_get_in_touch", {
                    conversion_type: "secondary",
                    location: "startup_health_cta",
                  });
                  window.location.href = "/contact";
                }}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </section>

        <PageFooter tagline="Building products that scale." />
      </main>
    </>
  );
}

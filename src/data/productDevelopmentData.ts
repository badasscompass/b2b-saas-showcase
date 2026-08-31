import { Target, Users, Zap, Clock } from "lucide-react";
import type { PricingTier } from "@/components/PricingTiers";

export const productServices = [
  {
    icon: Target,
    iconColor: "text-[#EA3E3A]",
    title: "MVP Strategy & Development",
    description: "Guidance from problem definition through to the first shippable version — including lean validation, market-fit framing, critical feature identification, and launch planning."
  },
  {
    icon: Users,
    iconColor: "text-[#F4A42C]",
    title: "Product Roadmapping", 
    description: "Initial ideas shaped into a prioritized, actionable roadmap. Expect clear features, milestones, value hypotheses, and delivery timelines — anchored in business goals."
  },
  {
    icon: Zap,
    iconColor: "text-[#EA3E3A]",
    title: "Technical Architecture Oversight",
    description: "Avoid common scaling bottlenecks by reviewing your current or planned architecture. Working alongside your CTO or tech lead to ensure decisions support feature velocity, robustness, and future scalability."
  },
  {
    icon: Clock,
    iconColor: "text-[#F4A42C]",
    title: "User Testing & Validation",
    description: "Rapid feedback loops — from paper prototypes to live usability testing — designed to inform roadmap adjustments and product evolution from every sprint."
  }
];

export const productProcess = [
  {
    title: "Discovery Kickoff",
    description: "1–2-day sprint to align on vision, success metrics, and current maturity"
  },
  {
    title: "MVP Development Sprint", 
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

export const productOutcomes = [
  "Launch your MVP in just 4–6 weeks",
  "Maintain 2–4 week sprint cycles post-MVP", 
  "Establish an architecture designed for feature velocity & scale",
  "Make informed roadmap pivots within 1–2 weeks of real user feedback"
];

export const clientWork = [
  {
    title: "From Beta Instability to MVP in 1 Month",
    year: 2024,
    scope: "Discovery-to-Strategy Accelerator founder advisory focused (remote)",
    description: "Working in a lightweight advisory format with a solo founder. Initial challenge: An unstable beta MVP and unclear direction—at a time when the AI dev tool landscape was rapidly evolving.",
    lead: "Iva Rumora",
    email: "iva@lmn3.digital",
    result: "Product moved from beta to functional state. Clearer edge in UX and value delivery. Founder equipped with direction for next growth phase. (Ongoing)",
    metrics: "Product stabilized and positioned for growth",
    image: {
      type: 'unsplash' as const,
      id: 'photo-1488590528505-98d2b5aba04b',
      alt: 'Laptop computer showing development work',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1498050108023-c5249f4df085',
        alt: 'MacBook with code on screen'
      }
    },
    sector: "AI Developer Tools",
    product: "codx-junior",
    productUrl: "https://github.com/gbrian/codx-junior"
  },
  {
    title: "Unblocking Remote Dev Team in 3 Weeks",
    year: 2025,
    scope: "Product Ops-in-a-Box sprint execution (remote)",
    description: "A remote dev team was stuck in legacy refactoring with no clear processes or guidelines, and async bottlenecks slowing every release. The backlog was restructured, Sprint 1 focused on bug fixes to stabilise delivery, and Sprint 2 resolved a key contributor bottleneck causing conflicts so implementation could move forward with clearer alignment.",
    lead: "Iva Rumora",
    email: "iva@lmn3.digital",
    result: "Functional delivery flow re-established in 2 sprints. Major bottleneck cleared. Delivery pace and team alignment restored.",
    metrics: "Team alignment and delivery flow restored",
    image: {
      type: 'unsplash' as const,
      id: 'photo-1436491863332-7dd61a1a7f99',
      alt: 'Airline operations and flight disruption management technology',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1464037867666-48c5f6af4d24',
        alt: 'Airport operations control room'
      }
    },
    sector: "B2B Traveltech | Platform for IROP management",
    product: "Flighter.ai",
    productUrl: "https://flighter.ai"
  },
  {
    title: "Airline IROPS Module Expansion & AI Co-Pilot",
    year: 2026,
    scope: "Product ops in a box and fractional PM engagement (remote)",
    description: "Led an airline pilot readiness assessment for an IROPs (Irregular Operations) module, validating technical and domain assumptions with industry stakeholders and refining core business logic. Improved UX for operations-team workflows and prototyped an AI co-pilot to assist agents during disruption events.",
    lead: "Iva Rumora",
    email: "iva@lmn3.digital",
    engagementDuration: "3 months",
    result: "Pilot readiness validated, business logic refined, UX improved for operations workflows, and AI co-pilot interactions prototyped for faster disruption handling.",
    metrics: "Pilot readiness validated and AI co-pilot concept prototyped",
    image: {
      type: 'unsplash' as const,
      id: 'photo-1605810230434-7631ac76ec81',
      alt: 'Team collaboration with displays',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1519389950473-47ba0277781c',
        alt: 'People working with computers'
      }
    },
    sector: "B2B Traveltech | Airline IROP Management",
    product: "Flighter.ai",
    productUrl: "https://flighter.ai"
  }
];

export const productDevelopmentPricingTiers: PricingTier[] = [
  {
    packageName: "Product Clarity Sprint",
    tier: "Solo",
    lead: "Iva",
    teamSetup: "1 PM",
    format: "3-4 weeks",
    useCase: "Post-MVP startups preparing to scale; founders unsure of PMF direction or if their PMs are executing against the right priorities.",
    outcomes: "Clear product roadmap, validated feature priorities, and strategic direction for scaling.",
    pricing: "2500 (starting at)"
  },
  {
    packageName: "Product Ops-in-a-Box",
    tier: "Solo",
    lead: "Iva",
    teamSetup: "1 PM",
    format: "3–5 weeks",
    useCase: "Growing teams in need of structure, decision hygiene, and velocity.",
    outcomes: "Supporting existing product leadership in establishing structure and direction with product rituals, decision frameworks, alignment on tools and tracking.",
    pricing: "3000 (starting at)"
  },
  {
    packageName: "Fractional Product Leadership",
    tier: "Solo",
    lead: "Iva",
    teamSetup: "1 senior PM",
    format: "Daily 4-6 hours",
    useCase: "Founders without a prouduct lead, product teams needing interim PM support (3-6 months).",
    outcomes: "Executive-level product ownership, team leadership with operational support, delivery execution and roadmap implementation.",
    pricing: "40€/h (starting rate)"
  }
];

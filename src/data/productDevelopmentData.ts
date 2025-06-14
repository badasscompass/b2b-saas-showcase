
import { Target, Users, Zap, Clock } from "lucide-react";

export const productServices = [
  {
    icon: Target,
    iconColor: "text-[#EA3E3A]",
    title: "MVP Strategy & Development",
    description: "We guide you from problem definition through to the first shippable version. That includes lean validation, market-fit framing, critical feature identification, and launch planning."
  },
  {
    icon: Users,
    iconColor: "text-[#F4A42C]",
    title: "Product Roadmapping", 
    description: "We take your initial ideas and shape them into a prioritized, actionable roadmap. Expect clear features, milestones, value hypotheses, and delivery timelines — anchored in business goals."
  },
  {
    icon: Zap,
    iconColor: "text-[#EA3E3A]",
    title: "Technical Architecture Oversight",
    description: "Avoid common scaling bottlenecks by reviewing your current or planned architecture. We collaborate with your CTO or tech lead to ensure decisions support feature velocity, robustness, and future scalability."
  },
  {
    icon: Clock,
    iconColor: "text-[#F4A42C]",
    title: "User Testing & Validation",
    description: "We design rapid feedback loops — from paper prototypes to live usability testing. Insights from every sprint inform roadmap adjustments and product evolution."
  }
];

export const productProcess = [
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

export const productOutcomes = [
  "Launch your MVP in just 4–6 weeks",
  "Maintain 2–4 week sprint cycles post-MVP", 
  "Establish an architecture designed for feature velocity & scale",
  "Make informed roadmap pivots within 1–2 weeks of real user feedback"
];

export const clientWork = [
  {
    title: "From Beta Instability to MVP in 1 Month",
    scope: "AI Developer Tools",
    description: "Working in a lightweight advisory format with a solo founder. Initial challenge: An unstable beta MVP and unclear direction—at a time when the AI dev tool landscape was rapidly evolving.",
    lead: "Iva Rumora",
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
    title: "Transforming a Classifieds Platform into a Scalable Digital Marketplace",
    scope: "End-to-end Product Strategy & Delivery",
    description: "Leading Classifieds Platform in Central Europe was experiencing slowed growth due to legacy infrastructure, fragmented user journeys, and misaligned internal processes. We started with in-depth user and stakeholder interviews to identify friction points and growth opportunities.",
    lead: "Anamarija Ledic",
    result: "+21% YoY growth in user engagement within 6 months post-launch. 2× increase in listing conversions through improved search, filtering, and onboarding flows. Introduced modular architecture, enabling faster development and feature rollout.",
    metrics: "+21% YoY user engagement, 2× listing conversions",
    image: {
      type: 'unsplash' as const,
      id: 'photo-1486312338219-ce68d2c6f44d',
      alt: 'Digital marketplace interface',
      fallback: {
        type: 'unsplash' as const,
        id: 'photo-1519389950473-47ba0277781c',
        alt: 'People working with laptops'
      }
    },
    sector: "Online Marketplaces",
    product: "Central Europe Classifieds Platform"
  },
  {
    title: "Unblocking Remote Dev Team in 3 Weeks",
    scope: "B2B Hospitality (Tourism & Transport)", 
    description: "A client was stuck in legacy code refactoring—no dev processes, no guidelines, and async bottlenecks slowing progress. We structured the backlog and launched first sprint with release goals, focused on bug fixes to stabilise delivery. In Sprint 2, resolved a key contributor bottleneck causing conflicts and enabled smoother, aligned implementation across the team.",
    lead: "Iva Rumora",
    result: "Functional delivery flow re-established in 2 sprints. Major bottleneck cleared. Delivery pace and team alignment restored.",
    metrics: "Team alignment and delivery flow restored",
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
    sector: "B2B Hospitality",
    product: "Tourism & Transport Platform"
  }
];

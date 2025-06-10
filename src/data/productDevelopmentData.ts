
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

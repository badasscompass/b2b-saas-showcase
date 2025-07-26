import React from "react";
import { PricingTier } from "@/components/PricingTiers";
import { Target, Users, Rocket, BarChart3 } from "lucide-react";

export const productMarketingGTMPricingTiers: PricingTier[] = [
  {
    packageName: "GTM & Monetisation Alignment",
    tier: "Collab",
    lead: "Iva",
    teamSetup: "1 senior PM",
    format: "4-8 weeks",
    useCase: "Startups pre-launch, teams re-entering market, or shifting ICP.",
    outcomes: "Market messaging & segments, Monetization model audit, GTM activation checklist.",
    pricing: "2800 (starting at)"
  },
  {
    packageName: "Fractional Product Marketing Specialist",
    tier: "Solo", 
    lead: "Both",
    teamSetup: "1 senior PMM",
    format: "Daily 2-4 hours",
    useCase: "Founders without a head of product marketing, teams needing interim PMM specialist support (3-6 months).",
    outcomes: "Senior-level product marketing support, team coaching + mentoring, strategic + delivery alignment.",
    pricing: "Starting at 50€/h"
  }
];

export const whatWeDo = [
  {
    icon: React.createElement(Target, { className: "h-8 w-8 text-[#EA3E3A]" }),
    title: "Value Proposition & Messaging Frameworks",
    description: "We craft clear, compelling messaging rooted in frameworks like JTBD and STP—ensuring your story resonates deeply with your ideal buyers.",
  },
  {
    icon: React.createElement(Users, { className: "h-8 w-8 text-[#F4A42C]" }),
    title: "Market Segmentation & Positioning",
    description: "We break your market into high-opportunity segments, define buyer personas, and create positioning that clearly maps your unique value in context.",
  },
  {
    icon: React.createElement(Rocket, { className: "h-8 w-8 text-[#EA3E3A]" }),
    title: "Go-to-Market Planning & Launch Execution",
    description: "From channel selection to pricing strategy and launch readiness, we build and execute GTM roadmaps—collaborating across product, sales, and marketing for maximum impact.",
  },
  {
    icon: React.createElement(BarChart3, { className: "h-8 w-8 text-[#F4A42C]" }),
    title: "Sales Enablement & Performance Metrics",
    description: "We design playbooks, demos, case studies, and enablement tools—and track key metrics like CAC, CLV, and close rate to continuously optimize performance.",
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Discovery & Benchmarking",
    description: "Audit current positioning, messaging, and pipeline performance to find gaps and opportunities.",
  },
  {
    step: "02",
    title: "Segmentation & Messaging Sprint",
    description: "Align on target segments, value propositions, and messaging frameworks to resonate with buyers.",
  },
  {
    step: "03",
    title: "GTM Roadmap & Asset Creation",
    description: "Build launch assets, define pricing tiers, map channels, and prepare sales teams.",
  },
  {
    step: "04",
    title: "Launch & Optimize",
    description: "Coordinate launch, calibrate messaging, and kick off early GTM initiatives with analytics support.",
  },
];

export const successMetrics = [
  "Messaging that converts — reducing CAC by x%",
  "Increased demo and trial conversion rates through clear positioning",
  "Sales-ready assets that reduce friction and align teams",
  "Measurable, evolving GTM engine with performance reports",
];

export const whyItWorks = [
  "Connects product and market through data-driven frameworks",
  "Anchored in buyer language, not feature lists",
  "Covers the full journey: messaging → launch → performance",
  "Offers measurable value tied to real business outcomes",
];

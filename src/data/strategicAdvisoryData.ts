
import { PricingTier } from "@/components/PricingTiers";

export const strategicAdvisoryPricingTiers: PricingTier[] = [
  {
    packageName: "Product Strategy Blueprint",
    tier: "Collab",
    lead: "Both",
    teamSetup: "2 senior PMs",
    format: "4–6 weeks",
    useCase: "Product-led orgs prepping for scale or funding; early product hires in new orgs.",
    outcomes: "North star product strategy, portfolio positioning, executive-ready strategy pack.",
    pricing: "4000 (starting at)"
  },
  {
    packageName: "Discovery-to-Strategy Accelerator",
    tier: "Collab",
    lead: "Both",
    teamSetup: "2 senior PMs",
    format: "4–8 weeks",
    useCase: "Founders/CPOs testing new product lines or repositioning to grow.",
    outcomes: "Prioritized opportunities, structured discovery docs, value hypotheses & next steps.",
    pricing: "6000 (starting at)"
  },
  {
    packageName: "Fractional Product Leadership",
    tier: "Solo", 
    lead: "Both",
    teamSetup: "1 senior PM",
    format: "Daily 4-6 hours",
    useCase: "Founders without a head of product, product teams needing interim PM support (3-6 months).",
    outcomes: "Executive-level product ownership, team leadership with operational support, strategic + delivery alignment.",
    pricing: "60€/h (starting rate)"
  }
];

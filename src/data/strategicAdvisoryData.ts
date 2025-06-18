
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
    pricing: "Custom"
  },
  {
    packageName: "Fractional Product Leadership",
    tier: "Solo", 
    lead: "Both",
    teamSetup: "1 senior PM",
    format: "Daily 2-6 hours",
    useCase: "Founders without a head of product, product teams needing interim support (3-6 months).",
    outcomes: "Executive-level product ownership, team coaching + mentoring, strategic + delivery alignment.",
    pricing: "40€/h (starting rate)"
  },
  {
    packageName: "Product Reset & Re-Org",
    tier: "Solo",
    lead: "Anamarija", 
    teamSetup: "1 lead PM",
    format: "8–12 weeks",
    useCase: "Post-reorg scaleups, PE/VC-backed orgs, or when nothing clicks anymore.",
    outcomes: "Operating model redesign, team + role clarity, strategic execution plan.",
    pricing: "7000 (starting at)"
  }
];

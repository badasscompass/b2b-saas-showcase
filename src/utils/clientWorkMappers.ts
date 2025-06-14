
import { GenericClientWork } from "@/types/clientWork";
import { ClientWork } from "@/data/strategicAdvisoryClientWork";

// Mapper for Strategic Advisory client work
export const mapStrategicAdvisoryToGeneric = (work: ClientWork): GenericClientWork => {
  // Generate results content based on title
  const getResultsContent = (title: string) => {
    switch (title) {
      case "AI Trust & Adoption Strategy":
        return {
          timeframe: "Results in 45 days",
          results: [
            "• 3× increase in AI usage",
            "• +22% time saved per session",
            "• +47% boost in user satisfaction",
            "• First enterprise deal closed, directly tied to improved UX"
          ],
          insight: "Insight: Trust, not tech, unlocks real adoption in AI-driven products."
        };
      case "Product Positioning Clarity":
        return {
          timeframe: "Results in 3 months",
          results: [
            "• Strategic clarity across team and stakeholders",
            "• Benchmarked missing feature areas against category leaders",
            "• Prioritised strategic feature set aligned with development roadmap",
            "• Stronger product narrative and pitch for early-stage buyers",
            "• Website and messaging aligned with market fit"
          ],
          insight: "From MVP confusion to clear market positioning"
        };
      case "Onboarding Drop-Off Turned Into Activation Growth":
        return {
          timeframe: "Results in 3 weeks",
          results: [
            "• +24% onboarding completion",
            "• +38% Day 1 activation",
            "• 2× feature engagement"
          ],
          insight: "Lesson: Motivation gaps kill retention. Fixing them delivers compounding growth."
        };
      default:
        return undefined;
    }
  };

  return {
    id: `strategic-${work.title.toLowerCase().replace(/\s+/g, '-')}`,
    title: work.title,
    scope: work.scope,
    description: work.description,
    lead: work.lead,
    email: work.email,
    image: work.image,
    sector: work.sector,
    product: work.product,
    productUrl: work.productUrl,
    resultsContent: getResultsContent(work.title)
  };
};

// Generic mapper for other client work types (like Product Development)
export const mapGenericClientWork = (work: any): GenericClientWork => {
  return {
    id: work.id || `generic-${work.title.toLowerCase().replace(/\s+/g, '-')}`,
    title: work.title,
    scope: work.scope,
    description: work.description,
    lead: work.lead,
    email: work.email || work.lead, // fallback to lead if email not available
    image: work.image,
    sector: work.sector,
    product: work.product,
    productUrl: work.productUrl,
    result: work.result,
    metrics: work.metrics
  };
};

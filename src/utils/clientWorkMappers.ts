
import { GenericClientWork } from "@/types/clientWork";
import { UnifiedClientWork } from "@/types/unified";
import { ClientWork } from "@/data/strategicAdvisoryClientWork";

// Mapper for Strategic Advisory client work (legacy support)
export const mapStrategicAdvisoryToGeneric = (work: ClientWork): GenericClientWork => {
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

// Mapper from unified to generic (for backward compatibility)
export const mapUnifiedToGeneric = (work: UnifiedClientWork): GenericClientWork => {
  return {
    id: work.id,
    title: work.title,
    scope: work.scope,
    description: work.description,
    lead: work.lead,
    email: work.email,
    image: work.image,
    sector: work.sector,
    product: work.product,
    productUrl: work.productUrl,
    result: work.result,
    metrics: work.metrics,
    resultsContent: work.resultsContent
  };
};

// Generic mapper for other client work types (like Product Development)
export const mapGenericClientWork = (work: any): GenericClientWork => {
  const getResultsContent = (title: string) => {
    switch (title) {
      case "From Beta Instability to MVP in 1 Month":
        return {
          timeframe: "Results in 1 month",
          results: [
            "• Product moved from beta to functional state",
            "• Clearer edge in UX and value delivery",
            "• Founder equipped with direction for next growth phase",
            "• Product stabilized and positioned for growth"
          ],
          insight: "Insight: Rapid iteration and clear direction can transform unstable betas into viable products."
        };
      case "Unblocking Remote Dev Team in 3 Weeks":
        return {
          timeframe: "Results in 3 weeks",
          results: [
            "• Functional delivery flow re-established in 2 sprints",
            "• Major bottleneck cleared",
            "• Delivery pace and team alignment restored",
            "• Team alignment and delivery flow restored"
          ],
          insight: "Insight: Process and communication fixes can dramatically improve team velocity."
        };
      default:
        return undefined;
    }
  };

  return {
    id: work.id || `generic-${work.title.toLowerCase().replace(/\s+/g, '-')}`,
    title: work.title,
    scope: work.scope,
    description: work.description,
    lead: work.lead,
    email: work.email || work.lead,
    image: work.image,
    sector: work.sector,
    product: work.product,
    productUrl: work.productUrl,
    result: work.result,
    metrics: work.metrics,
    resultsContent: getResultsContent(work.title)
  };
};

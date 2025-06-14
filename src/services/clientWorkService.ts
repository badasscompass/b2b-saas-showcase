
import { UnifiedClientWork } from "@/types/unified";
import { clientWorkData } from "@/data/strategicAdvisoryClientWork";

// Centralized client work service
export class ClientWorkService {
  private static instance: ClientWorkService;
  private clientWorks: Map<string, UnifiedClientWork[]> = new Map();

  private constructor() {
    this.initializeData();
  }

  public static getInstance(): ClientWorkService {
    if (!ClientWorkService.instance) {
      ClientWorkService.instance = new ClientWorkService();
    }
    return ClientWorkService.instance;
  }

  private initializeData() {
    // Initialize strategic advisory data
    const strategicAdvisoryWorks = clientWorkData.map(work => this.mapToUnified(work, 'strategic-advisory'));
    this.clientWorks.set('strategic-advisory', strategicAdvisoryWorks);
  }

  private mapToUnified(work: any, serviceType: UnifiedClientWork['serviceType']): UnifiedClientWork {
    const baseWork: UnifiedClientWork = {
      id: `${serviceType}-${work.title.toLowerCase().replace(/\s+/g, '-')}`,
      title: work.title,
      scope: work.scope,
      description: work.description,
      lead: work.lead,
      email: work.email,
      image: work.image,
      sector: work.sector || '',
      product: work.product || '',
      productUrl: work.productUrl,
      serviceType,
      result: work.result,
      metrics: work.metrics
    };

    // Add specific results content for strategic advisory
    if (serviceType === 'strategic-advisory') {
      baseWork.resultsContent = this.getResultsContent(work.title);
    }

    return baseWork;
  }

  private getResultsContent(title: string) {
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
  }

  public getClientWorksByService(serviceType: string): UnifiedClientWork[] {
    return this.clientWorks.get(serviceType) || [];
  }

  public getClientWorkById(id: string): UnifiedClientWork | undefined {
    for (const works of this.clientWorks.values()) {
      const work = works.find(w => w.id === id);
      if (work) return work;
    }
    return undefined;
  }

  public addClientWork(serviceType: string, work: UnifiedClientWork) {
    const existing = this.clientWorks.get(serviceType) || [];
    this.clientWorks.set(serviceType, [...existing, work]);
  }
}

export const clientWorkService = ClientWorkService.getInstance();

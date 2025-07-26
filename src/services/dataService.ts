
import { UnifiedClientWork } from "@/types/unified";
import { clientWorkData } from "@/data/strategicAdvisoryClientWork";
import { productDevelopmentClientWork } from "@/data/productDevelopmentClientWork";
import { productMarketingGTMClientWork } from "@/data/productMarketingGTMClientWork";

// Centralized data service for all application data
export class DataService {
  private static instance: DataService;

  private constructor() {}

  public static getInstance(): DataService {
    if (!DataService.instance) {
      DataService.instance = new DataService();
    }
    return DataService.instance;
  }

  // Strategic Advisory specific results content
  private getStrategicAdvisoryResultsContent(title: string) {
    switch (title) {
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
      default:
        return undefined;
    }
  }

  // Transform raw data to unified format
  private transformToUnified(work: any, serviceType: UnifiedClientWork['serviceType']): UnifiedClientWork {
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

    // Add service-specific results content
    if (serviceType === 'strategic-advisory') {
      baseWork.resultsContent = this.getStrategicAdvisoryResultsContent(work.title);
    }

    return baseWork;
  }

  // Get all client works for a specific service
  public getClientWorksByService(serviceType: string): UnifiedClientWork[] {
    switch (serviceType) {
      case 'strategic-advisory':
        return clientWorkData.map(work => 
          this.transformToUnified(work, 'strategic-advisory')
        );
      case 'product-development':
        return productDevelopmentClientWork.map(work => 
          this.transformToUnified(work, 'product-development')
        );
      case 'product-marketing-gtm':
        return productMarketingGTMClientWork.map(work => 
          this.transformToUnified(work, 'product-marketing-gtm')
        );
      default:
        return [];
    }
  }

  // Get specific client work by ID
  public getClientWorkById(id: string): UnifiedClientWork | undefined {
    const allServices = ['strategic-advisory', 'product-development', 'product-marketing-gtm'];
    
    for (const serviceType of allServices) {
      const works = this.getClientWorksByService(serviceType);
      const work = works.find(w => w.id === id);
      if (work) return work;
    }
    
    return undefined;
  }

  // Get all client works across all services
  public getAllClientWorks(): UnifiedClientWork[] {
    const allWorks: UnifiedClientWork[] = [];
    const allServices = ['strategic-advisory', 'product-development', 'product-marketing-gtm'];
    
    allServices.forEach(serviceType => {
      allWorks.push(...this.getClientWorksByService(serviceType));
    });
    
    return allWorks;
  }

  // Get client works by sector
  public getClientWorksBySector(sector: string): UnifiedClientWork[] {
    return this.getAllClientWorks().filter(work => 
      work.sector.toLowerCase().includes(sector.toLowerCase())
    );
  }

  // Search client works
  public searchClientWorks(query: string): UnifiedClientWork[] {
    const searchTerm = query.toLowerCase();
    return this.getAllClientWorks().filter(work => 
      work.title.toLowerCase().includes(searchTerm) ||
      work.description.toLowerCase().includes(searchTerm) ||
      work.sector.toLowerCase().includes(searchTerm) ||
      work.scope.toLowerCase().includes(searchTerm)
    );
  }
}

export const dataService = DataService.getInstance();

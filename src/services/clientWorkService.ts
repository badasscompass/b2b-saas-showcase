
import { UnifiedClientWork } from "@/types/unified";
import { dataService } from "./dataService";

// Client work service - now delegates to centralized data service
export class ClientWorkService {
  private static instance: ClientWorkService;

  private constructor() {}

  public static getInstance(): ClientWorkService {
    if (!ClientWorkService.instance) {
      ClientWorkService.instance = new ClientWorkService();
    }
    return ClientWorkService.instance;
  }

  public getClientWorksByService(serviceType: string): UnifiedClientWork[] {
    return dataService.getClientWorksByService(serviceType);
  }

  public getClientWorkById(id: string): UnifiedClientWork | undefined {
    return dataService.getClientWorkById(id);
  }

  public getAllClientWorks(): UnifiedClientWork[] {
    return dataService.getAllClientWorks();
  }

  public getClientWorksBySector(sector: string): UnifiedClientWork[] {
    return dataService.getClientWorksBySector(sector);
  }

  public searchClientWorks(query: string): UnifiedClientWork[] {
    return dataService.searchClientWorks(query);
  }

  // Legacy method for backward compatibility
  public addClientWork(serviceType: string, work: UnifiedClientWork) {
    console.warn('addClientWork is deprecated. Use dataService directly for data management.');
  }
}

export const clientWorkService = ClientWorkService.getInstance();

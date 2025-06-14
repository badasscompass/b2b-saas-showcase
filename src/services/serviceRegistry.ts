
import { clientWorkService } from "./clientWorkService";
import { dataService } from "./dataService";

// Service registry for centralized service management
export class ServiceRegistry {
  private static instance: ServiceRegistry;
  private services: Map<string, any> = new Map();

  private constructor() {
    this.registerServices();
  }

  public static getInstance(): ServiceRegistry {
    if (!ServiceRegistry.instance) {
      ServiceRegistry.instance = new ServiceRegistry();
    }
    return ServiceRegistry.instance;
  }

  private registerServices() {
    this.services.set('clientWork', clientWorkService);
    this.services.set('data', dataService);
  }

  public getService<T>(serviceName: string): T {
    const service = this.services.get(serviceName);
    if (!service) {
      throw new Error(`Service '${serviceName}' not found in registry`);
    }
    return service as T;
  }

  public registerService(name: string, service: any) {
    this.services.set(name, service);
  }

  public hasService(name: string): boolean {
    return this.services.has(name);
  }

  public getAllServiceNames(): string[] {
    return Array.from(this.services.keys());
  }
}

export const serviceRegistry = ServiceRegistry.getInstance();

// Convenience exports
export const getClientWorkService = () => serviceRegistry.getService('clientWork');
export const getDataService = () => serviceRegistry.getService('data');

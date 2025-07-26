
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SectionHeader } from "@/components/SectionHeader";
import { UnifiedClientWorkCard } from "@/components/UnifiedClientWorkCard";
import { ClientWorkDialog } from "@/components/ClientWorkDialog";
import { useOptimizedClientWork } from "@/hooks/useOptimizedClientWork";
import { ServiceConfig } from "@/types/unified";

interface UnifiedClientWorkShowcaseProps {
  serviceType: string;
  config: ServiceConfig;
}

export const UnifiedClientWorkShowcase = ({ serviceType, config }: UnifiedClientWorkShowcaseProps) => {
  const { clientWorks, loading, error, cacheStats } = useOptimizedClientWork(serviceType);

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader 
              title={config.showcaseTitle}
              subtitle={config.showcaseSubtitle}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 justify-items-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[350px] bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-red-600">Error loading client work: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Development logging for cache performance
  if (process.env.NODE_ENV === 'development') {
    console.log(`Cache stats for ${serviceType}:`, cacheStats);
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title={config.showcaseTitle}
            subtitle={config.showcaseSubtitle}
          />
          
          <div className={`grid gap-6 md:gap-8 justify-items-center ${
            clientWorks.length === 1 
              ? 'grid-cols-1 max-w-2xl mx-auto' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
          }`}>
            {clientWorks.map((work) => (
              <Dialog key={work.id}>
                <DialogTrigger asChild>
                  <div>
                    <UnifiedClientWorkCard work={work} onClick={() => {}} />
                  </div>
                </DialogTrigger>
                <ClientWorkDialog work={work} />
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

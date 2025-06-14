
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SectionHeader } from "@/components/SectionHeader";
import { UnifiedClientWorkCard } from "@/components/UnifiedClientWorkCard";
import { ClientWorkDialog } from "@/components/ClientWorkDialog";
import { useClientWork } from "@/hooks/useClientWork";
import { ServiceConfig } from "@/types/unified";

interface UnifiedClientWorkShowcaseProps {
  serviceType: string;
  config: ServiceConfig;
}

export const UnifiedClientWorkShowcase = ({ serviceType, config }: UnifiedClientWorkShowcaseProps) => {
  const { clientWorks, loading } = useClientWork(serviceType);

  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader 
              title={config.showcaseTitle}
              subtitle={config.showcaseSubtitle}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[350px] bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title={config.showcaseTitle}
            subtitle={config.showcaseSubtitle}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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

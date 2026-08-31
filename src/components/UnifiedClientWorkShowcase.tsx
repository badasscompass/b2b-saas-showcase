
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SectionHeader } from "@/components/SectionHeader";
import { UnifiedClientWorkCard } from "@/components/UnifiedClientWorkCard";
import { ClientWorkDialog } from "@/components/ClientWorkDialog";
import { useClientWork } from "@/hooks/useClientWork";
import { ServiceConfig } from "@/types/unified";
import { analyticsService } from "@/services/analyticsService";

interface UnifiedClientWorkShowcaseProps {
  serviceType: string;
  config: ServiceConfig;
}

export const UnifiedClientWorkShowcase = ({ serviceType, config }: UnifiedClientWorkShowcaseProps) => {
  const { clientWorks, loading, error } = useClientWork(serviceType);

  if (loading) {
    return (
      <section id="client-showcase" className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <SectionHeader 
              title={config.showcaseTitle}
              subtitle={config.showcaseSubtitle}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
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
      <section id="client-showcase" className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-red-600">Error loading client work: {error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Development logging
  if (import.meta.env.DEV) {
    console.log(`Loaded ${clientWorks.length} client works for ${serviceType}`);
  }

  // Group works by product so multi-engagement clients read as one story
  const byYear = <T extends { year?: number }>(a: T, b: T) => (a.year ?? 0) - (b.year ?? 0);

  const grouped = clientWorks.reduce<Record<string, typeof clientWorks>>((acc, work) => {
    const key = work.product || work.id;
    (acc[key] ||= []).push(work);
    return acc;
  }, {});

  Object.values(grouped).forEach((items) => items.sort(byYear));

  const multiGroups = Object.entries(grouped)
    .filter(([, items]) => items.length > 1)
    .sort(([, a], [, b]) => byYear(a[0], b[0]));
  const singles = Object.entries(grouped)
    .filter(([, items]) => items.length === 1)
    .flatMap(([, items]) => items)
    .sort(byYear);

  const renderCard = (work: (typeof clientWorks)[number]) => (
    <Dialog key={work.id} onOpenChange={(open) => {
      if (open) {
        analyticsService.trackEvent('select_content', {
          content_type: 'case_study',
          content_id: work.id,
          item_name: work.title,
          service_type: serviceType,
        });
      }
    }}>
      <DialogTrigger asChild>
        <div>
          <UnifiedClientWorkCard work={work} onClick={() => {}} />
        </div>
      </DialogTrigger>
      <ClientWorkDialog work={work} />
    </Dialog>
  );

  return (
    <section id="client-showcase" className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title={config.showcaseTitle}
            subtitle={config.showcaseSubtitle}
          />

          <div className="space-y-10 md:space-y-12">
            {multiGroups.map(([product, items]) => (
              <div
                key={product}
                className="relative rounded-2xl border-2 border-[#F4A42C]/30 bg-white/70 p-5 md:p-7 shadow-sm"
              >
                <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-2xl bg-gradient-to-r from-[#EA3E3A] to-[#FFF33B]" />

                <div className="flex flex-wrap items-center gap-3 mb-5 md:mb-6 pt-2">
                  <span className="text-xs font-semibold font-manrope uppercase tracking-wide text-[#EA3E3A] px-3 py-1.5 rounded-full bg-gradient-to-r from-[#EA3E3A]/10 to-[#F4A42C]/10 border border-[#EA3E3A]/20">
                    Recurring engagement
                  </span>
                  <h3 className="font-manrope font-bold text-lg md:text-xl text-gray-900">
                    {product}
                  </h3>
                  <span className="text-sm font-manrope text-gray-500">
                    {items.length} engagements · {items[0].sector}
                  </span>
                </div>

                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C]" />
                  {items.map(renderCard)}
                </div>
              </div>
            ))}

            {singles.length > 0 && (
              <div className={`grid gap-6 md:gap-8 ${
                singles.length === 1
                  ? 'grid-cols-1 max-w-2xl mx-auto'
                  : 'grid-cols-1 md:grid-cols-2'
              }`}>
                {singles.map(renderCard)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};


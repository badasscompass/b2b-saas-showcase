
import { ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { analyticsService } from "@/services/analyticsService";

export const StartupHealthTeaser = () => {
  const handleClick = () => {
    analyticsService.trackEvent("select_content", {
      content_type: "lead_magnet_teaser",
      content_id: "startup_health",
      location: "homepage_teaser",
    });
    window.location.href = "/startup-health";
  };

  return (
    <section className="section-padding container-padding">
      <div className="container mx-auto max-w-5xl">
        <div
          className="relative overflow-hidden rounded-2xl border border-border/40 p-8 md:p-12 cursor-pointer group"
          onClick={handleClick}
        >
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/8 via-transparent to-[hsl(var(--accent))]/6 pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#EA3E3A]/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            {/* Icon */}
            <div className="shrink-0 p-4 rounded-2xl bg-gradient-to-br from-[#EA3E3A]/15 to-[#FFF33B]/10 border border-[#EA3E3A]/20 group-hover:scale-105 transition-transform duration-300">
              <Activity className="w-8 h-8 text-[#EA3E3A]" />
            </div>

            {/* Copy */}
            <div className="flex-1 min-w-0">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-primary/10 text-primary mb-3 font-manrope">
                Free Diagnostic
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-foreground font-manrope tracking-tight mb-2 leading-snug">
                Is your startup an endurance athlete — or headed for cardiac arrest?
              </h3>
              <p className="text-sm text-muted-foreground font-manrope leading-relaxed max-w-xl">
                MRR is weight. NRR is cardiovascular health. CAC is metabolic cost.
                Check your vital signs with our interactive fitness readout.
              </p>
            </div>

            {/* CTA */}
            <Button
              size="lg"
              className="shrink-0 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] hover:from-[#d63531] hover:to-[#e09425] text-white font-manrope font-semibold group/btn"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              Take the Test
              <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

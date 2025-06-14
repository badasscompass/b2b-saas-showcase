
import { UnifiedClientWorkShowcase } from "@/components/UnifiedClientWorkShowcase";
import { ServiceConfig } from "@/types/unified";

const config: ServiceConfig = {
  title: "Strategic Advisory",
  subtitle: "Guidance for product teams and founders",
  showcaseTitle: "Client Work Showcase",
  showcaseSubtitle: "Explore how we've helped companies transform their strategic positioning, growth issues and go-to-market approach."
};

export const StrategicAdvisoryClientWork = () => {
  return (
    <UnifiedClientWorkShowcase
      serviceType="strategic-advisory"
      config={config}
    />
  );
};

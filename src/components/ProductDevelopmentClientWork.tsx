
import { UnifiedClientWorkShowcase } from "@/components/UnifiedClientWorkShowcase";
import { ServiceConfig } from "@/types/unified";

const config: ServiceConfig = {
  title: "Product Development",
  subtitle: "From MVP to Launch",
  showcaseTitle: "Client Work Showcase",
  showcaseSubtitle: "Explore our product development successes across various industries and technologies."
};

export const ProductDevelopmentClientWork = () => {
  return (
    <UnifiedClientWorkShowcase
      serviceType="product-development"
      config={config}
    />
  );
};


import { UnifiedClientWorkShowcase } from "@/components/UnifiedClientWorkShowcase";
import { ServiceConfig } from "@/types/unified";

const config: ServiceConfig = {
  title: "Product Marketing & GTM",
  subtitle: "Strategy to Scale",
  showcaseTitle: "Product Marketing Success Stories",
  showcaseSubtitle: "See how companies have successfully launched and scaled their products in the market."
};

export const ProductMarketingGTMClientWork = () => {
  return (
    <UnifiedClientWorkShowcase
      serviceType="product-marketing-gtm"
      config={config}
    />
  );
};

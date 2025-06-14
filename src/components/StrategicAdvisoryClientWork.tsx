
import { ClientWorkShowcase } from "@/components/ClientWorkShowcase";
import { clientWorkData } from "@/data/strategicAdvisoryClientWork";
import { mapStrategicAdvisoryToGeneric } from "@/utils/clientWorkMappers";

export const StrategicAdvisoryClientWork = () => {
  const mappedClientWork = clientWorkData.map(mapStrategicAdvisoryToGeneric);

  return (
    <ClientWorkShowcase
      title="Client Work Showcase"
      subtitle="Explore how we've helped companies transform their strategic positioning, growth issues and go-to-market approach."
      clientWork={mappedClientWork}
    />
  );
};

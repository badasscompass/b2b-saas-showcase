
import { useEffect } from "react";
import { ServicePageLayout } from "@/components/layout/ServicePageLayout";
import { StrategicAdvisoryServices } from "@/components/StrategicAdvisoryServices";
import { StrategicAdvisoryProcess } from "@/components/StrategicAdvisoryProcess";
import { StrategicAdvisoryOutcomes } from "@/components/StrategicAdvisoryOutcomes";
import { StrategicAdvisoryClientWork } from "@/components/StrategicAdvisoryClientWork";

const StrategicAdvisory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ServicePageLayout
      title="Strategic Advisory"
      subtitle="Guidance for product teams and founders in defining their value proposition, market positioning, and go-to-market strategy."
      ctaText="Book a Strategy Discovery Call"
      footerTagline="Strategic clarity for product success."
    >
      <StrategicAdvisoryServices />
      <StrategicAdvisoryProcess />
      <StrategicAdvisoryOutcomes />
      <StrategicAdvisoryClientWork />
    </ServicePageLayout>
  );
};

export default StrategicAdvisory;


import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { PageFooter } from "@/components/PageFooter";
import { ContactCTA } from "@/components/ContactCTA";
import { StrategicAdvisoryServices } from "@/components/StrategicAdvisoryServices";
import { StrategicAdvisoryProcess } from "@/components/StrategicAdvisoryProcess";
import { StrategicAdvisoryOutcomes } from "@/components/StrategicAdvisoryOutcomes";
import { StrategicAdvisoryClientWork } from "@/components/StrategicAdvisoryClientWork";

const StrategicAdvisory = () => {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-20">
        <PageHero
          title="Strategic Advisory"
          subtitle="Guidance for early-stage founders in defining their value proposition, market positioning, and go-to-market strategy."
          ctaText="Book a Strategy Discovery Call"
        />

        <StrategicAdvisoryServices />
        <StrategicAdvisoryProcess />
        <StrategicAdvisoryOutcomes />
        <StrategicAdvisoryClientWork />

        <ContactCTA />
        <PageFooter tagline="Strategic clarity for product success." />
      </main>
    </>
  );
};

export default StrategicAdvisory;


import { SectionHeader } from "@/components/SectionHeader";
import { SuccessMetric } from "@/components/SuccessMetric";

const outcomes = [
  "A crisp value proposition that resonates with target buyers",
  "Higher-quality buyer leads due to positioning alignment", 
  "A ready-to-launch GTM campaign in 4–6 weeks",
  "Insight-driven confidence in launch timing, channels, and messaging"
];

export const StrategicAdvisoryOutcomes = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="What Success Looks Like" />
          <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
            {outcomes.map((outcome, index) => (
              <SuccessMetric key={index} text={outcome} variant="highlight" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

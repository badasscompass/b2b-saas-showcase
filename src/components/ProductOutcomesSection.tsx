
import { SectionHeader } from "@/components/SectionHeader";
import { SuccessMetric } from "@/components/SuccessMetric";
import { productOutcomes } from "@/data/productDevelopmentData";

export const ProductOutcomesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader title="What Success Looks Like" />
        <div className="max-w-3xl mx-auto">
          <p className="text-xl font-manrope text-gray-700 mb-8 text-center">
            We help you:
          </p>
          <div className="grid grid-cols-1 gap-4">
            {productOutcomes.map((outcome, index) => (
              <SuccessMetric key={index} text={outcome} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

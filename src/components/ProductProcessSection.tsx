
import { SectionHeader } from "@/components/SectionHeader";
import { ProcessStep } from "@/components/ProcessStep";
import { productProcess } from "@/data/productDevelopmentData";

export const ProductProcessSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader title="How It Works" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {productProcess.map((step, index) => (
            <ProcessStep
              key={index}
              step={index + 1}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

import { Check } from "lucide-react";

export const WhyChooseUs = () => {
  const reasons = [
    "15+ years of B2B SaaS expertise",
    "Proven track record of successful implementations",
    "Data-driven approach to decision making",
    "End-to-end product lifecycle support",
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="space-y-6">
            {reasons.map((reason, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <Check className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="text-lg">{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
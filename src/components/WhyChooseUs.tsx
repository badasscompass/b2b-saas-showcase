import { Check } from "lucide-react";

export const WhyChooseUs = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-manrope">
            Why Choose LMN3 Consulting?
          </h2>
          <ul className="space-y-6">
            {[
              "Deep expertise in B2B SaaS product development and strategy",
              "Proven track record of successful digital transformations",
              "Tailored solutions for your unique business challenges",
              "Agile methodology for faster time-to-market",
              "Continuous support and partnership throughout your journey"
            ].map((item, index) => (
              <li 
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#EA3E3A] hover:to-[#FFF33B] hover:text-white group"
              >
                <Check className="w-6 h-6 text-[#F49040] mt-1 flex-shrink-0 group-hover:text-white" />
                <span className="text-lg font-manrope">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
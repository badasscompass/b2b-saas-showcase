import { Check, Clock, Users, Target, Zap, Award } from "lucide-react";
export const WhyChooseUs = () => {
  const reasons = [{
    icon: <Award className="w-6 h-6" />,
    title: "Deep B2B SaaS Expertise",
    description: "Proven track record in B2B SaaS product development and strategy across multiple verticals."
  }, {
    icon: <Target className="w-6 h-6" />,
    title: "Product Leadership Track Record",
    description: "Extensive experience leading product teams through successful launches, pivots, and scaling initiatives."
  }, {
    icon: <Users className="w-6 h-6" />,
    title: "Tailored Solutions",
    description: "Custom-built strategies and solutions designed for your unique business challenges and goals."
  }, {
    icon: <Zap className="w-6 h-6" />,
    title: "Agile Mindset",
    description: "Fast, iterative approach ensuring faster time-to-market and continuous improvement."
  }, {
    icon: <Clock className="w-6 h-6" />,
    title: "Continuous Partnership",
    description: "Ongoing support and strategic partnership throughout your entire growth journey."
  }];
  return <section id="why-choose-us" className="py-24 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-manrope text-gray-900">Why Choose LMN3?</h2>
            <p className="text-xl text-gray-600 font-manrope">
              We bring the experience, expertise, and execution you need to accelerate your product success.
            </p>
          </div>

          <div className="space-y-6">
            {reasons.map((reason, index) => <div key={index} className="group p-6 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-[#EA3E3A] hover:to-[#F4A42C] hover:text-white hover:shadow-lg hover:-translate-y-1 bg-white shadow-sm border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="text-[#F4A42C] group-hover:text-white transition-colors mt-1">
                    {reason.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold font-manrope mb-2 text-gray-900 group-hover:text-white">
                      {reason.title}
                    </h3>
                    <p className="text-gray-600 font-manrope leading-relaxed group-hover:text-white/90">
                      {reason.description}
                    </p>
                  </div>
                  <Check className="w-6 h-6 text-[#F4A42C] group-hover:text-white transition-colors flex-shrink-0" />
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
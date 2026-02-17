
import { Check, Clock, Users, Target, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";

export const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Deep B2B SaaS Expertise",
      description: "Proven track record in B2B SaaS product development and strategy across multiple verticals."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Product Leadership Track Record",
      description: "Extensive experience leading product teams through successful launches, pivots, and scaling initiatives."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Tailored Solutions",
      description: "Custom-built strategies and solutions designed for your unique business challenges and goals."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Agile Mindset",
      description: "Fast, iterative approach ensuring faster time-to-market and continuous improvement."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Continuous Partnership",
      description: "Ongoing support and strategic partnership throughout your entire growth journey."
    }
  ];

  const stats = [
    { value: "9+", label: "Years of Product Leadership" },
    { value: "30+", label: "Products Shipped" },
    { value: "B2B", label: "SaaS Focus" },
  ];

  return (
    <section id="why-choose-us" className="py-20 md:py-32 bg-gray-900 text-white relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#EA3E3A]/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start max-w-6xl mx-auto">
          
          {/* Left — Heading + Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-manrope leading-tight">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] bg-clip-text text-transparent">
                LMN3?
              </span>
            </h2>
            <p className="text-lg text-gray-400 font-manrope mb-12 leading-relaxed">
              We bring the experience, expertise, and execution you need to accelerate your product success.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center lg:text-left"
                >
                  <div className="text-3xl md:text-4xl font-bold font-manrope bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 font-manrope">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Reasons list */}
          <div className="space-y-4">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group p-5 rounded-xl transition-all duration-300 hover:bg-white/5 border border-white/5 hover:border-white/10"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-[#F4A42C] group-hover:text-[#EA3E3A] transition-colors mt-1 flex-shrink-0">
                    {reason.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold font-manrope mb-1 text-white">
                      {reason.title}
                    </h3>
                    <p className="text-gray-400 font-manrope leading-relaxed text-sm">
                      {reason.description}
                    </p>
                  </div>
                  <Check className="w-5 h-5 text-[#F4A42C]/40 group-hover:text-[#F4A42C] transition-colors flex-shrink-0 mt-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


import { SectionHeader } from "@/components/SectionHeader";
import { ProcessStep } from "@/components/ProcessStep";
import { Target, TrendingUp, MessageSquare, ArrowRight, CheckCircle } from "lucide-react";

const process = [
  {
    title: "Discovery Workshop",
    description: "1–2 hours: We align on business goals, current assumptions, and metrics for success",
    icon: <Target className="h-6 w-6" />
  },
  {
    title: "Market & Competitor Deep Dive", 
    description: "Rich research paired with interviews, peer insights, and 2×2 segmentation workshops",
    icon: <TrendingUp className="h-6 w-6" />
  },
  {
    title: "Value & Positioning Sprint",
    description: "We craft and iterate positioning, value props, and messaging frameworks",
    icon: <MessageSquare className="h-6 w-6" />
  },
  {
    title: "GTM Strategy & Rollout Plan",
    description: "A clear go-to-market roadmap with pricing, channels, messaging, and timing",
    icon: <ArrowRight className="h-6 w-6" />
  },
  {
    title: "Launch Calibration & Feedback",
    description: "Post-launch check-in to optimize the approach and pivot as needed",
    icon: <CheckCircle className="h-6 w-6" />
  }
];

export const StrategicAdvisoryProcess = () => {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="How It Works" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            {process.slice(0, 3).map((step, index) => (
              <ProcessStep
                key={index}
                step={index + 1}
                title={step.title}
                description={step.description}
                icon={step.icon}
                layout="icon"
              />
            ))}
          </div>
          
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 max-w-2xl">
              {process.slice(3, 5).map((step, index) => (
                <ProcessStep
                  key={index + 3}
                  step={index + 4}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  layout="icon"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ReactNode } from "react";

interface ProcessStepProps {
  step: string | number;
  title: string;
  description: string;
  icon?: ReactNode;
  layout?: 'numbered' | 'icon';
}

export const ProcessStep = ({ step, title, description, icon, layout = 'numbered' }: ProcessStepProps) => {
  return (
    <Card className="border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
      <CardHeader className="p-6">
        {layout === 'numbered' ? (
          <div className="w-12 h-12 bg-[#EA3E3A] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
            {step}
          </div>
        ) : (
          <div className="w-16 h-16 bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] rounded-full flex items-center justify-center text-white mb-4 mx-auto shadow-lg">
            {icon}
          </div>
        )}
        <CardTitle className="text-lg md:text-xl font-manrope text-gray-900 mb-3">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 font-manrope leading-relaxed text-sm md:text-base">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

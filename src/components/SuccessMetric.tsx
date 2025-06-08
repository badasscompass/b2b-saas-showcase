
import { CheckCircle } from "lucide-react";

interface SuccessMetricProps {
  text: string;
  variant?: 'default' | 'highlight';
}

export const SuccessMetric = ({ text, variant = 'default' }: SuccessMetricProps) => {
  const bgClass = variant === 'highlight' ? 'bg-gray-50 hover:bg-gray-100' : 'bg-gray-50';
  
  return (
    <div className={`flex items-center space-x-4 p-4 md:p-6 ${bgClass} rounded-lg transition-colors`}>
      <CheckCircle className="h-6 w-6 text-[#EA3E3A] flex-shrink-0" />
      <span className="text-gray-700 font-manrope text-lg">{text}</span>
    </div>
  );
};

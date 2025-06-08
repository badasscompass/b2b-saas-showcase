
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ReactNode } from "react";

interface ServiceCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  index?: number;
}

export const ServiceCard = ({ icon, title, description, index }: ServiceCardProps) => {
  return (
    <Card className="border-2 border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="p-6 md:p-8">
        <div className="flex items-start space-x-4">
          {icon && (
            <div className="p-3 bg-white rounded-full shadow-lg border border-gray-100">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <CardTitle className="text-xl font-manrope text-gray-900 mb-3">
              {index !== undefined ? `${index + 1}. ${title}` : title}
            </CardTitle>
            <CardDescription className="text-gray-600 font-manrope leading-relaxed text-base">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

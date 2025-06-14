
import { ReactNode } from "react";
import { SectionHeader } from "@/components/SectionHeader";

interface ServiceSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  background?: 'white' | 'gray';
}

export const ServiceSection = ({ 
  title, 
  subtitle, 
  children, 
  className = "",
  background = 'white'
}: ServiceSectionProps) => {
  const bgClass = background === 'gray' ? 'bg-gray-50' : 'bg-white';
  
  return (
    <section className={`py-16 md:py-24 ${bgClass} ${className}`}>
      <div className="container mx-auto px-4">
        <SectionHeader title={title} subtitle={subtitle} />
        {children}
      </div>
    </section>
  );
};


import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { productServices } from "@/data/productDevelopmentData";

export const ProductServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader title="What We Do" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {productServices.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <ServiceCard
                key={index}
                icon={<IconComponent className={`h-8 w-8 ${service.iconColor}`} />}
                title={service.title}
                description={service.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};


import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SectionHeader } from "@/components/SectionHeader";
import { PartnerBioCard } from "@/components/PartnerBioCard";
import { PartnerBioDialog } from "@/components/PartnerBioDialog";
import { partnerBios } from "@/data/partnerBios";

export const PartnersSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Meet the Product Lead"
            subtitle="The product lead behind LMN3 collaborating with the cross-functional experts who will guide your product journey." />
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-4xl mx-auto justify-items-center">
            {partnerBios.map((partner) => (
              <Dialog key={partner.id}>
                <DialogTrigger asChild>
                  <div>
                    <PartnerBioCard 
                      partner={partner} 
                      onClick={() => {}} 
                    />
                  </div>
                </DialogTrigger>
                <PartnerBioDialog partner={partner} />
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

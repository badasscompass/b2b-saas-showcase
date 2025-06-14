
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SectionHeader } from "@/components/SectionHeader";
import { ClientWorkCard } from "@/components/ClientWorkCard";
import { ClientWorkDialog } from "@/components/ClientWorkDialog";
import { clientWorkData } from "@/data/strategicAdvisoryClientWork";

export const StrategicAdvisoryClientWork = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="Client Work Showcase"
            subtitle="Explore how we've helped companies transform their strategic positioning, growth issues and go-to-market approach."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {clientWorkData.map((work, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div>
                    <ClientWorkCard work={work} onClick={() => {}} />
                  </div>
                </DialogTrigger>
                <ClientWorkDialog work={work} />
              </Dialog>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

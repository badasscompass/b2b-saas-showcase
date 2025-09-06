import { MapPin } from "lucide-react";

export const ConferenceRibbon = () => {
  return (
    <section className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] py-4 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-6 text-white font-manrope">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span className="font-semibold text-lg">Meet us at:</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="font-medium">Web Summit, Lisbon</span>
              <span className="text-white/80">(10-13 Nov)</span>
            </div>
            <div className="w-px h-6 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Slush, Helsinki</span>
              <span className="text-white/80">(19-20 Nov)</span>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden text-center">
            <div className="text-sm">
              <span className="font-medium">Web Summit, Lisbon (10-13 Nov)</span>
              <span className="mx-2">•</span>
              <span className="font-medium">Slush, Helsinki (19-20 Nov)</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white/10 to-transparent"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white/10 to-transparent"></div>
    </section>
  );
};
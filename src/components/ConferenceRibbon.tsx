import { Sparkles, Star } from "lucide-react";

export const ConferenceRibbon = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 w-full z-20 bg-gradient-to-r from-[#C41E3A] via-[#228B22] to-[#C41E3A] py-3 md:py-4 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 md:gap-4 text-white font-manrope">
          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-yellow-300 animate-pulse flex-shrink-0" />
          <span className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl text-center">
            Wishing you Peaceful Holidays and Prosperous New Year
          </span>
          <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-300 animate-pulse flex-shrink-0" />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white/10 to-transparent"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white/10 to-transparent"></div>
      <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
      <div className="absolute top-0 right-1/4 w-2 h-2 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles, Star, Snowflake } from "lucide-react";

interface ChristmasModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChristmasModal = ({ open, onOpenChange }: ChristmasModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 border-0 overflow-hidden bg-transparent shadow-none">
        {/* Greeting Card */}
        <div className="relative bg-gradient-to-br from-[#EA3E3A] via-[#F49040] to-[#FFF33B] p-1 rounded-2xl">
          <div className="bg-foreground/95 rounded-xl p-8 md:p-10 relative overflow-hidden">
            {/* Decorative snowflakes */}
            <div className="absolute top-4 left-4 text-[#FFF33B]/30">
              <Snowflake className="w-8 h-8 animate-pulse" />
            </div>
            <div className="absolute top-6 right-6 text-[#EA3E3A]/30">
              <Star className="w-6 h-6 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
            <div className="absolute bottom-6 left-6 text-[#F49040]/30">
              <Star className="w-5 h-5 animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            <div className="absolute bottom-4 right-4 text-[#FFF33B]/30">
              <Snowflake className="w-7 h-7 animate-pulse" style={{ animationDelay: '0.9s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-6">
              {/* Logo */}
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/lmn3_logo_white.jpg" 
                  alt="LMN3 Collective" 
                  className="h-12 md:h-14 w-auto rounded"
                />
              </div>

              {/* Decorative line */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFF33B]"></div>
                <Sparkles className="w-5 h-5 text-[#FFF33B]" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFF33B]"></div>
              </div>

              {/* Greeting */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold font-manrope bg-gradient-to-r from-[#EA3E3A] via-[#F49040] to-[#FFF33B] bg-clip-text text-transparent">
                  Happy Holidays
                </h2>
                <p className="text-primary-foreground/90 text-lg md:text-xl font-medium font-manrope leading-relaxed">
                  Wishing you joy, peace, and<br />
                  prosperity this holiday season
                </p>
              </div>

              {/* Year */}
              <div className="pt-4">
                <p className="text-[#F49040] font-semibold text-lg font-manrope">
                  2024 – 2025
                </p>
              </div>

              {/* Closing message */}
              <p className="text-primary-foreground/70 text-sm font-manrope">
                From all of us at LMN3 Collective
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

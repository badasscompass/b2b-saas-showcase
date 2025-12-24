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
        <div className="relative bg-gradient-to-r from-[#C41E3A] via-[#228B22] to-[#C41E3A] p-1 rounded-2xl">
          <div className="bg-white rounded-xl p-8 md:p-10 relative overflow-hidden">
            {/* Decorative snowflakes */}
            <div className="absolute top-4 left-4 text-yellow-300/30">
              <Snowflake className="w-8 h-8 animate-pulse" />
            </div>
            <div className="absolute top-6 right-6 text-[#C41E3A]/30">
              <Star className="w-6 h-6 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
            <div className="absolute bottom-6 left-6 text-[#228B22]/30">
              <Star className="w-5 h-5 animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            <div className="absolute bottom-4 right-4 text-yellow-300/30">
              <Snowflake className="w-7 h-7 animate-pulse" style={{ animationDelay: '0.9s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-6">
              {/* Logo */}
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/lmn3_logo_white.jpg" 
                  alt="LMN3" 
                  className="h-12 md:h-14 w-auto rounded"
                />
              </div>

              {/* Decorative line */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-yellow-300"></div>
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-yellow-300"></div>
              </div>

              {/* Greeting */}
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold font-manrope bg-gradient-to-r from-[#C41E3A] via-[#228B22] to-[#C41E3A] bg-clip-text text-transparent">
                  Happy Holidays
                </h2>
                <p className="text-gray-700 text-lg md:text-xl font-medium font-manrope leading-relaxed">
                  Wishing you joy, peace, and<br />
                  prosperity this holiday season<br />
                </p>
              </div>

              {/* Year */}
              <div className="pt-4">
                <p className="text-[#C41E3A] font-semibold text-2xl font-manrope">
                 See you in 2026!
                </p>
              </div>

              {/* Closing message */}
              <p className="text-gray-600 text-sm font-manrope">
                Iva, LMN3 Founder
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

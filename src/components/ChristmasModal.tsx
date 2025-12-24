import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles, Star, Snowflake, Gift, X } from "lucide-react";
import { toast } from "sonner";

interface ChristmasModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface DiscountPresent {
  id: string;
  service: string;
  discount: string;
  code: string;
  description: string;
}

const discountPresents: DiscountPresent[] = [
  {
    id: "clarity",
    service: "Product Clarity Sprint",
    discount: "15% OFF",
    code: "LMN3-CLARITY-2025",
    description: "Align your product vision in one focused sprint"
  },
  {
    id: "strategy",
    service: "Discover to Strategy Accelerator",
    discount: "15% OFF",
    code: "LMN3-STRATEGY-2025",
    description: "Fast-track your product strategy discovery"
  }
];

export const ChristmasModal = ({ open, onOpenChange }: ChristmasModalProps) => {
  const [revealedPresents, setRevealedPresents] = useState<Set<string>>(new Set());
  const [activePresent, setActivePresent] = useState<DiscountPresent | null>(null);

  const handleOrnamentClick = (present: DiscountPresent) => {
    if (!revealedPresents.has(present.id)) {
      setRevealedPresents(prev => new Set([...prev, present.id]));
    }
    setActivePresent(present);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Discount code copied!", {
      description: "Use it when booking your session"
    });
  };

  const closePresent = () => {
    setActivePresent(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 border-0 overflow-hidden bg-transparent shadow-none">
        {/* Greeting Card */}
        <div className="relative bg-gradient-to-br from-[#EA3E3A] via-[#F49040] to-[#FFF33B] p-1 rounded-2xl">
          <div className="bg-foreground/95 rounded-xl p-8 md:p-10 relative overflow-hidden min-h-[480px]">
            
            {/* Interactive Ornaments */}
            <button
              onClick={() => handleOrnamentClick(discountPresents[0])}
              className={`absolute top-4 left-4 transition-all duration-300 hover:scale-125 cursor-pointer z-20 group ${
                revealedPresents.has("clarity") ? "text-[#FFF33B]" : "text-[#FFF33B]/40"
              }`}
              aria-label="Click for a surprise gift"
            >
              <div className="relative">
                <Snowflake className={`w-10 h-10 ${revealedPresents.has("clarity") ? "animate-spin" : "animate-pulse"}`} style={{ animationDuration: revealedPresents.has("clarity") ? "3s" : "2s" }} />
                {!revealedPresents.has("clarity") && (
                  <Gift className="w-4 h-4 absolute -bottom-1 -right-1 text-[#EA3E3A] opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </button>

            <button
              onClick={() => handleOrnamentClick(discountPresents[1])}
              className={`absolute top-6 right-6 transition-all duration-300 hover:scale-125 cursor-pointer z-20 group ${
                revealedPresents.has("strategy") ? "text-[#EA3E3A]" : "text-[#EA3E3A]/40"
              }`}
              aria-label="Click for a surprise gift"
            >
              <div className="relative">
                <Star className={`w-8 h-8 ${revealedPresents.has("strategy") ? "animate-spin" : "animate-pulse"}`} style={{ animationDuration: revealedPresents.has("strategy") ? "3s" : "2s", animationDelay: '0.3s' }} />
                {!revealedPresents.has("strategy") && (
                  <Gift className="w-4 h-4 absolute -bottom-1 -right-1 text-[#FFF33B] opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            </button>

            {/* Decorative (non-clickable) elements */}
            <div className="absolute bottom-6 left-6 text-[#F49040]/30">
              <Star className="w-5 h-5 animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            <div className="absolute bottom-4 right-4 text-[#FFF33B]/30">
              <Snowflake className="w-7 h-7 animate-pulse" style={{ animationDelay: '0.9s' }} />
            </div>

            {/* Present Reveal Overlay */}
            {activePresent && (
              <div className="absolute inset-0 z-30 flex items-center justify-center p-4 animate-fade-in">
                <div className="absolute inset-0 bg-foreground/98 backdrop-blur-sm" onClick={closePresent} />
                <div className="relative bg-gradient-to-br from-[#EA3E3A] via-[#F49040] to-[#FFF33B] p-1 rounded-xl animate-scale-in">
                  <div className="bg-foreground rounded-lg p-6 text-center space-y-4 max-w-xs">
                    <button
                      onClick={closePresent}
                      className="absolute top-3 right-3 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <div className="flex justify-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#EA3E3A] to-[#FFF33B] flex items-center justify-center">
                        <Gift className="w-8 h-8 text-foreground" />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-[#FFF33B] font-bold text-2xl font-manrope">{activePresent.discount}</p>
                      <h3 className="text-primary-foreground font-semibold text-lg font-manrope mt-1">
                        {activePresent.service}
                      </h3>
                      <p className="text-primary-foreground/70 text-sm font-manrope mt-2">
                        {activePresent.description}
                      </p>
                    </div>
                    
                    <div className="bg-foreground/50 border border-[#F49040]/30 rounded-lg p-3">
                      <p className="text-primary-foreground/60 text-xs font-manrope mb-1">Your discount code:</p>
                      <button
                        onClick={() => copyCode(activePresent.code)}
                        className="font-mono text-[#F49040] font-bold text-lg tracking-wider hover:text-[#FFF33B] transition-colors"
                      >
                        {activePresent.code}
                      </button>
                      <p className="text-primary-foreground/50 text-xs mt-1">Click to copy</p>
                    </div>
                    
                    <p className="text-primary-foreground/50 text-xs font-manrope">
                      Limited to 5 redemptions • Valid until Jan 31, 2025
                    </p>
                  </div>
                </div>
              </div>
            )}

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

              {/* Hint for gifts */}
              <div className="pt-2">
                <p className="text-[#F49040] text-sm font-manrope animate-pulse">
                  ✨ Click the ornaments for holiday surprises! ✨
                </p>
              </div>

              {/* Year */}
              <div className="pt-2">
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

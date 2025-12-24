import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles, Star, Snowflake, Gift, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface ChristmasModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FloatingItem {
  id: number;
  type: 'snowflake' | 'ornament';
  x: number;
  y: number;
  size: number;
  delay: number;
  clicked: boolean;
}

const PROMO_CODE = "LMN3HOLIDAY25";
const CLICK_TARGET = 5;

export const ChristmasModal = ({ open, onOpenChange }: ChristmasModalProps) => {
  const [clickCount, setClickCount] = useState(0);
  const [discountRevealed, setDiscountRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [floatingItems, setFloatingItems] = useState<FloatingItem[]>([]);

  // Generate floating items on mount
  useEffect(() => {
    const items: FloatingItem[] = [
      { id: 1, type: 'snowflake', x: 8, y: 15, size: 28, delay: 0, clicked: false },
      { id: 2, type: 'ornament', x: 85, y: 20, size: 24, delay: 0.2, clicked: false },
      { id: 3, type: 'snowflake', x: 12, y: 75, size: 22, delay: 0.4, clicked: false },
      { id: 4, type: 'ornament', x: 88, y: 70, size: 26, delay: 0.6, clicked: false },
      { id: 5, type: 'snowflake', x: 50, y: 8, size: 20, delay: 0.8, clicked: false },
    ];
    setFloatingItems(items);
  }, []);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setClickCount(0);
      setDiscountRevealed(false);
      setCopied(false);
      setFloatingItems(items => items.map(item => ({ ...item, clicked: false })));
    }
  }, [open]);

  const handleItemClick = (id: number) => {
    if (discountRevealed) return;

    setFloatingItems(items =>
      items.map(item =>
        item.id === id ? { ...item, clicked: true } : item
      )
    );

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= CLICK_TARGET) {
      setDiscountRevealed(true);
      toast.success("🎄 You unlocked a special holiday discount!");
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      toast.success("Promo code copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 border-0 overflow-hidden bg-transparent shadow-none">
        {/* Greeting Card */}
        <div className="relative bg-gradient-to-r from-[#C41E3A] via-[#228B22] to-[#C41E3A] p-1 rounded-2xl">
          <div className="bg-white rounded-xl p-8 md:p-10 relative overflow-hidden min-h-[480px]">
            
            {/* Interactive Floating Items */}
            {floatingItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                disabled={item.clicked || discountRevealed}
                className={`absolute z-20 transition-all duration-500 cursor-pointer hover:scale-125 focus:outline-none ${
                  item.clicked 
                    ? 'opacity-20 scale-75 pointer-events-none' 
                    : 'animate-bounce hover:animate-none'
                }`}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  animationDelay: `${item.delay}s`,
                  animationDuration: '2s',
                }}
                aria-label={`Click ${item.type} to reveal discount`}
              >
                {item.type === 'snowflake' ? (
                  <Snowflake 
                    className="text-[#228B22] drop-shadow-lg" 
                    style={{ width: item.size, height: item.size }}
                  />
                ) : (
                  <div 
                    className="rounded-full bg-gradient-to-br from-[#C41E3A] to-[#8B0000] shadow-lg flex items-center justify-center"
                    style={{ width: item.size, height: item.size }}
                  >
                    <Gift className="text-white" style={{ width: item.size * 0.6, height: item.size * 0.6 }} />
                  </div>
                )}
              </button>
            ))}

            {/* Progress indicator */}
            {!discountRevealed && (
              <div className="absolute top-2 right-2 z-30 bg-[#228B22]/90 text-white text-xs px-2 py-1 rounded-full font-manrope">
                {clickCount}/{CLICK_TARGET} ✨
              </div>
            )}

            {/* Static Decorative elements */}
            <div className="absolute top-4 left-4 text-yellow-300/30 pointer-events-none">
              <Snowflake className="w-8 h-8 animate-pulse" />
            </div>
            <div className="absolute top-6 right-6 text-[#C41E3A]/30 pointer-events-none">
              <Star className="w-6 h-6 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
            <div className="absolute bottom-6 left-6 text-[#228B22]/30 pointer-events-none">
              <Star className="w-5 h-5 animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            <div className="absolute bottom-4 right-4 text-yellow-300/30 pointer-events-none">
              <Snowflake className="w-7 h-7 animate-pulse" style={{ animationDelay: '0.9s' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center space-y-5">
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

              {/* Greeting or Discount */}
              {!discountRevealed ? (
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold font-manrope bg-gradient-to-r from-[#C41E3A] via-[#228B22] to-[#C41E3A] bg-clip-text text-transparent">
                    Happy Holidays
                  </h2>
                  <p className="text-gray-700 text-lg md:text-xl font-medium font-manrope leading-relaxed">
                    Wishing you joy, peace, and<br />
                    prosperity this holiday season
                  </p>
                  <p className="text-gray-500 text-sm font-manrope animate-pulse">
                    ✨ Click the snowflakes & ornaments for a surprise! ✨
                  </p>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <h2 className="text-2xl md:text-3xl font-bold font-manrope bg-gradient-to-r from-[#C41E3A] via-[#228B22] to-[#C41E3A] bg-clip-text text-transparent">
                    🎁 Holiday Special! 🎁
                  </h2>
                  <div className="bg-gradient-to-r from-[#C41E3A]/10 via-[#228B22]/10 to-[#C41E3A]/10 rounded-lg p-4 border border-[#228B22]/20">
                    <p className="text-[#C41E3A] text-4xl font-bold font-manrope">
                      15% OFF
                    </p>
                    <div className="mt-3 space-y-1">
                      <p className="text-gray-700 font-medium font-manrope text-sm">
                        Product Clarity Sprint
                      </p>
                      <p className="text-gray-700 font-medium font-manrope text-sm">
                        Discovery to Strategy Accelerator
                      </p>
                    </div>
                  </div>
                  
                  {/* Promo Code */}
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm font-manrope">Use code:</p>
                    <button
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-2 bg-[#228B22] text-white px-4 py-2 rounded-lg font-bold font-manrope text-lg hover:bg-[#1a6b1a] transition-colors"
                    >
                      {PROMO_CODE}
                      {copied ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                    <p className="text-gray-500 text-xs font-manrope">
                      Valid until January 31, 2025
                    </p>
                  </div>
                </div>
              )}

              {/* Year */}
              <div className="pt-2">
                <p className="text-[#C41E3A] font-semibold text-xl font-manrope">
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

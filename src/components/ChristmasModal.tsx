import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles, Star, Snowflake, Gift, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const EXPIRY_DATE = new Date('2026-01-31T23:59:59');

const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = EXPIRY_DATE.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};

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
  packageName?: string;
  discount?: string;
}

const PROMO_CODE = "LMN3HOLIDAY25";
const CLICK_TARGET = 5;
const DISCOUNT_PERCENT = "15%";

const PACKAGES = [
  { name: "Product Clarity Sprint", discount: DISCOUNT_PERCENT },
  { name: "Discovery-to-Strategy Accelerator", discount: DISCOUNT_PERCENT },
];

export const ChristmasModal = ({ open, onOpenChange }: ChristmasModalProps) => {
  const timeLeft = useCountdown();
  const [clickCount, setClickCount] = useState(0);
  const [discountRevealed, setDiscountRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [floatingItems, setFloatingItems] = useState<FloatingItem[]>([]);

  // Generate floating items on mount - 5 total (3 ornaments + 2 green snowflakes)
  useEffect(() => {
    const items: FloatingItem[] = [
      { id: 1, type: 'snowflake', x: 8, y: 15, size: 28, delay: 0, clicked: false, packageName: PACKAGES[0].name, discount: PACKAGES[0].discount },
      { id: 2, type: 'ornament', x: 85, y: 20, size: 24, delay: 0.2, clicked: false, packageName: PACKAGES[1].name, discount: PACKAGES[1].discount },
      { id: 3, type: 'ornament', x:30, y: 75, size: 22, delay: 0.4, clicked: false, packageName: PACKAGES[0].name, discount: PACKAGES[0].discount },
      { id: 4, type: 'snowflake', x: 68, y: 38, size: 26, delay: 0.6, clicked: false, packageName: PACKAGES[1].name, discount: PACKAGES[1].discount },
      { id: 5, type: 'ornament', x: 60, y: 18, size: 20, delay: 0.8, clicked: false, packageName: PACKAGES[0].name, discount: PACKAGES[0].discount },
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
        <div className="relative bg-gradient-to-br from-[#EA3E3A] via-[#F49040] to-[#FFF33B] p-1 rounded-2xl">
          <div className="bg-white rounded-xl p-8 md:p-10 relative overflow-hidden min-h-[480px]">
            
            {/* Interactive Floating Items */}
            {floatingItems.map((item) => (
              <div
                key={item.id}
                className="absolute z-20 group"
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                }}
              >
                <div className="flex flex-col items-center">
                  {/* Package Info Label - Visible on Hover Only */}
                  {!item.clicked && !discountRevealed && item.packageName && (
                    <div className="mb-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-white rounded-lg shadow-lg border-2 border-[#F49040] px-2 py-1.5 min-w-[180px] max-w-[220px]">
                        <div className="text-center space-y-0.5">
                          <p className="text-[#EA3E3A] font-bold text-xs font-manrope leading-tight">
                            {item.discount} OFF
                          </p>
                          <p className="text-gray-700 text-[10px] font-medium font-manrope leading-tight">
                            {item.packageName}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleItemClick(item.id)}
                    disabled={item.clicked || discountRevealed}
                    className={`transition-all duration-300 cursor-pointer focus:outline-none relative ${
                      item.clicked 
                        ? 'opacity-100 scale-100' 
                        : 'animate-bounce hover:animate-none hover:scale-125'
                    }`}
                    style={{
                      animationDelay: `${item.delay}s`,
                      animationDuration: '2s',
                    }}
                    aria-label={`Click ${item.type} to reveal discount`}
                  >
                    {item.type === 'snowflake' ? (
                      <Snowflake 
                        className={`drop-shadow-lg ${item.clicked ? 'text-[#228B22]/60' : 'text-[#228B22]'}`}
                        style={{ width: item.size, height: item.size }}
                      />
                    ) : (
                      <div 
                        className={`rounded-full bg-gradient-to-br from-[#EA3E3A] to-[#8B0000] shadow-lg flex items-center justify-center relative ${
                          item.clicked ? 'ring-2 ring-[#228B22] ring-offset-2' : ''
                        }`}
                        style={{ width: item.size, height: item.size }}
                      >
                        <Gift className="text-white" style={{ width: item.size * 0.6, height: item.size * 0.6 }} />
                        {item.clicked && (
                          <div className="absolute -top-1 -right-1 bg-[#228B22] rounded-full w-5 h-5 flex items-center justify-center">
                            <Check className="text-white w-3 h-3" />
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            ))}

            {/* Progress indicator */}
            {!discountRevealed && (
              <div className="absolute top-2 right-2 z-30 bg-[#EA3E3A]/90 text-white text-xs px-2 py-1 rounded-full font-manrope">
                {clickCount}/{CLICK_TARGET} ✨
              </div>
            )}

            {/* Scattered Snowflakes across modal */}
            <div className="absolute top-4 left-4 text-[#FFF33B]/40 pointer-events-none">
              <Snowflake className="w-8 h-8 animate-pulse" />
            </div>
            <div className="absolute top-12 right-12 text-[#EA3E3A]/30 pointer-events-none">
              <Snowflake className="w-6 h-6 animate-pulse" style={{ animationDelay: '0.2s' }} />
            </div>
            <div className="absolute top-1/3 left-1/4 text-[#F49040]/30 pointer-events-none">
              <Snowflake className="w-7 h-7 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
            <div className="absolute top-1/2 right-1/4 text-[#FFF33B]/35 pointer-events-none">
              <Snowflake className="w-5 h-5 animate-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
            <div className="absolute bottom-1/3 left-1/3 text-[#EA3E3A]/30 pointer-events-none">
              <Snowflake className="w-6 h-6 animate-pulse" style={{ animationDelay: '0.8s' }} />
            </div>
            <div className="absolute bottom-6 left-6 text-[#F49040]/30 pointer-events-none">
              <Snowflake className="w-7 h-7 animate-pulse" style={{ animationDelay: '0.3s' }} />
            </div>
            <div className="absolute bottom-4 right-4 text-[#FFF33B]/40 pointer-events-none">
              <Snowflake className="w-8 h-8 animate-pulse" style={{ animationDelay: '0.9s' }} />
            </div>
            <div className="absolute top-1/4 right-1/3 text-[#EA3E3A]/25 pointer-events-none">
              <Snowflake className="w-5 h-5 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <div className="absolute bottom-1/4 left-1/5 text-[#FFF33B]/30 pointer-events-none">
              <Snowflake className="w-6 h-6 animate-pulse" style={{ animationDelay: '0.7s' }} />
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
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFF33B]"></div>
                <Sparkles className="w-5 h-5 text-[#FFF33B]" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFF33B]"></div>
              </div>

              {/* Greeting or Discount */}
              {!discountRevealed ? (
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold font-manrope bg-gradient-to-r from-[#EA3E3A] via-[#F49040] to-[#FFF33B] bg-clip-text text-transparent">
                    Happy Holidays
                  </h2>
                  <p className="text-gray-700 text-lg md:text-xl font-medium font-manrope leading-relaxed">
                    Wishing you joy, peace, and<br />
                    prosperity this holiday season
                  </p>
                  <p className="text-gray-500 text-sm font-manrope animate-pulse">
                    ✨ Click the ornaments for a surprise! ✨
                  </p>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <h2 className="text-2xl md:text-3xl font-bold font-manrope bg-gradient-to-r from-[#EA3E3A] via-[#F49040] to-[#FFF33B] bg-clip-text text-transparent">
                    🎁 Holiday Special! 🎁
                  </h2>
                  <div className="bg-gradient-to-r from-[#EA3E3A]/10 via-[#F49040]/10 to-[#FFF33B]/10 rounded-lg p-4 border border-[#F49040]/20">
                    <p className="text-[#EA3E3A] text-4xl font-bold font-manrope">
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
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EA3E3A] to-[#F49040] text-white px-4 py-2 rounded-lg font-bold font-manrope text-lg hover:from-[#d02e2a] hover:to-[#e08030] transition-colors"
                    >
                      {PROMO_CODE}
                      {copied ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Year */}
              <div className="pt-2">
                <p className="text-[#EA3E3A] font-semibold text-xl font-manrope">
                  See you in 2026!
                </p>
              </div>

              {/* Closing message */}
              <p className="text-gray-600 text-sm font-manrope">
                Iva, LMN3 Founder
              </p>
            </div>

            {/* Countdown Timer Footnote */}
            {discountRevealed && (
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-gray-400 text-xs font-manrope">
                  Claim expires January 31, 2026 ( {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m )
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sparkles, Snowflake, Gift, Copy, Check } from "lucide-react";
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
  const [cardOpened, setCardOpened] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Generate floating items on mount - 5 total (3 ornaments + 2 green snowflakes)
  useEffect(() => {
    const items: FloatingItem[] = [
      { id: 1, type: 'snowflake', x: 12, y: 18, size: 28, delay: 0, clicked: false, packageName: PACKAGES[0].name, discount: PACKAGES[0].discount },
      { id: 2, type: 'ornament', x: 78, y: 22, size: 24, delay: 0.2, clicked: false, packageName: PACKAGES[1].name, discount: PACKAGES[1].discount },
      { id: 3, type: 'ornament', x: 25, y: 60, size: 22, delay: 0.4, clicked: false, packageName: PACKAGES[0].name, discount: PACKAGES[0].discount },
      { id: 4, type: 'snowflake', x: 72, y: 45, size: 26, delay: 0.6, clicked: false, packageName: PACKAGES[1].name, discount: PACKAGES[1].discount },
      { id: 5, type: 'ornament', x: 55, y: 20, size: 20, delay: 0.8, clicked: false, packageName: PACKAGES[0].name, discount: PACKAGES[0].discount },
    ];
    setFloatingItems(items);
  }, []);

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setClickCount(0);
      setDiscountRevealed(false);
      setCopied(false);
      setCardOpened(false);
      setIsHovering(false);
      setFloatingItems(items => items.map(item => ({ ...item, clicked: false })));
    }
  }, [open]);

  const handleEnvelopeClick = () => {
    if (!cardOpened) {
      setCardOpened(true);
    }
  };

  const handleItemClick = (id: number) => {
    if (discountRevealed) return;

    if (!cardOpened) return;

    const clickedItem = floatingItems.find(item => item.id === id);
    if (clickedItem?.clicked) return;

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
        {/* Envelope Container - Back View */}
        <div className="relative" style={{ perspective: '1500px' }}>
          {/* Envelope Body with gradient border */}
          <div
            className="relative bg-gradient-to-br from-[#EA3E3A] via-[#F49040] to-[#FFF33B] p-1 rounded-2xl shadow-2xl"
            style={{
              boxShadow: '0 20px 60px rgba(234, 62, 58, 0.4), 0 10px 30px rgba(0, 0, 0, 0.2)',
            }}
          >

            {/* Greeting Card Container - Always visible to show flap */}
            <div
              className="bg-white rounded-xl relative overflow-hidden min-h-[480px]"
              style={{
                boxShadow: cardOpened ? 'inset 0 2px 8px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              {/* Content Peeking from Inside Envelope */}
              {!cardOpened && (
                <div className="absolute top-0 left-0 right-0 h-[52%] z-20 overflow-hidden pointer-events-none">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent px-10 pb-8 pt-12 transition-transform duration-500"
                    style={{
                      transform: isHovering ? 'translateY(-8px)' : 'translateY(0)',
                    }}
                  >
                    {/* Partial logo peek */}
                    <div
                      className="flex justify-center transition-opacity duration-500"
                      style={{ opacity: isHovering ? 0.8 : 0.6 }}
                    >
                      <img
                        src="/lovable-uploads/lmn3_logo_white.jpg"
                        alt="LMN3"
                        className="h-10 w-auto rounded"
                      />
                    </div>
                    {/* Subtle decorative elements peeking */}
                    <div
                      className="flex items-center justify-center gap-2 mt-4 transition-opacity duration-500"
                      style={{ opacity: isHovering ? 0.6 : 0.4 }}
                    >
                      <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#FFF33B]"></div>
                      <Sparkles className="w-4 h-4 text-[#FFF33B]" />
                      <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#FFF33B]"></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Envelope Flap - Back view, opens downward */}
              {!cardOpened && (
                <div
                  onClick={handleEnvelopeClick}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-br from-[#EA3E3A] via-[#F49040] to-[#FFF33B] rounded-b-xl overflow-visible cursor-pointer transition-all duration-500 group"
                  style={{
                    height: '50%',
                    transform: isHovering ? 'rotateX(-5deg) translateY(-4px)' : 'rotateX(0deg) translateY(0)',
                    transformOrigin: 'bottom center',
                    transformStyle: 'preserve-3d',
                    boxShadow: isHovering
                      ? '0 -4px 15px rgba(0,0,0,0.15), 0 12px 35px rgba(0,0,0,0.3), 0 0 30px rgba(255, 243, 59, 0.3)'
                      : '0 -2px 10px rgba(0,0,0,0.1), 0 8px 25px rgba(0,0,0,0.25)',
                  }}
                >

                  {/* Decorative Wax Seal with hover glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-[#FFF33B] to-[#F49040] flex items-center justify-center border-2 border-white/40 pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl"
                    style={{
                      boxShadow: '0 4px 20px rgba(255, 243, 59, 0.4), 0 0 40px rgba(244, 144, 64, 0.3)',
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                    <div className="absolute inset-0 rounded-full bg-[#FFF33B] opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                    <Sparkles className="w-8 h-8 text-white drop-shadow-md group-hover:rotate-12 transition-transform duration-500" />
                  </div>

                  <div className="h-full w-full flex flex-col items-center justify-end pb-6 gap-2 pointer-events-none">
                    <p className="text-white font-manrope text-sm font-medium drop-shadow-md group-hover:scale-105 transition-transform duration-300">
                      Click to open
                    </p>
                  </div>
                </div>
              )}
              
              {/* Envelope Flap - Opening animation */}
              {cardOpened && (
                <div
                  className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-br from-[#EA3E3A] via-[#F49040] to-[#FFF33B] rounded-b-xl overflow-visible pointer-events-none"
                  style={{
                    height: '50%',
                    transform: 'rotateX(180deg) translateY(100%)',
                    transformOrigin: 'bottom center',
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    backfaceVisibility: 'hidden',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                  }}
                ></div>
              )}

              {/* Interactive Floating Items - Outside content div to ensure clickability */}
              {floatingItems.map((item) => (
                <div
                  key={item.id}
                  className="absolute z-20 group"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: cardOpened ? 'auto' : 'none',
                    opacity: cardOpened ? 1 : 0,
                    transition: 'opacity 0.3s ease-in 0.3s',
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
                      disabled={item.clicked || discountRevealed || !cardOpened}
                      className={`transition-all duration-300 focus:outline-none relative ${
                        item.clicked 
                          ? 'opacity-100 scale-100 cursor-default' 
                          : cardOpened
                          ? 'animate-bounce hover:animate-none hover:scale-125 cursor-pointer'
                          : 'opacity-50 cursor-not-allowed'
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

              {/* Greeting Card Content - Fades in when envelope opens */}
              <div
                className="p-8 md:p-10 relative z-10"
                style={{
                  opacity: cardOpened ? 1 : 0,
                  visibility: cardOpened ? 'visible' : 'hidden',
                  transition: 'opacity 0.3s ease-in 0.3s, visibility 0s linear 0.3s',
                  pointerEvents: cardOpened ? 'auto' : 'none',
                }}
              >

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
                <div className="space-y-4 animate-in fade-in duration-500">
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

              {/* Countdown Timer Footnote */}
              {discountRevealed && (
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <p className="text-gray-400 text-xs font-manrope">
                    Claim expires January 31, 2026 ( {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m )
                  </p>
                </div>
              )}
            </div>
            {/* Close Content div */}
            </div>
            {/* Close Greeting Card Content wrapper */}
            </div>
            {/* Close Greeting Card Container */}
          </div>
          {/* Close Envelope Body div */}
        </div>
        {/* Close Envelope Container div */}
      </DialogContent>
    </Dialog>
  );
};

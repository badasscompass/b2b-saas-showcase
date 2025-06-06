
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Cog, Lightbulb } from "lucide-react";

export const WhoWeServeSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Who You Help */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center">
                <Users className="h-12 w-12" style={{ stroke: "url(#gradient)" }} />
              </div>
              <CardTitle className="mb-4 font-manrope text-xl">Who You Help</CardTitle>
              <CardDescription className="text-left space-y-2 font-manrope">
                <div>• Funded startups and scaleups (Seed → Series B)</div>
                <div>• B2B SaaS teams with 5–20 engineers</div>
                <div>• Technical or commercial founders lacking full product leadership</div>
              </CardDescription>
            </CardHeader>
          </Card>

          {/* What You Offer */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center">
                <Cog className="h-12 w-12" style={{ stroke: "url(#gradient)" }} />
              </div>
              <CardTitle className="mb-4 font-manrope text-xl">⚙️ What You Offer</CardTitle>
              <CardDescription className="text-left space-y-2 font-manrope">
                <div>• Embedded product leadership pods (not just one PM)</div>
                <div>• Flexible, fractional involvement across delivery, growth, and GTM</div>
                <div>• Structured product ops, growth loops, and messaging refinement</div>
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Why You're Different */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mb-4 flex justify-center">
                <Lightbulb className="h-12 w-12" style={{ stroke: "url(#gradient)" }} />
              </div>
              <CardTitle className="mb-4 font-manrope text-xl">💡 Why You're Different</CardTitle>
              <CardDescription className="text-left space-y-2 font-manrope">
                <div>• Senior-only team: every partner has 7–12+ years' experience</div>
                <div>• Cross-functional by design: delivery + growth + marketing</div>
                <div>• Adaptable pricing: retainers, outcome-based, or project bundles</div>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Hidden SVG for gradient definition */}
        <svg width="0" height="0">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#EA3E3A" }} />
              <stop offset="100%" style={{ stopColor: "#FFF33B" }} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

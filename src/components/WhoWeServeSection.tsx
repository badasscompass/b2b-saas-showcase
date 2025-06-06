
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const WhoWeServeSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Who We Help */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="mb-4 font-manrope text-xl">Who we help</CardTitle>
              <CardDescription className="text-left space-y-2 font-manrope">
                <div>• Funded startups and scaleups (Seed → Series B)</div>
                <div>• B2B SaaS teams with 5–20 engineers</div>
                <div>• Technical or commercial founders lacking full product leadership</div>
              </CardDescription>
            </CardHeader>
          </Card>

          {/* What We Offer */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="mb-4 font-manrope text-xl">What we offer</CardTitle>
              <CardDescription className="text-left space-y-2 font-manrope">
                <div>• Embedded product leadership pods (not just one PM)</div>
                <div>• Flexible, fractional involvement across delivery, growth, and GTM</div>
                <div>• Structured product ops, growth loops, and messaging refinement</div>
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Why We're Different */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <CardTitle className="mb-4 font-manrope text-xl">Why we're different</CardTitle>
              <CardDescription className="text-left space-y-2 font-manrope">
                <div>• Senior-only team: every partner has 7–12+ years' experience</div>
                <div>• Cross-functional by design: delivery + growth + marketing</div>
                <div>• Adaptable pricing: retainers, outcome-based, or project bundles</div>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
};

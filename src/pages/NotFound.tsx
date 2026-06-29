import { PageLayout } from "@/components/layout/PageLayout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/useSEO";

const NotFound = () => {
  useSEO({
    title: "404 - Page Not Found | LMN3",
    description: "The page you're looking for doesn't exist. Explore LMN3's product development and strategic advisory services.",
    canonicalUrl: "https://lmn3.digital/404",
  });

  return (
    <PageLayout showContactCTA={false}>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-xl">
          <h1 className="text-6xl md:text-8xl font-bold font-manrope text-[#EA3E3A] mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold font-manrope text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 font-manrope text-lg mb-8">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on course.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white font-manrope font-semibold hover:opacity-90 transition-opacity"
            >
              <Link to="/">Go Home</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-gray-300 text-gray-700 font-manrope hover:text-[#EA3E3A] hover:border-[#EA3E3A] transition-colors"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound;

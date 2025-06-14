
interface PageFooterProps {
  companyName?: string;
  tagline?: string;
}

export const PageFooter = ({ companyName = "LMN3 Collective", tagline = "Building products that scale." }: PageFooterProps) => {
  return (
    <footer className="py-8 bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-600 font-manrope text-sm">
            © 2025 {companyName}. {tagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

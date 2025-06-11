
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/ac928757-746d-4571-b2f0-de32e4c5470e.png"
              alt="LMN3 Logo"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold font-manrope text-[#EA3E3A]">LMN3</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#services" className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors">Services</Link>
            <Link to="/#who-we-serve" className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors">Who We Serve</Link>
            <Link to="/#why-choose-us" className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors">Why Us</Link>
            {/*<Button className="bg-[#EA3E3A] hover:bg-[#F4A42C] text-white font-manrope">
              Get Started
            </Button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

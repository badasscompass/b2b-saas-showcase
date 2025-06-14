
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/#services" className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors">Services</Link>
            <Link to="/#who-we-serve" className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors">Who We Serve</Link>
            <Link to="/#why-choose-us" className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors">Why Us</Link>
            <Link to="/about-us" className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors">About</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-[#EA3E3A] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/#services" 
                className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/#who-we-serve" 
                className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Who We Serve
              </Link>
              <Link 
                to="/#why-choose-us" 
                className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Why Us
              </Link>
              <Link 
                to="/about-us" 
                className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

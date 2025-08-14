
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img 
              src="/lovable-uploads/ac928757-746d-4571-b2f0-de32e4c5470e.png"
              alt="LMN3 Logo - Iva Rumora Strategic Product Consulting"
              className="w-8 h-8"
            />
            <span className="text-xl font-bold font-manrope text-[#EA3E3A]">LMN3</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-gray-700 hover:text-[#EA3E3A] font-manrope transition-all duration-200 focus:outline-none group">
                <span>Services</span>
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-0 shadow-2xl z-50 min-w-[280px] p-2 rounded-lg bg-gradient-to-br from-white to-gray-50">
                <DropdownMenuItem asChild className="rounded-md p-0 focus:bg-transparent">
                  <Link 
                    to="/product-development" 
                    className="flex flex-col px-4 py-3 rounded-md hover:bg-gradient-to-r hover:from-[#EA3E3A]/5 hover:to-[#F4A42C]/5 transition-all duration-200 group"
                  >
                    <span className="text-gray-800 font-manrope font-semibold group-hover:text-[#EA3E3A] transition-colors">Product Development</span>
                    <span className="text-sm text-gray-500 mt-1">From MVP to launch</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-md p-0 focus:bg-transparent">
                  <Link 
                    to="/strategic-advisory" 
                    className="flex flex-col px-4 py-3 rounded-md hover:bg-gradient-to-r hover:from-[#EA3E3A]/5 hover:to-[#F4A42C]/5 transition-all duration-200 group"
                  >
                    <span className="text-gray-800 font-manrope font-semibold group-hover:text-[#EA3E3A] transition-colors">Strategic Advisory</span>
                    <span className="text-sm text-gray-500 mt-1">Clear direction & positioning</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-md p-0 focus:bg-transparent">
                  <Link 
                    to="/product-marketing-gtm" 
                    className="flex flex-col px-4 py-3 rounded-md hover:bg-gradient-to-r hover:from-[#EA3E3A]/5 hover:to-[#F4A42C]/5 transition-all duration-200 group"
                  >
                    <span className="text-gray-800 font-manrope font-semibold group-hover:text-[#EA3E3A] transition-colors">Product Marketing & GTM</span>
                    <span className="text-sm text-gray-500 mt-1">Launch smarter, reach faster</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/#who-we-serve" className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors">Who We Serve</Link>
            <Link to="/#why-choose-us" className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors">Why Us</Link>
            <Link to="/about-us" className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors">About</Link>
            <a href="https://irumora.substack.com/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors">Blog</a>
            <Link to="/contact" className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white px-4 py-2 rounded-md font-manrope font-semibold hover:opacity-90 transition-opacity">Contact</Link>
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
              <div className="space-y-2">
                <div className="text-gray-700 font-manrope font-semibold py-2">Services</div>
                <div className="pl-4 space-y-2">
                  <Link 
                    to="/product-development" 
                    className="block text-gray-600 hover:text-[#EA3E3A] font-manrope transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Product Development
                  </Link>
                  <Link 
                    to="/strategic-advisory" 
                    className="block text-gray-600 hover:text-[#EA3E3A] font-manrope transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Strategic Advisory
                  </Link>
                  <Link 
                    to="/product-marketing-gtm" 
                    className="block text-gray-600 hover:text-[#EA3E3A] font-manrope transition-colors py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Product Marketing & GTM
                  </Link>
                </div>
              </div>
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
              <a 
                href="https://irumora.substack.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <Link 
                to="/contact" 
                className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white px-4 py-2 rounded-md font-manrope font-semibold hover:opacity-90 transition-opacity text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

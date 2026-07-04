
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { analyticsService } from "@/services/analyticsService";

interface NavigationProps {
  logoOnly?: boolean;
}

const SERVICE_PATHS = ["/product-development", "/strategic-advisory", "/product-marketing-gtm"];

export const Navigation = ({ logoOnly = false }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const currentHash = location.hash;

  const handleNavClick = (linkName: string, isExternal: boolean = false) => {
    analyticsService.trackButtonClick(`nav_${linkName}`, 'navigation');
    if (isExternal) {
      analyticsService.trackExternalLink(`https://irumora.substack.com/`, 'Blog');
    }
  };

  const isServicesActive = SERVICE_PATHS.includes(currentPath);
  const isAboutActive = currentPath === "/about-us";
  const isContactActive = currentPath === "/contact";
  const isWhoActive = currentPath === "/" && currentHash === "#who-we-serve";
  const isWhyActive = currentPath === "/" && currentHash === "#why-choose-us";

  const linkBase =
    "relative text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors py-1 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-gradient-to-r after:from-[#EA3E3A] after:to-[#F4A42C] after:transition-all after:duration-300";
  const activeUnderline = "text-[#EA3E3A] after:w-full";
  const inactiveUnderline = "after:w-0 hover:after:w-full";

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
          {!logoOnly && (
          <div className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center space-x-1 font-manrope focus:outline-none group ${linkBase} ${isServicesActive ? activeUnderline : inactiveUnderline}`}>
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
            <Link to="/#who-we-serve" onClick={() => handleNavClick('who_we_serve')} className={`${linkBase} ${isWhoActive ? activeUnderline : inactiveUnderline}`}>Who Is It For</Link>
            <Link to="/#why-choose-us" onClick={() => handleNavClick('why_choose_us')} className={`${linkBase} ${isWhyActive ? activeUnderline : inactiveUnderline}`}>Why LMN3</Link>
            <Link to="/about-us" onClick={() => handleNavClick('about')} className={`${linkBase} ${isAboutActive ? activeUnderline : inactiveUnderline}`}>About</Link>
            <a href="https://irumora.substack.com/" target="_blank" rel="noopener noreferrer" onClick={() => handleNavClick('blog', true)} className={`${linkBase} ${inactiveUnderline}`}>Blog</a>
            <Link to="/contact" onClick={() => handleNavClick('contact')} className={`px-4 py-2 rounded-md font-manrope font-semibold transition-all ${isContactActive ? 'bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white ring-2 ring-[#EA3E3A]/30 ring-offset-2' : 'bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white hover:opacity-90'}`}>Contact</Link>
          </div>
          )}

          {/* Mobile Menu Button */}
          {!logoOnly && (
          <button
            className="md:hidden p-2 text-gray-700 hover:text-[#EA3E3A] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {!logoOnly && isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <div className={`font-manrope font-semibold py-2 ${isServicesActive ? 'text-[#EA3E3A]' : 'text-gray-700'}`}>Services</div>
                <div className="pl-4 space-y-2">
                  <Link 
                    to="/product-development" 
                    className={`block font-manrope transition-colors py-1 ${currentPath === '/product-development' ? 'text-[#EA3E3A] font-semibold' : 'text-gray-600 hover:text-[#EA3E3A]'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Product Development
                  </Link>
                  <Link 
                    to="/strategic-advisory" 
                    className={`block font-manrope transition-colors py-1 ${currentPath === '/strategic-advisory' ? 'text-[#EA3E3A] font-semibold' : 'text-gray-600 hover:text-[#EA3E3A]'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Strategic Advisory
                  </Link>
                  <Link 
                    to="/product-marketing-gtm" 
                    className={`block font-manrope transition-colors py-1 ${currentPath === '/product-marketing-gtm' ? 'text-[#EA3E3A] font-semibold' : 'text-gray-600 hover:text-[#EA3E3A]'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Product Marketing & GTM
                  </Link>
                </div>
              </div>
              <Link 
                to="/#who-we-serve" 
                className={`font-manrope transition-colors py-2 ${isWhoActive ? 'text-[#EA3E3A] font-semibold' : 'text-gray-700 hover:text-[#EA3E3A]'}`}
                onClick={() => { setIsMenuOpen(false); handleNavClick('who_we_serve'); }}
              >
                Who Is It For
              </Link>
              <Link 
                to="/#why-choose-us" 
                className={`font-manrope transition-colors py-2 ${isWhyActive ? 'text-[#EA3E3A] font-semibold' : 'text-gray-700 hover:text-[#EA3E3A]'}`}
                onClick={() => { setIsMenuOpen(false); handleNavClick('why_choose_us'); }}
              >
                Why LMN3
              </Link>
              <Link 
                to="/about-us" 
                className={`font-manrope transition-colors py-2 ${isAboutActive ? 'text-[#EA3E3A] font-semibold' : 'text-gray-700 hover:text-[#EA3E3A]'}`}
                onClick={() => { setIsMenuOpen(false); handleNavClick('about'); }}
              >
                About
              </Link>
              <a 
                href="https://irumora.substack.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#EA3E3A] font-manrope transition-colors py-2"
                onClick={() => { setIsMenuOpen(false); handleNavClick('blog', true); }}
              >
                Blog
              </a>
              <Link 
                to="/contact" 
                className="bg-gradient-to-r from-[#EA3E3A] to-[#F4A42C] text-white px-4 py-2 rounded-md font-manrope font-semibold hover:opacity-90 transition-opacity text-center"
                onClick={() => { setIsMenuOpen(false); handleNavClick('contact'); }}
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

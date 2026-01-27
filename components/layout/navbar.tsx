import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', hasDropdown: false },
  { name: 'About', hasDropdown: true },
  { name: 'Join', hasDropdown: true },
  { name: 'Sermons', hasDropdown: false },
  { name: 'Give', hasDropdown: false },
  { name: 'Contact', hasDropdown: true },
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full border-b border-white/5 bg-nav-bg backdrop-blur-[2px]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0 w-[57px] h-[57px] rounded-full overflow-hidden bg-white/10">
          <img 
            src="https://img-wrapper.vercel.app/image?url=https://s3-alpha-sig.figma.com/img/29fc/aaaf/990b37e9f81712729c82732ad77fb95a?Expires=1770595200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CZUjyZSQXKMsIiT7OmHxP2qnI0gZI4WXXKMAX17RqNi396S2URAp~eE-OKhaVYsT2T~MVdDZKTdgBTFzB2XuXGNi2p1i6t6h~9huoYba-oIyPH06O4RFJnbg8CagWKOjFjYvuE3q0l6Hj7aRxJq~ByOtMwBwPqTKpIYY4bm45lrAyNMu3aGcxMvrwbSMKe4UYvWEMB4wYeeIe~tsFkYywoSP3-GacyLhFHZnW2M4OIoDyDVsz5Re-uoj2Drzz4Zxuj6K7PYEf3Stqi9SoIK-FbgIAhxZBxmC4sZZgSreTIJ2n8VauFfcRdFYvU8C0l4tGfnKnm9NbvkPJv4oRHCdLg__" 
            alt="Votage Logo" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.name.toLowerCase()}`}
              className="group flex items-center gap-1.5 text-white/90 hover:text-white font-sans text-base transition-colors"
            >
              {link.name}
              {link.hasDropdown && (
                <ChevronDown className="w-4 h-4 text-white/80 group-hover:text-white transition-transform group-hover:rotate-180" />
              )}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button variant="nav-cta" className="font-body text-lg px-8 py-3 rounded-full border-opacity-60">
            Plan Your Visit
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.name.toLowerCase()}`}
                  className="text-white text-xl font-medium flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </a>
              ))}
              <Button variant="nav-cta" className="w-full max-w-xs mt-4">
                Plan Your Visit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowUpRight } from 'lucide-react';
import { COMPANY } from '../data/companyData';

interface NavbarProps {
  onOpenEnquiry?: () => void;
  onReplayIntro?: () => void;
  onTriggerHomeAnim?: () => void;
  onTriggerAboutAnim?: () => void;
  onTriggerServicesAnim?: () => void;
  onTriggerUsedCarsAnim?: () => void;
  onTriggerContactAnim?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenEnquiry, 
  onReplayIntro,
  onTriggerHomeAnim,
  onTriggerAboutAnim,
  onTriggerServicesAnim,
  onTriggerUsedCarsAnim,
  onTriggerContactAnim
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Used Cars', href: '#used-cars' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (href === '#home' && onTriggerHomeAnim) {
      onTriggerHomeAnim();
    }
    if (href === '#about' && onTriggerAboutAnim) {
      onTriggerAboutAnim();
    }
    if (href === '#services' && onTriggerServicesAnim) {
      onTriggerServicesAnim();
    }
    if (href === '#used-cars' && onTriggerUsedCarsAnim) {
      onTriggerUsedCarsAnim();
    }
    if (href === '#contact' && onTriggerContactAnim) {
      onTriggerContactAnim();
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#171A20]/95 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl'
          : 'bg-gradient-to-b from-[#0B0D10]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1 (Brand) — Zone 2 (4-5 Nav Links) — Zone 3 (Primary Action) */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <a 
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2 group whitespace-nowrap shrink-0"
          >
            {/* Minimalist automotive emblem accent */}
            <div className="w-8 h-8 rounded bg-[#171A20] border border-white/15 flex items-center justify-center group-hover:border-[#E32636] transition-colors relative overflow-hidden">
              <span className="text-xs font-black tracking-widest text-white group-hover:text-[#E32636] transition-colors">
                M
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E32636]" />
            </div>
            <span className="text-lg sm:text-xl font-black tracking-wider text-white">
              MMR MOTORS <span className="text-[#E32636]">LTD</span>
            </span>
          </a>

          {/* Zone 2: Navigation Links with Animated Underline */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#B8BEC7]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative py-1 hover:text-white transition-colors group whitespace-nowrap shrink-0"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#E32636] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action (Prominent Red CALL US Button) */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase bg-[#E32636] hover:bg-[#c41e2d] rounded-lg shadow-[0_0_20px_rgba(227,38,54,0.35)] hover:shadow-[0_0_25px_rgba(227,38,54,0.6)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 border border-red-400/30"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>CALL US</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="p-2 text-white bg-[#E32636] rounded-md shadow-md"
              aria-label="Call MMR Motors"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#B8BEC7] hover:text-white bg-white/5 rounded-md border border-white/10"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Drawer */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#171A20] border-b border-white/10 ${
          mobileMenuOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'
        }`}
      >
        <div className="px-6 flex flex-col space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="py-2 text-base font-medium text-[#B8BEC7] hover:text-white hover:pl-2 transition-all border-b border-white/5"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="flex items-center justify-center gap-2 w-full py-3 text-center text-sm font-bold uppercase tracking-wider text-white bg-[#E32636] rounded-lg shadow-lg"
            >
              <Phone className="w-4 h-4" />
              <span>CALL {COMPANY.phone}</span>
            </a>
            {onOpenEnquiry && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnquiry();
                }}
                className="flex items-center justify-center gap-1.5 w-full py-2.5 text-center text-xs font-medium text-[#B8BEC7] hover:text-white bg-white/5 rounded-lg border border-white/10"
              >
                <span>Make Direct Workshop Enquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

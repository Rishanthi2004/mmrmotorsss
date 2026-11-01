import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { COMPANY } from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';

interface FooterProps {
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Used Cars', href: '#used-cars' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#0B0D10] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Red Accent Top Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E32636] to-transparent shadow-[0_0_15px_#E32636]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal threshold={0.05} rootMargin="-5% 0px -5% 0px">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Introduction */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#171A20] border border-white/15 flex items-center justify-center relative overflow-hidden">
                <span className="text-xs font-black tracking-widest text-[#E32636]">
                  M
                </span>
                <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#E32636]" />
              </div>
              <span className="text-xl font-black tracking-wider text-white">
                MMR MOTORS <span className="text-[#E32636]">LTD</span>
              </span>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[#B8BEC7] max-w-sm leading-relaxed">
              Precision vehicle maintenance, professional repair services, and quality used car sales operating from Croydon, United Kingdom.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Registered Business in England & Wales</span>
            </div>

            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#B8BEC7] hover:text-[#E32636] transition-colors"
              >
                <span>Replay Cinematic Entrance</span>
              </button>
            )}
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E32636] mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#B8BEC7]">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="hover:text-white hover:translate-x-1 inline-block transition-all"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#E32636] mb-4">
              Direct Contact
            </h4>
            
            <div className="flex items-start gap-2.5 text-xs text-[#B8BEC7]">
              <Phone className="w-4 h-4 text-[#E32636] shrink-0 mt-0.5" />
              <div>
                <span className="block text-white font-medium">Telephone</span>
                <a href={`tel:${COMPANY.phoneTel}`} className="hover:text-white transition-colors">
                  {COMPANY.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-[#B8BEC7]">
              <Mail className="w-4 h-4 text-[#E32636] shrink-0 mt-0.5" />
              <div>
                <span className="block text-white font-medium">Email</span>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-white transition-colors break-all">
                  {COMPANY.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-[#B8BEC7]">
              <MapPin className="w-4 h-4 text-[#E32636] shrink-0 mt-0.5" />
              <div>
                <span className="block text-white font-medium">Croydon Workshop</span>
                <span>{COMPANY.fullAddress}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8BEC7]">
          <div>
            <p>{COMPANY.copyright}</p>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href={COMPANY.googleMapsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>View Map</span>
              <ExternalLink className="w-3 h-3 text-[#E32636]" />
            </a>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#171A20] hover:bg-white/10 border border-white/10 rounded-md text-white transition-all transform hover:-translate-y-0.5"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#E32636]" />
            </button>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

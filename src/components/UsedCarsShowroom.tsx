import React, { useState, useEffect, useRef } from 'react';
import { Car, ShieldCheck, ArrowRight, Phone, Mail, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { COMPANY, SHOWROOM_CATEGORIES } from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';

interface UsedCarsShowroomProps {
  onOpenEnquiry?: (category?: string) => void;
  externalTrigger?: number;
}

interface TouchRipple {
  id: number;
  x: number;
  y: number;
}

export const UsedCarsShowroom: React.FC<UsedCarsShowroomProps> = ({ onOpenEnquiry, externalTrigger }) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [ripples, setRipples] = useState<TouchRipple[]>([]);
  const [isLaserSweeping, setIsLaserSweeping] = useState(false);
  const [isPulseActive, setIsPulseActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const currentCat = SHOWROOM_CATEGORIES[selectedCategory];

  const triggerBackgroundAnimation = (xPercent = 50, yPercent = 50) => {
    const newRipple: TouchRipple = {
      id: Date.now() + Math.random(),
      x: xPercent,
      y: yPercent,
    };

    setRipples((prev) => [...prev.slice(-3), newRipple]);
    setIsLaserSweeping(true);
    setIsPulseActive(true);

    setTimeout(() => {
      setIsLaserSweeping(false);
    }, 1200);

    setTimeout(() => {
      setIsPulseActive(false);
    }, 1400);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1500);
  };

  useEffect(() => {
    if (externalTrigger && externalTrigger > 0) {
      triggerBackgroundAnimation(50, 40);
    }
  }, [externalTrigger]);

  const handleTouchOrClick = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input')) {
      return;
    }

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const xPercent = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
      const yPercent = Math.max(5, Math.min(95, ((clientY - rect.top) / rect.height) * 100));
      triggerBackgroundAnimation(xPercent, yPercent);
    }
  };

  const handleContactClick = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="used-cars" 
      ref={sectionRef}
      onClick={handleTouchOrClick}
      onTouchStart={handleTouchOrClick}
      className="relative py-28 bg-[#0B0D10] border-t border-white/5 overflow-hidden cursor-default"
    >
      {/* Background Subtle Ambient Lighting & Touch Ripples */}
      <div className="absolute inset-0 workshop-grid opacity-10 pointer-events-none" />

      {/* Touch-Triggered Crimson Ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute rounded-full border border-[#E32636] bg-[#E32636]/15 shadow-[0_0_60px_rgba(227,38,54,0.7)] animate-bg-shockwave pointer-events-none"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            width: '340px',
            height: '340px',
          }}
        />
      ))}

      {/* Laser Light Sweep Across Showroom Floor */}
      {isLaserSweeping && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="w-1.5 h-full bg-gradient-to-b from-transparent via-[#E32636] to-transparent shadow-[0_0_35px_#E32636] animate-laser-sweep" />
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#C7CCD3] to-transparent shadow-[0_0_25px_#C7CCD3] animate-laser-sweep-y" />
        </div>
      )}

      {/* Radial Showroom Atmosphere Glow */}
      <div 
        className={`absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-700 ${
          isPulseActive 
            ? 'bg-[radial-gradient(ellipse_at_center,rgba(227,38,54,0.22)_0%,transparent_70%)] animate-energy-pulse' 
            : 'bg-[radial-gradient(ellipse_at_center,rgba(227,38,54,0.08)_0%,transparent_70%)]'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 stagger-header">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#E32636] uppercase mb-3">
              <span className="w-5 h-[2px] bg-[#E32636]" />
              <span>PRE-OWNED SHOWROOM EXPERIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              FIND YOUR <span className="text-silver-shimmer">NEXT DRIVE.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#B8BEC7]">
              Every vehicle offered through MMR MOTORS LTD undergoes thorough workshop evaluation before handover, providing peace of mind from first inspection.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={handleContactClick}
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>CONTACT US</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hero Showroom Display Card */}
        <div className="rounded-3xl bg-[#171A20] border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden stagger-body">
          {/* Subtle Metallic Top Border */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C7CCD3]/40 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Large Automotive Image Showcase */}
            <div 
              className="lg:col-span-7 relative group cursor-pointer"
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
              onClick={() => onOpenEnquiry && onOpenEnquiry(currentCat.title)}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-black border border-white/10 shadow-xl">
                <img
                  src="/src/assets/images/showroom_used_car_luxury_1793513342804.jpg"
                  alt="MMR MOTORS LTD luxury showroom presentation"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
                    isHoveringImage ? 'scale-105 filter brightness-105' : 'scale-100'
                  }`}
                />

                {/* Overhead Panel Light Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-black/20 to-transparent opacity-80" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#0B0D10]/80 backdrop-blur-md rounded-md border border-white/20 text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{currentCat.badge}</span>
                </div>

                {/* Bottom Interactive Hover Cue */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#E32636]/90 backdrop-blur-md rounded-lg text-xs font-bold text-white uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-transform duration-300 group-hover:scale-105">
                  <span>Enquire About This Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Right: Category Information & Enquiry Callout */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-semibold tracking-wider text-[#E32636] uppercase">
                  Category Showcase
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-1">
                  {currentCat.title}
                </h3>
                <p className="text-sm text-[#B8BEC7] mt-3 leading-relaxed">
                  {currentCat.summary}
                </p>

                {/* Preparation standards */}
                <div className="mt-6 space-y-2.5 text-xs text-[#B8BEC7]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E32636] shrink-0" />
                    <span>Comprehensive multi-point mechanical inspection</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E32636] shrink-0" />
                    <span>Verified provenance & clear documentation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E32636] shrink-0" />
                    <span>Fully valeted and road-tested prior to handover</span>
                  </div>
                </div>
              </div>

              {/* Company Note Mandated in Brief */}
              <div className="mt-8 p-5 rounded-xl bg-[#0B0D10] border border-white/10">
                <p className="text-sm font-medium text-white italic">
                  “Looking for your next vehicle? Contact our team to enquire about available cars.”
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry(`Used Cars - ${currentCat.title}`)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#E32636] hover:bg-[#c41e2d] rounded-lg shadow-lg shadow-[#E32636]/20 transition-all whitespace-nowrap"
                  >
                    <span>ENQUIRE NOW</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`tel:${COMPANY.phoneTel}`}
                    className="inline-flex items-center justify-center p-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-lg transition-colors"
                    title={`Call ${COMPANY.phone}`}
                  >
                    <Phone className="w-4 h-4 text-[#E32636]" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Category Selector Tabs */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SHOWROOM_CATEGORIES.map((cat, idx) => {
                const isActive = selectedCategory === idx;
                return (
                  <button
                    key={cat.title}
                    onClick={() => setSelectedCategory(idx)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      isActive
                        ? 'bg-[#0B0D10] border-[#E32636] text-white shadow-md'
                        : 'bg-white/5 border-white/5 text-[#B8BEC7] hover:border-white/15 hover:text-white'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-[#E32636] uppercase font-semibold">
                      0{idx + 1} // Selection
                    </div>
                    <div className="text-xs font-bold mt-0.5 truncate">
                      {cat.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

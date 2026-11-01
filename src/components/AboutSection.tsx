import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Shield, Wrench, Car, Check, Sparkles } from 'lucide-react';
import { COMPANY } from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';
import { IMAGES } from '../assets/images';

interface AboutSectionProps {
  externalTrigger?: number;
}

interface TouchRipple {
  id: number;
  x: number;
  y: number;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ externalTrigger }) => {
  const [ripples, setRipples] = useState<TouchRipple[]>([]);
  const [isLaserSweeping, setIsLaserSweeping] = useState(false);
  const [isPulseActive, setIsPulseActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    }, 1300);

    setTimeout(() => {
      setIsPulseActive(false);
    }, 1500);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1400);
  };

  // Watch for external trigger from navigation bar
  useEffect(() => {
    if (externalTrigger && externalTrigger > 0) {
      triggerBackgroundAnimation(50, 40);
    }
  }, [externalTrigger]);

  const handleTouchOrClick = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    // Don't intercept button or link clicks
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

  return (
    <section 
      id="about" 
      ref={sectionRef}
      onClick={handleTouchOrClick}
      onTouchStart={handleTouchOrClick}
      className="relative py-28 bg-[#0B0D10] overflow-hidden cursor-default"
    >
      {/* Background Interactive Ambient Lighting & Animations */}
      <div className="absolute inset-0 workshop-grid opacity-20 pointer-events-none" />

      {/* Touch-Triggered Glowing Crimson Shockwaves */}
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

      {/* Horizontal Laser Sweep Across Section Background */}
      {isLaserSweeping && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="w-2 h-full bg-gradient-to-b from-transparent via-[#E32636] to-transparent shadow-[0_0_40px_#E32636] animate-laser-sweep" />
          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#C7CCD3] to-transparent shadow-[0_0_30px_#C7CCD3] animate-laser-sweep-y" />
        </div>
      )}

      {/* Radial Energy Pulse Background Aura */}
      <div 
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none transition-all duration-700 ${
          isPulseActive 
            ? 'bg-[radial-gradient(circle_at_center,rgba(227,38,54,0.22)_0%,transparent_70%)] animate-energy-pulse' 
            : 'bg-[radial-gradient(circle_at_center,rgba(227,38,54,0.06)_0%,transparent_70%)]'
        }`}
      />

      {/* Decorative Accent Lines */}
      <div 
        className={`absolute top-1/2 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#E32636] to-transparent transition-all duration-500 ${
          isLaserSweeping ? 'w-96 opacity-100 shadow-[0_0_15px_#E32636]' : 'w-32 opacity-40'
        }`} 
      />
      <div 
        className={`absolute bottom-12 right-0 h-[1px] bg-gradient-to-l from-transparent via-white to-transparent transition-all duration-500 ${
          isLaserSweeping ? 'w-96 opacity-80 shadow-[0_0_15px_white]' : 'w-48 opacity-20'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Visual Showcase with Asymmetrical Angled Mask */}
            <div className="lg:col-span-5 relative stagger-body">
              <div className="relative z-10 group">
                {/* Outer Glow & Rim */}
                <div 
                  className={`absolute -inset-1 rounded-2xl transition-all duration-500 ${
                    isPulseActive 
                      ? 'bg-gradient-to-tr from-[#E32636] via-white/40 to-[#E32636] blur-xl opacity-90' 
                      : 'bg-gradient-to-tr from-[#E32636]/30 via-white/10 to-transparent blur-md group-hover:blur-lg opacity-100'
                  }`} 
                />
                
                <div className="relative rounded-2xl overflow-hidden bg-[#171A20] border border-white/15 aspect-[4/5] sm:aspect-[3/4]">
                  <img
                    src={IMAGES.workshop}
                    alt="MMR MOTORS LTD dedicated vehicle servicing and repair workshop facility"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-black/30 to-transparent" />

                  {/* Asymmetrical Corner Accent */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-[#0B0D10]/80 backdrop-blur-md border border-white/20 rounded-md text-[11px] font-mono tracking-wider text-white uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E32636]" />
                    <span>CROYDON · CRO 2EZ</span>
                  </div>

                  {/* Bottom Overlay Label */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#171A20]/90 backdrop-blur-md rounded-xl border border-white/15">
                    <div className="text-[11px] font-semibold tracking-wider text-[#E32636] uppercase">
                      Facility Focus
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      Professional Workshop & Vehicle Sales
                    </div>
                    <p className="text-xs text-[#B8BEC7] mt-1">
                      Flat 9 Solar Court, 119 Sydenham Road, Croydon
                    </p>
                  </div>
                </div>
              </div>

              {/* Subtle floating decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-white/10 rounded-xl pointer-events-none -z-0 hidden sm:block" />
              <div className="absolute -top-4 -right-4 w-16 h-16 border border-[#E32636]/30 rounded-lg pointer-events-none -z-0 hidden sm:block" />
            </div>

            {/* Right Column: Editorial Company Introduction */}
            <div className="lg:col-span-7 flex flex-col justify-center stagger-cards">
              {/* Kicker */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#E32636] uppercase mb-3">
                <span className="w-6 h-[2px] bg-[#E32636]" />
                <span>ABOUT MMR MOTORS LTD</span>
              </div>

              {/* Section Title */}
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.12]">
                ENGINEERED AROUND <br />
                <span className="text-silver-shimmer">YOUR JOURNEY.</span>
              </h2>

              {/* Core Description Approved by Brief */}
              <p className="mt-6 text-base sm:text-lg text-white leading-relaxed font-medium">
                MMR MOTORS LTD provides vehicle maintenance and repair services alongside used car sales. We aim to help customers find practical automotive solutions for their vehicle needs.
              </p>

              <p className="mt-4 text-sm sm:text-base text-[#B8BEC7] leading-relaxed">
                Based in Croydon, our focus is built on straightforward communication, transparent vehicle assessments, and dependable workmanship. Whether you require scheduled maintenance to maintain your vehicle’s health, diagnosis for an emerging mechanical fault, or assistance discovering your next quality pre-owned car, we provide honest guidance every step of the way.
              </p>

              {/* Three Core Pillars */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#171A20] border border-white/10 hover:border-[#E32636]/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#E32636]/10 flex items-center justify-center text-[#E32636] mb-3">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Routine Care</h4>
                  <p className="text-xs text-[#B8BEC7] mt-1">
                    Scheduled preventative checks to keep your vehicle reliable and road-ready.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#171A20] border border-white/10 hover:border-[#E32636]/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#E32636]/10 flex items-center justify-center text-[#E32636] mb-3">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Targeted Repairs</h4>
                  <p className="text-xs text-[#B8BEC7] mt-1">
                    Accurate mechanical problem solving tailored to your specific vehicle model.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#171A20] border border-white/10 hover:border-[#E32636]/40 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#E32636]/10 flex items-center justify-center text-[#E32636] mb-3">
                    <Car className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Used Car Sales</h4>
                  <p className="text-xs text-[#B8BEC7] mt-1">
                    Inspected pre-owned vehicle options with open dialogue and transparent condition.
                  </p>
                </div>
              </div>

              {/* Direct Contact Button */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#E32636] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
                >
                  <span>Visit Our Croydon Workshop</span>
                </a>
                <span className="text-xs text-[#B8BEC7]">
                  Flat 9 Solar Court, 119 Sydenham Road, Croydon CRO 2EZ
                </span>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

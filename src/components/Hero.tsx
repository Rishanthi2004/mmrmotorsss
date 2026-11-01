import React, { useState, useEffect, useRef } from 'react';
import { Phone, ShieldCheck, Sparkles, ChevronRight, Eye } from 'lucide-react';
import { COMPANY } from '../data/companyData';

interface HeroProps {
  onOpenEnquiry?: () => void;
  externalTrigger?: number;
}

interface TouchRipple {
  id: number;
  x: number;
  y: number;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry, externalTrigger }) => {
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [ripples, setRipples] = useState<TouchRipple[]>([]);
  const [isLaserActive, setIsLaserActive] = useState(false);
  const [isGridFlashing, setIsGridFlashing] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Cinematic trigger on component mount
    const timer = setTimeout(() => {
      setRevealed(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  // Trigger background animation on demand (e.g. when user clicks "Home" in navbar or touches background)
  const triggerBackgroundAnimation = (xPercent = 50, yPercent = 50) => {
    const newRipple: TouchRipple = {
      id: Date.now() + Math.random(),
      x: xPercent,
      y: yPercent,
    };

    setRipples((prev) => [...prev.slice(-3), newRipple]);
    setIsLaserActive(true);
    setIsGridFlashing(true);

    setTimeout(() => {
      setIsLaserActive(false);
    }, 1200);

    setTimeout(() => {
      setIsGridFlashing(false);
    }, 1400);

    // Clean up ripple
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1500);
  };

  // Watch for external trigger from navigation bar
  useEffect(() => {
    if (externalTrigger && externalTrigger > 0) {
      triggerBackgroundAnimation(50, 48);
    }
  }, [externalTrigger]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

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

    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const xPercent = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
      const yPercent = Math.max(5, Math.min(95, ((clientY - rect.top) / rect.height) * 100));
      triggerBackgroundAnimation(xPercent, yPercent);
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onClick={handleTouchOrClick}
      onTouchStart={handleTouchOrClick}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0D10] pt-24 pb-16 cursor-default"
    >
      {/* Background Cinematic Image Layer with Smooth Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/src/assets/images/hero_automotive_dark_1793513340709.jpg"
          alt="MMR Motors precision automotive workshop with performance sports vehicle"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center transition-all duration-1000 ease-out transform ${
            revealed ? 'scale-100 opacity-80 filter brightness-95' : 'scale-110 opacity-30 filter brightness-50'
          }`}
          style={{
            transform: revealed 
              ? `scale(1.02) translate(${(mousePos.x - 50) * -0.015}%, ${(mousePos.y - 50) * -0.015}%)` 
              : 'scale(1.1)'
          }}
        />

        {/* Ambient Vignette & Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/60 to-[#0B0D10]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D10] via-transparent to-[#0B0D10]/90" />

        {/* Dynamic Interactive Red Touch Shockwaves */}
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            className="absolute rounded-full border border-[#E32636] bg-[#E32636]/20 shadow-[0_0_50px_rgba(227,38,54,0.8)] animate-bg-shockwave pointer-events-none"
            style={{
              left: `${ripple.x}%`,
              top: `${ripple.y}%`,
              width: '320px',
              height: '320px',
            }}
          />
        ))}

        {/* Laser Sweep Beam Across Background */}
        {isLaserActive && (
          <div className="absolute top-0 bottom-0 left-0 right-0 overflow-hidden pointer-events-none z-10">
            <div className="w-1.5 h-full bg-gradient-to-b from-transparent via-[#E32636] to-transparent shadow-[0_0_35px_#E32636] animate-laser-sweep" />
          </div>
        )}

        {/* Red Neon Backlight Sweep */}
        <div 
          className="absolute inset-0 opacity-40 mix-blend-screen transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(227, 38, 54, 0.25) 0%, transparent 60%)`
          }}
        />

        {/* Dynamic Interactive Dual Headlight Beams */}
        {headlightsOn && (
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-500">
            {/* Primary Left/Center Headlight Flare */}
            <div 
              className={`absolute top-[48%] left-[45%] w-32 h-20 bg-white/70 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                isLaserActive ? 'scale-150 bg-white shadow-[0_0_60px_rgba(255,255,255,0.9)]' : 'animate-pulse-slow'
              }`}
            />
            {/* Wide Forward Atmospheric Light Cone */}
            <div 
              className={`absolute top-[50%] left-[20%] w-[55vw] h-[35vh] bg-gradient-to-r from-white/30 via-white/10 to-transparent blur-2xl transform -rotate-6 pointer-events-none transition-opacity duration-300 ${
                isLaserActive ? 'opacity-100' : 'opacity-80'
              }`}
            />
            {/* Red Tail Glow Rim */}
            <div 
              className={`absolute top-[49%] right-[28%] w-24 h-16 bg-[#E32636]/60 rounded-full blur-xl transition-all duration-300 ${
                isLaserActive ? 'scale-125 bg-[#E32636]' : 'animate-pulse'
              }`}
            />
          </div>
        )}

        {/* Grid Overlay with Interactive Flash on Touch */}
        <div 
          className={`absolute inset-0 workshop-grid pointer-events-none transition-opacity duration-700 ${
            isGridFlashing ? 'opacity-60 animate-grid-flash' : 'opacity-30'
          }`} 
        />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center min-h-[calc(100vh-8rem)]">
        <div className="max-w-3xl">
          {/* Top Location Trust Marker (Hero context) */}
          <div 
            className={`inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#B8BEC7] mb-4 transition-all duration-700 ${
              revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="w-2 h-[2px] bg-[#E32636]" />
            <span className="text-white">CROYDON, UNITED KINGDOM</span>
            <span className="text-white/40">·</span>
            <span className="text-[#B8BEC7]">AUTOMOTIVE SPECIALISTS</span>
          </div>

          {/* Staggered Main Headline */}
          <h1 
            className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.08] transition-all duration-700 delay-100 ${
              revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ textWrap: 'balance' }}
          >
            PRECISION IN <br />
            <span className="text-silver-shimmer">EVERY DETAIL.</span>
          </h1>

          {/* Supporting Text */}
          <p 
            className={`mt-6 text-base sm:text-lg lg:text-xl text-[#B8BEC7] leading-relaxed max-w-2xl transition-all duration-700 delay-200 ${
              revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            Your trusted destination for vehicle maintenance, professional repair services, and used car sales.
          </p>

          {/* Action Buttons Row */}
          <div 
            className={`mt-8 sm:mt-10 flex flex-wrap items-center gap-4 transition-all duration-700 delay-300 ${
              revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Primary Button */}
            <button
              onClick={scrollToServices}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#E32636] hover:bg-[#c41e2d] rounded-lg shadow-[0_0_25px_rgba(227,38,54,0.4)] hover:shadow-[0_0_35px_rgba(227,38,54,0.7)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-red-400/30 whitespace-nowrap"
            >
              <span>EXPLORE OUR SERVICES</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Secondary Button */}
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#171A20]/90 hover:bg-[#171A20] rounded-lg border border-white/20 hover:border-white/40 shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-[#E32636]" />
              <span>CALL US NOW</span>
            </a>

            {/* Headlights Interactive Toggle Pill */}
            <button
              type="button"
              onClick={() => setHeadlightsOn(!headlightsOn)}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#B8BEC7] hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors"
              title="Toggle cinematic beam lights"
            >
              <Eye className="w-3.5 h-3.5 text-[#E32636]" />
              <span>{headlightsOn ? 'Headlights: ON' : 'Headlights: OFF'}</span>
            </button>
          </div>

          {/* Value Props Quick Strip */}
          <div 
            className={`mt-12 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#B8BEC7] transition-all duration-700 delay-400 ${
              revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E32636]" />
              <span className="text-white font-medium">Routine Maintenance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E32636]" />
              <span className="text-white font-medium">Professional Repairs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E32636]" />
              <span className="text-white font-medium">Quality Used Vehicles</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

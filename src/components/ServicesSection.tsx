import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Wrench, Settings, Car, Check, Phone } from 'lucide-react';
import { SERVICES, COMPANY, ServiceItem } from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
  externalTrigger?: number;
}

interface TouchRipple {
  id: number;
  x: number;
  y: number;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, externalTrigger }) => {
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
      triggerBackgroundAnimation(50, 35);
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

  return (
    <section 
      id="services" 
      ref={sectionRef}
      onClick={handleTouchOrClick}
      onTouchStart={handleTouchOrClick}
      className="relative py-28 bg-[#171A20] border-t border-white/5 overflow-hidden cursor-default"
    >
      {/* Background accents & touch animation */}
      <div className="absolute inset-0 workshop-grid opacity-15 pointer-events-none" />
      
      {/* Dynamic Touch Shockwaves */}
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

      {/* Laser Sweep Beam Across Background */}
      {isLaserSweeping && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="w-1.5 h-full bg-gradient-to-b from-transparent via-[#E32636] to-transparent shadow-[0_0_35px_#E32636] animate-laser-sweep" />
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/80 to-transparent shadow-[0_0_20px_white] animate-laser-sweep-y" />
        </div>
      )}

      {/* Dynamic Radial Glow */}
      <div 
        className={`absolute top-1/3 left-0 w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-700 ${
          isPulseActive 
            ? 'bg-[radial-gradient(circle_at_center,rgba(227,38,54,0.25)_0%,transparent_70%)] animate-energy-pulse' 
            : 'bg-[#E32636]/10 blur-3xl'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 stagger-header">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#E32636] uppercase mb-3">
              <span className="w-5 h-[2px] bg-[#E32636]" />
              <span>OUR CORE CAPABILITIES</span>
              <span className="w-5 h-[2px] bg-[#E32636]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              BUILT AROUND <span className="text-silver-shimmer">YOUR VEHICLE.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#B8BEC7]">
              Dedicated automotive solutions delivered with technical integrity, modern diagnostics, and customer transparency.
            </p>
          </div>

          {/* 3 Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-cards">
            {SERVICES.map((service, index) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                index={index} 
                onSelectService={onSelectService}
              />
            ))}
          </div>

          {/* Quick Consultation Banner */}
          <div className="mt-16 p-6 rounded-2xl bg-[#0B0D10] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 stagger-footer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#E32636]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Uncertain which service your vehicle requires?</h4>
                <p className="text-xs text-[#B8BEC7] mt-0.5">
                  Speak directly with our Croydon workshop team for practical guidance on your vehicle’s condition.
                </p>
              </div>
            </div>

            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#E32636] hover:bg-[#c41e2d] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-[#E32636]/20 transition-all whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call 07735 508394</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

interface ServiceCardComponentProps {
  service: ServiceItem;
  index: number;
  onSelectService?: (serviceName: string) => void;
}

const ServiceCard: React.FC<ServiceCardComponentProps> = ({ service, index, onSelectService }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Subtle 3D tilt calculation on desktop mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Keep tilt modest (max 5-6 deg) for elegant automotive feel
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Card specific icon
  const renderIcon = () => {
    if (service.id === 'maintenance') {
      return <Wrench className="w-5 h-5 text-white" />;
    }
    if (service.id === 'repair') {
      return (
        <Settings 
          className={`w-5 h-5 text-white transition-transform duration-700 ${
            isHovered ? 'rotate-90 text-[#E32636]' : ''
          }`} 
        />
      );
    }
    return <Car className="w-5 h-5 text-white" />;
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className={`group relative rounded-2xl bg-[#0B0D10] border transition-all duration-300 flex flex-col overflow-hidden ${
        service.id === 'sales' && isHovered 
          ? 'border-[#E32636] shadow-[0_15px_30px_rgba(227,38,54,0.25)] -translate-y-2' 
          : isHovered 
          ? 'border-white/20 shadow-xl' 
          : 'border-white/10'
      }`}
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
        <img
          src={service.image}
          alt={service.title}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-black/40 to-transparent" />

        {/* Number Badge */}
        <div className="absolute top-4 left-4 px-2.5 py-1 bg-[#0B0D10]/80 backdrop-blur-md rounded border border-white/15 text-xs font-mono font-bold text-white">
          {service.number}
        </div>

        {/* Icon Floating Badge */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-[#171A20]/80 backdrop-blur-md border border-white/20 flex items-center justify-center">
          {renderIcon()}
        </div>

        {/* Red accent line that moves across bottom of card image */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 overflow-hidden">
          <div 
            className={`h-full bg-[#E32636] transition-all duration-500 ease-out ${
              isHovered ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-mono tracking-wider text-[#E32636] uppercase font-semibold">
            {service.headline}
          </span>
          <h3 className="text-xl font-bold text-white uppercase tracking-tight mt-1">
            {service.title}
          </h3>
          <p className="mt-3 text-sm text-[#B8BEC7] leading-relaxed">
            {service.description}
          </p>

          {/* Feature Points */}
          <ul className="mt-6 space-y-2 text-xs text-[#B8BEC7]">
            {service.features.map((feat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#E32636] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Card Action Button */}
        <div className="mt-8 pt-5 border-t border-white/10">
          <button
            type="button"
            onClick={() => {
              if (onSelectService) {
                onSelectService(service.title);
              } else {
                const target = document.getElementById('contact');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full inline-flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-[#E32636] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 group-hover:bg-[#E32636]"
          >
            <span>{service.actionLabel}</span>
            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
              isHovered ? 'translate-x-1' : ''
            }`} />
          </button>
        </div>
      </div>
    </div>
  );
};

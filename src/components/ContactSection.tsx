import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, ExternalLink, Copy, Check, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { COMPANY } from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';

interface ContactSectionProps {
  externalTrigger?: number;
}

interface TouchRipple {
  id: number;
  x: number;
  y: number;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ externalTrigger }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [inquiryType, setInquiryType] = useState('Routine Vehicle Maintenance');
  const [inquiryNote, setInquiryNote] = useState('');
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
    if (target.closest('button') || target.closest('a') || target.closest('input') || target.closest('select') || target.closest('textarea')) {
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

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const mailSubject = encodeURIComponent(`Enquiry: ${inquiryType} - MMR MOTORS LTD`);
  const mailBody = encodeURIComponent(
    `Hello MMR MOTORS LTD Team,\n\n` +
    `I would like to enquire about: ${inquiryType}\n` +
    (inquiryNote ? `Notes: ${inquiryNote}\n` : '') +
    `\nPlease contact me at your earliest convenience.\n\nThank you.`
  );
  const directMailto = `mailto:${COMPANY.email}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      onClick={handleTouchOrClick}
      onTouchStart={handleTouchOrClick}
      className="relative py-28 bg-[#0B0D10] border-t border-white/5 overflow-hidden cursor-default"
    >
      {/* Background Cinematic Lighting & Touch Ripples */}
      <div className="absolute inset-0 workshop-grid opacity-15 pointer-events-none" />

      {/* Touch-Triggered Crimson Radar Ripples */}
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

      {/* Laser Light Sweep Across Contact Background */}
      {isLaserSweeping && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="w-1.5 h-full bg-gradient-to-b from-transparent via-[#E32636] to-transparent shadow-[0_0_35px_#E32636] animate-laser-sweep" />
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/80 to-transparent shadow-[0_0_20px_white] animate-laser-sweep-y" />
        </div>
      )}

      {/* Radial Location Atmosphere Glow */}
      <div 
        className={`absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none transition-all duration-700 ${
          isPulseActive 
            ? 'bg-[radial-gradient(circle_at_center,rgba(227,38,54,0.25)_0%,transparent_70%)] animate-energy-pulse' 
            : 'bg-[radial-gradient(circle_at_center,rgba(227,38,54,0.1)_0%,transparent_70%)]'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 stagger-header">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#E32636] uppercase mb-3">
              <span className="w-5 h-[2px] bg-[#E32636]" />
              <span>COMMUNICATION & DIRECTIONS</span>
              <span className="w-5 h-[2px] bg-[#E32636]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              LET'S GET YOU <span className="text-silver-shimmer">BACK ON THE ROAD.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#B8BEC7]">
              Connect directly with MMR MOTORS LTD in Croydon. We welcome calls, emails, and pre-booked visits for maintenance, repair assessments, and used vehicle enquiries.
            </p>
          </div>

          {/* Contact Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch stagger-body">
          
          {/* Left Column: Essential Contact Cards & Action Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Direct Action Hub */}
            <div className="rounded-2xl p-6 sm:p-8 bg-[#171A20] border border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#E32636]" />
              
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                MMR MOTORS LTD
              </h3>
              <p className="text-xs text-[#B8BEC7] mt-1">
                Vehicle Maintenance · Repair Services · Used Car Sales
              </p>

              {/* Three Mandatory Primary Buttons */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* CALL US */}
                <a
                  href={`tel:${COMPANY.phoneTel}`}
                  className="inline-flex flex-col items-center justify-center p-4 bg-[#E32636] hover:bg-[#c41e2d] text-white rounded-xl shadow-lg shadow-[#E32636]/25 transition-all transform hover:-translate-y-1 active:translate-y-0 group"
                >
                  <Phone className="w-5 h-5 mb-1.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-extrabold uppercase tracking-wider">CALL US</span>
                  <span className="text-[10px] text-white/80 font-mono mt-0.5">{COMPANY.phone}</span>
                </a>

                {/* EMAIL US */}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="inline-flex flex-col items-center justify-center p-4 bg-[#0B0D10] hover:bg-white/5 border border-white/20 hover:border-white/40 text-white rounded-xl transition-all transform hover:-translate-y-1 active:translate-y-0 group"
                >
                  <Mail className="w-5 h-5 text-[#E32636] mb-1.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-extrabold uppercase tracking-wider">EMAIL US</span>
                  <span className="text-[10px] text-[#B8BEC7] mt-0.5 truncate max-w-full">Direct Inbox</span>
                </a>

                {/* GET DIRECTIONS */}
                <a
                  href={COMPANY.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-col items-center justify-center p-4 bg-[#0B0D10] hover:bg-white/5 border border-white/20 hover:border-white/40 text-white rounded-xl transition-all transform hover:-translate-y-1 active:translate-y-0 group"
                >
                  <ExternalLink className="w-5 h-5 text-[#E32636] mb-1.5 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-extrabold uppercase tracking-wider">DIRECTIONS</span>
                  <span className="text-[10px] text-[#B8BEC7] mt-0.5">Google Maps</span>
                </a>
              </div>

              {/* Verified Contact Details List with Copy Options */}
              <div className="mt-8 space-y-4 pt-6 border-t border-white/10 text-sm">
                {/* Phone */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B0D10] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E32636]/10 flex items-center justify-center text-[#E32636]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-[#B8BEC7]">Direct Line</div>
                      <a href={`tel:${COMPANY.phoneTel}`} className="text-white font-bold hover:text-[#E32636] transition-colors">
                        {COMPANY.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(COMPANY.phone, 'phone')}
                    className="p-2 text-[#B8BEC7] hover:text-white rounded hover:bg-white/5 transition-colors"
                    title="Copy phone number"
                  >
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Email */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B0D10] border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E32636]/10 flex items-center justify-center text-[#E32636]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-[#B8BEC7]">Official Email</div>
                      <a href={`mailto:${COMPANY.email}`} className="text-white font-bold hover:text-[#E32636] transition-colors break-all">
                        {COMPANY.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(COMPANY.email, 'email')}
                    className="p-2 text-[#B8BEC7] hover:text-white rounded hover:bg-white/5 transition-colors"
                    title="Copy email address"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Address */}
                <div className="flex items-start justify-between p-3 rounded-lg bg-[#0B0D10] border border-white/5">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#E32636]/10 flex items-center justify-center text-[#E32636] shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono uppercase text-[#B8BEC7]">Business Address</div>
                      <div className="text-white font-medium leading-relaxed mt-0.5">
                        {COMPANY.addressLine1},<br />
                        {COMPANY.addressLine2},<br />
                        {COMPANY.postcode}, {COMPANY.country}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(COMPANY.fullAddress, 'address')}
                    className="p-2 text-[#B8BEC7] hover:text-white rounded hover:bg-white/5 transition-colors shrink-0"
                    title="Copy address"
                  >
                    {copiedField === 'address' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Working Hours Guidance */}
              <div className="mt-6 flex items-center gap-3 text-xs text-[#B8BEC7] pt-4 border-t border-white/5">
                <Clock className="w-4 h-4 text-[#E32636] shrink-0" />
                <span>Monday – Saturday: 08:30 – 18:00 · Sunday by prior appointment</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Location Map & Quick Direct Email Dispatcher */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Interactive Dark Map Preview Container */}
            <div className="rounded-2xl p-6 bg-[#171A20] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {/* Animated Location Pin */}
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-[#E32636] opacity-75" />
                    <MapPin className="relative w-5 h-5 text-[#E32636]" />
                  </div>
                  <span className="text-sm font-bold text-white uppercase tracking-wider">Croydon Location</span>
                </div>
                <a
                  href={COMPANY.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#B8BEC7] hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Open Full Map</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#E32636]" />
                </a>
              </div>

              {/* Stylized Automotive Map Graphic with Pin */}
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-[#0B0D10] border border-white/10">
                {/* Stylized road grid lines */}
                <svg className="w-full h-full opacity-40" viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 120 H600" stroke="#2B313C" strokeWidth="4" />
                  <path d="M0 240 H600" stroke="#2B313C" strokeWidth="3" />
                  <path d="M180 0 V340" stroke="#2B313C" strokeWidth="4" />
                  <path d="M420 0 V340" stroke="#2B313C" strokeWidth="4" />
                  <path d="M0 40 L600 300" stroke="#1F242C" strokeWidth="6" />
                  <path d="M60 0 L540 340" stroke="#3A4350" strokeWidth="3" strokeDasharray="6 6" />
                  <text x="190" y="110" fill="#7E8795" fontSize="12" fontFamily="monospace">A212 SYDENHAM ROAD</text>
                  <text x="30" y="230" fill="#7E8795" fontSize="10" fontFamily="monospace">SOLAR COURT APPROACH</text>
                </svg>

                {/* Animated Pulsing Location Pin Target */}
                <div className="absolute top-[48%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute h-8 w-8 rounded-full bg-[#E32636] opacity-50" />
                    <div className="w-8 h-8 rounded-full bg-[#E32636] text-white flex items-center justify-center shadow-lg shadow-[#E32636]/60 border-2 border-white">
                      <MapPin className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-2 px-2.5 py-1 bg-[#171A20]/95 backdrop-blur-md rounded border border-white/20 text-[11px] font-mono font-bold text-white whitespace-nowrap shadow-xl">
                    MMR MOTORS LTD · FLAT 9 SOLAR COURT
                  </div>
                </div>

                {/* Bottom Map Overlay Bar */}
                <a
                  href={COMPANY.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 left-3 right-3 p-2.5 bg-[#0B0D10]/90 backdrop-blur-md rounded-lg border border-white/15 text-xs text-center text-white font-semibold hover:border-[#E32636] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Get Navigation Directions in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#E32636]" />
                </a>
              </div>
            </div>

            {/* Direct Email Dispatcher (Pre-fills user mail client — no fake unconfigured forms!) */}
            <div className="rounded-2xl p-6 bg-[#171A20] border border-white/10 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-[#E32636]" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Quick Email Dispatcher
                </h4>
              </div>
              <p className="text-xs text-[#B8BEC7]">
                Select your service interest and instantly open a pre-formatted draft in your email application.
              </p>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#B8BEC7] uppercase mb-1">
                    Subject Topic
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-3 py-2 bg-[#0B0D10] border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#E32636]"
                  >
                    <option value="Routine Vehicle Maintenance">Routine Vehicle Maintenance</option>
                    <option value="Vehicle Repair Diagnostic Assessment">Vehicle Repair Diagnostic Assessment</option>
                    <option value="Used Car Sales Enquiry">Used Car Sales Enquiry</option>
                    <option value="General Automotive Consultation">General Automotive Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#B8BEC7] uppercase mb-1">
                    Brief Notes / Vehicle Registration (Optional)
                  </label>
                  <input
                    type="text"
                    value={inquiryNote}
                    onChange={(e) => setInquiryNote(e.target.value)}
                    placeholder="e.g. 2018 Saloon, brake warning light illuminated"
                    className="w-full px-3 py-2 bg-[#0B0D10] border border-white/10 rounded-lg text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#E32636]"
                  />
                </div>

                <a
                  href={directMailto}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#E32636] hover:bg-[#c41e2d] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all mt-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email to {COMPANY.email}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

        </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

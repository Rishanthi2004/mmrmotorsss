import React, { useEffect, useState } from 'react';
import { COMPANY } from '../data/companyData';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'dark' | 'sweep' | 'silhouette' | 'ignition' | 'fadeout'>('dark');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('sweep'), 300);
    const t2 = setTimeout(() => setPhase('silhouette'), 900);
    const t3 = setTimeout(() => setPhase('ignition'), 1600);
    const t4 = setTimeout(() => setPhase('fadeout'), 2600);
    const t5 = setTimeout(() => onComplete(), 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0D10] text-white transition-opacity duration-700 ${
        phase === 'fadeout' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,38,54,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Red Laser Sweep Line */}
      <div 
        className={`absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E32636] to-transparent shadow-[0_0_20px_#E32636] transition-all duration-1000 ease-out transform -translate-y-1/2 ${
          phase === 'sweep' || phase === 'silhouette' || phase === 'ignition' 
            ? 'scale-x-100 opacity-80' 
            : 'scale-x-0 opacity-0'
        }`}
      />

      {/* Center Cinematic Car Silhouette with Headlights Ignition */}
      <div className="relative z-10 flex flex-col items-center px-4 max-w-xl text-center">
        {/* Silhouette Vector Car Outline */}
        <div className="relative w-72 sm:w-96 h-28 mb-6 flex items-center justify-center">
          <svg
            viewBox="0 0 400 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-full h-full transition-all duration-1000 transform ${
              phase === 'dark' 
                ? 'opacity-0 scale-95' 
                : phase === 'sweep'
                ? 'opacity-30 scale-98'
                : 'opacity-90 scale-100'
            }`}
          >
            {/* Aerodynamic sports coupe silhouette */}
            <path
              d="M30 95 C 45 95, 75 92, 100 88 C 130 83, 165 52, 215 48 C 270 44, 305 60, 340 75 C 365 85, 385 88, 395 90 C 375 96, 340 98, 310 98 C 295 85, 275 85, 260 98 C 170 98, 140 98, 120 98 C 105 85, 85 85, 70 98 C 50 98, 35 97, 30 95 Z"
              stroke="#4A5260"
              strokeWidth="2"
              fill="rgba(23, 26, 32, 0.4)"
            />
            {/* Roof & window line */}
            <path
              d="M140 68 C 175 52, 220 50, 265 60 C 290 66, 310 75, 315 76"
              stroke="#7E8795"
              strokeWidth="1.5"
            />
            {/* Wheels */}
            <circle cx="95" cy="95" r="18" stroke="#E32636" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
            <circle cx="285" cy="95" r="18" stroke="#E32636" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
          </svg>

          {/* Dual Headlights Ignition Beams */}
          <div
            className={`absolute top-[68px] right-[4px] flex items-center transition-all duration-700 ${
              phase === 'ignition' || phase === 'fadeout' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
            {/* Right Headlight Cluster */}
            <div className="w-4 h-2 bg-white rounded-full shadow-[0_0_35px_15px_rgba(255,255,255,0.9),0_0_60px_25px_rgba(227,38,54,0.7)] animate-pulse" />
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-48 h-16 bg-gradient-to-r from-white/80 via-white/20 to-transparent blur-md rounded-r-full transform rotate-3 pointer-events-none" />
          </div>

          <div
            className={`absolute top-[70px] right-[38px] flex items-center transition-all duration-700 ${
              phase === 'ignition' || phase === 'fadeout' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
          >
            {/* Left Headlight Cluster */}
            <div className="w-3.5 h-1.5 bg-white rounded-full shadow-[0_0_25px_10px_rgba(255,255,255,0.8),0_0_45px_18px_rgba(227,38,54,0.6)]" />
          </div>
        </div>

        {/* Brand Name Typography */}
        <div className="overflow-hidden">
          <h1 
            className={`text-2xl sm:text-3xl font-black tracking-[0.25em] text-white transition-all duration-700 ${
              phase === 'dark' ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            MMR MOTORS <span className="text-[#E32636]">LTD</span>
          </h1>
        </div>

        {/* Tagline */}
        <p 
          className={`text-xs uppercase tracking-[0.3em] text-[#B8BEC7] mt-2 transition-all duration-700 delay-150 ${
            phase === 'silhouette' || phase === 'ignition' || phase === 'fadeout' 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-2'
          }`}
        >
          Croydon · London · United Kingdom
        </p>

        {/* Loading Progress Bar */}
        <div className="w-44 h-[2px] bg-white/10 rounded-full mt-6 overflow-hidden">
          <div 
            className="h-full bg-[#E32636] transition-all duration-1000 ease-out"
            style={{ 
              width: phase === 'dark' ? '15%' : phase === 'sweep' ? '45%' : phase === 'silhouette' ? '75%' : '100%' 
            }}
          />
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute bottom-6 right-6 px-3 py-1.5 text-xs text-[#B8BEC7] hover:text-white border border-white/10 hover:border-white/30 rounded transition-colors"
      >
        Skip Intro
      </button>
    </div>
  );
};

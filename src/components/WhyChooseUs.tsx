import React, { useState } from 'react';
import { Wrench, FileSearch, UserCheck, ArrowUpRight } from 'lucide-react';
import { COMPANY } from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';

interface WhyChooseUsProps {
  onOpenEnquiry?: (serviceName?: string) => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenEnquiry }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const highlights = [
    {
      id: 'maintenance',
      number: '01',
      title: 'Vehicle Maintenance',
      subtitle: 'Engineered Longevity',
      description: 'Systematic preventative care designed to keep engines, running gear, and electronics functioning at peak reliability for years to come.',
      icon: Wrench,
      action: 'Maintenance Inquiries'
    },
    {
      id: 'repair',
      number: '02',
      title: 'Repair Service Enquiries',
      subtitle: 'Objective Fault Resolution',
      description: 'Clear diagnostic analysis of emerging mechanical or electrical faults, providing honest assessments and sensible repair pathways.',
      icon: FileSearch,
      action: 'Repair Assessments'
    },
    {
      id: 'contact',
      number: '03',
      title: 'Direct Customer Contact',
      subtitle: 'Croydon Workshop Direct',
      description: 'Deal directly with knowledgeable automotive specialists without gatekeepers, call centres, or sales pressure. Honest advice for your journey.',
      icon: UserCheck,
      action: 'Direct Communication'
    }
  ];

  return (
    <section className="relative py-28 bg-[#171A20] border-t border-white/5 overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#E32636]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-20 stagger-header">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#E32636] uppercase mb-3">
              <span className="w-5 h-[2px] bg-[#E32636]" />
              <span>THE MMR APPROACH</span>
              <span className="w-5 h-[2px] bg-[#E32636]" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              YOUR VEHICLE. <span className="text-silver-shimmer">OUR PRIORITY.</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#B8BEC7]">
              Built on foundational principles of craftsmanship, clear customer communication, and practical automotive value.
            </p>
          </div>

          {/* 3 Visual Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-cards">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative rounded-2xl p-8 bg-[#0B0D10] border transition-all duration-300 flex flex-col justify-between group ${
                  isHovered 
                    ? 'border-[#E32636] shadow-[0_15px_30px_rgba(227,38,54,0.15)] -translate-y-1.5' 
                    : 'border-white/10'
                }`}
              >
                {/* Red Animated Accent Line at Top of Card */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden rounded-t-2xl">
                  <div
                    className={`h-full bg-[#E32636] transition-all duration-500 ease-out ${
                      isHovered ? 'w-full' : 'w-12'
                    }`}
                  />
                </div>

                <div>
                  {/* Card Header with Number and Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-3xl font-mono font-extrabold text-white/20 group-hover:text-[#E32636] transition-colors">
                      {item.number}
                    </span>
                    <div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isHovered 
                          ? 'bg-[#E32636] text-white shadow-lg shadow-[#E32636]/30 rotate-3' 
                          : 'bg-white/5 text-[#B8BEC7] border border-white/10'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Subtitle & Title */}
                  <div className="text-xs font-mono text-[#E32636] uppercase tracking-wider font-semibold">
                    {item.subtitle}
                  </div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight mt-1">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-sm text-[#B8BEC7] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Trigger */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white">
                  <span className="group-hover:text-[#E32636] transition-colors">
                    {item.action}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#E32636] flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Local Workshop Location Bar */}
        <div className="mt-16 text-center stagger-footer">
          <p className="text-xs text-[#B8BEC7]">
            Operating from Flat 9 Solar Court, 119 Sydenham Road, Croydon, CRO 2EZ, United Kingdom.
          </p>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

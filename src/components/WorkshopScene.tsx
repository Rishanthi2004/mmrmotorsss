import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Cpu, 
  Activity, 
  Layers, 
  CheckCircle2, 
  Sliders, 
  Zap, 
  Play, 
  Pause,
  RotateCcw,
  Gauge
} from 'lucide-react';
import { WORKSHOP_CHECKPOINTS, COMPANY } from '../data/companyData';
import { ScrollReveal } from './ScrollReveal';

interface WorkshopSceneProps {
  onOpenEnquiry?: () => void;
}

export const WorkshopScene: React.FC<WorkshopSceneProps> = ({ onOpenEnquiry }) => {
  const [activeCheckpointIndex, setActiveCheckpointIndex] = useState(0);
  const [liftStage, setLiftStage] = useState<'nominal' | 'elevated' | 'maximum'>('elevated');
  const [lightsActive, setLightsActive] = useState(true);
  const [isScanning, setIsScanning] = useState(true);
  const [scanPosition, setScanPosition] = useState(15);

  const activeCheckpoint = WORKSHOP_CHECKPOINTS[activeCheckpointIndex];

  // Auto-progress scanline & checkpoint indicator
  useEffect(() => {
    if (!isScanning) return;
    const interval = setInterval(() => {
      setScanPosition((prev) => (prev >= 85 ? 15 : prev + 1));
    }, 40);
    return () => clearInterval(interval);
  }, [isScanning]);

  return (
    <section 
      id="servicing-scene" 
      className="relative py-24 bg-[#0B0D10] border-t border-white/5 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 workshop-grid opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E32636]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 stagger-header">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#171A20] border border-white/10 rounded-full text-xs font-semibold tracking-wider text-[#E32636] uppercase mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive Servicing Environment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            CARE THAT KEEPS <span className="text-silver-shimmer">YOU MOVING.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#B8BEC7]">
            Inside our Croydon servicing bay: precision diagnostics, thorough mechanical evaluation, and meticulous technician care.
          </p>
        </div>

        {/* The Servicing Bay Stage */}
        <div className="relative rounded-2xl overflow-hidden bg-[#171A20] border border-white/10 shadow-2xl stagger-body">
          {/* Top Sequential Workshop Lights Bar */}
          <div className="bg-[#0B0D10]/90 px-6 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#B8BEC7] tracking-wider uppercase">Overhead Bay Illumination:</span>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((light) => (
                  <div
                    key={light}
                    className={`h-2 w-8 sm:w-12 rounded-sm transition-all duration-500 ${
                      lightsActive 
                        ? 'bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]' 
                        : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Quick interactive controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLightsActive(!lightsActive)}
                className="px-2.5 py-1 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[#B8BEC7] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Zap className={`w-3 h-3 ${lightsActive ? 'text-amber-300' : 'text-gray-500'}`} />
                <span>{lightsActive ? 'Lights: 100%' : 'Lights: Standby'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsScanning(!isScanning)}
                className="px-2.5 py-1 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[#B8BEC7] hover:text-white transition-colors flex items-center gap-1.5"
              >
                {isScanning ? <Pause className="w-3 h-3 text-[#E32636]" /> : <Play className="w-3 h-3 text-emerald-400" />}
                <span>{isScanning ? 'Scanner: Active' : 'Scanner: Paused'}</span>
              </button>
            </div>
          </div>

          {/* Visual Canvas Container */}
          <div className="relative aspect-[16/9] min-h-[380px] max-h-[600px] w-full overflow-hidden bg-black">
            {/* Workshop image with realistic technician & vehicle on hydraulic lift */}
            <img
              src="/src/assets/images/workshop_servicing_bay_1793513341079.jpg"
              alt="Automotive technician conducting diagnostic inspection in modern Croydon workshop bay"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-all duration-700 ${
                lightsActive ? 'filter brightness-100 contrast-105' : 'filter brightness-40 contrast-125'
              } ${
                liftStage === 'maximum' ? 'scale-105 -translate-y-2' : liftStage === 'nominal' ? 'scale-100 translate-y-2' : 'scale-[1.02]'
              }`}
            />

            {/* Red Laser Diagnostics Scanline */}
            {isScanning && (
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#E32636] via-white to-[#E32636] shadow-[0_0_15px_#E32636] pointer-events-none transition-all duration-75"
                style={{ left: `${scanPosition}%` }}
              >
                <div className="absolute top-1/4 -left-12 px-2 py-0.5 bg-[#E32636] text-[10px] font-mono text-white rounded font-bold uppercase tracking-wider">
                  SCAN {Math.round(scanPosition * 10)}Hz
                </div>
              </div>
            )}

            {/* Diagnostic Interactive Pins on the Bay */}
            <div className="absolute inset-0 p-6 pointer-events-none flex flex-col justify-between">
              {/* Top HUD Readout */}
              <div className="flex items-start justify-between">
                <div className="bg-[#0B0D10]/85 backdrop-blur-md border border-white/15 px-3 py-2 rounded-lg pointer-events-auto">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-white tracking-wider">MMR DIAGNOSTIC HUD v26</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#B8BEC7] mt-0.5">
                    BAY 01 · SYDENHAM RD WORKSHOP
                  </div>
                </div>

                <div className="bg-[#0B0D10]/85 backdrop-blur-md border border-white/15 px-3 py-2 rounded-lg pointer-events-auto flex items-center gap-3">
                  <span className="text-xs text-[#B8BEC7] font-medium">Scissor Lift Position:</span>
                  <div className="flex items-center gap-1">
                    {(['nominal', 'elevated', 'maximum'] as const).map((stage) => (
                      <button
                        key={stage}
                        type="button"
                        onClick={() => setLiftStage(stage)}
                        className={`px-2 py-0.5 text-[10px] font-semibold uppercase rounded transition-colors ${
                          liftStage === stage ? 'bg-[#E32636] text-white' : 'bg-white/10 text-[#B8BEC7] hover:text-white'
                        }`}
                      >
                        {stage}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Focal Card */}
              <div className="bg-[#0B0D10]/90 backdrop-blur-md border border-white/15 p-4 rounded-xl max-w-md pointer-events-auto shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#E32636] tracking-wider uppercase font-semibold">
                    {activeCheckpoint.code}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-emerald-400">
                    {activeCheckpoint.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white mt-1">
                  {activeCheckpoint.title}
                </h4>
                <p className="text-xs text-[#B8BEC7] mt-1 leading-relaxed">
                  {activeCheckpoint.summary}
                </p>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10">
                  {activeCheckpoint.metrics.map((metric, i) => (
                    <div key={i} className="text-left">
                      <div className="text-[10px] text-[#B8BEC7]">{metric.label}</div>
                      <div className="text-xs font-mono font-bold text-white mt-0.5">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Checkpoint Tabs Bar */}
          <div className="bg-[#171A20] p-4 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {WORKSHOP_CHECKPOINTS.map((checkpoint, idx) => {
                const isActive = activeCheckpointIndex === idx;
                return (
                  <button
                    key={checkpoint.id}
                    onClick={() => setActiveCheckpointIndex(idx)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isActive 
                        ? 'bg-[#0B0D10] border-[#E32636] shadow-[0_0_15px_rgba(227,38,54,0.2)]' 
                        : 'bg-white/5 border-white/5 hover:border-white/15 text-[#B8BEC7]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-semibold text-[#E32636]">
                        {checkpoint.code}
                      </span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <div className="text-xs font-bold text-white mt-1 truncate">
                      {checkpoint.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Servicing Promise & Action Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-[#171A20] border border-white/10 rounded-2xl stagger-footer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E32636]/10 border border-[#E32636]/30 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6 text-[#E32636]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Need vehicle maintenance or inspection?</h4>
              <p className="text-xs text-[#B8BEC7] mt-0.5">
                Our workshop in Croydon handles routine services, mechanical troubleshooting, and pre-sales prep.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`tel:${COMPANY.phoneTel}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#E32636] hover:bg-[#c41e2d] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-md transition-all whitespace-nowrap"
            >
              <span>Call Workshop {COMPANY.phone}</span>
            </a>
            {onOpenEnquiry && (
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
              >
                <span>Direct Enquiry</span>
              </button>
            )}
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

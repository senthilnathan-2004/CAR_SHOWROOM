'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { PaintColor } from '@/app/page';
import { Activity, ChevronDown, ChevronUp } from 'lucide-react';

interface TelemetryHudProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  activeColor: PaintColor;
}

export default function TelemetryHud({ containerRef, activeColor }: TelemetryHudProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Local React state for dynamic telemetry
  const [frameNumber, setFrameNumber] = useState('001');
  const [speed, setSpeed] = useState(0);
  const [aeroAngle, setAeroAngle] = useState(12);
  const [status, setStatus] = useState('ASSEMBLED / READY');
  const [statusColor, setStatusColor] = useState('#ffffff');
  const [isExpanded, setIsExpanded] = useState(false); // Mobile toggle

  // Synchronize scroll events with state updates
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // 1. Calculate frame (out of 240)
    const frame = Math.min(240, Math.max(1, Math.floor(latest * 239) + 1));
    setFrameNumber(String(frame).padStart(3, '0'));

    // 2. Calculate velocity
    setSpeed(Math.floor(latest * 425));

    // 3. Calculate aero wing flap angle
    let angle = 18;
    if (latest < 0.15) {
      angle = 12;
    } else if (latest < 0.5) {
      const p = (latest - 0.15) / 0.35;
      angle = Math.floor(12 + p * 36);
    } else if (latest < 0.85) {
      const p = (latest - 0.5) / 0.35;
      angle = Math.floor(48 - p * 30);
    }
    setAeroAngle(angle);

    // 4. Calculate state status label and color
    if (latest < 0.15) {
      setStatus('ASSEMBLED / READY');
      setStatusColor('#ffffff');
    } else if (latest < 0.45) {
      setStatus('DIAGNOSTIC DISASSEMBLY');
      setStatusColor(activeColor.hex);
    } else if (latest < 0.65) {
      setStatus('POWERTRAIN SHIFT');
      setStatusColor(activeColor.hex);
    } else if (latest < 0.85) {
      setStatus('VEHICLE REASSEMBLY');
      setStatusColor(activeColor.hex);
    } else {
      setStatus('SYSTEM ACTIVE');
      setStatusColor('#00D6FF'); // Electric cyan
    }
  });

  return (
    <>
      {/* Mobile Layout: Full-width bottom bar with less height */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-black/95 border-t border-white/10 px-6 py-5 flex items-center justify-between sm:hidden backdrop-blur-md h-[84px]">
        {/* Radar & State */}
        <div className="flex items-center space-x-3">
          <div className="relative w-8 h-8 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              style={{
                background: `linear-gradient(to right, transparent, ${activeColor.hex}cc, ${activeColor.hex})`,
              }}
              className="w-full h-[1px] origin-center"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[8px] uppercase tracking-widest text-[#00D6FF] font-bold">STATE</span>
            <span
              style={{ color: statusColor }}
              className="text-[10px] font-bold tracking-wider uppercase font-mono transition-colors duration-200"
            >
              {status.split(' ')[0]}
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center space-x-6">
          <div className="flex flex-col items-center">
            <span className="text-[8px] uppercase tracking-widest text-white/50">VELOCITY</span>
            <div className="flex items-baseline space-x-0.5">
              <span className="text-base font-bold font-mono text-white">{speed}</span>
              <span className="text-[9px] font-semibold font-mono" style={{ color: activeColor.hex }}>KM/H</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[8px] uppercase tracking-widest text-white/50">AERO WING</span>
            <div className="flex items-baseline space-x-0.5">
              <span className="text-base font-bold font-mono text-white">{aeroAngle}</span>
              <span className="text-[9px] font-semibold text-[#00D6FF] tracking-wider font-mono">DEG</span>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-[8px] uppercase tracking-widest text-white/40">FRAME</span>
            <span className="text-sm font-bold font-mono text-white">
              {frameNumber}<span className="text-white/30 text-[9px]">/240</span>
            </span>
          </div>
        </div>
      </div>

      {/* Desktop Layout: unchanged compact HUD panel on bottom right */}
      <div className="fixed bottom-6 right-6 z-40 select-none pointer-events-none hidden sm:block">
        <div className="bg-black/95 border border-white/15 p-5 rounded-2xl w-72 flex flex-col space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          {/* Radar compass & Frame status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Spinning Radar vector */}
              <div className="relative w-8 h-8 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 border border-dashed border-white/5" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                  style={{
                    background: `linear-gradient(to right, transparent, ${activeColor.hex}cc, ${activeColor.hex})`,
                  }}
                  className="w-full h-[1px] origin-center"
                />
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>

              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-[#00D6FF] font-bold">VEHICLE STATE</span>
                <span
                  style={{ color: statusColor }}
                  className="text-[10px] font-bold tracking-wider uppercase font-mono transition-colors duration-200"
                >
                  {status}
                </span>
              </div>
            </div>

            <div className="text-right flex flex-col">
              <span className="text-[9px] uppercase tracking-widest text-white/40">FRAME</span>
              <span className="text-sm font-bold font-mono text-white">
                {frameNumber}<span className="text-white/30 text-[10px]">/240</span>
              </span>
            </div>
          </div>

          {/* Divider line */}
          <div className="w-full h-[1px] bg-white/10" />

          {/* Telemetry readouts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <span className="text-[9px] uppercase tracking-widest text-white/50">VELOCITY</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold font-mono text-white tracking-tight">
                  {speed}
                </span>
                <span className="text-[10px] font-semibold tracking-wider font-mono" style={{ color: activeColor.hex }}>KM/H</span>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <span className="text-[9px] uppercase tracking-widest text-white/50">AERO WING</span>
              <div className="flex items-baseline space-x-1">
                <span className="text-2xl font-bold font-mono text-white tracking-tight">
                  {aeroAngle}
                </span>
                <span className="text-[10px] font-semibold text-[#00D6FF] tracking-wider font-mono">DEG</span>
              </div>
            </div>
          </div>

          {/* Dynamic decorative vector bar */}
          <div className="flex justify-between items-center text-[8px] font-mono text-white/30 pt-1">
            <span>01</span>
            <div className="flex space-x-1 px-2 flex-grow justify-center">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    delay: i * 0.1,
                  }}
                  style={{ backgroundColor: activeColor.hex }}
                  className="w-1.5 h-1 rounded-sm"
                />
              ))}
            </div>
            <span>MAX</span>
          </div>
        </div>
      </div>
    </>
  );
}

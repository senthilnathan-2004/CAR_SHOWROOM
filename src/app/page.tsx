'use client';

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ScrollytellingCanvas from '@/components/ScrollytellingCanvas';
import OverlayContent from '@/components/OverlayContent';
import TelemetryHud from '@/components/TelemetryHud';

export interface PaintColor {
  id: string;
  name: string;
  hex: string;
  filter: string;
  glow: string;
}

export const PAINT_COLORS: PaintColor[] = [
  { id: 'red', name: 'Crimson Red', hex: '#FF0033', filter: 'none', glow: 'rgba(255, 0, 51, 0.4)' },
  { id: 'cyan', name: 'Cyber Cyan', hex: '#00D6FF', filter: 'hue-rotate(170deg) saturate(1.8) brightness(1.1)', glow: 'rgba(0, 214, 255, 0.4)' },
  { id: 'purple', name: 'Midnight Purple', hex: '#A855F7', filter: 'hue-rotate(250deg) saturate(1.6) brightness(0.95)', glow: 'rgba(168, 85, 247, 0.4)' },
  { id: 'gold', name: 'Liquid Gold', hex: '#F59E0B', filter: 'hue-rotate(30deg) saturate(2.2) brightness(1.2)', glow: 'rgba(245, 158, 11, 0.4)' },
  { id: 'green', name: 'Emerald Green', hex: '#10B981', filter: 'hue-rotate(85deg) saturate(1.7) brightness(1.05)', glow: 'rgba(16, 185, 129, 0.4)' },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Showroom configurator state
  const [activeColor, setActiveColor] = useState<PaintColor>(PAINT_COLORS[0]);
  const [isReserveOpen, setIsReserveOpen] = useState(false);

  return (
    <main ref={containerRef} className="relative bg-[#000000] w-full min-h-screen">
      {/* Cinematic Loading Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#000000] z-[9999] flex flex-col justify-between p-8 md:p-16"
          >
            {/* Top telemetry lines */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col space-y-1">
                <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase">SYSTEM DIAGNOSTIC</span>
                <span className="text-xs text-white/60 font-mono">APEX CORE V.1.09</span>
              </div>
              <div className="text-right flex flex-col space-y-1">
                <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase">STATUS</span>
                <span className="text-xs text-[#00D6FF] font-mono animate-pulse">INITIATING RENDER CACHE...</span>
              </div>
            </div>

            {/* Central typography */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: 80 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="text-6xl md:text-8xl font-bold tracking-tighter text-white uppercase text-center"
                >
                  APEX P-1
                </motion.h1>
              </div>
              <p className="text-xs md:text-sm text-white/40 tracking-[0.3em] uppercase max-w-xs text-center font-light">
                Caching high-resolution vehicle telemetry
              </p>
            </div>

            {/* Bottom loader status */}
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between items-end">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF0033] animate-ping" />
                  <span className="text-[10px] tracking-[0.25em] text-white/60 uppercase">
                    PRELOADING VECTOR SETS
                  </span>
                </div>
                <span className="text-3xl md:text-5xl font-bold font-mono text-white/90">
                  {loadingProgress}%
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#FF0033]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ ease: 'easeOut', duration: 0.1 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Fixed Navbar */}
      <Navbar onOpenReserve={() => setIsReserveOpen(true)} />

      {/* Dynamic Telemetry HUD overlay in the bottom right corner */}
      <TelemetryHud containerRef={containerRef} activeColor={activeColor} />

      {/* Sticky Canvas viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#000000] z-0">
        <ScrollytellingCanvas
          containerRef={containerRef}
          onLoadingProgress={setLoadingProgress}
          onLoaded={() => setIsLoaded(true)}
          colorFilter={activeColor.filter}
        />
      </div>

      {/* Scrolling overlay panels */}
      <div className="relative z-10 -mt-[100vh]">
        <OverlayContent
          activeColor={activeColor}
          onColorChange={setActiveColor}
          isReserveOpen={isReserveOpen}
          onReserveClose={() => setIsReserveOpen(false)}
          onOpenReserve={() => setIsReserveOpen(true)}
        />
      </div>
    </main>
  );
}

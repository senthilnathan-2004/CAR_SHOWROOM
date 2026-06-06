'use client';

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ScrollytellingCanvas from '@/components/ScrollytellingCanvas';
import OverlayContent from '@/components/OverlayContent';
import TelemetryHud from '@/components/TelemetryHud';

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

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
      <Navbar />

      {/* Dynamic Telemetry HUD overlay in the bottom right corner */}
      <TelemetryHud containerRef={containerRef} />

      {/* Sticky Canvas viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-[#000000] z-0">
        <ScrollytellingCanvas
          containerRef={containerRef}
          onLoadingProgress={setLoadingProgress}
          onLoaded={() => setIsLoaded(true)}
        />
      </div>

      {/* Scrolling overlay panels */}
      <div className="relative z-10 -mt-[100vh]">
        <OverlayContent />
      </div>
    </main>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TelemetryCardProps {
  label: string;
  value: string;
  unit: string;
  accent?: string;
}

// Telemetry card component
function TelemetryCard({ label, value, unit, accent = '#FF0033' }: TelemetryCardProps) {
  return (
    <div className="bg-[#08080a]/90 border border-white/10 p-5 rounded-2xl flex flex-col space-y-2 relative group overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
      {/* Corner indicator */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/45" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/45" />

      <span className="text-[9px] uppercase tracking-[0.2em] text-white/80 font-mono">{label}</span>
      <div className="flex items-baseline space-x-1">
        <span className="text-3xl font-extrabold font-mono text-white tracking-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">{value}</span>
        <span className="text-xs font-bold font-mono tracking-widest" style={{ color: accent }}>{unit}</span>
      </div>
    </div>
  );
}

export default function OverlayContent() {
  return (
    <div className="relative z-10 w-full">
      {/* SECTION 1: HERO / INTRO (0-15% scroll) */}
      <section className="h-screen w-full flex flex-col justify-between items-center py-24 px-6 md:px-12 text-center pointer-events-none relative">
        <div />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex flex-col items-center space-y-4"
        >
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/40 drop-shadow-[0_0_45px_rgba(255,255,255,0.25)] uppercase leading-none">
            APEX P-1
          </h1>
          <div className="flex items-center space-x-3 pt-1">
            <div className="w-6 h-[1px] bg-white/20" />
            <p className="text-xs md:text-sm text-white/80 font-mono tracking-[0.4em] uppercase">
              Aerodynamics, perfected.
            </p>
            <div className="w-6 h-[1px] bg-white/20" />
          </div>
        </motion.div>

        {/* Improved Mouse Wheel Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center space-y-3"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/70 font-mono">Scroll to Initiate</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-1 h-2 bg-[#FF0033] rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: ENGINEERING REVEAL (15-40% scroll) */}
      <section id="design" className="min-h-screen w-full flex items-center px-6 md:px-24 py-24 justify-start relative">
        {/* Floating engineering details pointer on the right */}
        <div className="absolute right-[10%] top-[30%] hidden lg:flex flex-col items-start space-y-2 font-mono text-[10px] text-white/85 bg-black/40 p-3 rounded-lg border border-white/5 backdrop-blur-sm">
          <span className="text-[#FF0033] font-bold drop-shadow-[0_0_8px_rgba(255,0,51,0.4)]">● ACTIVE STRUCTURAL MATRIX</span>
          <span className="border-l border-white/30 pl-2">CARBON FIBER DIAPHRAGM</span>
          <span className="border-l border-white/30 pl-2">TORSION LOAD: NOMINAL</span>
          <div className="w-32 h-[1px] bg-gradient-to-r from-white/30 to-transparent mt-1" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          className="w-full max-w-lg space-y-6 z-10"
        >
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#FF0033] shadow-[0_0_8px_#FF0033]" />
            <span className="text-xs font-bold tracking-widest text-[#FF0033] uppercase font-mono">MONOCOQUE CHASSIS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Precision-engineered for the apex.
          </h2>
          <p className="text-sm md:text-base text-white/90 leading-relaxed font-light text-justify">
            A zero-gravity ultra-lightweight carbon fiber chassis designed to endure maximum lateral G-force. Dynamic active suspension adapts to track topography in microseconds.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <TelemetryCard label="CHASSIS WEIGHT" value="98" unit="KG" accent="#FF0033" />
            <TelemetryCard label="TORSIONAL RIGIDITY" value="65K" unit="NM/DEG" accent="#FF0033" />
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: POWERTRAIN & PERFORMANCE (40-65% scroll) */}
      <section id="power" className="min-h-screen w-full flex items-center px-6 md:px-24 py-24 justify-end relative">
        {/* Floating engineering details pointer on the left */}
        <div className="absolute left-[10%] top-[30%] hidden lg:flex flex-col items-end space-y-2 font-mono text-[10px] text-white/85 bg-black/40 p-3 rounded-lg border border-white/5 backdrop-blur-sm text-right">
          <span className="text-[#00D6FF] font-bold drop-shadow-[0_0_8px_rgba(0,214,255,0.4)]">POWER GENERATOR CORE ●</span>
          <span className="border-r border-white/30 pr-2">QUAD-CORE EMOTOR MATRIX</span>
          <span className="border-r border-white/30 pr-2">THERMAL DISCHARGE: OPTIMAL</span>
          <div className="w-32 h-[1px] bg-gradient-to-l from-white/30 to-transparent mt-1" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
          variants={{
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          className="w-full max-w-lg space-y-6 z-10"
        >
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#00D6FF] shadow-[0_0_8px_#00D6FF]" />
            <span className="text-xs font-bold tracking-widest text-[#00D6FF] uppercase font-mono">HYBRID POWER UNIT</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Unrelenting hybrid power.
          </h2>
          <p className="text-sm md:text-base text-white/90 leading-relaxed font-light text-justify">
            The quad-motor electric powertrain paired with an ultra-high performance twin-turbo V8 delivers visceral torque vectoring and instantaneous launch control.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <TelemetryCard label="TOTAL POWER" value="1,850" unit="HP" accent="#00D6FF" />
            <TelemetryCard label="0 - 100 KM/H" value="1.85" unit="SEC" accent="#00D6FF" />
          </div>
        </motion.div>
      </section>

      {/* SECTION 4: INTERIOR & CRAFTSMANSHIP (65-85% scroll) */}
      <section id="aerodynamics" className="min-h-screen w-full flex items-center px-6 md:px-24 py-24 justify-start relative">
        {/* Floating engineering details pointer on the right */}
        <div className="absolute right-[10%] top-[30%] hidden lg:flex flex-col items-start space-y-2 font-mono text-[10px] text-white/85 bg-black/40 p-3 rounded-lg border border-white/5 backdrop-blur-sm">
          <span className="text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">● PILOT COCKPIT ENVIRONMENT</span>
          <span className="border-l border-white/30 pl-2">ALCANTARA RACING HARNESS</span>
          <span className="border-l border-white/30 pl-2">HUD COUPLING: ENGAGED</span>
          <div className="w-32 h-[1px] bg-gradient-to-r from-white/30 to-transparent mt-1" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          className="w-full max-w-lg space-y-6 z-10"
        >
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#FF0033] shadow-[0_0_8px_#FF0033]" />
            <span className="text-xs font-bold tracking-widest text-[#FF0033] uppercase font-mono">TACTILE CABIN</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            A cockpit built around pure focus.
          </h2>
          <p className="text-sm md:text-base text-white/90 leading-relaxed font-light text-justify">
            Custom-molded Alcantara seating tailored to the pilot's precise dimensions. A curved OLED console streams real-time lap telemetrics and tire thermal profiles.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <TelemetryCard label="INTERFACE RESP." value="1.2" unit="MS" accent="#FF0033" />
            <TelemetryCard label="G-FORCE INDEX" value="3.5" unit="MAX" accent="#FF0033" />
          </div>
        </motion.div>
      </section>

      {/* SECTION 4.5: TECHNICAL SPECIFICATIONS (80-90% scroll) */}
      <section id="specs" className="min-h-screen w-full flex items-center px-6 md:px-24 py-24 justify-center relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          className="w-full max-w-4xl space-y-10 z-10"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.3em] text-[#00D6FF] uppercase font-mono">PERFORMANCE METRIC DATA</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">TECHNICAL SPECIFICATIONS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            {/* Column 1 */}
            <div className="bg-[#08080a]/90 border border-white/10 backdrop-blur-md p-6 rounded-2xl space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <h3 className="text-sm font-bold text-[#FF0033] tracking-widest uppercase border-b border-white/10 pb-2 font-mono">AERODYNAMICS</h3>
              <ul className="space-y-3 font-mono text-xs">
                <li className="flex justify-between"><span className="text-white/60">DRAG COEFFICIENT</span> <span className="text-white font-bold">0.26 CD</span></li>
                <li className="flex justify-between"><span className="text-white/60">DOWNFORCE @ 250KMH</span> <span className="text-white font-bold">820 KG</span></li>
                <li className="flex justify-between"><span className="text-white/60">ACTIVE FLAP SERVOS</span> <span className="text-white font-bold">12 SENSORS</span></li>
                <li className="flex justify-between"><span className="text-white/60">VENTURI TUNNELS</span> <span className="text-white font-bold">CARBON FIBER</span></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="bg-[#08080a]/90 border border-white/10 backdrop-blur-md p-6 rounded-2xl space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <h3 className="text-sm font-bold text-[#00D6FF] tracking-widest uppercase border-b border-white/10 pb-2 font-mono">POWERTRAIN</h3>
              <ul className="space-y-3 font-mono text-xs">
                <li className="flex justify-between"><span className="text-white/60">INTERNAL COMB.</span> <span className="text-white font-bold">5.0L TWIN V8</span></li>
                <li className="flex justify-between"><span className="text-white/60">ELECTRIC CORE</span> <span className="text-white font-bold">TRI-MOTOR AC</span></li>
                <li className="flex justify-between"><span className="text-white/60">BATTERY SYSTEM</span> <span className="text-white font-bold">800V LIQUID-C</span></li>
                <li className="flex justify-between"><span className="text-white/60">TRANSMISSION</span> <span className="text-white font-bold">9-SPEED LST</span></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="bg-[#08080a]/90 border border-white/10 backdrop-blur-md p-6 rounded-2xl space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <h3 className="text-sm font-bold text-white tracking-widest uppercase border-b border-white/10 pb-2 font-mono">CHASSIS & BRAKES</h3>
              <ul className="space-y-3 font-mono text-xs">
                <li className="flex justify-between"><span className="text-white/60">MONOCOQUE TUB</span> <span className="text-white font-bold">PRE-PREG CARBON</span></li>
                <li className="flex justify-between"><span className="text-white/60">SUSPENSION</span> <span className="text-white font-bold">PUSHROD COMP</span></li>
                <li className="flex justify-between"><span className="text-white/60">FRONT BRAKES</span> <span className="text-white font-bold">6-POT CERAMIC</span></li>
                <li className="flex justify-between"><span className="text-white/60">TYRES</span> <span className="text-white font-bold">MICHELIN CUP 2</span></li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 5: REASSEMBLY & CTA (85-100% scroll) */}
      <section className="h-screen w-full flex flex-col justify-center items-center py-24 px-6 md:px-12 text-center relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          className="flex flex-col items-center space-y-6 max-w-2xl z-10"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-[#FF0033] uppercase font-mono">THE LEGEND REASSEMBLED</span>
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            Command the road.
          </h2>
          <p className="text-sm md:text-base text-white max-w-md font-light leading-relaxed">
            The assembly is complete. Step into the cockpit of the most advanced aerodynamic hypercar ever designed.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button className="bg-white text-black font-semibold tracking-widest text-xs uppercase px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-transform duration-300 shadow-xl cursor-pointer">
              Configure Yours
            </button>
            <button className="glassmorphism border border-white/10 text-white font-semibold tracking-widest text-xs uppercase px-8 py-4 rounded-full hover:bg-white/10 active:scale-95 transition-all duration-300 cursor-pointer">
              Request Private Viewing
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

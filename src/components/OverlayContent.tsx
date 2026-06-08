'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaintColor, PAINT_COLORS } from '@/app/page';
import { X, CheckCircle2, ChevronRight, Sliders, Shield, Sparkles, MapPin, Star, Settings, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

interface TelemetryCardProps {
  label: string;
  value: string;
  unit: string;
  accent?: string;
}

// Telemetry card component
function TelemetryCard({ label, value, unit, accent = '#FF0033' }: TelemetryCardProps) {
  return (
    <div className="bg-[#08080a]/90 border border-white/10 p-4 sm:p-5 rounded-2xl flex flex-col space-y-1 sm:space-y-2 relative group overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
      {/* Corner indicator */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/35" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/35" />

      <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/75 font-mono">{label}</span>
      <div className="flex items-baseline space-x-1">
        <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]">{value}</span>
        <span className="text-[10px] sm:text-xs font-bold font-mono tracking-widest" style={{ color: accent }}>{unit}</span>
      </div>
    </div>
  );
}

interface OverlayContentProps {
  activeColor: PaintColor;
  onColorChange: (color: PaintColor) => void;
  isReserveOpen: boolean;
  onReserveClose: () => void;
  onOpenReserve: () => void;
}

export default function OverlayContent({
  activeColor,
  onColorChange,
  isReserveOpen,
  onReserveClose,
  onOpenReserve,
}: OverlayContentProps) {
  // Booking Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [wheelStyle, setWheelStyle] = useState('Carbon Forged');
  const [pkg, setPkg] = useState('Apex Track Pack');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setFormSubmitted(false);
    onReserveClose();
  };

  return (
    <div className="relative z-10 w-full">
      {/* SECTION 1: HERO / INTRO (0-15% scroll) */}
      <section className="h-screen w-full flex flex-col justify-between items-center py-20 px-4 sm:px-6 md:px-12 text-center pointer-events-none relative">
        <div />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="flex flex-col items-center space-y-4"
        >
          <h1 className="text-5xl sm:text-8xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/40 drop-shadow-[0_0_45px_rgba(255,255,255,0.25)] uppercase leading-none text-center">
            APEX P-1
          </h1>
          <div className="flex items-center space-x-3 pt-1 justify-center">
            <div className="w-4 sm:w-6 h-[1px] bg-white/20" />
            <p className="text-[10px] sm:text-xs md:text-sm text-white/80 font-mono tracking-[0.4em] uppercase">
              Aerodynamics, perfected.
            </p>
            <div className="w-4 sm:w-6 h-[1px] bg-white/20" />
          </div>
        </motion.div>

        {/* Improved Mouse Wheel Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center space-y-3"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/70 font-mono">Scroll to Configure</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              style={{ backgroundColor: activeColor.hex }}
              className="w-1 h-2 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* FLOATING PAINT COLOR CONFIGURATOR */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 z-30 pointer-events-none">
        <div className="pointer-events-auto glassmorphism border border-white/15 px-4 py-2 rounded-full shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex items-center space-x-3">
          <span className="text-[8px] font-bold tracking-widest font-mono text-white/60 uppercase border-r border-white/10 pr-2">PAINT</span>
          <div className="flex items-center space-x-2">
            {PAINT_COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => onColorChange(color)}
                style={{
                  backgroundColor: color.hex,
                  boxShadow: activeColor.id === color.id ? `0 0 10px ${color.hex}` : 'none',
                  borderColor: activeColor.id === color.id ? '#ffffff' : 'rgba(255,255,255,0.2)'
                }}
                className="w-5 h-5 rounded-full border transition-all duration-300 transform hover:scale-110 active:scale-90 cursor-pointer"
                title={color.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SECTION: ABOUT THE SHOWROOM */}
      <section id="about" className="min-h-screen w-full flex items-center px-4 sm:px-6 md:px-24 py-24 justify-start relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          className="w-full max-w-2xl space-y-6 z-10 pointer-events-auto bg-black/40 p-6 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-md"
        >
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeColor.hex }} />
            <span className="text-xs font-bold tracking-widest uppercase font-mono" style={{ color: activeColor.hex }}>THE APEX ATELIER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Where engineering meets automotive art.
          </h2>
          <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
            Founded with a singular vision to redefine the limits of street-legal velocity, the Apex Showroom is an exclusive immersive experience sanctuary. We do not merely catalog vehicles; we curate Bespoke Performance Systems for the modern connoisseur. Every machine housed in our galleries is a testament to aerodynamic innovation, structural mastery, and zero-compromise powertrain output.
          </p>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/10">
            <div>
              <span className="block text-2xl font-bold font-mono text-white">100%</span>
              <span className="text-[10px] text-white/40 tracking-wider uppercase font-mono">Bespoke Builds</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-mono text-white">24/7</span>
              <span className="text-[10px] text-white/40 tracking-wider uppercase font-mono">Concierge Telemetry</span>
            </div>
            <div>
              <span className="block text-2xl font-bold font-mono text-white">4</span>
              <span className="text-[10px] text-white/40 tracking-wider uppercase font-mono">Global Sanctuaries</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION: SERVICES PROVIDED */}
      <section id="services" className="min-h-screen w-full flex items-center px-4 sm:px-6 md:px-24 py-24 justify-center relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          className="w-full max-w-5xl space-y-10 z-10 pointer-events-auto"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.3em] uppercase font-mono" style={{ color: activeColor.hex }}>PREMIUM CAPABILITIES</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">EXPERIENCE SERVICES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="bg-[#08080a]/90 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-white/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group">
              <Settings className="w-8 h-8 transition-transform duration-300 group-hover:rotate-45" style={{ color: activeColor.hex }} />
              <h3 className="text-base font-bold text-white uppercase tracking-tight font-mono">1. Bespoke Atelier</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Tailor every material, contrast stitch, wheel specification, and aero profile under the guidance of our lead designers.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-[#08080a]/90 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-white/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group">
              <ShieldCheck className="w-8 h-8" style={{ color: activeColor.hex }} />
              <h3 className="text-base font-bold text-white uppercase tracking-tight font-mono">2. Apex Elite Care</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                White-glove maintenance schedules utilizing proprietary telemetry scanners, direct ECU software diagnostics, and track inspection.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-[#08080a]/90 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-white/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group">
              <HeartHandshake className="w-8 h-8" style={{ color: activeColor.hex }} />
              <h3 className="text-base font-bold text-white uppercase tracking-tight font-mono">3. Trackside Concierge</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Receive direct aerodynamic tuning adjustments, tire pressure diagnostics, and coaching from certified racing drivers on track days.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-[#08080a]/90 border border-white/10 p-6 rounded-2xl space-y-4 hover:border-white/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] group">
              <Eye className="w-8 h-8" style={{ color: activeColor.hex }} />
              <h3 className="text-base font-bold text-white uppercase tracking-tight font-mono">4. Virtual Telemetrics</h3>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                Connect your vehicle directly to our cloud core for continuous performance monitoring, predictive component care, and updates.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: ENGINEERING REVEAL (15-40% scroll) */}
      <section id="design" className="min-h-screen w-full flex items-center px-6 md:px-24 py-24 justify-start relative">
        {/* Floating engineering details pointer on the right */}
        <div className="absolute right-[10%] top-[30%] hidden lg:flex flex-col items-start space-y-2 font-mono text-[10px] text-white/85 bg-black/40 p-3 rounded-lg border border-white/5 backdrop-blur-sm">
          <span className="font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" style={{ color: activeColor.hex }}>● ACTIVE STRUCTURAL MATRIX</span>
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
          className="w-full max-w-lg space-y-6 z-10 pointer-events-auto"
        >
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: activeColor.hex, color: activeColor.hex }} />
            <span className="text-xs font-bold tracking-widest uppercase font-mono" style={{ color: activeColor.hex }}>MONOCOQUE CHASSIS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            Precision-engineered for the apex.
          </h2>
          <p className="text-sm md:text-base text-white/80 leading-relaxed font-light text-justify">
            A zero-gravity ultra-lightweight carbon fiber chassis designed to endure maximum lateral G-force. Dynamic active suspension adapts to track topography in microseconds.
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <TelemetryCard label="CHASSIS WEIGHT" value="98" unit="KG" accent={activeColor.hex} />
            <TelemetryCard label="TORSIONAL RIGIDITY" value="65K" unit="NM/DEG" accent={activeColor.hex} />
          </div>
        </motion.div>
      </section>

      {/* SECTION: SHOWROOM LOCATIONS */}
      <section id="location" className="min-h-screen w-full flex items-center px-4 sm:px-6 md:px-24 py-24 justify-start relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
          variants={{
            hidden: { opacity: 0, y: 35 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          className="w-full max-w-4xl space-y-8 z-10 pointer-events-auto"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin size={16} style={{ color: activeColor.hex }} />
              <span className="text-xs font-bold tracking-[0.2em] uppercase font-mono" style={{ color: activeColor.hex }}>GLOBAL SANCTUARIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">OUR SHOWROOM LOCATIONS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Location 1 */}
            <div className="bg-black/60 border border-white/10 p-6 rounded-2xl space-y-3 hover:border-white/20 transition-all duration-300 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none transition-all duration-300 group-hover:bg-white/10" />
              <span className="text-xs font-bold font-mono tracking-widest text-[#00D6FF]">MONACO ATELIER</span>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight font-mono">PORT HERCULE</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Boulevard Albert 1er,<br />
                98000 Monaco-Ville<br />
                monaco@apexmotors.com
              </p>
              <div className="w-full h-[1px] bg-white/10 pt-2" />
              <span className="text-[9px] font-bold font-mono tracking-widest text-white/40 uppercase block">OPEN: 10:00 - 19:00</span>
            </div>

            {/* Location 2 */}
            <div className="bg-black/60 border border-white/10 p-6 rounded-2xl space-y-3 hover:border-white/20 transition-all duration-300 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none transition-all duration-300 group-hover:bg-white/10" />
              <span className="text-xs font-bold font-mono tracking-widest" style={{ color: activeColor.hex }}>LOS ANGELES STUDIO</span>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight font-mono">BEVERLY HILLS</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                9350 Wilshire Blvd,<br />
                Beverly Hills, CA 90212<br />
                la@apexmotors.com
              </p>
              <div className="w-full h-[1px] bg-white/10 pt-2" />
              <span className="text-[9px] font-bold font-mono tracking-widest text-white/40 uppercase block">OPEN: 09:00 - 18:00</span>
            </div>

            {/* Location 3 */}
            <div className="bg-black/60 border border-white/10 p-6 rounded-2xl space-y-3 hover:border-white/20 transition-all duration-300 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none transition-all duration-300 group-hover:bg-white/10" />
              <span className="text-xs font-bold font-mono tracking-widest text-[#FF0033]">TOKYO LAB</span>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight font-mono">MINATO DISTRICT</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Roppongi Hills Center,<br />
                Tokyo 106-6108<br />
                tokyo@apexmotors.com
              </p>
              <div className="w-full h-[1px] bg-white/10 pt-2" />
              <span className="text-[9px] font-bold font-mono tracking-widest text-white/40 uppercase block">OPEN: 11:00 - 20:00</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION: REVIEWS / TESTIMONIALS */}
      <section id="reviews" className="min-h-screen w-full flex items-center px-4 sm:px-6 md:px-24 py-24 justify-center relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
          variants={{
            hidden: { opacity: 0, y: 35 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          className="w-full max-w-4xl space-y-10 z-10 pointer-events-auto"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.3em] uppercase font-mono" style={{ color: activeColor.hex }}>VERIFIED ACQUISITION REVIEWS</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">COLLECTOR TESTIMONIALS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {/* Review 1 */}
            <div className="bg-[#08080a]/90 border border-white/10 p-6 rounded-2xl space-y-4 shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-sm text-white/80 leading-relaxed font-light italic">
                  "The downforce capabilities of the APEX P-1 are simply incomprehensible on street tires. Coming out of Roppongi's low-speed exits, the torque vectoring system snaps the nose straight instantly. It is engineering wizardry."
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
                <span className="text-white font-bold">KENJI T.</span>
                <span className="text-white/40">TOKYO, JP</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-[#08080a]/90 border border-white/10 p-6 rounded-2xl space-y-4 shadow-lg flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-sm text-white/80 leading-relaxed font-light italic">
                  "Having piloted almost every hypercar of this era, the lateral G endurance of the carbon monocoque is unmatched. The active flap adjustments micro-tune air channels in real-time, making it feel like it runs on rails."
                </p>
              </div>
              <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs font-mono">
                <span className="text-white font-bold">FRANÇOIS D.</span>
                <span className="text-white/40">MONTE CARLO, MC</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 4.5: TECHNICAL SPECIFICATIONS (80-90% scroll) */}
      <section id="specs" className="min-h-screen w-full flex items-center px-4 sm:px-6 md:px-24 py-24 justify-center relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
          }}
          className="w-full max-w-4xl space-y-10 z-10 pointer-events-auto"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <span className="text-xs font-bold tracking-[0.3em] text-[#00D6FF] uppercase font-mono">PERFORMANCE METRIC DATA</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">TECHNICAL SPECIFICATIONS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-6">
            {/* Column 1 */}
            <div className="bg-[#08080a]/90 border border-white/10 backdrop-blur-md p-6 rounded-2xl space-y-4 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <h3 className="text-sm font-bold tracking-widest uppercase border-b border-white/10 pb-2 font-mono" style={{ color: activeColor.hex }}>AERODYNAMICS</h3>
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
          className="flex flex-col items-center space-y-6 max-w-2xl z-10 pointer-events-auto"
        >
          <span className="text-xs font-bold tracking-[0.3em] uppercase font-mono" style={{ color: activeColor.hex }}>THE LEGEND REASSEMBLED</span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white leading-none drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
            Command the road.
          </h2>
          <p className="text-sm md:text-base text-white/90 max-w-md font-light leading-relaxed">
            The assembly is complete. Step into the cockpit of the most advanced aerodynamic hypercar ever designed.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={onOpenReserve}
              style={{
                backgroundColor: activeColor.hex,
                boxShadow: `0 10px 25px ${activeColor.glow}`
              }}
              className="text-white font-semibold tracking-widest text-xs uppercase px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Configure Yours
            </button>
            <button
              onClick={onOpenReserve}
              className="glassmorphism border border-white/10 text-white font-semibold tracking-widest text-xs uppercase px-8 py-4 rounded-full hover:bg-white/10 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Request Private Viewing
            </button>
          </div>
        </motion.div>
      </section>

      {/* BOOKING/RESERVATION MODAL OVERLAY */}
      <AnimatePresence>
        {isReserveOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-lg bg-[#070709] border border-white/15 rounded-3xl p-6 md:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.85)] z-10 overflow-hidden pointer-events-auto"
            >
              {/* Decorative Glow accent */}
              <div
                style={{ backgroundColor: activeColor.hex }}
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-[60px] opacity-40 pointer-events-none"
              />

              {/* Close Button */}
              <button
                onClick={resetForm}
                className="absolute top-4 right-4 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              {!formSubmitted ? (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Sparkles size={16} style={{ color: activeColor.hex }} />
                      <span className="text-[10px] tracking-[0.25em] text-[#00D6FF] font-bold font-mono uppercase">
                        RESERVATION CONVERGENCE
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                      CONFIGURE YOUR APEX P-1
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] font-bold tracking-widest font-mono text-white/50 uppercase">
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="ENTER YOUR FULL NAME"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-mono"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] font-bold tracking-widest font-mono text-white/50 uppercase">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="NAME@DOMAIN.COM"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-mono"
                      />
                    </div>

                    {/* Paint Color Indicator */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[9px] font-bold tracking-widest font-mono text-white/50 uppercase">
                        SELECTED SPECIFICATIONS
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-center space-x-3">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                            style={{ backgroundColor: activeColor.hex }}
                          />
                          <div className="flex flex-col">
                            <span className="text-[9px] text-white/40 font-mono">PAINT</span>
                            <span className="text-xs font-bold text-white font-mono">{activeColor.name}</span>
                          </div>
                        </div>

                        <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col justify-center">
                          <span className="text-[9px] text-white/40 font-mono">WHEELS</span>
                          <select
                            value={wheelStyle}
                            onChange={(e) => setWheelStyle(e.target.value)}
                            className="bg-transparent text-xs font-bold text-white font-mono focus:outline-none cursor-pointer"
                          >
                            <option value="Carbon Forged" className="bg-[#070709] text-white">Carbon Forged</option>
                            <option value="Track Titanium" className="bg-[#070709] text-white">Track Titanium</option>
                            <option value="Aero Shield" className="bg-[#070709] text-white">Aero Shield</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Package Selection */}
                    <div className="flex flex-col space-y-2">
                      <label className="text-[9px] font-bold tracking-widest font-mono text-white/50 uppercase">
                        PERFORMANCE PACKAGE
                      </label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setPkg('Apex Track Pack')}
                          className={`p-3 rounded-xl border font-mono font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                            pkg === 'Apex Track Pack'
                              ? 'border-white bg-white/10 text-white'
                              : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10'
                          }`}
                        >
                          <span>TRACK PACK</span>
                          <span className="text-[8px] text-[#00D6FF] mt-1 font-semibold">CIRCUIT OPTIMIZED</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPkg('Apex Grand Tourer')}
                          className={`p-3 rounded-xl border font-mono font-bold transition-all text-left flex flex-col justify-between cursor-pointer ${
                            pkg === 'Apex Grand Tourer'
                              ? 'border-white bg-white/10 text-white'
                              : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10'
                          }`}
                        >
                          <span>GRAND TOURER</span>
                          <span className="text-[8px] text-[#FF0033] mt-1 font-semibold">ROAD REFINED</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      style={{
                        backgroundColor: activeColor.hex,
                        boxShadow: `0 10px 20px ${activeColor.glow}`
                      }}
                      className="w-full text-white font-bold tracking-widest text-xs uppercase py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <span>INITIATE RESERVATION SEQUENCE</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-10 text-center space-y-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.1 }}
                  >
                    <CheckCircle2 size={64} style={{ color: activeColor.hex }} />
                  </motion.div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                      RESERVATION INITIATED
                    </h3>
                    <p className="text-xs text-white/60 max-w-sm mx-auto leading-relaxed font-mono">
                      APEX CORE SECURED. WELCOME TO THE CIRCLE, <span className="text-white font-bold">{name.toUpperCase()}</span>. OUR CONCIERGE WILL CONTACT YOU WITHIN 24 HOURS TO FINALIZE YOUR BUILD DETAILS.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2 bg-white/5 border border-white/5 p-3 rounded-xl text-left w-full font-mono text-[10px] text-white/50">
                    <Shield size={16} className="text-[#00D6FF] shrink-0" />
                    <span>SECURE TRANSACTION HANDSHAKE CONFIRMED AT APEX-1 DATASTREAM</span>
                  </div>

                  <button
                    onClick={resetForm}
                    className="glassmorphism border border-white/15 hover:bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase px-6 py-3 rounded-full transition-all cursor-pointer"
                  >
                    CLOSE OVERLAY
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

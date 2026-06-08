'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Settings, Sliders, MapPin, Star, BarChart3 } from 'lucide-react';

interface NavbarProps {
  onOpenReserve: () => void;
}

export default function Navbar({ onOpenReserve }: NavbarProps) {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: 'Showroom', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Design', href: '#design' },
    { name: 'Location', href: '#location' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Specs', href: '#specs' }
  ];

  return (
    <>
      <div className="fixed top-4 sm:top-6 left-0 w-full z-50 px-4 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          className="pointer-events-auto glassmorphism border border-white/10 rounded-full px-4 md:px-6 py-2.5 sm:py-3 w-[95%] md:w-[92%] max-w-7xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl grid grid-cols-3 items-center md:flex md:justify-between"
        >
          {/* Mobile: Hamburger Button on Left */}
          <div className="flex items-center md:hidden justify-start">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Center: Logo (Centered on Mobile, Left-aligned on Desktop) */}
          <div className="flex items-center justify-center md:justify-start space-x-2 md:border-r md:border-white/10 md:pr-4">
            <span className="text-base font-black tracking-widest text-white/95 uppercase font-mono">
              APEX
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0033] animate-pulse" />
          </div>

          {/* Desktop Links (hidden on mobile) */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="text-[12px] lg:text-[13px] font-bold text-white/75 tracking-widest uppercase hover:text-white transition-colors duration-300 relative py-1.5 px-2.5 lg:px-3"
              >
                {link.name}
                {hoveredLink === link.name && (
                  <motion.span
                    layoutId="navHover"
                    className="absolute inset-0 bg-white/5 rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Right: Reserve Button */}
          <div className="flex items-center justify-end md:pl-4 md:border-l md:border-white/10">
            <button
              onClick={onOpenReserve}
              className="bg-gradient-to-r from-[#FF0033] to-[#CC0029] text-white text-[10px] sm:text-[11px] font-bold tracking-widest uppercase px-4 sm:px-5 py-2 sm:py-2.5 rounded-full hover:shadow-[0_0_15px_rgba(255,0,51,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              Reserve
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl pt-24 px-6 flex flex-col justify-between pb-24 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              <span className="text-[10px] tracking-[0.25em] text-[#FF0033] uppercase font-mono border-b border-white/5 pb-2 w-full text-center">
                SYSTEM INTERACTIVE INTERFACE
              </span>
              
              {/* Dashboard Grid Menu */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { name: 'Showroom', href: '#about', icon: Sparkles, desc: 'Bespoke atelier' },
                  { name: 'Services', href: '#services', icon: Settings, desc: 'Tuning & care' },
                  { name: 'Design', href: '#design', icon: Sliders, desc: 'Carbon monocoque' },
                  { name: 'Location', href: '#location', icon: MapPin, desc: 'Experience hubs' },
                  { name: 'Reviews', href: '#reviews', icon: Star, desc: 'Testimonials' },
                  { name: 'Specs', href: '#specs', icon: BarChart3, desc: 'Full telemetry' }
                ].map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="bg-white/5 border border-white/10 hover:border-white/20 p-4 rounded-2xl flex flex-col space-y-3 transition-all duration-300 active:scale-95 group text-left"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-colors group-hover:bg-[#FF0033]/10 group-hover:border-[#FF0033]/30">
                        <IconComponent size={16} className="text-white group-hover:text-[#FF0033] transition-colors" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-extrabold text-white tracking-tight uppercase group-hover:text-[#FF0033] transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[9px] text-white/40 font-mono font-medium tracking-wide uppercase mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col space-y-4 mt-6">
              <div className="h-[1px] bg-white/10 w-full" />
              <div className="flex justify-between items-center text-xs font-mono text-white/40">
                <span>APEX SYSTEM HUD</span>
                <span className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D6FF] animate-pulse" />
                  <span>ONLINE</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

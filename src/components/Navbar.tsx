'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const links = [
    { name: 'Design', href: '#design' },
    { name: 'Specs', href: '#specs' },
    { name: 'Aero', href: '#aerodynamics' },
    { name: 'Power', href: '#power' }
  ];

  return (
    <div className="fixed top-6 left-0 w-full z-50 px-4 flex justify-center pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        className="pointer-events-auto glassmorphism border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl w-[95%] md:w-[92%] max-w-7xl"
      >
        {/* Logo Icon */}
        <div className="flex items-center space-x-2 border-r border-white/10 pr-4">
          <span className="text-base font-black tracking-widest text-white/95 uppercase font-mono">
            APEX
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF0033] animate-pulse" />
        </div>

        {/* Links */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setHoveredLink(link.name)}
              onMouseLeave={() => setHoveredLink(null)}
              className="text-[13px] font-bold text-white/75 tracking-widest uppercase hover:text-white transition-colors duration-300 relative py-1.5 px-3"
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

        {/* Action Button */}
        <div className="border-l border-white/10 pl-4">
          <button className="bg-gradient-to-r from-[#FF0033] to-[#CC0029] text-white text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-full hover:shadow-[0_0_15px_rgba(255,0,51,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer">
            Reserve
          </button>
        </div>
      </motion.nav>
    </div>
  );
}

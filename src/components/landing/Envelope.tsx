"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";

export default function Envelope() {
  const [isOpening, setIsOpening] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      router.push("/invitacion");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#F7E7CE]/40 to-[#D4A0A0]/20">
      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[15%] right-[10%] w-48 h-48 rounded-full bg-[#D4A853]/8 blur-3xl"
          animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[8%] w-64 h-64 rounded-full bg-[#D4A0A0]/10 blur-3xl"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-[40%] left-[60%] w-56 h-56 rounded-full bg-[#F7E7CE]/30 blur-3xl"
          animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      <AnimatePresence>
        {!isOpening && (
          <motion.div
            className="relative z-10 flex flex-col items-center cursor-pointer"
            onClick={handleOpen}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            {/* Names above envelope */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#2D2D2D] tracking-wide" style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic', fontWeight: 300 }}>
                Axel & Nahomi
              </h1>
            </motion.div>

            {/* Envelope wrapper — relative container for floral decorations */}
            <div className="relative">
              {/* Floral decoration — top right */}
              <div className="absolute -top-8 -right-10 md:-top-10 md:-right-14 w-24 h-24 md:w-32 md:h-32 opacity-60 pointer-events-none z-20">
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.85">
                    <path d="M90 20 C85 35, 70 45, 55 40 C65 50, 60 65, 50 75 C55 60, 45 50, 35 45 C50 48, 60 35, 60 20 C65 35, 75 40, 90 20Z" fill="#D4A853" fillOpacity="0.3"/>
                    <path d="M100 10 C92 28, 78 38, 62 33 C70 42, 68 58, 58 68 C62 55, 52 44, 42 38 C56 41, 68 28, 68 10 C72 28, 84 35, 100 10Z" fill="#D4A0A0" fillOpacity="0.4"/>
                    <circle cx="75" cy="30" r="5" fill="#D4A853" fillOpacity="0.5"/>
                    <circle cx="60" cy="50" r="3" fill="#D4A0A0" fillOpacity="0.5"/>
                    <path d="M80 25 C78 40, 65 55, 55 65" stroke="#D4A853" strokeOpacity="0.3" strokeWidth="1" fill="none"/>
                  </g>
                </svg>
              </div>

              {/* Floral decoration — bottom left */}
              <div className="absolute -bottom-8 -left-10 md:-bottom-10 md:-left-14 w-24 h-24 md:w-32 md:h-32 opacity-60 pointer-events-none z-20" style={{ transform: 'rotate(180deg)' }}>
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g opacity="0.85">
                    <path d="M90 20 C85 35, 70 45, 55 40 C65 50, 60 65, 50 75 C55 60, 45 50, 35 45 C50 48, 60 35, 60 20 C65 35, 75 40, 90 20Z" fill="#D4A853" fillOpacity="0.3"/>
                    <path d="M100 10 C92 28, 78 38, 62 33 C70 42, 68 58, 58 68 C62 55, 52 44, 42 38 C56 41, 68 28, 68 10 C72 28, 84 35, 100 10Z" fill="#D4A0A0" fillOpacity="0.4"/>
                    <circle cx="75" cy="30" r="5" fill="#D4A853" fillOpacity="0.5"/>
                    <circle cx="60" cy="50" r="3" fill="#D4A0A0" fillOpacity="0.5"/>
                    <path d="M80 25 C78 40, 65 55, 55 65" stroke="#D4A853" strokeOpacity="0.3" strokeWidth="1" fill="none"/>
                  </g>
                </svg>
              </div>

              {/* Envelope */}
              <motion.div
                className="relative w-[320px] h-[220px] md:w-[420px] md:h-[280px]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                {/* Envelope body — solid black */}
                <div className="absolute inset-0 bg-[#000000] rounded-lg shadow-xl border border-[#D4A853]/20">
                  {/* Inner border accent */}
                  <div className="absolute inset-3 border border-[#D4A853]/15 rounded" />
                </div>

                {/* Envelope flap (triangle) */}
                <div
                  className="absolute top-0 left-0 w-full h-[50%] bg-[#111111] rounded-t-lg"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  }}
                />
                {/* Flap border line */}
                <div
                  className="absolute top-0 left-0 w-full h-[50%]"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: 'linear-gradient(180deg, transparent 95%, #D4A853 100%)',
                    opacity: 0.4,
                  }}
                />

                {/* Embossed initials on front face */}
                <div className="absolute top-[30%] left-0 right-0 flex items-center justify-center z-[5]">
                  <span
                    className="text-3xl md:text-4xl tracking-[0.15em] select-none"
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 600,
                      fontStyle: 'italic',
                      color: 'transparent',
                      textShadow: '1px 1px 1px rgba(212,168,83,0.25), -1px -1px 1px rgba(0,0,0,0.6)',
                      WebkitTextStroke: '0.5px rgba(212,168,83,0.1)',
                    }}
                  >
                    A & N
                  </span>
                </div>

                {/* Gold wax seal */}
                <motion.div
                  className="absolute top-[38%] left-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-lg flex items-center justify-center z-10"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #F0D078, #D4A853 40%, #B8860B 70%, #8B6914 100%)',
                    boxShadow: '0 4px 15px rgba(212,168,83,0.4), inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2)',
                  }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span
                    className="text-lg md:text-xl font-bold"
                    style={{
                      fontFamily: '"Cormorant Garamond", serif',
                      color: '#2D1810',
                      textShadow: '0 1px 1px rgba(255,255,255,0.2)',
                    }}
                  >
                    A&N
                  </span>
                </motion.div>

                {/* Date on envelope */}
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <p className="text-[#D4A853]/70 text-sm md:text-base tracking-[0.3em] font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    04/08/2026
                  </p>
                </div>
              </motion.div>
            </div>

            {/* "Tap to open" indicator */}
            <motion.p
              className="mt-10 text-[#6B6B6B] text-sm tracking-[0.15em] uppercase"
              style={{ fontFamily: 'Lato, sans-serif' }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Toca para abrir
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opening animation overlay */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="fixed inset-0 bg-[#FFFFFF] z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

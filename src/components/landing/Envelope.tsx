"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#FFFFF0] via-[#F7E7CE] to-[#D4A0A0]/30">
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

            {/* Envelope */}
            <motion.div
              className="relative w-[320px] h-[220px] md:w-[420px] md:h-[280px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100, damping: 20 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              {/* Envelope body */}
              <div className="absolute inset-0 bg-[#F7E7CE] rounded-lg shadow-xl border border-[#D4A853]/20">
                {/* Inner shadow/texture lines */}
                <div className="absolute inset-4 border border-[#D4A853]/10 rounded" />
              </div>

              {/* Envelope flap (triangle) */}
              <div
                className="absolute top-0 left-0 w-full h-[50%] bg-[#E8DCC8] rounded-t-lg"
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
                  opacity: 0.3,
                }}
              />

              {/* Wax seal */}
              <motion.div
                className="absolute top-[38%] left-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#800020] shadow-lg flex items-center justify-center z-10"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-6 h-6 md:w-7 md:h-7 text-[#F7E7CE] fill-[#F7E7CE]/30" />
              </motion.div>

              {/* Date on envelope */}
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-[#6B6B6B] text-sm md:text-base tracking-[0.3em] font-light" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                  04 · 08 · 2026
                </p>
              </div>
            </motion.div>

            {/* "Tap to open" indicator */}
            <motion.p
              className="mt-8 text-[#6B6B6B] text-sm tracking-[0.15em] uppercase"
              style={{ fontFamily: 'Lato, sans-serif' }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Toca para abrir ✉️
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opening animation overlay */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="fixed inset-0 bg-[#FFFFF0] z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

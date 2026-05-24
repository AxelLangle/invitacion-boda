"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { getAdminSettings } from "@/lib/supabase";

export default function HeroSection() {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const settings = getAdminSettings();
    if (settings.heroPhotoUrl) {
      setPhotoUrl(settings.heroPhotoUrl);
    }
  }, []);

  return (
    <section className="relative py-16 md:py-24 flex flex-col items-center overflow-hidden">
      {/* Decorative top element */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <p
          className="text-[#6B6B6B] text-sm tracking-[0.25em] uppercase font-light"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Nos casamos
        </p>
      </motion.div>

      {/* Names */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 20 }}
      >
        <h1
          className="text-5xl md:text-7xl lg:text-8xl text-[#2D2D2D] leading-tight"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 300,
            fontStyle: "italic",
          }}
        >
          Axel
        </h1>
        <motion.span
          className="text-[#D4A853] text-3xl md:text-4xl block my-2"
          style={{ fontFamily: '"Cormorant Garamond", serif', fontStyle: "italic" }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
        >
          &
        </motion.span>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl text-[#2D2D2D] leading-tight"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 300,
            fontStyle: "italic",
          }}
        >
          Nahomi
        </h1>
      </motion.div>

      {/* Date */}
      <motion.p
        className="text-[#6B6B6B] text-base md:text-lg tracking-[0.3em] mb-12"
        style={{ fontFamily: '"Cormorant Garamond", serif' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        04 · 08 · 2026
      </motion.p>

      {/* Photo emerging from envelope animation */}
      <motion.div
        className="relative w-[280px] h-[380px] md:w-[350px] md:h-[470px] lg:w-[400px] lg:h-[530px]"
        initial={{ y: 150, opacity: 0, scale: 0.85 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          delay: 0.5,
          type: "spring",
          stiffness: 80,
          damping: 18,
          mass: 1.2,
        }}
      >
        {/* Photo frame */}
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4A853]/20 relative">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Axel & Nahomi"
              className="w-full h-full object-cover"
            />
          ) : (
            /* Decorative placeholder */
            <div className="w-full h-full bg-gradient-to-br from-[#F7E7CE] via-[#E8DCC8] to-[#D4A0A0]/40 flex flex-col items-center justify-center p-8">
              <div className="w-20 h-20 rounded-full bg-[#D4A853]/20 flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-[#D4A853]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M6.75 7.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                  />
                </svg>
              </div>
              <p
                className="text-[#6B6B6B] text-center text-sm"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Foto configurable desde
                <br />
                el panel de administración
              </p>
            </div>
          )}

          {/* Decorative corner accents */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4A853]/40 rounded-tl" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#D4A853]/40 rounded-tr" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#D4A853]/40 rounded-bl" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4A853]/40 rounded-br" />
        </div>
      </motion.div>
    </section>
  );
}

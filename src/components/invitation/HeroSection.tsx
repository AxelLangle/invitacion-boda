"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { getAdminSettings } from "@/lib/supabase";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const settings = await getAdminSettings();
      setPhotoUrl(settings.heroPhotoUrl || null);
    }
    load();
  }, []);

  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {photoUrl ? (
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y, opacity }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${photoUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FFFFF0] via-[#FFFFF0]/50 to-transparent" />
        </motion.div>
      ) : (
        <motion.div
          className="absolute inset-0 z-0 bg-[#F7E7CE]/30 flex items-center justify-center"
          style={{ y, opacity }}
        >
          <p
            className="text-[#D4A853] text-sm tracking-widest uppercase"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            [Foto de los Novios]
          </p>
        </motion.div>
      )}

      <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        <p
          className="text-[#6B6B6B] tracking-[0.3em] uppercase text-xs md:text-sm mb-6"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Nuestra Boda
        </p>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl text-[#2D2D2D] mb-4"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 400,
          }}
        >
          Axel <span className="text-[#D4A853] italic">&</span> Nahomi
        </h1>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4A853]" />
          <p
            className="text-[#2D2D2D] tracking-widest text-lg"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            04 · 08 · 2026
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4A853]" />
        </div>
      </motion.div>
    </section>
  );
}

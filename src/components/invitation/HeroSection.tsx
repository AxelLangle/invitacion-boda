"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { getAdminSettings } from "@/lib/supabase";

export default function HeroSection() {
  const [heroPhotoUrl, setHeroPhotoUrl] = useState<string | null>(null);
  const [openUrl, setOpenUrl] = useState<string>("/images/sobre-abierto.png");

  useEffect(() => {
    async function load() {
      const settings = await getAdminSettings();
      // Si hay foto configurada en admin, la usamos; si no, usamos el sobre abierto
      setHeroPhotoUrl(settings.heroPhotoUrl || null);
      if (settings.envelopeOpenUrl) setOpenUrl(settings.envelopeOpenUrl);
    }
    load();
  }, []);

  return (
    <section className="flex flex-col items-center pt-12 pb-4 px-4">

      {/* Imagen: sobre abierto (o foto de novios si está configurada) */}
      <motion.div
        className="w-full flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {heroPhotoUrl ? (
          /* Foto de novios configurada en el admin */
          <div
            className="w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: "4/5" }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${heroPhotoUrl})` }}
            />
          </div>
        ) : (
          /* Sobre abierto como placeholder */
          <Image
            src={openUrl}
            alt="Invitación de boda — Axel & Nahomi"
            width={480}
            height={700}
            sizes="(max-width: 640px) 90vw, 480px"
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "min(90vw, 480px)",
              maxHeight: "75vh",
              objectFit: "contain",
              display: "block",
            }}
            priority
            draggable={false}
            unoptimized
          />
        )}
      </motion.div>

      {/* Texto debajo de la imagen */}
      <motion.div
        className="text-center mt-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
      >
        <p
          className="text-[#6B6B6B] tracking-[0.3em] uppercase text-xs md:text-sm mb-5"
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
          Axel <span className="text-gold-metallic italic pb-1">&</span> Nahomi
        </h1>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <p
            className="text-lg md:text-xl tracking-[0.3em] text-gold-metallic mt-2 font-medium uppercase pb-1"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            04/08/2026
          </p>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>
        <p
          className="mt-6 text-[#2D2D2D] text-lg font-medium tracking-widest uppercase"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Plot Twist: ¡Si nos vamos a casar!
        </p>
      </motion.div>

    </section>
  );
}

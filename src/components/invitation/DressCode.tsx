"use client";

import { motion } from "motion/react";
import { Ban, Sparkles, Heart } from "lucide-react";

export default function DressCode() {
  return (
    <motion.section
      className="py-16 px-4 max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      {/* Título */}
      <div className="text-center mb-10">
        <p
          className="text-[#6B6B6B] text-sm tracking-[0.25em] uppercase mb-3"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Vestimenta
        </p>
        <h2
          className="text-4xl md:text-5xl text-[#2D2D2D]"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          Dress Code
        </h2>
        <p
          className="mt-3 text-xl md:text-2xl text-gold-metallic tracking-widest pb-1"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 500,
          }}
        >
          Semi Formal
        </p>
      </div>

      <div className="glass-card p-8 md:p-10 space-y-8">

        {/* Intro */}
        <motion.div
          className="flex items-start gap-3 text-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p
            className="text-[#2D2D2D] leading-relaxed italic"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.1rem" }}
          >
            Nos encantará celebrar este día con ustedes.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#D4A853]/40 to-transparent mx-auto" />

        {/* Dos columnas: Hombres y Mujeres */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Hombres */}
          <motion.div
            className="rounded-2xl bg-white/40 border border-[#D4A853]/15 p-6 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <h3
                className="text-xl text-[#2D2D2D]"
                style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}
              >
                Hombres
              </h3>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-gold-metallic mt-0.5 shrink-0 text-lg leading-none pb-1">•</span>
                <p
                  className="text-sm text-[#4A4A4A] leading-relaxed"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Camisa y pantalón de vestir o un atuendo semi formal.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold-metallic mt-0.5 shrink-0 text-lg leading-none pb-1">•</span>
                <p
                  className="text-sm text-[#4A4A4A] leading-relaxed"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Evitar asistir completamente de negro.
                </p>
              </li>
            </ul>

            {/* Muestra de color prohibido */}
            <div className="flex items-center gap-2 pt-1">
              <div className="w-7 h-7 rounded-full bg-[#0a0a0a] border border-gray-600 shadow-inner relative flex items-center justify-center">
                <Ban className="w-4 h-4 text-red-400 absolute" />
              </div>
              <p
                className="text-xs text-[#6B6B6B] uppercase tracking-wider"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                No todo negro
              </p>
            </div>
          </motion.div>

          {/* Mujeres */}
          <motion.div
            className="rounded-2xl bg-white/40 border border-[#D4A853]/15 p-6 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <h3
                className="text-xl text-[#2D2D2D]"
                style={{ fontFamily: '"Cormorant Garamond", serif', fontWeight: 600 }}
              >
                Mujeres
              </h3>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-[#D4A853] mt-0.5 shrink-0 text-lg leading-none">•</span>
                <p
                  className="text-sm text-[#4A4A4A] leading-relaxed"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Vestido, conjunto o atuendo semi formal.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D4A853] mt-0.5 shrink-0 text-lg leading-none">•</span>
                <p
                  className="text-sm text-[#4A4A4A] leading-relaxed"
                  style={{ fontFamily: "Lato, sans-serif" }}
                >
                  Evitar prendas en color blanco o tonos muy claros similares al blanco (marfil, ivory, crema muy clara, etc.).
                </p>
              </li>
            </ul>

            {/* Paleta de colores prohibidos */}
            <div className="flex items-center gap-2 pt-1 bg-black/5 p-2 rounded-lg inline-flex">
              {["#FFFFFF", "#FFFFF0", "#FFFFF5", "#F8F8F0"].map((color, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border border-gray-300 shadow-inner relative flex items-center justify-center"
                  style={{ backgroundColor: color }}
                >
                  {i === 0 && <Ban className="w-4 h-4 text-red-400 absolute" />}
                </div>
              ))}
              <p
                className="text-xs text-[#6B6B6B] uppercase tracking-wider"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                No blanco / marfil
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#D4A853]/40 to-transparent mx-auto" />

        {/* Cierre */}
        <motion.div
          className="flex items-center justify-center gap-3 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p
            className="text-[#6B6B6B] italic leading-relaxed"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: "1.05rem" }}
          >
            Gracias por acompañarnos en este día tan especial.
          </p>
        </motion.div>

      </div>
    </motion.section>
  );
}

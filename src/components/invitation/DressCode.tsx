"use client";

import { motion } from "motion/react";
import { Ban } from "lucide-react";

export default function DressCode() {
  return (
    <motion.section
      className="py-16 px-4 max-w-lg mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
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
      </div>

      <div className="glass-card p-8 md:p-10">
        {/* Color restrictions */}
        <div className="flex justify-center gap-8 md:gap-12 mb-8">
          {/* No all-black */}
          <motion.div
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#1a1a1a] shadow-lg flex items-center justify-center">
              <Ban className="w-10 h-10 md:w-12 md:h-12 text-red-500/80" />
            </div>
            <p
              className="text-xs text-[#6B6B6B] tracking-wide uppercase"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              No todo negro
            </p>
          </motion.div>

          {/* No all-white */}
          <motion.div
            className="flex flex-col items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border-2 border-gray-200 shadow-lg flex items-center justify-center">
              <Ban className="w-10 h-10 md:w-12 md:h-12 text-red-500/80" />
            </div>
            <p
              className="text-xs text-[#6B6B6B] tracking-wide uppercase"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              No todo blanco
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#D4A853]/40 to-transparent mx-auto mb-8" />

        {/* Quote */}
        <motion.p
          className="text-center text-lg md:text-xl text-[#2D2D2D] leading-relaxed"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontStyle: "italic",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          &ldquo;No se exige formalidad.&rdquo;
        </motion.p>
      </div>
    </motion.section>
  );
}

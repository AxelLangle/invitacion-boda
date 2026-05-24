"use client";

import { motion } from "motion/react";
import { Gift, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminSettings } from "@/lib/supabase";

export default function GiftsSection() {
  const [giftUrl, setGiftUrl] = useState("");

  useEffect(() => {
    const settings = getAdminSettings();
    if (settings.giftListUrl) {
      setGiftUrl(settings.giftListUrl);
    }
  }, []);

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
          Mesa de regalos
        </p>
        <h2
          className="text-4xl md:text-5xl text-[#2D2D2D]"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          Lista de Regalos
        </h2>
      </div>

      <div className="glass-card p-8 md:p-10 text-center">
        <motion.div
          className="w-16 h-16 rounded-full bg-[#D4A853]/10 flex items-center justify-center mx-auto mb-6"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Gift className="w-7 h-7 text-[#D4A853]" />
        </motion.div>

        <p
          className="text-[#6B6B6B] text-sm mb-6 leading-relaxed"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo,
          aquí encontrarás algunas ideas.
        </p>

        {giftUrl ? (
          <motion.a
            href={giftUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4A853] text-[#FFFFF0] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm tracking-[0.1em] uppercase"
            style={{ fontFamily: "Lato, sans-serif" }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver lista de regalos
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        ) : (
          <p
            className="text-[#D4A853] text-sm italic"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            Próximamente...
          </p>
        )}
      </div>
    </motion.section>
  );
}

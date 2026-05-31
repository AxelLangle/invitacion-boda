"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Gift, ExternalLink } from "lucide-react";
import { getAdminSettings } from "@/lib/supabase";

export default function GiftsSection() {
  const [giftUrl, setGiftUrl] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const settings = await getAdminSettings();
      setGiftUrl(settings.giftListUrl || null);
    }
    load();
  }, []);

  return (
    <motion.section
      className="py-16 px-4 max-w-2xl mx-auto text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-6 flex justify-center">
        <div className="w-16 h-16 rounded-full bg-[#D4A853]/10 flex items-center justify-center">
          <Gift className="w-8 h-8 text-[#D4A853]" />
        </div>
      </div>

      <h2
        className="text-4xl text-[#2D2D2D] mb-4"
        style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 400,
          fontStyle: "italic",
        }}
      >
        Mesa de Regalos
      </h2>

      <p
        className="text-[#6B6B6B] mb-8 leading-relaxed max-w-md mx-auto"
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        Su presencia es nuestro mejor regalo. Sin embargo, si desean tener un
        detalle con nosotros, pueden encontrar nuestra mesa de regalos en el
        siguiente enlace.
      </p>

      {giftUrl ? (
        <motion.a
          href={giftUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white tracking-widest uppercase text-sm shadow-xl hover:bg-black/90 transition-colors"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Ver Mesa de Regalos
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      ) : (
        <button
          disabled
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gray-200 text-gray-500 tracking-widest uppercase text-sm cursor-not-allowed"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Próximamente
        </button>
      )}
    </motion.section>
  );
}

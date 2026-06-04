"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { getAdminSettings } from "@/lib/supabase";

export default function SecondaryPhoto() {
  const [photoUrl, setPhotoUrl] = useState<string>("/images/foto-secundaria.jpeg");

  useEffect(() => {
    async function load() {
      const settings = await getAdminSettings();
      if (settings.secondaryPhotoUrl) {
        setPhotoUrl(settings.secondaryPhotoUrl);
      }
    }
    load();
  }, []);

  return (
    <section className="py-16 px-4">
      <motion.div
        className="max-w-2xl mx-auto relative"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="absolute -inset-3 border-2 border-[#2D2D2D] rounded-t-full rounded-b-xl" />

        <div className="relative aspect-[3/4] md:aspect-square overflow-hidden rounded-t-full rounded-b-xl shadow-2xl">
            <motion.div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${photoUrl})` }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

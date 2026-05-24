"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { getAdminSettings } from "@/lib/supabase";

export default function SecondaryPhoto() {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const settings = getAdminSettings();
    if (settings.secondaryPhotoUrl) {
      setPhotoUrl(settings.secondaryPhotoUrl);
    }
  }, []);

  return (
    <motion.section
      className="py-10 flex justify-center px-4"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="relative w-full max-w-[340px] md:max-w-[420px]">
        {/* Decorative frame */}
        <div className="absolute -inset-3 border border-[#D4A853]/20 rounded-3xl" />
        <div className="absolute -inset-1.5 border border-[#D4A853]/10 rounded-2xl" />

        {/* Photo container */}
        <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Axel & Nahomi"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#E8DCC8] via-[#F7E7CE] to-[#D4A0A0]/30 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#D4A853]/15 flex items-center justify-center mb-3">
                <svg
                  className="w-8 h-8 text-[#D4A853]/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                  />
                </svg>
              </div>
              <p
                className="text-[#6B6B6B]/60 text-xs text-center px-6"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Foto configurable desde el panel de administración
              </p>
            </div>
          )}
        </div>

        {/* Decorative gold corner accents outside the photo */}
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#D4A853]/50 rounded-tl-lg" />
        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#D4A853]/50 rounded-tr-lg" />
        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[#D4A853]/50 rounded-bl-lg" />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#D4A853]/50 rounded-br-lg" />
      </div>
    </motion.section>
  );
}

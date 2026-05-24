"use client";

import { motion } from "motion/react";

interface SectionDividerProps {
  icon?: string;
}

export default function SectionDivider({ icon = "✦" }: SectionDividerProps) {
  return (
    <motion.div
      className="flex items-center justify-center gap-4 py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-[#D4A853]/60" />
      <span className="text-[#D4A853] text-lg">{icon}</span>
      <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-[#D4A853]/60" />
    </motion.div>
  );
}

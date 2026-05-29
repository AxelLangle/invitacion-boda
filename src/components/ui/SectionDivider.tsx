"use client";

import { motion } from "motion/react";

export default function SectionDivider() {
  return (
    <motion.div
      className="flex items-center justify-center py-12 px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-[#D4A853]/50 to-transparent" />
    </motion.div>
  );
}

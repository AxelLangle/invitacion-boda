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
      <div className="w-full max-w-xs h-[2px] bg-gradient-to-r from-transparent via-[#2D2D2D] to-transparent" />
    </motion.div>
  );
}

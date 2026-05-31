"use client";

import { motion } from "motion/react";
import { CalendarPlus } from "lucide-react";
import { getGoogleCalendarUrl } from "@/lib/calendar";

export default function CalendarButton() {
  const calendarUrl = getGoogleCalendarUrl();

  return (
    <motion.section
      className="py-8 flex justify-center px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.a
        href={calendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 no-underline"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="transition-transform duration-300 group-hover:rotate-12"
        >
          <CalendarPlus className="w-5 h-5" />
        </motion.div>
        <span
          className="text-sm md:text-base tracking-[0.1em] uppercase font-light"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Añádelo a tu calendario
        </span>
      </motion.a>
    </motion.section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CalendarPlus, ChevronDown } from "lucide-react";
import { getGoogleCalendarUrl, getOutlookCalendarUrl, getAppleCalendarUrl } from "@/lib/calendar";

export default function CalendarButton() {
  const [isOpen, setIsOpen] = useState(false);

  const calendarOptions = [
    {
      label: "Google Calendar",
      url: getGoogleCalendarUrl(),
      icon: "📅",
    },
    {
      label: "Outlook Calendar",
      url: getOutlookCalendarUrl(),
      icon: "📆",
    },
    {
      label: "Apple / iOS Calendar",
      url: getAppleCalendarUrl(),
      icon: "🍎",
    },
  ];

  return (
    <motion.section
      className="py-8 flex justify-center px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="group flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all duration-300"
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
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 8, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute left-1/2 -translate-x-1/2 mt-2 w-full min-w-[240px] bg-white rounded-xl shadow-xl shadow-black/10 border border-[#E8DCC8] overflow-hidden z-50"
            >
              {calendarOptions.map((option, index) => (
                <motion.a
                  key={option.label}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-5 py-3.5 text-[#2D2D2D] hover:bg-[#F7E7CE]/40 transition-colors no-underline ${
                    index < calendarOptions.length - 1 ? "border-b border-[#E8DCC8]/50" : ""
                  }`}
                  style={{ fontFamily: "Lato, sans-serif" }}
                  whileHover={{ x: 4 }}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg">{option.icon}</span>
                  <span className="text-sm tracking-wide">{option.label}</span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

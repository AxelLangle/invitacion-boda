"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  // Wedding: August 4, 2026, 11:30 AM Mexico City time
  const weddingDate = new Date("2026-08-04T11:30:00-06:00");
  const now = new Date();
  const diff = weddingDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function AnimatedDigit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[70px] h-[85px] md:w-[90px] md:h-[105px] glass-card overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            className="absolute inset-0 flex items-center justify-center text-3xl md:text-4xl text-[#2D2D2D] tabular-nums"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 600,
            }}
            initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#6B6B6B]"
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <section className="py-16 px-4">
        <div className="text-center">
          <p className="text-[#6B6B6B] text-sm">Cargando...</p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="py-16 px-4"
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
          Cuenta regresiva
        </p>
        <h2
          className="text-4xl md:text-5xl text-[#2D2D2D]"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          Faltan...
        </h2>
      </div>

      <div className="flex justify-center items-start gap-2 md:gap-4">
        <AnimatedDigit value={timeLeft.days} label="Días" />
        <span
          className="text-2xl md:text-3xl text-gold-metallic mt-6 md:mt-8"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          :
        </span>
        <AnimatedDigit value={timeLeft.hours} label="Horas" />
        <span
          className="text-2xl md:text-3xl text-gold-metallic mt-6 md:mt-8"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          :
        </span>
        <AnimatedDigit value={timeLeft.minutes} label="Min" />
        <span
          className="text-2xl md:text-3xl text-gold-metallic mt-6 md:mt-8"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          :
        </span>
        <AnimatedDigit value={timeLeft.seconds} label="Seg" />
      </div>
    </motion.section>
  );
}

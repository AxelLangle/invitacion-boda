"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Envelope() {
  const [isOpening, setIsOpening] = useState(false);
  const [showOpen, setShowOpen] = useState(false);
  const router = useRouter();

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Activar el fade blanco
    setTimeout(() => {
      setShowOpen(true);
    }, 200);

    // Navegar a la invitación principal
    setTimeout(() => {
      router.push("/invitacion");
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white px-4">

      {/* Estado: Sobre cerrado */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            key="closed"
            className="flex flex-col items-center cursor-pointer select-none"
            onClick={handleOpen}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.35, ease: "easeIn" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.35, ease: "easeOut" } }}
            >
              <Image
                src="/images/sobre-cerrado.png"
                alt="Sobre cerrado — Axel & Nahomi"
                width={480}
                height={560}
                sizes="(max-width: 640px) 90vw, 480px"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "min(90vw, 480px)",
                  maxHeight: "70vh",
                  objectFit: "contain",
                  display: "block",
                }}
                priority
                draggable={false}
              />
            </motion.div>

            <motion.p
              className="mt-6 text-[#6B6B6B] text-sm tracking-[0.22em] uppercase"
              style={{ fontFamily: "Lato, sans-serif" }}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Toca para abrir
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fade blanco final antes de redirigir */}
      <AnimatePresence>
        {showOpen && (
          <motion.div
            key="fade"
            className="fixed inset-0 bg-white z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

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

    // Mostrar sobre abierto al medio de la animación
    setTimeout(() => {
      setShowOpen(true);
    }, 400);

    // Navegar a la invitación
    setTimeout(() => {
      router.push("/invitacion");
    }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white">

      <AnimatePresence>
        {!isOpening && (
          <motion.div
            key="closed-state"
            className="relative z-10 flex flex-col items-center cursor-pointer select-none"
            onClick={handleOpen}
            exit={{ opacity: 0, scale: 0.9, y: -40 }}
            transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            {/* Sobre cerrado */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
              className="relative"
              style={{ width: "min(90vw, 400px)" }}
            >
              <Image
                src="/images/sobre-cerrado.png"
                alt="Sobre cerrado — Axel & Nahomi"
                width={480}
                height={560}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
                priority
                draggable={false}
              />
            </motion.div>

            {/* "Toca para abrir" */}
            <motion.p
              className="mt-8 text-[#6B6B6B] text-sm tracking-[0.2em] uppercase"
              style={{ fontFamily: "Lato, sans-serif" }}
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              Toca para abrir
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sobre abierto — aparece al hacer clic */}
      <AnimatePresence>
        {showOpen && (
          <motion.div
            key="open-state"
            className="fixed inset-0 flex items-center justify-center z-40 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1.05, opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{ width: "min(90vw, 400px)" }}
            >
              <Image
                src="/images/sobre-abierto.png"
                alt="Sobre abierto — Axel & Nahomi"
                width={480}
                height={700}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
                priority
                draggable={false}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fade-out blanco final antes de redirigir */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            key="fade-overlay"
            className="fixed inset-0 bg-white z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: showOpen ? 1 : 0 }}
            transition={{ delay: showOpen ? 0.9 : 0, duration: 0.6 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

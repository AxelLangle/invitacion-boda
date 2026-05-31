"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, UserPlus, CheckCircle2, AlertCircle, PartyPopper } from "lucide-react";
import { findGuest, confirmAttendance } from "@/lib/guests";
import { Guest, EventType } from "@/types";

type Step = "lookup" | "plusone" | "events" | "success" | "not-found";

export default function RSVPForm() {
  const [step, setStep] = useState<Step>("lookup");
  const [name, setName] = useState("");
  const [guest, setGuest] = useState<Guest | null>(null);
  const [companion, setCompanion] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<EventType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const slideVariants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
  };

  const handleLookup = async () => {
    setIsSearching(true);
    const found = await findGuest(name.trim());
    setIsSearching(false);
    
    if (found) {
      setGuest(found);
      if (found.plusOne) {
        setStep("plusone");
      } else {
        setStep("events");
      }
    } else {
      setStep("not-found");
    }
  };

  const handlePlusOneNext = () => {
    setStep("events");
  };

  const toggleEvent = (event: EventType) => {
    setSelectedEvents((prev) =>
      prev.includes(event)
        ? prev.filter((e) => e !== event)
        : [...prev, event]
    );
  };

  const handleSubmit = async () => {
    if (!guest || selectedEvents.length === 0) return;
    setIsSubmitting(true);

    await confirmAttendance(guest.id, selectedEvents, companion || undefined);
    
    setIsSubmitting(false);
    setStep("success");
  };

  const handleReset = () => {
    setStep("lookup");
    setName("");
    setGuest(null);
    setCompanion("");
    setSelectedEvents([]);
  };

  const eventLabels: Record<EventType, { label: string; icon: string }> = {
    civil: { label: "Boda Civil — 11:30 AM", icon: "📜" },
    buffet: { label: "Comida (Sumo Buffet) — 12:30 PM", icon: "🍽️" },
    fiesta: { label: "Fiesta — 10:00 PM", icon: "🎉" },
  };

  return (
    <motion.section
      className="py-16 px-4 max-w-md mx-auto"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      id="rsvp"
    >
      <div className="text-center mb-10">
        <p
          className="text-[#6B6B6B] text-sm tracking-[0.25em] uppercase mb-3"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          ¿Nos acompañas?
        </p>
        <h2
          className="text-4xl md:text-5xl text-[#2D2D2D]"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          Confirmar Asistencia
        </h2>
      </div>

      <div className="glass-card p-6 md:p-8 overflow-hidden min-h-[280px]">
        <AnimatePresence mode="wait">
          {/* STEP 1: Name Lookup */}
          {step === "lookup" && (
            <motion.div
              key="lookup"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <label
                className="block text-sm text-[#2D2D2D] mb-2 tracking-wide uppercase"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Tu nombre completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#D4A853]/30 text-[#2D2D2D] placeholder:text-[#6B6B6B]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 focus:border-[#D4A853]/60 transition-all duration-300"
                style={{ fontFamily: "Lato, sans-serif" }}
                onKeyDown={(e) => e.key === "Enter" && name.trim() && handleLookup()}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLookup}
                disabled={!name.trim() || isSearching}
                className="w-full mt-5 py-3 rounded-xl bg-black text-white tracking-wider uppercase text-sm shadow-lg hover:bg-black/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                {isSearching ? (
                  <motion.div
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Buscar mi invitación
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* STEP: Not Found */}
          {step === "not-found" && (
            <motion.div
              key="not-found"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="text-center py-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <AlertCircle className="w-12 h-12 text-[#800020]/60 mx-auto mb-4" />
              </motion.div>
              <h3
                className="text-xl text-[#2D2D2D] mb-2"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 600,
                }}
              >
                No encontramos tu nombre
              </h3>
              <p
                className="text-sm text-[#6B6B6B] mb-6"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Verifica que esté escrito correctamente o contacta a los novios.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReset}
                className="px-6 py-3 rounded-xl border border-[#D4A853]/40 text-[#2D2D2D] text-sm tracking-wider uppercase hover:bg-[#D4A853]/10 transition-colors"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Intentar de nuevo
              </motion.button>
            </motion.div>
          )}

          {/* STEP 2: Plus One companion name */}
          {step === "plusone" && (
            <motion.div
              key="plusone"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <div className="text-center mb-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <UserPlus className="w-10 h-10 text-[#D4A853] mx-auto mb-3" />
                </motion.div>
                <p
                  className="text-lg text-[#2D2D2D]"
                  style={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontStyle: "italic",
                  }}
                >
                  ¡Hola, {guest?.fullName}! Tienes un +1
                </p>
              </div>

              <label
                className="block text-sm text-[#2D2D2D] mb-2 tracking-wide uppercase"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Nombre de tu acompañante
              </label>
              <input
                type="text"
                value={companion}
                onChange={(e) => setCompanion(e.target.value)}
                placeholder="Nombre completo"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#D4A853]/30 text-[#2D2D2D] placeholder:text-[#6B6B6B]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all duration-300"
                style={{ fontFamily: "Lato, sans-serif" }}
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlusOneNext}
                className="w-full mt-5 py-3 rounded-xl bg-black text-white tracking-wider uppercase text-sm shadow-lg hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Continuar
              </motion.button>
            </motion.div>
          )}

          {/* STEP 3: Event selection */}
          {step === "events" && (
            <motion.div
              key="events"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <p
                className="text-center text-lg text-[#2D2D2D] mb-6"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontStyle: "italic",
                }}
              >
                ¿A cuáles eventos asistirás?
              </p>

              <div className="space-y-3">
                {(["civil", "buffet", "fiesta"] as EventType[]).map((event) => (
                  <motion.button
                    key={event}
                    onClick={() => toggleEvent(event)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3 ${
                      selectedEvents.includes(event)
                        ? "border-[#D4A853] bg-[#D4A853]/10"
                        : "border-[#E8DCC8] bg-white/30 hover:border-[#D4A853]/40"
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className="text-xl">{eventLabels[event].icon}</span>
                    <span
                      className="text-sm text-[#2D2D2D]"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      {eventLabels[event].label}
                    </span>
                    {selectedEvents.includes(event) && (
                      <CheckCircle2 className="w-5 h-5 text-[#D4A853] ml-auto" />
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={selectedEvents.length === 0 || isSubmitting}
                className="w-full mt-6 py-3 rounded-xl bg-black text-white tracking-wider uppercase text-sm shadow-lg hover:bg-black/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                {isSubmitting ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Confirmar Asistencia
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* STEP 4: Success */}
          {step === "success" && (
            <motion.div
              key="success"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="text-5xl mb-4"
              >
                <PartyPopper className="w-14 h-14 text-[#D4A853] mx-auto" />
              </motion.div>
              <h3
                className="text-2xl text-[#2D2D2D] mb-2"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 600,
                }}
              >
                ¡Gracias por confirmar!
              </h3>
              <p
                className="text-sm text-[#6B6B6B] mb-6"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Estamos emocionados de celebrar contigo, {guest?.fullName}.
                {companion && (
                  <>
                    <br />Y con tu acompañante: <strong>{companion}</strong>
                  </>
                )}
              </p>
              <p
                className="text-xs text-[#6B6B6B]/60"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Eventos confirmados:{" "}
                {selectedEvents
                  .map((e) => eventLabels[e].label.split(" —")[0])
                  .join(", ")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Users, CheckCircle2, Clock, UserCheck } from "lucide-react";
import { getAllGuests, getGuestStats } from "@/lib/guests";
import { Guest, EventType } from "@/types";

const eventLabels: Record<EventType, string> = {
  civil: "Civil",
  buffet: "Buffet",
  fiesta: "Fiesta",
};

export default function RSVPTable() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [stats, setStats] = useState({ total: 0, confirmed: 0, pending: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const [fetchedGuests, fetchedStats] = await Promise.all([
        getAllGuests(),
        getGuestStats()
      ]);
      setGuests(fetchedGuests);
      setStats(fetchedStats);
      setIsLoading(false);
    }
    loadData();
  }, []);

  return (
    <motion.div
      className="glass-card p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 0.1,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-5 h-5 text-[#D4A853]" />
        <h2
          className="text-2xl text-[#2D2D2D]"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 600,
          }}
        >
          Lista de Invitados
        </h2>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-[#6B6B6B] flex items-center justify-center gap-2">
          <motion.div
            className="w-5 h-5 border-2 border-[#D4A853]/30 border-t-[#D4A853] rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          Cargando invitados...
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 rounded-xl bg-white/40 border border-[#D4A853]/10">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="w-4 h-4 text-[#6B6B6B]" />
              </div>
              <p
                className="text-2xl text-[#2D2D2D]"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 700,
                }}
              >
                {stats.total}
              </p>
              <p
                className="text-xs text-[#6B6B6B] uppercase tracking-wider"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Total
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-green-50/60 border border-green-200/30">
              <div className="flex items-center justify-center gap-1 mb-1">
                <UserCheck className="w-4 h-4 text-green-600" />
              </div>
              <p
                className="text-2xl text-green-700"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 700,
                }}
              >
                {stats.confirmed}
              </p>
              <p
                className="text-xs text-green-600 uppercase tracking-wider"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Confirmados
              </p>
            </div>
            <div className="text-center p-4 rounded-xl bg-amber-50/60 border border-amber-200/30">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <p
                className="text-2xl text-amber-700"
                style={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontWeight: 700,
                }}
              >
                {stats.pending}
              </p>
              <p
                className="text-xs text-amber-600 uppercase tracking-wider"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Pendientes
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-[#D4A853]/10">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F7E7CE]/50">
                  <th
                    className="px-4 py-3 text-xs uppercase tracking-wider text-[#6B6B6B]"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    Nombre
                  </th>
                  <th
                    className="px-4 py-3 text-xs uppercase tracking-wider text-[#6B6B6B]"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    +1
                  </th>
                  <th
                    className="px-4 py-3 text-xs uppercase tracking-wider text-[#6B6B6B]"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    Acompañante
                  </th>
                  <th
                    className="px-4 py-3 text-xs uppercase tracking-wider text-[#6B6B6B]"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    Eventos
                  </th>
                  <th
                    className="px-4 py-3 text-xs uppercase tracking-wider text-[#6B6B6B]"
                    style={{ fontFamily: "Lato, sans-serif" }}
                  >
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4A853]/10">
                {guests.map((guest, index) => (
                  <tr
                    key={guest.id}
                    className={`${
                      index % 2 === 0 ? "bg-white/20" : "bg-[#F7E7CE]/10"
                    } hover:bg-[#D4A853]/5 transition-colors`}
                  >
                    <td
                      className="px-4 py-3 text-sm text-[#2D2D2D]"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      {guest.fullName}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      {guest.plusOne ? (
                        <span className="text-[#D4A853]">✓</span>
                      ) : (
                        <span className="text-[#6B6B6B]/40">—</span>
                      )}
                    </td>
                    <td
                      className="px-4 py-3 text-sm text-[#6B6B6B]"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      {guest.companion || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {guest.attendingEvents && guest.attendingEvents.length > 0 ? (
                          guest.attendingEvents.map((event) => (
                            <span
                              key={event}
                              className="inline-block text-xs px-2 py-0.5 rounded-full bg-[#D4A853]/15 text-[#D4A853]"
                              style={{ fontFamily: "Lato, sans-serif" }}
                            >
                              {eventLabels[event]}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-[#6B6B6B]/40">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {guest.confirmed ? (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                          <CheckCircle2 className="w-3 h-3" />
                          Confirmado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-gray-100 text-[#6B6B6B]">
                          <Clock className="w-3 h-3" />
                          Pendiente
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </motion.div>
  );
}

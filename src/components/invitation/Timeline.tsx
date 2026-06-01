"use client";

import { motion } from "motion/react";
import { MapPin, AlertCircle } from "lucide-react";

interface TimelineItem {
  id: string;
  title: string;
  time: string;
  locationName: string;
  coordinates: string;
  mapsUrl: string;
  icon: string;
  note?: string;
}

const events: TimelineItem[] = [
  {
    id: "civil",
    title: "Boda Civil",
    time: "11:30 AM",
    locationName: "Ceremonia Civil",
    coordinates: "19°48'36.3\"N 99°02'39.2\"W",
    mapsUrl: "https://www.google.com/maps?q=19.810083,-99.044222",
    icon: "📜",
  },
  {
    id: "buffet",
    title: "Comida",
    time: "12:30 PM",
    locationName: "Sumo Buffet (Zumpango)",
    coordinates: "19°48'19.5\"N 99°06'25.8\"W",
    mapsUrl: "https://www.google.com/maps?q=19.805417,-99.107167",
    icon: "🍽️",
    note: "El consumo de cada invitado corre por su propia cuenta.",
  },
  {
    id: "fiesta",
    title: "Fiesta",
    time: "10:00 PM",
    locationName: "Lugar de la Fiesta",
    coordinates: "19°48'12.7\"N 99°03'36.1\"W",
    mapsUrl: "https://www.google.com/maps?q=19.803528,-99.060028",
    icon: "🎉",
    note: "No habrá comida, solo será pastel y fiesta.",
  },
];

export default function Timeline() {
  return (
    <section className="py-16 px-4 max-w-2xl mx-auto">
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p
          className="text-[#6B6B6B] text-sm tracking-[0.25em] uppercase mb-3"
          style={{ fontFamily: "var(--font-timeline), Montserrat, sans-serif" }}
        >
          Itinerario del día
        </p>
        <h2
          className="text-4xl md:text-5xl text-[#2D2D2D]"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 400,
            fontStyle: "italic",
          }}
        >
          Nuestro Gran Día
        </h2>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-7 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4A853]/10 via-[#D4A853]/40 to-[#D4A853]/10" />

        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className="relative flex items-start mb-10 last:mb-0 ml-16 md:ml-20"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              delay: index * 0.2,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            {/* Timeline marker */}
            <motion.span
              className="absolute -left-[52px] md:-left-[56px] flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-[#FFFFF0] border-2 border-[#D4A853]/30 shadow-md text-xl md:text-2xl z-10"
              whileHover={{ scale: 1.1, borderColor: "#D4A853" }}
              transition={{ duration: 0.2 }}
            >
              {event.icon}
            </motion.span>

            {/* Content card */}
            <div className="glass-card p-5 md:p-6 w-full hover:shadow-lg transition-shadow duration-300">
              {/* Time badge */}
              <span
                className="inline-block text-xs font-semibold text-gold-metallic tracking-[0.2em] uppercase mb-2 bg-[#D4A853]/10 px-3 py-1 rounded-full pb-1"
                style={{ fontFamily: "var(--font-timeline), Montserrat, sans-serif" }}
              >
                {event.time}
              </span>

              {/* Title */}
              <h3
                className="text-xl md:text-2xl text-[#2D2D2D] mb-2"
                style={{
                  fontFamily: "var(--font-timeline), Montserrat, sans-serif",
                  fontWeight: 600,
                }}
              >
                {event.title}
              </h3>

              {/* Location */}
              <a
                href={event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-[#6B6B6B] hover:text-[#d4af37] transition-colors duration-200 mb-1"
                style={{ fontFamily: "var(--font-timeline), Montserrat, sans-serif" }}
              >
                <MapPin className="w-3.5 h-3.5" />
                {event.locationName}
              </a>

              <p
                className="text-xs text-[#6B6B6B]/60 mb-3"
                style={{ fontFamily: "var(--font-timeline), Montserrat, sans-serif" }}
              >
                {event.coordinates}
              </p>

              {/* Important note */}
              {event.note && (
                <motion.div
                  className="mt-3 p-3 rounded-xl bg-[#800020]/5 border border-[#800020]/15"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.2 }}
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-[#800020] mt-0.5 flex-shrink-0" />
                    <p
                      className="text-xs md:text-sm text-[#800020]/80 leading-relaxed"
                      style={{ fontFamily: "var(--font-timeline), Montserrat, sans-serif" }}
                    >
                      {event.note}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Pause, Music } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/song.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Browser may block autoplay — user interaction already happened via click
      });
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.section
      className="py-10 flex flex-col items-center gap-5"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-2 text-[#6B6B6B]">
        <Music className="w-4 h-4" />
        <p
          className="text-sm tracking-[0.1em]"
          style={{ fontFamily: "Lato, sans-serif" }}
        >
          Dale play para escuchar nuestra canción
        </p>
      </div>

      <motion.button
        onClick={togglePlay}
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-black text-white shadow-lg shadow-black/20 flex items-center justify-center hover:shadow-xl hover:shadow-black/30 transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {/* Rotating ring when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/20 border-t-white"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        )}

        {/* Pulse effect when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full bg-black/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {isPlaying ? (
          <Pause className="w-6 h-6 md:w-7 md:h-7 relative z-10" />
        ) : (
          <Play className="w-6 h-6 md:w-7 md:h-7 relative z-10 ml-1" />
        )}
      </motion.button>

      {isPlaying && (
        <motion.div
          className="flex items-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-[#D4A853] rounded-full"
              animate={{ height: [4, 16, 4] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}

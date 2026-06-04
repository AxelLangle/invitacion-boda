"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Play, Pause, Shuffle, SkipBack, SkipForward, Repeat } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/audio/song.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    const updateProgress = () => {
      if (audioRef.current && audioRef.current.duration) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    };

    audioRef.current.addEventListener("timeupdate", updateProgress);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
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
      className="py-12 flex flex-col items-center gap-6 w-full max-w-xs mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Barra de progreso interactiva/visual */}
      <div className="w-full relative py-2 mb-2">
        <div className="w-full h-1 bg-[#2D2D2D]/20 rounded-full relative">
          <div 
            className="absolute top-0 left-0 h-full bg-[#2D2D2D] rounded-full"
            style={{ width: `${progress}%` }}
          />
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 bg-[#2D2D2D] rounded-full shadow-md"
            style={{ left: `calc(${progress}% - 7px)` }}
          />
        </div>
      </div>

      {/* Controles */}
      <div className="flex items-center justify-between w-full text-[#2D2D2D]">
        <button aria-label="Aleatorio" className="hover:opacity-60 transition-opacity">
          <Shuffle className="w-5 h-5" />
        </button>

        <button aria-label="Anterior" className="hover:opacity-60 transition-opacity">
          <SkipBack className="w-6 h-6 fill-current" />
        </button>

        {/* Botón de Play Principal */}
        <motion.button
          onClick={togglePlay}
          className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#2D2D2D] text-white shadow-lg flex items-center justify-center hover:bg-black transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 md:w-7 md:h-7 relative z-10 fill-current" />
          ) : (
            <Play className="w-6 h-6 md:w-7 md:h-7 relative z-10 ml-1 fill-current" />
          )}
        </motion.button>

        <button aria-label="Siguiente" className="hover:opacity-60 transition-opacity">
          <SkipForward className="w-6 h-6 fill-current" />
        </button>

        <button aria-label="Repetir" className="hover:opacity-60 transition-opacity">
          <Repeat className="w-5 h-5" />
        </button>
      </div>

    </motion.section>
  );
}

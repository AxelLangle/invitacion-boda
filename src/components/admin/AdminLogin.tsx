"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Lock, LogIn, AlertCircle } from "lucide-react";

const ADMIN_PASSWORD = "axelnahomi2026";

interface AdminLoginProps {
  onAuthenticated: () => void;
}

export default function AdminLogin({ onAuthenticated }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onAuthenticated();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFFF0] via-[#F7E7CE] to-[#E8DCC8] px-4">
      <motion.div
        className="w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#800020]/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-[#800020]" />
          </div>
          <h1
            className="text-3xl text-[#2D2D2D] mb-2"
            style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontWeight: 600,
            }}
          >
            Panel de Administración
          </h1>
          <p
            className="text-sm text-[#6B6B6B]"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Ingresa la contraseña para acceder
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass-card p-6 md:p-8"
          animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          <label
            className="block text-sm text-[#2D2D2D] mb-2 tracking-wide uppercase"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#D4A853]/30 text-[#2D2D2D] placeholder:text-[#6B6B6B]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all duration-300"
            style={{ fontFamily: "Lato, sans-serif" }}
            autoFocus
          />

          {error && (
            <motion.div
              className="flex items-center gap-2 mt-3 text-[#800020]"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-4 h-4" />
              <span
                className="text-sm"
                style={{ fontFamily: "Lato, sans-serif" }}
              >
                Contraseña incorrecta
              </span>
            </motion.div>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-5 py-3 rounded-xl bg-[#800020] text-white tracking-wider uppercase text-sm shadow-lg hover:bg-[#800020]/90 transition-colors flex items-center justify-center gap-2"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            <LogIn className="w-4 h-4" />
            Entrar
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}

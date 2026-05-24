"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Save, CheckCircle2, Image, Gift, Link } from "lucide-react";
import { getAdminSettings, saveAdminSettings } from "@/lib/supabase";
import { AdminSettings } from "@/types";

export default function SettingsPanel() {
  const [settings, setSettings] = useState<AdminSettings>({
    heroPhotoUrl: "",
    secondaryPhotoUrl: "",
    giftListUrl: "",
  });
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const current = await getAdminSettings();
      setSettings(current);
      setIsLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    await saveAdminSettings(settings);
    setIsLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const fields = [
    {
      key: "heroPhotoUrl" as keyof AdminSettings,
      label: "URL de Foto Principal (Hero)",
      placeholder: "https://ejemplo.com/foto-hero.jpg",
      icon: <Image className="w-4 h-4" />,
    },
    {
      key: "secondaryPhotoUrl" as keyof AdminSettings,
      label: "URL de Foto Secundaria",
      placeholder: "https://ejemplo.com/foto-secundaria.jpg",
      icon: <Image className="w-4 h-4" />,
    },
    {
      key: "giftListUrl" as keyof AdminSettings,
      label: "URL de Lista de Regalos",
      placeholder: "https://ejemplo.com/lista-regalos",
      icon: <Gift className="w-4 h-4" />,
    },
  ];

  return (
    <motion.div
      className="glass-card p-6 md:p-8 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Link className="w-5 h-5 text-[#D4A853]" />
        <h2
          className="text-2xl text-[#2D2D2D]"
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 600,
          }}
        >
          Configuración de Enlaces
        </h2>
      </div>

      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.key}>
            <label
              className="flex items-center gap-2 text-sm text-[#2D2D2D] mb-2 tracking-wide"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              {field.icon}
              {field.label}
            </label>
            <input
              type="url"
              value={settings[field.key]}
              onChange={(e) =>
                setSettings({ ...settings, [field.key]: e.target.value })
              }
              placeholder={field.placeholder}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl bg-white/50 border border-[#D4A853]/30 text-[#2D2D2D] text-sm placeholder:text-[#6B6B6B]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A853]/50 transition-all duration-300 disabled:opacity-50"
              style={{ fontFamily: "Lato, sans-serif" }}
            />
          </div>
        ))}
      </div>

      <motion.button
        onClick={handleSave}
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`mt-6 px-6 py-3 rounded-xl text-white text-sm tracking-wider uppercase shadow-lg transition-all duration-300 flex items-center gap-2 disabled:opacity-50 ${
          saved
            ? "bg-green-600 hover:bg-green-600"
            : "bg-[#D4A853] hover:bg-[#D4A853]/90"
        }`}
        style={{ fontFamily: "Lato, sans-serif" }}
      >
        {isLoading ? (
          <motion.div
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        ) : saved ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            ¡Guardado!
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            Guardar cambios
          </>
        )}
      </motion.button>
    </motion.div>
  );
}

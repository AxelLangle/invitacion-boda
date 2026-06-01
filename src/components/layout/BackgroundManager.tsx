"use client";

import { useEffect } from "react";
import { getAdminSettings } from "@/lib/supabase";

export default function BackgroundManager() {
  useEffect(() => {
    async function loadBg() {
      const settings = await getAdminSettings();
      if (settings.bgTextureUrl) {
        document.body.style.backgroundImage = `url(${settings.bgTextureUrl})`;
      }
    }
    loadBg();
  }, []);

  return null;
}

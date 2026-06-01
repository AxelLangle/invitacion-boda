"use client";

import { useState } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import SettingsPanel from "@/components/admin/SettingsPanel";
import RSVPTable from "@/components/admin/RSVPTable";
import { LogOut } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-3xl md:text-4xl text-[#2D2D2D]"
              style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 600,
              }}
            >
              Panel de Administración
            </h1>
            <p
              className="text-sm text-[#6B6B6B] mt-1"
              style={{ fontFamily: "Lato, sans-serif" }}
            >
              Boda de Axel & Nahomi — 04/08/2026
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-[#6B6B6B] hover:text-[#800020] transition-colors rounded-lg hover:bg-[#800020]/5"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </div>

        {/* Settings */}
        <SettingsPanel />

        {/* RSVP Table */}
        <RSVPTable />
      </div>
    </div>
  );
}

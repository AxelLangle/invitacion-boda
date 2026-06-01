"use client";

import FloatingElements from "@/components/ui/FloatingElements";
import SectionDivider from "@/components/ui/SectionDivider";
import HeroSection from "@/components/invitation/HeroSection";
import MusicPlayer from "@/components/invitation/MusicPlayer";
import SecondaryPhoto from "@/components/invitation/SecondaryPhoto";
import CalendarButton from "@/components/invitation/CalendarButton";
import Timeline from "@/components/invitation/Timeline";
import DressCode from "@/components/invitation/DressCode";
import GiftsSection from "@/components/invitation/GiftsSection";
import Countdown from "@/components/invitation/Countdown";
import RSVPForm from "@/components/invitation/RSVPForm";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Background floating elements */}
      <FloatingElements />

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section — Photo emerging from envelope */}
        <HeroSection />

        <SectionDivider />

        {/* Music Player */}
        <MusicPlayer />

        <SectionDivider />

        {/* Secondary Photo */}
        <SecondaryPhoto />

        {/* Calendar Button */}
        <CalendarButton />

        <SectionDivider />

        {/* Timeline / Itinerary */}
        <Timeline />

        <SectionDivider />

        {/* Dress Code */}
        <DressCode />

        <SectionDivider />

        {/* Gifts Section */}
        <GiftsSection />

        <SectionDivider />

        {/* Countdown */}
        <Countdown />

        <SectionDivider />

        {/* RSVP Form */}
        <RSVPForm />

        {/* Footer */}
        <footer className="py-12 text-center">
          <div className="flex items-center justify-center gap-2 text-[#D4A853] mb-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4A853]/40" />
            <Heart className="w-4 h-4 fill-[#D4A853]/30" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4A853]/40" />
          </div>
          <p
            className="text-sm text-[#6B6B6B]"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            Axel & Nahomi
          </p>
          <p
            className="text-xs text-[#6B6B6B]/50 mt-1"
            style={{ fontFamily: "Lato, sans-serif" }}
          >
            04/08/2026
          </p>
        </footer>
      </div>
    </main>
  );
}

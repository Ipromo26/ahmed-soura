"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Filter,
  CheckCircle2,
} from "lucide-react";

export default function AgendaPage() {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredEvents = t.agendaPage.events.filter((ev) => {
    if (selectedFilter === "all") return true;
    return ev.category === selectedFilter;
  });

  return (
    <main className="min-h-screen bg-[#080808] text-[#f5f2eb] flex flex-col selection:bg-lime selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0a0a0a] border-b border-white/10">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-lime/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-lime transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </Link>

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/10 text-lime text-xs font-semibold tracking-widest uppercase">
              <Calendar className="w-3.5 h-3.5" />
              <span>Programmation Saison 2026 - 2027</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.08]">
              {t.agendaPage.heroTitle}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-medium">
              {t.agendaPage.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Agenda Section & Filtered List */}
      <section className="py-16 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-2 pb-10 border-b border-white/10 mb-10">
            <button
              onClick={() => setSelectedFilter("all")}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedFilter === "all"
                  ? "bg-lime text-black font-bold shadow-md"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              {t.agendaPage.filters.all}
            </button>

            <button
              onClick={() => setSelectedFilter("performances")}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedFilter === "performances"
                  ? "bg-lime text-black font-bold shadow-md"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              {t.agendaPage.filters.performances}
            </button>

            <button
              onClick={() => setSelectedFilter("workshops")}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedFilter === "workshops"
                  ? "bg-lime text-black font-bold shadow-md"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              {t.agendaPage.filters.workshops}
            </button>

            <button
              onClick={() => setSelectedFilter("courses")}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedFilter === "courses"
                  ? "bg-lime text-black font-bold shadow-md"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              {t.agendaPage.filters.courses}
            </button>

            <button
              onClick={() => setSelectedFilter("yongonlon")}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedFilter === "yongonlon"
                  ? "bg-lime text-black font-bold shadow-md"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              {t.agendaPage.filters.yongonlon}
            </button>
          </div>

          {/* Events Timeline / Grid */}
          <div className="space-y-6">
            {filteredEvents.map((ev) => (
              <div
                key={ev.id}
                className="p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-white/10 hover:border-lime/50 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-6 items-center group shadow-xl"
              >
                {/* Date & Time Column */}
                <div className="lg:col-span-3 space-y-2 border-b lg:border-b-0 lg:border-r border-white/10 pb-4 lg:pb-0 lg:pr-6">
                  <div className="flex items-center gap-2 text-lime font-mono font-bold text-sm">
                    <Calendar className="w-4 h-4 shrink-0" />
                    <span>{ev.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <Clock className="w-3.5 h-3.5 shrink-0 text-zinc-500" />
                    <span>{ev.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400 text-xs">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-zinc-500" />
                    <span className="truncate">{ev.city}</span>
                  </div>
                </div>

                {/* Event Description Column */}
                <div className="lg:col-span-6 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-white/5 border border-white/10 text-lime">
                      {ev.category === "performances"
                        ? "Spectacle"
                        : ev.category === "workshops"
                        ? "Stage"
                        : ev.category === "courses"
                        ? "Cours"
                        : "Résidence"}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {ev.location}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-lime transition-colors">
                    {ev.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {ev.description}
                  </p>
                </div>

                {/* Action CTA Column */}
                <div className="lg:col-span-3 flex flex-col items-start lg:items-end justify-center gap-3">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      ev.status === "last_spots"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    }`}
                  >
                    {ev.status === "last_spots" ? "Dernières places" : "Inscriptions ouvertes"}
                  </span>

                  <Link
                    href="/reservation"
                    className="inline-flex items-center gap-2 bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-all shadow-md"
                  >
                    <span>{ev.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

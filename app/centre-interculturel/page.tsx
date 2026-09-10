"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Compass, Sparkles, Heart, ArrowLeft, ArrowRight, CheckCircle2, Globe, Users } from "lucide-react";

export default function CentreInterculturelPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#080808] text-[#f5f2eb] flex flex-col selection:bg-lime selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0a0a0a] border-b border-white/10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-lime/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-lime transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-white/10 text-lime text-xs font-semibold tracking-widest uppercase">
                <Compass className="w-3.5 h-3.5" />
                <span>Lieu de Vie, Création & Transmission</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.08]">
                {t.centrePage.heroTitle}
              </h1>

              <p className="text-lg text-zinc-300 font-medium max-w-xl">
                {t.centrePage.heroSubtitle}
              </p>

              <div className="p-6 rounded-2xl bg-zinc-900/80 border border-white/10 relative">
                <h3 className="text-xs uppercase font-bold text-lime tracking-widest mb-2">
                  {t.centrePage.missionTitle}
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {t.centrePage.missionText}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-white p-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/yongonlon-logo.jpg"
                    alt="Logo Centre Yongonlon"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Action Pillars */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {t.centrePage.pillarsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.centrePage.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-zinc-950 border border-white/10 hover:border-lime/50 transition-all duration-300 space-y-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-lime/10 text-lime flex items-center justify-center font-mono font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-lime transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-[#0c0c0c] border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-lime/10 text-lime flex items-center justify-center mx-auto border border-lime/30">
            <Users className="w-7 h-7" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            {t.centrePage.communityTitle}
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {t.centrePage.communityText}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#soutenir"
              className="inline-flex items-center gap-2 bg-lime text-black font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-lime-light transition-all shadow-lg"
            >
              <Heart className="w-4 h-4" />
              <span>{t.centrePage.ctaSupport}</span>
            </Link>

            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-zinc-900 text-white font-medium text-xs uppercase tracking-wider px-6 py-3.5 rounded-full border border-white/15 hover:border-lime transition-all"
            >
              <span>Proposer un projet / Contact</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

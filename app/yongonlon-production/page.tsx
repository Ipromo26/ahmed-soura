"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  Film,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  FileText,
  Mail,
  Calendar,
  Layers,
  Award,
} from "lucide-react";

export default function YongonlonProductionPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#080808] text-[#f5f2eb] flex flex-col selection:bg-lime selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0a0a0a] border-b border-white/10">
        <div className="absolute top-1/3 left-1/3 w-[550px] h-[550px] bg-lime/10 rounded-full blur-[150px] pointer-events-none" />

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
              <Layers className="w-3.5 h-3.5" />
              <span>Bureau de Création & Diffusion Internationale</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.08]">
              {t.productionPage.heroTitle}
            </h1>

            <p className="text-lg sm:text-xl text-zinc-300 font-medium">
              {t.productionPage.heroSubtitle}
            </p>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
              {t.productionPage.introText}
            </p>
          </div>
        </div>
      </section>

      {/* Production Pieces Catalog */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {t.productionPage.piecesTitle}
            </h2>
          </div>

          <div className="space-y-8">
            {t.productionPage.pieces.map((piece, idx) => (
              <div
                key={piece.id}
                className="p-8 rounded-2xl bg-zinc-950 border border-white/10 hover:border-lime/40 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group shadow-xl"
              >
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-lime/10 border border-lime/30 text-lime">
                      {piece.type}
                    </span>
                    <span className="text-zinc-400 font-mono">
                      {piece.year}
                    </span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-zinc-400">
                      Durée : {piece.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-white group-hover:text-lime transition-colors">
                    {piece.title}
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
                    {piece.description}
                  </p>

                  <div className="text-xs text-zinc-400 pt-2">
                    <span className="font-semibold text-zinc-300">Crédits & Distribution : </span>
                    <span>{piece.credits}</span>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                  <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-300 text-center font-mono">
                    Statut : <span className="text-emerald-400 font-bold">{piece.status}</span>
                  </div>

                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Contacter pour diffusion</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Area for Curators & Presenters */}
      <section className="py-20 bg-[#0c0c0c] border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/90 border border-lime/30 space-y-6">
            <div className="inline-flex items-center gap-2 text-lime text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Programmateurs & Directeurs Artistiques</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              {t.productionPage.proTitle}
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {t.productionPage.proText}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-lime text-black font-bold text-xs uppercase tracking-wider hover:bg-lime-light transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>{t.productionPage.ctaBooking}</span>
              </Link>

              <a
                href="mailto:booking@ahmedsoura.com?subject=Demande%20de%20fiche%20technique"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-black/60 border border-white/20 text-white font-medium text-xs uppercase tracking-wider hover:border-lime transition-all"
              >
                <FileText className="w-4 h-4 text-lime" />
                <span>{t.productionPage.ctaTechRider}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

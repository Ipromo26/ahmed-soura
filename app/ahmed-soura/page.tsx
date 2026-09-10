"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Award, GraduationCap, Users, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";

export default function AhmedSouraPage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-[#080808] text-[#f5f2eb] flex flex-col selection:bg-lime selection:text-black">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#0a0a0a] border-b border-white/10">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-lime/10 rounded-full blur-[140px] pointer-events-none" />

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
                <Sparkles className="w-3.5 h-3.5" />
                <span>Identité Artistique & Répertoire</span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-[1.05]">
                {t.ahmedPage.heroTitle}
              </h1>

              <p className="text-lg text-zinc-300 font-medium">
                {t.ahmedPage.heroSubtitle}
              </p>

              <div className="p-6 rounded-2xl bg-zinc-900/70 border border-lime/30 relative">
                <p className="font-serif italic text-lg sm:text-xl text-zinc-200 leading-relaxed">
                  {t.ahmedPage.statement}
                </p>
                <span className="block mt-2 text-xs font-bold text-lime uppercase tracking-widest">
                  — Ahmed Soura
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-zinc-900">
                <Image
                  src="/images/ahmed-soura-performance.jpg"
                  alt="Ahmed Soura performance"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-zinc-300">
                  <span className="font-semibold text-white block">Ahmed Soura sur scène</span>
                  <span>Photographie © Jo Grabowski</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Biography Narrative */}
      <section className="py-20 bg-[#080808]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
              {t.ahmedPage.biographyTitle}
            </h2>
            <div className="space-y-5 text-zinc-300 text-base sm:text-lg leading-relaxed">
              {t.ahmedPage.biographyFull.map((p, idx) => (
                <p key={idx} className="border-l-2 border-white/10 hover:border-lime pl-4 transition-colors">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solo Pieces Repertoire */}
      <section className="py-20 bg-[#0d0d0d] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-lime text-xs font-semibold tracking-widest uppercase mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>Pièces Maîtresses</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {t.ahmedPage.solosTitle}
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              {t.ahmedPage.solosSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {t.ahmedPage.solos.map((solo) => (
              <div
                key={solo.id}
                className="p-8 rounded-2xl bg-zinc-950 border border-white/15 hover:border-lime/50 transition-colors flex flex-col justify-between space-y-6 group shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest font-mono text-zinc-400">
                      Création {solo.year}
                    </span>
                    {solo.award && (
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-lime/10 border border-lime/30 text-lime">
                        {solo.award}
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-3xl font-bold text-white group-hover:text-lime transition-colors">
                    Solo « {solo.title} »
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {solo.synopsis}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs text-zinc-400">
                  <span className="block font-medium text-zinc-300 mb-1">Fiche technique :</span>
                  <span>{solo.credits} — Durée : {solo.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Highlight */}
      <section className="py-20 bg-[#080808] border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-8 sm:p-12 rounded-3xl border border-white/15 shadow-2xl flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-lime/10 text-lime flex items-center justify-center shrink-0 border border-lime/30">
              <GraduationCap className="w-10 h-10" />
            </div>
            <div className="space-y-3">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {t.ahmedPage.teachingTitle}
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {t.ahmedPage.teachingText}
              </p>
              <div className="pt-2">
                <Link
                  href="/#cours"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-lime hover:underline"
                >
                  <span>Consulter le planning des cours</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Heart, Sparkles, Compass } from "lucide-react";

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="accueil"
      className="relative min-h-[96vh] flex items-center pt-28 pb-16 overflow-hidden bg-[#080808]"
    >
      {/* Background theatrical lighting effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(198,242,59,0.05),transparent_75%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Editorial Presentation & CTAs */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-7 text-left">
            {/* Category / Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-zinc-300 font-semibold">
                {t.hero.eyebrow}
              </span>
            </div>

            {/* Main Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.03]">
                {t.hero.title}
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 font-medium tracking-wide max-w-lg">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Quote Block */}
            <div className="relative pl-5 border-l-2 border-lime/80 py-1 max-w-lg">
              <blockquote className="font-serif italic text-base sm:text-lg text-zinc-300 leading-relaxed">
                {t.hero.quote}
              </blockquote>
              <span className="block mt-2 text-xs font-semibold uppercase tracking-wider text-lime">
                — {t.hero.quoteAuthor}
              </span>
            </div>

            {/* 3 Call-to-actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/reservation"
                className="inline-flex items-center justify-center gap-2 bg-lime hover:bg-lime-light text-black font-bold text-xs sm:text-sm tracking-wider uppercase px-6 py-3.5 rounded-full shadow-[0_0_25px_rgba(198,242,59,0.35)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{t.hero.ctaBook}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/dons"
                className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs sm:text-sm tracking-wider uppercase px-5 py-3.5 rounded-full border border-white/15 hover:border-lime/60 transition-all duration-300"
              >
                <Heart className="w-4 h-4 text-lime" />
                <span>{t.hero.ctaDonate}</span>
              </a>

              <a
                href="/centre-interculturel"
                className="inline-flex items-center justify-center gap-2 text-zinc-300 hover:text-white font-medium text-xs sm:text-sm tracking-wider uppercase px-4 py-3.5 rounded-full hover:bg-white/5 transition-colors"
              >
                <Compass className="w-4 h-4 text-zinc-400" />
                <span>{t.hero.ctaDiscover}</span>
              </a>
            </div>

            {/* Editorial highlights bar */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-zinc-400 border-t border-white/10">
              <div>
                <span className="block text-white font-bold text-sm sm:text-base">Berlin & Burkina</span>
                <span className="text-[10px] text-zinc-500 uppercase">Rayonnement</span>
              </div>
              <div className="h-6 w-[1px] bg-white/10" />
              <div>
                <span className="block text-white font-bold text-sm sm:text-base">Tanzfabrik</span>
                <span className="text-[10px] text-zinc-500 uppercase">Enseignement</span>
              </div>
              <div className="h-6 w-[1px] bg-white/10" />
              <div>
                <span className="block text-lime font-bold text-sm sm:text-base">2007 - 2026</span>
                <span className="text-[10px] text-zinc-500 uppercase">Création & Prix</span>
              </div>
            </div>
          </div>

          {/* Right Area: Dual-Panel Theatrical Composition (Matching Desktop Mockup) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch">
            {/* Panel 1 (Center Stage): Ahmed in Green Stage Costume */}
            <div className="sm:col-span-7 relative min-h-[420px] sm:min-h-[520px] rounded-2xl overflow-hidden border border-white/15 bg-zinc-950 shadow-2xl group">
              <Image
                src="/images/ahmed-soura-green.jpg"
                alt="Ahmed Soura en mouvement scénique"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                priority
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

              {/* Top Accent Tag */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-[10px] uppercase font-bold text-lime tracking-widest">
                Scène & Mouvement
              </div>
            </div>

            {/* Panel 2 (Companion Card): Calligraphy + B&W Solo + Dialogue Statement */}
            <div className="sm:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-[#111111] border border-white/15 shadow-2xl relative overflow-hidden group hover:border-lime/40 transition-colors">
              {/* Ambient Glow inside card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime/10 rounded-full blur-2xl pointer-events-none" />

              {/* Calligraphic Script at Top */}
              <div className="border-b border-white/10 pb-4">
                <span className="font-serif italic text-2xl text-lime block leading-tight font-medium">
                  Danser
                </span>
                <span className="font-serif italic text-2xl text-zinc-200 block leading-tight font-medium">
                  Rassembler
                </span>
                <span className="font-serif italic text-2xl text-lime block leading-tight font-medium">
                  Transmettre
                </span>
              </div>

              {/* Embedded Dramatic Black & White Photo */}
              <div className="relative my-4 aspect-[4/5] w-full rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black">
                <Image
                  src="/images/ahmed-soura-arched.jpg"
                  alt="Solo 166 — Ahmed Soura"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-3 text-[10px] text-zinc-300 font-mono">
                  Solo « 166 »
                </span>
              </div>

              {/* Bottom Card Statement */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-[9px] uppercase font-bold text-lime tracking-widest block mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Vision Artistique
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-200 leading-snug">
                  {t.hero.cardDialogue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

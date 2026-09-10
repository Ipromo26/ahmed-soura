"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useBooking } from "@/context/BookingContext";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Users,
  Sparkles,
  Flame,
  Music,
  Wind,
  Zap,
  Heart,
} from "lucide-react";

const disciplineIcons: Record<string, React.ReactNode> = {
  "danse-afro": <Flame className="w-6 h-6" />,
  "contemporain-africain": <Wind className="w-6 h-6" />,
  "corps-energie": <Zap className="w-6 h-6" />,
  "danse-creative": <Sparkles className="w-6 h-6" />,
  "percussion-corporelle": <Music className="w-6 h-6" />,
  "yoga-danseur": <Heart className="w-6 h-6" />,
};

export default function CoursPage() {
  const { t } = useLanguage();
  const classes = t.classes;
  const { disciplines } = useBooking();
  const displayItems = disciplines && disciplines.length > 0 ? disciplines : classes.items;

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f2eb] flex flex-col selection:bg-lime selection:text-black">
      <Navbar />

      <main id="main-content" className="flex-1 pt-28 sm:pt-36 pb-24">
        {/* Back Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-lime transition-colors duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Retour à l’accueil</span>
          </a>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 animate-reveal-up">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{classes.sectionTag}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-5 tracking-tight">
              {classes.title}
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">
              {classes.subtitle}
            </p>
          </div>
        </section>

        {/* Method Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="glassmorphism rounded-2xl p-8 sm:p-12 glow-border">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-serif text-white mb-6">
                La Méthode — <span className="text-gradient-lime">Le Corps Énergie</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Développée par Ahmed Soura et enseignée à la Tanzfabrik Berlin, la méthode « Le Corps Énergie » est une approche pédagogique unique qui fusionne les danses traditionnelles d’Afrique de l’Ouest avec les techniques contemporaines européennes.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                Fondée sur l’écoute du rythme intérieur, la précision organique du mouvement et l’exploration de l’énergie vitale, cette méthode invite chaque participant à découvrir son propre langage corporel tout en s’ancrant dans une tradition vivante et généreuse.
              </p>
              <p className="text-sm text-lime/80 font-mono tracking-wide mt-6">
                Tanzfabrik Berlin · Centre Interculturel Yongonlon · Ouagadougou · Bobo-Dioulasso
              </p>
            </div>
          </div>
        </section>

        {/* Course Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="text-2xl sm:text-3xl font-serif text-white mb-10 text-center">
            Nos Disciplines
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item, index) => (
              <div
                key={item.id}
                className="card-glow bg-zinc-900/50 border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col animate-reveal-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-lime/10 text-lime">
                    {disciplineIcons[item.id] || <Sparkles className="w-6 h-6" />}
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-lime/70 font-mono bg-lime/5 px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-lg font-serif text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed flex-1 mb-5">{item.desc}</p>

                <div className="flex items-center justify-between text-xs text-zinc-400 border-t border-white/5 pt-4">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{item.level}</span>
                  </div>
                  <span className="text-lime font-semibold">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Schedule Section */}
        {classes.schedule && classes.schedule.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <h2 className="text-2xl sm:text-3xl font-serif text-white mb-10 text-center">
              Prochaines Séances
            </h2>
            <div className="space-y-3">
              {classes.schedule.map((s, i) => (
                <div
                  key={i}
                  className="glassmorphism rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-center min-w-[60px]">
                      <span className="text-lime font-mono text-sm font-bold block">{s.date}</span>
                      <span className="text-zinc-500 text-xs">{s.time}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-sm">{s.title}</h4>
                      <p className="text-zinc-400 text-xs">{s.location}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-lime/80 bg-lime/10 px-3 py-1.5 rounded-full self-start sm:self-center">
                    {s.spots}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href="/reservation"
            className="inline-flex items-center gap-2.5 bg-lime hover:bg-lime-light text-black font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-full transition-all duration-300 animate-glow-pulse hover:shadow-[0_0_30px_rgba(198,242,59,0.5)] transform hover:-translate-y-0.5"
          >
            <span>{classes.ctaBook}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}

"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { Lock, ArrowLeft } from "lucide-react";

export default function DatenschutzPage() {
  const { t } = useLanguage();
  const ds = t.datenschutz;

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f2eb] flex flex-col selection:bg-lime selection:text-black">
      <Navbar />

      <main id="main-content" className="flex-1 pt-28 sm:pt-36 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-lime transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l'accueil</span>
            </a>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-semibold tracking-wider uppercase mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>Conformité RGPD / DSGVO</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif text-white mb-3">
              {ds.title}
            </h1>
            <p className="text-sm text-white/60 font-light">
              {ds.subtitle}
            </p>
          </div>

          <div className="space-y-8 bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-10">
            {ds.sections.map((section, idx) => (
              <div key={idx} className="space-y-3 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                <h2 className="text-lg font-serif text-lime">
                  {section.title}
                </h2>
                <div className="space-y-2 text-sm text-white/70 font-light leading-relaxed">
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-4 text-xs text-white/40">
              {ds.lastUpdated} · Protection des Données Personnelles
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

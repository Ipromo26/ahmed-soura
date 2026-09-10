"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Award, GraduationCap, Users, Sparkles, CheckCircle2 } from "lucide-react";

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"training" | "awards" | "collabs">("training");

  return (
    <section id="a-propos" className="py-16 sm:py-24 scroll-mt-28 bg-[#0a0a0a] border-t border-white/10 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-lime/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-lime text-xs font-semibold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.about.sectionTag}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            {t.about.title}
          </h2>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Biography Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
              {t.about.bioParagraphs.map((para, idx) => (
                <p key={idx} className="border-l-2 border-transparent hover:border-lime pl-3 transition-colors">
                  {para}
                </p>
              ))}
            </div>

            {/* Teaching Current highlight card */}
            <div className="p-5 rounded-xl bg-zinc-900/90 border border-lime/30 flex items-start gap-4 shadow-lg">
              <div className="w-10 h-10 rounded-lg bg-lime/10 flex items-center justify-center text-lime shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <span className="font-bold text-white block text-sm uppercase tracking-wider mb-1">
                  Enseignement & Masterclasses
                </span>
                <p className="text-zinc-300">
                  {t.about.teachingCurrent}
                </p>
              </div>
            </div>

            {/* Interactive Tabs for Details (Training, Awards, Collaborations) */}
            <div className="pt-4">
              <div className="flex border-b border-white/10 gap-4 mb-6">
                <button
                  onClick={() => setActiveTab("training")}
                  className={`pb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all relative ${
                    activeTab === "training"
                      ? "text-lime border-b-2 border-lime"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    {t.about.trainingTitle}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("awards")}
                  className={`pb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all relative ${
                    activeTab === "awards"
                      ? "text-lime border-b-2 border-lime"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    {t.about.awardsTitle}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("collabs")}
                  className={`pb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all relative ${
                    activeTab === "collabs"
                      ? "text-lime border-b-2 border-lime"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {t.about.collabTitle}
                  </span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="bg-zinc-900/60 rounded-xl p-5 border border-white/10 min-h-[160px]">
                {activeTab === "training" && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-300">
                    {t.about.trainingItems.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-lime shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === "awards" && (
                  <ul className="space-y-2.5 text-sm text-zinc-300">
                    {t.about.awardsItems.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <Award className="w-4 h-4 text-lime shrink-0" />
                        <span className="font-medium text-white">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {activeTab === "collabs" && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    {t.about.collabItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-black/50 p-2.5 rounded-lg border border-white/5 text-zinc-300 font-medium text-center hover:border-lime/40 transition-colors"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Sculptural Studio Image & Quote */}
          <div className="lg:col-span-5 relative space-y-6">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/15 bg-white shadow-2xl">
              <Image
                src="/images/ahmed-soura-hooded.jpg"
                alt="Ahmed Soura posture sculpturale"
                fill
                className="object-contain p-4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Poetic script text */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-serif italic text-2xl text-lime block font-bold">
                  « {t.about.quoteHandwritten} »
                </span>
                <span className="text-xs uppercase tracking-widest text-zinc-300 font-sans block mt-1">
                  Ahmed Soura — Corps, Matière, Liberté
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

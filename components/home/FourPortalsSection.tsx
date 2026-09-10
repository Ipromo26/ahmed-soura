"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRight, Compass, Sparkles } from "lucide-react";
import Link from "next/link";

export const FourPortalsSection: React.FC = () => {
  const { t } = useLanguage();
  const [hoveredPortal, setHoveredPortal] = useState<string | null>(null);

  const portals = [
    {
      ...t.portals.items[0],
      image: "/images/ahmed-soura-performance.jpg",
      accentColor: "border-lime/40",
      accentBadge: "Culture & Éducation",
    },
    {
      ...t.portals.items[1],
      image: "/images/ahmed-soura-arched.jpg",
      accentColor: "border-lime/40",
      accentBadge: "Scène & Tournée",
    },
    {
      ...t.portals.items[2],
      image: "/images/yongonlon-logo.jpg",
      accentColor: "border-lime/40",
      accentBadge: "Édition & Merch",
    },
    {
      ...t.portals.items[3],
      image: "/images/ahmed-soura-green.jpg",
      accentColor: "border-lime/40",
      accentBadge: "Répertoire & Solo",
    },
  ];

  return (
    <section id="univers" className="py-24 scroll-mt-28 bg-[#080808] relative overflow-hidden">
      {/* Background ambient */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-lime text-xs font-semibold tracking-widest uppercase mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>{t.portals.sectionTag}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {t.portals.title}
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md">
            {t.portals.subtitle}
          </p>
        </div>

        {/* Portals Grid: 4 Interactive Windows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portals.map((portal) => {
            const isHovered = hoveredPortal === portal.id;
            const targetUrl = portal.id === "centre" 
              ? "/centre-interculturel" 
              : portal.id === "production" 
              ? "/yongonlon-production" 
              : portal.id === "ahmed" 
              ? "/ahmed-soura" 
              : "/boutique";

            return (
              <Link
                key={portal.id}
                href={targetUrl}
                onMouseEnter={() => setHoveredPortal(portal.id)}
                onMouseLeave={() => setHoveredPortal(null)}
                className={`group relative h-[450px] sm:h-[500px] rounded-2xl overflow-hidden border border-white/15 bg-zinc-950 transition-all duration-500 flex flex-col justify-end p-6 cursor-pointer ${
                  isHovered ? "ring-2 ring-lime shadow-[0_0_30px_rgba(198,242,59,0.25)] -translate-y-1.5" : ""
                }`}
              >
                {/* Background Image with overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={portal.image}
                    alt={portal.title}
                    fill
                    className={`object-cover transition-all duration-700 ${
                      portal.id === "boutique" ? "object-contain p-8 bg-white" : ""
                    } ${isHovered ? "scale-110 brightness-95" : "scale-100 brightness-75"}`}
                  />
                  {/* Vignette Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                </div>

                {/* Top Tag & Portal Number */}
                <div className="relative z-10 mb-auto flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-lime">
                    {portal.tag}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    0{portals.indexOf(portal) + 1}
                  </span>
                </div>

                {/* Content at Bottom */}
                <div className="relative z-10 space-y-2">
                  <span className="text-xs font-semibold text-lime uppercase tracking-wider block">
                    {portal.subtitle}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white leading-snug group-hover:text-lime transition-colors">
                    {portal.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed">
                    {portal.description}
                  </p>

                  <div className="pt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-lime transition-colors">
                    <span>{portal.linkText}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { GalleryItem } from "@/types/i18n";
import { Camera, ArrowUpRight, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export const GallerySection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems = t.gallery.items.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.category === selectedFilter;
  });

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
      );
    }
  };

  return (
    <section id="galerie" className="py-24 scroll-mt-28 bg-[#080808] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-lime text-xs font-semibold tracking-widest uppercase mb-4">
              <Camera className="w-3.5 h-3.5" />
              <span>{t.gallery.sectionTag}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {t.gallery.title}
            </h2>
          </div>

          <div className="text-right flex flex-col items-end gap-2">
            <span className="font-serif italic text-2xl text-lime block">
              « {t.gallery.quoteHandwritten} »
            </span>
            <a
              href="/galerie"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lime hover:underline"
            >
              <span>Galerie plein écran</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
              selectedFilter === "all"
                ? "bg-lime text-black font-bold shadow-md"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
            }`}
          >
            {t.gallery.filterAll}
          </button>
          <button
            onClick={() => setSelectedFilter("performance")}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
              selectedFilter === "performance"
                ? "bg-lime text-black font-bold shadow-md"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
            }`}
          >
            {t.gallery.filterPerformance}
          </button>
          <button
            onClick={() => setSelectedFilter("portrait")}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
              selectedFilter === "portrait"
                ? "bg-lime text-black font-bold shadow-md"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
            }`}
          >
            {t.gallery.filterPortrait}
          </button>
          <button
            onClick={() => setSelectedFilter("rehearsal")}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
              selectedFilter === "rehearsal"
                ? "bg-lime text-black font-bold shadow-md"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10"
            }`}
          >
            {t.gallery.filterRehearsal}
          </button>
        </div>

        {/* Editorial Masonry / Dynamic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-white/15 cursor-pointer shadow-lg hover:border-lime/60 transition-all duration-500"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className={`transition-transform duration-700 group-hover:scale-105 ${
                  item.src.includes("hooded") ? "object-contain p-2 bg-white" : "object-cover"
                }`}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] uppercase font-bold text-lime tracking-widest block mb-1">
                  {item.category}
                </span>
                <h4 className="text-sm font-serif font-bold text-white leading-tight">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-zinc-300 pt-2 mt-2 border-t border-white/15">
                  <span>{item.credit}</span>
                  <Maximize2 className="w-3.5 h-3.5 text-lime" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-fadeIn">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 text-zinc-400 hover:text-white bg-zinc-900/80 rounded-full border border-white/20 transition-colors z-50"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white bg-zinc-900/80 rounded-full border border-white/20 hover:bg-lime hover:text-black transition-all z-50"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white bg-zinc-900/80 rounded-full border border-white/20 hover:bg-lime hover:text-black transition-all z-50"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Box */}
          <div className="max-w-4xl w-full flex flex-col items-center">
            <div className="relative w-full max-h-[75vh] aspect-[4/5] sm:aspect-[16/10] overflow-hidden rounded-xl border border-white/20 shadow-2xl">
              <Image
                src={filteredItems[activeLightboxIndex].src}
                alt={filteredItems[activeLightboxIndex].title}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-4 text-center space-y-1 max-w-xl">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                {filteredItems[activeLightboxIndex].title}
              </h3>
              <p className="text-xs text-zinc-400">
                Crédit photo : {filteredItems[activeLightboxIndex].credit} — {filteredItems[activeLightboxIndex].year}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

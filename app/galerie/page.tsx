"use client";

import React, { useState, useEffect } from "react";
import { loadGalleryItems } from "@/lib/catalog-store";
import { GalleryItem } from "@/types/i18n";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowLeft,
  Camera,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function GaleriePage() {
  const { t } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const [galleryList, setGalleryList] = useState<GalleryItem[]>(t.gallery.items);

  useEffect(() => {
    setGalleryList(loadGalleryItems());
    const handler = () => {
      setGalleryList(loadGalleryItems());
    };
    window.addEventListener("as_gallery_updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("as_gallery_updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const filteredItems = galleryList.filter((item) => {
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 animate-reveal-up">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-semibold tracking-wider uppercase mb-4">
              <Camera className="w-3.5 h-3.5" />
              <span>{t.gallery.sectionTag}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-5 tracking-tight">
              {t.gallery.title}
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-lime block">
              « {t.gallery.quoteHandwritten} »
            </p>
          </div>

          {/* Filter Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setSelectedFilter("all")}
              className={"px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 " +
                (selectedFilter === "all"
                  ? "bg-lime text-black font-bold shadow-[0_0_15px_rgba(198,242,59,0.3)]"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
            >
              {t.gallery.filterAll}
            </button>
            <button
              onClick={() => setSelectedFilter("performance")}
              className={"px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 " +
                (selectedFilter === "performance"
                  ? "bg-lime text-black font-bold shadow-[0_0_15px_rgba(198,242,59,0.3)]"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
            >
              {t.gallery.filterPerformance}
            </button>
            <button
              onClick={() => setSelectedFilter("portrait")}
              className={"px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 " +
                (selectedFilter === "portrait"
                  ? "bg-lime text-black font-bold shadow-[0_0_15px_rgba(198,242,59,0.3)]"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
            >
              {t.gallery.filterPortrait}
            </button>
            <button
              onClick={() => setSelectedFilter("rehearsal")}
              className={"px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 " +
                (selectedFilter === "rehearsal"
                  ? "bg-lime text-black font-bold shadow-[0_0_15px_rgba(198,242,59,0.3)]"
                  : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
            >
              {t.gallery.filterRehearsal}
            </button>
          </div>
        </section>

        {/* Editorial Masonry / Dynamic Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900 border border-white/15 cursor-pointer shadow-lg hover:border-lime/60 transition-all duration-500 card-glow animate-reveal-up"
                style={{ animationDelay: (index * 0.08) + "s" }}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className={"transition-transform duration-700 group-hover:scale-105 " +
                    (item.src.includes("hooded") ? "object-contain p-2 bg-white" : "object-cover")}
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
        </section>
      </main>

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

      <Footer />
    </div>
  );
}

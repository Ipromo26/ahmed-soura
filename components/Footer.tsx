"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Instagram, Facebook, Youtube, Mail, MapPin, Heart, MessageCircle } from "lucide-react";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handleOpenCookieSettings = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("openCookieSettings"));
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-zinc-400 pt-16 pb-12 overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-lime/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quote banner */}
        <div className="pb-14 border-b border-white/10 text-center max-w-3xl mx-auto">
          <p className="font-serif italic text-xl md:text-2xl text-zinc-200 leading-relaxed">
            {t.footer.quote}
          </p>
          <span className="block mt-3 text-xs tracking-widest uppercase font-semibold text-lime">
            — {t.footer.quoteAuthor}
          </span>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          {/* Col 1: Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-white p-0.5 border border-white/20">
                <Image
                  src="/images/yongonlon-logo.jpg"
                  alt="Yongonlon Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-lg tracking-[0.2em] uppercase font-bold text-white block">
                  AHMED SOURA
                </span>
                <span className="text-[10px] uppercase tracking-widest text-lime font-sans block">
                  YONGONLON ECOSYSTEM
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed font-light">
              Plateforme internationale de danse contemporaine, création chorégraphique et transmission culturelle entre Berlin, le Burkina Faso et le monde.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-lime hover:border-lime transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-lime hover:border-lime transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/491637173662"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-[#25D366] hover:border-[#25D366] transition-colors"
                aria-label="WhatsApp Ahmed Soura"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-lime hover:border-lime transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-lime transition-colors">{t.nav.home}</a></li>
              <li><a href="/ahmed-soura" className="hover:text-lime transition-colors">{t.nav.about}</a></li>
              <li><a href="/cours" className="hover:text-lime transition-colors">{t.nav.classes}</a></li>
              <li><a href="/centre-interculturel" className="hover:text-lime transition-colors">{t.nav.yongonlon}</a></li>
              <li><a href="/agenda" className="hover:text-lime transition-colors">{t.nav.agenda}</a></li>
              <li><a href="/boutique" className="hover:text-lime transition-colors">{t.nav.shop}</a></li>
              <li><a href="/galerie" className="hover:text-lime transition-colors">{t.nav.gallery}</a></li>
              <li><a href="/contact" className="hover:text-lime transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>

          {/* Col 3: Univers & Projets */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              Pôles & Univers
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/centre-interculturel" className="hover:text-lime transition-colors">Centre Interculturel</a></li>
              <li><a href="/yongonlon-production" className="hover:text-lime transition-colors">Yongonlon Production</a></li>
              <li><a href="/boutique" className="hover:text-lime transition-colors">Boutique & Merch</a></li>
              <li><a href="/reservation" className="hover:text-lime transition-colors">Réservations</a></li>
              <li><a href="/dons" className="hover:text-lime transition-colors flex items-center gap-1.5"><Heart className="w-3.5 h-3.5 text-lime" /> {t.nav.support}</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Localisation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold">
              Contact & Rayonnement
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400 font-light">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-lime shrink-0 mt-0.5" />
                <span>Berlin, Allemagne & Ouagadougou, Burkina Faso</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-lime shrink-0" />
                <a href="mailto:contact@yongonlon.org" className="hover:text-white transition-colors">contact@yongonlon.org</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-lime shrink-0" />
                <a href="mailto:booking@ahmedsoura.com" className="hover:text-white transition-colors">booking@ahmedsoura.com</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a href="https://wa.me/491637173662" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp : +49 163 717 36 62
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar / Legal (Germany compliance) */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} {t.footer.allRightsReserved}</p>

          <div className="flex flex-wrap items-center gap-6">
            <a href="/admin" className="hover:text-lime transition-colors text-zinc-400 font-medium flex items-center gap-1">
              <span>Espace Admin</span>
            </a>
            <span>•</span>
            <a href="/impressum" className="hover:text-lime transition-colors">
              {t.footer.impressum}
            </a>
            <span>•</span>
            <a href="/datenschutz" className="hover:text-lime transition-colors">
              {t.footer.privacy}
            </a>
            <span>•</span>
            <button
              onClick={handleOpenCookieSettings}
              className="hover:text-lime transition-colors underline-offset-4 hover:underline"
            >
              {t.footer.cookies}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

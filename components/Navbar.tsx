"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Menu, X, ShoppingBag, Instagram, Facebook, ArrowUpRight, Key } from "lucide-react";

export const Navbar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const { totalItems, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home, shortLabel: t.nav.home },
    { href: "/ahmed-soura", label: "Ahmed Soura", shortLabel: "Ahmed Soura" },
    { href: "/cours", label: t.nav.classes, shortLabel: t.nav.classes },
    { href: "/centre-interculturel", label: t.nav.yongonlon, shortLabel: lang === "en" ? "Center" : "Centre" },
    { href: "/yongonlon-production", label: t.nav.productions, shortLabel: "Productions" },
    { href: "/agenda", label: t.nav.agenda, shortLabel: t.nav.agenda },
    { href: "/boutique", label: t.nav.shop, shortLabel: t.nav.shop },
    { href: "/galerie", label: t.nav.gallery, shortLabel: t.nav.gallery },
    { href: "/dons", label: t.nav.support, shortLabel: lang === "en" ? "Donate" : "Dons" },
    { href: "/contact", label: t.nav.contact, shortLabel: t.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glassmorphism py-2 sm:py-2.5 border-b border-lime/10 shadow-[0_4px_30px_rgba(198,242,59,0.05)] glow-border"
          : "bg-gradient-to-b from-black/90 via-black/50 to-transparent py-2.5 sm:py-3.5"
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <a
          href="/"
          className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-lime shrink-0"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-sm overflow-hidden bg-white p-0.5 border border-white/20 transition-transform duration-300 group-hover:scale-105 shadow-md shrink-0">
            <Image
              src="/images/yongonlon-logo.jpg"
              alt="Yongonlon Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm sm:text-base 2xl:text-lg tracking-[0.16em] sm:tracking-[0.2em] uppercase font-bold text-white leading-tight">
              YONGONLON
            </span>
            <span className="hidden 2xl:block text-[9px] uppercase tracking-widest text-zinc-400 font-sans">
              {t.nav.tagline}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 2xl:gap-2.5 shrink-0" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[10px] 2xl:text-[11.5px] uppercase tracking-wider text-zinc-300 hover:text-lime transition-colors duration-200 relative py-1 px-1.5 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-lime hover:after:w-full after:transition-all after:duration-300 font-medium whitespace-nowrap"
            >
              <span className="2xl:hidden">{link.shortLabel}</span>
              <span className="hidden 2xl:inline">{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Desktop Action Controls (Cart + Lang + CTA + Key) */}
        <div className="hidden xl:flex items-center gap-1.5 2xl:gap-3 shrink-0">
          {/* Cart Icon trigger */}
          <button
            onClick={openCart}
            className="relative p-1.5 2xl:p-2 text-zinc-300 hover:text-lime transition-colors rounded-full hover:bg-white/5"
            aria-label="Ouvrir le panier"
          >
            <ShoppingBag className="w-4 h-4 2xl:w-5 2xl:h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-lime text-black font-bold text-[9px] flex items-center justify-center animate-bounce shadow-md">
                {totalItems}
              </span>
            )}
          </button>

          {/* Language Selector */}
          <div className="flex items-center bg-zinc-900/90 rounded-full p-0.5 border border-white/10 text-[10px] 2xl:text-[11px] font-semibold">
            <button
              onClick={() => setLang("fr")}
              className={`px-1.5 2xl:px-2 py-0.5 rounded-full transition-all duration-200 ${
                lang === "fr"
                  ? "bg-lime text-black font-bold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
              aria-label="Passer en français"
            >
              FR
            </button>
            <span className="text-zinc-600 px-0.5 text-[9px]">|</span>
            <button
              onClick={() => setLang("en")}
              className={`px-1.5 2xl:px-2 py-0.5 rounded-full transition-all duration-200 ${
                lang === "en"
                  ? "bg-lime text-black font-bold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>

          {/* Primary CTA Button */}
          <a
            href="/reservation"
            className="flex items-center gap-1.5 bg-lime hover:bg-lime-light text-black font-bold text-[10px] 2xl:text-xs tracking-wider uppercase px-3 py-1.5 2xl:px-4 2xl:py-2 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(198,242,59,0.25)] hover:shadow-[0_0_25px_rgba(198,242,59,0.45)] transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <span className="2xl:hidden">{lang === "en" ? "Book" : "Réserver"}</span>
            <span className="hidden 2xl:inline">{t.nav.bookClass}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Admin Direct Access Key Button (Desktop) */}
          <a
            href="/admin"
            className="p-1.5 2xl:p-2 text-lime hover:text-black bg-zinc-900/90 hover:bg-lime border border-lime/40 hover:border-lime rounded-full transition-all duration-200 shadow-sm flex items-center justify-center group"
            aria-label="Espace Administrateur"
            title="Espace Administrateur"
          >
            <Key className="w-3.5 h-3.5 2xl:w-4 2xl:h-4 transition-transform group-hover:scale-110" />
          </a>
        </div>

        {/* Mobile Controls (Lang + Cart + Key + Hamburger) */}
        <div className="flex xl:hidden items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Language Selector */}
          <div className="flex items-center bg-zinc-900/90 rounded-full p-0.5 border border-white/10 text-[10px] font-semibold">
            <button
              onClick={() => setLang("fr")}
              className={`px-1.5 py-0.5 rounded-full transition-all ${
                lang === "fr" ? "bg-lime text-black font-bold" : "text-zinc-400"
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-1.5 py-0.5 rounded-full transition-all ${
                lang === "en" ? "bg-lime text-black font-bold" : "text-zinc-400"
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Cart */}
          <button
            onClick={openCart}
            className="relative p-1.5 text-zinc-300 hover:text-lime"
            aria-label="Panier"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-lime text-black font-bold text-[9px] flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Admin Direct Access Key Button (Mobile) */}
          <a
            href="/admin"
            className="p-1.5 text-lime hover:text-black bg-zinc-900/90 hover:bg-lime border border-lime/40 hover:border-lime rounded-full transition-colors flex items-center justify-center"
            aria-label="Espace Administrateur"
            title="Espace Administrateur"
          >
            <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-zinc-300 hover:text-white bg-zinc-900/90 border border-white/10 rounded-full focus:outline-none flex items-center justify-center"
            aria-label="Ouvrir le menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#080808]/98 backdrop-blur-2xl border-b border-white/15 px-6 pt-4 pb-8 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-200 hover:text-lime tracking-wide py-2.5 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-zinc-600 text-xs">→</span>
              </a>
            ))}
          </nav>

          <div className="pt-3 flex flex-col gap-3">
            <a
              href="/reservation"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-lime text-black font-bold text-xs tracking-wider uppercase py-3.5 rounded-full shadow-lg"
            >
              {t.nav.bookClass}
            </a>

            <a
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-lime border border-lime/30 text-xs font-bold tracking-wider uppercase py-3 rounded-full transition-colors"
            >
              <Key className="w-4 h-4 text-lime" />
              <span>Espace Administrateur</span>
            </a>

            <div className="flex items-center justify-center gap-6 pt-2 text-zinc-400">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-lime">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-lime">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

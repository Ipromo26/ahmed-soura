"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    category: "cours",
    message: "",
    consent: false,
  });

  const whatsappNumber = "491637173662";
  const whatsappFormatted = "+49 163 717 36 62";

  // Build structured message for WhatsApp
  const generateWhatsAppMessage = () => {
    const categoryLabel =
      t.contact.form.categories.find((c) => c.value === formState.category)?.label ||
      formState.category;

    return `Bonjour Ahmed,

Nouvelle demande depuis le site web Ahmed Soura × Yongonlon :
• Nom : ${formState.name}
• Email : ${formState.email}
${formState.phone ? `• Téléphone : ${formState.phone}\n` : ""}${
      formState.organization
        ? `• Structure : ${formState.organization}\n`
        : ""
    }• Objet : ${categoryLabel}

Message :
${formState.message}`;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert("Veuillez renseigner votre nom, email et message.");
      return;
    }

    const text = generateWhatsAppMessage();
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setStatus("success");
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 scroll-mt-28 bg-[#0a0a0a] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-lime text-xs font-semibold tracking-widest uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>{t.contact.sectionTag}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            {t.contact.title}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Two Columns Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Coordinates & Direct WhatsApp Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct WhatsApp Callout Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121212] to-[#181818] border border-[#25D366]/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/50 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#25D366] block">
                    Contact Direct & Réactif
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    WhatsApp Ahmed Soura
                  </h3>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                Pour une réponse rapide concernant un cours, un atelier, une programmation ou une question urgente :
              </p>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  "Bonjour Ahmed, je vous contacte depuis votre site web officiel Ahmed Soura × Yongonlon."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-semibold text-xs transition-all shadow-lg shadow-[#25D366]/20 font-mono tracking-wide"
              >
                <span>{whatsappFormatted}</span>
                <span className="flex items-center gap-1 font-sans font-bold text-[11px]">
                  <span>Ouvrir WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </div>

            {/* Traditional Contact Info */}
            <div className="bg-zinc-950 p-6 sm:p-8 rounded-2xl border border-white/15 space-y-6">
              <h3 className="font-serif text-xl font-bold text-white">
                Coordonnées Officielles
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 text-zinc-300">
                  <MapPin className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Localisation :</span>
                    <span className="text-zinc-400 text-xs">
                      {t.contact.berlinLabel}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-zinc-300">
                  <Mail className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Email général :</span>
                    <a
                      href="mailto:contact@yongonlon.org"
                      className="text-lime text-xs hover:underline"
                    >
                      contact@yongonlon.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-zinc-300">
                  <Mail className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Diffusion & Tournées :</span>
                    <a
                      href="mailto:booking@ahmedsoura.com"
                      className="text-lime text-xs hover:underline"
                    >
                      booking@ahmedsoura.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-zinc-300">
                  <Phone className="w-5 h-5 text-lime shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Téléphone & WhatsApp :</span>
                    <a
                      href={`tel:+${whatsappNumber}`}
                      className="text-zinc-300 text-xs hover:text-white"
                    >
                      {whatsappFormatted}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-lime hover:border-lime transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-lime hover:border-lime transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-lime hover:border-lime transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form with WhatsApp Send */}
          <div className="lg:col-span-7 bg-zinc-950 p-6 sm:p-10 rounded-2xl border border-white/15 shadow-2xl">
            {status !== "success" ? (
              <form onSubmit={handleSendWhatsApp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5">
                      {t.contact.form.name} *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.contact.form.namePlaceholder}
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-lime focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5">
                      {t.contact.form.email} *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t.contact.form.emailPlaceholder}
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-lime focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone (Optional) */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5">
                      Votre Téléphone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+49 ... / +33 ... / +226 ..."
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-lime focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Organization (Optional) */}
                  <div>
                    <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5">
                      Structure / Compagnie (Optionnel)
                    </label>
                    <input
                      type="text"
                      placeholder="Festival, Théâtre, Studio..."
                      value={formState.organization}
                      onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-lime focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5">
                    {t.contact.form.category} *
                  </label>
                  <select
                    value={formState.category}
                    onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-lime focus:outline-none transition-colors"
                  >
                    {t.contact.form.categories.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5">
                    {t.contact.form.message} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder={t.contact.form.messagePlaceholder}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-lime focus:outline-none transition-colors"
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={formState.consent}
                    onChange={(e) => setFormState({ ...formState, consent: e.target.checked })}
                    className="mt-1 rounded bg-zinc-900 border-white/20 text-lime focus:ring-lime"
                  />
                  <label htmlFor="consent" className="text-xs text-zinc-400 cursor-pointer">
                    {t.contact.form.consent}
                  </label>
                </div>

                {/* Submit Options */}
                <div className="pt-2 space-y-3">
                  {/* Primary: Send directly to WhatsApp */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:shadow-[0_0_35px_rgba(37,211,102,0.5)] flex items-center justify-center gap-2.5"
                  >
                    <MessageCircle className="w-5 h-5 fill-black" />
                    <span>Envoyer directement sur le WhatsApp d'Ahmed</span>
                  </button>

                  {/* Secondary: Send by standard Email */}
                  <button
                    type="button"
                    onClick={handleSendEmail}
                    disabled={status === "submitting"}
                    className="w-full py-3 px-6 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-medium text-xs tracking-wider border border-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Envoyer par email classique</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Message transmis à Ahmed Soura
                </h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                  Votre demande a été initiée. Si vous avez choisi WhatsApp, la conversation s'est ouverte sur votre application avec le message pré-rempli.
                </p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setFormState({
                      name: "",
                      email: "",
                      phone: "",
                      organization: "",
                      category: "cours",
                      message: "",
                      consent: false,
                    });
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-zinc-900 border border-white/15 text-white text-xs uppercase hover:border-lime"
                >
                  Envoyer une autre demande
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

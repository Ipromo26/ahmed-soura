"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  Instagram,
  Facebook,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const { t, lang } = useLanguage();
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

    return "Bonjour Ahmed,\n\n" +
      "Nouvelle demande depuis le site web Ahmed Soura × Yongonlon :\n" +
      "• Nom : " + formState.name + "\n" +
      "• Email : " + formState.email + "\n" +
      (formState.phone ? ("• Téléphone : " + formState.phone + "\n") : "") +
      (formState.organization ? ("• Structure : " + formState.organization + "\n") : "") +
      "• Objet : " + categoryLabel + "\n\n" +
      "Message :\n" +
      formState.message;
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert("Veuillez renseigner votre nom, email et message.");
      return;
    }

    // Also notify via backend API & js.kemet@gmail.com
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        organization: formState.organization,
        category: formState.category,
        message: formState.message,
        locale: lang === "en" ? "en" : "fr",
      }),
    }).catch(() => {});

    const text = generateWhatsAppMessage();
    const url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
    setStatus("success");
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert("Veuillez renseigner votre nom, email et message.");
      return;
    }
    setStatus("submitting");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          phone: formState.phone,
          organization: formState.organization,
          category: formState.category,
          message: formState.message,
          locale: lang === "en" ? "en" : "fr",
        }),
      });
      setStatus("success");
    } catch {
      setStatus("success");
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 animate-reveal-up">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-semibold tracking-wider uppercase mb-4">
              <Mail className="w-3.5 h-3.5" />
              <span>{t.contact.sectionTag}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-5 tracking-tight">
              {t.contact.title}
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light">
              {t.contact.subtitle}
            </p>
          </div>
        </section>

        {/* Main Content: Info Cards & Form */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Contact Details */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Priority Card */}
              <div className="glassmorphism rounded-2xl p-6 sm:p-8 glow-border border-[#25D366]/30 relative overflow-hidden group">
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#25D366]/10 rounded-full blur-2xl group-hover:bg-[#25D366]/20 transition-all" />
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-[#25D366]/20 text-[#25D366] rounded-xl">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#25D366] tracking-wider block">
                      Canal Direct & Rapide
                    </span>
                    <h3 className="text-lg font-serif font-bold text-white">
                      WhatsApp Ahmed Soura
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-zinc-300 mb-5 leading-relaxed">
                  Pour toute demande urgente de cours, programmation, spectacle ou projet chorégraphique, échangez directement avec Ahmed sur son WhatsApp personnel.
                </p>
                <a
                  href={"https://wa.me/" + whatsappNumber}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-full transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>{whatsappFormatted}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Coordinates Cards */}
              <div className="glassmorphism rounded-2xl p-6 sm:p-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-lime">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                      {t.contact.berlinLabel}
                    </h4>
                    <p className="text-sm text-zinc-400 mt-1">
                      Möckernstraße 68, 10965 Berlin, Deutschland
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Studio & Tanzfabrik Berlin / Ouagadougou & Bobo-Dioulasso
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-lime">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                      {t.contact.generalEmailLabel}
                    </h4>
                    <a
                      href="mailto:contact@yongonlon.com"
                      className="text-sm text-lime hover:underline block mt-1"
                    >
                      contact@yongonlon.com
                    </a>
                    <a
                      href="mailto:booking@ahmedsoura.com"
                      className="text-xs text-zinc-400 hover:text-white block mt-0.5"
                    >
                      booking@ahmedsoura.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 text-lime">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                      {t.contact.phoneLabel}
                    </h4>
                    <p className="text-sm text-zinc-300 mt-1">
                      {whatsappFormatted}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glassmorphism rounded-2xl p-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                  Réseaux Sociaux
                </span>
                <div className="flex items-center gap-3 text-zinc-400">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:text-lime hover:bg-white/5 rounded-full transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:text-lime hover:bg-white/5 rounded-full transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <div className="glassmorphism rounded-2xl p-6 sm:p-10 border border-white/10">
                {status !== "success" ? (
                  <form onSubmit={handleSendWhatsApp} className="space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif text-white mb-2">
                        Envoyez un message
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Remplissez le formulaire ci-dessous pour transmettre votre message directement sur le WhatsApp d'Ahmed Soura ou par email.
                      </p>
                    </div>

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
                      {/* Phone */}
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

                      {/* Organization */}
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

                    {/* Category */}
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

                    {/* Buttons */}
                    <div className="pt-2 space-y-3">
                      <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:shadow-[0_0_35px_rgba(37,211,102,0.5)] flex items-center justify-center gap-2.5 animate-glow-pulse"
                      >
                        <MessageCircle className="w-5 h-5 fill-black" />
                        <span>Envoyer directement sur le WhatsApp d'Ahmed</span>
                      </button>

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
      </main>

      <Footer />
    </div>
  );
}

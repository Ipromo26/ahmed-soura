"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { ClassItem } from "@/types/i18n";
import { useBooking, DanceDiscipline } from "@/context/BookingContext";
import {
  Calendar,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Check,
  MessageCircle,
  Printer,
  FileText,
} from "lucide-react";

/**
 * Format session date nicely with weekday
 */
function formatSessionDate(dateStr: string, locale: "fr" | "en" = "fr"): string {
  try {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) {
        const formatted = d.toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
      }
    }
  } catch (e) {}
  return dateStr;
}

export default function ReservationPage() {
  const { t, lang } = useLanguage();
  const { slots, disciplines, createBooking } = useBooking();
  const activeDisciplines = disciplines && disciplines.length > 0 ? disciplines : t.classes.items;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<ClassItem | DanceDiscipline>(activeDisciplines[0] || t.classes.items[0]);
  const [formData, setFormData] = useState({
    date: "2026-10-14",
    timeSlot: "18:30 - 20:00",
    name: "",
    email: "",
    phone: "",
    level: "Tous niveaux",
    participants: "1",
    message: "",
  });
  const [bookingRef, setBookingRef] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pricing calculations
  const unitPrice = parseInt(((selectedService as any).price || "25").toString().replace(/[^0-9]/g, "")) || 25;
  const numParticipants = Number(formData.participants) || 1;
  const totalAmount = unitPrice * numParticipants;
  const formattedTotalPrice = `${totalAmount} € (${numParticipants} × ${unitPrice} €)`;

  // Slots matching selected date
  const daySlots = slots.filter((s) => s.date === formData.date && s.isOpen);

  // Fallback slots if no specific slot created for that date
  const defaultTimeSlots = [
    "10:00 - 11:30 (Matinée)",
    "14:00 - 15:30 (Après-midi)",
    "18:30 - 20:00 (Soirée)",
  ];

  // Distinct upcoming dates with open slots
  const availableUpcomingDates = Array.from(
    new Set(slots.filter((s) => s.isOpen).map((s) => s.date))
  ).sort().slice(0, 5);

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 5) {
      setIsSubmitting(true);
      const generatedRef = "AS-" + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(generatedRef);

      const paymentStatusText = lang === "en" 
        ? "Payable on site at studio (Cash / Card) — Guaranteed" 
        : "Règlement sur place au studio (Espèces / Carte) — Garanti";

      createBooking({
        id: generatedRef,
        clientName: formData.name,
        clientEmail: formData.email,
        clientPhone: formData.phone,
        discipline: selectedService.title,
        date: formData.date,
        timeSlot: formData.timeSlot,
        level: formData.level,
        participants: numParticipants,
        totalPrice: formattedTotalPrice,
        paymentStatus: paymentStatusText,
        notes: formData.message,
      });

      // Dispatch real confirmation & official receipt emails in background
      try {
        await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookingId: generatedRef,
            clientName: formData.name,
            clientEmail: formData.email,
            clientPhone: formData.phone,
            discipline: selectedService.title,
            date: formData.date,
            timeSlot: formData.timeSlot,
            level: formData.level,
            participants: numParticipants,
            totalPrice: formattedTotalPrice,
            paymentStatus: paymentStatusText,
            notes: formData.message,
            locale: lang,
          }),
        });
      } catch (err) {
        console.warn("[BOOKING DISPATCH]", err);
      } finally {
        setIsSubmitting(false);
        setCurrentStep(6);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1 && currentStep < 6) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] text-[#f5f2eb] flex flex-col selection:bg-lime selection:text-black">
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-14 bg-[#0a0a0a] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-lime transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Retour à l'accueil</span>
          </Link>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-lime text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Système de Réservation Officiel</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {t.bookingPage.heroTitle}
            </h1>
            <p className="text-zinc-400 text-sm max-w-xl">
              {t.bookingPage.heroSubtitle}
            </p>
          </div>

          {/* Steps Indicator Progress Bar */}
          <div className="pt-8 grid grid-cols-6 gap-2 text-[10px] uppercase tracking-wider font-semibold text-center">
            {["Discipline", "Créneau", "Coordonnées", "Niveau", "Récapitulatif", "Confirmation"].map(
              (stepName, index) => {
                const stepNum = index + 1;
                const isActive = currentStep === stepNum;
                const isPassed = currentStep > stepNum;

                return (
                  <div key={index} className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-full h-1.5 rounded-full transition-all ${
                        isActive
                          ? "bg-lime shadow-[0_0_10px_rgba(198,242,59,0.5)]"
                          : isPassed
                          ? "bg-emerald-500"
                          : "bg-zinc-800"
                      }`}
                    />
                    <span
                      className={`hidden sm:block truncate ${
                        isActive ? "text-lime font-bold" : isPassed ? "text-zinc-300" : "text-zinc-500"
                      }`}
                    >
                      {stepName}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Main Form Body */}
      <section className="py-16 bg-[#080808] flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-950 p-6 sm:p-10 rounded-2xl border border-white/15 shadow-2xl">
            {currentStep < 6 ? (
              <form onSubmit={handleNext} className="space-y-6">
                {/* Step 1: Select Service */}
                {currentStep === 1 && (
                  <div className="space-y-5">
                    <div className="border-b border-white/10 pb-3">
                      <h2 className="font-serif text-2xl font-bold text-white">
                        1. Choisissez votre atelier ou cours
                      </h2>
                      <p className="text-xs text-zinc-400 mt-1">
                        Sélectionnez la discipline dispensée par Ahmed Soura.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {activeDisciplines.map((item) => {
                        const isSelected = selectedService.id === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setSelectedService(item)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                              isSelected
                                ? "bg-zinc-900 border-lime ring-1 ring-lime shadow-md"
                                : "bg-zinc-900/50 border-white/10 hover:border-white/30"
                            }`}
                          >
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase font-bold text-lime">
                                  {item.category}
                                </span>
                                <span className="text-xs text-zinc-400 font-mono">
                                  {item.duration}
                                </span>
                              </div>
                              <h3 className="font-serif text-base font-bold text-white">
                                {item.title}
                              </h3>
                              <p className="text-xs text-zinc-400 line-clamp-2">
                                {item.desc}
                              </p>
                            </div>

                            <div className="pt-3 mt-2 border-t border-white/5 flex items-center justify-between text-xs">
                              <span className="text-zinc-300">{item.level}</span>
                              <span className="text-lime font-bold">{item.price}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 2: Date and Time Slot */}
                {currentStep === 2 && (
                  <div className="space-y-5">
                    <div className="border-b border-white/10 pb-3">
                      <h2 className="font-serif text-2xl font-bold text-white">
                        2. Date & Créneau horaire
                      </h2>
                      <p className="text-xs text-zinc-400 mt-1">
                        Discipline : <strong className="text-lime">{selectedService.title}</strong>
                      </p>
                    </div>

                    {/* Quick-pick dates configured by Ahmed Soura */}
                    {availableUpcomingDates.length > 0 && (
                      <div className="space-y-2">
                        <label className="block text-xs uppercase font-semibold text-zinc-400">
                          Prochaines dates programmées au calendrier :
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {availableUpcomingDates.map((d) => {
                            const isSelected = formData.date === d;
                            const count = slots.filter((s) => s.date === d && s.isOpen).length;
                            return (
                              <button
                                key={d}
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => {
                                    const matching = slots.find((s) => s.date === d && s.isOpen);
                                    return {
                                      ...prev,
                                      date: d,
                                      timeSlot: matching ? matching.startTime + " - " + matching.endTime : prev.timeSlot,
                                      level: matching ? matching.level : prev.level,
                                    };
                                  });
                                }}
                                className={"px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 " +
                                  (isSelected
                                    ? "bg-lime text-black font-bold shadow-[0_0_15px_rgba(198,242,59,0.3)]"
                                    : "bg-zinc-900 text-zinc-300 hover:text-white border border-white/10")}
                              >
                                <span>{d}</span>
                                <span className={"text-[10px] px-1.5 py-0.5 rounded-full " + (isSelected ? "bg-black/20 text-black" : "bg-white/10 text-lime")}>
                                  {count} séance{count > 1 ? "s" : ""}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-xs uppercase font-semibold text-zinc-300 mb-2">
                          Ou sélectionnez une date
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-lime focus:outline-none"
                        />
                      </div>

                      {/* Display Slots for this specific day */}
                      <div>
                        <label className="block text-xs uppercase font-semibold text-zinc-300 mb-2">
                          Séances disponibles le {formData.date}
                        </label>

                        {daySlots.length > 0 ? (
                          <div className="space-y-2.5">
                            {daySlots.map((slot) => {
                              const slotLabel = slot.startTime + " - " + slot.endTime;
                              const isSelected = formData.timeSlot === slotLabel;
                              const spotsLeft = slot.maxCapacity - slot.bookedCount;
                              const isFull = spotsLeft <= 0;

                              return (
                                <label
                                  key={slot.id}
                                  className={"flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all " +
                                    (isFull
                                      ? "opacity-50 cursor-not-allowed bg-zinc-950 border-white/5"
                                      : isSelected
                                      ? "bg-zinc-900 border-lime ring-1 ring-lime shadow-md"
                                      : "bg-zinc-900/40 border-white/10 hover:border-white/30")}
                                >
                                  <div className="flex items-center gap-3">
                                    <input
                                      type="radio"
                                      name="timeSlot"
                                      disabled={isFull}
                                      checked={isSelected}
                                      onChange={() =>
                                        setFormData({
                                          ...formData,
                                          timeSlot: slotLabel,
                                          level: slot.level,
                                        })
                                      }
                                      className="text-lime focus:ring-lime"
                                    />
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-white">
                                          {slotLabel}
                                        </span>
                                        <span className="text-[10px] uppercase font-bold text-lime bg-lime/10 px-2 py-0.5 rounded border border-lime/20">
                                          {slot.level}
                                        </span>
                                      </div>
                                      <span className="text-xs text-zinc-400 block mt-0.5">
                                        {slot.disciplineTitle} — {slot.location}
                                      </span>
                                    </div>
                                  </div>

                                  <div>
                                    <span className={"text-xs font-mono font-bold px-2.5 py-1 rounded-full " +
                                      (isFull ? "bg-rose-500/10 text-rose-400" : spotsLeft <= 3 ? "bg-amber-500/10 text-amber-300" : "bg-emerald-500/10 text-emerald-300")}>
                                      {isFull ? "Complet" : spotsLeft + " place" + (spotsLeft > 1 ? "s" : "") + " restante" + (spotsLeft > 1 ? "s" : "")}
                                    </span>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-xs text-zinc-400 mb-2">
                              Aucune session collective pré-programmée ce jour-là. Vous pouvez demander un créneau sur-mesure :
                            </p>
                            {defaultTimeSlots.map((slot) => (
                              <label
                                key={slot}
                                className={"flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all " +
                                  (formData.timeSlot === slot
                                    ? "bg-zinc-900 border-lime text-white font-semibold"
                                    : "bg-zinc-900/40 border-white/10 text-zinc-300 hover:border-white/20")}
                              >
                                <input
                                  type="radio"
                                  name="timeSlot"
                                  checked={formData.timeSlot === slot}
                                  onChange={() => setFormData({ ...formData, timeSlot: slot })}
                                  className="text-lime focus:ring-lime"
                                />
                                <span className="text-sm">{slot}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {/* Step 3: Participant Information */}
                {currentStep === 3 && (
                  <div className="space-y-5">
                    <div className="border-b border-white/10 pb-3">
                      <h2 className="font-serif text-2xl font-bold text-white">
                        3. Vos Coordonnées
                      </h2>
                      <p className="text-xs text-zinc-400 mt-1">
                        Ces informations serviront à l'envoi de votre confirmation de stage.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5">
                          Nom & Prénom *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ex. Aminata Traoré"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-lime focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5">
                          Adresse E-mail *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="nom@exemple.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-lime focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5">
                          Téléphone mobile
                        </label>
                        <input
                          type="tel"
                          placeholder="+49 ... / +33 ... / +226 ..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-lime focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5">
                          Nombre de participants
                        </label>
                        <select
                          value={formData.participants}
                          onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-lime focus:outline-none"
                        >
                          <option value="1">1 personne</option>
                          <option value="2">2 personnes</option>
                          <option value="3">3 personnes</option>
                          <option value="groupe">Groupe (4+)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Level & Message */}
                {currentStep === 4 && (
                  <div className="space-y-5">
                    <div className="border-b border-white/10 pb-3">
                      <h2 className="font-serif text-2xl font-bold text-white">
                        4. Niveau & Attentes
                      </h2>
                      <p className="text-xs text-zinc-400 mt-1">
                        Permet à Ahmed Soura d'adapter le contenu pédagogique.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase font-semibold text-zinc-300 mb-2">
                          Votre niveau de pratique en danse
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {[
                            { val: "debutant", label: "Débutant" },
                            { val: "intermediaire", label: "Intermédiaire" },
                            { val: "avance", label: "Avancé" },
                            { val: "pro", label: "Professionnel" },
                          ].map((lvl) => (
                            <button
                              type="button"
                              key={lvl.val}
                              onClick={() => setFormData({ ...formData, level: lvl.val })}
                              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                                formData.level === lvl.val
                                  ? "bg-lime text-black border-lime font-bold shadow"
                                  : "bg-zinc-900 text-zinc-300 border-white/10 hover:border-white/30"
                              }`}
                            >
                              {lvl.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5">
                          Message ou attentes spécifiques (Optionnel)
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Indiquez vos objectifs ou antécédents corporels..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:border-lime focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 5: Summary */}
                {currentStep === 5 && (
                  <div className="space-y-5">
                    <div className="border-b border-white/10 pb-3">
                      <h2 className="font-serif text-2xl font-bold text-white">
                        {lang === "en" ? "5. Booking Summary & Verification" : "5. Récapitulatif de votre demande"}
                      </h2>
                      <p className="text-xs text-zinc-400 mt-1">
                        {lang === "en" ? "Check the exact details before issuing your official receipt." : "Vérifiez l'exactitude des informations avant l'émission de votre reçu officiel."}
                      </p>
                    </div>

                    <div className="bg-zinc-900 p-6 rounded-xl border border-white/10 space-y-3.5 text-sm">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-400">Discipline :</span>
                        <span className="font-bold text-white text-right">{selectedService.title}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-400">{lang === "en" ? "Selected Date :" : "Jour & Date retenue :"}</span>
                        <span className="font-semibold text-lime text-right">{formatSessionDate(formData.date, lang)}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-400">{lang === "en" ? "Time Slot :" : "Horaire :"}</span>
                        <span className="text-white font-mono text-right">{formData.timeSlot}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-400">{lang === "en" ? "Location / Studio :" : "Lieu / Studio :"}</span>
                        <span className="text-zinc-200 text-right text-xs">Tanzfabrik Berlin Studio 2 (Möckernstraße 68)</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-400">{lang === "en" ? "Participant(s) :" : "Participant(s) :"}</span>
                        <span className="text-white text-right">{formData.name || "Non renseigné"} ({numParticipants} pers.)</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-400">{lang === "en" ? "Contact Email :" : "E-mail de contact :"}</span>
                        <span className="text-white text-right">{formData.email || "Non renseigné"}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-zinc-400">{lang === "en" ? "Tariff & Total :" : "Tarif & Total :"}</span>
                        <span className="font-bold text-lime text-base text-right">{formattedTotalPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">{lang === "en" ? "Payment terms :" : "Modalité de règlement :"}</span>
                        <span className="text-emerald-400 font-semibold text-xs text-right">
                          {lang === "en" ? "On site at studio (Cash or Card)" : "Sur place au studio (Espèces ou Carte)"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-zinc-400 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                      <ShieldCheck className="w-5 h-5 text-lime flex-shrink-0" />
                      <span>
                        {lang === "en" 
                          ? "No advance card charge required. Official receipt and studio access details generated instantly." 
                          : "Aucun paiement préalable requis. Reçu officiel et code d'accès studio envoyés immédiatement par email."}
                      </span>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="text-xs font-semibold uppercase tracking-wider text-zinc-400 hover:text-white flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>{lang === "en" ? "Previous" : "Précédent"}</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all shadow-[0_0_20px_rgba(198,242,59,0.3)] disabled:opacity-50"
                  >
                    <span>
                      {isSubmitting
                        ? (lang === "en" ? "Generating Receipt..." : "Génération du reçu...")
                        : (currentStep === 5 
                            ? (lang === "en" ? "Confirm & Generate Official Receipt" : "Confirmer & Générer mon Reçu") 
                            : (lang === "en" ? "Next Step" : "Étape suivante"))}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              /* Step 6: Instant Confirmation State & Printable Official Receipt */
              <div className="py-6 space-y-6">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 bg-lime/10 text-lime rounded-full flex items-center justify-center mx-auto border border-lime/30 shadow-[0_0_30px_rgba(198,242,59,0.2)]">
                    <Check className="w-8 h-8" />
                  </div>
                  <span className="text-xs uppercase font-mono tracking-widest text-lime block font-bold">
                    ✓ {lang === "en" ? "OFFICIAL BOOKING RECEIPT CONFIRMED" : "REÇU OFFICIEL DE RÉSERVATION CONFIRMÉ"}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                    {lang === "en" ? "Booking & Receipt Validated!" : "Réservation & Reçu Validés !"}
                  </h2>
                  <p className="text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
                    {lang === "en"
                      ? `Thank you ${formData.name}. Your booking for ${selectedService.title} has been confirmed. A complete receipt has been sent to ${formData.email}.`
                      : `Merci ${formData.name}. Votre réservation pour ${selectedService.title} a bien été enregistrée. Un reçu officiel complet a été expédié à ${formData.email}.`}
                  </p>
                </div>

                {/* Official Receipt Card */}
                <div className="bg-[#121214] border border-white/15 rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-2xl relative overflow-hidden text-left">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lime via-yellow-400 to-lime" />
                  
                  {/* Card Header */}
                  <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-5">
                    <div>
                      <div className="text-[10px] uppercase font-mono tracking-widest text-lime font-bold">
                        COMPAGNIE AHMED SOURA · YONGONLON
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white mt-1">
                        {selectedService.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Studio 2 Tanzfabrik Berlin · Möckernstraße 68, 10965 Berlin
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono text-zinc-400 block">N° REÇU</span>
                      <span className="font-mono text-sm sm:text-base font-bold text-lime bg-lime/10 px-2.5 py-1 rounded border border-lime/30 inline-block mt-1">
                        {bookingRef}
                      </span>
                    </div>
                  </div>

                  {/* Receipt Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-5">
                    <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-white/5">
                      <span className="text-zinc-500 uppercase text-[10px] font-mono block mb-1">
                        📅 {lang === "en" ? "DAY & DATE" : "JOUR & DATE DE SÉANCE"}
                      </span>
                      <span className="text-lime font-bold text-sm block">
                        {formatSessionDate(formData.date, lang)}
                      </span>
                      <span className="text-zinc-400 font-mono text-xs mt-0.5 block">
                        ⏰ {formData.timeSlot}
                      </span>
                    </div>

                    <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-white/5">
                      <span className="text-zinc-500 uppercase text-[10px] font-mono block mb-1">
                        👤 {lang === "en" ? "PARTICIPANT" : "DANSEUR INSCRIT"}
                      </span>
                      <span className="text-white font-bold text-sm block truncate">
                        {formData.name}
                      </span>
                      <span className="text-zinc-400 text-xs block mt-0.5">
                        {numParticipants} pers. · {formData.level}
                      </span>
                    </div>

                    <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-white/5">
                      <span className="text-zinc-500 uppercase text-[10px] font-mono block mb-1">
                        💶 {lang === "en" ? "TOTAL TARIFF" : "TARIF & MONTANT TOTAL"}
                      </span>
                      <span className="text-lime font-bold text-base block">
                        {formattedTotalPrice}
                      </span>
                      <span className="text-zinc-400 text-[11px] block mt-0.5">
                        {lang === "en" ? "Guaranteed reservation" : "Réservation garantie"}
                      </span>
                    </div>

                    <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-white/5">
                      <span className="text-zinc-500 uppercase text-[10px] font-mono block mb-1">
                        💳 {lang === "en" ? "PAYMENT STATUS" : "STATUT DU RÈGLEMENT"}
                      </span>
                      <span className="text-emerald-400 font-semibold text-xs block">
                        ✓ {lang === "en" ? "On site at studio (Cash / Card)" : "Sur place au studio (Espèces / Carte)"}
                      </span>
                      <span className="text-zinc-400 text-[11px] block mt-0.5">
                        {lang === "en" ? "No upfront charge" : "Aucun prélèvement préalable"}
                      </span>
                    </div>
                  </div>

                  {/* Footnote */}
                  <div className="text-[11px] text-zinc-400 border-t border-white/10 pt-3.5 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
                    <span>
                      💡 Arrivée conseillée : 10 min avant · Tenue confortable
                    </span>
                    <span className="font-mono text-zinc-500 text-[10px]">
                      Émis le {new Date().toLocaleDateString(lang === "en" ? "en-US" : "fr-FR")}
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs uppercase tracking-wider transition-all border border-white/15 shadow-md"
                  >
                    <Printer className="w-4 h-4 text-lime" />
                    <span>{lang === "en" ? "Print / Save Receipt (PDF)" : "Imprimer / Enregistrer le Reçu (PDF)"}</span>
                  </button>

                  <a
                    href={`https://wa.me/491637173662?text=${encodeURIComponent(
                      `Bonjour Ahmed Soura, j'ai bien réservé ma séance pour "${selectedService.title}" le ${formatSessionDate(formData.date, "fr")} (${formData.timeSlot}). Référence Reçu: ${bookingRef} - Nom: ${formData.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#25D366]/20"
                  >
                    <MessageCircle className="w-4 h-4 fill-black" />
                    <span>{lang === "en" ? "Message Ahmed on WhatsApp" : "Notifier Ahmed sur WhatsApp"}</span>
                  </a>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(1);
                      setBookingRef("");
                    }}
                    className="text-xs uppercase tracking-wider text-zinc-400 hover:text-lime underline transition-colors"
                  >
                    {lang === "en" ? "Make another booking" : "Effectuer une autre réservation"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

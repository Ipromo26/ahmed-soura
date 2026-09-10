"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ClassItem } from "@/types/i18n";
import { useBooking, DanceDiscipline } from "@/context/BookingContext";
import {
  Calendar,
  Clock,
  User,
  Users,
  Sparkles,
  MapPin,
  CheckCircle2,
  X,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

export const ClassesSection: React.FC = () => {
  const { t } = useLanguage();
  const { disciplines } = useBooking();
  const activeClasses = disciplines && disciplines.length > 0 ? disciplines : t.classes.items;
  const [selectedClass, setSelectedClass] = useState<ClassItem | DanceDiscipline | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    date: "",
    participants: "1",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOpenBooking = (cls?: ClassItem | DanceDiscipline) => {
    if (cls) setSelectedClass(cls);
    else setSelectedClass(activeClasses[0]);
    setBookingStep(1);
    setIsSubmitted(false);
    setBookingModalOpen(true);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <section id="cours" className="pt-36 sm:pt-44 pb-28 bg-[#0a0a0a] border-t border-white/10 relative scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/95 border border-lime/50 text-lime text-xs font-semibold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(198,242,59,0.3)]">
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.classes.sectionTag}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {t.classes.title}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-zinc-400 text-sm max-w-md">
              {t.classes.subtitle}
            </p>
            <a
              href="/cours"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lime hover:underline whitespace-nowrap"
            >
              <span>Voir tous les cours</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 2-Part Layout: Classes Grid & Upcoming Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 6 Services/Courses */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeClasses.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-lime/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:bg-zinc-900"
                onClick={() => handleOpenBooking(item)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-lime/10 text-lime border border-lime/30 shadow-sm">
                      {item.category}
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      {item.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-lime transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-300">
                    {item.level}
                  </span>
                  <a href="/reservation" className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(198,242,59,0.3)] transition-all transform hover:-translate-y-0.5">
                    <span>Réserver</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Upcoming Calendar Schedule Widget */}
          <div className="lg:col-span-4 bg-zinc-950 p-6 rounded-2xl border border-white/15 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-lime" />
                <h3 className="text-sm uppercase tracking-wider font-bold text-white">
                  {t.classes.upcomingTitle}
                </h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            </div>

            <div className="space-y-4">
              {t.classes.schedule.map((slot, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-white/10 hover:border-lime/30 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-lime">{slot.date}</span>
                    <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-zinc-400">
                      {slot.time}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white">
                    {slot.title}
                  </h4>

                  <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-500" />
                      {slot.location}
                    </span>
                    <span className="text-emerald-400 text-[11px] font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {slot.spots}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="/reservation"
              className="w-full py-3.5 px-4 rounded-full bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(198,242,59,0.35)] flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>{t.classes.ctaBook}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <div className="text-[11px] text-zinc-500 text-center leading-relaxed">
              Pour des sessions d'ateliers privés ou des interventions de compagnie, contactez directement l'équipe de production.
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal Flow */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#101010] border border-white/20 rounded-2xl w-full max-w-lg p-6 sm:p-8 relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setBookingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Steps Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-lime text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Étape {bookingStep} sur 3</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {selectedClass?.title || "Réservation de cours"}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Enseignement par Ahmed Soura — Berlin & Burkina Faso
                  </p>
                </div>

                <form onSubmit={handleNextStep} className="space-y-4">
                  {bookingStep === 1 && (
                    <div className="space-y-3">
                      <label className="block text-xs uppercase font-semibold text-zinc-300">
                        Discipline sélectionnée
                      </label>
                      <select
                        value={selectedClass?.id}
                        onChange={(e) => {
                          const found = t.classes.items.find((c) => c.id === e.target.value);
                          if (found) setSelectedClass(found);
                        }}
                        className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                      >
                        {t.classes.items.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title} ({c.duration})
                          </option>
                        ))}
                      </select>

                      <label className="block text-xs uppercase font-semibold text-zinc-300 pt-2">
                        Créneau / Session souhaitée
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                      />
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                          Nom & Prénom
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Votre nom"
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                          Adresse E-mail
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="votre.email@domaine.com"
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                          Nombre de participants
                        </label>
                        <select
                          value={bookingForm.participants}
                          onChange={(e) => setBookingForm({ ...bookingForm, participants: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                        >
                          <option value="1">1 participant</option>
                          <option value="2">2 participants</option>
                          <option value="3+">Groupe (3+)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {bookingStep === 3 && (
                    <div className="space-y-3">
                      <div className="bg-zinc-900 p-4 rounded-xl border border-white/10 space-y-2 text-xs">
                        <span className="text-zinc-400 block uppercase font-bold text-[10px] text-lime">
                          Récapitulatif de la réservation
                        </span>
                        <div className="flex justify-between text-white">
                          <span>Cours :</span>
                          <span className="font-semibold">{selectedClass?.title}</span>
                        </div>
                        <div className="flex justify-between text-white">
                          <span>Date :</span>
                          <span>{bookingForm.date || "À convenir"}</span>
                        </div>
                        <div className="flex justify-between text-white">
                          <span>Participant :</span>
                          <span>{bookingForm.name} ({bookingForm.email})</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                          Message ou besoins particuliers (facultatif)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Précisez votre niveau ou attentes..."
                          value={bookingForm.message}
                          onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                          className="w-full bg-zinc-900 border border-white/15 rounded-lg px-3 py-2 text-sm text-white focus:border-lime focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    {bookingStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => setBookingStep(bookingStep - 1)}
                        className="text-xs uppercase tracking-wider font-semibold text-zinc-400 hover:text-white"
                      >
                        Précédent
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-full bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      {bookingStep === 3 ? "Confirmer la demande" : "Suivant"}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-lime/10 text-lime rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Demande de réservation enregistrée
                </h3>
                <p className="text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
                  Merci {bookingForm.name || ""} ! Votre demande pour <strong>{selectedClass?.title}</strong> a bien été prise en compte. Notre équipe vous contactera sous 24h pour confirmer la disponibilité du créneau.
                </p>
                <button
                  onClick={() => setBookingModalOpen(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-zinc-900 border border-white/15 text-white text-xs uppercase tracking-wider hover:border-lime"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

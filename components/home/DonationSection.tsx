"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, ShieldCheck, ArrowRight, CheckCircle2, ArrowUpRight } from "lucide-react";

export const DonationSection: React.FC = () => {
  const { t } = useLanguage();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);

  const amounts = [25, 50, 100];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    setDonationSuccess(true);
  };

  return (
    <section id="soutenir" className="py-16 sm:py-24 scroll-mt-28 bg-[#080808] border-t border-white/10 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-lime/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-lime text-xs font-semibold tracking-widest uppercase">
              <Heart className="w-3.5 h-3.5 fill-lime" />
              <span>{t.donation.sectionTag}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {t.donation.title}
            </h2>

            <p className="text-zinc-300 text-lg leading-relaxed font-serif italic border-l-2 border-lime pl-4">
              {t.donation.subtitle}
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-xl">
              {t.donation.description}
            </p>

            <div className="pt-2">
              <a
                href="/dons"
                className="inline-flex items-center gap-2 text-sm font-semibold text-lime hover:underline"
              >
                <span>Découvrir l'affectation des dons & reçus fiscaux</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-4 flex items-center gap-3 text-xs text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-lime" />
              <span>{t.donation.secureNotice}</span>
            </div>
          </div>

          {/* Right Column: Quick Donation Box */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-950/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl">
              {donationSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-lime/10 border border-lime/30 text-lime flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Merci pour votre soutien !
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Votre don contribue directement à la vitalité des bourses de danse et au Centre Interculturel Yongonlon.
                  </p>
                  <a
                    href="/dons"
                    className="inline-block mt-4 px-6 py-2.5 rounded-full bg-lime text-black font-semibold text-xs uppercase tracking-wider"
                  >
                    Voir mon attestation
                  </a>
                </div>
              ) : (
                <form onSubmit={handleDonate} className="space-y-6">
                  {/* Frequency toggle */}
                  <div className="grid grid-cols-2 p-1 bg-zinc-900 rounded-xl border border-white/10 text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setFrequency("once")}
                      className={`py-2 rounded-lg transition-all ${
                        frequency === "once"
                          ? "bg-lime text-black font-bold shadow-sm"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {t.donation.frequencyOnce}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency("monthly")}
                      className={`py-2 rounded-lg transition-all ${
                        frequency === "monthly"
                          ? "bg-lime text-black font-bold shadow-sm"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {t.donation.frequencyMonthly}
                    </button>
                  </div>

                  {/* Preset amounts */}
                  <div className="grid grid-cols-3 gap-3">
                    {amounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className={`py-3 rounded-xl text-center font-mono font-bold text-base transition-all border ${
                          selectedAmount === amount && !customAmount
                            ? "bg-lime text-black border-lime shadow-md shadow-lime/20"
                            : "bg-zinc-900/60 border-white/10 text-white hover:border-white/25"
                        }`}
                      >
                        {amount} €
                      </button>
                    ))}
                  </div>

                  {/* Custom input */}
                  <div>
                    <input
                      type="number"
                      placeholder={t.donation.customAmountPlaceholder}
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(null);
                      }}
                      className="w-full bg-zinc-900/70 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-lime"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(198,242,59,0.3)] hover:shadow-[0_0_30px_rgba(198,242,59,0.5)] flex items-center justify-center gap-2"
                  >
                    <span>{t.donation.ctaDonate}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

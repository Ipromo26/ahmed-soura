"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import {
  ArrowLeft,
  Heart,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Users,
  Compass,
  Building2,
  Copy,
  CheckCheck,
  ExternalLink,
  CreditCard,
} from "lucide-react";

export default function DonsPage() {
  const { t } = useLanguage();
  const d = t.donationPage;

  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  // Dynamic Payment & Bank Settings from Admin Configuration
  const [paymentSettings, setPaymentSettings] = useState({
    stripeMode: "test",
    stripePublishableKey: "",
    stripeSecretKey: "",
    stripeDonationPaymentLink: "https://buy.stripe.com/test_ahmedsoura_dons",
    stripeShopPaymentLink: "https://buy.stripe.com/test_ahmedsoura_boutique",
    bankAccountHolder: "Compagnie Yongonlon e.V. / Ahmed Soura",
    bankName: "Berliner Sparkasse",
    bankIban: "DE89 1005 0000 0123 4567 89",
    bankBic: "BELADEBE100",
    bankBranchAddress: "Alexanderplatz 2, 10178 Berlin, Allemagne",
    bankTransferReferenceGuide: "Mentionner impérativement la référence client (ex: AS-XXXXXX ou REC-YON-XXXX)",
    paypalEmail: "paiement@yongonlon.org",
    paypalMeLink: "https://paypal.me/AhmedSouraDance",
    whatsappOfficialNumber: "+49 163 717 36 62",
  });
  const [ibanCopied, setIbanCopied] = useState(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("as_payment_settings");
      if (saved) {
        setPaymentSettings((prev) => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch {
      // Keep defaults
    }
  }, []);

  const handleCopyIban = (ibanStr: string) => {
    navigator.clipboard.writeText(ibanStr);
    setIbanCopied(true);
    setTimeout(() => setIbanCopied(false), 3000);
  };


  // Donor form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Allemagne",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [donationReceiptId, setDonationReceiptId] = useState("");

  const amountPresets = [25, 50, 100, 250];

  const effectiveAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  // German § 10b EStG / French 66% tax reduction
  const frenchTaxDeduction = (effectiveAmount * 0.66).toFixed(2);
  const frenchActualCost = (effectiveAmount * 0.34).toFixed(2);

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (effectiveAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const generatedId = "REC-YON-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
      setDonationReceiptId(generatedId);
      setIsProcessing(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-semibold tracking-wider uppercase mb-4">
              <Heart className="w-3.5 h-3.5 fill-lime" />
              <span>Engagement & Mécénat Culturel</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-5 tracking-tight">
              {d.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light mb-6">
              {d.heroSubtitle}
            </p>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 max-w-2xl mx-auto">
              <p className="text-sm sm:text-base font-serif italic text-white/90">
                {d.statement}
              </p>
              <span className="block text-xs font-sans text-lime font-bold uppercase tracking-widest mt-2">
                — Ahmed Soura
              </span>
            </div>
          </div>
        </section>

        {/* 3 Impact Pillars */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-widest text-lime font-bold">
              Transparence & Utilité
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-white mt-1">
              {d.pillarsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-white/50 mt-2">
              {d.pillarsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {d.pillars.map((pillar, idx) => {
              const icons = [
                <GraduationCap key="0" className="w-6 h-6 text-lime" />,
                <Users key="1" className="w-6 h-6 text-lime" />,
                <Compass key="2" className="w-6 h-6 text-lime" />,
              ];
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#111111] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-lime/40 transition-colors"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-lime/10 border border-lime/30 flex items-center justify-center mb-5">
                      {icons[idx]}
                    </div>
                    <h3 className="text-lg font-serif text-white mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60 leading-relaxed mb-6 font-light">
                      {pillar.desc}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <span className="text-xs font-medium text-lime block">
                      {pillar.impact}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Donation Form or Confirmation Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#121212] border border-white/10 p-6 sm:p-10 shadow-2xl">
            {isSubmitted ? (
              /* Success Receipt View */
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-lime/10 border border-lime/30 text-lime flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-serif text-white mb-2">
                  Merci infiniment pour votre générosité !
                </h3>
                <p className="text-sm sm:text-base text-white/70 max-w-lg mx-auto mb-8 font-light leading-relaxed">
                  Votre contribution de{" "}
                  <strong className="text-lime font-bold">
                    {effectiveAmount} €
                  </strong>{" "}
                  {frequency === "monthly" ? "par mois" : ""} a bien été enregistrée.
                  Elle renforce directement les bourses de formation et la création interculturelle.
                </p>

                {/* Printable Official Receipt Card */}
                <div className="bg-black/60 border border-white/15 rounded-2xl p-6 sm:p-8 text-left max-w-xl mx-auto mb-8 relative shadow-inner">
                  <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-lime font-bold">
                        Attestation Officielle de Don
                      </div>
                      <h4 className="text-lg font-serif text-white">
                        YONGONLON Interkulturelles Zentrum e.V.
                      </h4>
                      <p className="text-[11px] text-white/40">
                        Association déclarée d'utilité culturelle · Berlin
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-white/50">Référence reçu</div>
                      <div className="text-xs font-mono font-bold text-lime">
                        {donationReceiptId}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                    <div>
                      <span className="text-white/40 block">Donateur :</span>
                      <span className="text-white font-medium">
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Montant du versement :</span>
                      <span className="text-lime font-bold text-sm">
                        {effectiveAmount} € ({frequency === "monthly" ? "Mensuel" : "Ponctuel"})
                      </span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Date d'émission :</span>
                      <span className="text-white">
                        {new Date().toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <div>
                      <span className="text-white/40 block">Régime fiscal :</span>
                      <span className="text-white">
                        § 10b EStG (DE) / Art. 200 CGI (FR)
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-between items-end text-[11px] text-white/40">
                    <div>
                      Attestation générée automatiquement. Conservable pour votre déclaration fiscale.
                    </div>
                    <div className="font-serif italic text-white/70 text-right">
                      Pour l'association,<br />
                      <span className="text-lime font-sans font-semibold not-italic">Ahmed Soura</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handlePrint}
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimer le reçu</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        address: "",
                        city: "",
                        postalCode: "",
                        country: "Allemagne",
                      });
                    }}
                    className="px-6 py-3 rounded-full bg-lime text-black font-semibold text-xs hover:bg-lime-hover transition-colors"
                  >
                    Effectuer un autre don
                  </button>
                </div>
              </div>
            ) : (
              /* Donation Form */
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Frequency selector */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-3">
                    {d.frequencyLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-3 max-w-md">
                    <button
                      type="button"
                      onClick={() => setFrequency("once")}
                      className={`py-3 px-4 rounded-xl text-xs font-semibold transition-all border ${
                        frequency === "once"
                          ? "bg-lime text-black border-lime font-bold shadow-md shadow-lime/10"
                          : "bg-black/30 border-white/10 text-white/70 hover:border-white/20"
                      }`}
                    >
                      {d.frequencyOnce}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency("monthly")}
                      className={`py-3 px-4 rounded-xl text-xs font-semibold transition-all border ${
                        frequency === "monthly"
                          ? "bg-lime text-black border-lime font-bold shadow-md shadow-lime/10"
                          : "bg-black/30 border-white/10 text-white/70 hover:border-white/20"
                      }`}
                    >
                      {d.frequencyMonthly}
                    </button>
                  </div>
                </div>

                {/* Amount presets */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-3">
                    {d.amountLabel}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {amountPresets.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => handlePresetClick(amount)}
                        className={`py-4 rounded-2xl text-center font-mono font-bold text-lg transition-all border ${
                          selectedAmount === amount && !customAmount
                            ? "bg-lime text-black border-lime shadow-lg shadow-lime/15"
                            : "bg-black/30 border-white/10 text-white hover:border-white/25"
                        }`}
                      >
                        {amount} €
                      </button>
                    ))}
                  </div>

                  {/* Custom amount */}
                  <div>
                    <label className="block text-xs text-white/50 mb-1.5">
                      {d.customAmountLabel}
                    </label>
                    <div className="relative max-w-xs">
                      <input
                        type="number"
                        min="5"
                        step="1"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        placeholder={d.customAmountPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 focus:border-lime focus:ring-1 focus:ring-lime text-white placeholder-white/30 text-sm outline-none"
                      />
                      <span className="absolute right-4 top-3.5 text-white/40 font-mono text-sm">
                        €
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tax Deduction Callout */}
                <div className="p-4 rounded-2xl bg-lime/[0.04] border border-lime/20 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-lime flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-white/80 leading-relaxed">
                    <strong className="text-lime font-semibold block mb-0.5">
                      {d.taxDeductionTitle}
                    </strong>
                    {d.taxDeductionDesc}
                    {effectiveAmount > 0 && (
                      <span className="block mt-1 font-semibold text-white">
                        → Pour votre don de {effectiveAmount} €, votre coût réel après réduction d'impôt est estimé à seulement {frenchActualCost} €.
                      </span>
                    )}
                  </div>
                </div>

                {/* Donor Details */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-base font-serif text-white">
                    {d.donorDetailsTitle}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/60 mb-1">
                        {d.firstNameLabel} *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                        placeholder="Aminata"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-lime focus:ring-1 focus:ring-lime text-white placeholder-white/30 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">
                        {d.lastNameLabel} *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        placeholder="Diallo"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-lime focus:ring-1 focus:ring-lime text-white placeholder-white/30 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-white/60 mb-1">
                      {d.emailLabel} *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="aminata@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-lime focus:ring-1 focus:ring-lime text-white placeholder-white/30 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-white/60 mb-1">
                      {d.addressLabel}
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="Möckernstraße 68"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-lime focus:ring-1 focus:ring-lime text-white placeholder-white/30 text-sm outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/60 mb-1">
                        {d.postalCodeLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) =>
                          setFormData({ ...formData, postalCode: e.target.value })
                        }
                        placeholder="10965"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-lime focus:ring-1 focus:ring-lime text-white placeholder-white/30 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">
                        {d.cityLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        placeholder="Berlin"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 focus:border-lime focus:ring-1 focus:ring-lime text-white placeholder-white/30 text-sm outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-white/70">
                    {d.paymentMethodLabel}
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === "card"
                          ? "bg-lime/10 border-lime text-white"
                          : "bg-black/30 border-white/10 text-white/60 hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="sr-only"
                      />
                      <span className="text-xs font-medium">{d.paymentCard}</span>
                    </label>

                    <label
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === "paypal"
                          ? "bg-lime/10 border-lime text-white"
                          : "bg-black/30 border-white/10 text-white/60 hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                        className="sr-only"
                      />
                      <span className="text-xs font-medium">{d.paymentPaypal}</span>
                    </label>

                    <label
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === "sepa"
                          ? "bg-lime/10 border-lime text-white"
                          : "bg-black/30 border-white/10 text-white/60 hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="sepa"
                        checked={paymentMethod === "sepa"}
                        onChange={() => setPaymentMethod("sepa")}
                        className="sr-only"
                      />
                      <span className="text-xs font-medium">{d.paymentSepa}</span>
                    </label>

                    <label
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === "bank"
                          ? "bg-lime/10 border-lime text-white"
                          : "bg-black/30 border-white/10 text-white/60 hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={() => setPaymentMethod("bank")}
                        className="sr-only"
                      />
                      <span className="text-xs font-medium">{d.paymentBankTransfer}</span>
                    </label>
                  </div>

                  {/* Dynamic Payment Method Info (Stripe, PayPal, Bank IBAN) */}
                  {paymentMethod === "card" && (
                    <div className="p-4 rounded-xl bg-lime/[0.04] border border-lime/20 text-xs space-y-2 animate-fadeIn">
                      <div className="flex items-center gap-2 text-lime font-bold">
                        <CreditCard className="w-4 h-4" />
                        <span>Paiement sécurisé par Carte Bancaire / Stripe Checkout</span>
                      </div>
                      <p className="text-white/70 leading-relaxed text-[11px]">
                        Transaction sécurisée SSL chiffrée de bout en bout. Compatible avec cartes Visa, Mastercard, Apple Pay et Google Pay.
                        Votre reçu fiscal (§ 10b EStG) sera généré automatiquement dès la validation.
                      </p>
                      {paymentSettings.stripeDonationPaymentLink && (
                        <div className="pt-1 flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider">Lien Stripe Connecté :</span>
                          <a
                            href={paymentSettings.stripeDonationPaymentLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-lime hover:underline font-mono"
                          >
                            <span>Portail officiel Stripe</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="p-4 rounded-xl bg-[#0070ba]/10 border border-[#0070ba]/30 text-xs space-y-2 animate-fadeIn">
                      <div className="flex items-center gap-2 text-[#0070ba] font-bold">
                        <span className="font-bold text-sm">P</span>
                        <span>Règlement instantané via PayPal</span>
                      </div>
                      <p className="text-white/70 leading-relaxed text-[11px]">
                        Effectuez votre don en 1 clic via votre compte PayPal sécurisé ou par carte liée.
                      </p>
                      {paymentSettings.paypalMeLink && (
                        <div className="pt-1">
                          <a
                            href={paymentSettings.paypalMeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0070ba] hover:bg-[#005ea6] text-white text-[11px] font-semibold transition-colors"
                          >
                            <span>Accéder à PayPal.me/AhmedSoura</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {paymentMethod === "bank" && (
                    <div className="p-5 rounded-2xl bg-black/60 border border-lime/30 text-xs space-y-3 font-mono text-white/90 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="font-sans font-bold text-lime flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-lime" />
                          <span>Coordonnées Bancaires Officielles (Virement SEPA)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyIban(paymentSettings.bankIban)}
                          className="px-3 py-1 rounded-lg bg-lime/10 hover:bg-lime text-lime hover:text-black border border-lime/30 text-[11px] font-sans font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                        >
                          {ibanCopied ? <CheckCheck className="w-3.5 h-3.5 text-lime" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{ibanCopied ? "IBAN Copié !" : "Copier l'IBAN"}</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div><span className="text-white/50">Bénéficiaire : </span><span className="text-white font-semibold">{paymentSettings.bankAccountHolder}</span></div>
                        <div><span className="text-white/50">Banque : </span><span className="text-white font-semibold">{paymentSettings.bankName}</span></div>
                        <div className="sm:col-span-2">
                          <span className="text-white/50">IBAN : </span>
                          <span className="text-lime font-bold text-sm tracking-wider">{paymentSettings.bankIban}</span>
                        </div>
                        <div><span className="text-white/50">BIC/SWIFT : </span><span className="text-white font-semibold">{paymentSettings.bankBic}</span></div>
                        <div><span className="text-white/50">Domiciliation : </span><span className="text-white/70">{paymentSettings.bankBranchAddress}</span></div>
                      </div>

                      <div className="pt-2 border-t border-white/10 font-sans text-[11px] text-lime">
                        💡 <strong>Motif de virement recommandé :</strong> Indiquez « Don Yongonlon » ou votre référence de reçu générée après validation.
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isProcessing || effectiveAmount <= 0}
                    className="w-full py-4 px-8 rounded-2xl bg-lime hover:bg-lime-hover text-black font-semibold text-sm tracking-wide uppercase flex items-center justify-center gap-2 transition-all shadow-xl shadow-lime/15 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span>Validation sécurisée en cours...</span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>
                          {frequency === "once"
                            ? `${d.submitButtonOnce} ${effectiveAmount} €`
                            : `${d.submitButtonMonthly} ${effectiveAmount} € / mois`}
                        </span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-white/40 mt-3 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-lime" />
                    <span>{d.receiptNotice}</span>
                  </p>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

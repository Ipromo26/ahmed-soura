"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Lock,
  ArrowRight,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Copy,
  CheckCheck,
  CreditCard,
  ExternalLink,
} from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isFreeShipping,
    freeShippingRemaining,
    freeShippingThreshold,
  } = useCart();

  const { t } = useLanguage();
  const c = t.cart;

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Allemagne",
    paymentMethod: "card",
  });

  // Close with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isCheckoutOpen) {
          setIsCheckoutOpen(false);
        } else if (isCartOpen) {
          closeCart();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, isCheckoutOpen, closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    if (isCartOpen || isCheckoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, isCheckoutOpen]);

  if (!isCartOpen) return null;

  const shippingCost = isFreeShipping || items.length === 0 ? 0 : 4.9;
  const finalTotal = (totalPrice + shippingCost).toFixed(2);
  const progressPercent = Math.min(
    100,
    Math.round((totalPrice / freeShippingThreshold) * 100)
  );

  const handleStartCheckout = () => {
    setIsCheckoutOpen(true);
    setOrderComplete(false);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = "YON-CMD-" + Math.floor(100000 + Math.random() * 900000);
      setOrderRef(generatedRef);
      setIsSubmitting(false);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div
        className="relative z-10 w-full max-w-md bg-[#0e0e0e] border-l border-white/10 text-[#f5f2eb] h-full flex flex-col shadow-2xl transition-transform duration-300 animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-label={c.drawerTitle}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#121212]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-lime/10 border border-lime/30 flex items-center justify-center text-lime">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif tracking-wide text-white">
                {c.drawerTitle}
              </h2>
              <p className="text-xs text-white/50">
                {totalItems} {totalItems > 1 ? c.itemPlural : c.itemSingular}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            aria-label={c.closeCart}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {items.length > 0 && (
          <div className="px-6 py-3 bg-[#151515] border-b border-white/5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 text-white/70">
                <Truck className="w-3.5 h-3.5 text-lime" />
                {isFreeShipping
                  ? c.freeShippingReached
                  : c.freeShippingProgress.replace(
                      "{amount}",
                      freeShippingRemaining.toFixed(2)
                    )}
              </span>
              <span className="font-semibold text-lime">{progressPercent}%</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-lime h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Body Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/30 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif text-white mb-2">
                {c.emptyTitle}
              </h3>
              <p className="text-sm text-white/50 mb-6 max-w-xs leading-relaxed">
                {c.emptySubtitle}
              </p>
              <button
                onClick={closeCart}
                className="px-6 py-3 rounded-full bg-lime text-black font-semibold text-sm hover:bg-lime-hover transition-colors shadow-lg shadow-lime/10"
              >
                {c.continueShopping}
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.itemKey}
                className="flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-black/40 flex-shrink-0 border border-white/10">
                  <Image
                    src={item.product.image}
                    alt={item.product.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-white line-clamp-2">
                        {item.product.title}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.itemKey)}
                        className="text-white/40 hover:text-red-400 transition-colors p-1"
                        aria-label="Supprimer cet article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Variants */}
                    {(item.size || item.color) && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {item.size && (
                          <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-white/80">
                            Taille : {item.size}
                          </span>
                        )}
                        {item.color && (
                          <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 text-white/80">
                            {item.color}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-white/15 rounded-lg bg-black/30 overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.itemKey, item.quantity - 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.itemKey, item.quantity + 1)
                        }
                        className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-lime">
                        {(item.product.price * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Totals and CTA */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#121212] space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-white/70">
                <span>{c.subtotal}</span>
                <span className="text-white font-medium">
                  {totalPrice.toFixed(2)} €
                </span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>{c.shippingEstimate}</span>
                <span className="text-white font-medium">
                  {isFreeShipping ? (
                    <span className="text-lime">{c.shippingFree}</span>
                  ) : (
                    "4.90 €"
                  )}
                </span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between text-base font-semibold text-white">
                <span>Total TTC</span>
                <span className="text-lime text-lg">{finalTotal} €</span>
              </div>
            </div>

            <button
              onClick={handleStartCheckout}
              className="w-full py-3.5 px-6 rounded-xl bg-lime hover:bg-lime-hover text-black font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime/10"
            >
              <Lock className="w-4 h-4" />
              <span>{c.checkoutButton}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-white/40">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-lime" />
                Paiement chiffré SSL
              </span>
              <span>·</span>
              <span>Stripe & PayPal</span>
              <span>·</span>
              <span>Expédition Europe</span>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Modal Simulation */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#141414] border border-white/15 rounded-2xl p-6 sm:p-8 text-[#f5f2eb] relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {orderComplete ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-lime/10 border border-lime/30 text-lime flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">
                  {c.orderSuccessTitle}
                </h3>
                <p className="text-sm text-white/60 mb-6 leading-relaxed">
                  {c.orderSuccessSubtitle}
                </p>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 mb-6 inline-block w-full max-w-sm">
                  <div className="text-xs text-white/50 mb-1">
                    {c.orderRefLabel}
                  </div>
                  <div className="text-lg font-mono font-bold text-lime tracking-wider">
                    {orderRef}
                  </div>
                </div>

                <div className="text-xs text-white/40 mb-6 max-w-xs mx-auto">
                  Votre colis sera préparé sous 24 à 48 heures ouvrées par l'équipe logistique Yongonlon à Berlin.
                </div>

                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    closeCart();
                  }}
                  className="px-8 py-3 rounded-full bg-lime text-black font-semibold text-sm hover:bg-lime-hover transition-colors"
                >
                  {c.continueShopping}
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-lime/10 border border-lime/30 flex items-center justify-center text-lime">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-white">
                      {c.checkoutModalTitle}
                    </h3>
                    <p className="text-xs text-white/50">{c.checkoutNotice}</p>
                  </div>
                </div>

                {/* Mini Order Summary */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 mb-6 flex justify-between items-center text-sm">
                  <div>
                    <div className="text-xs text-white/50">{c.orderSummary}</div>
                    <div className="font-semibold text-white">
                      {totalItems} {totalItems > 1 ? c.itemPlural : c.itemSingular}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/50">Total à régler</div>
                    <div className="text-lg font-bold text-lime">{finalTotal} €</div>
                  </div>
                </div>

                <form onSubmit={handleSubmitOrder} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      {c.fullName} *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="Jean Dupont"
                      className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/15 focus:border-lime focus:ring-1 focus:ring-lime text-white placeholder-white/30 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      Email de confirmation *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="jean.dupont@email.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/15 focus:border-lime focus:ring-1 focus:ring-lime text-white placeholder-white/30 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">
                      {c.shippingAddress} *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="Rue, numéro, complément d'adresse"
                      className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/15 focus:border-lime focus:ring-1 focus:ring-lime text-white placeholder-white/30 text-sm outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">
                        Code Postal *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.postalCode}
                        onChange={(e) =>
                          setFormData({ ...formData, postalCode: e.target.value })
                        }
                        placeholder="10965"
                        className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/15 focus:border-lime focus:ring-1 focus:ring-lime text-white placeholder-white/30 text-sm outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-1">
                        Ville & Pays *
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        placeholder="Berlin, Allemagne"
                        className="w-full px-4 py-2.5 rounded-lg bg-black/40 border border-white/15 focus:border-lime focus:ring-1 focus:ring-lime text-white placeholder-white/30 text-sm outline-none"
                      />
                    </div>
                  </div>

                  {/* Payment Mode */}
                  <div className="pt-2">
                    <label className="block text-xs font-medium text-white/70 mb-2">
                      Sélection du mode de paiement chiffré :
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                          formData.paymentMethod === "card"
                            ? "bg-lime/10 border-lime text-white"
                            : "bg-black/30 border-white/10 text-white/60 hover:border-white/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={formData.paymentMethod === "card"}
                          onChange={() =>
                            setFormData({ ...formData, paymentMethod: "card" })
                          }
                          className="sr-only"
                        />
                        <span className="text-xs font-medium">
                          Carte de crédit (Stripe)
                        </span>
                      </label>
                      <label
                        className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                          formData.paymentMethod === "paypal"
                            ? "bg-lime/10 border-lime text-white"
                            : "bg-black/30 border-white/10 text-white/60 hover:border-white/20"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="paypal"
                          checked={formData.paymentMethod === "paypal"}
                          onChange={() =>
                            setFormData({ ...formData, paymentMethod: "paypal" })
                          }
                          className="sr-only"
                        />
                        <span className="text-xs font-medium">
                          PayPal Express
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-lime hover:bg-lime-hover text-black font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime/10 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Traitement sécurisé en cours...</span>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>{c.completeOrder} ({finalTotal} €)</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

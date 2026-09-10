"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { ProductItem } from "@/types/i18n";
import { loadBoutiqueProducts } from "@/lib/catalog-store";
import { useEffect } from "react";
import {
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  Heart,
  Eye,
  Check,
  X,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function BoutiquePage() {
  const { t } = useLanguage();
  const { addToCart, openCart } = useCart();
  const s = t.shopPage;

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const [productsList, setProductsList] = useState<ProductItem[]>(s.products);

  useEffect(() => {
    setProductsList(loadBoutiqueProducts());
    const handler = () => {
      setProductsList(loadBoutiqueProducts());
    };
    window.addEventListener("as_products_updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("as_products_updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const categories = [
    { id: "all", label: s.filters.all },
    { id: "tshirts", label: s.filters.tshirts },
    { id: "casquettes", label: s.filters.casquettes },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? productsList
      : productsList.filter((p) => p.category === activeCategory);

  const handleOpenQuickView = (product: ProductItem) => {
    setSelectedProduct(product);
    setSelectedSize(product.sizes ? product.sizes[0] : "");
    setSelectedColor(product.colors ? product.colors[0].name : "");
    setQuantity(1);
  };

  const handleAddToCart = (product: ProductItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const size = product.sizes ? product.sizes[0] : undefined;
    const color = product.colors ? product.colors[0].name : undefined;
    addToCart(product, { size, color }, 1);

    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1800);
  };

  const handleAddFromModal = () => {
    if (!selectedProduct) return;
    addToCart(
      selectedProduct,
      {
        size: selectedSize || undefined,
        color: selectedColor || undefined,
      },
      quantity
    );
    setSelectedProduct(null);
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime/10 border border-lime/30 text-lime text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Boutique & Art Solidaire</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-5 tracking-tight">
              {s.heroTitle}
            </h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-light mb-6">
              {s.heroSubtitle}
            </p>
            <p className="text-xs sm:text-sm text-lime/90 font-mono tracking-wide">
              {s.freeShippingNotice}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-10 flex items-center justify-center gap-2 overflow-x-auto pb-4 scrollbar-none no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? "bg-lime text-black border-lime shadow-lg shadow-lime/20"
                    : "bg-white/[0.03] text-white/70 border-white/10 hover:border-white/25 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = justAddedId === product.id;
              return (
                <div
                  key={product.id}
                  className="group rounded-2xl bg-[#111111] border border-white/10 hover:border-lime/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-lime/5 hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div
                    className="relative aspect-[4/5] bg-black/60 overflow-hidden cursor-pointer"
                    onClick={() => handleOpenQuickView(product)}
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-white border border-white/15">
                        {product.categoryLabel}
                      </span>
                      {product.tag && (
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-lime/90 text-black shadow-md">
                          {product.tag}
                        </span>
                      )}
                    </div>

                    {/* Quick View Button on Hover */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenQuickView(product);
                      }}
                      className="absolute inset-x-4 bottom-4 py-2.5 rounded-xl bg-black/80 backdrop-blur-md text-white text-xs font-semibold flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/20 hover:bg-black"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{s.quickView}</span>
                    </button>
                  </div>

                  {/* Content Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => handleOpenQuickView(product)}
                        className="text-base font-serif text-white hover:text-lime transition-colors cursor-pointer mb-2 line-clamp-2"
                      >
                        {product.title}
                      </h3>
                      <p className="text-xs text-white/50 line-clamp-2 leading-relaxed mb-4">
                        {product.desc}
                      </p>
                    </div>

                    <div>
                      {/* Color dots preview if any */}
                      {product.colors && (
                        <div className="flex items-center gap-1.5 mb-3">
                          {product.colors.map((c, i) => (
                            <span
                              key={i}
                              title={c.name}
                              className="w-3.5 h-3.5 rounded-full border border-white/30"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                      )}

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <div className="text-lg font-bold text-lime font-mono">
                          {product.formattedPrice}
                        </div>

                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                            isAdded
                              ? "bg-emerald-500 text-white"
                              : "bg-lime text-black hover:bg-lime-hover shadow-md shadow-lime/10"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Ajouté</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>{s.addToCart}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Ethical Commitment Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="rounded-3xl bg-gradient-to-r from-[#121212] to-[#181818] border border-white/10 p-8 sm:p-12">
            <div className="max-w-3xl">
              <span className="text-xs uppercase tracking-widest text-lime font-bold">
                Transmission & Solidarité
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white mt-2 mb-4">
                {s.ethicalCommitmentTitle}
              </h2>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light mb-8">
                {s.ethicalCommitmentDesc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-lime/10 text-lime">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      Commerce Équitable
                    </h4>
                    <p className="text-xs text-white/50 mt-1">
                      Rémunération juste des artisans au Burkina Faso.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-lime/10 text-lime">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      100% Réinvesti
                    </h4>
                    <p className="text-xs text-white/50 mt-1">
                      Finance les bourses d'études de jeunes danseurs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-lime/10 text-lime">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                      Livraison Rapide
                    </h4>
                    <p className="text-xs text-white/50 mt-1">
                      Expédition soignée depuis Berlin vers toute l'Europe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quick View Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#141414] border border-white/15 rounded-3xl p-6 sm:p-8 text-[#f5f2eb] shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Modal Image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-black/60 border border-white/10">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  fill
                  className="object-cover"
                />
                {selectedProduct.editionNotice && (
                  <span className="absolute bottom-3 left-3 right-3 text-[10px] text-center font-medium bg-black/80 backdrop-blur-md text-lime px-3 py-1.5 rounded-lg border border-lime/30">
                    {selectedProduct.editionNotice}
                  </span>
                )}
              </div>

              {/* Modal Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-lime">
                    {selectedProduct.categoryLabel}
                  </span>
                  <h3 className="text-2xl font-serif text-white mt-1 mb-3">
                    {selectedProduct.title}
                  </h3>
                  <div className="text-2xl font-bold font-mono text-lime mb-4">
                    {selectedProduct.formattedPrice}
                  </div>

                  <p className="text-xs text-white/70 leading-relaxed mb-5">
                    {selectedProduct.desc}
                  </p>

                  {/* Bullet Details */}
                  {selectedProduct.details && (
                    <ul className="space-y-1.5 mb-6 text-xs text-white/60">
                      {selectedProduct.details.map((d, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-lime flex-shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Sizes */}
                  {selectedProduct.sizes && (
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-white/80 mb-2">
                        {s.selectSize}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setSelectedSize(sz)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                              selectedSize === sz
                                ? "bg-lime text-black font-bold shadow-sm"
                                : "bg-white/5 text-white/70 border border-white/10 hover:border-white/20"
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Colors */}
                  {selectedProduct.colors && (
                    <div className="mb-6">
                      <label className="block text-xs font-semibold text-white/80 mb-2">
                        {s.selectColor} {selectedColor && `(${selectedColor})`}
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {selectedProduct.colors.map((c, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedColor(c.name)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
                              selectedColor === c.name
                                ? "border-lime bg-lime/10 text-white"
                                : "border-white/10 text-white/60 hover:border-white/20"
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/30"
                              style={{ backgroundColor: c.hex }}
                            />
                            <span>{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quantity and Add CTA */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-white/15 rounded-xl bg-black/40 overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-semibold text-white">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddFromModal}
                      className="flex-1 py-3 px-6 rounded-xl bg-lime hover:bg-lime-hover text-black font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-lime/15"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{s.addToCart}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

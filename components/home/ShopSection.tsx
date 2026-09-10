"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, ArrowUpRight, Check, Sparkles } from "lucide-react";

export const ShopSection: React.FC = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleAddToCart = (product: any) => {
    addToCart(product, undefined, 1);
    setAddedItem(product.id);
    setTimeout(() => {
      setAddedItem(null);
    }, 2000);
  };

  return (
    <section id="boutique" className="py-24 scroll-mt-28 bg-[#0a0a0a] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-lime text-xs font-semibold tracking-widest uppercase mb-4">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.shop.sectionTag}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              {t.shop.title}
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="text-zinc-400 text-sm max-w-md">
              {t.shop.subtitle}
            </p>
            <a
              href="/boutique"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-lime hover:underline whitespace-nowrap"
            >
              <span>{t.shop.ctaViewCatalog}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.shop.items.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-950 rounded-2xl border border-white/15 overflow-hidden flex flex-col justify-between group hover:border-lime/50 transition-all duration-300"
            >
              {/* Product Visual */}
              <div className="relative aspect-square w-full bg-zinc-900 overflow-hidden flex items-center justify-center border-b border-white/5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {item.tag && (
                  <span className="absolute top-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-lime text-black shadow">
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span>{item.categoryLabel || item.category}</span>
                    <span className="text-lime font-mono font-bold text-sm">
                      {item.formattedPrice || `${item.price} €`}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-white group-hover:text-lime transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                    addedItem === item.id
                      ? "bg-emerald-500 text-white"
                      : "bg-zinc-900 hover:bg-lime hover:text-black text-zinc-200 border border-white/10"
                  }`}
                >
                  {addedItem === item.id ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Ajouté au panier</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{t.shop.addToCart}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

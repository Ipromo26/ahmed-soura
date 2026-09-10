"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ProductItem } from "@/types/i18n";

export interface CartItem {
  itemKey: string;
  product: ProductItem;
  size?: string;
  color?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: ProductItem, variant?: { size?: string; color?: string }, qty?: number) => void;
  removeFromCart: (itemKey: string) => void;
  updateQuantity: (itemKey: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  isFreeShipping: boolean;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
  openCart: () => {},
  closeCart: () => {},
  totalItems: 0,
  totalPrice: 0,
  freeShippingThreshold: 80,
  freeShippingRemaining: 80,
  isFreeShipping: false,
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  const freeShippingThreshold = 80;

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ahmed_soura_cart");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem("ahmed_soura_cart", JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, isHydrated]);

  const addToCart = (
    product: ProductItem,
    variant?: { size?: string; color?: string },
    qty: number = 1
  ) => {
    const size = variant?.size;
    const color = variant?.color;
    const itemKey = `${product.id}_${size || "std"}_${color || "std"}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.itemKey === itemKey);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            itemKey,
            product,
            size,
            color,
            quantity: qty,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey: string) => {
    setItems((prev) => prev.filter((item) => item.itemKey !== itemKey));
  };

  const updateQuantity = (itemKey: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.itemKey === itemKey ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const isFreeShipping = totalPrice >= freeShippingThreshold;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - totalPrice);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        totalItems,
        totalPrice,
        freeShippingThreshold,
        freeShippingRemaining,
        isFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { TranslationSchema } from "@/types/i18n";
import { fr } from "@/locales/fr";
import { en } from "@/locales/en";

interface LanguageContextType {
  lang: "fr" | "en";
  t: TranslationSchema;
  setLang: (lang: "fr" | "en") => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  t: fr,
  setLang: () => {},
  toggleLang: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<"fr" | "en">("fr");

  useEffect(() => {
    // Check saved preference or URL query / hash
    const saved = localStorage.getItem("ahmed_soura_lang");
    if (saved === "fr" || saved === "en") {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: "fr" | "en") => {
    setLangState(newLang);
    try {
      localStorage.setItem("ahmed_soura_lang", newLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === "fr" ? "en" : "fr");
  };

  const t = lang === "fr" ? fr : en;

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

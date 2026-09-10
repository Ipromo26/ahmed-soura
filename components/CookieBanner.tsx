"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, Settings, Check, X } from "lucide-react";

export const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const c = t.cookies;

  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    media: true,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ahmed_soura_cookies_consent");
      if (!saved) {
        setIsVisible(true);
      } else {
        setPreferences(JSON.parse(saved));
      }
    } catch {
      setIsVisible(true);
    }

    const handleOpenSettings = () => {
      setIsCustomizeOpen(true);
      setIsVisible(true);
    };

    window.addEventListener("openCookieSettings", handleOpenSettings);
    return () => window.removeEventListener("openCookieSettings", handleOpenSettings);
  }, []);

  const saveConsent = (prefs: { necessary: boolean; analytics: boolean; media: boolean }) => {
    try {
      localStorage.setItem("ahmed_soura_cookies_consent", JSON.stringify(prefs));
    } catch {
      // ignore
    }
    setPreferences(prefs);
    setIsVisible(false);
    setIsCustomizeOpen(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ necessary: true, analytics: true, media: true });
  };

  const handleRejectNonEssential = () => {
    saveConsent({ necessary: true, analytics: false, media: false });
  };

  const handleSaveCustom = () => {
    saveConsent(preferences);
  };

  if (pathname?.startsWith("/admin")) return null;
  if (!isVisible) return null;

  return (
    <>
      {/* Floating Bottom Card Banner */}
      {!isCustomizeOpen && (
        <aside
          role="region"
          aria-label="Gestion des cookies"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-2xl bg-[#111111]/95 backdrop-blur-xl border border-white/15 shadow-2xl text-[#f5f2eb] animate-slide-in-up"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-lime/10 border border-lime/30 text-lime flex items-center justify-center flex-shrink-0 mt-0.5">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                {c.title}
              </h3>
              <p className="text-xs text-white/60 leading-relaxed mt-1 font-light">
                {c.message}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-2 px-3 rounded-lg bg-lime hover:bg-lime-hover text-black font-semibold text-xs transition-colors text-center"
            >
              {c.acceptAll}
            </button>
            <button
              onClick={handleRejectNonEssential}
              className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 font-medium text-xs transition-colors text-center border border-white/10"
            >
              {c.rejectNonEssential}
            </button>
            <button
              onClick={() => setIsCustomizeOpen(true)}
              className="py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-lime font-medium text-xs transition-colors flex items-center justify-center gap-1 border border-white/10"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{c.customize}</span>
            </button>
          </div>
        </aside>
      )}

      {/* Customize Modal */}
      {isCustomizeOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#141414] border border-white/15 rounded-3xl p-6 sm:p-8 text-[#f5f2eb] relative shadow-2xl">
            <button
              onClick={() => setIsCustomizeOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-full bg-lime/10 border border-lime/30 flex items-center justify-center text-lime">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-serif text-white">
                  {c.title}
                </h3>
                <p className="text-xs text-white/50">Conformité RGPD / TTDSG</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {/* Necessary */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <span>{c.necessary}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-lime/20 text-lime font-bold">Actif</span>
                  </div>
                  <p className="text-xs text-white/50 mt-1">{c.necessaryDesc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="mt-1 accent-lime"
                />
              </div>

              {/* Analytics */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-white">
                    {c.analytics}
                  </div>
                  <p className="text-xs text-white/50 mt-1">{c.analyticsDesc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, analytics: e.target.checked })
                  }
                  className="mt-1 accent-lime w-4 h-4 cursor-pointer"
                />
              </div>

              {/* Media */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-white">
                    {c.media}
                  </div>
                  <p className="text-xs text-white/50 mt-1">{c.mediaDesc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.media}
                  onChange={(e) =>
                    setPreferences({ ...preferences, media: e.target.checked })
                  }
                  className="mt-1 accent-lime w-4 h-4 cursor-pointer"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveCustom}
                className="flex-1 py-3 px-4 rounded-xl bg-lime hover:bg-lime-hover text-black font-semibold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-lime/10"
              >
                {c.savePreferences}
              </button>
              <button
                onClick={handleAcceptAll}
                className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                {c.acceptAll}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

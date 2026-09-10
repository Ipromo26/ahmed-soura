"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollEffects: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docEl = document.documentElement;
          const winScroll = window.scrollY || docEl.scrollTop || document.body.scrollTop || 0;
          const height = docEl.scrollHeight - docEl.clientHeight;
          const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
          
          setScrollPercent(Math.round(scrolled * 10) / 10);
          setShowScrollTop(winScroll > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver for scroll-reveal animations
    // Once an element is revealed, we unobserve it so it NEVER disappears
    // or flickers while scrolling on iOS Safari WebKit.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "50px 0px 50px 0px",
      }
    );

    const revealElements = document.querySelectorAll(".scroll-reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Dynamic Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none transition-all duration-150"
        style={{
          width: `${scrollPercent}%`,
          background: "linear-gradient(90deg, #c6f23b 0%, #e8ff80 50%, #c6f23b 100%)",
          boxShadow: "0 0 10px rgba(198, 242, 59, 0.7)",
        }}
      />

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-zinc-900/90 hover:bg-lime text-zinc-300 hover:text-black border border-lime/30 hover:border-lime shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(198,242,59,0.5)] backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 animate-fadeIn group"
          aria-label="Retour en haut de page"
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}
    </>
  );
};

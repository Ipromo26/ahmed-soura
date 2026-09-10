"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FourPortalsSection } from "@/components/home/FourPortalsSection";
import { ClassesSection } from "@/components/home/ClassesSection";
import { GallerySection } from "@/components/home/GallerySection";
import { ShopSection } from "@/components/home/ShopSection";
import { DonationSection } from "@/components/home/DonationSection";
import { ContactSection } from "@/components/home/ContactSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#080808] text-[#f5f2eb] flex flex-col selection:bg-lime selection:text-black">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FourPortalsSection />
      <ClassesSection />
      <ShopSection />
      <GallerySection />
      <DonationSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

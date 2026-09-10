import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { BookingProvider } from "@/context/BookingContext";
import { CartDrawer } from "@/components/CartDrawer";
import { CookieBanner } from "@/components/CookieBanner";
import { ScrollEffects } from "@/components/ScrollEffects";

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmedsoura-yongonlon.com"),
  title: "Ahmed Soura × Yongonlon — Danseur, Chorégraphe & Centre Interculturel",
  description:
    "Plateforme officielle d'Ahmed Soura (danseur, chorégraphe, pédagogue international basé entre Berlin et le Burkina Faso) et de l'écosystème Yongonlon (Centre Interculturel, Production, Boutique, Ateliers).",
  keywords: [
    "Ahmed Soura",
    "Ahmed Soura Berlin",
    "choreographer Berlin",
    "African contemporary dance Berlin",
    "Afro contemporary dance Berlin",
    "Burkina Faso dance",
    "Yongonlon",
    "Centre Interculturel Yongonlon",
    "dance workshops Berlin",
    "Tanzfabrik Berlin",
    "Boutique Yongonlon",
    "Power Gig'Art",
  ],
  authors: [{ name: "Ahmed Soura" }, { name: "Yongonlon" }],
  openGraph: {
    title: "Ahmed Soura × Yongonlon — Art, Corps & Culture",
    description:
      "Danse contemporaine, créations chorégraphiques, cours et transmission interculturelle.",
    images: ["/images/ahmed-soura-green.jpg"],
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ahmedsoura-yongonlon.com/#ahmedsoura",
      "name": "Ahmed Soura",
      "jobTitle": "Dancer, Choreographer, Educator & Artistic Director",
      "nationality": "Burkinabè",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Berlin",
        "addressCountry": "DE",
      },
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "INAFAC Burkina Faso",
        },
        {
          "@type": "EducationalOrganization",
          "name": "CCN Montpellier - Mathilde Monnier",
        },
      ],
      "award": [
        "2e Prix au Concours de Danse Contemporaine d'Afrique et de l'Océan Indien (2011)",
        "Prix du Public au Festival International Solo-Tanz-Theater de Stuttgart (2013)",
      ],
      "description":
        "Danseur et chorégraphe contemporain originaire du Burkina Faso basé à Berlin. Fondateur de la Cie KORO et du Centre Interculturel Yongonlon.",
      "image": "https://ahmedsoura-yongonlon.com/images/ahmed-soura-green.jpg",
    },
    {
      "@type": "PerformingGroup",
      "@id": "https://ahmedsoura-yongonlon.com/#yongonlon",
      "name": "YONGONLON",
      "alternateName": "Centre Interculturel Yongonlon",
      "description":
        "Centre interculturel, bureau de production de tournées et écosystème solidaire entre Berlin et le Burkina Faso.",
      "founder": {
        "@id": "https://ahmedsoura-yongonlon.com/#ahmedsoura",
      },
      "logo": "https://ahmedsoura-yongonlon.com/images/yongonlon-logo.jpg",
    },
    {
      "@type": "WebSite",
      "@id": "https://ahmedsoura-yongonlon.com/#website",
      "url": "https://ahmedsoura-yongonlon.com",
      "name": "Ahmed Soura × Yongonlon",
      "publisher": {
        "@id": "https://ahmedsoura-yongonlon.com/#yongonlon",
      },
      "inLanguage": ["fr", "en"],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#080808] text-[#f5f2eb] antialiased selection:bg-lime selection:text-black min-h-screen">
        {/* WCAG 2.1 AA Skip to Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-[#c8f33b] focus:text-black focus:font-bold focus:rounded-lg focus:shadow-2xl focus:outline-none"
        >
          Aller au contenu principal / Skip to main content
        </a>

        <LanguageProvider>
          <CartProvider>
            <BookingProvider>
            {children}
            <CartDrawer />
            <CookieBanner />
            <ScrollEffects />
          </BookingProvider>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

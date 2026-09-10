# Ahmed Soura × Compagnie Yongonlon — Official Digital Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Netlify](https://img.shields.io/badge/Netlify-Ready-00C7B7?style=for-the-badge&logo=netlify)](https://www.netlify.com/)
[![Status](https://img.shields.io/badge/Production-Certified-lime?style=for-the-badge)](#)

> **Plateforme culturelle, scénique et e-commerce officielle** pour le danseur, chorégraphe international et fondateur **Ahmed Soura** & la **Compagnie Yongonlon**.
> Conçue, développée et déployée par **Jean Steve Pare ([@Ipromo26](https://github.com/Ipromo26))**.

---

## 🌟 Points Forts & Architecture Technique

Cette application Full-Stack moderne démontre une maîtrise complète des standards de l'ingénierie logicielle et du web moderne :

- **⚡ Framework Full-Stack :** Next.js 14 avec App Router, Server Components & Serverless Functions.
- **🌍 Bilingue Natif (FR / EN) :** Système d'internationalisation réactif sans rechargement de page (`LanguageContext`), traduisant l'intégralité du catalogue, des cours, des bios et des formulaires.
- **🛍️ Catalogue & Boutique Temps Réel :** Gestion complète des articles textiles officiels (T-shirts, casquettes, éditions collector), gestion de stock instantanée en 1 clic et panier persistant (`CartContext`).
- **📸 Galerie & Scénographie Interactive :** Affichage immersif des performances avec visionneuse plein écran (Lightbox) et filtres thématiques (Scène, Portraits, Répétitions).
- **✂️ Éditeur de Recadrage & Zoom Photo Interactif :** Composant customisé en **Canvas HTML5 pur** permettant l'import direct de fichiers depuis smartphone ou ordinateur, le zoom dynamique (100% à 300%), le déplacement panoramique au doigt/souris et les ratios automatiques (1:1 carré, 16:9 panoramique de scène, 4:3).
- **📅 Calendrier & Moteur de Réservation :** Prise de rendez-vous pour cours particuliers, masterclasses et ateliers de danse à Berlin, avec synchronisation et passerelles de paiement.
- **✉️ Passerelle d'E-mails Transactionnels Bilingues :** Gabarits HTML responsives professionnels avec notification automatique client & administrateur (confirmation de créneaux, récapitulatif avec lien d'annulation et emojis soignés).
- **📱 Mobile-First & Responsive :** Ergonomie certifiée sans aucun débordement horizontal (`hasOverflow: false`) sur tous les viewports mobiles (iPhone, Android, tablettes).
- **🚀 Déploiement CI/CD Netlify :** Intégration du runtime officiel `@netlify/plugin-nextjs` via configuration `netlify.toml` pour un déploiement continu à chaque commit.

---

## 🛠️ Stack Technologique

| Domaine | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Next.js 14, TypeScript, Tailwind CSS, Lucide Icons |
| **Backend & API** | Next.js Serverless Route Handlers (`app/api/*`), Node.js |
| **Mailing** | Nodemailer, Gabarits HTML/CSS inlinés bilingues |
| **Traitement d'Image** | HTML5 Canvas API, `FileReader`, compression haute fidélité |
| **Persistance** | LocalStorage synchronisé multi-onglets avec Custom Events & Storage Listeners |
| **DevOps & QA** | Playwright E2E Testing, ESLint, TypeScript Strict Mode, Netlify CI/CD |

---

## 📁 Structure du Projet

```bash
ahmed-soura/
├── app/                        # Architecture Next.js 14 App Router
│   ├── admin/                  # Dashboard administrateur sécurisé (Boutique, Galerie, Calendrier)
│   ├── api/                    # Routes API Serverless (bookings, checkout, contact, email)
│   ├── boutique/               # Boutique publique officielle
│   ├── cours/                  # Réservation & descriptif des cours de danse
│   ├── galerie/                # Galerie scénographique avec Lightbox
│   └── layout.tsx              # Layout racine avec navigation & contextes globaux
├── components/                 # Composants React modulaires & réutilisables
│   ├── ImageCropperModal.tsx   # Outil interactif de recadrage & zoom Canvas HTML5
│   ├── CartDrawer.tsx          # Tiroir de panier e-commerce coulissant
│   └── home/                   # Sections immersives de la page d'accueil
├── context/                    # Contextes React (Langue, Panier, Réservations)
├── lib/                        # Logique métier, mailer transactionnel & catalog-store
├── locales/                    # Dictionnaires bilingues stricts (Français / Anglais)
├── netlify.toml                # Configuration officielle du déploiement Netlify
└── tailwind.config.ts          # Thème sombre sur-mesure avec accents vert lime
```

---

## 🚀 Démarrage Rapide en Local

```bash
# 1. Cloner le dépôt
git clone https://github.com/Ipromo26/ahmed-soura.git
cd ahmed-soura

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev

# 4. Compiler pour la production
npm run build
npm run start
```

---

## 👤 Conception & Réalisation

**Jean Steve Pare**  
- **GitHub :** [@Ipromo26](https://github.com/Ipromo26)  
- **Profil :** Technical Product Manager & Full Stack Developer  
- **Spécialité :** Architecture logicielle moderne, plateformes SaaS scalables, e-commerce haute conversion.

---

*Projet validé et certifié opérationnel pour la production.*

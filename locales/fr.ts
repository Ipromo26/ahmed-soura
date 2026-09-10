import { TranslationSchema, ProductItem } from "@/types/i18n";

export const boutiqueProductsFr: ProductItem[] = [
  {
    id: "tshirt-typo-noir",
    title: "T-shirt Typographique Yongonlon — Noir",
    category: "tshirts",
    categoryLabel: "T-shirts",
    price: 35,
    formattedPrice: "35 €",
    desc: "T-shirt unisexe coupe décontractée arborant la matrice typographique 3×3 Yongonlon. Sérigraphie artisanale à l’encre à l’eau sur fond noir.",
    details: [
      "100% Coton peigné biologique ring-spun 220g",
      "Impression sérigraphique écologique sans solvants",
      "Col rond épais double piqûre",
      "Design original Atelier Yongonlon Berlin"
    ],
    tag: "Essentiel",
    image: "/images/products/tshirt-noir.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Noir Profond", hex: "#0c0c0c" }
    ],
    inStock: true
  },
  {
    id: "tshirt-typo-blanc",
    title: "T-shirt Typographique Yongonlon — Blanc",
    category: "tshirts",
    categoryLabel: "T-shirts",
    price: 35,
    formattedPrice: "35 €",
    desc: "Matrice 3×3 noire épurée sérigraphiée sur coton bio lourd blanc. Pièce signature Yongonlon.",
    details: [
      "100% Coton biologique lourd 250g",
      "Sérigraphie noire mate haute définition",
      "Coutures renforcées épaules et col",
      "Coupe unisexe droite confortable"
    ],
    tag: "Signature",
    image: "/images/products/tshirt-blanc.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blanc Pur", hex: "#ffffff" }
    ],
    inStock: true
  },
  {
    id: "tshirt-solo166",
    title: "T-shirt Scène « Solo 166 » — Collector",
    category: "tshirts",
    categoryLabel: "T-shirts",
    price: 42,
    formattedPrice: "42 €",
    desc: "Visuel vert lime emblématique de la pièce solo primée « 166 » imprimé sur fond noir. Édition collector numérotée.",
    details: [
      "Impression numérique DTG haute résolution",
      "Coton biologique certifié GOTS 200g",
      "Visuel exclusif photographié par Jo Grabowski",
      "Chaque t-shirt est numéroté"
    ],
    tag: "Édition Collector",
    image: "/images/products/tshirt-solo166.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Noir Profond", hex: "#111111" }
    ],
    inStock: true,
    editionNotice: "Série limitée à 100 exemplaires"
  },
  {
    id: "tshirt-danser",
    title: "T-shirt Éco « Danser · Rassembler · Transmettre »",
    category: "tshirts",
    categoryLabel: "T-shirts",
    price: 32,
    formattedPrice: "32 €",
    desc: "Typographie signature au dos, devise fondatrice de l’association. Coton bio léger idéal pour la danse et le quotidien.",
    details: [
      "100% Coton biologique léger 180g",
      "Typographie signature brodée au dos",
      "Coupe ajustée mixte",
      "Teinture écologique certifiée OEKO-TEX"
    ],
    tag: "Éco-responsable",
    image: "/images/products/tshirt-eco.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Noir Charbon", hex: "#181818" },
      { name: "Ivoire Naturel", hex: "#f5f2eb" }
    ],
    inStock: true
  },
  {
    id: "casquette-yon-berlin",
    title: "Casquette Brodée « YON » Studio Berlin",
    category: "casquettes",
    categoryLabel: "Casquettes",
    price: 30,
    formattedPrice: "30 €",
    desc: "Casquette 6 panneaux en sergé de coton avec boucle de serrage métallique gravée. Broderie 3D relief haute précision.",
    details: [
      "100% Coton sergé premium",
      "Broderie 3D haute définition sur le panneau avant",
      "Attache arrière réglable en laiton vieilli",
      "Bandeau anti-transpiration absorbant"
    ],
    image: "/images/products/casquette-yon.jpg",
    colors: [
      { name: "Noir Délicat", hex: "#1a1a1a" },
      { name: "Sable Kaki", hex: "#8c8272" }
    ],
    inStock: true
  },
  {
    id: "casquette-vintage-washed",
    title: "Casquette Vintage Washed Yongonlon",
    category: "casquettes",
    categoryLabel: "Casquettes",
    price: 28,
    formattedPrice: "28 €",
    desc: "Coton sergé délavé effet vintage avec logo Yongonlon brodé. Boucle métallique gravée au dos.",
    details: [
      "Coton sergé washed effet usé naturel",
      "Logo Yongonlon brodé ton sur ton",
      "Visière pré-courbée",
      "Taille unique ajustable"
    ],
    tag: "Style Vintage",
    image: "/images/products/casquette-vintage.jpg",
    colors: [
      { name: "Vert Olive Délavé", hex: "#6b7c5e" },
      { name: "Noir Washed", hex: "#2a2a2a" }
    ],
    inStock: true
  },
  {
    id: "casquette-166-lime",
    title: "Casquette Minimaliste « 166 » Noir & Vert Lime",
    category: "casquettes",
    categoryLabel: "Casquettes",
    price: 32,
    formattedPrice: "32 €",
    desc: "Édition studio minimale avec le chiffre emblématique « 166 » brodé en vert lime sur fond noir profond.",
    details: [
      "Construction 5 panneaux structurée",
      "Broderie vert lime (#c6f23b) contrastée",
      "Fermeture snapback ajustable",
      "Édition limitée Studio Berlin"
    ],
    tag: "Édition Studio",
    image: "/images/products/casquette-166.jpg",
    colors: [
      { name: "Noir & Lime", hex: "#111111" }
    ],
    inStock: true
  }
];

export const fr: TranslationSchema = {
  lang: "fr",
  nav: {
    home: "Accueil",
    about: "À Propos",
    classes: "Cours",
    yongonlon: "Centre Interculturel",
    productions: "Productions",
    shop: "Boutique",
    gallery: "Galerie",
    support: "Soutenir",
    agenda: "Agenda",
    contact: "Contact",
    bookClass: "Réserver un cours",
    tagline: "Art · Création · Culture · Rencontre",
  },
  hero: {
    eyebrow: "MOUVEMENT · CULTURES · LIENS · DEMAIN",
    title: "Ahmed Soura",
    subtitle: "Danseur · Chorégraphe · Pédagogue · Fondateur de Yongonlon",
    quote: "« La danse est un pont entre les peuples, une énergie pour un monde plus humain. »",
    quoteAuthor: "Ahmed Soura",
    ctaBook: "Réserver un cours",
    ctaDonate: "Faire un don",
    ctaDiscover: "Découvrir Yongonlon",
    badgeArtistic: "Danser\nRassembler\nTransmettre",
    cardDialogue: "PLUS QU'UNE DANSE, UN DIALOGUE ENTRE LES MONDES",
  },
  about: {
    sectionTag: "PARCOURS & VISION",
    title: "Un parcours, des ponts, des rencontres",
    bioParagraphs: [
      "Originaire du Burkina Faso et installé à Berlin, Ahmed Soura déploie un langage chorégraphique singulier où dialoguent les danses traditionnelles d'Afrique de l'Ouest et l'exigence formelle de la danse contemporaine internationale.",
      "Formé à l'INAFAC au Burkina Faso puis au Centre Chorégraphique National de Montpellier sous la direction de Mathilde Monnier, il a forgé une technique physique intense, faite de précision organique, de rapidité et d'une présence scénique magnétique.",
      "À travers la compagnie KORO fondée en 2007 et l'écosystème Yongonlon, Ahmed Soura construit des ponts vivants entre Ouagadougou, Bobo-Dioulasso et les scènes européennes, affirmant l'art comme espace universel d'émancipation et de partage."
    ],
    trainingTitle: "Formation d'excellence",
    trainingItems: [
      "INAFAC (Institut National de Formation Artistique et Culturelle, Burkina Faso)",
      "CCN Montpellier (Centre Chorégraphique National, direction Mathilde Monnier, France)",
      "Transmission auprès des maîtres de danses traditionnelles mandingues et sahéliennes"
    ],
    awardsTitle: "Distinctions & Prix",
    awardsItems: [
      "Deuxième prix au Concours de Danse Contemporaine d'Afrique et de l'Océan Indien (2011)",
      "Prix du Public au Festival International Solo-Tanz-Theater de Stuttgart (2013)",
      "Reconnaissance internationale pour les solos « 166 » et « En opposition avec Moi »"
    ],
    collabTitle: "Collaborations majeures",
    collabItems: [
      "Pink Mama Theatre (Suisse / Allemagne)",
      "Compagnie Christoph Winkler (Berlin)",
      "Artistes visuels, musiciens et metteurs en scène de la scène berlinoise et ouest-africaine"
    ],
    teachingCurrent: "Enseignant régulier à la prestigieuse Tanzfabrik Berlin et invité dans de nombreux festivals en Europe et en Afrique.",
    ctaMore: "Découvrir la biographie complète",
    quoteHandwritten: "Une énergie sans frontières",
  },
  portals: {
    sectionTag: "UNIVERS YONGONLON",
    title: "Nos univers",
    subtitle: "Quatre fenêtres pour explorer l'ensemble de notre dynamique artistique, éducative et solidaire.",
    items: [
      {
        id: "centre",
        title: "Centre Interculturel Yongonlon",
        subtitle: "Espace de transmission & d'accueil",
        description: "Lieu de vie, de résidences artistiques, d'ateliers et d'échanges interculturels entre l'Europe et le continent africain.",
        tag: "Culture & Éducation",
        linkText: "Explorer le Centre",
      },
      {
        id: "production",
        title: "Yongonlon Production",
        subtitle: "Création & diffusion scénique",
        description: "Bureau de production et de tournée des spectacles d'Ahmed Soura et des artistes associés sur les scènes internationales.",
        tag: "Scène & Tournée",
        linkText: "Découvrir les pièces",
      },
      {
        id: "boutique",
        title: "Boutique Yongonlon",
        subtitle: "Objets d'art & éditions",
        description: "Créations textiles écoresponsables, pièces uniques Power Gig'Art, objets d'artisanat d'art et publications.",
        tag: "Édition & Merch",
        linkText: "Visiter la boutique",
      },
      {
        id: "ahmed",
        title: "Ahmed Soura",
        subtitle: "L'artiste chorégraphe",
        description: "Découvrez le parcours complet, le répertoire des solos récompensés et la démarche pédagogique d'Ahmed Soura.",
        tag: "Répertoire & Solo",
        linkText: "Consulter la biographie",
      },
    ],
  },
  classes: {
    sectionTag: "TRANSMISSION & PRATIQUE",
    title: "Cours & Ateliers",
    subtitle: "Des espaces d'apprentissage exigeants et bienveillants, adaptés à tous les niveaux.",
    ctaBook: "Réserver un cours",
    upcomingTitle: "Prochaines sessions à Berlin",
    viewAllTitle: "Consulter l'agenda complet",
    items: [
      {
        id: "cours-prives",
        title: "Cours privés & Accompagnement sur-mesure",
        category: "Individuel",
        duration: "60 à 90 min",
        level: "Tous niveaux",
        desc: "Séance personnalisée axée sur la technique corporelle, la posture, la fluidité du mouvement ou la préparation à une audition.",
        price: "Sur demande",
      },
      {
        id: "ateliers-collectifs",
        title: "Ateliers collectifs réguliers",
        category: "Collectif",
        duration: "90 min",
        level: "Intermédiaire / Avancé",
        desc: "Pratique hebdomadaire en studio mêlant écoute du groupe, travail au sol, musicalité et libération des énergies corporelles.",
        price: "À partir de 18 €",
      },
      {
        id: "danse-afro-contemporaine",
        title: "Danse Afro-Contemporaine",
        category: "Spécialité",
        duration: "90 min",
        level: "Tous niveaux",
        desc: "La signature d'Ahmed Soura : synthèse organique des rythmes ouest-africains et de l'abstraction contemporaine.",
        price: "À partir de 20 €",
      },
      {
        id: "danses-traditionnelles",
        title: "Danses traditionnelles du Burkina Faso",
        category: "Tradition & Racines",
        duration: "120 min",
        level: "Tous niveaux",
        desc: "Immersion dans les pas, chants et polyrythmies des terroirs burkinabè accompagnés par des percussionnistes en direct.",
        price: "À partir de 25 €",
      },
      {
        id: "coaching-choregraphe",
        title: "Coaching chorégraphique pour danseurs pros",
        category: "Professionnel",
        duration: "Sur-mesure",
        level: "Professionnels",
        desc: "Regard extérieur aiguisé, dramaturgie du corps, épuration du geste et accompagnement à la création de solos ou pièces de groupe.",
        price: "Sur devis",
      },
      {
        id: "interventions-entreprises",
        title: "Interventions en entreprises & Écoles",
        category: "Institutionnel",
        duration: "Demi-journée / Journée",
        level: "Grand public",
        desc: "Workshops de cohésion, d'écoute active, de gestion du stress et de conscience corporelle par le mouvement partagé.",
        price: "Sur devis",
      },
    ],
    schedule: [
      {
        date: "Mercredi 18:30 - 20:00",
        time: "Hebdomadaire",
        title: "Danse Afro-Contemporaine (Tanzfabrik)",
        location: "Berlin Kreuzberg",
        spots: "Places disponibles",
      },
      {
        date: "Vendredi 19:00 - 21:00",
        time: "Bimensuel",
        title: "Danses traditionnelles & Percussions live",
        location: "Berlin Neukölln",
        spots: "Dernières places",
      },
      {
        date: "Samedi 10:00 - 14:00",
        time: "Workshop Mensuel",
        title: "Masterclass Intensive « Le Corps Énergie »",
        location: "Centre Yongonlon Berlin",
        spots: "Sur inscription",
      },
    ],
  },
  gallery: {
    sectionTag: "MOUVEMENTS EN IMAGES",
    title: "Galerie & Scène",
    quoteHandwritten: "Le corps ne ment jamais",
    filterAll: "Toutes les photos",
    filterPerformance: "Scène & Performance",
    filterPortrait: "Portraits & Postures",
    filterRehearsal: "Répétitions & Ateliers",
    items: [
      {
        id: "photo-1",
        src: "/images/ahmed-soura-green.jpg",
        title: "Solo sur scène — Tenue vert lime",
        category: "performance",
        credit: "Photo © Jo Grabowski",
        year: "2023",
      },
      {
        id: "photo-2",
        src: "/images/ahmed-soura-performance.jpg",
        title: "Présence et intensité scénique",
        category: "performance",
        credit: "Photo © Jo Grabowski",
        year: "2022",
      },
      {
        id: "photo-3",
        src: "/images/ahmed-soura-arched.jpg",
        title: "Flexion dorsale sculpturale sous projecteur",
        category: "performance",
        credit: "Photo officielle",
        year: "2021",
      },
      {
        id: "photo-4",
        src: "/images/ahmed-soura-hooded.jpg",
        title: "Mouvement sculptural contemporain",
        category: "portrait",
        credit: "Atelier Berlin",
        year: "2024",
      },
      {
        id: "photo-5",
        src: "/images/yongonlon-logo.jpg",
        title: "Identité graphique YONGONLON",
        category: "portrait",
        credit: "Yongonlon Archives",
        year: "2024",
      },
    ],
  },
  shop: {
    sectionTag: "BOUTIQUE SOLIDAIRE",
    title: "Boutique Yongonlon",
    subtitle: "Chaque acquisition soutient directement les projets de création et les bourses de formation artistique.",
    ctaViewCatalog: "Consulter la boutique",
    addToCart: "Ajouter au panier",
    items: boutiqueProductsFr.slice(0, 4),
  },
  donation: {
    sectionTag: "ENGAGEMENT & PARTAGE",
    title: "Soutenir Yongonlon",
    subtitle: "Votre don permet à de jeunes danseurs d'accéder à des formations de haut niveau et soutient le dialogue interculturel.",
    description: "Le Centre Interculturel Yongonlon œuvre au quotidien pour créer des opportunités concrètes d'émancipation par l'art au Burkina Faso et en Europe.",
    frequencyOnce: "Don ponctuel",
    frequencyMonthly: "Don mensuel",
    customAmountPlaceholder: "Montant libre (€)",
    ctaDonate: "Faire un don maintenant",
    secureNotice: "Paiement 100% sécurisé (Stripe & PayPal) · Reçu fiscal délivré automatiquement",
    quoteHandwritten: "Chaque geste construit un pont",
  },
  contact: {
    sectionTag: "RENCONTRE & DIALOGUE",
    title: "Écrivons ensemble",
    subtitle: "Pour toute demande de cours, de programmation de spectacle, de collaboration artistique ou d'information générale.",
    berlinLabel: "Basé à Berlin & Ouagadougou",
    generalEmailLabel: "Contact général :",
    bookingEmailLabel: "Diffusion & Réservations :",
    phoneLabel: "WhatsApp & Permanence : +49 163 717 36 62",
    form: {
      name: "Votre nom complet",
      namePlaceholder: "ex: Aminata Diallo",
      email: "Votre adresse email",
      emailPlaceholder: "ex: aminata@domaine.com",
      category: "Nature de votre demande",
      categories: [
        { value: "cours", label: "Réservation de cours ou atelier" },
        { value: "spectacle", label: "Programmation / Diffusion de spectacle" },
        { value: "collaboration", label: "Collaboration artistique ou projet pédagogique" },
        { value: "presse", label: "Presse, médias & interview" },
        { value: "autre", label: "Autre question" },
      ],
      message: "Votre message",
      messagePlaceholder: "Précisez votre demande, vos disponibilités ou les détails de votre projet...",
      consent: "J'accepte que mes données soient traitées dans le cadre de cette prise de contact conformément à la politique de confidentialité.",
      submit: "Envoyer le message",
      submitting: "Envoi en cours...",
      success: "Merci ! Votre message a bien été transmis. Nous vous répondrons dans les plus brefs délais.",
    },
  },
  ahmedPage: {
    heroTitle: "Ahmed Soura",
    heroSubtitle: "Danseur · Chorégraphe · Pédagogue · Directeur Artistique",
    statement: "« Danser, c'est dialoguer avec ce qui nous dépasse. C'est transformer l'histoire, la douleur et la joie en un souffle partagé. »",
    biographyTitle: "Une traversée entre l'Afrique de l'Ouest et l'Europe",
    biographyFull: [
      "Né au Burkina Faso, Ahmed Soura grandit au rythme des cérémonies et des danses traditionnelles qui rythment le quotidien et la transmission culturelle de sa communauté. Très tôt remarqué pour son agilité et son expressivité singulière, il intègre l'Institut National de Formation Artistique et Culturelle (INAFAC) à Ouagadougou, où il acquiert les fondements rigoureux des arts du spectacle et des répertoires patrimoniaux.",
      "Son parcours prend une dimension internationale lorsqu'il est admis au Centre Chorégraphique National de Montpellier sous la direction de Mathilde Monnier. Cette formation d'élite lui ouvre les horizons de l'avant-garde européenne et affine son écriture personnelle : un corps athlétique, habité, capable de passages foudroyants entre vélocité rituelle et retenue plastique méditative.",
      "En 2007, il fonde la compagnie KORO au Burkina Faso, espace de recherche chorégraphique et de formation pour une nouvelle génération d'interprètes africains. Établi à Berlin depuis plusieurs années, il y a développé des collaborations majeures avec des compagnies renommées (Pink Mama Theatre, Cie Christoph Winkler) tout en enseignant fidèlement à la Tanzfabrik Berlin.",
      "Aujourd'hui, à la tête de l'écosystème Yongonlon, Ahmed Soura poursuit une œuvre engagée où chaque création scénique, atelier de transmission ou objet d'art participe à une même vision : faire de la danse un pont vivant entre les continents."
    ],
    solosTitle: "Solos de Répertoire Primés",
    solosSubtitle: "Des œuvres fondatrices saluées par la critique internationale et présentées sur les grandes scènes.",
    solos: [
      {
        id: "solo-166",
        title: "Solo 166",
        year: "2013",
        award: "Prix du Public au Festival Solo-Tanz-Theater de Stuttgart (2013)",
        duration: "35 minutes",
        synopsis: "Dans « 166 », Ahmed Soura explore la mémoire des corps déracinés, l'effort physique absolu et la quête d'identité à travers les frontières. Sous une lumière ciselée, le danseur habite un espace minimaliste où chaque geste devient une prière physique contre l'oubli.",
        credits: "Chorégraphie et interprétation : Ahmed Soura · Lumières : Boris Kahnert · Musique originale : Répertoire Mandingue & Création électroacoustique",
      },
      {
        id: "opposition",
        title: "En opposition avec Moi",
        year: "2011",
        award: "2e Prix au Concours de Danse Contemporaine d'Afrique et de l'Océan Indien (2011)",
        duration: "40 minutes",
        synopsis: "Une pièce incisive sur la dualité intérieure, les tiraillements de l'exil et la confrontation entre traditions héritées et pulsion de liberté individuelle. Une performance d'une virtuosité physique acclamée sur trois continents.",
        credits: "Conception et jeu : Ahmed Soura · Création sonore : Mix ouest-africain contemporain · Production : KORO",
      },
    ],
    collabTitle: "Collaborations & Rayonnement Scénique",
    collabSubtitle: "Une présence constante sur les plateaux européens et internationaux.",
    teachingTitle: "La Pédagogie du Mouvement : Tanzfabrik Berlin & International",
    teachingText: "Pédagogue reconnu pour sa générosité et son exigence, Ahmed Soura dispense des cours réguliers et des masterclasses intensives à la prestigieuse Tanzfabrik Berlin. Sa méthode, « Le Corps Énergie », associe ancrage au sol, conscience du souffle, polyrythmie africaine et liberté d'improvisation contemporaine.",
  },
  centrePage: {
    heroTitle: "Centre Interculturel Yongonlon",
    heroSubtitle: "Un pont vivant d'art, de transmission et de solidarité entre Berlin et le Burkina Faso",
    missionTitle: "Notre Vision & Manifeste",
    missionText: "Fondé par Ahmed Soura, le Centre Interculturel Yongonlon est un espace indépendant dédié au dialogue artistique, à la formation de jeunes interprètes et à l'hospitalité culturelle. Convaincu que l'art est un moteur essentiel de dignité et d'émancipation humaine, le Centre relie les savoirs ancestraux d'Afrique de l'Ouest aux pratiques contemporaines les plus audacieuses.",
    pillarsTitle: "Les 4 Piliers d'Action",
    pillars: [
      {
        title: "1. Formation & Bourses d'Études",
        desc: "Accompagner de jeunes danseurs et artistes du Burkina Faso à travers des programmes de bourses, des formations intensives et un mentorat sur-mesure pour accéder aux circuits professionnels internationaux.",
      },
      {
        title: "2. Résidences Artistiques Croisées",
        desc: "Offrir des temps et des espaces de recherche à des créateurs burkinabè, allemands et internationaux afin de favoriser des co-créations inédites et le décloisonnement des disciplines.",
      },
      {
        title: "3. Ateliers Communautaires & Pratique Partagée",
        desc: "Rendre la danse accessible à tous les publics : cours ouverts, ateliers parents-enfants, projets dans les écoles et médiation culturelle pour tisser du lien social dans les quartiers de Berlin et Ouagadougou.",
      },
      {
        title: "4. Économie Équitable & Préservation des Savoir-Faire",
        desc: "Soutenir les artisans locaux, maîtres fondeurs de bronze et tisseurs traditionnels burkinabè à travers la diffusion d'objets d'art et de créations textiles au sein de la Boutique Yongonlon.",
      },
    ],
    communityTitle: "Une Communauté Ouverte sur le Monde",
    communityText: "Le Centre Interculturel Yongonlon n'est pas un lieu clos : c'est un écosystème dynamique porté par des artistes, des pédagogues, des bénévoles et des partenaires engagés.",
    ctaSupport: "Soutenir les programmes du Centre",
  },
  productionPage: {
    heroTitle: "Yongonlon Production",
    heroSubtitle: "Bureau de production chorégraphique & diffusion internationale",
    introText: "Yongonlon Production assure le développement, la structuration technique, l'administration de tournée et la diffusion internationale des spectacles d'Ahmed Soura et des projets collectifs de la compagnie KORO.",
    piecesTitle: "Catalogue des Pièces en Tournée & Répertoire",
    pieces: [
      {
        id: "solo-166-prod",
        title: "Solo 166",
        type: "Solo contemporain",
        year: "2013 — En tournée",
        duration: "35 min",
        credits: "Chorégraphie et interprétation : Ahmed Soura",
        description: "Méditation physique intense sur la liberté et l'exil. Pièce autonome avec fiche technique adaptable aux théâtres, galeries d'art et espaces non conventionnels.",
        status: "Disponible en tournée 2026/2027",
      },
      {
        id: "en-opposition-prod",
        title: "En opposition avec Moi",
        type: "Solo chorégraphique",
        year: "2011 — En tournée",
        duration: "40 min",
        credits: "Chorégraphie et interprétation : Ahmed Soura",
        description: "Œuvre primée explorant la confrontation intérieure des mémoires. Tournée en Europe, en Afrique de l'Ouest et en Amérique du Sud.",
        status: "Disponible en tournée",
      },
      {
        id: "creation-nouvelle-prod",
        title: "Traversées (Création collective en cours)",
        type: "Pièce pour 5 danseurs",
        year: "2026 / 2027",
        duration: "65 min",
        credits: "Direction artistique : Ahmed Soura · Yongonlon Production & Coproducteurs internationaux",
        description: "Création croisée réunissant des danseurs du Burkina Faso et de Berlin autour des mémoires des routes migratoires et de l'espoir partagé.",
        status: "En cours de résidence / Recherche de coproduction",
      },
    ],
    proTitle: "Espace Professionnels & Programmateurs",
    proText: "Vous êtes programmateur d'un festival, directeur de théâtre ou responsable d'un centre chorégraphique ? Téléchargez nos dossiers artistiques, fiches techniques et conditions d'accueil en tournée.",
    ctaBooking: "Contacter le bureau de diffusion",
    ctaTechRider: "Demander une fiche technique complète",
  },
  agendaPage: {
    heroTitle: "Agenda Public",
    heroSubtitle: "Performances, masterclasses, cours hebdomadaires et événements du Centre Yongonlon à Berlin et en tournée.",
    filters: {
      all: "Tous les événements",
      courses: "Cours réguliers",
      performances: "Spectacles & Solos",
      workshops: "Workshops intensifs",
      yongonlon: "Événements Yongonlon",
    },
    events: [
      {
        id: "evt-1",
        title: "Danse Afro-Contemporaine · Session Hebdomadaire",
        category: "courses",
        date: "Tous les mercredis",
        time: "18:30 - 20:00",
        location: "Tanzfabrik Berlin (Möckernstraße 68)",
        city: "Berlin Kreuzberg",
        description: "Pratique corporelle dynamique associant rythmes traditionnels mandingues et fluidité contemporaine. Ouvert à tous niveaux avec travail différencié.",
        status: "open",
        linkText: "Réserver cette session",
      },
      {
        id: "evt-2",
        title: "Représentation : « Solo 166 » d'Ahmed Soura",
        category: "performances",
        date: "24 Octobre 2026",
        time: "20:00",
        location: "Theaterhaus Berlin Mitte",
        city: "Berlin",
        description: "Représentation exceptionnelle du solo primé suivie d'un échange avec le public et l'équipe artistique.",
        status: "open",
        linkText: "Billetterie du festival",
      },
      {
        id: "evt-3",
        title: "Masterclass Intensive « Le Corps Énergie » (Week-end)",
        category: "workshops",
        date: "7 - 8 Novembre 2026",
        time: "10:00 - 15:00",
        location: "Studio Yongonlon Berlin",
        city: "Berlin Neukölln",
        description: "Deux jours d'immersion technique pour danseurs intermédiaires et avancés : polyrythmie, impulsions de la colonne et dramaturgie de l'improvisation.",
        status: "last_spots",
        linkText: "S'inscrire à la Masterclass",
      },
      {
        id: "evt-4",
        title: "Soirée Rencontre & Table Ronde : Danse et Résilience Interculturelle",
        category: "yongonlon",
        date: "20 Novembre 2026",
        time: "19:00",
        location: "Centre Interculturel Yongonlon",
        city: "Berlin",
        description: "Échange bilingue, projection d'extraits d'ateliers à Ouagadougou, et performances impromptues avec les artistes résidents.",
        status: "open",
        linkText: "Entrée libre sur réservation",
      },
      {
        id: "evt-5",
        title: "Atelier Traditionnel : Danses du terroir Burkinabè & Percussions live",
        category: "workshops",
        date: "5 Décembre 2026",
        time: "14:00 - 17:30",
        location: "Dock 11 Studios",
        city: "Berlin Prenzlauer Berg",
        description: "Stage pratique avec musiciens percussionnistes en direct : apprentissage des pas sacrés et festifs des traditions du Burkina Faso.",
        status: "open",
        linkText: "Réserver ma place",
      },
    ],
  },
  bookingPage: {
    heroTitle: "Réservation de Cours & Ateliers",
    heroSubtitle: "Réservez en quelques clics votre séance avec Ahmed Soura : cours privé, cours régulier ou atelier intensif.",
    steps: {
      service: "1. Choix de la discipline",
      datetime: "2. Date & Créneau horaire",
      info: "3. Vos coordonnées",
      message: "4. Niveau & Objectifs",
      summary: "5. Récapitulatif",
      confirmation: "6. Confirmation immédiate",
    },
  },
  shopPage: {
    heroTitle: "Boutique Yongonlon",
    heroSubtitle: "Collection textile officielle Ahmed Soura × Yongonlon : t-shirts sérigraphiés et casquettes brodées.",
    tagline: "Un achat solidaire au service de la création chorégraphique et de l'émancipation par l'art.",
    filters: {
      all: "Tous les articles",
      tshirts: "T-shirts",
      casquettes: "Casquettes",
    },
    filterAllLabel: "Tous",
    inStockLabel: "En stock",
    selectVariant: "Sélectionner une option :",
    selectSize: "Taille :",
    selectColor: "Couleur :",
    addToCart: "Ajouter au panier",
    addedToCart: "Article ajouté au panier !",
    quickView: "Aperçu rapide",
    closeQuickView: "Fermer",
    freeShippingNotice: "Livraison offerte en Allemagne et en Europe dès 80 € d'achat.",
    ethicalCommitmentTitle: "Notre engagement éthique",
    ethicalCommitmentDesc: "Toutes nos pièces sont confectionnées dans le respect des artisans partenaires à Ouagadougou et Bobo-Dioulasso ou imprimées sur des textiles écologiques certifiés à Berlin. 100% des bénéfices sont réinvestis dans les bourses artistiques Yongonlon.",
    products: boutiqueProductsFr,
  },
  donationPage: {
    heroTitle: "Soutenir Yongonlon",
    heroSubtitle: "Faites vivre un pont artistique et humain entre l'Europe et l'Afrique de l'Ouest.",
    statement: "« Chaque don permet à un jeune interprète d'étudier, à une pièce de voir le jour et à des communautés de se rencontrer à travers la danse. »",
    pillarsTitle: "L'impact concret de votre générosité",
    pillarsSubtitle: "Une transparence totale sur l'affectation de chaque euro collecté.",
    pillars: [
      {
        title: "Bourses d'Études Danse Burkina Faso",
        desc: "Prise en charge complète de la formation, des repas et des frais de transport de jeunes danseurs défavorisés à Ouagadougou et Bobo-Dioulasso.",
        impact: "50 € = 1 mois de formation professionnelle intensive pour un jeune interprète."
      },
      {
        title: "Ateliers Ouverts & Médiation à Berlin",
        desc: "Organisation de cours hebdomadaires à tarif solidaire pour les réfugiés, les familles et les jeunes des quartiers berlinois.",
        impact: "100 € = Financement d'un atelier complet avec musicien percussionniste invité."
      },
      {
        title: "Résidences de Création Internationale",
        desc: "Soutien aux créateurs burkinabè pour des temps de recherche scénique, de diffusion et de rencontres en Europe.",
        impact: "250 € = Bourse d'hébergement pour un artiste en résidence de recherche scénique."
      }
    ],
    formTitle: "Faire un don en ligne",
    frequencyLabel: "Fréquence du versement :",
    frequencyOnce: "Don ponctuel",
    frequencyMonthly: "Don mensuel régulier",
    amountLabel: "Choisissez un montant :",
    customAmountLabel: "Ou saisissez un montant personnalisé :",
    customAmountPlaceholder: "Autre montant en €",
    taxDeductionTitle: "Déduction fiscale et avantage",
    taxDeductionDesc: "En Allemagne, votre don est déductible au titre du § 10b EStG (Spendenbescheinigung émise automatiquement). En France, il ouvre droit à une réduction d'impôt de 66% (un don de 100 € ne vous coûte réellement que 34 €).",
    donorDetailsTitle: "Vos coordonnées pour le reçu fiscal",
    firstNameLabel: "Prénom",
    lastNameLabel: "Nom",
    emailLabel: "Adresse email (pour le reçu)",
    addressLabel: "Adresse postale",
    cityLabel: "Ville",
    postalCodeLabel: "Code postal",
    countryLabel: "Pays de résidence",
    paymentMethodLabel: "Mode de règlement sécurisé :",
    paymentCard: "Carte bancaire (Stripe sécurisé)",
    paymentPaypal: "PayPal Express",
    paymentSepa: "Prélèvement SEPA Direct Debit",
    paymentBankTransfer: "Virement bancaire direct",
    bankDetailsTitle: "Coordonnées bancaires officielles de l'association",
    bankAccountOwner: "Titulaire du compte : YONGONLON Interkulturelles Zentrum e.V.",
    bankIban: "IBAN : DE89 1001 0010 1234 5678 90 (Demo)",
    bankBic: "BIC / SWIFT : PBNKDEFFXXX",
    bankReference: "Motif obligatoire : DON-YON-2026 + Votre Nom",
    submitButtonOnce: "Valider mon don ponctuel de",
    submitButtonMonthly: "Activer mon soutien mensuel de",
    receiptTitle: "Attestation officielle de don délivrée",
    receiptNotice: "Votre reçu officiel au format PDF vous est immédiatement mis à disposition dès la confirmation.",
    downloadReceipt: "Télécharger mon attestation de don (PDF)",
    quoteTitle: "Un engagement partagé",
    quoteText: "« Quand nous dansons ensemble, il n'y a plus d'étrangers, il n'y a que des êtres qui respirent à l'unisson. »",
    quoteAuthor: "Ahmed Soura",
  },
  cart: {
    drawerTitle: "Mon Panier",
    emptyTitle: "Votre panier est vide",
    emptySubtitle: "Découvrez nos pièces textiles écoresponsables, nos tirages d'art et la ligne exclusive Power Gig'Art.",
    continueShopping: "Continuer mes achats",
    itemSingular: "article",
    itemPlural: "articles",
    subtotal: "Sous-total :",
    shippingEstimate: "Frais d'expédition estimés :",
    shippingFree: "Offerts",
    freeShippingProgress: "Plus que {amount} € pour bénéficier de la livraison offerte !",
    freeShippingReached: "Félicitations ! Vous bénéficiez de la livraison gratuite.",
    checkoutButton: "Commander en toute sécurité",
    checkoutModalTitle: "Tunnel de Commande Sécurisé",
    checkoutNotice: "Plateforme de paiement conforme PCI-DSS (Stripe & PayPal). Vos informations bancaires sont strictement chiffrées.",
    orderSummary: "Récapitulatif de la commande",
    fullName: "Nom et Prénom",
    shippingAddress: "Adresse de livraison complète",
    completeOrder: "Confirmer la commande",
    orderSuccessTitle: "Commande confirmée avec succès !",
    orderSuccessSubtitle: "Merci pour votre achat solidaire. Un email de récapitulatif détaillé vous a été envoyé.",
    orderRefLabel: "Référence commande :",
    closeCart: "Fermer le panier",
  },
  cookies: {
    title: "Gestion de vos préférences de cookies & vie privée",
    message: "Nous utilisons des cookies essentiels au fonctionnement du site, ainsi que des traceurs optionnels pour mesurer l'audience et afficher nos vidéos de danse hébergées (YouTube / Vimeo). Vous pouvez choisir d'accepter ou de personnaliser vos consentements à tout moment.",
    acceptAll: "Tout accepter",
    rejectNonEssential: "Continuer sans accepter",
    customize: "Personnaliser",
    savePreferences: "Enregistrer mes préférences",
    necessary: "Cookies techniques nécessaires (Obligatoires)",
    necessaryDesc: "Indispensables pour mémoriser votre langue, votre panier et sécuriser votre session.",
    analytics: "Mesure d'audience anonymisée",
    analyticsDesc: "Statistiques agrégées pour améliorer les parcours et la vitesse de chargement.",
    media: "Médias vidéo externes",
    mediaDesc: "Autoriser l'affichage direct des extraits de pièces chorégraphiques hébergées sur Vimeo / YouTube.",
  },
  impressum: {
    title: "Mentions Légales (Impressum)",
    subtitle: "Informations obligatoires selon le § 5 de la loi allemande sur les services numériques (Digitale-Dienste-Gesetz - DDG) et le § 18 MStV.",
    lastUpdated: "Dernière mise à jour : 2026",
    sections: [
      {
        title: "1. Éditeur de la plateforme",
        content: [
          "YONGONLON — Art, Corps & Culture (Initiative Interculturelle)",
          "Représentée légalement par : Ahmed Soura",
          "Siège d'activité : Berlin, Allemagne / Ouagadougou, Burkina Faso",
          "Email de contact : contact@ahmedsoura-yongonlon.com",
          "Téléphone / Permanence : +49 163 717 36 62"
        ]
      },
      {
        title: "2. Responsable de la publication et du contenu rédactionnel",
        content: [
          "Conformément au § 18 alinéa 2 du Traité sur les Médias (MStV) :",
          "Ahmed Soura",
          "Direction Artistique et Chorégraphique",
          "Berlin, Allemagne"
        ]
      },
      {
        title: "3. Propriété intellectuelle et droits d'auteur",
        content: [
          "Tous les contenus, photographies, vidéos, textes, partitions chorégraphiques et créations graphiques présents sur ce site sont protégés par le droit d'auteur allemand et international.",
          "Toute reproduction, modification ou diffusion non autorisée par écrit d'Ahmed Soura ou de l'écosystème Yongonlon est strictement prohibée.",
          "Crédits photographiques : © Jo Grabowski, © Atelier Yongonlon, tous droits réservés."
        ]
      },
      {
        title: "4. Règlement des litiges en ligne de l'UE",
        content: [
          "La Commission Européenne met à disposition une plateforme de règlement en ligne des litiges (RLL) accessible à l'adresse : https://ec.europa.eu/consumers/odr.",
          "Nous ne sommes ni tenus ni disposés à participer à une procédure de règlement des litiges devant un conseil d'arbitrage de consommation."
        ]
      }
    ]
  },
  datenschutz: {
    title: "Politique de Confidentialité (Datenschutzerklärung)",
    subtitle: "Traitement de vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD / DSGVO).",
    lastUpdated: "Dernière mise à jour : 2026",
    sections: [
      {
        title: "1. Responsable du traitement des données",
        content: [
          "Le responsable du traitement des données sur ce site internet au sens du RGPD est :",
          "Ahmed Soura / YONGONLON",
          "Email : privacy@ahmedsoura-yongonlon.com",
          "Nous prenons la protection de vos données personnelles très au sérieux et traitons vos données de manière confidentielle et conformément aux dispositions légales."
        ]
      },
      {
        title: "2. Collecte des données sur notre site web",
        content: [
          "Formulaire de contact : Les informations transmises (nom, email, message) sont enregistrées exclusivement dans le but de répondre à votre demande. Elles ne sont jamais cédées à des tiers.",
          "Réservation de cours et commandes boutique : Les données collectées sont nécessaires à l'exécution du contrat de prestation de cours ou d'expédition de commande (Art. 6 al. 1 lit. b RGPD).",
          "Dons : Vos informations de facturation permettent l'émission de l'attestation fiscale officielle."
        ]
      },
      {
        title: "3. Paiements sécurisés (Stripe & PayPal)",
        content: [
          "Pour les transactions de la boutique et les dons en ligne, nous faisons appel à des prestataires de services de paiement agréés (Stripe Payments Europe Ltd. et PayPal Europe S.à r.l.).",
          "Aucune coordonnée bancaire complète (numéro de carte de crédit, code CVC) ne transite ni n'est stockée sur nos serveurs. Le traitement s'effectue via des canaux chiffrés SSL/TLS directs."
        ]
      },
      {
        title: "4. Vos droits (Auskunftsrecht, Berichtigung, Löschung)",
        content: [
          "Conformément au RGPD, vous disposez à tout moment d'un droit d'accès gratuit à vos données enregistrées, de rectification, de verrouillage ou de suppression de ces données.",
          "Pour toute question relative à l'exercice de vos droits, vous pouvez nous écrire directement à privacy@ahmedsoura-yongonlon.com."
        ]
      }
    ]
  },
  footer: {
    quote: "« La danse est une mémoire vivante, un battement qui relie les générations. »",
    quoteAuthor: "Ahmed Soura",
    allRightsReserved: "Tous droits réservés. Design & Direction artistique Ahmed Soura × Yongonlon.",
    impressum: "Impressum",
    privacy: "Confidentialité & DSGVO",
    cookies: "Gestion des cookies",
  },
};

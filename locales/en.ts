import { TranslationSchema, ProductItem } from "@/types/i18n";

export const boutiqueProductsEn: ProductItem[] = [
  {
    id: "tshirt-typo-noir",
    title: "Yongonlon Typographic T-shirt — Black",
    category: "tshirts",
    categoryLabel: "T-shirts",
    price: 35,
    formattedPrice: "€35",
    desc: "Relaxed fit unisex t-shirt featuring the 3×3 Yongonlon typographic matrix. Artisanal screen printing with water-based ink on a black background.",
    details: [
      "100% Organic ring-spun combed cotton 220g",
      "Eco-friendly solvent-free screen printing",
      "Thick crew neck with double stitching",
      "Original design by Atelier Yongonlon Berlin"
    ],
    tag: "Essential",
    image: "/images/products/tshirt-noir.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Deep Black", hex: "#0c0c0c" }
    ],
    inStock: true
  },
  {
    id: "tshirt-typo-blanc",
    title: "Yongonlon Typographic T-shirt — White",
    category: "tshirts",
    categoryLabel: "T-shirts",
    price: 35,
    formattedPrice: "€35",
    desc: "Minimalist black 3×3 matrix screen-printed on heavy white organic cotton. Yongonlon signature piece.",
    details: [
      "100% Heavy organic cotton 250g",
      "High-definition matte black screen printing",
      "Reinforced seams on shoulders and collar",
      "Comfortable straight unisex fit"
    ],
    tag: "Signature",
    image: "/images/products/tshirt-blanc.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Pure White", hex: "#ffffff" }
    ],
    inStock: true
  },
  {
    id: "tshirt-solo166",
    title: "« Solo 166 » Stage T-shirt — Collector",
    category: "tshirts",
    categoryLabel: "T-shirts",
    price: 42,
    formattedPrice: "€42",
    desc: "Iconic lime green visual from the award-winning solo piece « 166 » printed on a black background. Numbered collector's edition.",
    details: [
      "High-resolution DTG digital printing",
      "GOTS certified organic cotton 200g",
      "Exclusive visual photographed by Jo Grabowski",
      "Each t-shirt is numbered"
    ],
    tag: "Collector's Edition",
    image: "/images/products/tshirt-solo166.jpg",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Deep Black", hex: "#111111" }
    ],
    inStock: true,
    editionNotice: "Limited edition of 100 copies"
  },
  {
    id: "tshirt-danser",
    title: "Eco T-shirt « Dance · Gather · Transmit »",
    category: "tshirts",
    categoryLabel: "T-shirts",
    price: 32,
    formattedPrice: "€32",
    desc: "Signature typography on the back, founding motto of the association. Lightweight organic cotton ideal for dance and daily wear.",
    details: [
      "100% Lightweight organic cotton 180g",
      "Signature typography embroidered on the back",
      "Fitted unisex cut",
      "OEKO-TEX certified eco-friendly dye"
    ],
    tag: "Eco-friendly",
    image: "/images/products/tshirt-eco.jpg",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal Black", hex: "#181818" },
      { name: "Natural Ivory", hex: "#f5f2eb" }
    ],
    inStock: true
  },
  {
    id: "casquette-yon-berlin",
    title: "Embroidered Cap « YON » Studio Berlin",
    category: "casquettes",
    categoryLabel: "Caps",
    price: 30,
    formattedPrice: "€30",
    desc: "6-panel cotton twill cap with engraved metal buckle. High-precision 3D relief embroidery.",
    details: [
      "100% Premium cotton twill",
      "High-definition 3D embroidery on the front panel",
      "Adjustable aged brass back strap",
      "Absorbent sweatband"
    ],
    image: "/images/products/casquette-yon.jpg",
    colors: [
      { name: "Delicate Black", hex: "#1a1a1a" },
      { name: "Khaki Sand", hex: "#8c8272" }
    ],
    inStock: true
  },
  {
    id: "casquette-vintage-washed",
    title: "Vintage Washed Cap Yongonlon",
    category: "casquettes",
    categoryLabel: "Caps",
    price: 28,
    formattedPrice: "€28",
    desc: "Faded vintage effect twill cotton with embroidered Yongonlon logo. Engraved metal buckle on the back.",
    details: [
      "Washed twill cotton for a natural worn effect",
      "Tone-on-tone embroidered Yongonlon logo",
      "Pre-curved visor",
      "One size adjustable"
    ],
    tag: "Vintage Style",
    image: "/images/products/casquette-vintage.jpg",
    colors: [
      { name: "Faded Olive Green", hex: "#6b7c5e" },
      { name: "Washed Black", hex: "#2a2a2a" }
    ],
    inStock: true
  },
  {
    id: "casquette-166-lime",
    title: "Minimalist Cap « 166 » Black & Lime Green",
    category: "casquettes",
    categoryLabel: "Caps",
    price: 32,
    formattedPrice: "€32",
    desc: "Minimal studio edition with the iconic number « 166 » embroidered in lime green on a deep black background.",
    details: [
      "Structured 5-panel construction",
      "Contrasting lime green (#c6f23b) embroidery",
      "Adjustable snapback closure",
      "Studio Berlin Limited Edition"
    ],
    tag: "Studio Edition",
    image: "/images/products/casquette-166.jpg",
    colors: [
      { name: "Black & Lime", hex: "#111111" }
    ],
    inStock: true
  }
];

export const en: TranslationSchema = {
  lang: "en",
  nav: {
    home: "Home",
    about: "About",
    classes: "Classes",
    yongonlon: "Intercultural Centre",
    productions: "Productions",
    shop: "Shop",
    gallery: "Gallery",
    support: "Support",
    agenda: "Agenda",
    contact: "Contact",
    bookClass: "Book a class",
    tagline: "Art · Creation · Culture · Connection",
  },
  hero: {
    eyebrow: "MOVEMENT · CULTURES · BONDS · TOMORROW",
    title: "Ahmed Soura",
    subtitle: "Dancer · Choreographer · Educator · Founder of Yongonlon",
    quote: "« Dance is a bridge between peoples, a living energy for a more humane world. »",
    quoteAuthor: "Ahmed Soura",
    ctaBook: "Book a class",
    ctaDonate: "Make a donation",
    ctaDiscover: "Discover Yongonlon",
    badgeArtistic: "Dance\nGather\nTransmit",
    cardDialogue: "MORE THAN A DANCE, A DIALOGUE BETWEEN WORLDS",
  },
  about: {
    sectionTag: "JOURNEY & VISION",
    title: "A journey, bridges, encounters",
    bioParagraphs: [
      "Originally from Burkina Faso and based in Berlin, Ahmed Soura articulates a distinctive choreographic language bridging West African traditional dances with international contemporary rigor.",
      "Trained at INAFAC in Burkina Faso and at the Centre Chorégraphique National de Montpellier under Mathilde Monnier, he developed an intense physical vocabulary marked by organic precision, speed, and magnetic presence.",
      "Through KORO company founded in 2007 and the Yongonlon ecosystem, Ahmed Soura creates living conduits between Ouagadougou, Bobo-Dioulasso and European stages, affirming art as a universal space for freedom and shared humanity."
    ],
    trainingTitle: "Excellence in Training",
    trainingItems: [
      "INAFAC (National Institute of Arts and Culture, Burkina Faso)",
      "CCN Montpellier (National Choreographic Centre, direction Mathilde Monnier, France)",
      "Oral transmission with West African master dancers and percussionists"
    ],
    awardsTitle: "Awards & Honors",
    awardsItems: [
      "Second Prize at the Contemporary Dance Contest of Africa & Indian Ocean (2011)",
      "Audience Choice Award at the International Solo-Tanz-Theater Festival Stuttgart (2013)",
      "International acclaim for solos « 166 » and « En opposition avec Moi »"
    ],
    collabTitle: "Major Collaborations",
    collabItems: [
      "Pink Mama Theatre (Switzerland / Germany)",
      "Christoph Winkler Company (Berlin)",
      "Visual artists, musicians and theatre directors in Berlin and West Africa"
    ],
    teachingCurrent: "Regular faculty member at Tanzfabrik Berlin and guest teacher at renowned festivals across Europe and Africa.",
    ctaMore: "Read full biography",
    quoteHandwritten: "Energy beyond borders",
  },
  portals: {
    sectionTag: "YONGONLON WORLDS",
    title: "Our worlds",
    subtitle: "Four portals to explore our artistic, educational and community initiatives.",
    items: [
      {
        id: "centre",
        title: "Centre Interculturel Yongonlon",
        subtitle: "Transmission & residency space",
        description: "A living centre for artistic residencies, community workshops, and intercultural dialogue between Europe and Africa.",
        tag: "Culture & Education",
        linkText: "Explore the Centre",
      },
      {
        id: "production",
        title: "Yongonlon Production",
        subtitle: "Creation & touring bureau",
        description: "Managing international touring, technical production and stage performances for Ahmed Soura and associated creators.",
        tag: "Stage & Touring",
        linkText: "Discover the pieces",
      },
      {
        id: "boutique",
        title: "Boutique Yongonlon",
        subtitle: "Art objects & editions",
        description: "Eco-crafted apparel, unique Power Gig'Art garments, West African bronze art pieces, and dance publications.",
        tag: "Edition & Merch",
        linkText: "Visit the shop",
      },
      {
        id: "ahmed",
        title: "Ahmed Soura",
        subtitle: "The choreographic artist",
        description: "Explore the full journey, the archive of awarded solo pieces, and pedagogical methodologies developed by Ahmed Soura.",
        tag: "Repertoire & Solos",
        linkText: "Read biography",
      },
    ],
  },
  classes: {
    sectionTag: "TRANSMISSION & PRACTICE",
    title: "Classes & Workshops",
    subtitle: "Rigorous and caring learning environments suited for all levels of experience.",
    ctaBook: "Book a class",
    upcomingTitle: "Upcoming Berlin sessions",
    viewAllTitle: "View full schedule",
    items: [
      {
        id: "cours-prives",
        title: "Private Sessions & Tailored Mentorship",
        category: "Individual",
        duration: "60 to 90 min",
        level: "All levels",
        desc: "Personalized studio work focused on body alignment, flow, precision, and preparation for auditions or stage creation.",
        price: "Upon request",
      },
      {
        id: "ateliers-collectifs",
        title: "Regular Group Studios",
        category: "Group",
        duration: "90 min",
        level: "Intermediate / Advanced",
        desc: "Weekly physical training focusing on ensemble awareness, floor work, musicality, and releasing deep physical energy.",
        price: "From 18 €",
      },
      {
        id: "danse-afro-contemporaine",
        title: "Afro-Contemporary Dance",
        category: "Specialty",
        duration: "90 min",
        level: "All levels",
        desc: "Ahmed Soura's hallmark aesthetic: an organic synthesis of West African polyrhythms and contemporary abstraction.",
        price: "From 20 €",
      },
      {
        id: "danses-traditionnelles",
        title: "Traditional Dances of Burkina Faso",
        category: "Tradition & Roots",
        duration: "120 min",
        level: "All levels",
        desc: "Immersive exploration of Burkinabè steps, vocal traditions and polyrhythms accompanied by live percussion.",
        price: "From 25 €",
      },
      {
        id: "coaching-choregraphe",
        title: "Choreographic Coaching for Pro Dancers",
        category: "Professional",
        duration: "Custom",
        level: "Professional",
        desc: "Dramaturgical feedback, body presence refinement, and external guidance for solos or company productions.",
        price: "Custom quote",
      },
      {
        id: "interventions-entreprises",
        title: "Workplace & Institutional Workshops",
        category: "Institutional",
        duration: "Half / Full Day",
        level: "General Public",
        desc: "Workshops centered on non-verbal communication, empathy, stress reduction and somatic awareness through movement.",
        price: "Custom quote",
      },
    ],
    schedule: [
      {
        date: "Wednesday 18:30 - 20:00",
        time: "Weekly",
        title: "Afro-Contemporary Dance (Tanzfabrik)",
        location: "Berlin Kreuzberg",
        spots: "Spots available",
      },
      {
        date: "Friday 19:00 - 21:00",
        time: "Bi-monthly",
        title: "Traditional Burkinabè Dances & Live Percussion",
        location: "Berlin Neukölln",
        spots: "Last spots",
      },
      {
        date: "Saturday 10:00 - 14:00",
        time: "Monthly Workshop",
        title: "Intensive Masterclass « The Energy Body »",
        location: "Yongonlon Berlin Studio",
        spots: "Registration open",
      },
    ],
  },
  gallery: {
    sectionTag: "MOVEMENTS IN FRAMES",
    title: "Gallery & Stage",
    quoteHandwritten: "The body never lies",
    filterAll: "All photographs",
    filterPerformance: "Stage & Performance",
    filterPortrait: "Portraits & Postures",
    filterRehearsal: "Rehearsals & Workshops",
    items: [
      {
        id: "photo-1",
        src: "/images/ahmed-soura-green.jpg",
        title: "Solo on stage — Lime green costume",
        category: "performance",
        credit: "Photo © Jo Grabowski",
        year: "2023",
      },
      {
        id: "photo-2",
        src: "/images/ahmed-soura-performance.jpg",
        title: "Scenic presence and intensity",
        category: "performance",
        credit: "Photo © Jo Grabowski",
        year: "2022",
      },
      {
        id: "photo-3",
        src: "/images/ahmed-soura-arched.jpg",
        title: "Sculptural back arch under spotlight",
        category: "performance",
        credit: "Official Photo",
        year: "2021",
      },
      {
        id: "photo-4",
        src: "/images/ahmed-soura-hooded.jpg",
        title: "Contemporary sculptural posture",
        category: "portrait",
        credit: "Berlin Studio",
        year: "2024",
      },
      {
        id: "photo-5",
        src: "/images/yongonlon-logo.jpg",
        title: "YONGONLON Graphic Identity",
        category: "portrait",
        credit: "Yongonlon Archives",
        year: "2024",
      },
    ],
  },
  shop: {
    sectionTag: "COMMUNITY SHOP",
    title: "Boutique Yongonlon",
    subtitle: "Every purchase directly supports artistic creations, workshops and dancer scholarship programs.",
    ctaViewCatalog: "Explore the shop",
    addToCart: "Add to cart",
    items: boutiqueProductsEn.slice(0, 4),
  },
  donation: {
    sectionTag: "ENGAGEMENT & SOLIDARITY",
    title: "Support Yongonlon",
    subtitle: "Your donation empowers young African dancers with top-level education and fosters intercultural dialogue.",
    description: "Yongonlon Intercultural Centre works daily to create meaningful opportunities for empowerment through the arts across continents.",
    frequencyOnce: "One-time donation",
    frequencyMonthly: "Monthly support",
    customAmountPlaceholder: "Custom amount (€)",
    ctaDonate: "Donate now",
    secureNotice: "100% Secure payment (Stripe & PayPal) · Official receipt issued automatically",
    quoteHandwritten: "Every gesture builds a bridge",
  },
  contact: {
    sectionTag: "ENCOUNTER & DIALOGUE",
    title: "Let's create together",
    subtitle: "For inquiries regarding classes, stage bookings, artistic collaborations, or general information.",
    berlinLabel: "Based in Berlin & Ouagadougou",
    generalEmailLabel: "General contact:",
    bookingEmailLabel: "Touring & Bookings:",
    phoneLabel: "WhatsApp & Coordination: +49 163 717 36 62",
    form: {
      name: "Your full name",
      namePlaceholder: "e.g. Aminata Diallo",
      email: "Your email address",
      emailPlaceholder: "e.g. aminata@domain.com",
      category: "Purpose of your message",
      categories: [
        { value: "cours", label: "Class or workshop registration" },
        { value: "spectacle", label: "Performance booking & touring" },
        { value: "collaboration", label: "Artistic or educational collaboration" },
        { value: "presse", label: "Press, media & interviews" },
        { value: "autre", label: "Other inquiry" },
      ],
      message: "Your message",
      messagePlaceholder: "Describe your inquiry, dates, or collaboration ideas...",
      consent: "I agree that my personal data will be processed to answer this inquiry in accordance with the privacy policy.",
      submit: "Send message",
      submitting: "Sending...",
      success: "Thank you! Your message has been successfully received. We will respond promptly.",
    },
  },
  ahmedPage: {
    heroTitle: "Ahmed Soura",
    heroSubtitle: "Dancer · Choreographer · Educator · Artistic Director",
    statement: "« To dance is to dialogue with what transcends us. It is turning history, sorrow, and joy into a collective breath. »",
    biographyTitle: "A Journey Between West Africa and Europe",
    biographyFull: [
      "Born in Burkina Faso, Ahmed Soura grew up immersed in the rituals and traditional dances that anchor the communal life of his culture. Quickly recognized for his physical agility and dramatic expressivity, he attended INAFAC (National Institute for Arts and Culture) in Ouagadougou, acquiring rigorous training in stage performance and ancestral repertoires.",
      "His journey expanded internationally upon entering the Centre Chorégraphique National de Montpellier under Mathilde Monnier. This world-class training exposed him to European avant-garde choreographic thought and refined his signature style: an athletic, intensely focused body oscillating between ritual speed and contemplative sculptural stillness.",
      "In 2007, he founded KORO company in Burkina Faso, establishing an incubator for research and professional training for African dancers. Having settled in Berlin, he has developed major partnerships with prominent European companies (Pink Mama Theatre, Christoph Winkler) while consistently teaching at Tanzfabrik Berlin.",
      "Today, guiding the Yongonlon ecosystem, Ahmed Soura pursues an engaged vision where every stage piece, masterclass, or handcrafted art piece serves one universal purpose: transforming dance into a living bridge between continents."
    ],
    solosTitle: "Award-Winning Solo Repertoire",
    solosSubtitle: "Key solo creations celebrated by international critics and staged across premier theatres.",
    solos: [
      {
        id: "solo-166",
        title: "Solo 166",
        year: "2013",
        award: "Audience Choice Award at Stuttgart International Solo-Tanz-Theater (2013)",
        duration: "35 minutes",
        synopsis: "In « 166 », Ahmed Soura examines the physical memory of displaced bodies, sheer physical exertion, and the search for identity across borders. Under minimalist lighting, every movement turns into a visceral prayer against erasure.",
        credits: "Choreography & performance: Ahmed Soura · Lighting: Boris Kahnert · Music: Mandinka repertoire & electroacoustic sound design",
      },
      {
        id: "opposition",
        title: "En opposition avec Moi",
        year: "2011",
        award: "2nd Prize at African Contemporary Dance Contest (2011)",
        duration: "40 minutes",
        synopsis: "An incisive piece exploring internal duality, the weight of exile, and the tension between heritage traditions and the drive for individual freedom. A physically stunning performance staged across three continents.",
        credits: "Concept & performance: Ahmed Soura · Sound design: Contemporary West African mix · Production: KORO",
      },
    ],
    collabTitle: "Collaborations & International Reach",
    collabSubtitle: "A continuous presence across European, African, and international festivals.",
    teachingTitle: "The Pedagogy of Movement: Tanzfabrik Berlin & Worldwide",
    teachingText: "Celebrated for both generosity and demanding precision, Ahmed Soura leads regular classes and intensive masterclasses at Tanzfabrik Berlin. His signature method, « The Energy Body », blends ground rooting, breath awareness, West African polyrhythm and contemporary improvisation.",
  },
  centrePage: {
    heroTitle: "Centre Interculturel Yongonlon",
    heroSubtitle: "A living bridge of art, transmission and solidarity between Berlin and Burkina Faso",
    missionTitle: "Our Vision & Manifesto",
    missionText: "Founded by Ahmed Soura, Yongonlon Intercultural Centre is an independent cultural hub dedicated to artistic exchange, professional dancer education, and community hospitality. Believing that art is a vital engine for human dignity and empowerment, the Centre weaves West African ancestral wisdom with contemporary experimentation.",
    pillarsTitle: "The 4 Core Pillars of Action",
    pillars: [
      {
        title: "1. Scholarships & Professional Dancer Education",
        desc: "Supporting emerging dancers in Burkina Faso through comprehensive scholarships, masterclasses, and international mentorship to reach global stages.",
      },
      {
        title: "2. Reciprocal Artist Residencies",
        desc: "Offering dedicated research spaces in Ouagadougou and Berlin for Burkinabè, German, and international creators to co-develop boundary-pushing projects.",
      },
      {
        title: "3. Community Studios & Inclusive Practice",
        desc: "Democratizing dance across communities: open community sessions, youth outreach, school partnerships, and cultural mediation across Berlin and Ouagadougou.",
      },
      {
        title: "4. Fair Economy & Ancestral Craft Preservation",
        desc: "Supporting master bronze casters and handloom weavers in Burkina Faso through ethical distribution of artworks in the Yongonlon Shop.",
      },
    ],
    communityTitle: "A Community Open to the World",
    communityText: "Yongonlon Intercultural Centre is not a static institution: it is an organic ecosystem powered by artists, teachers, volunteers, and committed international supporters.",
    ctaSupport: "Support the Centre's programs",
  },
  productionPage: {
    heroTitle: "Yongonlon Production",
    heroSubtitle: "Choreographic production bureau & international touring agency",
    introText: "Yongonlon Production oversees artistic development, technical rider design, tour management, and international distribution for Ahmed Soura's creations and KORO company projects.",
    piecesTitle: "Touring Catalog & Repertoire Pieces",
    pieces: [
      {
        id: "solo-166-prod",
        title: "Solo 166",
        type: "Contemporary Solo",
        year: "2013 — On Tour",
        duration: "35 min",
        credits: "Choreography & performance: Ahmed Soura",
        description: "Intense physical meditation on freedom and exile. Highly adaptable technical rider suitable for theatres, art galleries, and non-conventional spaces.",
        status: "Available on tour 2026/2027",
      },
      {
        id: "en-opposition-prod",
        title: "En opposition avec Moi",
        type: "Solo Choreography",
        year: "2011 — On Tour",
        duration: "40 min",
        credits: "Choreography & performance: Ahmed Soura",
        description: "Award-winning piece exploring internal memory conflicts. Toured extensively in Europe, West Africa, and South America.",
        status: "Available on tour",
      },
      {
        id: "creation-nouvelle-prod",
        title: "Crossings (Ensemble Creation in Development)",
        type: "Work for 5 dancers",
        year: "2026 / 2027",
        duration: "65 min",
        credits: "Artistic Direction: Ahmed Soura · Yongonlon Production & International Coproducers",
        description: "Ensemble creation gathering dancers from Burkina Faso and Berlin examining migrant memory and shared hope.",
        status: "In creative residency / Open for coproduction",
      },
    ],
    proTitle: "Presenters & Festival Directors Hub",
    proText: "Are you a theatre director, festival curator, or choreographic programmer? Access artistic dossiers, technical riders, and touring conditions.",
    ctaBooking: "Contact the touring office",
    ctaTechRider: "Request complete technical rider",
  },
  agendaPage: {
    heroTitle: "Public Agenda",
    heroSubtitle: "Upcoming performances, masterclasses, weekly studios and Yongonlon community events in Berlin and on tour.",
    filters: {
      all: "All events",
      courses: "Weekly classes",
      performances: "Stage & Solos",
      workshops: "Intensive workshops",
      yongonlon: "Yongonlon gatherings",
    },
    events: [
      {
        id: "evt-1",
        title: "Afro-Contemporary Dance · Weekly Session",
        category: "courses",
        date: "Every Wednesday",
        time: "18:30 - 20:00",
        location: "Tanzfabrik Berlin (Möckernstraße 68)",
        city: "Berlin Kreuzberg",
        description: "Dynamic somatic training combining traditional Mandinka roots and contemporary fluidity. Open to all levels.",
        status: "open",
        linkText: "Book this class",
      },
      {
        id: "evt-2",
        title: "Performance: « Solo 166 » by Ahmed Soura",
        category: "performances",
        date: "October 24, 2026",
        time: "20:00",
        location: "Theaterhaus Berlin Mitte",
        city: "Berlin",
        description: "Special staging of the award-winning solo followed by an audience Q&A with the artistic team.",
        status: "open",
        linkText: "Festival box office",
      },
      {
        id: "evt-3",
        title: "Intensive Masterclass « The Energy Body » (Weekend)",
        category: "workshops",
        date: "November 7 - 8, 2026",
        time: "10:00 - 15:00",
        location: "Yongonlon Studio Berlin",
        city: "Berlin Neukölln",
        description: "Two-day technical immersion for intermediate and advanced dancers: polyrhythm, spinal flow, and dramaturgical improvisation.",
        status: "last_spots",
        linkText: "Register for Masterclass",
      },
      {
        id: "evt-4",
        title: "Discussion & Round Table: Dance & Intercultural Resilience",
        category: "yongonlon",
        date: "November 20, 2026",
        time: "19:00",
        location: "Centre Interculturel Yongonlon",
        city: "Berlin",
        description: "Bilingual discussion, screening of video excerpts from Ouagadougou workshops, and impromptu resident artist performances.",
        status: "open",
        linkText: "Free entry upon reservation",
      },
      {
        id: "evt-5",
        title: "Heritage Workshop: Burkinabè Traditional Dances & Live Drums",
        category: "workshops",
        date: "December 5, 2026",
        time: "14:00 - 17:30",
        location: "Dock 11 Studios",
        city: "Berlin Prenzlauer Berg",
        description: "Practical workshop with live master percussionists: learning the ceremonial and festive movements of Burkinabè traditions.",
        status: "open",
        linkText: "Reserve my spot",
      },
    ],
  },
  bookingPage: {
    heroTitle: "Class & Workshop Booking",
    heroSubtitle: "Book your dance session with Ahmed Soura: private training, regular class or intensive weekend workshop.",
    steps: {
      service: "1. Discipline selection",
      datetime: "2. Date & Time slot",
      info: "3. Contact details",
      message: "4. Level & Goals",
      summary: "5. Review summary",
      confirmation: "6. Instant confirmation",
    },
  },
  shopPage: {
    heroTitle: "Boutique Yongonlon",
    heroSubtitle: "Ethical textile creations, Power Gig'Art contemporary art line, West African bronze crafts and publications.",
    tagline: "A solidarity purchase in support of choreographic creation and human empowerment through the arts.",
    filters: {
      all: "All items",
      tshirts: "T-shirts",
      casquettes: "Caps",
    },
    filterAllLabel: "All",
    inStockLabel: "In stock",
    selectVariant: "Select an option:",
    selectSize: "Size:",
    selectColor: "Color:",
    addToCart: "Add to cart",
    addedToCart: "Item added to cart!",
    quickView: "Quick view",
    closeQuickView: "Close",
    freeShippingNotice: "Free shipping across Germany and Europe on orders over 80 €.",
    ethicalCommitmentTitle: "Our Ethical Promise",
    ethicalCommitmentDesc: "Every piece is crafted in fair collaboration with artisans in Ouagadougou and Bobo-Dioulasso or screenprinted on certified eco-friendly textiles in Berlin. 100% of proceeds fund Yongonlon dance scholarships.",
    products: boutiqueProductsEn,
  },
  donationPage: {
    heroTitle: "Support Yongonlon",
    heroSubtitle: "Sustain a vibrant bridge of artistic expression and human solidarity between Europe and West Africa.",
    statement: "« Every gift enables a young talent to study, a dance piece to tour, and communities to unite through movement. »",
    pillarsTitle: "The Tangible Impact of Your Giving",
    pillarsSubtitle: "Full transparency regarding every euro invested in our cultural programs.",
    pillars: [
      {
        title: "Burkina Faso Dance Scholarships",
        desc: "Full coverage of tuition, meals, and transport for underprivileged emerging dancers in Ouagadougou and Bobo-Dioulasso.",
        impact: "50 € = 1 month of full professional dance training for a young talent."
      },
      {
        title: "Open Community Studios in Berlin",
        desc: "Hosting weekly solidarity-rate studios for refugees, families, and neighborhood youth in Berlin.",
        impact: "100 € = Full funding for an open studio with guest master percussionist."
      },
      {
        title: "International Creative Residencies",
        desc: "Providing research space, mobility stipends, and European networking for Burkinabè choreographers.",
        impact: "250 € = Residency accommodation stipend for an emerging choreographer."
      }
    ],
    formTitle: "Make a Donation Online",
    frequencyLabel: "Donation frequency:",
    frequencyOnce: "One-time donation",
    frequencyMonthly: "Monthly recurring gift",
    amountLabel: "Select an amount:",
    customAmountLabel: "Or enter a custom amount:",
    customAmountPlaceholder: "Custom amount in €",
    taxDeductionTitle: "Tax Deductibility & Receipts",
    taxDeductionDesc: "In Germany, donations are tax-deductible under § 10b EStG (official Spendenbescheinigung issued automatically). In France, gifts qualify for a 66% tax reduction (a 100 € donation actually costs you only 34 €).",
    donorDetailsTitle: "Donor Details for Tax Receipt",
    firstNameLabel: "First Name",
    lastNameLabel: "Last Name",
    emailLabel: "Email Address (for receipt)",
    addressLabel: "Mailing Address",
    cityLabel: "City",
    postalCodeLabel: "Postal Code",
    countryLabel: "Country of Residence",
    paymentMethodLabel: "Secure payment method:",
    paymentCard: "Credit Card (Secure Stripe)",
    paymentPaypal: "PayPal Express",
    paymentSepa: "SEPA Direct Debit",
    paymentBankTransfer: "Direct Bank Wire Transfer",
    bankDetailsTitle: "Official Association Bank Coordinates",
    bankAccountOwner: "Account Holder: YONGONLON Interkulturelles Zentrum e.V.",
    bankIban: "IBAN: DE89 1001 0010 1234 5678 90 (Demo)",
    bankBic: "BIC / SWIFT: PBNKDEFFXXX",
    bankReference: "Mandatory Reference: DON-YON-2026 + Your Name",
    submitButtonOnce: "Confirm my one-time gift of",
    submitButtonMonthly: "Activate my monthly support of",
    receiptTitle: "Official Tax Receipt Issued",
    receiptNotice: "Your formal PDF receipt is instantly available for download upon donation confirmation.",
    downloadReceipt: "Download my Donation Receipt (PDF)",
    quoteTitle: "A Shared Commitment",
    quoteText: "« When we dance together, there are no strangers — only human beings breathing as one. »",
    quoteAuthor: "Ahmed Soura",
  },
  cart: {
    drawerTitle: "My Shopping Cart",
    emptyTitle: "Your cart is empty",
    emptySubtitle: "Explore our eco-friendly apparel, archival art prints and the exclusive Power Gig'Art line.",
    continueShopping: "Continue shopping",
    itemSingular: "item",
    itemPlural: "items",
    subtotal: "Subtotal:",
    shippingEstimate: "Estimated shipping:",
    shippingFree: "Free",
    freeShippingProgress: "Add {amount} € more to unlock free shipping!",
    freeShippingReached: "Congratulations! You qualify for free shipping.",
    checkoutButton: "Proceed to Secure Checkout",
    checkoutModalTitle: "Secure Checkout Portal",
    checkoutNotice: "PCI-DSS compliant payment processing (Stripe & PayPal). Your payment details are strictly encrypted.",
    orderSummary: "Order summary",
    fullName: "Full Name",
    shippingAddress: "Full Shipping Address",
    completeOrder: "Place Order",
    orderSuccessTitle: "Order confirmed successfully!",
    orderSuccessSubtitle: "Thank you for your solidarity purchase. A detailed confirmation email has been dispatched.",
    orderRefLabel: "Order Reference:",
    closeCart: "Close cart",
  },
  cookies: {
    title: "Cookie Preferences & Privacy Settings",
    message: "We use essential cookies for technical website operations, as well as optional trackers to aggregate anonymous traffic analytics and display hosted stage dance videos (YouTube / Vimeo). You can modify or withdraw your consent anytime.",
    acceptAll: "Accept All",
    rejectNonEssential: "Continue Without Accepting",
    customize: "Customize Settings",
    savePreferences: "Save My Preferences",
    necessary: "Technically Essential Cookies (Required)",
    necessaryDesc: "Mandatory to remember your language, cart items, and secure your browsing session.",
    analytics: "Anonymous Audience Analytics",
    analyticsDesc: "Aggregated metrics to optimize user experience and platform responsiveness.",
    media: "External Video Embeds",
    mediaDesc: "Enable direct playback of choreographic stage excerpts hosted on Vimeo / YouTube.",
  },
  impressum: {
    title: "Legal Notice (Impressum)",
    subtitle: "Mandatory disclosures pursuant to § 5 of the German Digital Services Act (Digitale-Dienste-Gesetz - DDG) and § 18 MStV.",
    lastUpdated: "Last updated: 2026",
    sections: [
      {
        title: "1. Service Provider & Operator",
        content: [
          "YONGONLON — Art, Body & Culture (Intercultural Initiative)",
          "Legally represented by: Ahmed Soura",
          "Headquarters: Berlin, Germany / Ouagadougou, Burkina Faso",
          "Contact Email: contact@ahmedsoura-yongonlon.com",
          "Telephone: +49 163 717 36 62"
        ]
      },
      {
        title: "2. Responsible for Editorial Content",
        content: [
          "Pursuant to § 18 para. 2 State Media Treaty (MStV):",
          "Ahmed Soura",
          "Artistic & Choreographic Direction",
          "Berlin, Germany"
        ]
      },
      {
        title: "3. Intellectual Property & Copyright",
        content: [
          "All contents, photographs, choreographic notation, videos, texts, and graphics published on this website are protected by German and international copyright law.",
          "Any reproduction, modification or commercial distribution without prior written consent from Ahmed Soura or Yongonlon is strictly prohibited.",
          "Photography credits: © Jo Grabowski, © Atelier Yongonlon, all rights reserved."
        ]
      },
      {
        title: "4. Online Dispute Resolution (ODR)",
        content: [
          "The European Commission provides an online dispute resolution platform: https://ec.europa.eu/consumers/odr.",
          "We are neither obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board."
        ]
      }
    ]
  },
  datenschutz: {
    title: "Privacy Policy (Datenschutzerklärung)",
    subtitle: "Processing of your personal data pursuant to the General Data Protection Regulation (GDPR / DSGVO).",
    lastUpdated: "Last updated: 2026",
    sections: [
      {
        title: "1. Data Controller",
        content: [
          "The controller responsible for data processing on this website under GDPR is:",
          "Ahmed Soura / YONGONLON",
          "Email: privacy@ahmedsoura-yongonlon.com",
          "We handle your personal data confidentially and strictly in compliance with statutory data privacy regulations."
        ]
      },
      {
        title: "2. Data Collection on Our Platform",
        content: [
          "Contact Form: Details provided (name, email, message) are processed solely to address your specific inquiry. Data is never disclosed to unauthorized third parties.",
          "Class Bookings & Shop Orders: Collected data is necessary for contractual fulfillment regarding dance workshops or product shipping (Art. 6 para. 1 lit. b GDPR).",
          "Donations: Donor billing details are required to issue valid official tax exemption receipts."
        ]
      },
      {
        title: "3. Secure Payment Processing (Stripe & PayPal)",
        content: [
          "For shop transactions and online donations, we collaborate with certified payment service providers (Stripe Payments Europe Ltd. and PayPal Europe S.à r.l.).",
          "No complete card numbers or CVV codes ever transit through or reside on our servers. Processing occurs via direct SSL/TLS encrypted gateways."
        ]
      },
      {
        title: "4. Your Statutory Rights (Access, Rectification, Erasure)",
        content: [
          "Under GDPR, you retain the right at any time to receive free disclosure of your stored personal data, its origin and purpose, and to request rectification or erasure.",
          "To exercise your privacy rights, contact us directly at privacy@ahmedsoura-yongonlon.com."
        ]
      }
    ]
  },
  footer: {
    quote: "« Dance is living memory, a rhythmic beat connecting generations. »",
    quoteAuthor: "Ahmed Soura",
    allRightsReserved: "All rights reserved. Design & Artistic Direction Ahmed Soura × Yongonlon.",
    impressum: "Impressum",
    privacy: "Privacy & GDPR",
    cookies: "Cookie Settings",
  },
};

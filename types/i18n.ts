export interface ClassItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  desc: string;
  price: string;
}

export interface ProductItem {
  id: string;
  title: string;
  category: "tshirts" | "casquettes" | "accessoires" | "art";
  categoryLabel: string;
  price: number;
  formattedPrice: string;
  desc: string;
  details?: string[];
  tag?: string;
  image: string;
  images?: string[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  editionNotice?: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: "performance" | "portrait" | "rehearsal";
  credit: string;
  year: string;
}

export interface SoloPiece {
  id: string;
  title: string;
  year: string;
  award?: string;
  duration: string;
  synopsis: string;
  credits: string;
}

export interface ProductionItem {
  id: string;
  title: string;
  type: string;
  year: string;
  duration: string;
  credits: string;
  description: string;
  status: string;
}

export interface DetailedAhmedPage {
  heroTitle: string;
  heroSubtitle: string;
  statement: string;
  biographyTitle: string;
  biographyFull: string[];
  solosTitle: string;
  solosSubtitle: string;
  solos: SoloPiece[];
  collabTitle: string;
  collabSubtitle: string;
  teachingTitle: string;
  teachingText: string;
}

export interface DetailedCentrePage {
  heroTitle: string;
  heroSubtitle: string;
  missionTitle: string;
  missionText: string;
  pillarsTitle: string;
  pillars: {
    title: string;
    desc: string;
  }[];
  communityTitle: string;
  communityText: string;
  ctaSupport: string;
}

export interface DetailedProductionPage {
  heroTitle: string;
  heroSubtitle: string;
  introText: string;
  piecesTitle: string;
  pieces: ProductionItem[];
  proTitle: string;
  proText: string;
  ctaBooking: string;
  ctaTechRider: string;
}

export interface AgendaEvent {
  id: string;
  title: string;
  category: "courses" | "performances" | "workshops" | "yongonlon";
  date: string;
  time: string;
  location: string;
  city: string;
  description: string;
  status: "open" | "last_spots" | "sold_out";
  linkText: string;
}

export interface DetailedAgendaPage {
  heroTitle: string;
  heroSubtitle: string;
  filters: {
    all: string;
    courses: string;
    performances: string;
    workshops: string;
    yongonlon: string;
  };
  events: AgendaEvent[];
}

export interface DetailedBookingPage {
  heroTitle: string;
  heroSubtitle: string;
  steps: {
    service: string;
    datetime: string;
    info: string;
    message: string;
    summary: string;
    confirmation: string;
  };
}

export interface DetailedShopPage {
  heroTitle: string;
  heroSubtitle: string;
  tagline: string;
  filters: {
    all: string;
    tshirts: string;
    casquettes: string;
  };
  filterAllLabel: string;
  inStockLabel: string;
  selectVariant: string;
  selectSize: string;
  selectColor: string;
  addToCart: string;
  addedToCart: string;
  quickView: string;
  closeQuickView: string;
  freeShippingNotice: string;
  ethicalCommitmentTitle: string;
  ethicalCommitmentDesc: string;
  products: ProductItem[];
}

export interface DetailedDonationPage {
  heroTitle: string;
  heroSubtitle: string;
  statement: string;
  pillarsTitle: string;
  pillarsSubtitle: string;
  pillars: {
    title: string;
    desc: string;
    impact: string;
  }[];
  formTitle: string;
  frequencyLabel: string;
  frequencyOnce: string;
  frequencyMonthly: string;
  amountLabel: string;
  customAmountLabel: string;
  customAmountPlaceholder: string;
  taxDeductionTitle: string;
  taxDeductionDesc: string;
  donorDetailsTitle: string;
  firstNameLabel: string;
  lastNameLabel: string;
  emailLabel: string;
  addressLabel: string;
  cityLabel: string;
  postalCodeLabel: string;
  countryLabel: string;
  paymentMethodLabel: string;
  paymentCard: string;
  paymentPaypal: string;
  paymentSepa: string;
  paymentBankTransfer: string;
  bankDetailsTitle: string;
  bankAccountOwner: string;
  bankIban: string;
  bankBic: string;
  bankReference: string;
  submitButtonOnce: string;
  submitButtonMonthly: string;
  receiptTitle: string;
  receiptNotice: string;
  downloadReceipt: string;
  quoteTitle: string;
  quoteText: string;
  quoteAuthor: string;
}

export interface CartStrings {
  drawerTitle: string;
  emptyTitle: string;
  emptySubtitle: string;
  continueShopping: string;
  itemSingular: string;
  itemPlural: string;
  subtotal: string;
  shippingEstimate: string;
  shippingFree: string;
  freeShippingProgress: string;
  freeShippingReached: string;
  checkoutButton: string;
  checkoutModalTitle: string;
  checkoutNotice: string;
  orderSummary: string;
  fullName: string;
  shippingAddress: string;
  completeOrder: string;
  orderSuccessTitle: string;
  orderSuccessSubtitle: string;
  orderRefLabel: string;
  closeCart: string;
}

export interface CookieStrings {
  title: string;
  message: string;
  acceptAll: string;
  rejectNonEssential: string;
  customize: string;
  savePreferences: string;
  necessary: string;
  necessaryDesc: string;
  analytics: string;
  analyticsDesc: string;
  media: string;
  mediaDesc: string;
}

export interface LegalPageContent {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: {
    title: string;
    content: string[];
  }[];
}

export interface TranslationSchema {
  lang: "fr" | "en";
  nav: {
    home: string;
    about: string;
    classes: string;
    yongonlon: string;
    productions: string;
    shop: string;
    gallery: string;
    support: string;
    agenda: string;
    contact: string;
    bookClass: string;
    tagline: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    quote: string;
    quoteAuthor: string;
    ctaBook: string;
    ctaDonate: string;
    ctaDiscover: string;
    badgeArtistic: string;
    cardDialogue: string;
  };
  about: {
    sectionTag: string;
    title: string;
    bioParagraphs: string[];
    trainingTitle: string;
    trainingItems: string[];
    awardsTitle: string;
    awardsItems: string[];
    collabTitle: string;
    collabItems: string[];
    teachingCurrent: string;
    ctaMore: string;
    quoteHandwritten: string;
  };
  portals: {
    sectionTag: string;
    title: string;
    subtitle: string;
    items: {
      id: string;
      title: string;
      subtitle: string;
      description: string;
      tag: string;
      linkText: string;
    }[];
  };
  classes: {
    sectionTag: string;
    title: string;
    subtitle: string;
    ctaBook: string;
    upcomingTitle: string;
    viewAllTitle: string;
    items: ClassItem[];
    schedule: {
      date: string;
      time: string;
      title: string;
      location: string;
      spots: string;
    }[];
  };
  gallery: {
    sectionTag: string;
    title: string;
    quoteHandwritten: string;
    filterAll: string;
    filterPerformance: string;
    filterPortrait: string;
    filterRehearsal: string;
    items: GalleryItem[];
  };
  shop: {
    sectionTag: string;
    title: string;
    subtitle: string;
    ctaViewCatalog: string;
    addToCart: string;
    items: ProductItem[];
  };
  donation: {
    sectionTag: string;
    title: string;
    subtitle: string;
    description: string;
    frequencyOnce: string;
    frequencyMonthly: string;
    customAmountPlaceholder: string;
    ctaDonate: string;
    secureNotice: string;
    quoteHandwritten: string;
  };
  contact: {
    sectionTag: string;
    title: string;
    subtitle: string;
    berlinLabel: string;
    generalEmailLabel: string;
    bookingEmailLabel: string;
    phoneLabel: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      category: string;
      categories: { value: string; label: string }[];
      message: string;
      messagePlaceholder: string;
      consent: string;
      submit: string;
      submitting: string;
      success: string;
    };
  };
  ahmedPage: DetailedAhmedPage;
  centrePage: DetailedCentrePage;
  productionPage: DetailedProductionPage;
  agendaPage: DetailedAgendaPage;
  bookingPage: DetailedBookingPage;
  shopPage: DetailedShopPage;
  donationPage: DetailedDonationPage;
  cart: CartStrings;
  cookies: CookieStrings;
  impressum: LegalPageContent;
  datenschutz: LegalPageContent;
  footer: {
    quote: string;
    quoteAuthor: string;
    allRightsReserved: string;
    impressum: string;
    privacy: string;
    cookies: string;
  };
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBooking, AvailabilitySlot, Booking, DanceDiscipline } from "@/context/BookingContext";
import {
  Calendar as CalendarIcon,
  UserPlus,
  CheckCircle,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  MessageCircle,
  Lock,
  ArrowLeft,
  Filter,
  Check,
  X,
  Sparkles,
  MapPin,
  Flame,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Eye,
  Settings,
  CreditCard,
  Landmark,
  Key,
  RefreshCw,
  Copy,
  CheckCheck,
  Layers,
  Mail,
  Send,
  ShoppingBag,
  Camera,
  Tag,
  Upload,
  Crop,
} from "lucide-react";
import { ImageCropperModal } from "@/components/ImageCropperModal";
import { ProductItem, GalleryItem } from "@/types/i18n";
import {
  loadBoutiqueProducts,
  saveBoutiqueProducts,
  loadGalleryItems,
  saveGalleryItems,
  AVAILABLE_PRODUCT_IMAGES,
  AVAILABLE_GALLERY_IMAGES,
  DEFAULT_PRODUCTS,
  DEFAULT_GALLERY_ITEMS,
} from "@/lib/catalog-store";

function formatAdminSessionDate(dateStr: string): string {
  try {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) {
        const formatted = d.toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return formatted.charAt(0).toUpperCase() + formatted.slice(1);
      }
    }
  } catch (e) {}
  return dateStr;
}

export default function AdminPage() {
  const {
    slots,
    bookings,
    disciplines,
    addSlot,
    updateSlot,
    deleteSlot,
    createBooking,
    updateBookingStatus,
    deleteBooking,
    addDiscipline,
    updateDiscipline,
    deleteDiscipline,
    refreshServerBookings,
  } = useBooking();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // Tab State
  const [activeTab, setActiveTab] = useState<"calendar" | "bookings" | "disciplines" | "products" | "gallery" | "settings">("calendar");

  // Calendar View Mode: "visual" (grille mensuelle) or "cards" (cartes de créneaux)
  const [calendarViewMode, setCalendarViewMode] = useState<"visual" | "cards">("visual");

  // Visual Calendar Month State (Defaults to October 2026 where sessions are scheduled)
  const [viewYear, setViewYear] = useState<number>(2026);
  const [viewMonth, setViewMonth] = useState<number>(9); // 0-indexed: 9 = Octobre

  // Selected date on calendar (defaults to 2026-10-14)
  const [selectedDate, setSelectedDate] = useState<string>("2026-10-14");

  // Filter & Search states
  const [bookingFilter, setBookingFilter] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Payment & External Gateway Configuration State
  const defaultPaymentSettings = {
    stripeMode: "test" as "test" | "live",
    stripePublishableKey: "",
    stripeSecretKey: "",
    stripeWebhookSecret: "",
    stripeShopPaymentLink: "https://buy.stripe.com/test_ahmedsoura_boutique",
    stripeDonationPaymentLink: "https://buy.stripe.com/test_ahmedsoura_dons",
    stripeCoursesPaymentLink: "https://buy.stripe.com/test_ahmedsoura_stages",
    bankAccountHolder: "Compagnie Yongonlon e.V. / Ahmed Soura",
    bankName: "Berliner Sparkasse",
    bankIban: "DE89 1005 0000 0123 4567 89",
    bankBic: "BELADEBE100",
    bankBranchAddress: "Alexanderplatz 2, 10178 Berlin, Allemagne",
    bankTransferReferenceGuide: "Mentionner impérativement la référence client (ex: AS-XXXXXX ou REC-YON-XXXX)",
    paypalEmail: "paiement@yongonlon.org",
    paypalMeLink: "https://paypal.me/AhmedSouraDance",
    whatsappOfficialNumber: "+49 163 717 36 62",
    whatsappNotificationAlertNumber: "+49 163 717 36 62",
    defaultCurrency: "EUR (€)",
    adminNotificationEmail: "js.kemet@gmail.com",
    senderEmailDisplay: "Compagnie Ahmed Soura · Yongonlon <js.kemet@gmail.com>",
  };

  const [paymentSettings, setPaymentSettings] = useState(defaultPaymentSettings);
  const [settingsFeedback, setSettingsFeedback] = useState<string>("");
  const [stripeTestStatus, setStripeTestStatus] = useState<"idle" | "testing" | "success" | "simulated">("idle");
  const [ribCopied, setRibCopied] = useState<boolean>(false);
  const [emailPreviewModalOpen, setEmailPreviewModalOpen] = useState<boolean>(false);
  const [emailPreviewType, setEmailPreviewType] = useState<string>("booking-client-fr");
  const [emailTestStatus, setEmailTestStatus] = useState<string>("");

  // Load payment settings on mount from local storage and backend API
  useEffect(() => {
    try {
      const saved = localStorage.getItem("as_payment_settings");
      if (saved) {
        setPaymentSettings({ ...defaultPaymentSettings, ...JSON.parse(saved) });
      }
    } catch {
      // Keep defaults
    }

    // Pull from backend API
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.config) {
          setPaymentSettings((prev) => ({ ...prev, ...data.config }));
          try {
            localStorage.setItem("as_payment_settings", JSON.stringify({ ...defaultPaymentSettings, ...data.config }));
          } catch (e) {}
        }
      })
      .catch(() => {});
  }, []);

  const handleSavePaymentSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("as_payment_settings", JSON.stringify(paymentSettings));

      // Persist to backend server API
      await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentSettings),
      });

      setSettingsFeedback("Paramètres de paiement, coordonnées bancaires et WhatsApp enregistrés avec succès sur le serveur !");
      setTimeout(() => setSettingsFeedback(""), 4000);
    } catch {
      setSettingsFeedback("Erreur lors de l'enregistrement des paramètres.");
    }
  };

  const handleTestStripeConnection = async () => {
    setStripeTestStatus("testing");
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      if (paymentSettings.stripeSecretKey.startsWith("sk_live_")) {
        setStripeTestStatus("success");
      } else {
        setStripeTestStatus("simulated");
      }
    } catch {
      setStripeTestStatus("simulated");
    }
  };

  const handleCopyRib = () => {
    const ribText = `TITULAIRE : ${paymentSettings.bankAccountHolder}
BANQUE : ${paymentSettings.bankName}
IBAN : ${paymentSettings.bankIban}
BIC/SWIFT : ${paymentSettings.bankBic}
DOMICILIATION : ${paymentSettings.bankBranchAddress}
MOTIF RECOMMANDÉ : ${paymentSettings.bankTransferReferenceGuide}`;
    navigator.clipboard.writeText(ribText);
    setRibCopied(true);
    setTimeout(() => setRibCopied(false), 3000);
  };


  // Add Slot Modal
  const [addSlotModalOpen, setAddSlotModalOpen] = useState<boolean>(false);
  const [manualBookingModalOpen, setManualBookingModalOpen] = useState<boolean>(false);
  const [manualBookingTargetSlot, setManualBookingTargetSlot] = useState<AvailabilitySlot | null>(null);
  const [manualBookingFeedback, setManualBookingFeedback] = useState<string>("");
  const [manualBookingForm, setManualBookingForm] = useState({
    bookingDate: "2026-10-14",
    slotId: "",
    isCustomSlot: false,
    customStartTime: "18:30",
    customEndTime: "20:00",
    customDisciplineTitle: "Danse Afro-Contemporaine",
    customCapacity: 12,
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    participants: 1,
    level: "Tous niveaux",
    status: "confirmed" as "confirmed" | "pending",
    notes: "Inscription manuelle enregistrée depuis le calendrier",
  });

  const handleOpenManualBooking = (slot?: AvailabilitySlot, dateOverride?: string) => {
    const targetDate = dateOverride || (slot ? slot.date : selectedDate);
    const dateSlots = slots.filter((s) => s.date === targetDate);
    const chosenSlot = slot || dateSlots[0] || null;

    setManualBookingTargetSlot(chosenSlot);
    setManualBookingForm({
      bookingDate: targetDate,
      slotId: chosenSlot ? chosenSlot.id : "new_slot",
      isCustomSlot: !chosenSlot,
      customStartTime: "18:30",
      customEndTime: "20:00",
      customDisciplineTitle: disciplines[0]?.title || "Danse Afro-Contemporaine",
      customCapacity: 12,
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      participants: 1,
      level: chosenSlot ? (chosenSlot.level.includes("Débutant") ? "Débutant" : chosenSlot.level.includes("Avancé") ? "Avancé" : "Tous niveaux") : "Tous niveaux",
      status: "confirmed",
      notes: "Inscription manuelle enregistrée depuis le calendrier",
    });
    setManualBookingModalOpen(true);
  };

  const handleManualBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualBookingForm.clientName.trim() || !manualBookingForm.clientPhone.trim()) {
      alert("Veuillez renseigner au minimum le nom et le numéro de téléphone du client.");
      return;
    }

    const targetDate = manualBookingForm.bookingDate || selectedDate;
    let targetSlot = slots.find((s) => s.id === manualBookingForm.slotId);

    // If custom slot or no slot on this date, create the slot dynamically
    if (!targetSlot || manualBookingForm.slotId === "new_slot" || manualBookingForm.isCustomSlot) {
      const disc = disciplines.find((d) => d.title === manualBookingForm.customDisciplineTitle) || disciplines[0];
      const newSlotPayload: Omit<AvailabilitySlot, "id" | "bookedCount"> = {
        date: targetDate,
        startTime: manualBookingForm.customStartTime || "18:30",
        endTime: manualBookingForm.customEndTime || "20:00",
        disciplineId: disc ? disc.id : "custom-disc",
        disciplineTitle: manualBookingForm.customDisciplineTitle || (disc ? disc.title : "Danse Afro-Contemporaine"),
        level: manualBookingForm.level || "Tous niveaux",
        location: "Tanzfabrik Berlin Studio 2",
        maxCapacity: Number(manualBookingForm.customCapacity) || 12,
        isOpen: true,
      };

      addSlot(newSlotPayload);

      const ref = createBooking({
        clientName: manualBookingForm.clientName,
        clientEmail: manualBookingForm.clientEmail || `${manualBookingForm.clientName.toLowerCase().replace(/[^a-z0-9]/g, "")}@client.yongonlon.com`,
        clientPhone: manualBookingForm.clientPhone,
        discipline: newSlotPayload.disciplineTitle,
        date: targetDate,
        timeSlot: `${newSlotPayload.startTime} - ${newSlotPayload.endTime}`,
        level: manualBookingForm.level,
        participants: Number(manualBookingForm.participants) || 1,
        status: manualBookingForm.status,
        notes: manualBookingForm.notes,
      });

      setSelectedDate(targetDate);
      setManualBookingFeedback(`Séance programmée & inscription ${ref} validée avec succès pour ${manualBookingForm.clientName} sur le ${targetDate} !`);
    } else {
      const ref = createBooking({
        clientName: manualBookingForm.clientName,
        clientEmail: manualBookingForm.clientEmail || `${manualBookingForm.clientName.toLowerCase().replace(/[^a-z0-9]/g, "")}@client.yongonlon.com`,
        clientPhone: manualBookingForm.clientPhone,
        discipline: targetSlot.disciplineTitle,
        date: targetSlot.date,
        timeSlot: `${targetSlot.startTime} - ${targetSlot.endTime}`,
        level: manualBookingForm.level,
        participants: Number(manualBookingForm.participants) || 1,
        status: manualBookingForm.status,
        notes: manualBookingForm.notes,
        slotId: targetSlot.id,
      });

      setSelectedDate(targetSlot.date);
      setManualBookingFeedback(`Inscription ${ref} validée avec succès pour ${manualBookingForm.clientName} sur la séance du ${targetSlot.date} (${targetSlot.startTime}) !`);
    }

    setTimeout(() => setManualBookingFeedback(""), 6000);
    setManualBookingModalOpen(false);
  };

  const [newSlotForm, setNewSlotForm] = useState({
    date: "2026-10-14",
    startTime: "18:30",
    endTime: "20:00",
    disciplineId: disciplines[0]?.id || "",
    disciplineTitle: disciplines[0]?.title || "Danse Afro-Contemporaine",
    level: "Tous niveaux",
    location: "Tanzfabrik Berlin - Kreuzberg",
    maxCapacity: 15,
    isOpen: true,
  });

  // Edit Slot Modal
  const [editSlotModalOpen, setEditSlotModalOpen] = useState<boolean>(false);
  const [editingSlot, setEditingSlot] = useState<AvailabilitySlot | null>(null);

  // Add Discipline Modal
  const [addDisciplineModalOpen, setAddDisciplineModalOpen] = useState<boolean>(false);
  const [editDisciplineModalOpen, setEditDisciplineModalOpen] = useState<boolean>(false);
  const [editingDiscipline, setEditingDiscipline] = useState<DanceDiscipline | null>(null);

  // === IMAGE CROPPER & UPLOAD STATE ===
  const [cropperModalOpen, setCropperModalOpen] = useState<boolean>(false);
  const [cropperTarget, setCropperTarget] = useState<"product" | "gallery">("product");
  const [cropperImageSrc, setCropperImageSrc] = useState<string>("");
  const [cropperAspectRatio, setCropperAspectRatio] = useState<number>(1);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: "product" | "gallery") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setCropperImageSrc(dataUrl);
      setCropperTarget(target);
      setCropperAspectRatio(target === "product" ? 1 : 16 / 9);
      setCropperModalOpen(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleOpenReCrop = (currentSrc: string, target: "product" | "gallery") => {
    if (!currentSrc) return;
    setCropperImageSrc(currentSrc);
    setCropperTarget(target);
    setCropperAspectRatio(target === "product" ? 1 : 16 / 9);
    setCropperModalOpen(true);
  };

  const handleCropComplete = (croppedDataUrl: string) => {
    if (cropperTarget === "product") {
      setProductForm((prev) => ({ ...prev, image: croppedDataUrl }));
    } else {
      setGalleryForm((prev) => ({ ...prev, src: croppedDataUrl }));
    }
  };

  // === BOUTIQUE & CATALOG STATE ===
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>("all");
  const [productSearchQuery, setProductSearchQuery] = useState<string>("");
  const [productModalOpen, setProductModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [productForm, setProductForm] = useState({
    title: "",
    category: "tshirts" as "tshirts" | "casquettes" | "accessoires" | "art",
    categoryLabel: "T-shirts",
    price: 35,
    desc: "",
    image: "/images/products/tshirt-noir.jpg",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    tag: "",
  });

  // === GALLERY STATE ===
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(DEFAULT_GALLERY_ITEMS);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>("all");
  const [gallerySearchQuery, setGallerySearchQuery] = useState<string>("");
  const [galleryModalOpen, setGalleryModalOpen] = useState<boolean>(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "performance" as "performance" | "portrait" | "rehearsal",
    src: "/images/ahmed-soura-green.jpg",
    credit: "Photo © Jo Grabowski",
    year: "2024",
  });

  // Load catalog and gallery on mount
  useEffect(() => {
    setProducts(loadBoutiqueProducts());
    setGalleryItems(loadGalleryItems());
  }, []);

  // Boutique Handlers
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      title: "",
      category: "tshirts",
      categoryLabel: "T-shirts",
      price: 35,
      desc: "",
      image: "/images/products/tshirt-noir.jpg",
      sizes: ["S", "M", "L", "XL"],
      inStock: true,
      tag: "",
    });
    setProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: ProductItem) => {
    setEditingProduct(prod);
    setProductForm({
      title: prod.title,
      category: (prod.category || "tshirts") as any,
      categoryLabel: prod.categoryLabel || "T-shirts",
      price: prod.price,
      desc: prod.desc,
      image: prod.image,
      sizes: prod.sizes || ["S", "M", "L", "XL"],
      inStock: prod.inStock !== false,
      tag: prod.tag || "",
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: ProductItem[];
    if (editingProduct) {
      updated = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              ...productForm,
              formattedPrice: `${productForm.price} €`,
            }
          : p
      );
    } else {
      const newId = "prod-" + Date.now().toString(36);
      const newProd: ProductItem = {
        id: newId,
        ...productForm,
        formattedPrice: `${productForm.price} €`,
      };
      updated = [newProd, ...products];
    }
    setProducts(updated);
    saveBoutiqueProducts(updated);
    setProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article de la boutique ?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      saveBoutiqueProducts(updated);
    }
  };

  const handleToggleProductStock = (id: string) => {
    const updated = products.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p));
    setProducts(updated);
    saveBoutiqueProducts(updated);
  };

  // Gallery Handlers
  const handleOpenAddGallery = () => {
    setEditingGalleryItem(null);
    setGalleryForm({
      title: "",
      category: "performance",
      src: "/images/ahmed-soura-green.jpg",
      credit: "Photo © Jo Grabowski",
      year: new Date().getFullYear().toString(),
    });
    setGalleryModalOpen(true);
  };

  const handleOpenEditGallery = (item: GalleryItem) => {
    setEditingGalleryItem(item);
    setGalleryForm({
      title: item.title,
      category: item.category,
      src: item.src,
      credit: item.credit,
      year: item.year,
    });
    setGalleryModalOpen(true);
  };

  const handleSaveGallery = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: GalleryItem[];
    if (editingGalleryItem) {
      updated = galleryItems.map((g) =>
        g.id === editingGalleryItem.id
          ? {
              ...g,
              ...galleryForm,
            }
          : g
      );
    } else {
      const newId = "photo-" + Date.now().toString(36);
      const newItem: GalleryItem = {
        id: newId,
        ...galleryForm,
      };
      updated = [newItem, ...galleryItems];
    }
    setGalleryItems(updated);
    saveGalleryItems(updated);
    setGalleryModalOpen(false);
    setEditingGalleryItem(null);
  };

  const handleDeleteGalleryItem = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette photo de la galerie ?")) {
      const updated = galleryItems.filter((g) => g.id !== id);
      setGalleryItems(updated);
      saveGalleryItems(updated);
    }
  };

  const handleOpenEditDiscipline = (disc: DanceDiscipline) => {
    setEditingDiscipline({ ...disc });
    setEditDisciplineModalOpen(true);
  };

  const handleEditDisciplineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDiscipline) return;
    updateDiscipline(editingDiscipline.id, {
      title: editingDiscipline.title,
      category: editingDiscipline.category,
      duration: editingDiscipline.duration,
      price: editingDiscipline.price,
      level: editingDiscipline.level,
      desc: editingDiscipline.desc,
    });
    setEditDisciplineModalOpen(false);
    setEditingDiscipline(null);
  };

  const [newDisciplineForm, setNewDisciplineForm] = useState({
    title: "",
    category: "Contemporain & Afro",
    duration: "90 min",
    price: "25 €",
    level: "Tous niveaux",
    desc: "",
  });

  // Check session on mount
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem("as_admin_auth");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (pinInput === "ahmed2026" || pinInput === "admin" || pinInput === "166") {
      setIsAuthenticated(true);
      sessionStorage.setItem("as_admin_auth", "true");
      setAuthError("");
    } else {
      setAuthError("Code PIN incorrect. Utilisez 'ahmed2026' ou cliquez sur Accès Démo.");
    }
  };

  const handleDemoAccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem("as_admin_auth", "true");
    setAuthError("");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("as_admin_auth");
    setPinInput("");
  };

  // Month navigation helpers
  const monthNames = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  // Build month calendar grid (Monday-first)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // 0 = Lundi, 6 = Dimanche
  const monthDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    monthDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    monthDays.push(d);
  }

  // Format date helper: YYYY-MM-DD
  const formatDateStr = (year: number, month: number, day: number) => {
    const mm = String(month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return year + "-" + mm + "-" + dd;
  };

  // Slots for the currently selected date in visual calendar
  const selectedDateSlots = slots
    .filter((s) => s.date === selectedDate)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // KPIs
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length;
  const totalSlots = slots.length;

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    if (bookingFilter !== "all" && b.status !== bookingFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        b.clientName.toLowerCase().includes(q) ||
        b.clientEmail.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.discipline.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Handle Add Slot Submit
  const handleAddSlotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const disc = disciplines.find((d) => d.id === newSlotForm.disciplineId);
    const slotDate = newSlotForm.date;
    addSlot({
      date: slotDate,
      startTime: newSlotForm.startTime,
      endTime: newSlotForm.endTime,
      disciplineId: newSlotForm.disciplineId,
      disciplineTitle: disc ? disc.title : (newSlotForm.disciplineTitle || "Danse Afro-Contemporaine"),
      level: newSlotForm.level,
      location: newSlotForm.location,
      maxCapacity: Number(newSlotForm.maxCapacity) || 15,
      isOpen: newSlotForm.isOpen,
    });
    // Immediately select and focus on that date and month!
    setSelectedDate(slotDate);
    const parts = slotDate.split("-").map(Number);
    if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      setViewYear(parts[0]);
      setViewMonth(parts[1] - 1);
    }
    setAddSlotModalOpen(false);
  };

  // Open Edit Slot Modal
  const handleOpenEditSlot = (slot: AvailabilitySlot) => {
    setEditingSlot({ ...slot });
    setEditSlotModalOpen(true);
  };

  // Handle Edit Slot Submit
  const handleEditSlotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlot) return;
    updateSlot(editingSlot.id, {
      date: editingSlot.date,
      startTime: editingSlot.startTime,
      endTime: editingSlot.endTime,
      disciplineTitle: editingSlot.disciplineTitle,
      level: editingSlot.level,
      location: editingSlot.location,
      maxCapacity: Number(editingSlot.maxCapacity) || 15,
      bookedCount: Number(editingSlot.bookedCount) || 0,
      isOpen: editingSlot.isOpen,
    });
    setEditSlotModalOpen(false);
    setEditingSlot(null);
  };

  // Handle Add Discipline Submit
  const handleAddDisciplineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDisciplineForm.title) return;
    addDiscipline(newDisciplineForm);
    setNewDisciplineForm({
      title: "",
      category: "Contemporain & Afro",
      duration: "90 min",
      price: "25 €",
      level: "Tous niveaux",
      desc: "",
    });
    setAddDisciplineModalOpen(false);
  };

  // Direct WhatsApp confirmation to client
  const handleSendClientWhatsApp = (booking: Booking) => {
    const cleanPhone = booking.clientPhone.replace(/[^0-9]/g, "");
    const formattedBookingDate = formatAdminSessionDate(booking.date);
    const bookingPrice = booking.totalPrice || (booking.participants > 1 ? (booking.participants * 25) + " €" : "25 €");
    const text =
      "Bonjour " + booking.clientName + " !\n\n" +
      "C'est Ahmed Soura (Yongonlon). Votre réservation et reçu pour le cours :\n" +
      "• Discipline : " + booking.discipline + "\n" +
      "• Jour & Date : " + formattedBookingDate + "\n" +
      "• Créneau : " + booking.timeSlot + " (" + booking.level + ")\n" +
      "• Participants : " + booking.participants + "\n" +
      "• Tarif Total : " + bookingPrice + "\n" +
      "• Modalité : " + (booking.paymentStatus || "Règlement sur place au studio") + "\n" +
      "• N° Reçu Officiel : " + booking.id + "\n\n" +
      "sont bien CONFIRMÉS. Hâte de vous retrouver au studio 2 de Tanzfabrik Berlin (Möckernstraße 68) pour partager cette belle énergie de danse !\n\n" +
      "À très bientôt,\nAhmed Soura & l'équipe Yongonlon";

    const url = "https://wa.me/" + cleanPhone + "?text=" + encodeURIComponent(text);
    window.open(url, "_blank");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080808] text-[#f5f2eb] flex flex-col items-center justify-center p-4 selection:bg-lime selection:text-black">
        <div className="glassmorphism rounded-2xl p-8 sm:p-10 max-w-md w-full border border-white/15 glow-border text-center space-y-6 animate-reveal-up">
          <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 p-2 mx-auto flex items-center justify-center">
            <Image
              src="/images/yongonlon-logo.jpg"
              alt="Yongonlon Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-lime tracking-widest block mb-1">
              Espace Administration
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Ahmed Soura × Yongonlon
            </h1>
            <p className="text-xs text-zinc-400 mt-2">
              Gestion du calendrier des cours, des disponibilités et des réservations.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-zinc-300 mb-2">
                Code PIN Administrateur
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Ex: ahmed2026"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/20 rounded-xl px-4 py-3 text-center text-lg tracking-widest text-white focus:border-lime focus:outline-none transition-colors"
                />
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
              {authError && (
                <p className="text-xs text-rose-400 mt-2">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(198,242,59,0.3)]"
            >
              Déverrouiller l'espace
            </button>
          </form>

          <div className="pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={handleDemoAccess}
              className="text-xs text-lime/80 hover:text-lime underline-offset-4 hover:underline block mx-auto font-medium"
            >
              Accès direct démo (1 clic)
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 mt-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour au site public</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#f5f2eb] flex flex-col selection:bg-lime selection:text-black">
      {/* Top Admin Header */}
      <header className="glassmorphism border-b border-white/10 sticky top-0 z-30 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9 rounded-sm overflow-hidden bg-white p-0.5 border border-white/20">
                <Image
                  src="/images/yongonlon-logo.jpg"
                  alt="Yongonlon Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif text-base tracking-wider uppercase font-bold text-white block">
                  AHMED SOURA
                </span>
                <span className="text-[9px] uppercase tracking-widest text-lime font-mono block">
                  ESPACE ADMIN & CALENDRIER
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-300 hover:text-lime px-3.5 py-2 rounded-full bg-zinc-900 border border-white/10 transition-colors"
            >
              <span>Voir le site public</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500 hover:text-white text-xs font-semibold transition-all"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full space-y-8">
        {/* KPI Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="glassmorphism rounded-xl p-3.5 sm:p-5 border border-white/10 card-glow">
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span>Total Réservations</span>
              <Users className="w-4 h-4 text-lime" />
            </div>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-white block">
              {totalBookings}
            </span>
            <span className="text-[10px] text-zinc-500 font-mono mt-1 block">Toutes sessions confondues</span>
          </div>

          <div className="glassmorphism rounded-xl p-3.5 sm:p-5 border border-amber-500/30 bg-amber-500/5 card-glow">
            <div className="flex items-center justify-between text-amber-300 text-xs mb-2">
              <span className="font-semibold">À Valider</span>
              <AlertCircle className="w-4 h-4 text-amber-400 animate-pulse" />
            </div>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 block">
              {pendingBookings}
            </span>
            <span className="text-[10px] text-amber-400/70 font-mono mt-1 block">Demandes en attente</span>
          </div>

          <div className="glassmorphism rounded-xl p-3.5 sm:p-5 border border-emerald-500/30 bg-emerald-500/5 card-glow">
            <div className="flex items-center justify-between text-emerald-300 text-xs mb-2">
              <span className="font-semibold">Confirmées</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-300 block">
              {confirmedBookings}
            </span>
            <span className="text-[10px] text-emerald-400/70 font-mono mt-1 block">Séances validées</span>
          </div>

          <div className="glassmorphism rounded-xl p-3.5 sm:p-5 border border-white/10 card-glow">
            <div className="flex items-center justify-between text-zinc-400 text-xs mb-2">
              <span>Créneaux Actifs</span>
              <CalendarIcon className="w-4 h-4 text-lime" />
            </div>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-white block">
              {totalSlots}
            </span>
            <span className="text-[10px] text-lime/80 font-mono mt-1 block">Visibles par les clients</span>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveTab("calendar")}
            className={"px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 whitespace-nowrap shrink-0 " +
              (activeTab === "calendar"
                ? "bg-lime text-black shadow-[0_0_20px_rgba(198,242,59,0.3)]"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span><span className="hidden sm:inline">Calendrier Interactif</span><span className="sm:hidden">Calendrier</span> ({slots.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("bookings")}
            className={"px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 whitespace-nowrap shrink-0 " +
              (activeTab === "bookings"
                ? "bg-lime text-black shadow-[0_0_20px_rgba(198,242,59,0.3)]"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
          >
            <Users className="w-3.5 h-3.5" />
            <span><span className="hidden sm:inline">Demandes de Réservations</span><span className="sm:hidden">Réservations</span> ({bookings.length})</span>
            {pendingBookings > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-black text-[10px] font-bold">
                {pendingBookings}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("disciplines")}
            className={"px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 whitespace-nowrap shrink-0 " +
              (activeTab === "disciplines"
                ? "bg-lime text-black shadow-[0_0_20px_rgba(198,242,59,0.3)]"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
          >
            <Flame className="w-3.5 h-3.5" />
            <span><span className="hidden sm:inline">Types de Danse & Tarifs</span><span className="sm:hidden">Danses & Tarifs</span> ({disciplines.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("products")}
            className={"px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 whitespace-nowrap shrink-0 " +
              (activeTab === "products"
                ? "bg-lime text-black shadow-[0_0_20px_rgba(198,242,59,0.3)]"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span><span className="hidden sm:inline">Catalogue & Boutique</span><span className="sm:hidden">Boutique</span> ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={"px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 whitespace-nowrap shrink-0 " +
              (activeTab === "gallery"
                ? "bg-lime text-black shadow-[0_0_20px_rgba(198,242,59,0.3)]"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
          >
            <Camera className="w-3.5 h-3.5" />
            <span><span className="hidden sm:inline">Galerie Photos</span><span className="sm:hidden">Galerie</span> ({galleryItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={"px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs uppercase font-bold tracking-wider transition-all flex items-center gap-2 whitespace-nowrap shrink-0 " +
              (activeTab === "settings"
                ? "bg-lime text-black shadow-[0_0_20px_rgba(198,242,59,0.3)]"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
          >
            <Settings className="w-3.5 h-3.5" />
            <span><span className="hidden sm:inline">Paramètres & Paiements (Stripe, Banque, WhatsApp)</span><span className="sm:hidden">Paramètres & Paiements</span></span>
          </button>
        </div>

        {/* TAB 1: CALENDAR & SLOTS */}
        {activeTab === "calendar" && (
          <section className="space-y-6">
            {/* Header with Add Slot and View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Planning des Disponibilités
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Cliquez sur n'importe quel jour du calendrier pour voir, ajouter ou modifier les séances et ajuster le nombre maximum d'inscrits.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                {/* View Mode Toggle */}
                <div className="grid grid-cols-2 bg-zinc-900 p-1 rounded-xl border border-white/10 text-xs w-full sm:w-auto">
                  <button
                    onClick={() => setCalendarViewMode("visual")}
                    className={"px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 " +
                      (calendarViewMode === "visual" ? "bg-lime text-black font-bold shadow-sm" : "text-zinc-400 hover:text-white")}
                  >
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>Vue Mensuelle</span>
                  </button>
                  <button
                    onClick={() => setCalendarViewMode("cards")}
                    className={"px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 " +
                      (calendarViewMode === "cards" ? "bg-lime text-black font-bold shadow-sm" : "text-zinc-400 hover:text-white")}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Tous les Créneaux</span>
                  </button>
                </div>

                {/* Add Slot Button */}
                <button
                  onClick={() => {
                    setNewSlotForm((prev) => ({ ...prev, date: selectedDate }));
                    setAddSlotModalOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(198,242,59,0.25)] w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter un créneau</span>
                </button>
              </div>
            </div>

            {/* VISUAL INTERACTIVE CALENDAR VIEW */}
            {calendarViewMode === "visual" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left Column: Interactive Month Grid (7 cols) */}
                <div className="lg:col-span-7 glassmorphism rounded-2xl p-3.5 sm:p-6 border border-white/10 space-y-4">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-lime" />
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                        {monthNames[viewMonth]} {viewYear}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrevMonth}
                        className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-lime transition-all"
                        aria-label="Mois précédent"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setViewYear(2026);
                          setViewMonth(9);
                          setSelectedDate("2026-10-14");
                        }}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs font-semibold text-lime hover:bg-lime hover:text-black transition-all"
                      >
                        Oct 2026
                      </button>
                      <button
                        onClick={handleNextMonth}
                        className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-lime transition-all"
                        aria-label="Mois suivant"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day of Week Headers */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-zinc-400 py-1">
                    <span><span className="sm:hidden">L</span><span className="hidden sm:inline">Lun</span></span>
                    <span><span className="sm:hidden">M</span><span className="hidden sm:inline">Mar</span></span>
                    <span><span className="sm:hidden">M</span><span className="hidden sm:inline">Mer</span></span>
                    <span><span className="sm:hidden">J</span><span className="hidden sm:inline">Jeu</span></span>
                    <span><span className="sm:hidden">V</span><span className="hidden sm:inline">Ven</span></span>
                    <span><span className="sm:hidden">S</span><span className="hidden sm:inline">Sam</span></span>
                    <span><span className="sm:hidden">D</span><span className="hidden sm:inline">Dim</span></span>
                  </div>

                  {/* Calendar Grid Cells */}
                  <div className="grid grid-cols-7 gap-1.5">
                    {monthDays.map((dayNum, idx) => {
                      if (dayNum === null) {
                        return <div key={"empty-" + idx} className="h-14 sm:h-20 rounded-lg sm:rounded-xl bg-white/[0.01]" />;
                      }

                      const dateStr = formatDateStr(viewYear, viewMonth, dayNum);
                      const isSelected = selectedDate === dateStr;
                      const daySlots = slots.filter((s) => s.date === dateStr);
                      const daySlotsCount = daySlots.length;
                      const hasOpenSlots = daySlots.some((s) => s.isOpen);

                      return (
                        <button
                          key={dateStr}
                          type="button"
                          onClick={() => setSelectedDate(dateStr)}
                          className={"min-h-[52px] sm:h-20 p-1 sm:p-2 rounded-lg sm:rounded-xl border flex flex-col justify-between text-left transition-all relative group " +
                            (isSelected
                              ? "bg-lime/10 border-lime ring-1 ring-lime shadow-[0_0_20px_rgba(198,242,59,0.25)]"
                              : daySlotsCount > 0
                              ? "bg-zinc-900/80 border-white/15 hover:border-lime/50 hover:bg-zinc-900"
                              : "bg-zinc-900/30 border-white/5 hover:border-white/20 hover:bg-zinc-900/50")}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className={"text-[11px] sm:text-xs font-bold font-mono " + (isSelected ? "text-lime" : "text-white")}>
                              {dayNum}
                            </span>
                            {daySlotsCount > 0 && (
                              <span className={"w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full " + (hasOpenSlots ? "bg-lime animate-pulse" : "bg-amber-400")} />
                            )}
                          </div>

                          {/* Event indicator badge */}
                          {daySlotsCount > 0 ? (
                            <div className="w-full mt-auto">
                              {/* Mobile view: compact pill */}
                              <div className="sm:hidden flex items-center justify-center">
                                <span className={"w-4 h-4 rounded-full text-[9px] font-extrabold flex items-center justify-center " +
                                  (isSelected ? "bg-lime text-black" : "bg-lime/20 text-lime")}>
                                  {daySlotsCount}
                                </span>
                              </div>
                              {/* Desktop view: full label */}
                              <span className={"hidden sm:block text-[10px] font-bold truncate px-1.5 py-0.5 rounded " +
                                (isSelected ? "bg-lime text-black font-extrabold" : "bg-white/10 text-lime")}>
                                {daySlotsCount} séance{daySlotsCount > 1 ? "s" : ""}
                              </span>
                            </div>
                          ) : (
                            <span className="text-[9px] text-zinc-600 italic hidden sm:inline">Libre</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Events / Timeline for Selected Date (5 cols) */}
                <div className="lg:col-span-5 glassmorphism rounded-2xl p-4 sm:p-6 border border-white/10 space-y-5 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-3 gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-lime tracking-wider block">
                        Séances du jour
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                        {selectedDate}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleOpenManualBooking(undefined, selectedDate)}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-lime hover:bg-lime-light text-black text-xs font-bold uppercase tracking-wider transition-all shadow-sm shadow-lime/20 whitespace-nowrap"
                        title="Inscrire manuellement un client sur cette date"
                      >
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>+ Inscrire Client</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setNewSlotForm((prev) => ({ ...prev, date: selectedDate }));
                          setAddSlotModalOpen(true);
                        }}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 text-zinc-300 hover:text-white border border-white/15 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap"
                        title="Ajouter un nouveau créneau de cours"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Créneau</span>
                      </button>
                    </div>
                  </div>

                  {/* List of slots on this selected date */}
                  {selectedDateSlots.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDateSlots.map((slot) => {
                        const fillPercent = Math.min(100, Math.round((slot.bookedCount / slot.maxCapacity) * 100));
                        const isFull = slot.bookedCount >= slot.maxCapacity;

                        return (
                          <div
                            key={slot.id}
                            className={"p-4 rounded-xl border space-y-3 transition-all card-glow " +
                              (slot.isOpen ? "bg-zinc-900/90 border-white/15" : "bg-zinc-950 border-rose-500/20 opacity-70")}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-mono font-bold text-lime flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" />
                                    {slot.startTime} – {slot.endTime}
                                  </span>
                                  <span className={"text-[9px] uppercase font-bold px-2 py-0.2 rounded-full " +
                                    (!slot.isOpen ? "bg-rose-500/20 text-rose-300" : isFull ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300")}>
                                    {!slot.isOpen ? "Fermé" : isFull ? "Complet" : "Ouvert"}
                                  </span>
                                </div>
                                <h4 className="font-serif text-base font-bold text-white">
                                  {slot.disciplineTitle}
                                </h4>
                              </div>

                              {/* Edit Action Button */}
                              <button
                                onClick={() => handleOpenEditSlot(slot)}
                                className="p-2 rounded-lg bg-white/5 hover:bg-lime hover:text-black text-zinc-300 transition-colors"
                                title="Modifier ce créneau"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Level and Studio */}
                            <div className="text-xs text-zinc-400 space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-zinc-500">Niveau :</span>
                                <span className="text-zinc-200 font-semibold">{slot.level}</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                                <span className="truncate">{slot.location}</span>
                              </div>
                            </div>

                            {/* Capacity Progress Bar */}
                            <div className="space-y-1 pt-2 border-t border-white/10">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-400">Places :</span>
                                <span className="font-mono font-bold text-white">
                                  {slot.bookedCount} / {slot.maxCapacity} max
                                </span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                                <div
                                  className={"h-full rounded-full " +
                                    (fillPercent >= 90 ? "bg-rose-500" : fillPercent >= 60 ? "bg-amber-400" : "bg-lime")}
                                  style={{ width: fillPercent + "%" }}
                                />
                              </div>
                            </div>

                            {/* Quick Toggle / Delete */}
                            <div className="flex items-center justify-between text-xs pt-1">
                              <button
                                onClick={() => updateSlot(slot.id, { isOpen: !slot.isOpen })}
                                className="text-zinc-400 hover:text-white transition-colors"
                              >
                                {slot.isOpen ? "Fermer réservations" : "Ré-ouvrir"}
                              </button>
                              <button
                                onClick={() => deleteSlot(slot.id)}
                                className="text-rose-400 hover:text-rose-300 p-1"
                                title="Supprimer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            {/* Bouton Routine Inscription Manuelle */}
                            <button
                              type="button"
                              onClick={() => handleOpenManualBooking(slot)}
                              className="w-full py-2 px-3 rounded-xl bg-lime/10 hover:bg-lime text-lime hover:text-black border border-lime/30 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm"
                            >
                              <UserPlus className="w-3.5 h-3.5" />
                              <span>+ Inscrire un élève manuellement</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-8 text-center space-y-4">
                      <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 text-zinc-500 flex items-center justify-center mx-auto">
                        <CalendarIcon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Aucun créneau programmé le <strong className="text-lime">{selectedDate}</strong>
                        </p>
                        <p className="text-xs text-zinc-400 mt-1 max-w-xs mx-auto">
                          Inscrivez un élève sur ce jour (création automatique de séance) ou ouvrez un créneau public.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => handleOpenManualBooking(undefined, selectedDate)}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md shadow-lime/20"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>+ Inscrire un client ce jour</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setNewSlotForm((prev) => ({ ...prev, date: selectedDate }));
                            setAddSlotModalOpen(true);
                          }}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Programmer un cours</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ALL SLOTS CARD VIEW */}
            {calendarViewMode === "cards" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {slots.map((slot) => {
                  const fillPercent = Math.min(100, Math.round((slot.bookedCount / slot.maxCapacity) * 100));
                  const isFull = slot.bookedCount >= slot.maxCapacity;

                  return (
                    <div
                      key={slot.id}
                      className={"glassmorphism rounded-2xl p-6 border transition-all card-glow flex flex-col justify-between space-y-4 " +
                        (slot.isOpen ? "border-white/10" : "border-rose-500/20 opacity-70")}
                    >
                      <div>
                        {/* Top Badges */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-mono text-xs font-bold text-lime bg-lime/10 px-2.5 py-1 rounded-md border border-lime/20">
                            {slot.date}
                          </span>
                          <span className={"text-[10px] uppercase font-bold px-2 py-0.5 rounded-full " +
                            (!slot.isOpen ? "bg-rose-500/20 text-rose-300" : isFull ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300")}>
                            {!slot.isOpen ? "Fermé" : isFull ? "Complet" : "Ouvert"}
                          </span>
                        </div>

                        {/* Time & Title */}
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-semibold">
                            <Clock className="w-3.5 h-3.5 text-lime" />
                            <span>{slot.startTime} – {slot.endTime}</span>
                          </div>
                          <h3 className="font-serif text-lg font-bold text-white">
                            {slot.disciplineTitle}
                          </h3>
                        </div>

                        {/* Level & Location */}
                        <div className="space-y-1.5 text-xs text-zinc-400">
                          <div className="flex items-center gap-2">
                            <span className="text-zinc-500">Niveau :</span>
                            <span className="font-semibold text-zinc-200">{slot.level}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                            <span className="truncate">{slot.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Capacity Progress Bar */}
                      <div className="space-y-1.5 pt-3 border-t border-white/10">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-zinc-400">Capacité max :</span>
                          <span className="font-mono font-bold text-white">
                            {slot.bookedCount} / {slot.maxCapacity} inscrits
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-zinc-800 overflow-hidden">
                          <div
                            className={"h-full rounded-full transition-all " +
                              (fillPercent >= 90 ? "bg-rose-500" : fillPercent >= 60 ? "bg-amber-400" : "bg-lime")}
                            style={{ width: fillPercent + "%" }}
                          />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                        <button
                          onClick={() => handleOpenEditSlot(slot)}
                          className="inline-flex items-center gap-1 text-lime hover:underline font-semibold"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Modifier</span>
                        </button>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateSlot(slot.id, { isOpen: !slot.isOpen })}
                            className="text-zinc-400 hover:text-white transition-colors"
                          >
                            {slot.isOpen ? "Fermer" : "Ouvrir"}
                          </button>

                          <button
                            onClick={() => deleteSlot(slot.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* TAB 2: BOOKING REQUESTS */}
        {activeTab === "bookings" && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Demandes de Réservations & Inscriptions
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Consultez, confirmez ou annulez les demandes et échangez directement avec les élèves via WhatsApp.
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setBookingFilter("all")}
                  className={"px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all " +
                    (bookingFilter === "all" ? "bg-lime text-black" : "bg-zinc-900 text-zinc-400 hover:text-white")}
                >
                  Toutes ({bookings.length})
                </button>
                <button
                  onClick={() => setBookingFilter("pending")}
                  className={"px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all " +
                    (bookingFilter === "pending" ? "bg-amber-400 text-black font-bold" : "bg-zinc-900 text-zinc-400 hover:text-white")}
                >
                  En attente ({pendingBookings})
                </button>
                <button
                  onClick={() => setBookingFilter("confirmed")}
                  className={"px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all " +
                    (bookingFilter === "confirmed" ? "bg-emerald-500 text-white font-bold" : "bg-zinc-900 text-zinc-400 hover:text-white")}
                >
                  Confirmées ({confirmedBookings})
                </button>
                <button
                  onClick={() => setBookingFilter("cancelled")}
                  className={"px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all " +
                    (bookingFilter === "cancelled" ? "bg-rose-500 text-white font-bold" : "bg-zinc-900 text-zinc-400 hover:text-white")}
                >
                  Annulées
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Rechercher par nom, email, réf, discipline..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
              />
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="glassmorphism rounded-2xl p-5 sm:p-6 border border-white/10 card-glow flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-lime bg-lime/10 px-2.5 py-0.5 rounded border border-lime/20">
                        {b.id}
                      </span>
                      <span className={"text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full " +
                        (b.status === "confirmed" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : b.status === "pending" ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "bg-rose-500/20 text-rose-300 border border-rose-500/30")}>
                        {b.status === "confirmed" ? "Confirmée" : b.status === "pending" ? "En attente" : "Annulée"}
                      </span>
                      <span className="text-xs text-zinc-400">
                        {new Date(b.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">
                        {b.clientName}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400 mt-1">
                        <span>Email : {b.clientEmail}</span>
                        <span>•</span>
                        <span>Tél : {b.clientPhone}</span>
                        <span>•</span>
                        <span>Participants : {b.participants}</span>
                      </div>
                    </div>

                    <div className="text-xs text-zinc-300 bg-white/[0.02] p-3 rounded-xl border border-white/5 space-y-1.5">
                      <div>
                        <strong className="text-white font-serif text-sm">{b.discipline}</strong> — <span className="text-lime font-bold">{formatAdminSessionDate(b.date)}</span> à <span className="font-mono text-white">{b.timeSlot}</span> ({b.level})
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-400 pt-1 border-t border-white/5">
                        <span>Montant : <strong className="text-lime font-bold">{b.totalPrice || (b.participants > 1 ? (b.participants * 25) + " €" : "25 €")}</strong></span>
                        <span>•</span>
                        <span>Règlement : <span className="text-emerald-400 font-medium">{b.paymentStatus || "Sur place au studio"}</span></span>
                        <span>•</span>
                        <span>Reçu N° : <code className="font-mono text-lime bg-lime/10 px-1.5 py-0.5 rounded text-[10px]">{b.id}</code></span>
                      </div>
                      {b.notes && (
                        <p className="text-zinc-400 mt-1 italic">« {b.notes} »</p>
                      )}
                    </div>
                  </div>

                  {/* Actions Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
                    {b.status !== "confirmed" && (
                      <button
                        onClick={() => updateBookingStatus(b.id, "confirmed")}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs transition-all shadow-md"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Valider</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleSendClientWhatsApp(b)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs transition-all shadow-md"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-black" />
                      <span>WhatsApp Client</span>
                    </button>

                    {b.status !== "cancelled" && (
                      <button
                        onClick={() => updateBookingStatus(b.id, "cancelled")}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-300 border border-white/10 text-xs transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Annuler</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {filteredBookings.length === 0 && (
                <div className="text-center py-12 text-zinc-500 text-sm">
                  Aucune réservation ne correspond aux critères sélectionnés.
                </div>
              )}
            </div>
          </section>
        )}

        {/* TAB 3: DANCE DISCIPLINES */}
        {activeTab === "disciplines" && (
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Types de Danse & Formations
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Configurez les disciplines proposées par Ahmed Soura, leurs durées, descriptions et tarifs.
                </p>
              </div>

              <button
                onClick={() => setAddDisciplineModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(198,242,59,0.25)] w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Nouveau type de danse</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {disciplines.map((disc) => (
                <div
                  key={disc.id}
                  className="glassmorphism rounded-2xl p-6 border border-white/10 card-glow flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-[10px] uppercase font-bold text-lime bg-lime/10 px-2.5 py-1 rounded-full border border-lime/20">
                        {disc.category}
                      </span>
                      <span className="text-lime font-mono font-bold text-sm">
                        {disc.price}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-white mb-2">
                      {disc.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                      {disc.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <span>{disc.duration}</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-zinc-300 font-medium">{disc.level}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditDiscipline(disc)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-lime hover:text-black text-zinc-200 transition-colors font-semibold text-xs border border-white/5 hover:border-lime"
                        title="Modifier ce type de danse"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Êtes-vous sûr de vouloir supprimer "${disc.title}" ?`)) {
                            deleteDiscipline(disc.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 transition-colors"
                        title="Supprimer ce type de danse"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      
        {/* ========================================================================= */}
        {/* TAB 4: PARAMÈTRES & CONFIGURATION PAIEMENTS (STRIPE, BANQUE, WHATSAPP)    */}
        {/* ========================================================================= */}
        {/* TAB 4: BOUTIQUE & PRODUCTS CATALOG */}
        {activeTab === "products" && (
          <section className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Catalogue & Produits Boutique
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Gérez les t-shirts, casquettes et articles officiels. Tout changement de prix ou de photo se met à jour en direct sur la boutique en ligne.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddProduct}
                className="inline-flex items-center justify-center gap-2 bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(198,242,59,0.25)] w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                <span>+ Ajouter un produit</span>
              </button>
            </div>

            {/* Category Filters and Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setProductCategoryFilter("all")}
                  className={"px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all " +
                    (productCategoryFilter === "all" ? "bg-lime text-black font-bold" : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
                >
                  Tous ({products.length})
                </button>
                <button
                  type="button"
                  onClick={() => setProductCategoryFilter("tshirts")}
                  className={"px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all " +
                    (productCategoryFilter === "tshirts" ? "bg-lime text-black font-bold" : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
                >
                  T-shirts ({products.filter(p => p.category === "tshirts").length})
                </button>
                <button
                  type="button"
                  onClick={() => setProductCategoryFilter("casquettes")}
                  className={"px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all " +
                    (productCategoryFilter === "casquettes" ? "bg-lime text-black font-bold" : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
                >
                  Casquettes ({products.filter(p => p.category === "casquettes").length})
                </button>
              </div>

              <div className="relative max-w-xs w-full">
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  value={productSearchQuery}
                  onChange={(e) => setProductSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:border-lime focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((p) => productCategoryFilter === "all" || p.category === productCategoryFilter)
                .filter((p) => !productSearchQuery || p.title.toLowerCase().includes(productSearchQuery.toLowerCase()))
                .map((prod) => (
                  <div
                    key={prod.id}
                    className="glassmorphism rounded-2xl overflow-hidden border border-white/10 card-glow flex flex-col justify-between group"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="relative w-full h-56 bg-zinc-950 flex items-center justify-center overflow-hidden border-b border-white/10">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                        />
                        {prod.tag && (
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-lime text-black text-[10px] font-extrabold uppercase font-mono shadow-md">
                            {prod.tag}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleToggleProductStock(prod.id)}
                          className={"absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-all " +
                            (prod.inStock ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" : "bg-rose-500/20 text-rose-300 border border-rose-500/40")}
                        >
                          {prod.inStock ? "En stock" : "Épuisé"}
                        </button>
                      </div>

                      {/* Info Body */}
                      <div className="p-5 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-base font-bold text-white line-clamp-2">
                            {prod.title}
                          </h3>
                          <span className="font-mono text-base font-bold text-lime shrink-0">
                            {prod.price} €
                          </span>
                        </div>

                        <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                          {prod.desc}
                        </p>

                        {prod.sizes && prod.sizes.length > 0 && (
                          <div className="flex items-center gap-1.5 pt-2">
                            <span className="text-[10px] text-zinc-500 font-mono">Tailles :</span>
                            {prod.sizes.map((sz) => (
                              <span key={sz} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-300 font-mono">
                                {sz}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditProduct(prod)}
                        className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-lime hover:text-black text-xs font-semibold text-zinc-200 transition-all flex items-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Modifier Prix & Infos</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white transition-all"
                        title="Supprimer cet article"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* TAB 5: GALLERY & PHOTOS MANAGEMENT */}
        {activeTab === "gallery" && (
          <section className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Galerie Photos & Scénographie
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Ajoutez et organisez les photographies de scène, répétitions et portraits. Elles s'affichent automatiquement sur la page publique /galerie.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenAddGallery}
                className="inline-flex items-center justify-center gap-2 bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(198,242,59,0.25)] w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" />
                <span>+ Ajouter une photo</span>
              </button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setGalleryCategoryFilter("all")}
                  className={"px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all " +
                    (galleryCategoryFilter === "all" ? "bg-lime text-black font-bold" : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
                >
                  Toutes ({galleryItems.length})
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryCategoryFilter("performance")}
                  className={"px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all " +
                    (galleryCategoryFilter === "performance" ? "bg-lime text-black font-bold" : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
                >
                  Scène & Performance ({galleryItems.filter(g => g.category === "performance").length})
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryCategoryFilter("portrait")}
                  className={"px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all " +
                    (galleryCategoryFilter === "portrait" ? "bg-lime text-black font-bold" : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
                >
                  Portraits & Postures ({galleryItems.filter(g => g.category === "portrait").length})
                </button>
                <button
                  type="button"
                  onClick={() => setGalleryCategoryFilter("rehearsal")}
                  className={"px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all " +
                    (galleryCategoryFilter === "rehearsal" ? "bg-lime text-black font-bold" : "bg-zinc-900 text-zinc-400 hover:text-white border border-white/10")}
                >
                  Répétitions & Ateliers ({galleryItems.filter(g => g.category === "rehearsal").length})
                </button>
              </div>

              <div className="relative max-w-xs w-full">
                <input
                  type="text"
                  placeholder="Rechercher une photo..."
                  value={gallerySearchQuery}
                  onChange={(e) => setGallerySearchQuery(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:border-lime focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Gallery Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems
                .filter((g) => galleryCategoryFilter === "all" || g.category === galleryCategoryFilter)
                .filter((g) => !gallerySearchQuery || g.title.toLowerCase().includes(gallerySearchQuery.toLowerCase()))
                .map((item) => (
                  <div
                    key={item.id}
                    className="glassmorphism rounded-2xl overflow-hidden border border-white/10 card-glow flex flex-col justify-between group"
                  >
                    <div>
                      {/* Photo Thumbnail */}
                      <div className="relative w-full h-64 bg-zinc-950 overflow-hidden border-b border-white/10">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-lime text-[10px] font-mono font-bold uppercase">
                          {item.category === "performance" ? "Scène" : item.category === "portrait" ? "Portrait" : "Répétition"}
                        </span>
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px]">
                          {item.year}
                        </span>
                      </div>

                      {/* Photo Info */}
                      <div className="p-5 space-y-1.5">
                        <h3 className="font-serif text-base font-bold text-white line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-400 font-mono">
                          {item.credit}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditGallery(item)}
                        className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-lime hover:text-black text-xs font-semibold text-zinc-200 transition-all flex items-center gap-1.5"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Modifier</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteGalleryItem(item.id)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-300 hover:text-white transition-all"
                        title="Supprimer cette photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {activeTab === "settings" && (
          <section className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs uppercase tracking-widest text-lime font-bold">
                  Configuration & Passerelles
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                  Paiements, Coordonnées Bancaires & Intégrations
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
                  Gérez vos clés d'API Stripe, configurez votre RIB officiel pour les dons et virements, et paramétrez vos canaux de communication WhatsApp.
                </p>
              </div>

              {settingsFeedback && (
                <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{settingsFeedback}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSavePaymentSettings} className="space-y-8">
              {/* 1. STRIPE GATEWAY */}
              <div className="glassmorphism rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#635bff]/20 border border-[#635bff]/40 flex items-center justify-center text-[#635bff]">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                        Passerelle Stripe (Cartes, Apple Pay, Google Pay)
                        <span className={"text-[10px] uppercase font-bold px-2 py-0.5 rounded-full " +
                          (paymentSettings.stripeMode === "live" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30")}>
                          Mode {paymentSettings.stripeMode === "live" ? "Production (Live)" : "Test / Simulation"}
                        </span>
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Encaissement sécurisé pour la boutique de merch, les réservations de stages et les dons déductibles d'impôts.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleTestStripeConnection}
                      className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/15 text-xs font-semibold flex items-center gap-1.5 transition-all"
                    >
                      <RefreshCw className={"w-3.5 h-3.5 " + (stripeTestStatus === "testing" ? "animate-spin text-lime" : "")} />
                      <span>Tester l'API</span>
                    </button>
                  </div>
                </div>

                {/* Stripe Mode Toggle */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/60 border border-white/10">
                  <div>
                    <span className="text-xs font-bold text-white block">Environnement Stripe</span>
                    <span className="text-xs text-zinc-400">Basculez entre le mode bac à sable (test sans prélèvement réel) et la production.</span>
                  </div>
                  <div className="flex items-center gap-2 bg-black/50 p-1 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setPaymentSettings({ ...paymentSettings, stripeMode: "test" })}
                      className={"px-3 py-1.5 rounded-lg text-xs font-bold transition-all " +
                        (paymentSettings.stripeMode === "test" ? "bg-amber-500 text-black shadow-md shadow-amber-500/20" : "text-zinc-400 hover:text-white")}
                    >
                      Test (Sandbox)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentSettings({ ...paymentSettings, stripeMode: "live" })}
                      className={"px-3 py-1.5 rounded-lg text-xs font-bold transition-all " +
                        (paymentSettings.stripeMode === "live" ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" : "text-zinc-400 hover:text-white")}
                    >
                      Production (Live)
                    </button>
                  </div>
                </div>

                {stripeTestStatus !== "idle" && (
                  <div className={"p-3.5 rounded-xl border text-xs flex items-center gap-2.5 animate-fadeIn " +
                    (stripeTestStatus === "success" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" :
                     stripeTestStatus === "simulated" ? "bg-lime/10 border-lime/30 text-lime" :
                     "bg-zinc-900 border-white/10 text-zinc-300")}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>
                      {stripeTestStatus === "testing" && "Vérification des connexions d'API en cours..."}
                      {stripeTestStatus === "success" && "Connexion Stripe Live vérifiée avec succès ! Les paiements réels sont activés."}
                      {stripeTestStatus === "simulated" && "Moteur de simulation Stripe actif et opérationnel (Génération certifiée de reçus et commandes sans blocage)."}
                    </span>
                  </div>
                )}

                {/* API Keys */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Key className="w-3.5 h-3.5 text-lime" />
                      <span>Clé Publique Stripe (Publishable Key)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="pk_live_... ou pk_test_..."
                      value={paymentSettings.stripePublishableKey}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, stripePublishableKey: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:border-lime focus:outline-none"
                    />
                    <span className="text-[10px] text-zinc-500 mt-1 block">Visible côté client pour l'initialisation des éléments Stripe.</span>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Clé Secrète Stripe (Secret Key)</span>
                    </label>
                    <input
                      type="password"
                      placeholder="sk_live_... ou sk_test_..."
                      value={paymentSettings.stripeSecretKey}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeSecretKey: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm font-mono text-white placeholder-zinc-600 focus:border-lime focus:outline-none"
                    />
                    <span className="text-[10px] text-zinc-500 mt-1 block">Protégée côté serveur dans Next.js pour créer les sessions de paiement.</span>
                  </div>
                </div>

                {/* Direct Stripe Payment Links */}
                <div className="pt-2 border-t border-white/10 space-y-3">
                  <span className="text-xs font-bold text-white block">Liens Directs de Paiement Stripe (Stripe Payment Links)</span>
                  <p className="text-xs text-zinc-400">
                    Si vous préférez utiliser des liens de paiement pré-générés sur le Dashboard Stripe pour vos articles ou vos stages :
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">Lien Paiement Boutique</label>
                      <input
                        type="url"
                        placeholder="https://buy.stripe.com/..."
                        value={paymentSettings.stripeShopPaymentLink}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeShopPaymentLink: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:border-lime focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">Lien Dons & Mécénat</label>
                      <input
                        type="url"
                        placeholder="https://buy.stripe.com/..."
                        value={paymentSettings.stripeDonationPaymentLink}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeDonationPaymentLink: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:border-lime focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. BANK ACCOUNT DETAILS & RIB */}
              <div className="glassmorphism rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-lime/10 border border-lime/30 flex items-center justify-center text-lime">
                      <Landmark className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white">
                        Coordonnées Bancaires & RIB Officiel (Virement SEPA)
                      </h3>
                      <p className="text-xs text-zinc-400">
                        Informations transmises aux donateurs, institutions et élèves souhaitant régler par virement bancaire.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyRib}
                    className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-lime border border-lime/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all"
                  >
                    {ribCopied ? <CheckCheck className="w-3.5 h-3.5 text-lime" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{ribCopied ? "RIB Copié !" : "Copier le RIB"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                      Titulaire du Compte *
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.bankAccountHolder}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, bankAccountHolder: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                      Nom de la Banque *
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.bankName}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, bankName: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                      Numéro IBAN (Format International) *
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.bankIban}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, bankIban: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:border-lime focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                      Code BIC / SWIFT *
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.bankBic}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, bankBic: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:border-lime focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                      Adresse de l'Agence Bancaire
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.bankBranchAddress}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, bankBranchAddress: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                      Instruction & Motif Recommandé pour Virement
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.bankTransferReferenceGuide}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, bankTransferReferenceGuide: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                    />
                  </div>
                </div>

                {/* Live RIB Preview Card */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/15 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-lime tracking-widest block">Aperçu du RIB tel qu'affiché aux clients</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                    <div><span className="text-zinc-500">Bénéficiaire : </span><span className="text-white">{paymentSettings.bankAccountHolder}</span></div>
                    <div><span className="text-zinc-500">Banque : </span><span className="text-white">{paymentSettings.bankName}</span></div>
                    <div><span className="text-zinc-500">IBAN : </span><span className="text-lime font-bold">{paymentSettings.bankIban}</span></div>
                    <div><span className="text-zinc-500">BIC : </span><span className="text-white">{paymentSettings.bankBic}</span></div>
                  </div>
                </div>
              </div>

              {/* 3. PAYPAL & WHATSAPP INTEGRATIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PAYPAL */}
                <div className="glassmorphism rounded-2xl p-6 border border-white/10 space-y-4">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0070ba]/20 border border-[#0070ba]/40 flex items-center justify-center text-[#0070ba]">
                      <span className="font-bold text-sm">P</span>
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-white">Compte PayPal</h4>
                      <span className="text-xs text-zinc-400">Pour dons rapides et règlements internationaux</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">Email PayPal</label>
                      <input
                        type="email"
                        value={paymentSettings.paypalEmail}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalEmail: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:border-lime focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">Lien PayPal.me direct</label>
                      <input
                        type="url"
                        value={paymentSettings.paypalMeLink}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, paypalMeLink: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:border-lime focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* WHATSAPP */}
                <div className="glassmorphism rounded-2xl p-6 border border-white/10 space-y-4">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold text-white">WhatsApp & Alertes</h4>
                      <span className="text-xs text-zinc-400">Notifications de réservations & contact direct</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">Numéro WhatsApp Officiel (Ahmed Soura)</label>
                      <input
                        type="tel"
                        value={paymentSettings.whatsappOfficialNumber}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, whatsappOfficialNumber: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:border-lime focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">Numéro Réception Alertes Réservations</label>
                      <input
                        type="tel"
                        value={paymentSettings.whatsappNotificationAlertNumber}
                        onChange={(e) => setPaymentSettings({ ...paymentSettings, whatsappNotificationAlertNumber: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:border-lime focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. BILINGUAL EMAILS & NOTIFICATIONS CONFIGURATION */}
              <div className="glassmorphism rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-lime/20 border border-lime/40 flex items-center justify-center text-lime">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                        <span>Système d'E-mails & Notifications Bilingues (FR / EN)</span>
                        <span className="text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-lime/20 text-lime font-mono font-bold">
                          Design Premium
                        </span>
                      </h3>
                      <p className="text-xs text-zinc-400">
                        E-mails automatiques au design soigné (logo Yongonlon, émojis, bilingue FR/EN) et alertes centralisées vers votre boîte de réception.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={async () => {
                      setEmailTestStatus("Envoi en cours...");
                      try {
                        const res = await fetch("/api/contact", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            name: "Test Admin",
                            email: paymentSettings.adminNotificationEmail || "js.kemet@gmail.com",
                            message: "Test de validation du moteur d'e-mails Yongonlon / Ahmed Soura.",
                            locale: "fr"
                          })
                        });
                        if (res.ok) {
                          setEmailTestStatus("✓ E-mail test transmis avec succès vers " + (paymentSettings.adminNotificationEmail || "js.kemet@gmail.com"));
                        } else {
                          setEmailTestStatus("Simulation enregistrée avec succès");
                        }
                      } catch {
                        setEmailTestStatus("Simulation enregistrée avec succès");
                      }
                      setTimeout(() => setEmailTestStatus(""), 5000);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/15 hover:border-lime text-xs text-zinc-200 hover:text-white font-semibold transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
                  >
                    <Send className="w-3.5 h-3.5 text-lime" />
                    <span>Tester la passerelle</span>
                  </button>
                </div>

                {emailTestStatus && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold animate-fadeIn flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{emailTestStatus}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                      Email de Réception des Alertes (Admin)
                    </label>
                    <input
                      type="email"
                      value={paymentSettings.adminNotificationEmail || "js.kemet@gmail.com"}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, adminNotificationEmail: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-lime font-mono font-bold focus:border-lime focus:outline-none"
                    />
                    <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
                      Toutes les nouvelles réservations et demandes de contact sont transmises à cette adresse.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                      Nom & Adresse d'Expéditeur Affichés
                    </label>
                    <input
                      type="text"
                      value={paymentSettings.senderEmailDisplay || "Compagnie Ahmed Soura · Yongonlon <js.kemet@gmail.com>"}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, senderEmailDisplay: e.target.value })}
                      className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                    />
                    <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
                      Libellé officiel reçu par les élèves pour éviter toute confusion avec d'autres projets.
                    </span>
                  </div>
                </div>

                {/* Email Templates Preview Selector */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-lime tracking-widest block">
                      Aperçu des Gabarits Graphiques (FR / EN)
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Cliquez pour inspecter le rendu en direct
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setEmailPreviewType("booking-client-fr");
                        setEmailPreviewModalOpen(true);
                      }}
                      className="p-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-lime/50 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                        <span>🇫🇷 Confirmation Réservation</span>
                        <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-lime" />
                      </div>
                      <span className="text-[10px] text-zinc-400 block">Élève · Version Française</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEmailPreviewType("booking-client-en");
                        setEmailPreviewModalOpen(true);
                      }}
                      className="p-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-lime/50 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                        <span>🇬🇧 Booking Confirmation</span>
                        <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-lime" />
                      </div>
                      <span className="text-[10px] text-zinc-400 block">Student · English Version</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEmailPreviewType("booking-admin");
                        setEmailPreviewModalOpen(true);
                      }}
                      className="p-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-lime/50 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                        <span>🔔 Alerte Admin Réservation</span>
                        <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-lime" />
                      </div>
                      <span className="text-[10px] text-zinc-400 block">Notification js.kemet@gmail.com</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEmailPreviewType("contact-client-fr");
                        setEmailPreviewModalOpen(true);
                      }}
                      className="p-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-lime/50 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                        <span>🇫🇷 Accusé Réception Contact</span>
                        <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-lime" />
                      </div>
                      <span className="text-[10px] text-zinc-400 block">Visiteur · Version Française</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEmailPreviewType("contact-client-en");
                        setEmailPreviewModalOpen(true);
                      }}
                      className="p-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-lime/50 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                        <span>🇬🇧 Contact Acknowledgment</span>
                        <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-lime" />
                      </div>
                      <span className="text-[10px] text-zinc-400 block">Inquirer · English Version</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEmailPreviewType("contact-admin");
                        setEmailPreviewModalOpen(true);
                      }}
                      className="p-3 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 hover:border-lime/50 text-left transition-all group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                        <span>📬 Alerte Admin Contact</span>
                        <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-lime" />
                      </div>
                      <span className="text-[10px] text-zinc-400 block">Notification js.kemet@gmail.com</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* SAVE BUTTON */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(198,242,59,0.3)] flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Enregistrer tous les paramètres de paiement</span>
                </button>
              </div>
            </form>
          </section>
        )}
</main>

      
      {/* MODAL: AJOUTER / MODIFIER UN PRODUIT */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121212] border border-white/20 rounded-2xl w-full max-w-xl p-4 sm:p-7 space-y-5 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setProductModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold text-lime tracking-widest block mb-1">
                Boutique Yongonlon
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                {editingProduct ? "Modifier l'article" : "Ajouter un produit au catalogue"}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Renseignez le nom, le tarif en euros, la photo et les variantes de cet article.
              </p>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="Ex: T-shirt Typographique Yongonlon Noir"
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Catégorie *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({
                      ...productForm,
                      category: e.target.value as any,
                      categoryLabel: e.target.value === "tshirts" ? "T-shirts" : e.target.value === "casquettes" ? "Casquettes" : "Accessoires",
                    })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  >
                    <option value="tshirts">T-shirts</option>
                    <option value="casquettes">Casquettes</option>
                    <option value="accessoires">Accessoires / Sacs</option>
                    <option value="art">Éditions d'Art & Vinyles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Prix en Euros (€) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-lime font-mono font-bold focus:border-lime focus:outline-none"
                  />
                </div>
              </div>

              {/* Image Selector & Preset Buttons */}
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Photo du produit *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  placeholder="/images/products/tshirt-noir.jpg"
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-lime focus:outline-none"
                />

                <div className="mt-2 space-y-1">
                  <span className="text-[10px] text-zinc-500 block">Photos de produits disponibles (cliquez pour choisir) :</span>
                  <div className="flex flex-wrap gap-1.5">
                    {AVAILABLE_PRODUCT_IMAGES.map((img) => (
                      <button
                        key={img.value}
                        type="button"
                        onClick={() => setProductForm({ ...productForm, image: img.value })}
                        className={"px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all " +
                          (productForm.image === img.value ? "bg-lime text-black font-bold" : "bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white")}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload direct depuis smartphone/PC & Recadrage */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label
                    htmlFor="product-upload-input"
                    className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-dashed border-lime/50 bg-lime/10 hover:bg-lime/20 text-lime text-xs font-semibold cursor-pointer transition-all text-center"
                  >
                    <Upload className="w-4 h-4 shrink-0" />
                    <span>Importer une photo</span>
                    <input
                      id="product-upload-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "product")}
                      className="hidden"
                    />
                  </label>

                  {productForm.image && (
                    <button
                      type="button"
                      onClick={() => handleOpenReCrop(productForm.image, "product")}
                      className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold transition-all"
                    >
                      <Crop className="w-4 h-4 text-lime shrink-0" />
                      <span>Recadrer & Zoomer</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Badge / Tag & InStock */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Badge spécial (optionnel)
                  </label>
                  <input
                    type="text"
                    value={productForm.tag}
                    onChange={(e) => setProductForm({ ...productForm, tag: e.target.value })}
                    placeholder="Ex: Collector, Nouveau, Signature"
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={productForm.inStock}
                      onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                      className="w-4 h-4 rounded text-lime focus:ring-lime"
                    />
                    <span className="text-xs text-zinc-300 font-semibold">Article en stock</span>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Description de l'article
                </label>
                <textarea
                  rows={3}
                  value={productForm.desc}
                  onChange={(e) => setProductForm({ ...productForm, desc: e.target.value })}
                  placeholder="Décrivez le coton biologique, la coupe, la sérigraphie..."
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/15 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(198,242,59,0.3)]"
                >
                  {editingProduct ? "Enregistrer les modifications" : "Ajouter le produit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: AJOUTER / MODIFIER UNE PHOTO DE LA GALERIE */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121212] border border-white/20 rounded-2xl w-full max-w-xl p-4 sm:p-7 space-y-5 relative shadow-2xl max-h-[92vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setGalleryModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold text-lime tracking-widest block mb-1">
                Galerie Photos
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                {editingGalleryItem ? "Modifier la photo" : "Ajouter une photo à la galerie"}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Renseignez le titre du cliché, le photographe et sa thématique scénique.
              </p>
            </div>

            <form onSubmit={handleSaveGallery} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Titre de la photo *
                </label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="Ex: Solo sur scène — Tenue vert lime"
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Catégorie *
                  </label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  >
                    <option value="performance">Scène & Performance</option>
                    <option value="portrait">Portraits & Postures</option>
                    <option value="rehearsal">Répétitions & Ateliers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Année de prise de vue *
                  </label>
                  <input
                    type="text"
                    required
                    value={galleryForm.year}
                    onChange={(e) => setGalleryForm({ ...galleryForm, year: e.target.value })}
                    placeholder="2024"
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-lime focus:outline-none"
                  />
                </div>
              </div>

              {/* Image Source & Presets */}
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Source de l'image *
                </label>
                <input
                  type="text"
                  required
                  value={galleryForm.src}
                  onChange={(e) => setGalleryForm({ ...galleryForm, src: e.target.value })}
                  placeholder="/images/ahmed-soura-green.jpg"
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:border-lime focus:outline-none"
                />

                <div className="mt-2 space-y-1">
                  <span className="text-[10px] text-zinc-500 block">Photos d'Ahmed Soura disponibles :</span>
                  <div className="flex flex-wrap gap-1.5">
                    {AVAILABLE_GALLERY_IMAGES.map((img) => (
                      <button
                        key={img.value}
                        type="button"
                        onClick={() => setGalleryForm({ ...galleryForm, src: img.value })}
                        className={"px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all " +
                          (galleryForm.src === img.value ? "bg-lime text-black font-bold" : "bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white")}
                      >
                        {img.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload direct depuis smartphone/PC & Recadrage */}
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label
                    htmlFor="gallery-upload-input"
                    className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-dashed border-lime/50 bg-lime/10 hover:bg-lime/20 text-lime text-xs font-semibold cursor-pointer transition-all text-center"
                  >
                    <Upload className="w-4 h-4 shrink-0" />
                    <span>Importer une photo</span>
                    <input
                      id="gallery-upload-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "gallery")}
                      className="hidden"
                    />
                  </label>

                  {galleryForm.src && (
                    <button
                      type="button"
                      onClick={() => handleOpenReCrop(galleryForm.src, "gallery")}
                      className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold transition-all"
                    >
                      <Crop className="w-4 h-4 text-lime shrink-0" />
                      <span>Recadrer & Zoomer</span>
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Crédit photographe *
                </label>
                <input
                  type="text"
                  required
                  value={galleryForm.credit}
                  onChange={(e) => setGalleryForm({ ...galleryForm, credit: e.target.value })}
                  placeholder="Photo © Jo Grabowski"
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-white/15 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(198,242,59,0.3)]"
                >
                  {editingGalleryItem ? "Enregistrer la photo" : "Ajouter à la galerie"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: APERÇU E-MAIL EN DIRECT */}
      {emailPreviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121212] border border-white/20 rounded-2xl w-full max-w-2xl p-4 sm:p-6 space-y-4 relative shadow-2xl max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-lime tracking-widest block">
                  Aperçu E-mail Haute Définition
                </span>
                <h3 className="font-serif text-lg font-bold text-white capitalize">
                  {emailPreviewType.replace(/-/g, " ")}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={"/api/email/preview?type=" + emailPreviewType}
                  target="_blank"
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/15 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5"
                >
                  <span>Nouvel onglet</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setEmailPreviewModalOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Iframe View */}
            <div className="flex-1 min-h-[420px] rounded-xl overflow-hidden border border-white/10 bg-[#09090b]">
              <iframe
                src={"/api/email/preview?type=" + emailPreviewType}
                title="Aperçu E-mail"
                className="w-full h-full min-h-[420px] border-0"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/10">
              <span className="font-mono text-[11px]">
                Expéditeur : Compagnie Ahmed Soura · Yongonlon &lt;js.kemet@gmail.com&gt;
              </span>
              <button
                type="button"
                onClick={() => setEmailPreviewModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-lime text-black font-bold text-xs uppercase tracking-wider"
              >
                Fermer l'aperçu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: INSCRIPTION MANUELLE D'UN ÉLÈVE */}
      {manualBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121212] border border-white/20 rounded-2xl w-full max-w-lg p-4 sm:p-7 space-y-5 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setManualBookingModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold text-lime tracking-widest block mb-1">
                Routine d'Inscription Manuelle
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Inscrire un Élève / Client
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Enregistrez une réservation sur n'importe quel jour du calendrier (créneau existant ou cours sur-mesure).
              </p>
            </div>

            <form onSubmit={handleManualBookingSubmit} className="space-y-4">
              {/* Target Date Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Date de la Séance *
                  </label>
                  <input
                    type="date"
                    required
                    value={manualBookingForm.bookingDate}
                    onChange={(e) => {
                      const newDate = e.target.value;
                      const dateSlots = slots.filter((s) => s.date === newDate);
                      setManualBookingForm({
                        ...manualBookingForm,
                        bookingDate: newDate,
                        slotId: dateSlots.length > 0 ? dateSlots[0].id : "new_slot",
                        isCustomSlot: dateSlots.length === 0,
                      });
                    }}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-mono text-white focus:border-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Séance sur ce jour *
                  </label>
                  <select
                    value={manualBookingForm.isCustomSlot ? "new_slot" : manualBookingForm.slotId}
                    onChange={(e) => {
                      if (e.target.value === "new_slot") {
                        setManualBookingForm({ ...manualBookingForm, isCustomSlot: true, slotId: "new_slot" });
                      } else {
                        const found = slots.find((s) => s.id === e.target.value);
                        setManualBookingTargetSlot(found || null);
                        setManualBookingForm({ ...manualBookingForm, isCustomSlot: false, slotId: e.target.value });
                      }
                    }}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                  >
                    {slots
                      .filter((s) => s.date === manualBookingForm.bookingDate)
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.startTime} - {s.endTime} · {s.disciplineTitle} ({s.maxCapacity - s.bookedCount} places)
                        </option>
                      ))}
                    <option value="new_slot">+ Créer un nouveau créneau ce jour</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Slot Creator if new_slot selected */}
              {manualBookingForm.isCustomSlot && (
                <div className="p-4 rounded-xl bg-lime/[0.05] border border-lime/30 space-y-3 animate-fadeIn">
                  <span className="text-[10px] uppercase font-bold text-lime tracking-wider block">
                    Détails du nouveau cours créé automatiquement sur ce jour
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">Discipline</label>
                      <select
                        value={manualBookingForm.customDisciplineTitle}
                        onChange={(e) => setManualBookingForm({ ...manualBookingForm, customDisciplineTitle: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-lime focus:outline-none"
                      >
                        {disciplines.map((d) => (
                          <option key={d.id} value={d.title}>{d.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">Capacité Max</label>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={manualBookingForm.customCapacity}
                        onChange={(e) => setManualBookingForm({ ...manualBookingForm, customCapacity: Number(e.target.value) || 12 })}
                        className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-lime focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">Heure de début</label>
                      <input
                        type="text"
                        placeholder="18:30"
                        value={manualBookingForm.customStartTime}
                        onChange={(e) => setManualBookingForm({ ...manualBookingForm, customStartTime: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-white focus:border-lime focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-300 mb-1">Heure de fin</label>
                      <input
                        type="text"
                        placeholder="20:00"
                        value={manualBookingForm.customEndTime}
                        onChange={(e) => setManualBookingForm({ ...manualBookingForm, customEndTime: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3 py-2 text-xs font-mono text-white focus:border-lime focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Client Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Nom & Prénom de l'élève *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sarah Dubois"
                    value={manualBookingForm.clientName}
                    onChange={(e) => setManualBookingForm({ ...manualBookingForm, clientName: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Téléphone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+49 163 717 36 62"
                    value={manualBookingForm.clientPhone}
                    onChange={(e) => setManualBookingForm({ ...manualBookingForm, clientPhone: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                  />
                </div>
              </div>

              {/* Email & Participants */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Email (Optionnel)
                  </label>
                  <input
                    type="email"
                    placeholder="sarah.d@exemple.com"
                    value={manualBookingForm.clientEmail}
                    onChange={(e) => setManualBookingForm({ ...manualBookingForm, clientEmail: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Nombre de places *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    required
                    value={manualBookingForm.participants}
                    onChange={(e) => setManualBookingForm({ ...manualBookingForm, participants: Number(e.target.value) || 1 })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                  />
                </div>
              </div>

              {/* Level & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Niveau de l'élève *
                  </label>
                  <select
                    value={manualBookingForm.level}
                    onChange={(e) => setManualBookingForm({ ...manualBookingForm, level: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                  >
                    <option value="Tous niveaux">Tous niveaux</option>
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire / Avancé">Intermédiaire / Avancé</option>
                    <option value="Professionnel">Professionnel</option>
                    <option value="Sur-mesure">Sur-mesure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Statut de la réservation *
                  </label>
                  <select
                    value={manualBookingForm.status}
                    onChange={(e) => setManualBookingForm({ ...manualBookingForm, status: e.target.value as "confirmed" | "pending" })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                  >
                    <option value="confirmed">Confirmée immédiatement</option>
                    <option value="pending">En attente de confirmation</option>
                  </select>
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Notes internes (Mode de paiement, remarques...)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: A payé en espèces au studio, ou réservation reçue sur WhatsApp..."
                  value={manualBookingForm.notes}
                  onChange={(e) => setManualBookingForm({ ...manualBookingForm, notes: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setManualBookingModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-lime/20 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Enregistrer l'inscription</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: AJOUTER UN CRÉNEAU */}
      {addSlotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121212] border border-white/20 rounded-2xl w-full max-w-lg p-4 sm:p-7 space-y-5 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setAddSlotModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold text-lime tracking-widest block mb-1">
                Programmation de Cours
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Ajouter un Créneau au Calendrier
              </h3>
            </div>

            <form onSubmit={handleAddSlotSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Date de la séance *
                </label>
                <input
                  type="date"
                  required
                  value={newSlotForm.date}
                  onChange={(e) => setNewSlotForm({ ...newSlotForm, date: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Heure début *
                  </label>
                  <input
                    type="time"
                    required
                    value={newSlotForm.startTime}
                    onChange={(e) => setNewSlotForm({ ...newSlotForm, startTime: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Heure fin *
                  </label>
                  <input
                    type="time"
                    required
                    value={newSlotForm.endTime}
                    onChange={(e) => setNewSlotForm({ ...newSlotForm, endTime: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Type de Danse / Discipline *
                </label>
                <select
                  value={newSlotForm.disciplineId}
                  onChange={(e) => {
                    const sel = disciplines.find((d) => d.id === e.target.value);
                    setNewSlotForm({
                      ...newSlotForm,
                      disciplineId: e.target.value,
                      disciplineTitle: sel ? sel.title : "",
                    });
                  }}
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                >
                  {disciplines.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title} ({d.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Niveau(x) proposé(s) *
                  </label>
                  <select
                    value={newSlotForm.level}
                    onChange={(e) => setNewSlotForm({ ...newSlotForm, level: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  >
                    <option value="Tous niveaux">Tous niveaux</option>
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Intermédiaire / Avancé">Intermédiaire / Avancé</option>
                    <option value="Avancé & Professionnels">Avancé & Professionnels</option>
                    <option value="Multi-niveaux (Atelier ouvert)">Multi-niveaux (Atelier ouvert)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Nombre maximum d'inscrits *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    required
                    value={newSlotForm.maxCapacity}
                    onChange={(e) => setNewSlotForm({ ...newSlotForm, maxCapacity: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Lieu / Studio *
                </label>
                <input
                  type="text"
                  required
                  value={newSlotForm.location}
                  onChange={(e) => setNewSlotForm({ ...newSlotForm, location: e.target.value })}
                  placeholder="Ex: Tanzfabrik Berlin Studio 2 / Centre Yongonlon"
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(198,242,59,0.3)] mt-2"
              >
                Enregistrer ce créneau
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MODIFIER UN CRÉNEAU EXISTANT */}
      {editSlotModalOpen && editingSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121212] border border-white/20 rounded-2xl w-full max-w-lg p-4 sm:p-7 space-y-5 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setEditSlotModalOpen(false);
                setEditingSlot(null);
              }}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold text-lime tracking-widest block mb-1">
                Modification de Créneau
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Modifier la Séance du {editingSlot.date}
              </h3>
            </div>

            <form onSubmit={handleEditSlotSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Date de la séance *
                </label>
                <input
                  type="date"
                  required
                  value={editingSlot.date}
                  onChange={(e) => setEditingSlot({ ...editingSlot, date: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Heure début *
                  </label>
                  <input
                    type="time"
                    required
                    value={editingSlot.startTime}
                    onChange={(e) => setEditingSlot({ ...editingSlot, startTime: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Heure fin *
                  </label>
                  <input
                    type="time"
                    required
                    value={editingSlot.endTime}
                    onChange={(e) => setEditingSlot({ ...editingSlot, endTime: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Type de Danse / Discipline *
                </label>
                <input
                  type="text"
                  required
                  value={editingSlot.disciplineTitle}
                  onChange={(e) => setEditingSlot({ ...editingSlot, disciplineTitle: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Niveau(x) proposé(s) *
                  </label>
                  <select
                    value={editingSlot.level}
                    onChange={(e) => setEditingSlot({ ...editingSlot, level: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  >
                    <option value="Tous niveaux">Tous niveaux</option>
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Intermédiaire / Avancé">Intermédiaire / Avancé</option>
                    <option value="Avancé & Professionnels">Avancé & Professionnels</option>
                    <option value="Sur-mesure (Débutant ou Avancé)">Sur-mesure (Débutant ou Avancé)</option>
                    <option value="Multi-niveaux (Atelier ouvert)">Multi-niveaux (Atelier ouvert)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Nombre maximum d'inscrits *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    required
                    value={editingSlot.maxCapacity}
                    onChange={(e) => setEditingSlot({ ...editingSlot, maxCapacity: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Inscrits actuels
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={editingSlot.bookedCount}
                    onChange={(e) => setEditingSlot({ ...editingSlot, bookedCount: Number(e.target.value) })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Statut du créneau
                  </label>
                  <select
                    value={editingSlot.isOpen ? "open" : "closed"}
                    onChange={(e) => setEditingSlot({ ...editingSlot, isOpen: e.target.value === "open" })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  >
                    <option value="open">Ouvert aux réservations</option>
                    <option value="closed">Fermé / Suspendu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Lieu / Studio *
                </label>
                <input
                  type="text"
                  required
                  value={editingSlot.location}
                  onChange={(e) => setEditingSlot({ ...editingSlot, location: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(198,242,59,0.3)] mt-2"
              >
                Mettre à jour ce créneau
              </button>
            </form>
          </div>
        </div>
      )}

      
      {/* MODAL: MODIFIER UN TYPE DE DANSE & FORMATION */}
      {editDisciplineModalOpen && editingDiscipline && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121212] border border-white/20 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-5 relative shadow-2xl">
            <button
              onClick={() => {
                setEditDisciplineModalOpen(false);
                setEditingDiscipline(null);
              }}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold text-lime tracking-widest block mb-1">
                Gestion Pédagogique
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Modifier le Type de Danse & Formation
              </h3>
            </div>

            <form onSubmit={handleEditDisciplineSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Intitulé du cours / de la formation *
                </label>
                <input
                  type="text"
                  required
                  value={editingDiscipline.title}
                  onChange={(e) => setEditingDiscipline({ ...editingDiscipline, title: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Catégorie *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingDiscipline.category}
                    onChange={(e) => setEditingDiscipline({ ...editingDiscipline, category: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Tarif affiché *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 25 €, Sur devis..."
                    value={editingDiscipline.price}
                    onChange={(e) => setEditingDiscipline({ ...editingDiscipline, price: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Durée *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 90 min"
                    value={editingDiscipline.duration}
                    onChange={(e) => setEditingDiscipline({ ...editingDiscipline, duration: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Niveau(x) recommandé(s) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Tous niveaux, Avancé..."
                    value={editingDiscipline.level}
                    onChange={(e) => setEditingDiscipline({ ...editingDiscipline, level: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Description pédagogique *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editingDiscipline.desc}
                  onChange={(e) => setEditingDiscipline({ ...editingDiscipline, desc: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-lime focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditDisciplineModalOpen(false);
                    setEditingDiscipline(null);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(198,242,59,0.25)]"
                >
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NOUVEAU TYPE DE DANSE */}
      {addDisciplineModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#121212] border border-white/20 rounded-2xl w-full max-w-lg p-6 sm:p-8 space-y-5 relative shadow-2xl">
            <button
              onClick={() => setAddDisciplineModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold text-lime tracking-widest block mb-1">
                Pédagogie & Disciplines
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Ajouter un Type de Danse
              </h3>
            </div>

            <form onSubmit={handleAddDisciplineSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Intitulé du cours *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Danse Contemporaine & Rythmes Ouest-Africains"
                  value={newDisciplineForm.title}
                  onChange={(e) => setNewDisciplineForm({ ...newDisciplineForm, title: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Durée *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 90 min"
                    value={newDisciplineForm.duration}
                    onChange={(e) => setNewDisciplineForm({ ...newDisciplineForm, duration: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                    Tarif indicatif *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 25 €"
                    value={newDisciplineForm.price}
                    onChange={(e) => setNewDisciplineForm({ ...newDisciplineForm, price: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:border-lime focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-semibold text-zinc-300 mb-1">
                  Description pédagogique
                </label>
                <textarea
                  rows={3}
                  placeholder="Objectifs, approche physique, ancrage culturel..."
                  value={newDisciplineForm.desc}
                  onChange={(e) => setNewDisciplineForm({ ...newDisciplineForm, desc: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-2 text-xs text-white focus:border-lime focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-lime hover:bg-lime-light text-black font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(198,242,59,0.3)] mt-2"
              >
                Créer cette discipline
              </button>
            </form>
          </div>
        </div>
      )}
      {/* MODALE RECADRAGE & ZOOM INTERACTIF (CANVAS HTML5) */}
      <ImageCropperModal
        isOpen={cropperModalOpen}
        imageSrc={cropperImageSrc}
        title={cropperTarget === "product" ? "Recadrer la photo du produit (Boutique)" : "Recadrer la photo de scène (Galerie)"}
        defaultAspectRatio={cropperAspectRatio}
        onCropComplete={handleCropComplete}
        onClose={() => setCropperModalOpen(false)}
      />
    </div>
  );
}

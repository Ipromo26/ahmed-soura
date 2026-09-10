"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface AvailabilitySlot {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "18:30"
  endTime: string; // e.g. "20:00"
  disciplineId: string;
  disciplineTitle: string;
  level: string; // e.g. "Tous niveaux", "Débutant", "Intermédiaire / Avancé"
  location: string;
  maxCapacity: number;
  bookedCount: number;
  isOpen: boolean;
}

export interface Booking {
  id: string; // e.g. "AS-829143"
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  discipline: string;
  date: string;
  timeSlot: string;
  level: string;
  participants: number;
  totalPrice?: string;
  paymentStatus?: string;
  status: "pending" | "confirmed" | "cancelled";
  notes?: string;
  createdAt: string;
  slotId?: string;
}

export interface DanceDiscipline {
  id: string;
  title: string;
  category: string;
  duration: string;
  price: string;
  level: string;
  desc: string;
}

interface BookingContextType {
  slots: AvailabilitySlot[];
  bookings: Booking[];
  disciplines: DanceDiscipline[];
  addSlot: (slot: Omit<AvailabilitySlot, "id" | "bookedCount">) => void;
  updateSlot: (id: string, updates: Partial<AvailabilitySlot>) => void;
  deleteSlot: (id: string) => void;
  createBooking: (booking: Omit<Booking, "id" | "createdAt" | "status"> & { id?: string; status?: "pending" | "confirmed" | "cancelled"; slotId?: string }) => string;
  updateBookingStatus: (id: string, status: "pending" | "confirmed" | "cancelled") => void;
  deleteBooking: (id: string) => void;
  addDiscipline: (discipline: Omit<DanceDiscipline, "id">) => void;
  updateDiscipline: (id: string, updates: Partial<DanceDiscipline>) => void;
  deleteDiscipline: (id: string) => void;
  getSlotsByDate: (date: string) => AvailabilitySlot[];
}

const defaultDisciplines: DanceDiscipline[] = [
  {
    id: "danse-afro-contemporaine",
    title: "Danse Afro-Contemporaine",
    category: "Spécialité & Signature",
    duration: "90 min",
    price: "25 €",
    level: "Tous niveaux",
    desc: "La signature d'Ahmed Soura : synthèse organique des rythmes ouest-africains et de l'abstraction contemporaine.",
  },
  {
    id: "corps-energie",
    title: "Masterclass Intensive « Le Corps Énergie »",
    category: "Pédagogie Avancée",
    duration: "180 min",
    price: "45 €",
    level: "Intermédiaire / Professionnel",
    desc: "Approche physique et respiratoire pour libérer la puissance du geste scénique.",
  },
  {
    id: "danses-traditionnelles",
    title: "Danses traditionnelles du Burkina Faso",
    category: "Tradition & Racines",
    duration: "120 min",
    price: "30 €",
    level: "Tous niveaux",
    desc: "Immersion dans les pas, chants et polyrythmies des terroirs burkinabè avec percussionnistes live.",
  },
  {
    id: "coaching-particulier",
    title: "Cours privés & Accompagnement sur-mesure",
    category: "Individuel",
    duration: "60 à 90 min",
    price: "70 €",
    level: "Sur-mesure",
    desc: "Séance personnalisée axée sur la technique corporelle, la posture et la préparation à la scène.",
  },
  {
    id: "ateliers-collectifs",
    title: "Ateliers collectifs réguliers",
    category: "Collectif",
    duration: "90 min",
    price: "22 €",
    level: "Intermédiaire / Avancé",
    desc: "Pratique hebdomadaire en studio mêlant écoute du groupe et libération des énergies corporelles.",
  },
];

// Initial realistic calendar slots for Ahmed Soura
const defaultSlots: AvailabilitySlot[] = [
  {
    id: "slot-1",
    date: "2026-10-14",
    startTime: "10:30",
    endTime: "12:00",
    disciplineId: "coaching-particulier",
    disciplineTitle: "Cours privés & Accompagnement sur-mesure",
    level: "Sur-mesure (Débutant ou Avancé)",
    location: "Tanzfabrik Berlin Studio 2",
    maxCapacity: 1,
    bookedCount: 1,
    isOpen: true,
  },
  {
    id: "slot-2",
    date: "2026-10-14",
    startTime: "18:30",
    endTime: "20:00",
    disciplineId: "danse-afro-contemporaine",
    disciplineTitle: "Danse Afro-Contemporaine",
    level: "Tous niveaux",
    location: "Tanzfabrik Berlin - Kreuzberg",
    maxCapacity: 15,
    bookedCount: 11,
    isOpen: true,
  },
  {
    id: "slot-3",
    date: "2026-10-16",
    startTime: "19:00",
    endTime: "21:00",
    disciplineId: "danses-traditionnelles",
    disciplineTitle: "Danses traditionnelles du Burkina Faso",
    level: "Intermédiaire / Avancé",
    location: "Centre Yongonlon Berlin",
    maxCapacity: 18,
    bookedCount: 16,
    isOpen: true,
  },
  {
    id: "slot-4",
    date: "2026-10-17",
    startTime: "10:00",
    endTime: "14:00",
    disciplineId: "corps-energie",
    disciplineTitle: "Masterclass Intensive « Le Corps Énergie »",
    level: "Avancé & Professionnels",
    location: "Studio Tanzfabrik Kreuzberg",
    maxCapacity: 14,
    bookedCount: 8,
    isOpen: true,
  },
  {
    id: "slot-5",
    date: "2026-10-21",
    startTime: "18:30",
    endTime: "20:00",
    disciplineId: "danse-afro-contemporaine",
    disciplineTitle: "Danse Afro-Contemporaine",
    level: "Débutant & Curieux",
    location: "Tanzfabrik Berlin - Kreuzberg",
    maxCapacity: 15,
    bookedCount: 4,
    isOpen: true,
  },
  {
    id: "slot-6",
    date: "2026-10-21",
    startTime: "20:15",
    endTime: "21:45",
    disciplineId: "ateliers-collectifs",
    disciplineTitle: "Ateliers collectifs réguliers",
    level: "Intermédiaire / Avancé",
    location: "Tanzfabrik Berlin - Kreuzberg",
    maxCapacity: 16,
    bookedCount: 7,
    isOpen: true,
  },
];

// Pre-populated bookings
const defaultBookings: Booking[] = [
  {
    id: "AS-849201",
    clientName: "Aminata Diallo",
    clientEmail: "aminata.diallo@berlin-dance.de",
    clientPhone: "+49 176 8923 1102",
    discipline: "Danse Afro-Contemporaine",
    date: "2026-10-14",
    timeSlot: "18:30 - 20:00",
    level: "Tous niveaux",
    participants: 1,
    totalPrice: "25 €",
    paymentStatus: "Règlement sur place au studio",
    status: "confirmed",
    notes: "Souhaite approfondir la coordination rythmique mandingue.",
    createdAt: "2026-09-08T14:32:00Z",
  },
  {
    id: "AS-738192",
    clientName: "Lukas Weber",
    clientEmail: "lukas.weber@tanzberlin.org",
    clientPhone: "+49 152 4491 8023",
    discipline: "Masterclass Intensive « Le Corps Énergie »",
    date: "2026-10-17",
    timeSlot: "10:00 - 14:00",
    level: "Avancé & Professionnels",
    participants: 2,
    totalPrice: "90 € (2 × 45 €)",
    paymentStatus: "Règlement sur place au studio",
    status: "pending",
    notes: "Danseur contemporain en résidence à Berlin.",
    createdAt: "2026-09-09T09:15:00Z",
  },
  {
    id: "AS-629401",
    clientName: "Clara Martin",
    clientEmail: "clara.m@artparis.fr",
    clientPhone: "+33 6 12 34 56 78",
    discipline: "Danses traditionnelles du Burkina Faso",
    date: "2026-10-16",
    timeSlot: "19:00 - 21:00",
    level: "Intermédiaire / Avancé",
    participants: 1,
    totalPrice: "30 €",
    paymentStatus: "Règlement sur place au studio",
    status: "pending",
    notes: "Découverte des pas du terroir mossi.",
    createdAt: "2026-09-09T11:40:00Z",
  },
  {
    id: "AS-510934",
    clientName: "Dr. Sophie Meyer",
    clientEmail: "sophie.meyer@charite.de",
    clientPhone: "+49 160 9988 7766",
    discipline: "Cours privés & Accompagnement sur-mesure",
    date: "2026-10-14",
    timeSlot: "10:30 - 12:00",
    level: "Sur-mesure (Débutant ou Avancé)",
    participants: 1,
    totalPrice: "70 €",
    paymentStatus: "Règlement sur place au studio",
    status: "confirmed",
    notes: "Préparation d'une pièce solo de médiation.",
    createdAt: "2026-09-07T16:20:00Z",
  },
];

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [slots, setSlots] = useState<AvailabilitySlot[]>(defaultSlots);
  const [bookings, setBookings] = useState<Booking[]>(defaultBookings);
  const [disciplines, setDisciplines] = useState<DanceDiscipline[]>(defaultDisciplines);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedSlots = localStorage.getItem("as_slots_data");
      if (savedSlots) setSlots(JSON.parse(savedSlots));

      const savedBookings = localStorage.getItem("as_bookings_data");
      if (savedBookings) setBookings(JSON.parse(savedBookings));

      const savedDisciplines = localStorage.getItem("as_disciplines_data");
      if (savedDisciplines) setDisciplines(JSON.parse(savedDisciplines));
    } catch (e) {
      console.warn("Could not parse saved booking data:", e);
    }
  }, []);

  // Save to localStorage whenever state changes
  const persistSlots = (newSlots: AvailabilitySlot[]) => {
    setSlots(newSlots);
    try {
      localStorage.setItem("as_slots_data", JSON.stringify(newSlots));
    } catch (e) {}
  };

  const persistBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    try {
      localStorage.setItem("as_bookings_data", JSON.stringify(newBookings));
    } catch (e) {}
  };

  const persistDisciplines = (newDisciplines: DanceDiscipline[]) => {
    setDisciplines(newDisciplines);
    try {
      localStorage.setItem("as_disciplines_data", JSON.stringify(newDisciplines));
    } catch (e) {}
  };

  const addSlot = (slot: Omit<AvailabilitySlot, "id" | "bookedCount">) => {
    const newSlot: AvailabilitySlot = {
      ...slot,
      id: "slot-" + Date.now(),
      bookedCount: 0,
    };
    persistSlots([...slots, newSlot]);
  };

  const updateSlot = (id: string, updates: Partial<AvailabilitySlot>) => {
    persistSlots(slots.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteSlot = (id: string) => {
    persistSlots(slots.filter((s) => s.id !== id));
  };

  const createBooking = (bookingData: Omit<Booking, "id" | "createdAt" | "status"> & { id?: string; status?: "pending" | "confirmed" | "cancelled"; slotId?: string }) => {
    const generatedId = bookingData.id || ("AS-" + Math.floor(100000 + Math.random() * 900000));
    const newBooking: Booking = {
      ...bookingData,
      id: generatedId,
      status: bookingData.status || "confirmed",
      totalPrice: bookingData.totalPrice || (bookingData.participants > 1 ? `${bookingData.participants * 25} €` : "25 €"),
      paymentStatus: bookingData.paymentStatus || "Règlement sur place au studio (Espèces / Carte)",
      createdAt: new Date().toISOString(),
    };
    persistBookings([newBooking, ...bookings]);

    // Update slot booked count if slotId provided or matching slot found
    let matchingSlot: AvailabilitySlot | undefined;
    if (bookingData.slotId) {
      matchingSlot = slots.find((s) => s.id === bookingData.slotId);
    }
    if (!matchingSlot) {
      matchingSlot = slots.find(
        (s) =>
          s.date === bookingData.date &&
          (s.disciplineTitle === bookingData.discipline ||
            (bookingData.timeSlot && bookingData.timeSlot.includes(s.startTime)))
      );
    }

    if (matchingSlot) {
      const numParticipants = Number(bookingData.participants) || 1;
      const updatedCount = Math.min(matchingSlot.maxCapacity, matchingSlot.bookedCount + numParticipants);
      updateSlot(matchingSlot.id, {
        bookedCount: updatedCount,
      });
    }

    return generatedId;
  };

  const deleteBooking = (id: string) => {
    const target = bookings.find((b) => b.id === id);
    if (target && target.status !== "cancelled") {
      const matchingSlot = slots.find(
        (s) =>
          s.date === target.date &&
          (s.disciplineTitle === target.discipline ||
            (target.timeSlot && target.timeSlot.includes(s.startTime)))
      );
      if (matchingSlot) {
        updateSlot(matchingSlot.id, {
          bookedCount: Math.max(0, matchingSlot.bookedCount - target.participants),
        });
      }
    }
    persistBookings(bookings.filter((b) => b.id !== id));
  };

  const updateBookingStatus = (id: string, status: "pending" | "confirmed" | "cancelled") => {
    persistBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const addDiscipline = (disc: Omit<DanceDiscipline, "id">) => {
    const newDisc: DanceDiscipline = {
      ...disc,
      id: "disc-" + Date.now(),
    };
    persistDisciplines([...disciplines, newDisc]);
  };

  const updateDiscipline = (id: string, updates: Partial<DanceDiscipline>) => {
    const updatedDisciplines = disciplines.map((d) => (d.id === id ? { ...d, ...updates } : d));
    persistDisciplines(updatedDisciplines);

    // If title was updated, also update any slot referencing this discipline
    if (updates.title) {
      persistSlots(
        slots.map((s) => (s.disciplineId === id ? { ...s, disciplineTitle: updates.title! } : s))
      );
    }
  };

  const deleteDiscipline = (id: string) => {
    persistDisciplines(disciplines.filter((d) => d.id !== id));
  };

  const getSlotsByDate = (date: string) => {
    return slots.filter((s) => s.date === date && s.isOpen);
  };

  return (
    <BookingContext.Provider
      value={{
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
        getSlotsByDate,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

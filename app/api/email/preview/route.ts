import { NextRequest, NextResponse } from "next/server";
import { renderClientBookingEmail } from "@/lib/email/templates/booking-client";
import { renderAdminBookingNotification } from "@/lib/email/templates/booking-admin";
import { renderClientContactEmail } from "@/lib/email/templates/contact-client";
import { renderAdminContactNotification } from "@/lib/email/templates/contact-admin";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "booking-client-fr";

  const sampleBooking = {
    bookingId: "AS-" + Math.floor(100000 + Math.random() * 900000),
    clientName: "Aminata Diallo",
    clientEmail: "aminata.diallo@berlin-dance.de",
    clientPhone: "+49 176 8923 1102",
    discipline: "Danse Afro-Contemporaine",
    date: "2026-10-14",
    timeSlot: "18:30 - 20:00",
    level: "Tous niveaux",
    participants: 1,
    studioName: "Tanzfabrik Berlin (Studio 2)",
    studioAddress: "Möckernstraße 68, 10965 Berlin",
    totalPrice: "25 €",
    notes: "Grande passionnée par le travail d'Ahmed Soura, hâte de découvrir ce nouveau module.",
  };

  const sampleContact = {
    messageId: "MSG-" + Date.now().toString(36).toUpperCase(),
    name: "Elena Rostova",
    email: "elena.r@berlin-kultur.de",
    phone: "+49 160 458 9201",
    organization: "Festival Tanz im August",
    category: "Programmation Spectacle",
    message: "Bonjour Ahmed, nous aimerions échanger avec vous concernant une diffusion de votre création chorégraphique pour notre festival l'automne prochain.",
  };

  let rendered: { subject: string; html: string; text: string };

  switch (type) {
    case "booking-client-fr":
      rendered = renderClientBookingEmail({ ...sampleBooking, locale: "fr" });
      break;
    case "booking-client-en":
      rendered = renderClientBookingEmail({ ...sampleBooking, locale: "en", discipline: "Afro-Contemporary Dance" });
      break;
    case "booking-admin":
      rendered = renderAdminBookingNotification({ ...sampleBooking, locale: "fr" });
      break;
    case "contact-client-fr":
      rendered = renderClientContactEmail({ ...sampleContact, locale: "fr" });
      break;
    case "contact-client-en":
      rendered = renderClientContactEmail({ ...sampleContact, locale: "en", category: "Festival Tour Booking" });
      break;
    case "contact-admin":
      rendered = renderAdminContactNotification({ ...sampleContact, locale: "fr" });
      break;
    default:
      rendered = renderClientBookingEmail({ ...sampleBooking, locale: "fr" });
  }

  // Return HTML with correct headers for iframe preview
  return new NextResponse(rendered.html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

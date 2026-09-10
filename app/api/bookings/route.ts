import { NextRequest, NextResponse } from "next/server";
import { sendBookingEmails } from "@/lib/email/mailer";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    supportedMethods: ["GET", "POST"],
    description: "Ahmed Soura Booking Engine API Endpoint with Automatic Bilingual Email Confirmations & Receipts",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.clientName || !body.clientPhone || !body.date || !body.discipline) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants: clientName, clientPhone, date, discipline." },
        { status: 400 }
      );
    }

    // Keep client-generated ref if valid (e.g. AS-XXXXXX), or generate a new one
    const generatedId = body.bookingId && /^AS-\d{6}$/.test(body.bookingId) 
      ? body.bookingId 
      : "AS-" + Math.floor(100000 + Math.random() * 900000);

    const clientEmail = body.clientEmail || `${body.clientName.toLowerCase().replace(/\s+/g, ".")}@client.yongonlon.com`;
    const locale = body.locale === "en" ? "en" : "fr";
    const participants = Number(body.participants) || 1;
    const totalPrice = body.totalPrice || (participants > 1 ? `${participants * 25} € (${participants} × 25 €)` : "25 €");
    const paymentStatus = body.paymentStatus || (locale === "en" ? "Payable on site at studio (Cash / Card) — Guaranteed" : "Règlement sur place au studio (Espèces / Carte) — Garanti");

    const bookingData = {
      id: generatedId,
      clientName: body.clientName,
      clientEmail,
      clientPhone: body.clientPhone,
      discipline: body.discipline,
      date: body.date,
      timeSlot: body.timeSlot || "18:30 - 20:00",
      level: body.level || "Tous niveaux",
      participants,
      totalPrice,
      paymentStatus,
      status: body.status || "confirmed",
      notes: body.notes || "",
      createdAt: new Date().toISOString(),
    };

    // Dispatch bilingual emails (Official Receipt to Client + Alert to Ahmed Soura / js.kemet@gmail.com)
    let emailDispatch = null;
    try {
      emailDispatch = await sendBookingEmails({
        bookingId: generatedId,
        clientName: body.clientName,
        clientEmail,
        clientPhone: body.clientPhone,
        discipline: body.discipline,
        date: body.date,
        timeSlot: bookingData.timeSlot,
        level: bookingData.level,
        participants: bookingData.participants,
        totalPrice,
        paymentStatus,
        notes: body.notes,
        locale,
      });
    } catch (emailErr: any) {
      console.warn("[EMAIL SEND WARNING]", emailErr.message);
    }

    return NextResponse.json({
      success: true,
      bookingId: generatedId,
      booking: bookingData,
      emailDispatch,
      whatsAppDirectUrl: `https://wa.me/${body.clientPhone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent("Bonjour " + body.clientName + ", votre reçu de réservation " + generatedId + " pour le cours de " + body.discipline + " est bien confirmé !")}`,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erreur lors de l'enregistrement de la réservation: " + err.message },
      { status: 500 }
    );
  }
}

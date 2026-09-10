import { NextRequest, NextResponse } from "next/server";
import { sendContactEmails } from "@/lib/email/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Les champs nom, email et message sont obligatoires." },
        { status: 400 }
      );
    }

    const messageId = "MSG-" + Date.now().toString(36).toUpperCase();
    const locale = body.locale === "en" ? "en" : "fr";

    // Send emails: Client confirmation (FR/EN) + Admin alert on js.kemet@gmail.com
    let emailDispatch = null;
    try {
      emailDispatch = await sendContactEmails({
        messageId,
        name: body.name,
        email: body.email,
        phone: body.phone,
        organization: body.organization,
        category: body.category,
        message: body.message,
        locale,
      });
    } catch (emailErr: any) {
      console.warn("[EMAIL SEND WARNING]", emailErr.message);
    }

    // Prepare WhatsApp format message for Ahmed Soura (+49 163 717 36 62)
    const formattedWhatsApp = `https://wa.me/491637173662?text=${encodeURIComponent(
      `*Nouveau message reçu (Réf: ${messageId})*\n\nDe: ${body.name}\nEmail: ${body.email}\nCatégorie: ${body.category || "Général"}\n\nMessage:\n${body.message}`
    )}`;

    return NextResponse.json({
      success: true,
      messageId,
      receivedAt: new Date().toISOString(),
      recipientWhatsApp: "+49 163 717 36 62",
      whatsAppForwardUrl: formattedWhatsApp,
      status: "transmitted",
      emailDispatch,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message: " + err.message },
      { status: 500 }
    );
  }
}

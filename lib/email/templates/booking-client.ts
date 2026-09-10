import { BookingEmailData } from "../types";
import { renderEmailWrapper } from "./styles";

/**
 * Format date string (YYYY-MM-DD) into natural localized format with weekday
 * e.g., "Mercredi 14 octobre 2026" or "Wednesday, October 14, 2026"
 */
function formatSessionDate(dateStr: string, locale: "fr" | "en" = "fr"): string {
  try {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) {
        const formatted = d.toLocaleDateString(locale === "en" ? "en-US" : "fr-FR", {
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

export function renderClientBookingEmail(data: BookingEmailData): { subject: string; html: string; text: string } {
  const isEn = data.locale === "en";

  const studio = data.studioName || "Tanzfabrik Berlin (Studio 2)";
  const address = data.studioAddress || "Möckernstraße 68, 10965 Berlin";
  const formattedDate = formatSessionDate(data.date, isEn ? "en" : "fr");
  const displayPrice = data.totalPrice || "25 € / pers.";
  const displayPaymentStatus = data.paymentStatus || (isEn ? "Payable on site at studio (Cash / Card) — Guaranteed" : "Règlement sur place au studio (Espèces / Carte) — Garanti");

  // FRENCH TEMPLATE
  if (!isEn) {
    const subject = `Confirmation & Reçu : ${data.discipline} avec Ahmed Soura ✨ (Réf : ${data.bookingId})`;
    const preheader = `Votre reçu officiel pour ${data.discipline} le ${formattedDate} (${data.timeSlot}).`;

    const htmlContent = `
      <!-- Greeting & Badge -->
      <div style="margin-bottom: 24px;">
        <span style="display: inline-block; padding: 5px 12px; background-color: rgba(198,242,59,0.12); border: 1px solid rgba(198,242,59,0.3); border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: 700; color: #c6f23b; text-transform: uppercase; margin-bottom: 12px;">
          ✓ Reçu Officiel & Réservation Confirmée
        </span>
        <h1 style="font-family: Georgia, serif; font-size: 24px; line-height: 1.3; color: #ffffff; margin: 0 0 12px 0;">
          Bonjour ${data.clientName} 🌿
        </h1>
        <p style="font-size: 14px; line-height: 1.6; color: #d4d4d8; margin: 0;">
          Nous avons le grand plaisir de vous confirmer la réservation de votre séance auprès de la <strong>Compagnie Ahmed Soura & Association Yongonlon</strong>. 
          Veuillez conserver ce courriel qui tient lieu de <strong>reçu officiel de réservation</strong>. Ahmed Soura et toute l'équipe artistique ont hâte de vous accueillir sur le parquet ! 💃✨
        </p>
      </div>

      <!-- Receipt Card -->
      <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 22px; margin-bottom: 24px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td colspan="2" style="border-bottom: 1px solid #27272a; padding-bottom: 12px; margin-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 10px; text-transform: uppercase; font-family: monospace; font-weight: 700; color: #c6f23b; letter-spacing: 0.1em; display: block;">
                  REÇU DE RÉSERVATION · SÉANCE CHORÉGRAPHIQUE
                </span>
              </div>
              <h2 style="font-family: Georgia, serif; font-size: 18px; color: #ffffff; margin: 6px 0 0 0;">
                ${data.discipline}
              </h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa; width: 42%;">
              📅 <strong>Jour & Date :</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #c6f23b; font-weight: 700; text-align: right;">
              ${formattedDate}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">
              ⏰ <strong>Créneau Horaire :</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; font-family: monospace; font-weight: 700; text-align: right;">
              ${data.timeSlot}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">
              📍 <strong>Lieu / Studio :</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; text-align: right;">
              <strong>${studio}</strong><br/>
              <span style="font-size: 11px; color: #71717a;">${address}</span>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">
              🎯 <strong>Niveau :</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; text-align: right;">
              ${data.level}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">
              👥 <strong>Participants :</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; text-align: right;">
              ${data.participants} personne${data.participants > 1 ? "s" : ""}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">
              💶 <strong>Montant / Tarif :</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #c6f23b; font-weight: 700; text-align: right;">
              ${displayPrice}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">
              💳 <strong>Modalité de règlement :</strong>
            </td>
            <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 12px; color: #10b981; font-weight: 600; text-align: right;">
              ${displayPaymentStatus}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-size: 13px; color: #a1a1aa;">
              🎫 <strong>N° de Reçu Officiel :</strong>
            </td>
            <td style="padding: 10px 0; font-size: 12px; color: #c6f23b; font-family: monospace; font-weight: 700; text-align: right;">
              ${data.bookingId}
            </td>
          </tr>
        </table>
      </div>

      <!-- Conseils Pratiques -->
      <div style="background-color: rgba(245, 158, 11, 0.05); border-left: 3px solid #f59e0b; padding: 14px 16px; border-radius: 0 12px 12px 0; margin-bottom: 24px;">
        <h3 style="font-size: 13px; color: #f59e0b; margin: 0 0 6px 0; font-weight: 700;">
          💡 Recommandations pour votre venue :
        </h3>
        <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #d4d4d8; line-height: 1.6;">
          <li>Prévoyez une tenue confortable et souple adaptée au mouvement au sol et aux percussions live.</li>
          <li>Merci d'arriver environ <strong>10 minutes à l'avance</strong> pour vous changer et vous échauffer en toute sérénité.</li>
          <li>Apportez une serviette personnelle et une gourde d'eau.</li>
        </ul>
      </div>

      <!-- Action Button -->
      <div style="text-align: center; margin-bottom: 28px;">
        <a href="https://wa.me/491637173662?text=${encodeURIComponent(`Bonjour Ahmed Soura, j'ai bien reçu mon reçu pour le cours de ${data.discipline} du ${formattedDate} (${data.timeSlot}, Réf: ${data.bookingId}).`)}"
           style="display: inline-block; background-color: #c6f23b; color: #000000; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; padding: 14px 28px; border-radius: 9999px; text-decoration: none; box-shadow: 0 4px 20px rgba(198,242,59,0.3);">
          💬 Échanger avec Ahmed sur WhatsApp
        </a>
      </div>

      <p style="font-size: 13px; line-height: 1.6; color: #a1a1aa; margin: 0; text-align: center;">
        À très bientôt sur le parquet de danse !<br/>
        <strong style="color: #ffffff; font-family: Georgia, serif; font-size: 15px;">Ahmed Soura & l'équipe Yongonlon</strong>
      </p>
    `;

    const text = `Bonjour ${data.clientName},

Votre reçu officiel et réservation pour ${data.discipline} sont bien enregistrés.
Date : ${formattedDate} à ${data.timeSlot}
Lieu : ${studio} (${address})
Tarif : ${displayPrice} (${displayPaymentStatus})
Référence / N° Reçu : ${data.bookingId}

À très bientôt,
Ahmed Soura & l'équipe Yongonlon`;

    return { subject, html: renderEmailWrapper(htmlContent, preheader), text };
  }

  // ENGLISH TEMPLATE
  const subject = `Booking Confirmation & Receipt : ${data.discipline} with Ahmed Soura ✨ (Ref: ${data.bookingId})`;
  const preheader = `Your official booking receipt for ${data.discipline} on ${formattedDate} (${data.timeSlot}).`;

  const htmlContent = `
    <!-- Greeting & Badge -->
    <div style="margin-bottom: 24px;">
      <span style="display: inline-block; padding: 5px 12px; background-color: rgba(198,242,59,0.12); border: 1px solid rgba(198,242,59,0.3); border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: 700; color: #c6f23b; text-transform: uppercase; margin-bottom: 12px;">
        ✓ Official Receipt & Booking Confirmed
      </span>
      <h1 style="font-family: Georgia, serif; font-size: 24px; line-height: 1.3; color: #ffffff; margin: 0 0 12px 0;">
        Hello ${data.clientName} 🌿
      </h1>
      <p style="font-size: 14px; line-height: 1.6; color: #d4d4d8; margin: 0;">
        We are delighted to confirm your dance session booking with <strong>Compagnie Ahmed Soura & Yongonlon Association</strong>. 
        Please keep this email as your <strong>official booking receipt</strong>. Ahmed Soura and the entire artistic team look forward to dancing with you! 💃✨
      </p>
    </div>

    <!-- Receipt Card -->
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 22px; margin-bottom: 24px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td colspan="2" style="border-bottom: 1px solid #27272a; padding-bottom: 12px; margin-bottom: 12px;">
            <span style="font-size: 10px; text-transform: uppercase; font-family: monospace; font-weight: 700; color: #c6f23b; letter-spacing: 0.1em; display: block;">
              OFFICIAL BOOKING RECEIPT · DANCE SESSION
            </span>
            <h2 style="font-family: Georgia, serif; font-size: 18px; color: #ffffff; margin: 6px 0 0 0;">
              ${data.discipline}
            </h2>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa; width: 42%;">
            📅 <strong>Day & Date:</strong>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #c6f23b; font-weight: 700; text-align: right;">
            ${formattedDate}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">
            ⏰ <strong>Time Slot:</strong>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; font-family: monospace; font-weight: 700; text-align: right;">
            ${data.timeSlot}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">
            📍 <strong>Location / Studio:</strong>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; text-align: right;">
            <strong>${studio}</strong><br/>
            <span style="font-size: 11px; color: #71717a;">${address}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">
            🎯 <strong>Level:</strong>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; text-align: right;">
            ${data.level}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">
            👥 <strong>Participants:</strong>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; text-align: right;">
            ${data.participants} dancer${data.participants > 1 ? "s" : ""}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">
            💶 <strong>Price / Tariff:</strong>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #c6f23b; font-weight: 700; text-align: right;">
            ${displayPrice}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">
            💳 <strong>Payment Status:</strong>
          </td>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 12px; color: #10b981; font-weight: 600; text-align: right;">
            ${displayPaymentStatus}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-size: 13px; color: #a1a1aa;">
            🎫 <strong>Official Receipt Code:</strong>
          </td>
          <td style="padding: 10px 0; font-size: 12px; color: #c6f23b; font-family: monospace; font-weight: 700; text-align: right;">
            ${data.bookingId}
          </td>
        </tr>
      </table>
    </div>

    <!-- Practical Tips -->
    <div style="background-color: rgba(245, 158, 11, 0.05); border-left: 3px solid #f59e0b; padding: 14px 16px; border-radius: 0 12px 12px 0; margin-bottom: 24px;">
      <h3 style="font-size: 13px; color: #f59e0b; margin: 0 0 6px 0; font-weight: 700;">
        💡 Preparation Guidelines:
      </h3>
      <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: #d4d4d8; line-height: 1.6;">
        <li>Wear flexible, comfortable clothes suitable for floor work and energetic movement.</li>
        <li>Please arrive about <strong>10 minutes prior</strong> to change and warm up calmly.</li>
        <li>Bring a personal towel and a water bottle.</li>
      </ul>
    </div>

    <!-- Action Button -->
    <div style="text-align: center; margin-bottom: 28px;">
      <a href="https://wa.me/491637173662?text=${encodeURIComponent(`Hello Ahmed Soura, I received my official receipt for ${data.discipline} on ${formattedDate} (${data.timeSlot}, Ref: ${data.bookingId}).`)}"
         style="display: inline-block; background-color: #c6f23b; color: #000000; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; padding: 14px 28px; border-radius: 9999px; text-decoration: none; box-shadow: 0 4px 20px rgba(198,242,59,0.3);">
        💬 Message Ahmed on WhatsApp
      </a>
    </div>

    <p style="font-size: 13px; line-height: 1.6; color: #a1a1aa; margin: 0; text-align: center;">
      Looking forward to dancing together!<br/>
      <strong style="color: #ffffff; font-family: Georgia, serif; font-size: 15px;">Ahmed Soura & the Yongonlon team</strong>
    </p>
  `;

  const text = `Hello ${data.clientName},

Your official receipt and booking for ${data.discipline} are confirmed.
Date: ${formattedDate} at ${data.timeSlot}
Location: ${studio} (${address})
Price: ${displayPrice} (${displayPaymentStatus})
Receipt Number: ${data.bookingId}

Warm regards,
Ahmed Soura & Yongonlon team`;

  return { subject, html: renderEmailWrapper(htmlContent, preheader), text };
}

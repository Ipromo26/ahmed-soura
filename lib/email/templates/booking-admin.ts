import { BookingEmailData } from "../types";
import { renderEmailWrapper } from "./styles";

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

export function renderAdminBookingNotification(data: BookingEmailData): { subject: string; html: string; text: string } {
  const formattedDate = formatSessionDate(data.date, "fr");
  const displayPrice = data.totalPrice || "25 € / pers.";
  const displayPaymentStatus = data.paymentStatus || "Règlement sur place au studio (Espèces / Carte)";

  const subject = `🔔 [Yongonlon Admin] Nouvelle Réservation : ${data.clientName} (${data.discipline}) - Réf: ${data.bookingId}`;
  const preheader = `Nouvelle réservation reçue de ${data.clientName} pour le cours de ${data.discipline} du ${formattedDate}.`;

  const htmlContent = `
    <div style="margin-bottom: 20px;">
      <span style="display: inline-block; padding: 4px 10px; background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: 700; color: #10b981; text-transform: uppercase; margin-bottom: 10px;">
        ● ALERTE RÉSERVATION ENTRANTE · REÇU OFFICIEL
      </span>
      <h1 style="font-family: Georgia, serif; font-size: 22px; color: #ffffff; margin: 0 0 8px 0;">
        Nouvelle Réservation Enregistrée 🎭
      </h1>
      <p style="font-size: 13px; color: #a1a1aa; margin: 0;">
        Un élève vient d'enregistrer une séance et son reçu a été généré avec succès depuis le site officiel <strong>ahmed-soura.fr</strong>.
      </p>
    </div>

    <!-- Client & Course Card -->
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td colspan="2" style="border-bottom: 1px solid #27272a; padding-bottom: 10px;">
            <span style="font-size: 10px; color: #c6f23b; font-family: monospace; font-weight: 700; text-transform: uppercase;">
              COURS SÉLECTIONNÉ
            </span>
            <div style="font-size: 16px; font-weight: bold; color: #ffffff; margin-top: 2px;">
              ${data.discipline}
            </div>
            <div style="font-size: 12px; color: #c6f23b; font-family: monospace; font-weight: 700; margin-top: 4px;">
              📅 ${formattedDate} &nbsp;·&nbsp; ⏰ ${data.timeSlot}
            </div>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">Élève :</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; font-weight: bold; text-align: right;">${data.clientName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">Email :</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #c6f23b; text-align: right;">
            <a href="mailto:${data.clientEmail}" style="color: #c6f23b; text-decoration: none;">${data.clientEmail}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">Téléphone / WhatsApp :</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; font-family: monospace; text-align: right;">
            <a href="https://wa.me/${data.clientPhone.replace(/[^0-9]/g, '')}" style="color: #ffffff; text-decoration: none; font-weight: bold;">${data.clientPhone}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">Participants & Niveau :</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; text-align: right;">
            ${data.participants} participant${data.participants > 1 ? "s" : ""} (${data.level})
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">Montant / Tarif :</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #c6f23b; font-weight: 700; text-align: right;">
            ${displayPrice}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">Modalité de paiement :</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 12px; color: #10b981; font-weight: 600; text-align: right;">
            ${displayPaymentStatus}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">N° Reçu de référence :</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 12px; color: #c6f23b; font-family: monospace; font-weight: bold; text-align: right;">
            ${data.bookingId}
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; font-size: 13px; color: #a1a1aa;">Langue de la requête :</td>
          <td style="padding: 10px 0; font-size: 13px; color: #c6f23b; text-align: right; text-transform: uppercase; font-family: monospace; font-weight: bold;">
            ${data.locale === "en" ? "🇬🇧 English" : "🇫🇷 Français"}
          </td>
        </tr>
        ${data.notes ? `
        <tr>
          <td colspan="2" style="padding-top: 12px; border-top: 1px solid #222226;">
            <span style="font-size: 11px; color: #71717a; text-transform: uppercase; font-family: monospace; display: block;">Notes de l'élève :</span>
            <p style="font-size: 12px; color: #e4e4e7; font-style: italic; margin: 4px 0 0 0; background-color: #121215; padding: 10px; border-radius: 8px;">
              « ${data.notes} »
            </p>
          </td>
        </tr>` : ""}
      </table>
    </div>

    <!-- Quick Action Buttons -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td style="padding: 0 6px 0 0; width: 50%;">
          <a href="https://wa.me/${data.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${data.clientName}, Ahmed Soura (Yongonlon) à l'appareil suite à votre réservation du cours de ${data.discipline} pour le ${formattedDate} (Réf: ${data.bookingId}).`)}"
             style="display: block; text-align: center; background-color: #25D366; color: #ffffff; font-weight: 700; font-size: 12px; padding: 12px; border-radius: 12px; text-decoration: none;">
            💬 WhatsApp Élève
          </a>
        </td>
        <td style="padding: 0 0 0 6px; width: 50%;">
          <a href="https://ahmed-soura.fr/admin"
             style="display: block; text-align: center; background-color: #c6f23b; color: #000000; font-weight: 700; font-size: 12px; padding: 12px; border-radius: 12px; text-decoration: none;">
            ⚙️ Ouvrir Admin
          </a>
        </td>
      </tr>
    </table>
  `;

  const text = `NOUVELLE RÉSERVATION YONGONLON

Élève: ${data.clientName}
Email: ${data.clientEmail}
Tél: ${data.clientPhone}
Discipline: ${data.discipline}
Date: ${formattedDate} (${data.timeSlot})
Tarif: ${displayPrice} (${displayPaymentStatus})
Réf: ${data.bookingId}`;

  return { subject, html: renderEmailWrapper(htmlContent, preheader), text };
}

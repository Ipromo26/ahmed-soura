import { BookingEmailData } from "../types";
import { renderEmailWrapper } from "./styles";

export function renderAdminBookingNotification(data: BookingEmailData): { subject: string; html: string; text: string } {
  const subject = `🔔 [Yongonlon Admin] Nouvelle Réservation : ${data.clientName} (${data.discipline}) - Réf: ${data.bookingId}`;
  const preheader = `Nouvelle réservation reçue de ${data.clientName} pour le cours de ${data.discipline} du ${data.date}.`;

  const htmlContent = `
    <div style="margin-bottom: 20px;">
      <span style="display: inline-block; padding: 4px 10px; background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: 700; color: #10b981; text-transform: uppercase; margin-bottom: 10px;">
        ● ALERTE RÉSERVATION ENTRANTES
      </span>
      <h1 style="font-family: Georgia, serif; font-size: 22px; color: #ffffff; margin: 0 0 8px 0;">
        Nouvelle Réservation Reçue 🎭
      </h1>
      <p style="font-size: 13px; color: #a1a1aa; margin: 0;">
        Un élève vient d'enregistrer une session depuis le site officiel <strong>ahmedsoura.com</strong>.
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
            <div style="font-size: 12px; color: #a1a1aa; font-family: monospace;">
              📅 ${data.date} &nbsp;·&nbsp; ⏰ ${data.timeSlot}
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
          <a href="https://wa.me/${data.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${data.clientName}, Ahmed Soura à l'appareil suite à votre réservation du cours de ${data.discipline}.`)}"
             style="display: block; text-align: center; background-color: #25D366; color: #ffffff; font-weight: 700; font-size: 12px; padding: 12px; border-radius: 12px; text-decoration: none;">
            💬 WhatsApp Client
          </a>
        </td>
        <td style="padding: 0 0 0 6px; width: 50%;">
          <a href="https://ahmedsoura.com/admin"
             style="display: block; text-align: center; background-color: #c6f23b; color: #000000; font-weight: 700; font-size: 12px; padding: 12px; border-radius: 12px; text-decoration: none;">
            ⚙️ Ouvrir Admin
          </a>
        </td>
      </tr>
    </table>
  `;

  const text = `NOUVELLE RÉSERVATION YONGONLON\n\nÉlève: ${data.clientName}\nEmail: ${data.clientEmail}\nTél: ${data.clientPhone}\nDiscipline: ${data.discipline}\nDate: ${data.date} (${data.timeSlot})\nRéf: ${data.bookingId}`;

  return { subject, html: renderEmailWrapper(htmlContent, preheader), text };
}

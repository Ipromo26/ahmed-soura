import { ContactEmailData } from "../types";
import { renderEmailWrapper, getAdminUrl, getSiteBaseUrl } from "./styles";

export function renderAdminContactNotification(data: ContactEmailData): { subject: string; html: string; text: string } {
  const subject = `📬 [Yongonlon Contact] Message de ${data.name} (${data.category || "Général"}) - Réf: ${data.messageId}`;
  const preheader = `Nouveau message reçu sur le site de Yongonlon / Ahmed Soura de la part de ${data.name}.`;

  const htmlContent = `
    <div style="margin-bottom: 20px;">
      <span style="display: inline-block; padding: 4px 10px; background-color: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: 700; color: #60a5fa; text-transform: uppercase; margin-bottom: 10px;">
        ● NOUVEAU MESSAGE CONTACT WEB
      </span>
      <h1 style="font-family: Georgia, serif; font-size: 22px; color: #ffffff; margin: 0 0 8px 0;">
        Message Reçu depuis le Site Yongonlon ✉️
      </h1>
      <p style="font-size: 13px; color: #a1a1aa; margin: 0;">
        Un visiteur vient de soumettre le formulaire de contact officiel sur <strong>${getSiteBaseUrl().replace('https://', '')}</strong>.
      </p>
    </div>

    <!-- Details Card -->
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa; width: 35%;">Expéditeur :</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; font-weight: bold; text-align: right;">${data.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">Email :</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #c6f23b; text-align: right;">
            <a href="mailto:${data.email}" style="color: #c6f23b; text-decoration: none;">${data.email}</a>
          </td>
        </tr>
        ${data.phone ? `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">Téléphone / WhatsApp :</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; text-align: right; font-family: monospace;">${data.phone}</td>
        </tr>` : ""}
        ${data.organization ? `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">Organisation :</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; text-align: right;">${data.organization}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #a1a1aa;">Catégorie :</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; text-align: right; text-transform: uppercase; font-weight: 600;">${data.category || "Général"}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-size: 13px; color: #a1a1aa;">Langue de la requête :</td>
          <td style="padding: 8px 0; font-size: 13px; color: #c6f23b; text-align: right; text-transform: uppercase; font-family: monospace; font-weight: bold;">
            ${data.locale === "en" ? "🇬🇧 English" : "🇫🇷 Français"}
          </td>
        </tr>
        <tr>
          <td colspan="2" style="padding-top: 14px; border-top: 1px solid #222226;">
            <span style="font-size: 11px; color: #71717a; text-transform: uppercase; font-family: monospace; display: block; margin-bottom: 6px;">Contenu du message :</span>
            <div style="font-size: 13px; color: #ffffff; line-height: 1.6; background-color: #121215; border-left: 3px solid #60a5fa; padding: 14px; border-radius: 0 10px 10px 0; white-space: pre-wrap;">${data.message}</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Actions -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td style="padding: 0 4px 0 0; width: 33%;">
          <a href="mailto:${data.email}?subject=${encodeURIComponent(`Re: Votre message auprès de la Compagnie Ahmed Soura / Yongonlon (Réf: ${data.messageId})`)}"
             style="display: block; text-align: center; background-color: #c6f23b; color: #000000; font-weight: 700; font-size: 12px; padding: 12px 6px; border-radius: 12px; text-decoration: none;">
            ✉️ Répondre
          </a>
        </td>
        <td style="padding: 0 4px; width: 33%;">
          <a href="https://wa.me/491637173662"
             style="display: block; text-align: center; background-color: #25D366; color: #ffffff; font-weight: 700; font-size: 12px; padding: 12px 6px; border-radius: 12px; text-decoration: none;">
            💬 WhatsApp
          </a>
        </td>
        <td style="padding: 0 0 0 4px; width: 34%;">
          <a href="${getAdminUrl()}"
             style="display: block; text-align: center; background-color: #27272a; border: 1px solid #3f3f46; color: #ffffff; font-weight: 700; font-size: 12px; padding: 12px 6px; border-radius: 12px; text-decoration: none;">
            ⚙️ Ouvrir Admin
          </a>
        </td>
      </tr>
    </table>
  `;

  const text = `NOUVEAU MESSAGE YONGONLON\n\nDe: ${data.name} (${data.email})\nTél: ${data.phone || "N/A"}\nCatégorie: ${data.category || "Général"}\nMessage:\n${data.message}\n\nRéf: ${data.messageId}`;

  return { subject, html: renderEmailWrapper(htmlContent, preheader), text };
}

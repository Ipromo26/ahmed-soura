import { ContactEmailData } from "../types";
import { renderEmailWrapper } from "./styles";

export function renderClientContactEmail(data: ContactEmailData): { subject: string; html: string; text: string } {
  const isEn = data.locale === "en";

  if (!isEn) {
    const subject = `Bienvenue chez Yongonlon : Nous avons bien reçu votre message 🌿 (Réf: ${data.messageId})`;
    const preheader = `Merci ${data.name}, Ahmed Soura et l'équipe Yongonlon vous répondront très rapidement.`;

    const htmlContent = `
      <div style="margin-bottom: 24px;">
        <span style="display: inline-block; padding: 5px 12px; background-color: rgba(198,242,59,0.12); border: 1px solid rgba(198,242,59,0.3); border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: 700; color: #c6f23b; text-transform: uppercase; margin-bottom: 12px;">
          ✓ Message bien transmis
        </span>
        <h1 style="font-family: Georgia, serif; font-size: 24px; line-height: 1.3; color: #ffffff; margin: 0 0 12px 0;">
          Bonjour ${data.name} ✨
        </h1>
        <p style="font-size: 14px; line-height: 1.6; color: #d4d4d8; margin: 0;">
          Merci pour votre prise de contact avec la <strong>Compagnie Ahmed Soura & Association Yongonlon Arts & Cultures</strong>. 
          Que ce soit pour un cours, un atelier chorégraphique, une programmation de spectacle ou un partenariat artistique, nous sommes ravis de votre démarche.
        </p>
      </div>

      <!-- Message Recap Card -->
      <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
        <span style="font-size: 10px; font-family: monospace; font-weight: 700; color: #c6f23b; text-transform: uppercase; display: block; margin-bottom: 10px;">
          RÉCAPITULATIF DE VOTRE DEMANDE
        </span>
        <div style="font-size: 13px; color: #a1a1aa; margin-bottom: 6px;">
          <strong>Objet / Thématique :</strong> <span style="color: #ffffff;">${data.category || "Général"}</span>
        </div>
        <div style="font-size: 13px; color: #a1a1aa; margin-bottom: 12px;">
          <strong>Référence :</strong> <span style="color: #c6f23b; font-family: monospace; font-weight: bold;">${data.messageId}</span>
        </div>
        <div style="background-color: #121215; border-left: 3px solid #c6f23b; padding: 14px; border-radius: 0 10px 10px 0;">
          <span style="font-size: 11px; color: #71717a; text-transform: uppercase; font-family: monospace; display: block; margin-bottom: 4px;">Votre message :</span>
          <p style="font-size: 13px; color: #e4e4e7; line-height: 1.6; margin: 0; font-style: italic;">
            « ${data.message} »
          </p>
        </div>
      </div>

      <!-- Response commitment -->
      <div style="background-color: rgba(198, 242, 59, 0.05); border: 1px solid rgba(198, 242, 59, 0.15); border-radius: 12px; padding: 16px; margin-bottom: 24px;">
        <p style="font-size: 13px; color: #d4d4d8; margin: 0; line-height: 1.5;">
          ⏱️ <strong>Délai de réponse :</strong> Ahmed Soura ou notre coordinateur artistique reviendront vers vous sous <strong>24 à 48 heures ouvrées</strong>.
        </p>
      </div>

      <!-- Quick WhatsApp Button -->
      <div style="text-align: center; margin-bottom: 28px;">
        <a href="https://wa.me/491637173662?text=${encodeURIComponent(`Bonjour Ahmed Soura, je viens de vous envoyer un message depuis le site web (Réf: ${data.messageId}).`)}"
           style="display: inline-block; background-color: #c6f23b; color: #000000; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; padding: 14px 28px; border-radius: 9999px; text-decoration: none; box-shadow: 0 4px 20px rgba(198,242,59,0.3);">
          💬 Échanger directement sur WhatsApp
        </a>
      </div>

      <p style="font-size: 13px; line-height: 1.6; color: #a1a1aa; margin: 0; text-align: center;">
        Chaleureusement,<br/>
        <strong style="color: #ffffff; font-family: Georgia, serif; font-size: 15px;">Ahmed Soura & l'équipe Yongonlon</strong>
      </p>
    `;

    const text = `Bonjour ${data.name},

Nous avons bien reçu votre message (Réf: ${data.messageId}).
Nous reviendrons vers vous sous 24 à 48h.

Cordialement,
Ahmed Soura & l'équipe Yongonlon`;

    return { subject, html: renderEmailWrapper(htmlContent, preheader), text };
  }

  // ENGLISH
  const subject = `Welcome to Yongonlon : Message received 🌿 (Ref: ${data.messageId})`;
  const preheader = `Thank you ${data.name}, Ahmed Soura and the Yongonlon team will get back to you shortly.`;

  const htmlContent = `
    <div style="margin-bottom: 24px;">
      <span style="display: inline-block; padding: 5px 12px; background-color: rgba(198,242,59,0.12); border: 1px solid rgba(198,242,59,0.3); border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: 700; color: #c6f23b; text-transform: uppercase; margin-bottom: 12px;">
        ✓ Message Transmitted
      </span>
      <h1 style="font-family: Georgia, serif; font-size: 24px; line-height: 1.3; color: #ffffff; margin: 0 0 12px 0;">
        Hello ${data.name} ✨
      </h1>
      <p style="font-size: 14px; line-height: 1.6; color: #d4d4d8; margin: 0;">
        Thank you for reaching out to <strong>Compagnie Ahmed Soura & Yongonlon Arts & Cultures</strong>. 
        Whether you contacted us regarding dance classes, masterclasses, tour bookings, or creative collaborations, we are delighted by your interest.
      </p>
    </div>

    <!-- Message Recap Card -->
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <span style="font-size: 10px; font-family: monospace; font-weight: 700; color: #c6f23b; text-transform: uppercase; display: block; margin-bottom: 10px;">
        MESSAGE SUMMARY
      </span>
      <div style="font-size: 13px; color: #a1a1aa; margin-bottom: 6px;">
        <strong>Subject / Category:</strong> <span style="color: #ffffff;">${data.category || "General"}</span>
      </div>
      <div style="font-size: 13px; color: #a1a1aa; margin-bottom: 12px;">
        <strong>Tracking ID:</strong> <span style="color: #c6f23b; font-family: monospace; font-weight: bold;">${data.messageId}</span>
      </div>
      <div style="background-color: #121215; border-left: 3px solid #c6f23b; padding: 14px; border-radius: 0 10px 10px 0;">
        <span style="font-size: 11px; color: #71717a; text-transform: uppercase; font-family: monospace; display: block; margin-bottom: 4px;">Your message:</span>
        <p style="font-size: 13px; color: #e4e4e7; line-height: 1.6; margin: 0; font-style: italic;">
          « ${data.message} »
        </p>
      </div>
    </div>

    <!-- Response commitment -->
    <div style="background-color: rgba(198, 242, 59, 0.05); border: 1px solid rgba(198, 242, 59, 0.15); border-radius: 12px; padding: 16px; margin-bottom: 24px;">
      <p style="font-size: 13px; color: #d4d4d8; margin: 0; line-height: 1.5;">
        ⏱️ <strong>Estimated reply time:</strong> Ahmed Soura or our artistic coordinator will respond within <strong>24 to 48 business hours</strong>.
      </p>
    </div>

    <!-- Quick WhatsApp Button -->
    <div style="text-align: center; margin-bottom: 28px;">
      <a href="https://wa.me/491637173662?text=${encodeURIComponent(`Hello Ahmed Soura, I just sent you a message via the website (Ref: ${data.messageId}).`)}"
         style="display: inline-block; background-color: #c6f23b; color: #000000; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; padding: 14px 28px; border-radius: 9999px; text-decoration: none; box-shadow: 0 4px 20px rgba(198,242,59,0.3);">
        💬 Chat directly on WhatsApp
      </a>
    </div>

    <p style="font-size: 13px; line-height: 1.6; color: #a1a1aa; margin: 0; text-align: center;">
      Warm artistic regards,<br/>
      <strong style="color: #ffffff; font-family: Georgia, serif; font-size: 15px;">Ahmed Soura & the Yongonlon team</strong>
    </p>
  `;

  const text = `Hello ${data.name},

We have received your inquiry (Ref: ${data.messageId}).
We will get back to you within 24-48h.

Warm regards,
Ahmed Soura & Yongonlon team`;

  return { subject, html: renderEmailWrapper(htmlContent, preheader), text };
}

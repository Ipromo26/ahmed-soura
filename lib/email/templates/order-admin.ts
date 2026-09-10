import { OrderEmailData } from "../types";
import { renderEmailWrapper } from "./styles";

export function renderAdminOrderNotification(data: OrderEmailData): { subject: string; html: string; text: string } {
  const subject = `🛍️ [Yongonlon Boutique] Nouvelle Commande : ${data.customerName} (${data.totalAmount} €) - Réf: ${data.orderId}`;
  const preheader = `Nouvelle commande boutique de ${data.customerName} d'un montant de ${data.totalAmount} €.`;

  const itemsRows = data.items.map((item) => `
    <tr>
      <td style="padding: 8px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff;">
        ${item.title} <span style="color: #c6f23b; font-weight: bold;">(×${item.quantity})</span>
      </td>
      <td style="padding: 8px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff; font-weight: bold; text-align: right;">
        ${(item.price * item.quantity).toFixed(2)} €
      </td>
    </tr>
  `).join("");

  const fullAddress = [data.shippingAddress, data.postalCode, data.city, data.country].filter(Boolean).join(", ");

  const htmlContent = `
    <div style="margin-bottom: 20px;">
      <span style="display: inline-block; padding: 4px 10px; background-color: rgba(198, 242, 59, 0.15); border: 1px solid rgba(198, 242, 59, 0.3); border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: 700; color: #c6f23b; text-transform: uppercase; margin-bottom: 10px;">
        ● ALERTE COMMANDE BOUTIQUE
      </span>
      <h1 style="font-family: Georgia, serif; font-size: 22px; color: #ffffff; margin: 0 0 8px 0;">
        Nouvelle Commande Enregistrée 🛍️
      </h1>
      <p style="font-size: 13px; color: #a1a1aa; margin: 0;">
        Un client vient d'effectuer un achat sur la boutique officielle <strong>ahmedsoura.com</strong>.
      </p>
    </div>

    <!-- Order Specs Card -->
    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <div style="border-bottom: 1px solid #27272a; padding-bottom: 10px; margin-bottom: 12px; display: flex; justify-content: space-between;">
        <span style="font-size: 10px; color: #c6f23b; font-family: monospace; font-weight: 700; text-transform: uppercase;">
          COMMANDE N° ${data.orderId}
        </span>
        <span style="font-size: 14px; font-weight: bold; color: #c6f23b;">
          ${data.totalAmount} € Payé
        </span>
      </div>

      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px;">
        ${itemsRows}
      </table>

      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 1px solid #27272a; padding-top: 8px;">
        <tr>
          <td style="padding: 6px 0; font-size: 12px; color: #a1a1aa;">Acheteur :</td>
          <td style="padding: 6px 0; font-size: 12px; color: #ffffff; font-weight: bold; text-align: right;">${data.customerName}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 12px; color: #a1a1aa;">Email :</td>
          <td style="padding: 6px 0; font-size: 12px; color: #c6f23b; text-align: right;">
            <a href="mailto:${data.customerEmail}" style="color: #c6f23b; text-decoration: none;">${data.customerEmail}</a>
          </td>
        </tr>
        ${data.customerPhone ? `
        <tr>
          <td style="padding: 6px 0; font-size: 12px; color: #a1a1aa;">Téléphone :</td>
          <td style="padding: 6px 0; font-size: 12px; color: #ffffff; text-align: right;">${data.customerPhone}</td>
        </tr>` : ""}
        <tr>
          <td style="padding: 6px 0; font-size: 12px; color: #a1a1aa;">Adresse de livraison :</td>
          <td style="padding: 6px 0; font-size: 12px; color: #ffffff; text-align: right;">${fullAddress}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; font-size: 12px; color: #a1a1aa;">Mode de paiement :</td>
          <td style="padding: 6px 0; font-size: 12px; color: #10b981; font-weight: bold; text-align: right;">${data.paymentMethod === "card" ? "Carte Bancaire (Stripe)" : data.paymentMethod}</td>
        </tr>
      </table>
    </div>

    <!-- Quick Action Buttons -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
      <tr>
        <td style="padding: 0 6px 0 0; width: 50%;">
          <a href="https://wa.me/${(data.customerPhone || '491637173662').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Bonjour ${data.customerName}, Ahmed Soura (Yongonlon) à l'appareil suite à votre commande boutique ${data.orderId}.`)}"
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

  const text = `NOUVELLE COMMANDE BOUTIQUE YONGONLON

Client: ${data.customerName}
Email: ${data.customerEmail}
Montant: ${data.totalAmount} €
Réf: ${data.orderId}
Livraison: ${fullAddress}`;

  return { subject, html: renderEmailWrapper(htmlContent, preheader), text };
}

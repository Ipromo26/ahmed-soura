import { OrderEmailData } from "../types";
import { renderEmailWrapper } from "./styles";

export function renderClientOrderEmail(data: OrderEmailData): { subject: string; html: string; text: string } {
  const isEn = data.locale === "en";

  const itemsRows = data.items.map((item) => `
    <tr>
      <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #ffffff;">
        ${item.title} <span style="color: #a1a1aa; font-size: 11px;">(×${item.quantity})</span>
      </td>
      <td style="padding: 10px 0; border-bottom: 1px solid #222226; font-size: 13px; color: #c6f23b; font-weight: 700; text-align: right;">
        ${(item.price * item.quantity).toFixed(2)} €
      </td>
    </tr>
  `).join("");

  const fullAddress = [data.shippingAddress, data.postalCode, data.city, data.country].filter(Boolean).join(", ");

  // FRENCH TEMPLATE
  if (!isEn) {
    const subject = `Confirmation & Reçu de commande : ${data.orderId} · Boutique Yongonlon ✨`;
    const preheader = `Merci pour votre commande ${data.orderId}. Préparation en cours à Berlin.`;

    const htmlContent = `
      <!-- Greeting & Badge -->
      <div style="margin-bottom: 24px;">
        <span style="display: inline-block; padding: 5px 12px; background-color: rgba(198,242,59,0.12); border: 1px solid rgba(198,242,59,0.3); border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: 700; color: #c6f23b; text-transform: uppercase; margin-bottom: 12px;">
          ✓ Commande Confirmée · Reçu Officiel
        </span>
        <h1 style="font-family: Georgia, serif; font-size: 24px; line-height: 1.3; color: #ffffff; margin: 0 0 12px 0;">
          Merci ${data.customerName} 🌿
        </h1>
        <p style="font-size: 14px; line-height: 1.6; color: #d4d4d8; margin: 0;">
          Nous avons bien reçu votre commande sur la <strong>Boutique Officielle Ahmed Soura × Association Yongonlon</strong>. 
          Votre colis est en cours de préparation par notre équipe logistique à Berlin.
        </p>
      </div>

      <!-- Order Details Card -->
      <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 22px; margin-bottom: 24px;">
        <div style="border-bottom: 1px solid #27272a; padding-bottom: 12px; margin-bottom: 12px;">
          <span style="font-size: 10px; text-transform: uppercase; font-family: monospace; font-weight: 700; color: #c6f23b; letter-spacing: 0.1em; display: block;">
            RÉCAPITULATIF DE VOTRE COMMANDE
          </span>
          <div style="font-family: monospace; font-size: 16px; font-weight: bold; color: #ffffff; margin-top: 4px;">
            RÉFÉRENCE : ${data.orderId}
          </div>
        </div>

        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          ${itemsRows}
          <tr>
            <td style="padding: 12px 0 6px 0; font-size: 13px; color: #a1a1aa;">Sous-total :</td>
            <td style="padding: 12px 0 6px 0; font-size: 13px; color: #ffffff; text-align: right;">${data.subtotal || data.totalAmount + " €"}</td>
          </tr>
          ${data.shippingCost ? `
          <tr>
            <td style="padding: 6px 0; border-bottom: 1px solid #27272a; font-size: 13px; color: #a1a1aa;">Livraison sécurisée :</td>
            <td style="padding: 6px 0; border-bottom: 1px solid #27272a; font-size: 13px; color: #ffffff; text-align: right;">${data.shippingCost}</td>
          </tr>` : ""}
          <tr>
            <td style="padding: 12px 0; font-size: 15px; font-weight: bold; color: #ffffff;">Total TTC Payé :</td>
            <td style="padding: 12px 0; font-size: 18px; font-weight: bold; color: #c6f23b; text-align: right;">${data.totalAmount} €</td>
          </tr>
        </table>
      </div>

      <!-- Shipping Address Card -->
      <div style="background-color: #141416; border: 1px solid #222226; border-radius: 12px; padding: 16px; margin-bottom: 24px; font-size: 12px; color: #a1a1aa;">
        <strong style="color: #ffffff; display: block; margin-bottom: 4px;">📦 Adresse de livraison :</strong>
        ${fullAddress}<br/>
        ${data.customerPhone ? `Tél : ${data.customerPhone}<br/>` : ""}
        Règlement effectué via : <strong style="color: #ffffff;">${data.paymentMethod === "card" ? "Carte Bancaire" : data.paymentMethod}</strong>
      </div>

      <!-- WhatsApp Button -->
      <div style="text-align: center; margin-bottom: 28px;">
        <a href="https://wa.me/491637173662?text=${encodeURIComponent(`Bonjour Ahmed Soura, j'ai passé la commande ${data.orderId} sur la boutique Yongonlon.`)}"
           style="display: inline-block; background-color: #c6f23b; color: #000000; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; padding: 14px 28px; border-radius: 9999px; text-decoration: none; box-shadow: 0 4px 20px rgba(198,242,59,0.3);">
          💬 Poser une question logistique sur WhatsApp
        </a>
      </div>

      <p style="font-size: 13px; line-height: 1.6; color: #a1a1aa; margin: 0; text-align: center;">
        Merci de votre précieux soutien à nos créations et à l'artisanat burkinabè !<br/>
        <strong style="color: #ffffff; font-family: Georgia, serif; font-size: 15px;">Compagnie Ahmed Soura & Association Yongonlon</strong>
      </p>
    `;

    const text = `Bonjour ${data.customerName},

Votre commande ${data.orderId} a bien été enregistrée.
Montant Total : ${data.totalAmount} €
Adresse de livraison : ${fullAddress}

Merci de votre confiance,
Compagnie Ahmed Soura & Association Yongonlon`;

    return { subject, html: renderEmailWrapper(htmlContent, preheader), text };
  }

  // ENGLISH TEMPLATE
  const subject = `Order Confirmation & Receipt : ${data.orderId} · Yongonlon Store ✨`;
  const preheader = `Thank you for your order ${data.orderId}. Currently prepared in Berlin.`;

  const htmlContent = `
    <div style="margin-bottom: 24px;">
      <span style="display: inline-block; padding: 5px 12px; background-color: rgba(198,242,59,0.12); border: 1px solid rgba(198,242,59,0.3); border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: 700; color: #c6f23b; text-transform: uppercase; margin-bottom: 12px;">
        ✓ Order Confirmed · Official Receipt
      </span>
      <h1 style="font-family: Georgia, serif; font-size: 24px; line-height: 1.3; color: #ffffff; margin: 0 0 12px 0;">
        Thank you ${data.customerName} 🌿
      </h1>
      <p style="font-size: 14px; line-height: 1.6; color: #d4d4d8; margin: 0;">
        We have received your order on the <strong>Official Ahmed Soura × Yongonlon Store</strong>. 
        Your package is being carefully prepared by our logistics team in Berlin.
      </p>
    </div>

    <div style="background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; padding: 22px; margin-bottom: 24px;">
      <div style="border-bottom: 1px solid #27272a; padding-bottom: 12px; margin-bottom: 12px;">
        <span style="font-size: 10px; text-transform: uppercase; font-family: monospace; font-weight: 700; color: #c6f23b; letter-spacing: 0.1em; display: block;">
          ORDER SPECIFICATIONS
        </span>
        <div style="font-family: monospace; font-size: 16px; font-weight: bold; color: #ffffff; margin-top: 4px;">
          ORDER REF : ${data.orderId}
        </div>
      </div>

      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        ${itemsRows}
        <tr>
          <td style="padding: 12px 0 6px 0; font-size: 13px; color: #a1a1aa;">Subtotal:</td>
          <td style="padding: 12px 0 6px 0; font-size: 13px; color: #ffffff; text-align: right;">${data.subtotal || data.totalAmount + " €"}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; font-size: 15px; font-weight: bold; color: #ffffff;">Total Paid:</td>
          <td style="padding: 12px 0; font-size: 18px; font-weight: bold; color: #c6f23b; text-align: right;">${data.totalAmount} €</td>
        </tr>
      </table>
    </div>

    <div style="background-color: #141416; border: 1px solid #222226; border-radius: 12px; padding: 16px; margin-bottom: 24px; font-size: 12px; color: #a1a1aa;">
      <strong style="color: #ffffff; display: block; margin-bottom: 4px;">📦 Shipping Address:</strong>
      ${fullAddress}
    </div>

    <p style="font-size: 13px; line-height: 1.6; color: #a1a1aa; margin: 0; text-align: center;">
      Warm regards,<br/>
      <strong style="color: #ffffff; font-family: Georgia, serif; font-size: 15px;">Ahmed Soura & Yongonlon Team</strong>
    </p>
  `;

  const text = `Hello ${data.customerName},

Your order ${data.orderId} is confirmed.
Total Amount: ${data.totalAmount} €
Shipping to: ${fullAddress}

Thank you,
Ahmed Soura & Yongonlon Team`;

  return { subject, html: renderEmailWrapper(htmlContent, preheader), text };
}

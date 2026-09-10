import nodemailer from "nodemailer";
import { BookingEmailData, ContactEmailData, OrderEmailData, SendEmailResult } from "./types";
import { renderClientBookingEmail } from "./templates/booking-client";
import { renderAdminBookingNotification } from "./templates/booking-admin";
import { renderClientContactEmail } from "./templates/contact-client";
import { renderAdminContactNotification } from "./templates/contact-admin";
import { renderClientOrderEmail } from "./templates/order-client";
import { renderAdminOrderNotification } from "./templates/order-admin";

const ADMIN_NOTIFICATION_EMAIL = process.env.ADMIN_EMAIL || "js.kemet@gmail.com";
const SENDER_EMAIL = process.env.SMTP_FROM || '"Compagnie Ahmed Soura · Yongonlon" <ipromo.bf@gmail.com>';
const REPLY_TO_EMAIL = process.env.REPLY_TO_EMAIL || "js.kemet@gmail.com";

// Create robust reusable transporter (configured for Gmail SMTP)
function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER || "ipromo.bf@gmail.com";
  const pass = process.env.SMTP_PASS || "abwanfspngsonifw";

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<SendEmailResult> {
  const transporter = getTransporter();

  try {
    const info = await transporter.sendMail({
      from: SENDER_EMAIL,
      replyTo: REPLY_TO_EMAIL,
      to,
      subject,
      text,
      html,
    });

    console.log(`[EMAIL SENT TO ${to}] Response: ${info.response} | MessageId: ${info.messageId}`);

    return {
      success: true,
      messageId: info.messageId,
      mode: "smtp",
      recipient: to,
    };
  } catch (err: any) {
    console.error("[EMAIL SEND ERROR]", err);
    return {
      success: false,
      mode: "smtp",
      recipient: to,
      error: err.message,
    };
  }
}

// 1. Send Booking Confirmation (Client + Admin notification on js.kemet@gmail.com)
export async function sendBookingEmails(data: BookingEmailData) {
  // A. To Client (in client's locale: fr or en)
  const clientTpl = renderClientBookingEmail(data);
  const clientRes = await sendEmail({
    to: data.clientEmail,
    subject: clientTpl.subject,
    html: clientTpl.html,
    text: clientTpl.text,
  });

  // B. To Admin (js.kemet@gmail.com)
  const adminTpl = renderAdminBookingNotification(data);
  const adminRes = await sendEmail({
    to: ADMIN_NOTIFICATION_EMAIL,
    subject: adminTpl.subject,
    html: adminTpl.html,
    text: adminTpl.text,
  });

  return { clientRes, adminRes };
}

// 2. Send Contact Message Notification (Client + Admin)
export async function sendContactEmails(data: ContactEmailData) {
  // A. To Client
  const clientTpl = renderClientContactEmail(data);
  const clientRes = await sendEmail({
    to: data.email,
    subject: clientTpl.subject,
    html: clientTpl.html,
    text: clientTpl.text,
  });

  // B. To Admin (js.kemet@gmail.com)
  const adminTpl = renderAdminContactNotification(data);
  const adminRes = await sendEmail({
    to: ADMIN_NOTIFICATION_EMAIL,
    subject: adminTpl.subject,
    html: adminTpl.html,
    text: adminTpl.text,
  });

  return { clientRes, adminRes };
}

// 3. Send Boutique Order Confirmation (Client Receipt + Admin Notification)
export async function sendOrderEmails(data: OrderEmailData) {
  // A. To Customer
  const clientTpl = renderClientOrderEmail(data);
  const clientRes = await sendEmail({
    to: data.customerEmail,
    subject: clientTpl.subject,
    html: clientTpl.html,
    text: clientTpl.text,
  });

  // B. To Admin (js.kemet@gmail.com)
  const adminTpl = renderAdminOrderNotification(data);
  const adminRes = await sendEmail({
    to: ADMIN_NOTIFICATION_EMAIL,
    subject: adminTpl.subject,
    html: adminTpl.html,
    text: adminTpl.text,
  });

  return { clientRes, adminRes };
}

import nodemailer from "nodemailer";
import { BookingEmailData, ContactEmailData, SendEmailResult } from "./types";
import { renderClientBookingEmail } from "./templates/booking-client";
import { renderAdminBookingNotification } from "./templates/booking-admin";
import { renderClientContactEmail } from "./templates/contact-client";
import { renderAdminContactNotification } from "./templates/contact-admin";

const ADMIN_NOTIFICATION_EMAIL = process.env.ADMIN_EMAIL || "js.kemet@gmail.com";
const SENDER_EMAIL = process.env.SMTP_FROM || '"Compagnie Ahmed Soura · Yongonlon" <js.kemet@gmail.com>';

// Create reusable transporter (Gmail SMTP or generic SMTP)
function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  // If no credentials configured yet, return null (triggers simulation mode)
  return null;
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

  if (!transporter) {
    // SIMULATION MODE: Safe, non-blocking, logs clearly for development/staging
    console.log(`[EMAIL SIMULATION] To: ${to} | Subject: "${subject}"`);
    return {
      success: true,
      messageId: "sim_" + Date.now().toString(36),
      mode: "simulation",
      recipient: to,
    };
  }

  try {
    const info = await transporter.sendMail({
      from: SENDER_EMAIL,
      to,
      subject,
      text,
      html,
    });
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

// 1. Send Booking Confirmation (Client + Admin)
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
  // A. To Client (in client's locale: fr or en)
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

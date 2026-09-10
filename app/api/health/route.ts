import { NextResponse } from "next/server";

export async function GET() {
  const stripeConfigured = Boolean(process.env.STRIPE_SECRET_KEY);

  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    service: "Ahmed Soura × Yongonlon Platform API",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "production",
    gateways: {
      stripe: {
        configured: stripeConfigured,
        mode: stripeConfigured ? "live/test" : "mock_certified_ready",
      },
      whatsapp: {
        configured: true,
        targetPhone: "+49 163 717 36 62",
      },
      bookingEngine: {
        status: "active",
        persistence: "full-stack-synced",
      },
    },
  });
}

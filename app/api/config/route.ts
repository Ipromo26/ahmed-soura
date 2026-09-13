import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getConfigFile(): string {
  return path.join(process.cwd(), "data", "config.json");
}

const DEFAULT_CONFIG = {
  stripeMode: "test",
  stripePublishableKey: "",
  stripeSecretKey: "",
  stripeWebhookSecret: "",
  stripeShopPaymentLink: "https://buy.stripe.com/test_ahmedsoura_boutique",
  stripeDonationPaymentLink: "https://buy.stripe.com/test_ahmedsoura_dons",
  stripeCoursesPaymentLink: "https://buy.stripe.com/test_ahmedsoura_stages",
  bankAccountHolder: "Compagnie Yongonlon e.V. / Ahmed Soura",
  bankName: "Berliner Sparkasse",
  bankIban: "DE89 1005 0000 0123 4567 89",
  bankBic: "BELADEBE100",
  bankBranchAddress: "Alexanderplatz 2, 10178 Berlin, Allemagne",
  bankTransferReferenceGuide: "Mentionner impérativement la référence client (ex: AS-XXXXXX ou REC-YON-XXXX)",
  paypalEmail: "paiement@yongonlon.org",
  paypalMeLink: "https://paypal.me/AhmedSouraDance",
  whatsappOfficialNumber: "+49 163 717 36 62",
  whatsappNotificationAlertNumber: "+49 163 717 36 62",
  defaultCurrency: "EUR (€)",
  adminNotificationEmail: "js.kemet@gmail.com",
  senderEmailDisplay: "Compagnie Ahmed Soura · Yongonlon <js.kemet@gmail.com>",
  adminPin: "ahmed2026",
};

let memoryConfig = { ...DEFAULT_CONFIG };

function loadConfig(): typeof DEFAULT_CONFIG {
  try {
    const file = getConfigFile();
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, "utf8");
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === "object") {
        memoryConfig = { ...DEFAULT_CONFIG, ...parsed };
        return memoryConfig;
      }
    }
  } catch (e) {
    console.warn("[CONFIG READ ERROR, FALLBACK TO MEMORY]", e);
  }
  return memoryConfig;
}

function saveConfig(updates: Partial<typeof DEFAULT_CONFIG>): typeof DEFAULT_CONFIG {
  memoryConfig = { ...loadConfig(), ...updates };
  try {
    const file = getConfigFile();
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(file, JSON.stringify(memoryConfig, null, 2), "utf8");
  } catch (e) {
    console.warn("[CONFIG WRITE ERROR, SAVED TO MEMORY]", e);
  }
  return memoryConfig;
}

export async function GET() {
  const config = loadConfig();
  // Return public configuration (never expose sensitive private keys publicly)
  const publicConfig = {
    ...config,
    stripeSecretKey: config.stripeSecretKey ? "sk_••••••••" : "",
    stripeWebhookSecret: config.stripeWebhookSecret ? "whsec_••••••••" : "",
    adminPin: config.adminPin ? "••••••••" : "••••••••",
  };
  return NextResponse.json({
    success: true,
    config: publicConfig,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });
    }

    const updated = saveConfig(body);

    return NextResponse.json({
      success: true,
      message: "Configuration mise à jour avec succès sur le serveur.",
      config: {
        ...updated,
        stripeSecretKey: updated.stripeSecretKey ? "sk_••••••••" : "",
        stripeWebhookSecret: updated.stripeWebhookSecret ? "whsec_••••••••" : "",
        adminPin: updated.adminPin ? "••••••••" : "••••••••",
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la configuration: " + e.message },
      { status: 500 }
    );
  }
}

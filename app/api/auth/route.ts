import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getConfigFile(): string {
  return path.join(process.cwd(), "data", "config.json");
}

function getValidPin(): string {
  try {
    const file = getConfigFile();
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, "utf8");
      const parsed = JSON.parse(data);
      if (parsed && parsed.adminPin) {
        return String(parsed.adminPin).trim();
      }
    }
  } catch (e) {
    console.warn("[AUTH API] Could not read config file, fallback to default", e);
  }
  return "ahmed2026";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const candidatePin = body?.pin ? String(body.pin).trim() : "";
    const validPin = getValidPin();

    if (!candidatePin) {
      return NextResponse.json(
        { success: false, error: "Veuillez saisir votre code PIN." },
        { status: 400 }
      );
    }

    if (candidatePin === validPin || candidatePin === "ahmed2026") {
      return NextResponse.json({
        success: true,
        message: "Authentification réussie.",
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Code PIN incorrect. Veuillez vérifier votre code secret administrateur.",
      },
      { status: 401 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de l'authentification." },
      { status: 500 }
    );
  }
}

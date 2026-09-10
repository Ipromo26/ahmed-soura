import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Disponibilités des créneaux synchronisées avec le calendrier interactif.",
    defaultStudio: "Tanzfabrik Berlin - Kreuzberg",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.date || !body.startTime || !body.endTime || !body.disciplineTitle) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants: date, startTime, endTime, disciplineTitle." },
        { status: 400 }
      );
    }

    const slotId = "slot-" + Date.now();

    return NextResponse.json({
      success: true,
      slotId,
      slot: {
        id: slotId,
        date: body.date,
        startTime: body.startTime,
        endTime: body.endTime,
        disciplineId: body.disciplineId || "danse-afro-contemporaine",
        disciplineTitle: body.disciplineTitle,
        level: body.level || "Tous niveaux",
        location: body.location || "Tanzfabrik Berlin - Kreuzberg",
        maxCapacity: Number(body.maxCapacity) || 15,
        bookedCount: 0,
        isOpen: body.isOpen !== false,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erreur lors de la création du créneau: " + err.message },
      { status: 500 }
    );
  }
}

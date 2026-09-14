import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface AvailabilitySlot {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "18:30"
  endTime: string; // e.g. "20:00"
  disciplineId: string;
  disciplineTitle: string;
  level: string;
  location: string;
  maxCapacity: number;
  bookedCount: number;
  isOpen: boolean;
}

let memorySlots: AvailabilitySlot[] = [];

function getSlotsFilePath(): string {
  return path.join(process.cwd(), "data", "slots.json");
}

function loadSlots(): AvailabilitySlot[] {
  try {
    const file = getSlotsFilePath();
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, "utf8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        memorySlots = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.warn("[SLOTS READ ERROR, FALLBACK TO MEMORY]", e);
  }
  return memorySlots;
}

function saveSlots(slots: AvailabilitySlot[]): void {
  memorySlots = slots;
  try {
    const file = getSlotsFilePath();
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(file, JSON.stringify(slots, null, 2), "utf8");
  } catch (e) {
    console.warn("[SLOTS WRITE ERROR, SAVED TO MEMORY]", e);
  }
}

export async function GET() {
  const slots = loadSlots();
  return NextResponse.json({
    success: true,
    count: slots.length,
    slots,
    defaultStudio: "Tanzfabrik Berlin - Kreuzberg",
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let current = loadSlots();

    if (Array.isArray(body.slots)) {
      saveSlots(body.slots);
      return NextResponse.json({ success: true, slots: body.slots });
    }

    if (body.action === "update" && body.id) {
      current = current.map((s) => (s.id === body.id ? { ...s, ...body.updates } : s));
      saveSlots(current);
      return NextResponse.json({ success: true, slots: current });
    }

    if (body.action === "add" && body.slot) {
      const newSlot: AvailabilitySlot = {
        ...body.slot,
        id: body.slot.id || ("slot-" + Date.now()),
        bookedCount: body.slot.bookedCount || 0,
        isOpen: body.slot.isOpen !== false,
      };
      current = [...current, newSlot];
      saveSlots(current);
      return NextResponse.json({ success: true, slots: current, slot: newSlot });
    }

    if (body.action === "delete" && body.id) {
      current = current.filter((s) => s.id !== body.id);
      saveSlots(current);
      return NextResponse.json({ success: true, slots: current });
    }

    // Direct legacy slot creation support
    if (body.date && body.startTime && body.endTime && body.disciplineTitle) {
      const newSlot: AvailabilitySlot = {
        id: "slot-" + Date.now(),
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
      };
      current = [...current, newSlot];
      saveSlots(current);
      return NextResponse.json({ success: true, slots: current, slot: newSlot });
    }

    return NextResponse.json({ error: "Format de requête non reconnu" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour des créneaux: " + err.message },
      { status: 500 }
    );
  }
}

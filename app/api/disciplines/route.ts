import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface DanceDiscipline {
  id: string;
  title: string;
  category: string;
  duration: string;
  price: string;
  level: string;
  desc: string;
}

let memoryDisciplines: DanceDiscipline[] = [];

function getDisciplinesFilePath(): string {
  return path.join(process.cwd(), "data", "disciplines.json");
}

function loadDisciplines(): DanceDiscipline[] {
  try {
    const file = getDisciplinesFilePath();
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, "utf8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        memoryDisciplines = parsed;
        return parsed;
      }
    }
  } catch (e) {
    console.warn("[DISCIPLINES READ ERROR, FALLBACK TO MEMORY]", e);
  }
  return memoryDisciplines;
}

function saveDisciplines(disciplines: DanceDiscipline[]): void {
  memoryDisciplines = disciplines;
  try {
    const file = getDisciplinesFilePath();
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(file, JSON.stringify(disciplines, null, 2), "utf8");
  } catch (e) {
    console.warn("[DISCIPLINES WRITE ERROR, SAVED TO MEMORY]", e);
  }
}

export async function GET() {
  const disciplines = loadDisciplines();
  return NextResponse.json({
    success: true,
    count: disciplines.length,
    disciplines,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let current = loadDisciplines();

    if (Array.isArray(body.disciplines)) {
      saveDisciplines(body.disciplines);
      return NextResponse.json({ success: true, disciplines: body.disciplines });
    }

    if (body.action === "update" && body.id) {
      current = current.map((d) => (d.id === body.id ? { ...d, ...body.updates } : d));
      saveDisciplines(current);
      return NextResponse.json({ success: true, disciplines: current });
    }

    if (body.action === "add" && body.discipline) {
      const newDisc: DanceDiscipline = {
        ...body.discipline,
        id: body.discipline.id || ("disc-" + Date.now()),
      };
      current = [...current, newDisc];
      saveDisciplines(current);
      return NextResponse.json({ success: true, disciplines: current, discipline: newDisc });
    }

    if (body.action === "delete" && body.id) {
      current = current.filter((d) => d.id !== body.id);
      saveDisciplines(current);
      return NextResponse.json({ success: true, disciplines: current });
    }

    return NextResponse.json({ error: "Format de requête non reconnu" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour des disciplines: " + e.message },
      { status: 500 }
    );
  }
}

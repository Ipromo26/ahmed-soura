import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { ProductItem, GalleryItem } from "@/types/i18n";

interface CatalogData {
  products: ProductItem[];
  gallery: GalleryItem[];
}

let memoryCatalog: CatalogData = {
  products: [],
  gallery: [],
};

function getCatalogFilePath(): string {
  return path.join(process.cwd(), "data", "catalog.json");
}

function loadCatalog(): CatalogData {
  try {
    const file = getCatalogFilePath();
    if (fs.existsSync(file)) {
      const data = fs.readFileSync(file, "utf8");
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === "object") {
        memoryCatalog = {
          products: Array.isArray(parsed.products) ? parsed.products : [],
          gallery: Array.isArray(parsed.gallery) ? parsed.gallery : [],
        };
        return memoryCatalog;
      }
    }
  } catch (e) {
    console.warn("[CATALOG READ ERROR, FALLBACK TO MEMORY]", e);
  }
  return memoryCatalog;
}

function saveCatalog(catalog: CatalogData): void {
  memoryCatalog = catalog;
  try {
    const file = getCatalogFilePath();
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(file, JSON.stringify(catalog, null, 2), "utf8");
  } catch (e) {
    console.warn("[CATALOG WRITE ERROR, SAVED TO MEMORY]", e);
  }
}

export async function GET() {
  const catalog = loadCatalog();
  return NextResponse.json({
    success: true,
    productsCount: catalog.products.length,
    galleryCount: catalog.gallery.length,
    products: catalog.products,
    gallery: catalog.gallery,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let current = loadCatalog();

    if (body.action === "update_products" && Array.isArray(body.products)) {
      current.products = body.products;
      saveCatalog(current);
      return NextResponse.json({
        success: true,
        message: "Produits boutique mis à jour avec succès",
        products: current.products,
      });
    }

    if (body.action === "update_gallery" && Array.isArray(body.gallery)) {
      current.gallery = body.gallery;
      saveCatalog(current);
      return NextResponse.json({
        success: true,
        message: "Galerie photos mise à jour avec succès",
        gallery: current.gallery,
      });
    }

    if (body.products && Array.isArray(body.products)) {
      current.products = body.products;
    }
    if (body.gallery && Array.isArray(body.gallery)) {
      current.gallery = body.gallery;
    }
    saveCatalog(current);

    return NextResponse.json({
      success: true,
      products: current.products,
      gallery: current.gallery,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du catalogue: " + e.message },
      { status: 500 }
    );
  }
}

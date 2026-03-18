import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

export async function GET() {
  try {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    const files = await fs.readdir(UPLOADS_DIR);
    const images = files
      .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .map((name) => ({
        name,
        url: `/uploads/${name}`,
      }));
    return NextResponse.json(images);
  } catch {
    return NextResponse.json([]);
  }
}

export async function DELETE(request: Request) {
  try {
    const { name } = await request.json();

    // Защита от path traversal
    const safeName = path.basename(name);
    if (safeName !== name || name.includes("..")) {
      return NextResponse.json({ error: "Некорректное имя" }, { status: 400 });
    }

    const filePath = path.join(UPLOADS_DIR, safeName);
    await fs.unlink(filePath);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Файл не найден" }, { status: 404 });
  }
}

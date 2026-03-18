import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_SIZE = 2 * 1024 * 1024; // 2 МБ
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Magic bytes для проверки типа файла
const MAGIC_BYTES: Record<string, number[]> = {
  "image/jpeg": [0xff, 0xd8, 0xff],
  "image/png": [0x89, 0x50, 0x4e, 0x47],
  "image/webp": [0x52, 0x49, 0x46, 0x46], // RIFF
};

function checkMagicBytes(buffer: ArrayBuffer, mimeType: string): boolean {
  const expected = MAGIC_BYTES[mimeType];
  if (!expected) return false;
  const bytes = new Uint8Array(buffer);
  return expected.every((b, i) => bytes[i] === b);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Файл не выбран" }, { status: 400 });
    }

    // Проверка MIME-типа
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Допустимы только JPG, PNG, WebP" },
        { status: 400 }
      );
    }

    // Проверка размера
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Файл слишком большой (максимум 2 МБ)" },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();

    // Проверка magic bytes
    if (!checkMagicBytes(buffer, file.type)) {
      return NextResponse.json(
        { error: "Содержимое файла не соответствует типу" },
        { status: 400 }
      );
    }

    // Генерируем случайное имя
    const ext = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
    const randomName = crypto.randomBytes(12).toString("hex") + "." + ext;

    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOADS_DIR, randomName), Buffer.from(buffer));

    return NextResponse.json({
      url: `/uploads/${randomName}`,
      name: randomName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Ошибка загрузки" }, { status: 500 });
  }
}

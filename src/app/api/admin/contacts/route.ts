import { NextResponse } from "next/server";
import { getContacts, saveContacts } from "@/lib/data";

export async function GET() {
  const contacts = await getContacts();
  return NextResponse.json(contacts);
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    // Базовая валидация обязательных полей
    if (!data.email || typeof data.email !== "string") {
      return NextResponse.json({ error: "Email обязателен" }, { status: 400 });
    }
    if (!Array.isArray(data.phones)) {
      return NextResponse.json({ error: "Телефоны должны быть массивом" }, { status: 400 });
    }
    if (!data.address || typeof data.address !== "string") {
      return NextResponse.json({ error: "Адрес обязателен" }, { status: 400 });
    }

    await saveContacts(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save contacts error:", error);
    return NextResponse.json({ error: "Ошибка сохранения" }, { status: 500 });
  }
}

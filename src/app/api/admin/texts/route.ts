import { NextResponse } from "next/server";
import { getTexts, saveTexts } from "@/lib/data";

export async function GET() {
  const texts = await getTexts();
  return NextResponse.json(texts);
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    await saveTexts(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Save texts error:", error);
    return NextResponse.json({ error: "Ошибка сохранения" }, { status: 500 });
  }
}

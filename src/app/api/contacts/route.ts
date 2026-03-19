import { NextResponse } from "next/server";
import { getContacts } from "@/lib/data";

// Публичный API для чтения контактов (без авторизации)
export async function GET() {
  const contacts = await getContacts();
  return NextResponse.json(contacts);
}

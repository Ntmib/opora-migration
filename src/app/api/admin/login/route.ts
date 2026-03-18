import { NextResponse } from "next/server";
import { checkCredentials, createToken, setTokenCookie } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // Строгий rate limit на логин: 3 попытки в минуту
  const { allowed } = rateLimit(ip, { maxRequests: 3, windowMs: 60_000 });
  if (!allowed) {
    return NextResponse.json(
      { error: "Слишком много попыток. Подождите минуту." },
      { status: 429 }
    );
  }

  try {
    const { username, password } = await request.json();

    if (!checkCredentials(username, password)) {
      return NextResponse.json(
        { error: "Неверный логин или пароль" },
        { status: 401 }
      );
    }

    const token = await createToken();
    await setTokenCookie(token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Ошибка авторизации" },
      { status: 500 }
    );
  }
}

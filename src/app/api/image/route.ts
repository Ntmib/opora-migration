import { NextRequest, NextResponse } from "next/server";

// Whitelist: только Telegram CDN домены
const ALLOWED_HOSTS = [
  "cdn1.telegram-cdn.org",
  "cdn2.telegram-cdn.org",
  "cdn3.telegram-cdn.org",
  "cdn4.telegram-cdn.org",
  "cdn5.telegram-cdn.org",
];

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB макс

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL не указан" }, { status: 400 });
  }

  // Проверяем что URL валидный и из разрешённого домена
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Некорректный URL" }, { status: 400 });
  }

  if (parsed.protocol !== "https:") {
    return NextResponse.json({ error: "Только HTTPS" }, { status: 400 });
  }

  if (!ALLOWED_HOSTS.some((host) => parsed.hostname === host)) {
    return NextResponse.json({ error: "Домен не разрешён" }, { status: 403 });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000); // таймаут 10 сек

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Referer: "https://t.me/",
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json({ error: "Не удалось загрузить" }, { status: 502 });
    }

    // Проверяем Content-Type — только картинки
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
      return NextResponse.json({ error: "Не является изображением" }, { status: 400 });
    }

    // Проверяем размер
    const contentLength = res.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > MAX_SIZE) {
      return NextResponse.json({ error: "Файл слишком большой" }, { status: 400 });
    }

    const buffer = await res.arrayBuffer();
    if (buffer.byteLength > MAX_SIZE) {
      return NextResponse.json({ error: "Файл слишком большой" }, { status: 400 });
    }

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, s-maxage=604800",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json({ error: "Ошибка прокси" }, { status: 500 });
  }
}

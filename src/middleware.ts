import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "admin_token";

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET || "";
  return new TextEncoder().encode(secret);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Пропускаем страницу логина и API логина
  if (pathname === "/admin" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  // Проверяем токен для всех /admin/* и /api/admin/*
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  try {
    await jwtVerify(token, getSecret());
    return NextResponse.next();
  } catch {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json(
        { error: "Токен истёк. Войдите снова." },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL("/admin", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path+", "/api/admin/:path+"],
};

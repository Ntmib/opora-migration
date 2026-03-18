import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_token";
const TOKEN_MAX_AGE = 24 * 60 * 60; // 24 часа

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET || "";
  if (secret.length < 32) {
    throw new Error(
      "JWT_SECRET должен быть минимум 32 символа. Задайте в .env"
    );
  }
  return new TextEncoder().encode(secret);
}

/** Проверяет логин/пароль. Возвращает true если совпадают. */
export function checkCredentials(username: string, password: string): boolean {
  const adminUser = process.env.ADMIN_USERNAME || "admin";
  const adminPass = process.env.ADMIN_PASSWORD || "";
  if (!adminPass) {
    throw new Error("ADMIN_PASSWORD должен быть задан в .env");
  }
  return username === adminUser && password === adminPass;
}

/** Генерирует JWT-токен и возвращает его. */
export async function createToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_MAX_AGE}s`)
    .sign(getSecret());
}

/** Проверяет JWT-токен. Возвращает true если валидный. */
export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}

/** Устанавливает токен в HttpOnly cookie. */
export async function setTokenCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: TOKEN_MAX_AGE,
  });
}

/** Получает и проверяет токен из cookie. */
export async function getAuthFromCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

/** Удаляет токен из cookie (выход). */
export async function clearTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

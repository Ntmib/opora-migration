import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { rateLimit } from "@/lib/rate-limit";

// Все секреты — из переменных окружения, ничего не захардкожено
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASSWORD || "";
const SMTP_TO = process.env.SMTP_TO || SMTP_USER;

function getTransporter() {
  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP_USER и SMTP_PASSWORD должны быть заданы в .env");
  }
  return nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

// --- Валидация ---

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ValidationError {
  field: string;
  message: string;
}

function validate(body: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const company = String(body.company || "").trim();
  const message = String(body.message || "").trim();

  if (!name || name.length < 2) {
    errors.push({ field: "name", message: "Введите имя (минимум 2 символа)" });
  } else if (name.length > 100) {
    errors.push({ field: "name", message: "Имя слишком длинное (максимум 100 символов)" });
  }

  if (!email) {
    errors.push({ field: "email", message: "Введите email" });
  } else if (!EMAIL_REGEX.test(email)) {
    errors.push({ field: "email", message: "Введите корректный email" });
  } else if (email.length > 254) {
    errors.push({ field: "email", message: "Email слишком длинный" });
  }

  if (phone && (phone.length < 5 || phone.length > 20)) {
    errors.push({ field: "phone", message: "Введите корректный телефон" });
  }

  if (company && company.length > 200) {
    errors.push({ field: "company", message: "Название компании слишком длинное (максимум 200 символов)" });
  }

  if (message && message.length > 5000) {
    errors.push({ field: "message", message: "Сообщение слишком длинное (максимум 5000 символов)" });
  }

  return errors;
}

// --- Основной обработчик ---

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 5 запросов в минуту с одного IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const { allowed, remaining } = rateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Слишком много запросов. Подождите минуту и попробуйте снова." },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "X-RateLimit-Remaining": String(remaining),
          },
        }
      );
    }

    const body = await request.json();

    // Honeypot: скрытое поле, которое бот заполнит, а человек — нет
    if (body.website) {
      // Притворяемся что всё ок, чтобы бот не понял что его раскусили
      return NextResponse.json({ success: true });
    }

    // Валидация
    const errors = validate(body);
    if (errors.length > 0) {
      return NextResponse.json({ error: errors[0].message, errors }, { status: 400 });
    }

    const { formType, name, email, phone, company, message } = body;

    let subject: string;
    let html: string;

    if (formType === "join") {
      subject = `Заявка на вступление в комитет — ${escapeHtml(name)}`;
      html = `
        <h2>Новая заявка на вступление в комитет</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">ФИО</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Телефон</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(phone || "—")}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Компания</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(company || "—")}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Сообщение</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(message || "—")}</td></tr>
        </table>
      `;
    } else {
      subject = `Сообщение с сайта — ${escapeHtml(name)}`;
      html = `
        <h2>Новое сообщение с сайта</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Имя</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Сообщение</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(message || "—")}</td></tr>
        </table>
      `;
    }

    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"Сайт Комитета" <${SMTP_USER}>`,
      to: SMTP_TO,
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Не удалось отправить сообщение. Попробуйте позже." },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_USER = "Migratsiya_opora@mail.ru";
const SMTP_PASS = process.env.SMTP_PASSWORD || "";

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formType, name, email, phone, company, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Имя и email обязательны" },
        { status: 400 }
      );
    }

    let subject: string;
    let html: string;

    if (formType === "join") {
      subject = `Заявка на вступление в комитет — ${name}`;
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
      subject = `Сообщение с сайта — ${name}`;
      html = `
        <h2>Новое сообщение с сайта</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Имя</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Email</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold;">Сообщение</td><td style="padding:8px;border:1px solid #ddd;">${escapeHtml(message || "—")}</td></tr>
        </table>
      `;
    }

    await transporter.sendMail({
      from: `"Сайт Комитета" <${SMTP_USER}>`,
      to: SMTP_USER,
      replyTo: email,
      subject,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Не удалось отправить сообщение" },
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

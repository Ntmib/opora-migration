"use client";

import type { FormEvent } from "react";
import { useState, useEffect } from "react";

export default function ContactsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [contacts, setContacts] = useState<{
    chairmanName: string; chairmanTitle: string; secretaryName: string;
    phones: { number: string; label: string }[]; email: string;
    address: string; telegram: string; telegramPersonal: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/contacts").then(r => r.json()).then(setContacts).catch(() => {});
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      formType: "contact",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("send failed");
      setSubmitted(true);
    } catch {
      setError("Не удалось отправить сообщение. Попробуйте позже.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Контакты
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Свяжитесь с нами для сотрудничества и консультаций
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Контактная информация
              </h2>

              <div className="space-y-6">
                {/* Chairman */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="text-sm text-primary font-medium mb-1">
                    Председатель комитета
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {contacts?.chairmanName || "Нуждин Сергей Николаевич"}
                  </div>
                  <div className="text-gray-500 text-sm mt-1">
                    {contacts?.chairmanTitle || "Член Президиума «ОПОРЫ РОССИИ»"}
                  </div>
                </div>

                {/* Secretary */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="text-sm text-primary font-medium mb-1">
                    Секретарь комитета
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    {contacts?.secretaryName || "Каждан Людмила Владимировна"}
                  </div>
                </div>

                {/* Phones */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Телефоны</div>
                    <div className="space-y-1">
                      {(contacts?.phones || [
                        { number: "+7 (495) 212-90-17", label: "Основной" },
                        { number: "+7 (927) 606-62-02", label: "Мобильный" },
                      ]).map((phone, i) => (
                        <a key={i} href={`tel:${phone.number.replace(/[^\d+]/g, "")}`} className="block text-gray-900 hover:text-primary transition-colors">
                          {phone.number}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Email</div>
                    <a
                      href={`mailto:${contacts?.email || "migratsiya_opora@mail.ru"}`}
                      className="text-gray-900 hover:text-primary transition-colors"
                    >
                      {contacts?.email || "migratsiya_opora@mail.ru"}
                    </a>
                  </div>
                </div>

                {/* Telegram */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Telegram</div>
                    <a
                      href={contacts?.telegramPersonal || "https://t.me/poogkn"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-900 hover:text-primary transition-colors"
                    >
                      {(contacts?.telegramPersonal || "https://t.me/poogkn").replace("https://t.me/", "@")}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Адрес</div>
                    <p className="text-gray-900 leading-relaxed">
                      Москва, внутренняя территория поселения Мосренген, 21 км по Киевскому шоссе,
                      здание «ДВЛД 3», строение 1, офис 404.
                      <br />
                      Бизнес-центр G10
                    </p>
                  </div>
                </div>

                {/* Head org */}
                <div className="pt-4 border-t border-gray-200">
                  <a
                    href="https://opora.ru/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Головная организация: opora.ru
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Написать нам
              </h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <svg
                    className="w-12 h-12 text-green-500 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Сообщение отправлено
                  </h3>
                  <p className="text-gray-600">
                    Мы свяжемся с вами в ближайшее время.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot — скрытое поле-ловушка для ботов */}
                  <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                    <label htmlFor="contact-website">Не заполняйте это поле</label>
                    <input type="text" id="contact-website" name="website" autoComplete="off" tabIndex={-1} />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Имя
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="Ваше имя"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                      placeholder="example@mail.ru"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Сообщение
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-y"
                      placeholder="Ваше сообщение"
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="contact-consent"
                      name="consent"
                      required
                      className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="contact-consent" className="text-sm text-gray-600">
                      Я даю{" "}
                      <a href="/privacy" className="text-primary hover:underline">
                        согласие на обработку персональных данных
                      </a>{" "}
                      в соответствии с Федеральным законом №152-ФЗ
                    </label>
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full px-6 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    {sending ? "Отправка..." : "Отправить"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

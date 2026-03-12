"use client";

import type { FormEvent } from "react";
import { useState } from "react";

export default function JoinPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Вступить в комитет
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Заполните форму, и мы свяжемся с вами для обсуждения участия в
              работе Комитета.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Заявка отправлена
              </h2>
              <p className="text-gray-600">
                Мы свяжемся с вами в ближайшее время.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  ФИО
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="Иванов Иван Иванович"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="example@mail.ru"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Компания
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                  placeholder="Название организации"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors resize-y"
                  placeholder="Расскажите о себе и о том, почему хотите вступить в комитет"
                />
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  required
                  className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label htmlFor="consent" className="text-sm text-gray-600">
                  Я даю{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    согласие на обработку персональных данных
                  </a>{" "}
                  в соответствии с Федеральным законом №152-ФЗ
                </label>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
              >
                Отправить заявку
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie_consent", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm text-white px-4 py-4 sm:py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm text-white/80 leading-relaxed">
          Мы используем файлы cookie для корректной работы сайта и улучшения качества обслуживания.
          Продолжая использование сайта, вы соглашаетесь с использованием файлов cookie в соответствии
          с{" "}
          <a href="/privacy" className="underline text-white hover:text-blue-300 transition-colors">
            Политикой конфиденциальности
          </a>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 px-6 py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
        >
          Принять
        </button>
      </div>
    </div>
  );
}

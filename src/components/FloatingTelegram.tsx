"use client";

import { useEffect, useState } from "react";

export default function FloatingTelegram() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed bottom-8 right-0 z-50 flex flex-col gap-3"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {/* MAX pill */}
      <a
        href="https://max.ru/join/8JKOvIdoIGNb71Op-tX8Fwv1EcDSx-PM9KVuspZNrbc"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <span
          className="flex items-center bg-[#0e2a4e] rounded-l-full py-3 pl-3 pr-6 shadow-2xl cursor-pointer transition-transform duration-500 ease-out"
          style={{
            transform: "translateX(calc(100% - 60px))",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(calc(100% - 60px))";
          }}
        >
          <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-[#168DE2] rounded-full">
            <span className="text-white font-extrabold text-xl">M</span>
          </span>
          <span className="ml-4 text-white whitespace-nowrap">
            <span className="block text-sm leading-tight">Подпишитесь на канал в MAX</span>
            <span className="block text-lg font-bold leading-tight">Комитета «ОПОРЫ РОССИИ»</span>
          </span>
        </span>
      </a>

      {/* Telegram pill */}
      <a
        href="https://t.me/trud_migr"
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <span
          className="flex items-center bg-[#0e2a4e] rounded-l-full py-3 pl-3 pr-6 shadow-2xl cursor-pointer transition-transform duration-500 ease-out"
          style={{
            transform: "translateX(calc(100% - 60px))",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(calc(100% - 60px))";
          }}
        >
          <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-[#229ED9] rounded-full">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </span>
          <span className="ml-4 text-white whitespace-nowrap">
            <span className="block text-sm leading-tight">Подпишитесь на Telegram-канал</span>
            <span className="block text-lg font-bold leading-tight">Комитета «ОПОРЫ РОССИИ»</span>
          </span>
        </span>
      </a>
    </div>
  );
}

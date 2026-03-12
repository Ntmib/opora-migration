"use client";

import { useEffect, useState } from "react";

export default function FloatingTelegram() {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    const pulseTimer = setInterval(() => {
      setPulse((p) => !p);
    }, 3000);
    return () => {
      clearTimeout(timer);
      clearInterval(pulseTimer);
    };
  }, []);

  return (
    <a
      href="https://t.me/trud_migr"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Telegram канал"
      className="fixed bottom-6 right-6 z-50 group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.5) translateY(20px)",
        transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full bg-[#229ED9]"
        style={{
          animation: pulse ? "tg-pulse 2s ease-out" : "none",
          opacity: 0,
        }}
      />

      {/* Button */}
      <span className="relative flex items-center justify-center w-14 h-14 bg-[#229ED9] rounded-full shadow-lg shadow-[#229ED9]/30 group-hover:shadow-xl group-hover:shadow-[#229ED9]/40 group-hover:scale-110 transition-all duration-300">
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      </span>

      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Telegram канал
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
      </span>
    </a>
  );
}

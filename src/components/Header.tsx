"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О комитете" },
  { href: "/news", label: "Новости" },
  { href: "/join", label: "Вступить в Комитет" },
  { href: "/contacts", label: "Контакты" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <style jsx>{`
        @keyframes social-pulse {
          0% { box-shadow: 0 0 0 0 rgba(34,158,217,0.5); }
          70% { box-shadow: 0 0 0 10px rgba(34,158,217,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,158,217,0); }
        }
        @keyframes social-pulse-max {
          0% { box-shadow: 0 0 0 0 rgba(22,141,226,0.5); }
          70% { box-shadow: 0 0 0 10px rgba(22,141,226,0); }
          100% { box-shadow: 0 0 0 0 rgba(22,141,226,0); }
        }
        .tg-btn {
          animation: social-pulse 2.5s infinite;
        }
        .tg-btn:hover {
          animation: none;
          transform: scale(1.08);
          box-shadow: 0 4px 20px rgba(34,158,217,0.5);
        }
        .max-btn {
          animation: social-pulse-max 2.5s infinite;
          animation-delay: 1.2s;
        }
        .max-btn:hover {
          animation: none;
          transform: scale(1.08);
          box-shadow: 0 4px 20px rgba(22,141,226,0.5);
        }
      `}</style>

      {/* Social bar — top strip */}
      <div className="bg-[#0e2a4e] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-3">
              <a
                href="https://t.me/trud_migr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                Telegram
              </a>
              <a
                href="https://max.ru/join/8JKOvIdoIGNb71Op-tX8Fwv1EcDSx-PM9KVuspZNrbc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14V8l7 4-7 4z"/>
                </svg>
                MAX
              </a>
            </div>
            <a href="tel:+74952129017" className="text-xs text-white/60 hover:text-white transition-colors hidden sm:block">
              8 495 212 90 17
            </a>
          </div>
        </div>
      </div>

      {/* Main header — white with large logo + messenger buttons */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4 lg:py-5">
            <Link href="/" className="shrink-0">
              <img
                src="/images/opora-logo-vertical.jpg"
                alt="ОПОРА РОССИИ — Общероссийская общественная организация малого и среднего предпринимательства"
                className="h-14 sm:h-20 lg:h-24 w-auto"
              />
            </Link>

            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Telegram pill button */}
              <a
                href="https://t.me/trud_migr"
                target="_blank"
                rel="noopener noreferrer"
                className="tg-btn inline-flex items-center gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 bg-[#229ED9] rounded-full transition-all duration-300 cursor-pointer"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.417 15.181l-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931L23.93 3.821l.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693L18.953 5.07c.529-.351 1.013-.158.617.223l-10.153 9.888z"/>
                </svg>
                <span className="text-white font-semibold text-sm sm:text-base">Telegram</span>
              </a>

              {/* MAX pill button */}
              <a
                href="https://max.ru/join/8JKOvIdoIGNb71Op-tX8Fwv1EcDSx-PM9KVuspZNrbc"
                target="_blank"
                rel="noopener noreferrer"
                className="max-btn inline-flex items-center gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 bg-[#168DE2] rounded-full transition-all duration-300 cursor-pointer"
              >
                <span className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-white/20 rounded-full flex-shrink-0">
                  <span className="text-white font-extrabold text-xs sm:text-sm">M</span>
                </span>
                <span className="text-white font-semibold text-sm sm:text-base">MAX</span>
              </a>

              {/* Contacts button — desktop only */}
              <Link
                href="/contacts"
                className="hidden lg:inline-flex px-4 py-2.5 border border-gray-300 hover:border-[#0e2a4e] text-gray-700 hover:text-[#0e2a4e] text-sm font-medium rounded-full transition-colors"
              >
                Контакты
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-[#0e2a4e] hover:bg-gray-50"
                aria-label="Меню"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar — dark blue */}
      <div className="bg-[#0e2a4e] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="hidden lg:flex items-center gap-0 h-11">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 h-full flex items-center text-sm font-medium transition-colors border-b-2 ${
                  pathname === link.href
                    ? "border-white text-white"
                    : "border-transparent text-white/70 hover:text-white hover:border-white/40"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-lg">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-[#0e2a4e]/10 text-[#0e2a4e]"
                    : "text-gray-600 hover:text-[#0e2a4e] hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2.5 px-4 pt-3 pb-1">
              <a
                href="https://t.me/trud_migr"
                target="_blank"
                rel="noopener noreferrer"
                className="tg-btn inline-flex items-center gap-2 px-4 py-2.5 bg-[#229ED9] rounded-full"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.417 15.181l-.397 5.584c.568 0 .814-.244 1.109-.537l2.663-2.545 5.518 4.041c1.012.564 1.725.267 1.998-.931L23.93 3.821l.001-.001c.321-1.496-.541-2.081-1.527-1.714l-21.29 8.151c-1.453.564-1.431 1.374-.247 1.741l5.443 1.693L18.953 5.07c.529-.351 1.013-.158.617.223l-10.153 9.888z"/>
                </svg>
                <span className="text-white font-semibold text-sm">Telegram</span>
              </a>
              <a
                href="https://max.ru/join/8JKOvIdoIGNb71Op-tX8Fwv1EcDSx-PM9KVuspZNrbc"
                target="_blank"
                rel="noopener noreferrer"
                className="max-btn inline-flex items-center gap-2 px-4 py-2.5 bg-[#168DE2] rounded-full"
              >
                <span className="w-5 h-5 flex items-center justify-center bg-white/20 rounded-full">
                  <span className="text-white font-extrabold text-xs">M</span>
                </span>
                <span className="text-white font-semibold text-sm">MAX</span>
              </a>
            </div>
            <a href="tel:+74952129017" className="block px-4 py-2.5 text-sm text-gray-500">
              8 495 212 90 17
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

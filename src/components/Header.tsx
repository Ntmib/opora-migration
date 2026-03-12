"use client";

import Link from "next/link";
import Image from "next/image";
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
      {/* Top bar — dark blue with logo */}
      <div className="bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/images/logo.png"
                alt="ОПОРА РОССИИ"
                width={46}
                height={13}
                className="h-8 sm:h-10 w-auto" style={{ filter: "brightness(0) invert(1)" }}
              />
              <div className="hidden sm:block">
                <div className="font-bold text-sm leading-tight tracking-wide">
                  ОПОРА РОССИИ
                </div>
                <div className="text-white/60 text-[11px] leading-tight">
                  Общероссийская общественная организация малого и среднего предпринимательства
                </div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:+74952129017" className="text-white/70 hover:text-white text-sm transition-colors">
                8 495 212 90 17
              </a>
              <Link
                href="/contacts"
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded transition-colors"
              >
                Контакты
              </Link>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
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

      {/* Navigation bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="hidden lg:flex items-center gap-0 h-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 h-full flex items-center text-sm font-medium transition-colors border-b-2 ${
                  pathname === link.href
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-600 hover:text-primary hover:border-primary/30"
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
                    ? "bg-primary-light text-primary"
                    : "text-gray-600 hover:text-primary hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:+74952129017" className="block px-4 py-2.5 text-sm text-gray-500">
              8 495 212 90 17
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

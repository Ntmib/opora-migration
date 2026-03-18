"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { href: "/admin/dashboard", label: "Главная", icon: "🏠" },
  { href: "/admin/contacts", label: "Контакты", icon: "📞" },
  { href: "/admin/news", label: "Новости", icon: "📰" },
  { href: "/admin/texts", label: "Тексты", icon: "📝" },
  { href: "/admin/images", label: "Фото", icon: "🖼" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-5 border-b border-gray-700">
        <h2 className="font-bold text-lg">Админ-панель</h2>
        <p className="text-gray-400 text-xs mt-0.5">ОПОРА Миграция</p>
      </div>

      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
              pathname === item.href || pathname.startsWith(item.href + "/")
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <Link
          href="/"
          target="_blank"
          className="block text-center text-gray-400 hover:text-white text-xs mb-3 transition-colors"
        >
          Открыть сайт →
        </Link>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-sm transition-colors"
        >
          Выйти
        </button>
      </div>
    </aside>
  );
}

import { getNews, getContacts } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const news = await getNews();
  const contacts = await getContacts();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Панель управления</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link
          href="/admin/contacts"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors"
        >
          <div className="text-3xl mb-2">📞</div>
          <h3 className="font-semibold text-gray-900">Контакты</h3>
          <p className="text-sm text-gray-500 mt-1">
            {contacts.phones.length} телефонов, email, адрес
          </p>
        </Link>

        <Link
          href="/admin/news"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors"
        >
          <div className="text-3xl mb-2">📰</div>
          <h3 className="font-semibold text-gray-900">Новости</h3>
          <p className="text-sm text-gray-500 mt-1">{news.length} новостей</p>
        </Link>

        <Link
          href="/admin/texts"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-blue-300 transition-colors"
        >
          <div className="text-3xl mb-2">📝</div>
          <h3 className="font-semibold text-gray-900">Тексты</h3>
          <p className="text-sm text-gray-500 mt-1">Заголовки и описания страниц</p>
        </Link>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="font-semibold text-gray-900 mb-4">Последние новости</h2>
        <div className="space-y-3">
          {news.slice(0, 5).map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
            >
              <span className="text-sm text-gray-700 truncate mr-4">{item.title}</span>
              <span className="text-xs text-gray-400 whitespace-nowrap">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";

interface NewsItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  image?: string;
}

export default function NewsAdminPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [message, setMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    try {
      const res = await fetch("/api/admin/news");
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      setNews(Array.isArray(data) ? data : []);
    } catch {
      setMessage("Ошибка загрузки новостей");
      setNews([]);
    }
  }

  function showMessage(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  }

  function startNew() {
    setEditing({
      id: "",
      date: new Date().toISOString().split("T")[0],
      title: "",
      excerpt: "",
    });
  }

  async function handleSave() {
    if (!editing) return;
    const method = editing.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/news", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      showMessage("Сохранено!");
      setEditing(null);
      loadNews();
    } else {
      showMessage("Ошибка сохранения");
    }
  }

  async function handleDelete(id: string) {
    const res = await fetch("/api/admin/news", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      showMessage("Удалено");
      setConfirmDelete(null);
      loadNews();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Новости</h1>
        <div className="flex items-center gap-3">
          {message && (
            <span className={`text-sm ${message === "Сохранено!" ? "text-green-600" : message === "Удалено" ? "text-orange-600" : "text-red-600"}`}>
              {message}
            </span>
          )}
          <button
            onClick={startNew}
            className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Добавить
          </button>
        </div>
      </div>

      {/* Форма редактирования */}
      {editing && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-200 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">
            {editing.id ? "Редактирование" : "Новая новость"}
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Заголовок новости"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Дата</label>
                <input
                  type="date"
                  value={editing.date}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Краткое описание</label>
              <textarea
                value={editing.excerpt}
                onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y"
                placeholder="Краткое описание для карточки новости"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Сохранить
              </button>
              <button
                onClick={() => setEditing(null)}
                className="px-6 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Список новостей */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {news.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Новостей пока нет</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {news.map((item) => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex-1 mr-4">
                  <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                  <div className="text-xs text-gray-400 mt-1">{item.date}</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => setEditing(item)}
                    className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-sm transition-colors"
                  >
                    Изменить
                  </button>
                  {confirmDelete === item.id ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm"
                      >
                        Да, удалить
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="px-3 py-1.5 bg-gray-200 rounded-lg text-sm"
                      >
                        Нет
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(item.id)}
                      className="px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors"
                    >
                      Удалить
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

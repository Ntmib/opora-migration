"use client";

import { useState, useEffect } from "react";

interface SiteTexts {
  hero: { title: string; subtitle: string };
  about: { title: string; mission: string };
  sro: { title: string; description: string };
  [key: string]: Record<string, string>;
}

const SECTION_LABELS: Record<string, string> = {
  hero: "Главная страница (баннер)",
  about: "О комитете",
  sro: "СРО",
};

const FIELD_LABELS: Record<string, string> = {
  title: "Заголовок",
  subtitle: "Подзаголовок",
  mission: "Миссия",
  description: "Описание",
};

export default function TextsAdminPage() {
  const [data, setData] = useState<SiteTexts | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function loadData() {
    fetch("/api/admin/texts")
      .then((r) => {
        if (!r.ok) throw new Error("Ошибка загрузки");
        return r.json();
      })
      .then(setData)
      .catch(() => setMessage("Ошибка загрузки данных"));
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/texts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setMessage("Сохранено!");
      else setMessage("Ошибка сохранения");
    } catch {
      setMessage("Ошибка соединения");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  if (!data) return <div className="text-gray-500">Загрузка...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Тексты страниц</h1>
        <div className="flex items-center gap-3">
          {message && (
            <span className={`text-sm ${message === "Сохранено!" ? "text-green-600" : "text-red-600"}`}>
              {message}
            </span>
          )}
          <button
            onClick={() => { setMessage(""); loadData(); }}
            className="px-5 py-2.5 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Отменить
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(data).map(([section, fields]) => (
          <div key={section} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h2 className="font-semibold text-gray-900 mb-4">
              {SECTION_LABELS[section] || section}
            </h2>
            <div className="space-y-4">
              {Object.entries(fields as Record<string, string>).map(([field, value]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {FIELD_LABELS[field] || field}
                  </label>
                  {String(value).length > 100 ? (
                    <textarea
                      value={String(value)}
                      onChange={(e) =>
                        setData({
                          ...data,
                          [section]: { ...data[section], [field]: e.target.value },
                        })
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y"
                    />
                  ) : (
                    <input
                      type="text"
                      value={String(value)}
                      onChange={(e) =>
                        setData({
                          ...data,
                          [section]: { ...data[section], [field]: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

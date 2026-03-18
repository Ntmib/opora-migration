"use client";

import { useState, useEffect } from "react";

interface ContactInfo {
  phones: { number: string; label: string }[];
  email: string;
  address: string;
  telegram: string;
  telegramPersonal: string;
  maxNews: string;
  maxCommittee: string;
  chairmanName: string;
  chairmanTitle: string;
  secretaryName: string;
}

export default function ContactsAdminPage() {
  const [data, setData] = useState<ContactInfo | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/contacts")
      .then((r) => {
        if (!r.ok) throw new Error("Ошибка загрузки");
        return r.json();
      })
      .then((d) => {
        // Гарантируем что phones — массив
        if (!Array.isArray(d.phones)) d.phones = [];
        setData(d);
      })
      .catch(() => setMessage("Ошибка загрузки данных"));
  }, []);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/admin/contacts", {
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
        <h1 className="text-2xl font-bold text-gray-900">Контакты</h1>
        <div className="flex items-center gap-3">
          {message && (
            <span className={`text-sm ${message === "Сохранено!" ? "text-green-600" : "text-red-600"}`}>
              {message}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-6">
        <div>
          <h2 className="font-semibold text-gray-900 mb-4">Руководство</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Председатель (ФИО)</label>
              <input
                type="text"
                value={data.chairmanName}
                onChange={(e) => setData({ ...data, chairmanName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Должность председателя</label>
              <input
                type="text"
                value={data.chairmanTitle}
                onChange={(e) => setData({ ...data, chairmanTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Секретарь (ФИО)</label>
              <input
                type="text"
                value={data.secretaryName}
                onChange={(e) => setData({ ...data, secretaryName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-4">Телефоны</h2>
          {data.phones.map((phone, i) => (
            <div key={i} className="flex gap-3 mb-3">
              <input
                type="text"
                value={phone.number}
                onChange={(e) => {
                  const phones = [...data.phones];
                  phones[i] = { ...phones[i], number: e.target.value };
                  setData({ ...data, phones });
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Номер телефона"
              />
              <input
                type="text"
                value={phone.label}
                onChange={(e) => {
                  const phones = [...data.phones];
                  phones[i] = { ...phones[i], label: e.target.value };
                  setData({ ...data, phones });
                }}
                className="w-36 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Подпись"
              />
              <button
                onClick={() => {
                  const phones = data.phones.filter((_, idx) => idx !== i);
                  setData({ ...data, phones });
                }}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            onClick={() => setData({ ...data, phones: [...data.phones, { number: "", label: "" }] })}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            + Добавить телефон
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telegram канал</label>
            <input
              type="url"
              value={data.telegram}
              onChange={(e) => setData({ ...data, telegram: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Telegram (личный)</label>
            <input
              type="url"
              value={data.telegramPersonal}
              onChange={(e) => setData({ ...data, telegramPersonal: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">MAX (новости)</label>
            <input
              type="url"
              value={data.maxNews}
              onChange={(e) => setData({ ...data, maxNews: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">MAX (комитет)</label>
            <input
              type="url"
              value={data.maxCommittee}
              onChange={(e) => setData({ ...data, maxCommittee: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Адрес</label>
          <textarea
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-y"
          />
        </div>
      </div>
    </div>
  );
}

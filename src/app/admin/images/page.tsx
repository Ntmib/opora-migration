"use client";

import { useState, useEffect, useRef } from "react";

interface ImageItem {
  name: string;
  url: string;
}

export default function ImagesAdminPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    try {
      const res = await fetch("/api/admin/images");
      if (!res.ok) throw new Error("Ошибка");
      const data = await res.json();
      setImages(Array.isArray(data) ? data : []);
    } catch {
      setImages([]);
    }
  }

  function showMessage(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showMessage("Файл слишком большой (максимум 2 МБ)");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        showMessage("Загружено!");
        loadImages();
      } else {
        const data = await res.json();
        showMessage(data.error || "Ошибка загрузки");
      }
    } catch {
      showMessage("Ошибка соединения");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function handleDelete(name: string) {
    const res = await fetch("/api/admin/images", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      showMessage("Удалено");
      setConfirmDelete(null);
      loadImages();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Фотографии</h1>
        <div className="flex items-center gap-3">
          {message && (
            <span className={`text-sm ${message.includes("!") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </span>
          )}
          <label className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            {uploading ? "Загрузка..." : "Загрузить фото"}
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Допустимые форматы: JPG, PNG, WebP. Максимальный размер: 2 МБ.
        Чтобы использовать фото на сайте, скопируйте путь (например: /uploads/имя-файла.jpg)
      </p>

      {images.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-gray-200">
          Загруженных фото пока нет
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.name} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="aspect-square bg-gray-100">
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500 truncate mb-2" title={img.url}>
                  {img.url}
                </p>
                {confirmDelete === img.name ? (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(img.name)}
                      className="flex-1 px-2 py-1 bg-red-600 text-white rounded text-xs"
                    >
                      Да
                    </button>
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="flex-1 px-2 py-1 bg-gray-200 rounded text-xs"
                    >
                      Нет
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDelete(img.name)}
                    className="w-full px-2 py-1 text-red-600 hover:bg-red-50 rounded text-xs transition-colors"
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
  );
}

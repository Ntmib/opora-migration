"use client";

import { useEffect, useState } from "react";

interface TgPost {
  id: string;
  date: string;
  text: string;
  fullText: string;
  link: string;
  image: string | null;
}

export default function TelegramNews() {
  const [posts, setPosts] = useState<TgPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [maxUrl, setMaxUrl] = useState<string>("");

  useEffect(() => {
    fetch("/api/telegram")
      .then((r) => r.json())
      .then((data) => {
        if (data.posts) setPosts(data.posts);
        if (data.maxChannelUrl) setMaxUrl(data.maxChannelUrl);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (expandedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [expandedId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
          >
            <div className="h-48 bg-gray-200" />
            <div className="p-5">
              <div className="h-3 bg-gray-200 rounded w-20 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() =>
              setExpandedId(expandedId === post.id ? null : post.id)
            }
          >
            {post.image ? (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 px-2.5 py-1 rounded-full">
                    {new Date(post.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative h-48 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-white/20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                <div className="absolute top-3 left-3">
                  <span className="bg-white/20 backdrop-blur-sm text-xs font-medium text-white px-2.5 py-1 rounded-full">
                    {new Date(post.date).toLocaleDateString("ru-RU", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
              </div>
            )}
            <div className="p-5">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 leading-snug line-clamp-3 group-hover:text-primary transition-colors">
                {post.text}
              </h3>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs text-gray-400">
                  {new Date(post.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="text-xs text-primary font-medium">
                  Читать
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Expanded post modal */}
      {expandedId && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedId(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const post = posts.find((p) => p.id === expandedId);
              if (!post) return null;
              return (
                <>
                  {post.image && (
                    <div className="relative">
                      <img
                        src={post.image}
                        alt=""
                        className="w-full max-h-80 object-cover rounded-t-2xl"
                      />
                    </div>
                  )}
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-[#229ED9]"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                        <time className="text-sm text-primary font-medium">
                          {new Date(post.date).toLocaleDateString("ru-RU", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </time>
                      </div>
                      <button
                        onClick={() => setExpandedId(null)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                      {post.fullText}
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-4">
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-[#229ED9] hover:text-[#1a7ab8] font-medium transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                        </svg>
                        Telegram
                      </a>
                      {maxUrl && (
                        <a
                          href={maxUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-[#168DE2] hover:text-[#1065a8] font-medium transition-colors"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2"/>
                            <text x="12" y="16" textAnchor="middle" fontSize="11" fontWeight="bold" fill="currentColor">M</text>
                          </svg>
                          MAX
                        </a>
                      )}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
}

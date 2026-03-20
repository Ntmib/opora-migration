"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TgPost {
  id: string;
  date: string;
  text: string;
  fullText: string;
  link: string;
  image: string | null;
}

export default function LatestNews() {
  const [posts, setPosts] = useState<TgPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/telegram")
      .then((r) => r.json())
      .then((data) => {
        if (data.posts) setPosts(data.posts.slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse"
          >
            <div className="h-36 bg-gray-200" />
            <div className="p-5">
              <div className="h-3 bg-gray-200 rounded w-20 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {posts.map((post) => (
        <Link
          key={post.id}
          href="/news"
          className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group block h-full"
        >
          {post.image ? (
            <div className="relative h-36 overflow-hidden">
              <img
                src={post.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ) : (
            <div className="relative h-36 bg-gradient-to-br from-[#1e3a5f] via-[#2a5080] to-[#1a3055] flex items-end p-4">
              <div className="absolute top-2.5 right-2.5 opacity-10">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2" />
                </svg>
              </div>
              <p className="text-white font-semibold text-xs leading-snug line-clamp-3 relative z-10">
                {post.text}
              </p>
            </div>
          )}
          <div className="p-5">
            <time className="text-xs text-primary font-semibold">
              {new Date(post.date).toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <h3 className="text-gray-900 font-bold mt-2 text-sm leading-snug line-clamp-3 group-hover:text-primary transition-colors">
              {post.text}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

import type { Metadata } from "next";
import { news, formatDate } from "@/data/news";

export const metadata: Metadata = {
  title: "Новости",
  description:
    "Новости Комитета «ОПОРЫ РОССИИ» по развитию национального рынка труда и мониторингу миграционных процессов.",
};

export default function NewsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Новости
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Актуальные события и материалы Комитета
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <time className="text-sm text-primary font-medium">
                  {formatDate(item.date)}
                </time>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-2 mb-3 leading-snug">
                  {item.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">{item.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

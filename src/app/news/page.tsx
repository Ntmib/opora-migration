import type { Metadata } from "next";
import { news, formatDate } from "@/data/news";
import TelegramNews from "@/components/TelegramNews";
import AnimateOnScroll from "@/components/AnimateOnScroll";

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
              Актуальные события и материалы Комитета. Нажмите на карточку, чтобы прочитать полностью.
            </p>
          </div>
        </div>
      </section>

      {/* Telegram channel posts — card gallery */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up">
            <div className="flex items-center gap-3 mb-8">
              <svg
                className="w-6 h-6 text-[#229ED9]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Из Telegram-канала
              </h2>
              <a
                href="https://t.me/trud_migr"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-sm text-primary hover:text-primary-dark font-medium transition-colors"
              >
                @trud_migr →
              </a>
            </div>
          </AnimateOnScroll>
          <TelegramNews />
        </div>
      </section>

      {/* Archive news */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll direction="up">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8">
              Архив новостей
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {news.map((item, i) => (
              <AnimateOnScroll key={item.id} direction="up" delay={i * 0.05}>
                <article className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
                  <time className="text-sm text-primary font-medium">
                    {formatDate(item.date)}
                  </time>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-2 mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {item.excerpt}
                  </p>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

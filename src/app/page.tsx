import Link from "next/link";
import Image from "next/image";
import LatestNews from "@/components/LatestNews";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export default function HomePage() {
  return (
    <>
      {/* Hero with photo */}
      <section className="relative text-white overflow-hidden min-h-[600px] lg:min-h-[700px]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Заседание комитета ОПОРЫ РОССИИ"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/90 to-primary/80 md:from-primary-dark/95 md:via-primary/85 md:to-primary/70" />
        </div>

        {/* Decorative */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <div
              className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/20"
              style={{ animation: "count-up 0.6s ease-out" }}
            >
              ОПОРА РОССИИ
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ animation: "count-up 0.8s ease-out" }}
            >
              Развитие национального рынка труда
            </h1>
            <p
              className="text-lg sm:text-xl text-white/80 leading-relaxed mb-10 max-w-2xl"
              style={{ animation: "count-up 1s ease-out" }}
            >
              Комитет по развитию национального рынка труда и мониторингу
              миграционных процессов. Прозрачность, открытость и
              профессиональный подход к решению задач.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{ animation: "count-up 1.2s ease-out" }}
            >
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg shadow-black/10"
              >
                О комитете
              </Link>
              <Link
                href="/join"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 hover:scale-105 transition-all duration-300"
              >
                Вступить в комитет
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* SRO Banner */}
      <section className="bg-gradient-to-r from-[#0a3d6b] to-[#1e87f0] py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a
            href="/sro"
            className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 sm:py-6 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0 border border-white/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-lg sm:text-xl">
                  Вступление в СРО в области трудоустройства иностранных граждан
                </p>

              </div>
            </div>
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-xl group-hover:bg-gray-100 group-hover:scale-105 transition-all duration-300 shadow-lg shrink-0">
              Подробнее
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        </div>
      </section>

      {/* Key directions */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
              Направления деятельности
            </h2>
            <p className="text-gray-500 text-center max-w-2xl mx-auto mb-16">
              Ключевые области работы Комитета по развитию национального рынка труда
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimateOnScroll delay={0} direction="up">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover h-full">
                <div className="relative h-48">
                  <Image src="/images/event-1.jpg" alt="Законотворчество" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20 -mt-14 relative z-10 border-4 border-white">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Законотворчество</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Участие в разработке и экспертизе законодательных актов в сфере миграционной политики и трудовых отношений.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={150} direction="up">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover h-full">
                <div className="relative h-48">
                  <Image src="/images/event-2.jpg" alt="Поддержка МСП" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20 -mt-14 relative z-10 border-4 border-white">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Поддержка МСП</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Поддержка субъектов малого и среднего предпринимательства, использующих труд иностранных работников.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300} direction="up">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover h-full">
                <div className="relative h-48">
                  <Image src="/images/event-3.jpg" alt="Миграционная инфраструктура" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/20 -mt-14 relative z-10 border-4 border-white">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Миграционная инфраструктура</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Координация предпринимателей в миграционной инфраструктуре и применение лучших практик.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Chairman quote with photo */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                  <Image src="/images/nuzhdin.jpg" alt="Сергей Нуждин — Председатель Комитета" fill className="object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-primary/5 rounded-2xl -z-10" />
              </div>
              <div>
                <div className="inline-block px-3 py-1 bg-primary-light text-primary text-sm font-semibold rounded-full mb-6">
                  Председатель Комитета
                </div>
                <blockquote className="text-xl sm:text-2xl font-medium text-gray-900 leading-relaxed mb-6">
                  «Мы работаем на принципах прозрачности и открытости, содействуя развитию национального рынка труда и совершенствованию миграционной политики»
                </blockquote>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Сергей Нуждин — председатель Комитета «ОПОРЫ РОССИИ» по развитию национального рынка труда и мониторингу миграционных процессов.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-dark transition-colors group"
                >
                  Подробнее о комитете
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center">
              Мероприятия
            </h2>
            <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
              Ключевые события с участием Комитета
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimateOnScroll delay={0} className="col-span-2 row-span-2">
              <div className="relative rounded-2xl overflow-hidden shadow-md h-full min-h-[300px] lg:min-h-[400px] group">
                <Image src="/images/pmef-2025.jpg" alt="ПМЭФ 2025" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">ПМЭФ 2025</span>
                  <p className="text-sm mt-2 font-medium">Заседание Комитета на Петербургском международном экономическом форуме</p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={100}>
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-square group">
                <Image src="/images/vef-2024.webp" alt="ВЭФ 2024" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">ВЭФ 2024</span>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={200}>
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-square group">
                <Image src="/images/uzbekistan.jpg" alt="Узбекистан" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">Ташкент 2022</span>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={300}>
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-square group">
                <Image src="/images/presidium.jpg" alt="Президиум" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">Президиум</span>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={400}>
              <div className="relative rounded-2xl overflow-hidden shadow-md aspect-square group">
                <Image src="/images/event-1.jpg" alt="Заседание" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white text-xs font-medium bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">Заседание</span>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div
              className="relative rounded-3xl p-10 sm:p-16 text-center text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0a3d6b 0%, #1e87f0 50%, #4da8f7 100%)",
              }}
            >
              <div className="absolute top-[-50%] right-[-20%] w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-[-50%] left-[-20%] w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
              <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-bold mb-5">
                  Вступить в комитет
                </h2>
                <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                  Присоединяйтесь к работе Комитета для совместного развития
                  национального рынка труда и совершенствования миграционной политики.
                </p>
                <Link
                  href="/join"
                  className="inline-flex items-center justify-center px-10 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Подать заявку
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Latest news */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Последние новости
              </h2>
              <Link
                href="/news"
                className="text-primary hover:text-primary-dark font-medium text-sm hidden sm:inline-flex items-center gap-1.5 transition-colors group"
              >
                Все новости
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </AnimateOnScroll>

          <LatestNews />

          <AnimateOnScroll className="mt-8 text-center sm:hidden">
            <Link
              href="/news"
              className="text-primary hover:text-primary-dark font-medium text-sm inline-flex items-center gap-1"
            >
              Все новости →
            </Link>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}

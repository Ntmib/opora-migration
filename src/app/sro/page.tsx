import type { Metadata } from "next";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "СРО — Саморегулируемая организация по трудоустройству иностранных граждан",
  description:
    "Вступление в добровольную саморегулируемую организацию в сфере трудоустройства иностранных граждан на базе Комитета «ОПОРЫ РОССИИ».",
};

const advantages = [
  {
    title: "Соответствие законодательству",
    text: "Возможность соответствовать будущим требованиям законодательства уже сегодня",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Влияние на стандарты",
    text: "Напрямую влиять на отраслевые стандарты до полного вступления закона в силу",
    icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  },
  {
    title: "Высокие стандарты качества",
    text: "Работа по высоким стандартам качества в составе пула ответственных игроков рынка",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  {
    title: "Защита интересов",
    text: "Площадка «ОПОРЫ РОССИИ» отстаивает интересы участников рынка на всех уровнях",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
  },
];

export default function SroPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative bg-gradient-to-br from-primary-dark to-primary text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-10%] w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6 border border-white/20">
              Саморегулируемая организация
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
              СРО в области трудоустройства иностранных граждан
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Присоединяйтесь к созданию цивилизованного рынка труда
            </p>
          </div>
        </div>
      </section>

      {/* About SRO */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                О саморегулируемой организации
              </h2>
              <div className="space-y-5 text-gray-600 leading-relaxed text-lg">
                <p>
                  На базе Комитета по развитию национального рынка труда «ОПОРЫ РОССИИ»
                  уже запущен процесс создания добровольной саморегулируемой организации.
                </p>
                <p>
                  Мы формируем пул ответственных игроков рынка, которые готовы уже сегодня
                  работать по высоким стандартам качества.
                </p>
                <p>
                  Участие в СРО — это возможность не только соответствовать будущим
                  требованиям законодательства, но и напрямую влиять на отраслевые
                  стандарты до полного вступления закона в силу.
                </p>
                <p>
                  Приглашаем всех заинтересованных вступить, выразить волю: стать членами
                  СРО, которая формируется на базе «ОПОРЫ РОССИИ», площадке, задающей
                  высокий уровень качества и стандартов, а также отстаивающей интересы
                  участников рынка.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
              Преимущества участия
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {advantages.map((item, i) => (
              <AnimateOnScroll key={i} delay={i * 100} direction="up">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 card-hover h-full">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center mb-5 shadow-lg shadow-primary/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.text}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
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
                  Вступить в СРО
                </h2>
                <p className="text-white/80 text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
                  Приглашаем коммерческие организации присоединиться к формированию
                  добровольной саморегулируемой организации по трудоустройству иностранных граждан.
                </p>
                <p className="text-white/60 text-sm mb-10 max-w-xl mx-auto">
                  19 марта · Онлайн · Бесплатно
                </p>
                <a
                  href="https://opora-rossii-2026.timepad.ru/event/3868366/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  Зарегистрироваться
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}

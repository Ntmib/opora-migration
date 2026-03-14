import type { Metadata } from "next";
import Image from "next/image";
import AnimateOnScroll from "@/components/AnimateOnScroll";

export const metadata: Metadata = {
  title: "О комитете",
  description:
    "Комитет «ОПОРЫ РОССИИ» по развитию национального рынка труда и мониторингу миграционных процессов. Цели, задачи и руководство комитета.",
};

const goals = [
  "Координация предпринимателей в миграционной инфраструктуре",
  "Формирование инициатив и участие в законотворческом процессе",
  "Подготовка предложений по развитию миграционной сферы",
  "Применение лучших практик в области миграционных отношений",
  "Повышение информированности МСП о миграционном законодательстве",
  "Разработка стандартов государственно-частного партнерства",
];

const tasks = [
  "Поддержка субъектов МСП, использующих труд иностранных работников",
  "Участие в разработке государственных программ",
  "Реформирование нормативной базы",
  "Участие в законотворчестве и экспертизе законодательных актов",
];

export default function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="relative bg-gradient-to-br from-primary-dark to-primary text-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute top-[-30%] right-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              О комитете
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Комитет «ОПОРЫ РОССИИ» по развитию национального рынка труда и
              мониторингу миграционных процессов
            </p>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
              Цели комитета
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {goals.map((goal, i) => (
              <AnimateOnScroll key={i} delay={i * 80} direction="up">
                <div className="flex gap-4 items-start bg-gray-50 rounded-xl p-6 border border-gray-100 card-hover h-full">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{i + 1}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{goal}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Tasks */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
              Задачи комитета
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tasks.map((task, i) => (
              <AnimateOnScroll key={i} delay={i * 100} direction="up">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 card-hover h-full">
                  <div className="flex gap-3 items-start">
                    <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-700 leading-relaxed">{task}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>


      {/* SRO */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary-dark to-primary text-white overflow-hidden relative">
        <div className="absolute top-[-30%] right-[-15%] w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimateOnScroll>
            <div className="max-w-3xl">
              <div className="inline-block px-3 py-1 bg-white/15 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-6 border border-white/20">
                Саморегулируемая организация
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                СРО в области трудоустройства иностранных граждан
              </h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Комитет инициирует формирование добровольной саморегулируемой организации в сфере трудоустройства иностранцев. Цель — работать по высоким стандартам качества и влиять на отраслевые стандарты до полного вступления закона в силу.
              </p>
              <p className="text-white/80 leading-relaxed mb-8">
                Приглашаем коммерческие организации присоединиться к формированию СРО и участвовать в разработке стандартов отрасли.
              </p>
              <a
                href="https://opora-rossii-2026.timepad.ru/event/3868366/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Подробнее и регистрация
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Chairman */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
              Руководство
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll direction="up">
            <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100 max-w-3xl">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shrink-0 shadow-lg">
                  <Image
                    src="/images/nuzhdin.jpg"
                    alt="Сергей Николаевич Нуждин"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Сергей Николаевич Нуждин
                  </h3>
                  <p className="text-primary font-medium mb-4">Председатель комитета</p>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Президент Международной ассоциации развития и содействия миграции.
                    Член Президиума «ОПОРЫ РОССИИ».
                  </p>
                  <p className="text-gray-500 leading-relaxed text-sm">
                    Эксперт в области трудовой миграции, активный участник законотворческого
                    процесса. Выступает на крупнейших форумах: ПМЭФ, ВЭФ, ПМЮФ.
                  </p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}

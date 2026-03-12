import type { Metadata } from "next";

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
      <section className="bg-gradient-to-br from-primary-dark to-primary text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
            Цели комитета
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {goals.map((goal, i) => (
              <div
                key={i}
                className="flex gap-4 items-start bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">{i + 1}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{goal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tasks */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
            Задачи комитета
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {tasks.map((task, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex gap-3 items-start">
                  <svg
                    className="w-5 h-5 text-primary shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <p className="text-gray-700 leading-relaxed">{task}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chairman */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
            Руководство
          </h2>
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100 max-w-2xl">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-light rounded-full flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-xl sm:text-2xl">СН</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Сергей Николаевич Нуждин
                </h3>
                <p className="text-primary font-medium mb-3">Председатель комитета</p>
                <p className="text-gray-600 leading-relaxed">
                  Президент Международной ассоциации развития и содействия миграции.
                  Член Президиума «ОПОРЫ РОССИИ».
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

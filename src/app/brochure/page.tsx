import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Памятка для трудовых мигрантов",
  description:
    "Памятка для трудовых мигрантов — Самарская область. Миграционный учёт, патент на работу, трудовой договор, правила поведения.",
};

const sections = [
  { id: "registration", icon: "📋", title: "Миграционный учёт" },
  { id: "patent", icon: "📄", title: "Патент на работу" },
  { id: "contract", icon: "🤝", title: "Трудовой договор" },
  { id: "responsibility", icon: "⚖️", title: "Ответственность" },
  { id: "behavior", icon: "🏛️", title: "Как вести себя" },
  { id: "sim", icon: "📱", title: "Сим-карты" },
  { id: "family", icon: "👨‍👩‍👧", title: "Семья и дети" },
  { id: "samara", icon: "🏙️", title: "О Самарской области" },
];

export default function BrochurePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#0a3d6b] text-white py-10 px-4 text-center print:bg-white print:text-black print:border-b-2 print:border-[#1e87f0]">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm uppercase tracking-widest mb-3 opacity-80">
            Министерство внутренней политики Самарской области
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Памятка для трудовых мигрантов
          </h1>
          <div className="flex items-start justify-center gap-12 mt-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center p-2 shadow-lg">
                <img src="/images/logo-rcpm.jpg" alt="АНО РЦПМ" className="w-20 h-20 rounded-full object-cover" />
              </div>
              <span className="text-xs opacity-90 max-w-[140px] leading-snug text-center">АНО «Региональный центр помощи мигрантам»</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center p-1 shadow-lg">
                <img src="/images/logo-ddn.png" alt="Дом дружбы народов" className="w-[88px] h-[88px] rounded-full object-contain" />
              </div>
              <span className="text-xs opacity-90 max-w-[140px] leading-snug text-center">ГКУ СО «Дом дружбы народов»</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm print:hidden">
        <div className="max-w-2xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-gray-100 hover:bg-blue-50 hover:text-[#0a3d6b] transition-colors whitespace-nowrap"
              >
                <span>{s.icon}</span>
                <span>{s.title}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-12 print:space-y-8">

        <section id="registration" className="scroll-mt-16">
          <SectionTitle icon="📋" title="Миграционный учёт" />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Иностранный гражданин, въезжая в Россию, получает{" "}
              <strong>миграционную карту</strong>. В ней желательно указать цель{" "}
              <strong>«Работа»</strong> (но сейчас это не обязательно).
            </p>
            <p>
              Приехав в Россию, нужно пройти{" "}
              <strong>обязательную дактилоскопическую регистрацию</strong> и
              фотографирование в течение <strong>30 календарных дней</strong> со дня въезда.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Сроки постановки на учёт</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#1e87f0] shrink-0">30 дней</span>
                  <span>— граждане ЕАЭС</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#1e87f0] shrink-0">15 дней</span>
                  <span>— граждане Узбекистана или Таджикистана</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#1e87f0] shrink-0">7 дней</span>
                  <span>— граждане других стран</span>
                </li>
              </ul>
            </div>

            <p>
              <strong>Принимающей стороной</strong> может быть: физическое лицо,
              юридическое лицо, государственный орган или международная организация.
            </p>

            <p>
              Срок временного пребывания — не более{" "}
              <strong>90 суток (суммарно)</strong> в течение одного календарного года.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Продление пребывания</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Трудовой договор (до 1 года)</li>
                <li>Выдача или продление патента</li>
                <li>Подача документов на РВП или вид на жительство</li>
                <li>Подача на гражданство РФ</li>
                <li>Программа переселения соотечественников</li>
                <li>Близкое родство с гражданином РФ</li>
              </ul>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 text-amber-900">
              <div className="flex items-start gap-2">
                <span className="text-lg shrink-0">⚠️</span>
                <div>С <strong>1 декабря 2025 года</strong> сдавать отпечатки пальцев и фотографироваться нужно на всех пограничных пунктах. Эксперимент до 30 июня 2026 года.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="patent" className="scroll-mt-16">
          <SectionTitle icon="📄" title="Получение патента на работу" />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>Патент на работу</strong> — документ, дающий право иностранному гражданину работать в России у физического или юридического лица.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Важно знать</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Работать можно только по указанной профессии</li>
                <li>Действует только в регионе, где получен</li>
                <li>Выдаётся с 18 лет</li>
                <li>Срок — до 12 месяцев, оплата помесячно</li>
              </ul>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 text-amber-900">
              <div className="flex items-start gap-2">
                <span className="text-lg shrink-0">⚠️</span>
                <div>Не оплатили патент вовремя — <strong>он перестанет действовать!</strong></div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Документы для патента</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Заявление о выдаче патента</li>
                <li>Паспорт + нотариальный перевод</li>
                <li>Фото 3×4 см (цветное, матовое)</li>
                <li>Миграционная карта со штампом + копия</li>
                <li>Медицинские документы</li>
                <li>Сертификат об отсутствии ВИЧ</li>
                <li>Полис ДМС</li>
                <li>Документ о владении русским языком</li>
                <li>Квитанция об уплате НДФЛ</li>
                <li>Квитанция об уплате госпошлины</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 bg-blue-50 rounded-xl p-4 text-center">
              <div className="flex-1">
                <div className="text-2xl font-bold text-[#0a3d6b]">30 дней</div>
                <div className="text-sm text-gray-600">срок подачи документов</div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-bold text-[#0a3d6b]">10 рабочих дней</div>
                <div className="text-sm text-gray-600">срок оформления</div>
              </div>
            </div>
          </div>
        </section>

        <section id="contract" className="scroll-mt-16">
          <SectionTitle icon="🤝" title="Трудовой договор" />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>Трудовой договор</strong> — соглашение между работником и работодателем об их взаимных правах и обязанностях.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Обязанности работодателя</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Без задержек выплачивать заработную плату</li>
                <li>Предоставить безопасное рабочее место</li>
                <li>Проинформировать о графике и инструкциях</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Права работника</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Отказаться от опасных для жизни работ</li>
                <li>Отказаться от работы, не указанной в договоре</li>
                <li>Приостановить работу при задержке зарплаты более 15 дней</li>
                <li>Требовать копию договора и справки о зарплате</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Обязанности работника</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Добросовестно выполнять условия договора</li>
                <li>Предупредить об увольнении за 14 дней</li>
                <li>Соблюдать правила распорядка и ТБ</li>
                <li>Бережно относиться к имуществу</li>
              </ul>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 text-amber-900">
              <div className="flex items-start gap-2">
                <span className="text-lg shrink-0">⚠️</span>
                <div>В течение <strong>2 месяцев</strong> после получения патента направьте в МВД уведомление о трудовой деятельности + копию договора.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="responsibility" className="scroll-mt-16">
          <SectionTitle icon="⚖️" title="Виды ответственности" />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Россия — правовое государство. В зависимости от тяжести нарушения вы можете столкнуться с разными видами ответственности.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Миграционные нарушения</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Нахождение в России без документов</li>
                <li>Нарушение правил миграционного учёта</li>
                <li>Работа без патента или по чужому региону/профессии</li>
                <li>Пребывание после окончания срока документов</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Административная ответственность</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Нарушения общественного порядка</li>
                <li>Нецензурная брань в общественных местах</li>
                <li>Оскорбительные приставания</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Уголовная ответственность</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Вандализм</li>
                <li>Причинение вреда здоровью</li>
                <li>Угон, кража, грабёж, вымогательство</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="behavior" className="scroll-mt-16">
          <SectionTitle icon="🏛️" title="Как вести себя в России" />
          <div className="space-y-3 text-gray-700">
            <BehaviorCard icon="⚖️" title="Соблюдайте законы" text="Все проблемы можно решить законными путями. Не нужно давать взятки и «договариваться»." />
            <BehaviorCard icon="👴" title="Уважайте старших" text="Прислушивайтесь к советам, уступайте место в транспорте или очереди." />
            <BehaviorCard icon="🤫" title="Будьте сдержаны" text="«Счастье любит тишину». Не проявляйте эмоции слишком бурно в общественных местах." />
            <BehaviorCard icon="🙏" title="Будьте вежливы" text="Если нужна помощь — попросите вежливо, на «Вы», и вам помогут." />
            <BehaviorCard icon="🔇" title="Уважайте комфорт" text="Не принято громко говорить, слушать музыку, толкаться в общественных местах." />
            <BehaviorCard icon="🌍" title="Уважайте культуру" text="Россия — многонациональная страна. Уважайте местные традиции — к вашим отнесутся так же." />
          </div>
        </section>

        <section id="sim" className="scroll-mt-16">
          <SectionTitle icon="📱" title="Сотовая связь и интернет" />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 text-amber-900">
              <div className="flex items-start gap-2">
                <span className="text-lg shrink-0">⚠️</span>
                <div>С <strong>1 января 2025 года</strong> действуют особые правила покупки сим-карт для иностранных граждан.</div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Документы</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Паспорт + нотариальный перевод</li>
                <li>СНИЛС</li>
              </ul>
            </div>

            <h3 className="text-lg font-bold text-gray-800">Порядок оформления</h3>
            <div className="space-y-3">
              <StepCard step={1} text="Зарегистрируйтесь на портале Госуслуг и подтвердите учётную запись" />
              <StepCard step={2} text="Зарегистрируйтесь в Единой биометрической системе и сдайте данные" />
              <StepCard step={3} text="Купите или переоформите сим-карту после подтверждения личности" />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Ограничения</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Максимум <strong>10 сим-карт</strong></li>
                <li>Нельзя оплачивать наличными анонимно</li>
                <li>Нельзя купить в интернете</li>
                <li>Сим-карта привязана к конкретному телефону</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-[#0a3d6b] mb-2">📲 Приложение RUID</h3>
              <p className="text-gray-600">
                Скачайте для заполнения заявления. Работает на русском, армянском, казахском, киргизском, таджикском, узбекском и английском. Для входа нужны логин и пароль от Госуслуг.
              </p>
            </div>
          </div>
        </section>

        <section id="family" className="scroll-mt-16">
          <SectionTitle icon="👨‍👩‍👧" title="Семья и дети" />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Знание языка и культуры — <strong>непременное условие</strong> для жизни и работы в России.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Образование детей</h3>
              <p className="text-gray-600 mb-2">Дети старше <strong>6,5 лет</strong> обязательно должны учиться:</p>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Начальное (1–4 классы)</li>
                <li>Основное общее (5–9 классы)</li>
                <li>Среднее общее (10–11 классы)</li>
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-800 mb-2">Документы для школы</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Свидетельство о рождении</li>
                <li>Документы о законном пребывании (ВНЖ, РВП, виза)</li>
                <li>Документ о дактилоскопии ребёнка</li>
                <li>Паспорт или свидетельство о рождении ребёнка</li>
                <li>СНИЛС (ваш и ребёнка), ИНН</li>
                <li>Медицинское заключение</li>
              </ul>
              <p className="mt-2 text-sm font-semibold text-[#0a3d6b]">Все документы — на русском или с нотариальным переводом!</p>
            </div>

            <h3 className="text-lg font-bold text-gray-800">Зачисление в школу</h3>
            <div className="space-y-3">
              <StepCard step={1} text="Подайте заявление через МФЦ, РПГУ или Госуслуги" />
              <StepCard step={2} text="Пройдите тестирование на русский язык (7 дней после направления)" />
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-4 text-amber-900">
              <div className="flex items-start gap-2">
                <span className="text-lg shrink-0">⚠️</span>
                <div>За неисполнение обязанности по обучению ребёнка — <strong>административная ответственность</strong> и наблюдение правоохранительных органов.</div>
              </div>
            </div>
          </div>
        </section>

        <section id="samara" className="scroll-mt-16">
          <SectionTitle icon="🏙️" title="Информация о Самарской области" />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Самарскую область называют <strong>«сердцем России»</strong>. Площадь — 53,6 тыс. кв. км. Основана в <strong>1586 году</strong>. Сегодня здесь проживает более <strong>3 млн человек</strong>.
            </p>
            <p>
              В составе — 10 городов и 27 муниципальных районов. Один из ведущих экономических регионов с театрами, музеями и природными достопримечательностями.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <h3 className="font-semibold text-[#0a3d6b] mb-2">📍 Миграционные центры</h3>
              <ul className="space-y-2 text-gray-700">
                <li><strong>г. Самара:</strong> ул. Кабельная, 13а · ул. Черногорская, 2</li>
                <li><strong>г. Тольятти:</strong> Тупиковый проезд, 4</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="border-t border-gray-200 pt-8 pb-12 text-center text-sm text-gray-500 print:pb-4">
          <p className="mb-3">Полезные ссылки:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://t.me/fadnrf" className="text-[#1e87f0] hover:underline" target="_blank" rel="noopener noreferrer">@fadnrf</a>
            <a href="https://t.me/samddn" className="text-[#1e87f0] hover:underline" target="_blank" rel="noopener noreferrer">@samddn</a>
            <a href="https://t.me/chestniymigrant" className="text-[#1e87f0] hover:underline" target="_blank" rel="noopener noreferrer">@chestniymigrant</a>
            <a href="https://t.me/RCPM63_RU" className="text-[#1e87f0] hover:underline" target="_blank" rel="noopener noreferrer">@RCPM63_RU</a>
          </div>
          <p className="mt-6 text-xs text-gray-400">Министерство внутренней политики Самарской области</p>
        </footer>
      </main>
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-2xl">{icon}</span>
      <h2 className="text-2xl font-bold text-[#0a3d6b]">{title}</h2>
    </div>
  );
}

function BehaviorCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
      <span className="text-2xl shrink-0">{icon}</span>
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  );
}

function StepCard({ step, text }: { step: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-[#1e87f0] text-white flex items-center justify-center text-sm font-bold shrink-0">{step}</div>
      <div className="text-gray-700 pt-1">{text}</div>
    </div>
  );
}

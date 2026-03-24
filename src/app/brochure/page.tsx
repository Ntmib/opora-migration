import React from "react";
import type { Metadata } from "next";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  weight: ["400", "700", "900"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-merriweather",
});

export const metadata: Metadata = {
  title: "Памятка для трудовых мигрантов",
  description:
    "Памятка для трудовых мигрантов — Самарская область. Миграционный учёт, патент на работу, трудовой договор, правила поведения.",
};

const sections = [
  { id: "registration", num: "01", title: "Миграционный учёт" },
  { id: "patent", num: "02", title: "Патент на работу" },
  { id: "contract", num: "03", title: "Трудовой договор" },
  { id: "responsibility", num: "04", title: "Ответственность" },
  { id: "behavior", num: "05", title: "Как вести себя" },
  { id: "sim", num: "06", title: "Сим-карты" },
  { id: "family", num: "07", title: "Семья и дети" },
  { id: "samara", num: "08", title: "О Самарской области" },
];

const IconRegistration = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14l2 2 4-4"/></svg>;
const IconPatent = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 15l-2 5 2-1.5L14 20l-2-5z"/><circle cx="12" cy="10" r="6"/><path d="M9 10l2 2 4-4"/></svg>;
const IconContract = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/><path d="M9 15l2 2 4-4"/></svg>;
const IconResponsibility = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 3L2 8l10 5 10-5-10-5z"/><path d="M2 8v8l10 5 10-5V8"/><path d="M12 13v8"/></svg>;
const IconBehavior = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>;
const IconSim = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>;
const IconFamily = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="7" r="2"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M21 21v-2a3 3 0 0 0-3-3h-1"/></svg>;
const IconSamara = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M5 21V11l4-4 4 4v10"/><path d="M15 21V6l4-3v18"/><path d="M9 17h2"/><path d="M9 13h2"/></svg>;
const IconWarning = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>;
const IconDownload = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IconTelegram = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 1 0 24 12.056A12.014 12.014 0 0 0 11.944 0ZM16.906 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472c-.18 1.898-.962 6.502-1.36 8.627c-.168.9-.499 1.201-.82 1.23c-.696.064-1.225-.46-1.9-.902c-1.056-.693-1.653-1.124-2.678-1.8c-1.185-.78-.417-1.21.258-1.91c.177-.184 3.247-2.977 3.307-3.23c.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345c-.48.33-.913.49-1.302.48c-.428-.008-1.252-.241-1.865-.44c-.752-.245-1.349-.374-1.297-.789c.027-.216.325-.437.893-.663c3.498-1.524 5.83-2.529 6.998-3.014c3.332-1.386 4.025-1.627 4.476-1.635Z"/></svg>;

const sectionIcons: Record<string, React.ReactNode> = {
  registration: <IconRegistration />, patent: <IconPatent />, contract: <IconContract />,
  responsibility: <IconResponsibility />, behavior: <IconBehavior />, sim: <IconSim />,
  family: <IconFamily />, samara: <IconSamara />,
};

export default function BrochurePage() {
  return (
    <div className={`${merriweather.variable} min-h-screen bg-white`}>
      <style dangerouslySetInnerHTML={{ __html: `
        .brochure-hero {
          background: linear-gradient(135deg, #0B2545 0%, #13315C 60%, #0B2545 100%);
          position: relative; overflow: hidden;
        }
        .brochure-hero::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(30deg, rgba(212,168,67,0.04) 12%, transparent 12.5%, transparent 87%, rgba(212,168,67,0.04) 87.5%),
            linear-gradient(150deg, rgba(212,168,67,0.04) 12%, transparent 12.5%, transparent 87%, rgba(212,168,67,0.04) 87.5%),
            linear-gradient(30deg, rgba(212,168,67,0.04) 12%, transparent 12.5%, transparent 87%, rgba(212,168,67,0.04) 87.5%),
            linear-gradient(150deg, rgba(212,168,67,0.04) 12%, transparent 12.5%, transparent 87%, rgba(212,168,67,0.04) 87.5%);
          background-size: 80px 140px;
          background-position: 0 0, 0 0, 40px 70px, 40px 70px;
        }
        .section-num {
          font-family: var(--font-merriweather), Georgia, serif;
          font-weight: 900; font-size: 80px; line-height: 1;
          color: rgba(11, 37, 69, 0.06);
          position: absolute; top: -10px; left: -8px;
          user-select: none; pointer-events: none;
        }
        .section-title { font-family: var(--font-merriweather), Georgia, serif; font-weight: 700; }
        .gold-divider { display: flex; align-items: center; gap: 12px; margin: 0 auto; max-width: 200px; }
        .gold-divider::before, .gold-divider::after { content: ''; flex: 1; height: 1px; background: #D4A843; }
        .gold-divider-dot { width: 6px; height: 6px; background: #D4A843; transform: rotate(45deg); }
        .info-card { border-left: 3px solid #0B2545; background: rgba(11,37,69,0.02); box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
        .warning-card { background: linear-gradient(135deg, #C2553A, #a8432c); color: #fff; }
        .warning-card svg { stroke: #fff; }
        .timeline-line { position: absolute; left: 15px; top: 32px; bottom: 4px; width: 2px; background: linear-gradient(to bottom, #D4A843, rgba(212,168,67,0.2)); }
        .stat-num { font-family: var(--font-merriweather), Georgia, serif; font-weight: 900; font-size: 36px; color: #D4A843; line-height: 1.1; }
        @media (max-width: 640px) { .section-num { font-size: 56px; top: -6px; } .stat-num { font-size: 28px; } }
      `}} />

      <header className="brochure-hero text-white py-16 px-4 print:bg-white print:text-black">
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.25em] mb-2 text-white/60 font-medium">Министерство внутренней политики</p>
          <p className="text-sm uppercase tracking-[0.15em] mb-6 text-white/80 font-medium">Самарской области</p>
          <div className="w-16 h-[1px] bg-[#D4A843] mx-auto mb-8" />
          <h1 className="section-title text-3xl md:text-[42px] leading-tight mb-3 text-white">Памятка</h1>
          <p className="text-lg md:text-xl text-white/70 mb-10 font-light tracking-wide">для трудовых мигрантов</p>
          <div className="flex items-start justify-center gap-10 md:gap-16 mb-10">
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-[72px] h-[72px] rounded-full bg-white/95 flex items-center justify-center p-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <img src="/images/logo-rcpm.jpg" alt="АНО РЦПМ" className="w-[60px] h-[60px] rounded-full object-cover" />
              </div>
              <span className="text-[11px] text-white/70 max-w-[130px] leading-snug text-center">АНО «Региональный центр помощи мигрантам»</span>
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <div className="w-[72px] h-[72px] rounded-full bg-white/95 flex items-center justify-center p-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                <img src="/images/logo-ddn.png" alt="Дом дружбы народов" className="w-[64px] h-[64px] rounded-full object-contain" />
              </div>
              <span className="text-[11px] text-white/70 max-w-[130px] leading-snug text-center">ГКУ СО «Дом дружбы народов»</span>
            </div>
          </div>
          <a href="/api/brochure-pdf" target="_blank" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D4A843] text-[#0B2545] text-sm font-semibold hover:bg-[#c49a35] transition-colors shadow-lg print:hidden">
            <IconDownload />Скачать PDF
          </a>
        </div>
      </header>

      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#0B2545]/10 shadow-sm print:hidden">
        <div className="max-w-3xl mx-auto px-4 py-2.5 overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm text-[#0B2545]/60 hover:text-[#0B2545] hover:bg-[#0B2545]/5 transition-colors whitespace-nowrap">
                <span className="text-[10px] font-bold text-[#D4A843]">{s.num}</span>
                <span>{s.title}</span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4">

        <section id="registration" className="scroll-mt-14 py-12 md:py-16">
          <SectionHeader num="01" title="Миграционный учёт" icon={sectionIcons.registration} />
          <div className="space-y-5 text-[#374151] leading-relaxed">
            <p>Иностранный гражданин, въезжая в Россию, получает <strong className="text-[#0B2545]">миграционную карту</strong>. В ней желательно указать цель <strong className="text-[#0B2545]">«Работа»</strong> (но сейчас это не обязательно).</p>
            <p>Приехав в Россию, нужно пройти <strong className="text-[#0B2545]">обязательную дактилоскопическую регистрацию</strong> и фотографирование в течение <strong className="text-[#0B2545]">30 календарных дней</strong> со дня въезда.</p>
            <InfoCard title="Сроки постановки на учёт">
              <div className="space-y-2.5">
                <div className="flex items-baseline gap-3"><span className="stat-num text-2xl">30</span><span className="text-sm text-[#4b5563]">дней — граждане ЕАЭС</span></div>
                <div className="flex items-baseline gap-3"><span className="stat-num text-2xl">15</span><span className="text-sm text-[#4b5563]">дней — граждане Узбекистана или Таджикистана</span></div>
                <div className="flex items-baseline gap-3"><span className="stat-num text-2xl">7</span><span className="text-sm text-[#4b5563]">дней — граждане других стран</span></div>
              </div>
            </InfoCard>
            <p><strong className="text-[#0B2545]">Принимающей стороной</strong> может быть: физическое лицо, юридическое лицо, государственный орган или международная организация.</p>
            <p>Срок временного пребывания — не более <strong className="text-[#0B2545]">90 суток (суммарно)</strong> в течение одного календарного года.</p>
            <InfoCard title="Продление пребывания">
              <BulletList items={["Трудовой договор (до 1 года)","Выдача или продление патента","Подача документов на РВП или вид на жительство","Подача на гражданство РФ","Программа переселения соотечественников","Близкое родство с гражданином РФ"]} />
            </InfoCard>
            <WarningCard>С <strong>1 декабря 2025 года</strong> сдавать отпечатки пальцев и фотографироваться нужно на всех пограничных пунктах. Эксперимент до 30 июня 2026 года.</WarningCard>
          </div>
          <GoldDivider />
        </section>

        <section id="patent" className="scroll-mt-14 py-12 md:py-16 bg-[#FAFAF5] -mx-4 px-4 md:-mx-8 md:px-8 rounded-2xl">
          <SectionHeader num="02" title="Получение патента на работу" icon={sectionIcons.patent} />
          <div className="space-y-5 text-[#374151] leading-relaxed">
            <p><strong className="text-[#0B2545]">Патент на работу</strong> — документ, дающий право иностранному гражданину работать в России у физического или юридического лица.</p>
            <InfoCard title="Важно знать"><BulletList items={["Работать можно только по указанной профессии","Действует только в регионе, где получен","Выдаётся с 18 лет","Срок — до 12 месяцев, оплата помесячно"]} /></InfoCard>
            <WarningCard>Не оплатили патент вовремя — <strong>он перестанет действовать!</strong></WarningCard>
            <InfoCard title="Документы для патента"><BulletList items={["Заявление о выдаче патента","Паспорт + нотариальный перевод","Фото 3×4 см (цветное, матовое)","Миграционная карта со штампом + копия","Медицинские документы","Сертификат об отсутствии ВИЧ","Полис ДМС","Документ о владении русским языком","Квитанция об уплате НДФЛ","Квитанция об уплате госпошлины"]} /></InfoCard>
            <div className="flex gap-4 sm:gap-8 justify-center py-4">
              <div className="text-center"><div className="stat-num">30</div><div className="text-xs text-[#6b7280] mt-1">дней на подачу<br/>документов</div></div>
              <div className="text-[#D4A843] text-3xl font-light self-center">/</div>
              <div className="text-center"><div className="stat-num">10</div><div className="text-xs text-[#6b7280] mt-1">рабочих дней<br/>на оформление</div></div>
            </div>
          </div>
          <GoldDivider />
        </section>

        <section id="contract" className="scroll-mt-14 py-12 md:py-16">
          <SectionHeader num="03" title="Трудовой договор" icon={sectionIcons.contract} />
          <div className="space-y-5 text-[#374151] leading-relaxed">
            <p><strong className="text-[#0B2545]">Трудовой договор</strong> — соглашение между работником и работодателем об их взаимных правах и обязанностях.</p>
            <InfoCard title="Обязанности работодателя"><BulletList items={["Без задержек выплачивать заработную плату","Предоставить безопасное рабочее место","Проинформировать о графике и инструкциях"]} /></InfoCard>
            <InfoCard title="Права работника"><BulletList items={["Отказаться от опасных для жизни работ","Отказаться от работы, не указанной в договоре","Приостановить работу при задержке зарплаты более 15 дней","Требовать копию договора и справки о зарплате"]} /></InfoCard>
            <InfoCard title="Обязанности работника"><BulletList items={["Добросовестно выполнять условия договора","Предупредить об увольнении за 14 дней","Соблюдать правила распорядка и ТБ","Бережно относиться к имуществу"]} /></InfoCard>
            <WarningCard>В течение <strong>2 месяцев</strong> после получения патента направьте в МВД уведомление о трудовой деятельности + копию договора.</WarningCard>
          </div>
          <GoldDivider />
        </section>

        <section id="responsibility" className="scroll-mt-14 py-12 md:py-16 bg-[#FAFAF5] -mx-4 px-4 md:-mx-8 md:px-8 rounded-2xl">
          <SectionHeader num="04" title="Виды ответственности" icon={sectionIcons.responsibility} />
          <div className="space-y-5 text-[#374151] leading-relaxed">
            <p>Россия — правовое государство. В зависимости от тяжести нарушения вы можете столкнуться с разными видами ответственности.</p>
            <InfoCard title="Миграционные нарушения"><BulletList items={["Нахождение в России без документов","Нарушение правил миграционного учёта","Работа без патента или по чужому региону/профессии","Пребывание после окончания срока документов"]} /></InfoCard>
            <InfoCard title="Административная ответственность"><BulletList items={["Нарушения общественного порядка","Нецензурная брань в общественных местах","Оскорбительные приставания"]} /></InfoCard>
            <InfoCard title="Уголовная ответственность"><BulletList items={["Вандализм","Причинение вреда здоровью","Угон, кража, грабёж, вымогательство"]} /></InfoCard>
          </div>
          <GoldDivider />
        </section>

        <section id="behavior" className="scroll-mt-14 py-12 md:py-16">
          <SectionHeader num="05" title="Как вести себя в России" icon={sectionIcons.behavior} />
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { t: "Соблюдайте законы", d: "Все проблемы можно решить законными путями. Не нужно давать взятки и «договариваться»." },
              { t: "Уважайте старших", d: "Прислушивайтесь к советам, уступайте место в транспорте или очереди." },
              { t: "Будьте сдержаны", d: "«Счастье любит тишину». Не проявляйте эмоции слишком бурно в общественных местах." },
              { t: "Будьте вежливы", d: "Если нужна помощь — попросите вежливо, на «Вы», и вам помогут." },
              { t: "Уважайте комфорт", d: "Не принято громко говорить, слушать музыку, толкаться в общественных местах." },
              { t: "Уважайте культуру", d: "Россия — многонациональная страна. Уважайте местные традиции — к вашим отнесутся так же." },
            ].map((item, i) => (
              <div key={i} className="info-card rounded-xl p-4 hover:shadow-md transition-shadow">
                <h3 className="section-title text-sm text-[#0B2545] mb-1.5">{item.t}</h3>
                <p className="text-sm text-[#4b5563] leading-relaxed">{item.d}</p>
              </div>
            ))}
          </div>
          <GoldDivider />
        </section>

        <section id="sim" className="scroll-mt-14 py-12 md:py-16 bg-[#FAFAF5] -mx-4 px-4 md:-mx-8 md:px-8 rounded-2xl">
          <SectionHeader num="06" title="Сотовая связь и интернет" icon={sectionIcons.sim} />
          <div className="space-y-5 text-[#374151] leading-relaxed">
            <WarningCard>С <strong>1 января 2025 года</strong> действуют особые правила покупки сим-карт для иностранных граждан.</WarningCard>
            <InfoCard title="Документы"><BulletList items={["Паспорт + нотариальный перевод","СНИЛС"]} /></InfoCard>
            <h3 className="section-title text-lg text-[#0B2545]">Порядок оформления</h3>
            <TimelineSteps steps={["Зарегистрируйтесь на портале Госуслуг и подтвердите учётную запись","Зарегистрируйтесь в Единой биометрической системе и сдайте данные","Купите или переоформите сим-карту после подтверждения личности"]} />
            <InfoCard title="Ограничения"><BulletList items={["Максимум 10 сим-карт","Нельзя оплачивать наличными анонимно","Нельзя купить в интернете","Сим-карта привязана к конкретному телефону"]} /></InfoCard>
            <div className="info-card rounded-xl p-4" style={{ borderLeftColor: "#D4A843" }}>
              <h3 className="section-title text-sm text-[#0B2545] mb-1.5">Приложение RUID</h3>
              <p className="text-sm text-[#4b5563] leading-relaxed">Скачайте для заполнения заявления. Работает на русском, армянском, казахском, киргизском, таджикском, узбекском и английском. Для входа нужны логин и пароль от Госуслуг.</p>
            </div>
          </div>
          <GoldDivider />
        </section>

        <section id="family" className="scroll-mt-14 py-12 md:py-16">
          <SectionHeader num="07" title="Семья и дети" icon={sectionIcons.family} />
          <div className="space-y-5 text-[#374151] leading-relaxed">
            <p>Знание языка и культуры — <strong className="text-[#0B2545]">непременное условие</strong> для жизни и работы в России.</p>
            <InfoCard title="Образование детей">
              <p className="text-sm text-[#4b5563] mb-2">Дети старше <strong>6,5 лет</strong> обязательно должны учиться:</p>
              <BulletList items={["Начальное (1–4 классы)","Основное общее (5–9 классы)","Среднее общее (10–11 классы)"]} />
            </InfoCard>
            <InfoCard title="Документы для школы">
              <BulletList items={["Свидетельство о рождении","Документы о законном пребывании (ВНЖ, РВП, виза)","Документ о дактилоскопии ребёнка","Паспорт или свидетельство о рождении ребёнка","СНИЛС (ваш и ребёнка), ИНН","Медицинское заключение"]} />
              <p className="mt-2 text-xs font-semibold text-[#D4A843]">Все документы — на русском или с нотариальным переводом!</p>
            </InfoCard>
            <h3 className="section-title text-lg text-[#0B2545]">Зачисление в школу</h3>
            <TimelineSteps steps={["Подайте заявление через МФЦ, РПГУ или Госуслуги","Пройдите тестирование на русский язык (7 дней после направления)"]} />
            <WarningCard>За неисполнение обязанности по обучению ребёнка — <strong>административная ответственность</strong> и наблюдение правоохранительных органов.</WarningCard>
          </div>
          <GoldDivider />
        </section>

        <section id="samara" className="scroll-mt-14 py-12 md:py-16 bg-[#FAFAF5] -mx-4 px-4 md:-mx-8 md:px-8 rounded-2xl">
          <SectionHeader num="08" title="Информация о Самарской области" icon={sectionIcons.samara} />
          <div className="space-y-5 text-[#374151] leading-relaxed">
            <p>Самарскую область называют <strong className="text-[#0B2545]">«сердцем России»</strong>. Площадь — 53,6 тыс. кв. км. Основана в <strong className="text-[#0B2545]">1586 году</strong>. Сегодня здесь проживает более <strong className="text-[#0B2545]">3 млн человек</strong>.</p>
            <p>В составе — 10 городов и 27 муниципальных районов. Один из ведущих экономических регионов с театрами, музеями и природными достопримечательностями.</p>
            <div className="info-card rounded-xl p-5" style={{ borderLeftColor: "#D4A843" }}>
              <h3 className="section-title text-base text-[#0B2545] mb-3">Миграционные центры</h3>
              <div className="space-y-2 text-sm text-[#374151]">
                <p><strong>г. Самара:</strong> ул. Кабельная, 13а · ул. Черногорская, 2</p>
                <p><strong>г. Тольятти:</strong> Тупиковый проезд, 4</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="brochure-hero text-white mt-12 py-12 px-4 print:bg-white print:text-black">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-6">Полезные ресурсы</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { handle: "@fadnrf" },
              { handle: "@samddn" },
              { handle: "@chestniymigrant" },
              { handle: "@RCPM63_RU" },
            ].map((ch) => (
              <a key={ch.handle} href={`https://t.me/${ch.handle.replace("@","")}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm">
                <IconTelegram /><span>{ch.handle}</span>
              </a>
            ))}
          </div>
          <div className="w-12 h-[1px] bg-[#D4A843]/40 mx-auto mb-4" />
          <p className="text-xs text-white/40">Министерство внутренней политики Самарской области · 2026</p>
        </div>
      </footer>
    </div>
  );
}

function SectionHeader({ num, title, icon }: { num: string; title: string; icon: React.ReactNode }) {
  return (
    <div className="relative mb-8">
      <div className="section-num">{num}</div>
      <div className="flex items-center gap-3 relative z-10 pl-1">
        <div className="text-[#0B2545]/70">{icon}</div>
        <h2 className="section-title text-xl md:text-2xl text-[#0B2545]">{title}</h2>
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="info-card rounded-xl p-5">
      <h3 className="section-title text-sm text-[#0B2545] mb-3">{title}</h3>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-[#4b5563]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0B2545] mt-1.5 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function WarningCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="warning-card rounded-xl p-4 flex items-start gap-3">
      <div className="shrink-0 mt-0.5 opacity-90"><IconWarning /></div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function TimelineSteps({ steps }: { steps: string[] }) {
  return (
    <div className="relative pl-10">
      <div className="timeline-line" />
      {steps.map((text, i) => (
        <div key={i} className="flex items-start gap-3 mb-5 relative">
          <div className="w-[30px] h-[30px] rounded-full bg-[#D4A843] text-[#0B2545] flex items-center justify-center text-sm font-bold shrink-0 shadow-md absolute -left-10">{i+1}</div>
          <p className="text-sm text-[#374151] pt-1">{text}</p>
        </div>
      ))}
    </div>
  );
}

function GoldDivider() {
  return <div className="gold-divider mt-12 print:hidden"><div className="gold-divider-dot" /></div>;
}

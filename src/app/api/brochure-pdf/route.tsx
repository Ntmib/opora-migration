import ReactPDF, {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Inter",
  fonts: [
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf", fontWeight: 400 },
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf", fontWeight: 600 },
    { src: "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf", fontWeight: 700 },
  ],
});

const blue = "#0a3d6b";
const blueLight = "#1e87f0";
const grayBg = "#f3f4f6";
const amber = "#fef3c7";
const amberBorder = "#f59e0b";

const s = StyleSheet.create({
  page: { fontFamily: "Inter", fontSize: 10, color: "#1a1a1a", paddingTop: 40, paddingBottom: 50, paddingHorizontal: 40 },
  cover: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: blue, padding: 40 },
  coverSub: { fontSize: 10, color: "#ffffff", opacity: 0.8, marginBottom: 12, textTransform: "uppercase", letterSpacing: 2 },
  coverTitle: { fontSize: 28, fontWeight: 700, color: "#ffffff", textAlign: "center", lineHeight: 1.3 },
  coverLine: { width: 60, height: 3, backgroundColor: blueLight, marginTop: 20, borderRadius: 2 },
  tocTitle: { fontSize: 18, fontWeight: 700, color: blue, marginBottom: 16 },
  tocItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  tocNum: { fontSize: 12, fontWeight: 700, color: blueLight, width: 24 },
  tocText: { fontSize: 11, color: "#374151" },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: blue, marginBottom: 10, marginTop: 4 },
  p: { fontSize: 10, lineHeight: 1.6, marginBottom: 6, color: "#374151" },
  card: { backgroundColor: grayBg, borderRadius: 8, padding: 10, marginBottom: 8 },
  cardTitle: { fontSize: 10, fontWeight: 600, color: "#1f2937", marginBottom: 4 },
  cardText: { fontSize: 9.5, color: "#4b5563", lineHeight: 1.5 },
  warning: { backgroundColor: amber, borderLeftWidth: 3, borderLeftColor: amberBorder, borderRadius: 4, padding: 10, marginBottom: 8 },
  warningText: { fontSize: 9.5, color: "#78350f", lineHeight: 1.5 },
  highlight: { backgroundColor: "#eff6ff", borderRadius: 8, padding: 10, marginBottom: 8 },
  highlightTitle: { fontSize: 10, fontWeight: 600, color: blue, marginBottom: 4 },
  stepRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 6 },
  stepCircle: { width: 18, height: 18, borderRadius: 9, backgroundColor: blueLight, justifyContent: "center", alignItems: "center", marginRight: 8 },
  stepNum: { fontSize: 9, fontWeight: 700, color: "#ffffff" },
  stepText: { fontSize: 9.5, color: "#374151", flex: 1, paddingTop: 2, lineHeight: 1.5 },
  statRow: { flexDirection: "row", gap: 12, marginBottom: 8 },
  statBox: { flex: 1, backgroundColor: "#eff6ff", borderRadius: 8, padding: 10, alignItems: "center" },
  statValue: { fontSize: 14, fontWeight: 700, color: blue },
  statLabel: { fontSize: 8, color: "#6b7280", marginTop: 2, textAlign: "center" },
  behaviorRow: { flexDirection: "row", alignItems: "flex-start", backgroundColor: grayBg, borderRadius: 8, padding: 8, marginBottom: 6 },
  behaviorTitle: { fontSize: 10, fontWeight: 600, color: "#1f2937", marginBottom: 2 },
  behaviorText: { fontSize: 9.5, color: "#4b5563", lineHeight: 1.4 },
  li: { flexDirection: "row", marginBottom: 3 },
  bullet: { fontSize: 9, color: blueLight, marginRight: 6, width: 8 },
  liText: { fontSize: 9.5, color: "#4b5563", flex: 1, lineHeight: 1.5 },
  pageNum: { position: "absolute", bottom: 20, right: 40, fontSize: 8, color: "#9ca3af" },
});

const Li = ({ children }: { children: string }) => (
  <View style={s.li}><Text style={s.bullet}>•</Text><Text style={s.liText}>{children}</Text></View>
);

const BrochurePDF = () => (
  <Document title="Памятка для трудовых мигрантов" author="Министерство внутренней политики Самарской области">
    <Page size="A4" style={{ padding: 0 }}>
      <View style={s.cover}>
        <Text style={s.coverSub}>Министерство внутренней политики Самарской области</Text>
        <Text style={s.coverTitle}>{"Памятка\nдля трудовых\nмигрантов"}</Text>
        <View style={s.coverLine} />
      </View>
    </Page>

    <Page size="A4" style={s.page}>
      <Text style={s.tocTitle}>Содержание</Text>
      {["Миграционный учёт","Получение патента на работу","Трудовой договор","Виды ответственности","Как вести себя в России","Сотовая связь и интернет","Семья и дети","Информация о Самарской области"].map((item, i) => (
        <View style={s.tocItem} key={i}><Text style={s.tocNum}>{i+1}</Text><Text style={s.tocText}>{item}</Text></View>
      ))}
    </Page>

    <Page size="A4" style={s.page}>
      <Text style={s.sectionTitle}>1. Миграционный учёт</Text>
      <Text style={s.p}>Иностранный гражданин, въезжая в Россию, получает миграционную карту. В ней желательно указать цель «Работа» (но сейчас это не обязательно).</Text>
      <Text style={s.p}>Приехав в Россию, нужно пройти обязательную дактилоскопическую регистрацию и фотографирование в течение 30 календарных дней со дня въезда.</Text>
      <View style={s.card}><Text style={s.cardTitle}>Сроки постановки на учёт</Text><Li>30 дней — граждане ЕАЭС</Li><Li>15 дней — граждане Узбекистана или Таджикистана</Li><Li>7 дней — граждане других стран</Li></View>
      <Text style={s.p}>Принимающей стороной может быть: физическое лицо, юридическое лицо, государственный орган или международная организация.</Text>
      <Text style={s.p}>Срок временного пребывания — не более 90 суток (суммарно) в течение одного календарного года.</Text>
      <View style={s.card}><Text style={s.cardTitle}>Продление пребывания</Text><Li>Трудовой договор (до 1 года)</Li><Li>Выдача или продление патента</Li><Li>Подача документов на РВП или вид на жительство</Li><Li>Подача на гражданство РФ</Li><Li>Программа переселения соотечественников</Li><Li>Близкое родство с гражданином РФ</Li></View>
      <View style={s.warning}><Text style={s.warningText}>С 1 декабря 2025 года сдавать отпечатки пальцев и фотографироваться нужно на всех пограничных пунктах. Эксперимент до 30 июня 2026 года.</Text></View>
      <Text style={s.pageNum} render={({ pageNumber }) => String(pageNumber)} fixed />
    </Page>

    <Page size="A4" style={s.page}>
      <Text style={s.sectionTitle}>2. Получение патента на работу</Text>
      <Text style={s.p}>Патент на работу — документ, дающий право иностранному гражданину работать в России у физического или юридического лица.</Text>
      <View style={s.card}><Text style={s.cardTitle}>Важно знать</Text><Li>Работать можно только по указанной профессии</Li><Li>Действует только в регионе, где получен</Li><Li>Выдаётся с 18 лет</Li><Li>Срок — до 12 месяцев, оплата помесячно</Li></View>
      <View style={s.warning}><Text style={s.warningText}>Не оплатили патент вовремя — он перестанет действовать!</Text></View>
      <View style={s.card}><Text style={s.cardTitle}>Документы для патента</Text><Li>Заявление о выдаче патента</Li><Li>Паспорт + нотариальный перевод</Li><Li>Фото 3x4 см (цветное, матовое)</Li><Li>Миграционная карта со штампом + копия</Li><Li>Медицинские документы</Li><Li>Сертификат об отсутствии ВИЧ</Li><Li>Полис ДМС</Li><Li>Документ о владении русским языком</Li><Li>Квитанция об уплате НДФЛ</Li><Li>Квитанция об уплате госпошлины</Li></View>
      <View style={s.statRow}><View style={s.statBox}><Text style={s.statValue}>30 дней</Text><Text style={s.statLabel}>срок подачи документов</Text></View><View style={s.statBox}><Text style={s.statValue}>10 раб. дней</Text><Text style={s.statLabel}>срок оформления</Text></View></View>
      <Text style={s.pageNum} render={({ pageNumber }) => String(pageNumber)} fixed />
    </Page>

    <Page size="A4" style={s.page}>
      <Text style={s.sectionTitle}>3. Трудовой договор</Text>
      <Text style={s.p}>Трудовой договор — соглашение между работником и работодателем об их взаимных правах и обязанностях.</Text>
      <View style={s.card}><Text style={s.cardTitle}>Обязанности работодателя</Text><Li>Без задержек выплачивать заработную плату</Li><Li>Предоставить безопасное рабочее место</Li><Li>Проинформировать о графике и инструкциях</Li></View>
      <View style={s.card}><Text style={s.cardTitle}>Права работника</Text><Li>Отказаться от опасных для жизни работ</Li><Li>Отказаться от работы, не указанной в договоре</Li><Li>Приостановить работу при задержке зарплаты более 15 дней</Li><Li>Требовать копию договора и справки о зарплате</Li></View>
      <View style={s.card}><Text style={s.cardTitle}>Обязанности работника</Text><Li>Добросовестно выполнять условия договора</Li><Li>Предупредить об увольнении за 14 дней</Li><Li>Соблюдать правила распорядка и ТБ</Li><Li>Бережно относиться к имуществу</Li></View>
      <View style={s.warning}><Text style={s.warningText}>В течение 2 месяцев после получения патента направьте в МВД уведомление о трудовой деятельности + копию договора.</Text></View>
      <Text style={s.pageNum} render={({ pageNumber }) => String(pageNumber)} fixed />
    </Page>

    <Page size="A4" style={s.page}>
      <Text style={s.sectionTitle}>4. Виды ответственности</Text>
      <Text style={s.p}>Россия — правовое государство. В зависимости от тяжести нарушения вы можете столкнуться с разными видами ответственности.</Text>
      <View style={s.card}><Text style={s.cardTitle}>Миграционные нарушения</Text><Li>Нахождение в России без документов</Li><Li>Нарушение правил миграционного учёта</Li><Li>Работа без патента или по чужому региону/профессии</Li><Li>Пребывание после окончания срока документов</Li></View>
      <View style={s.card}><Text style={s.cardTitle}>Административная ответственность</Text><Li>Нарушения общественного порядка</Li><Li>Нецензурная брань в общественных местах</Li><Li>Оскорбительные приставания</Li></View>
      <View style={s.card}><Text style={s.cardTitle}>Уголовная ответственность</Text><Li>Вандализм</Li><Li>Причинение вреда здоровью</Li><Li>Угон, кража, грабёж, вымогательство</Li></View>

      <Text style={[s.sectionTitle, { marginTop: 16 }]}>5. Как вести себя в России</Text>
      {[
        { t: "Соблюдайте законы", d: "Все проблемы можно решить законными путями. Не нужно давать взятки." },
        { t: "Уважайте старших", d: "Прислушивайтесь к советам, уступайте место в транспорте." },
        { t: "Будьте сдержаны", d: "Не проявляйте эмоции слишком бурно в общественных местах." },
        { t: "Будьте вежливы", d: "Если нужна помощь — попросите вежливо, на «Вы»." },
        { t: "Уважайте комфорт", d: "Не принято громко говорить, слушать музыку, толкаться." },
        { t: "Уважайте культуру", d: "Россия — многонациональная страна. Уважайте местные традиции." },
      ].map((item, i) => (
        <View style={s.behaviorRow} key={i}><View style={{ flex: 1 }}><Text style={s.behaviorTitle}>{item.t}</Text><Text style={s.behaviorText}>{item.d}</Text></View></View>
      ))}
      <Text style={s.pageNum} render={({ pageNumber }) => String(pageNumber)} fixed />
    </Page>

    <Page size="A4" style={s.page}>
      <Text style={s.sectionTitle}>6. Сотовая связь и интернет</Text>
      <View style={s.warning}><Text style={s.warningText}>С 1 января 2025 года действуют особые правила покупки сим-карт для иностранных граждан.</Text></View>
      <View style={s.card}><Text style={s.cardTitle}>Документы</Text><Li>Паспорт + нотариальный перевод</Li><Li>СНИЛС</Li></View>
      <Text style={[s.p, { fontWeight: 600 }]}>Порядок оформления:</Text>
      {["Зарегистрируйтесь на портале Госуслуг и подтвердите учётную запись","Зарегистрируйтесь в Единой биометрической системе и сдайте данные","Купите или переоформите сим-карту после подтверждения личности"].map((text, i) => (
        <View style={s.stepRow} key={i}><View style={s.stepCircle}><Text style={s.stepNum}>{i+1}</Text></View><Text style={s.stepText}>{text}</Text></View>
      ))}
      <View style={s.card}><Text style={s.cardTitle}>Ограничения</Text><Li>Максимум 10 сим-карт</Li><Li>Нельзя оплачивать наличными анонимно</Li><Li>Нельзя купить в интернете</Li><Li>Сим-карта привязана к конкретному телефону</Li></View>
      <View style={s.highlight}><Text style={s.highlightTitle}>Приложение RUID</Text><Text style={s.cardText}>Скачайте для заполнения заявления. Работает на русском, армянском, казахском, киргизском, таджикском, узбекском и английском. Для входа нужны логин и пароль от Госуслуг.</Text></View>

      <Text style={[s.sectionTitle, { marginTop: 12 }]}>7. Семья и дети</Text>
      <Text style={s.p}>Знание языка и культуры — непременное условие для жизни и работы в России. Дети старше 6,5 лет обязательно должны получать образование.</Text>
      <View style={s.card}><Text style={s.cardTitle}>Документы для школы</Text><Li>Свидетельство о рождении</Li><Li>Документы о законном пребывании (ВНЖ, РВП, виза)</Li><Li>Документ о дактилоскопии ребёнка</Li><Li>Паспорт или свидетельство о рождении ребёнка</Li><Li>СНИЛС (ваш и ребёнка), ИНН</Li><Li>Медицинское заключение</Li></View>
      <View style={s.warning}><Text style={s.warningText}>За неисполнение обязанности по обучению ребёнка — административная ответственность.</Text></View>
      <Text style={s.pageNum} render={({ pageNumber }) => String(pageNumber)} fixed />
    </Page>

    <Page size="A4" style={s.page}>
      <Text style={s.sectionTitle}>8. Информация о Самарской области</Text>
      <Text style={s.p}>Самарскую область называют «сердцем России». Площадь — 53,6 тыс. кв. км. Основана в 1586 году. Сегодня здесь проживает более 3 млн человек.</Text>
      <Text style={s.p}>В составе — 10 городов и 27 муниципальных районов. Один из ведущих экономических регионов с театрами, музеями и природными достопримечательностями.</Text>
      <View style={s.highlight}><Text style={s.highlightTitle}>Миграционные центры</Text><Text style={s.cardText}>г. Самара: ул. Кабельная, 13а, ул. Черногорская, 2</Text><Text style={s.cardText}>г. Тольятти: Тупиковый проезд, 4</Text></View>
      <View style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: "#e5e7eb", paddingTop: 12 }}>
        <Text style={{ fontSize: 9, color: "#6b7280", textAlign: "center" }}>Telegram-каналы: @fadnrf  @samddn  @chestniymigrant</Text>
        <Text style={{ fontSize: 8, color: "#9ca3af", textAlign: "center", marginTop: 6 }}>Министерство внутренней политики Самарской области</Text>
      </View>
      <Text style={s.pageNum} render={({ pageNumber }) => String(pageNumber)} fixed />
    </Page>
  </Document>
);

export async function GET() {
  const stream = await ReactPDF.renderToStream(<BrochurePDF />);
  return new Response(stream as unknown as ReadableStream, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="pamyatka-migrantov.pdf"',
    },
  });
}

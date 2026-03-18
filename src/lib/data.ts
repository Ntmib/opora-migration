import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const BACKUP_DIR = path.join(DATA_DIR, "backups");

// --- Типы ---

export interface ContactInfo {
  phones: { number: string; label: string }[];
  email: string;
  address: string;
  telegram: string;
  telegramPersonal: string;
  maxNews: string;
  maxCommittee: string;
  chairmanName: string;
  chairmanTitle: string;
  secretaryName: string;
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  image?: string;
}

export interface SiteTexts {
  hero: { title: string; subtitle: string };
  about: { title: string; mission: string };
  sro: { title: string; description: string };
  [key: string]: Record<string, string>;
}

// --- Дефолтные данные (текущий хардкод) ---

const DEFAULT_CONTACTS: ContactInfo = {
  phones: [
    { number: "+7 (495) 212-90-17", label: "Основной" },
    { number: "+7 (927) 606-62-02", label: "Мобильный" },
  ],
  email: "migratsiya_opora@mail.ru",
  address:
    "г. Москва, внутренняя территория поселения Мосренген, 21 км по Киевскому шоссе, здание «ДВЛД 3», строение 1, офис 404. Бизнес-центр G10",
  telegram: "https://t.me/trud_migr",
  telegramPersonal: "https://t.me/poogkn",
  maxNews: "https://max.ru/join/8JKOvIdoIGNb71Op-tX8Fwv1EcDSx-PM9KVuspZNrbc",
  maxCommittee:
    "https://max.ru/join/FTtx0stEqo1ZUSXEKVSrqYl5wzQFfD2FyjqRfoatcbQ",
  chairmanName: "Нуждин Сергей Николаевич",
  chairmanTitle: "Член Президиума «ОПОРЫ РОССИИ»",
  secretaryName: "Каждан Людмила Владимировна",
};

const DEFAULT_NEWS: NewsItem[] = [
  {
    id: "zasedanie-komiteta-iyul-2025",
    date: "2025-07-29",
    title:
      "29 июля 2025 г. состоялось очередное заседание Комитета «ОПОРЫ РОССИИ» по развитию национального рынка труда",
    excerpt:
      "Мероприятие состоялось в формате онлайн-конференции. На ПМЭФ-2025 обсуждалась сессия «Кадровый дефицит и стратегии его преодоления».",
  },
  {
    id: "sozdanie-sluzhby-grazhdanstva-2025",
    date: "2025-04-03",
    title:
      "О создании Службы по вопросам гражданства и регистрации иностранных граждан",
    excerpt:
      "Сергей Нуждин выразил уверенность, что указ Президента о создании новой Службы позитивно повлияет на регулирование рынка труда.",
  },
  {
    id: "predlozheniya-migratsionnoe-zakonodatelstvo-2025",
    date: "2025-02-13",
    title:
      "Комитет подготовит предложения по изменению миграционного законодательства",
    excerpt:
      "13 февраля состоялось очередное заседание Комитета в формате онлайн-конференции.",
  },
  {
    id: "kommentariy-ministr-truda-2025",
    date: "2025-01-30",
    title:
      "Экспертный комментарий на выступление Министра труда в Совете Федераций",
    excerpt:
      'В рамках «правительственного часа» в Совете Федераций выступил Министр труда А. Котяков.',
  },
  {
    id: "vef-2024-mosty-sotrudnichestva",
    date: "2024-09-04",
    title:
      "ВЭФ 2024: Мосты сотрудничества — привлечение ценных кадров в Россию",
    excerpt:
      "Панельная сессия посвящена снижению кадрового дефицита с помощью сотрудников из-за рубежа.",
  },
  {
    id: "kontrol-biznesa-migratsionnaya-politika-2024",
    date: "2024-06-27",
    title:
      "Контроль бизнеса в области миграционной политики должен быть объективным",
    excerpt:
      "На ПМЮФ состоялась сессия «Правовые аспекты миграционной политики в современной России».",
  },
  {
    id: "plan-raboty-2024",
    date: "2024-03-12",
    title: "Комитет утвердил план работы на 2024 год",
    excerpt:
      "12 марта состоялось заседание Комитета, отмечены важные векторы направления деятельности.",
  },
  {
    id: "vef-2023-maliy-biznes-dfo",
    date: "2023-09-11",
    title: "ВЭФ: Как обеспечить специалистами малый бизнес ДФО?",
    excerpt: "Сессия на Восточном экономическом форуме.",
  },
];

const DEFAULT_TEXTS: SiteTexts = {
  hero: {
    title: "Комитет ОПОРЫ РОССИИ",
    subtitle:
      "по развитию национального рынка труда и мониторингу миграционных процессов",
  },
  about: {
    title: "О комитете",
    mission:
      "Содействие развитию национального рынка труда, совершенствование миграционной политики и защита интересов предпринимателей в сфере трудовых ресурсов.",
  },
  sro: {
    title: "Саморегулируемая организация",
    description:
      "СРО в сфере миграционных услуг — это добровольное объединение компаний для повышения стандартов качества.",
  },
};

// --- Вспомогательные функции ---

async function ensureDir(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {
    // директория уже существует
  }
}

/** Атомарная запись: пишем во временный файл, потом переименовываем.
 *  Защита от порчи данных если процесс упадёт во время записи. */
async function atomicWrite(filePath: string, data: unknown) {
  await ensureDir(path.dirname(filePath));
  const tmpPath = filePath + ".tmp";
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), "utf-8");
  await fs.rename(tmpPath, filePath);
}

/** Автобэкап: сохраняет предыдущую версию файла перед перезаписью.
 *  Хранит последние 10 версий. */
async function backup(filePath: string) {
  await ensureDir(BACKUP_DIR);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const name = path.basename(filePath, ".json");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(BACKUP_DIR, `${name}_${timestamp}.json`);
    await fs.writeFile(backupPath, content, "utf-8");

    // Ротация: удаляем старые бэкапы, оставляем 10 последних
    const files = (await fs.readdir(BACKUP_DIR))
      .filter((f) => f.startsWith(name + "_") && f.endsWith(".json"))
      .sort()
      .reverse();

    for (const old of files.slice(10)) {
      await fs.unlink(path.join(BACKUP_DIR, old)).catch(() => {});
    }
  } catch {
    // файл ещё не существует — бэкапить нечего
  }
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return fallback;
  }
}

// --- Публичные функции ---

const CONTACTS_FILE = path.join(DATA_DIR, "contacts.json");
const NEWS_FILE = path.join(DATA_DIR, "news.json");
const TEXTS_FILE = path.join(DATA_DIR, "texts.json");

export async function getContacts(): Promise<ContactInfo> {
  return readJson(CONTACTS_FILE, DEFAULT_CONTACTS);
}

export async function saveContacts(data: ContactInfo): Promise<void> {
  await backup(CONTACTS_FILE);
  await atomicWrite(CONTACTS_FILE, data);
}

export async function getNews(): Promise<NewsItem[]> {
  return readJson(NEWS_FILE, DEFAULT_NEWS);
}

export async function saveNews(data: NewsItem[]): Promise<void> {
  await backup(NEWS_FILE);
  await atomicWrite(NEWS_FILE, data);
}

export async function getTexts(): Promise<SiteTexts> {
  return readJson(TEXTS_FILE, DEFAULT_TEXTS);
}

export async function saveTexts(data: SiteTexts): Promise<void> {
  await backup(TEXTS_FILE);
  await atomicWrite(TEXTS_FILE, data);
}

// --- Утилита для форматирования даты ---

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

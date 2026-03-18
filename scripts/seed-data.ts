/**
 * Скрипт начального заполнения JSON-файлов данными.
 * Запуск: npx tsx scripts/seed-data.ts
 *
 * Берёт дефолтные данные из src/lib/data.ts и записывает в data/*.json.
 * Если файлы уже существуют — НЕ перезаписывает (безопасно).
 */

import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function seed() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(path.join(DATA_DIR, "backups"), { recursive: true });

  // Импортируем дефолтные данные динамически
  const { getContacts, getNews, getTexts } = await import("../src/lib/data.js");

  const files = [
    { name: "contacts.json", getData: getContacts },
    { name: "news.json", getData: getNews },
    { name: "texts.json", getData: getTexts },
  ];

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file.name);
    if (await fileExists(filePath)) {
      console.log(`⏭  ${file.name} уже существует — пропускаю`);
      continue;
    }

    const data = await file.getData();
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`✅ ${file.name} создан`);
  }

  console.log("\nГотово! Данные в папке data/");
}

seed().catch((err) => {
  console.error("Ошибка:", err);
  process.exit(1);
});

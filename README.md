# Сайт Комитета ОПОРЫ РОССИИ по развитию национального рынка труда

Корпоративный сайт с админ-панелью для управления контентом.

## Стек

- **Next.js 16** + React 19 + TypeScript
- **Tailwind CSS** — стили
- **Nodemailer** — отправка форм на email (SMTP mail.ru)
- **JSON-файлы** — хранение данных (контакты, новости, тексты)
- **Docker** + Nginx — деплой на VPS

## Быстрый старт (разработка)

```bash
# Установить зависимости
npm install

# Создать файл настроек
cp .env.example .env.local

# Заполнить .env.local (SMTP_PASSWORD, ADMIN_PASSWORD, JWT_SECRET)

# Создать начальные данные
npm run seed

# Запустить сервер разработки
npm run dev
```

Сайт: http://localhost:3000
Админка: http://localhost:3000/admin

## Деплой на VPS

См. [docs/DEPLOY.md](docs/DEPLOY.md) — пошаговая инструкция.

## Документация

| Документ | Для кого |
|----------|----------|
| [docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md) | Администратор сайта (клиент) |
| [docs/DEPLOY.md](docs/DEPLOY.md) | Разработчик / DevOps |
| [docs/DOMAIN_SETUP.md](docs/DOMAIN_SETUP.md) | Администратор / Разработчик |
| [docs/HANDOFF_CHECKLIST.md](docs/HANDOFF_CHECKLIST.md) | Чеклист передачи |

## Структура проекта

```
src/
  app/              — страницы сайта (Next.js App Router)
    admin/          — админ-панель
    api/            — API-маршруты
  components/       — React-компоненты
  lib/              — утилиты (data.ts, auth.ts, rate-limit.ts)
data/               — JSON-файлы с данными (не в git)
public/uploads/     — загруженные фото (не в git)
deploy/             — конфиги для деплоя (nginx, backup)
docs/               — документация
```

## Переменные окружения

См. [.env.example](.env.example) — все переменные с комментариями.

# Сайт Комитета ОПОРЫ РОССИИ по развитию национального рынка труда

Корпоративный сайт с админ-панелью для управления контентом.

## Стек

- **Next.js 16** + React 19 + TypeScript
- **Tailwind CSS** — стили
- **Nodemailer** — отправка форм на email (SMTP mail.ru)
- **JSON-файлы** — хранение данных (контакты, новости, тексты)
- **Nginx** + systemd — деплой на VPS

## Хостинг

- **Сервер:** Beget Cloud VPS (193.42.124.57)
- **Домен:** opora-migration.ru (регистратор — Timeweb)
- **SSL:** Let's Encrypt (автопродление)
- **Запуск:** systemd-сервис `opora-migration` (Next.js standalone)

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

## Деплой обновлений

```bash
npm run build
tar czf /tmp/opora-standalone.tar.gz -C .next/standalone .
tar czf /tmp/opora-static.tar.gz .next/static public/images
scp /tmp/opora-standalone.tar.gz /tmp/opora-static.tar.gz root@193.42.124.57:/tmp/
ssh root@193.42.124.57 "cd /root/opora-migration && tar xzf /tmp/opora-standalone.tar.gz && tar xzf /tmp/opora-static.tar.gz && systemctl restart opora-migration"
```

Подробнее: [docs/DEPLOY.md](docs/DEPLOY.md)

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

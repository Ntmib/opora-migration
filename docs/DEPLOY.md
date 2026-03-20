# Деплой сайта opora-migration.ru

## Архитектура

```
Браузер → opora-migration.ru → Beget VPS (193.42.124.57)
                                    ├── Nginx (порт 80/443) → proxy → Next.js (порт 3000)
                                    ├── Let's Encrypt SSL (автопродление)
                                    └── systemd-сервис opora-migration
```

- **Хостинг:** Beget Cloud VPS (193.42.124.57, Ubuntu 22.04)
- **Домен:** opora-migration.ru (регистратор — Timeweb, аккаунт ck68396)
- **DNS:** A-запись opora-migration.ru → 193.42.124.57 (настроено в панели Timeweb)
- **SSL:** Let's Encrypt, автопродление через certbot
- **Приложение:** Next.js 16 standalone, запускается через systemd (без Docker)

## Структура на сервере

```
/root/opora-migration/
  ├── server.js              — точка входа (Next.js standalone)
  ├── .env                   — переменные окружения
  ├── .next/static/          — статика (CSS, JS, шрифты)
  ├── public/images/         — изображения сайта
  ├── public/uploads/        — загруженные фото (через админку)
  ├── data/                  — JSON-данные (контакты, новости, тексты)
  └── node_modules/          — зависимости (из standalone-сборки)
```

## Деплой обновлений (быстрая команда)

Выполнить с компьютера разработчика:

```bash
# 1. Собрать проект локально
cd /путь/к/opora-migration
npm run build

# 2. Упаковать сборку
tar czf /tmp/opora-standalone.tar.gz -C .next/standalone .
tar czf /tmp/opora-static.tar.gz .next/static public/images

# 3. Залить на сервер
scp /tmp/opora-standalone.tar.gz /tmp/opora-static.tar.gz root@193.42.124.57:/tmp/

# 4. Распаковать и перезапустить
ssh root@193.42.124.57 "cd /root/opora-migration && tar xzf /tmp/opora-standalone.tar.gz && tar xzf /tmp/opora-static.tar.gz && systemctl restart opora-migration"
```

После этого сайт обновится за ~2 секунды.

## Первоначальная настройка (с нуля)

### Шаг 1: Установить Node.js

```bash
ssh root@193.42.124.57
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs
```

### Шаг 2: Создать директорию и залить сборку

На компьютере разработчика:
```bash
cd /путь/к/opora-migration
npm run build

tar czf /tmp/opora-standalone.tar.gz -C .next/standalone .
tar czf /tmp/opora-static.tar.gz .next/static public/images public/uploads data

scp /tmp/opora-standalone.tar.gz /tmp/opora-static.tar.gz root@193.42.124.57:/tmp/

ssh root@193.42.124.57 "mkdir -p /root/opora-migration && cd /root/opora-migration && tar xzf /tmp/opora-standalone.tar.gz && tar xzf /tmp/opora-static.tar.gz"
```

### Шаг 3: Создать .env

```bash
ssh root@193.42.124.57
cat > /root/opora-migration/.env << 'EOF'
SMTP_USER=Migratsiya_opora@mail.ru
SMTP_PASSWORD=<пароль_приложения_mail.ru>
SMTP_TO=Migratsiya_opora@mail.ru
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<пароль_админки>
JWT_SECRET=<сгенерировать: openssl rand -base64 32>
NEXT_PUBLIC_SITE_URL=https://opora-migration.ru
PORT=3000
HOSTNAME=0.0.0.0
EOF
```

### Шаг 4: Создать systemd-сервис

```bash
cat > /etc/systemd/system/opora-migration.service << 'EOF'
[Unit]
Description=Opora Migration Next.js
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/opora-migration
EnvironmentFile=/root/opora-migration/.env
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable opora-migration
systemctl start opora-migration
```

### Шаг 5: Настроить Nginx

```bash
cat > /etc/nginx/sites-available/opora-migration << 'NGINX'
server {
    listen 80;
    server_name opora-migration.ru www.opora-migration.ru;

    client_max_body_size 10M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/opora-migration /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

### Шаг 6: Установить SSL

```bash
certbot --nginx -d opora-migration.ru -d www.opora-migration.ru \
  --non-interactive --agree-tos --email Migratsiya_opora@mail.ru --redirect
```

### Шаг 7: Настроить DNS

В панели Timeweb (hosting.timeweb.ru, аккаунт ck68396):

1. Домены → opora-migration.ru → Редактор DNS
2. A-запись: значение → `193.42.124.57`
3. Удалить AAAA-запись (если есть)
4. MX и TXT записи — не трогать (они для почты)

## Управление сервисом

```bash
# Статус
systemctl status opora-migration

# Логи (последние 50 строк)
journalctl -u opora-migration -n 50

# Перезапуск
systemctl restart opora-migration

# Остановка
systemctl stop opora-migration
```

## Бэкапы

Данные сайта (data/ и public/uploads/) хранятся на сервере. Для бэкапа:

```bash
# Скачать данные на свой компьютер
scp -r root@193.42.124.57:/root/opora-migration/data ./backup-data
scp -r root@193.42.124.57:/root/opora-migration/public/uploads ./backup-uploads
```

Автоматический бэкап (cron, ежедневно в 3:00):
```bash
crontab -e
# Добавить:
0 3 * * * tar czf /root/backups/opora-$(date +\%Y\%m\%d).tar.gz -C /root/opora-migration data public/uploads .env
```

## Проверка после деплоя

- [ ] https://opora-migration.ru — открывается
- [ ] HTTPS работает (замочек в браузере)
- [ ] /admin — админка работает
- [ ] Формы отправляют email
- [ ] Фото загружаются через админку

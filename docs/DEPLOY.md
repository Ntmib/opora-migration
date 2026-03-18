# Деплой сайта на Timeweb Cloud VPS

## Требования

- Timeweb Cloud VPS (минимум 2 GB RAM, Ubuntu 22.04)
- Домен opora-migration.ru (привязан к Timeweb)

## Шаг 1: Создать VPS

1. Войти в панель Timeweb (timeweb.com) → Cloud → Создать сервер
2. Выбрать: **Ubuntu 22.04**, тариф **2 GB RAM / 1 vCPU / 20 GB SSD**
3. Записать IP-адрес и root-пароль

## Шаг 2: Подключиться к серверу

```bash
ssh root@<IP-адрес>
```

## Шаг 3: Установить Docker

```bash
# Обновить систему
apt update && apt upgrade -y

# Установить Docker
curl -fsSL https://get.docker.com | sh

# Включить автозапуск Docker при перезагрузке
systemctl enable docker

# Добавить swap (страховка от нехватки памяти)
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
```

## Шаг 4: Установить Nginx и Certbot

```bash
apt install -y nginx certbot python3-certbot-nginx

# Включить firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
```

## Шаг 5: Склонировать проект

```bash
cd /root
git clone https://github.com/Ntmib/opora-migration.git
cd opora-migration
```

## Шаг 6: Настроить переменные окружения

```bash
cp .env.example .env
nano .env
```

Заполнить все значения (SMTP_PASSWORD, ADMIN_PASSWORD, JWT_SECRET).

Сгенерировать JWT_SECRET:
```bash
openssl rand -base64 32
```

## Шаг 7: Создать папки для данных

```bash
mkdir -p data public/uploads
```

Создать начальные данные (выберите один вариант):

**Вариант А** — через Docker (рекомендуется):
```bash
# Сначала соберите контейнер (шаг 8), потом:
docker compose exec web node scripts/seed-data.js
```

**Вариант Б** — вручную:
Скопируйте файлы `data/contacts.json`, `data/news.json`, `data/texts.json` с компьютера разработчика на сервер:
```bash
scp -r data/*.json root@<IP>:/root/opora-migration/data/
```

## Шаг 8: Собрать и запустить

```bash
docker compose up -d --build
```

Проверить что работает:
```bash
curl http://localhost:3000
```

## Шаг 9: Настроить Nginx

```bash
cp deploy/nginx.conf /etc/nginx/sites-available/opora-migration
ln -sf /etc/nginx/sites-available/opora-migration /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
```

Временно закомментировать строки с ssl_certificate (сертификата ещё нет):
```bash
nano /etc/nginx/sites-available/opora-migration
# Закомментировать блок server с listen 443
# Оставить только блок с listen 80 (но изменить return 301 на proxy_pass)
```

```bash
nginx -t && systemctl reload nginx
```

## Шаг 10: Получить SSL-сертификат

```bash
certbot --nginx -d opora-migration.ru -d www.opora-migration.ru
```

Certbot автоматически обновит nginx конфиг.

Проверить автообновление:
```bash
certbot renew --dry-run
```

## Шаг 11: Настроить DNS

В панели Timeweb → Домены → opora-migration.ru → DNS:

1. Удалить все старые A-записи
2. Добавить: `A` запись `@` → `<IP-адрес VPS>`
3. Добавить: `A` запись `www` → `<IP-адрес VPS>`

Подождать 5-30 минут.

## Шаг 12: Настроить бэкапы

```bash
chmod +x deploy/backup.sh
crontab -e
```

Добавить строку:
```
0 3 * * * /root/opora-migration/deploy/backup.sh
```

## Шаг 13: Настроить мониторинг

1. Зарегистрироваться на https://uptimerobot.com (бесплатно)
2. Add Monitor → HTTP(s) → https://opora-migration.ru
3. Указать email клиента для уведомлений

## Проверка

- [ ] https://opora-migration.ru открывается
- [ ] HTTPS работает (замочек в браузере)
- [ ] Формы отправляют email
- [ ] /admin работает (логин/пароль из .env)
- [ ] После перезагрузки VPS сайт поднимается сам

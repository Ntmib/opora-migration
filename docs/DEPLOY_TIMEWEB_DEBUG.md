# Деплой на Timeweb Cloud — Отладка

## Дата: 2026-03-19 / 2026-03-20

## Сервер
- **Хостинг:** Timeweb Cloud, облачный сервер "Reasonable Bittern"
- **IP:** 147.45.108.238
- **IPv6:** 2a03:6f00:a::2:1e1b
- **SSH:** `ssh root@147.45.108.238` / пароль: `zqG+1niHX2qLL+`
- **ОС:** Ubuntu 24.04.3 LTS
- **Домен (цель):** opora-migration.ru

## Проект
- **Стек:** Next.js 16.1.6, React 19, Tailwind 4
- **Деплой:** Docker (docker-compose) + Nginx reverse proxy
- **Порт приложения:** 3000
- **Nginx проксирует:** 80 → 127.0.0.1:3000

## Текущая проблема
**Сайт не открывается по IP из браузера.** TCP-соединение устанавливается (curl показывает "Connected"), HTTP-запрос отправляется, но ответ от сервера НЕ приходит (таймаут). При этом **изнутри сервера всё работает** — `curl -I http://127.0.0.1:3000` и `curl -I http://127.0.0.1:80` возвращают 200 OK.

SSH с внешнего компьютера тоже зависает — подключиться можно только через серийную консоль Timeweb.

---

## Что было сделано и результаты

### 1. Проверка Docker-контейнера
- **Команда:** `docker compose ps`
- **Результат:** Контейнер `opora-migration-web-1` запущен, статус `unhealthy`
- **Логи:** Next.js стартует, пишет "Ready in 114ms" — ошибок нет

### 2. Проверка Nginx
- **Nginx установлен:** версия 1.24.0 (Ubuntu)
- **Конфиг:** `/etc/nginx/sites-enabled/opora-migration` — правильный proxy_pass на 127.0.0.1:3000
- **Был дублирующий файл** `/etc/nginx/sites-enabled/default` — удалён
- **Nginx работает** и отвечает 200 OK изнутри

### 3. Проверка изнутри сервера (ВСЁ РАБОТАЕТ)
```
curl -I http://127.0.0.1:3000  → 200 OK
curl -I http://127.0.0.1:80    → 200 OK (через Nginx)
```

### 4. Проверка снаружи (НЕ РАБОТАЕТ)
```
curl -v http://147.45.108.238      → Connected, но таймаут (нет ответа)
curl -v http://147.45.108.238:3000 → Connected, но таймаут (нет ответа)
ssh root@147.45.108.238            → Зависает
```
TCP handshake проходит, но данные не возвращаются. Проблема на ВСЕХ портах.

### 5. Файрвол UFW
- **Статус:** был active, правила разрешали порты 22, 80, 443
- **FORWARD policy:** DROP (потенциальный конфликт с Docker)
- **Попытка:** `ufw disable` — **НЕ помогло**

### 6. Timeweb Cloud Firewall
- **Создана группа правил** "Ambitious Crane" с разрешением TCP 22, 80, 443 для всех адресов
- **Подключена к серверу** — **НЕ помогло**
- **Удалена/отключена** — **НЕ помогло**
- **Важно:** в секции "Исходящий трафик" правил не было (возможно блокирует ответы)

### 7. Docker network_mode: host
- **Проблема:** изначально Docker использовал bridge networking с port mapping (0.0.0.0:3000->3000)
- **Конфликт:** Docker + UFW iptables — FORWARD chain DROP блокировал ответы
- **Решение:** переключили docker-compose.yml на `network_mode: host`
- **Результат:** контейнер перезапущен, но проблема осталась

### 8. HOSTNAME=0.0.0.0
- **Проблема:** после network_mode: host Next.js слушал только на IPv6 `[2a03:6f00:a::2:1e1b]:3000`
- **Причина:** Next.js standalone использует `process.env.HOSTNAME` для bind адреса
- **Решение:** добавлен `HOSTNAME=0.0.0.0` в .env
- **Результат:** Next.js теперь слушает на `0.0.0.0:3000` — **правильно**, но сайт всё ещё не открывается снаружи

### 9. Полный сброс iptables
```
iptables -F && iptables -X && iptables -t nat -F && iptables -t nat -X
iptables -P INPUT ACCEPT && iptables -P FORWARD ACCEPT && iptables -P OUTPUT ACCEPT
```
- **Результат:** **НЕ помогло** — значит дело вообще не в файрволе

### 10. Перезагрузка сервера
- **Soft reboot через панель Timeweb** — после перезагрузки Docker и Nginx поднялись автоматически
- **Результат:** Next.js слушает на 0.0.0.0:3000, но снаружи всё ещё не открывается

---

## Текущая гипотеза: MTU проблема
TCP handshake (маленькие пакеты SYN/SYN-ACK/ACK) проходит, но данные ответа (большие пакеты) теряются. Это типичная проблема MTU на VPS.

### Ещё не проверено:
- [ ] `curl -I https://google.com` с сервера — работает ли исходящий трафик вообще
- [ ] `ip link show` — текущий MTU на сетевом интерфейсе
- [ ] Уменьшить MTU: `ip link set dev eth0 mtu 1400`
- [ ] Проверить `tcpdump` — видно ли ответные пакеты на интерфейсе
- [ ] Написать в поддержку Timeweb — возможно проблема на их стороне (сетевая инфраструктура)

---

## Текущая конфигурация файлов на сервере

### docker-compose.yml (обновлённый)
```yaml
services:
  web:
    build: .
    restart: always
    network_mode: host
    env_file:
      - .env
    volumes:
      - ./data:/app/data
      - ./public/uploads:/app/public/uploads
    healthcheck:
      test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 15s
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
```

### Nginx конфиг (/etc/nginx/sites-enabled/opora-migration)
```nginx
server {
    listen 80 default_server;
    server_name opora-migration.ru www.opora-migration.ru _;

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
```

### .env
- Содержит `HOSTNAME=0.0.0.0` (добавлено в конец)
- Остальные переменные — из оригинального проекта

### UFW
- **Отключен** (`ufw disable`)

---

## Дополнительные проверки (после основных шагов)

### 11. Проверка исходящего трафика
- `curl -I https://google.com` — **работает**, сервер ходит в интернет
- Маршруты (`ip route show`) — в порядке

### 12. Проверка MTU
- MTU на eth0: 1500, уменьшен до 1400 — **НЕ помогло**

### 13. Curl на свой же IP (изнутри)
- `curl -I http://147.45.108.238` — **200 OK** (изнутри работает)

### 14. tcpdump — финальная диагностика
Запущен `tcpdump -i eth0 -n port 80` при запросе с внешнего IP (46.0.40.34):
```
1. SYN от клиента → сервер — ДОШЁЛ ✓
2. SYN-ACK от сервера → клиент — ОТПРАВЛЕН ✓
3. ACK от клиента → сервер — ДОШЁЛ ✓
4. HTTP-запрос (DATA) от клиента → сервер — НЕ ДОШЁЛ ✗
5. Nginx через 60 сек закрыл соединение (FIN) — клиент не ответил
```

### Вывод: проблема на стороне Timeweb Cloud
**Timeweb Cloud блокирует входящие DATA-пакеты после TCP handshake.** SYN проходит, SYN-ACK возвращается, но реальные данные (HTTP-запрос) отбрасываются сетевой инфраструктурой Timeweb. Это НЕ проблема сервера — iptables чист, UFW отключен, все сервисы работают изнутри.

---

## Принятое решение: переезд на Beget VPS

**Timeweb Cloud VPS отбракован** — сетевая инфраструктура блокирует входящий трафик, проблема не решается на стороне сервера.

### Новый план:
1. **Развернуть сайт на Beget Cloud VPS** (193.42.124.57, Ubuntu 22.04) — там уже работают другие проекты (боты), SSH проверен
2. **Изменить A-запись** домена `opora-migration.ru` в панели Timeweb DNS → направить на IP Beget
3. Настроить SSL (Let's Encrypt) на Beget
4. Сайт заработает на домене через 5-15 минут после смены DNS

### Почему Beget:
- Уже есть рабочий VPS с проверенным SSH-доступом
- Домен можно направить на любой IP (DNS A-запись)
- Timeweb остаётся только как регистратор домена

### Что нужно:
- Пароль от Beget VPS (193.42.124.57) для настройки
- Доступ к DNS-записям домена opora-migration.ru в панели Timeweb

### Сервер Timeweb:
- Можно удалить после переноса (экономия ~300-500₽/мес)
- Или оставить и написать в поддержку о проблеме с сетью

#!/bin/bash
# Ежедневный бэкап данных сайта
# Добавить в cron: 0 3 * * * /root/opora-migration/deploy/backup.sh
# (каждый день в 3:00 ночи)

BACKUP_DIR="/root/backups/opora-migration"
DATE=$(date +%Y-%m-%d)
PROJECT_DIR="/root/opora-migration"

mkdir -p "$BACKUP_DIR"

# Бэкапим данные и загруженные фото
tar -czf "$BACKUP_DIR/backup-$DATE.tar.gz" \
  -C "$PROJECT_DIR" data/ uploads/ .env \
  2>/dev/null

# Удаляем бэкапы старше 30 дней
find "$BACKUP_DIR" -name "backup-*.tar.gz" -mtime +30 -delete

echo "Бэкап создан: $BACKUP_DIR/backup-$DATE.tar.gz"

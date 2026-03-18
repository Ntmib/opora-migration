FROM node:22-alpine AS base

# --- Этап сборки ---
FROM base AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Этап запуска ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Не запускаем от root (безопасность)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копируем только то что нужно для запуска
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Папки для данных (монтируются как volume)
RUN mkdir -p data public/uploads data/backups && \
    chown -R nextjs:nodejs data public/uploads

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

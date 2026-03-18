/**
 * Простой rate limiter на основе Map.
 * На VPS процесс один — Map работает стабильно между запросами.
 * Ограничивает количество запросов с одного IP за заданный интервал.
 */

const requests = new Map<string, { count: number; resetTime: number }>();

// Очистка старых записей каждые 5 минут (защита от утечки памяти)
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of requests) {
    if (now > value.resetTime) {
      requests.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function rateLimit(
  ip: string,
  { maxRequests = 5, windowMs = 60_000 } = {}
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = requests.get(ip);

  if (!entry || now > entry.resetTime) {
    requests.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  entry.count++;
  if (entry.count > maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  return { allowed: true, remaining: maxRequests - entry.count };
}

// lib/rateLimit.js
// In-memory sliding-window limiter. Good enough for a single-instance
// deploy or student project — note that this resets on server restart
// and doesn't share state across multiple serverless instances. For
// production behind multiple instances, swap this for a Redis-backed
// limiter (e.g. Upstash) using the same checkRateLimit(key) interface.
const hits = new Map();

export function checkRateLimit(key, { windowMs = 60_000, max = 5 } = {}) {
  const now = Date.now();
  const entry = hits.get(key) ?? { count: 0, resetAt: now + windowMs };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + windowMs;
  }

  entry.count += 1;
  hits.set(key, entry);

  return { allowed: entry.count <= max, remaining: Math.max(0, max - entry.count), resetAt: entry.resetAt };
}

export function getClientKey(req) {
  return req.headers.get("x-forwarded-for") ?? "unknown";
}

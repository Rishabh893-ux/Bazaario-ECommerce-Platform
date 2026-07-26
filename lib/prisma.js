// lib/prisma.js
import { PrismaClient } from "@prisma/client";

// Next.js hot-reloads modules in dev, which would otherwise spawn a
// new PrismaClient (and a new connection pool) on every save.
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

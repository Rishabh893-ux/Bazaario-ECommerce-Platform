// app/api/auth/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";

export async function POST(req) {
  const { allowed } = checkRateLimit(`register:${getClientKey(req)}`, { windowMs: 60_000, max: 5 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many attempts — try again in a minute" }, { status: 429 });
  }

  const { name, email, password } = await req.json();

  if (!name || !email || !password || password.length < 8) {
    return NextResponse.json(
      { error: "Name, email, and an 8+ character password are required" },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Same generic shape as the auth error — don't confirm which
    // emails are already registered.
    return NextResponse.json({ error: "Could not create account" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, password: hashed, role: "CUSTOMER" },
  });

  return NextResponse.json({ id: user.id, email: user.email }, { status: 201 });
}

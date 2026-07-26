export const dynamic = 'force-dynamic';
// app/api/vendor/register/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientKey } from "@/lib/rateLimit";

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req) {
  const { allowed } = checkRateLimit(`vendor-register:${getClientKey(req)}`, { windowMs: 60_000, max: 5 });
  if (!allowed) {
    return NextResponse.json({ error: "Too many attempts — try again in a minute" }, { status: 429 });
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.vendorId) {
    return NextResponse.json({ error: "Vendor profile already exists" }, { status: 409 });
  }

  const { storeName, description } = await req.json();
  if (!storeName || storeName.trim().length < 3) {
    return NextResponse.json({ error: "Store name must be at least 3 characters" }, { status: 400 });
  }

  const baseSlug = slugify(storeName);
  let slug = baseSlug;
  let suffix = 1;
  // storeSlug is unique — append a counter on collision rather than
  // failing the whole request over a common store name.
  while (await prisma.vendor.findUnique({ where: { storeSlug: slug } })) {
    slug = `${baseSlug}-${suffix++}`;
  }

  const vendor = await prisma.$transaction(async (tx) => {
    const created = await tx.vendor.create({
      data: {
        userId: session.user.id,
        storeName: storeName.trim(),
        storeSlug: slug,
        description: description ?? null,
        status: "PENDING",
      },
    });
    await tx.user.update({
      where: { id: session.user.id },
      data: { role: "VENDOR" },
    });
    return created;
  });

  return NextResponse.json(
    { vendor, message: "Registered — awaiting admin approval" },
    { status: 201 }
  );
}

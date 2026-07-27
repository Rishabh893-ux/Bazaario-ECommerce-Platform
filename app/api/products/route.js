import { headers } from "next/headers";
// app/api/products/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Public listing — every vendor's active products, filterable and paginated.
export async function GET(req) {
  headers();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const vendorSlug = searchParams.get("vendor");
  const q = searchParams.get("q");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get("pageSize") ?? "20", 10)));

  const where = {
    isActive: true,
    ...(category && { category: { slug: category } }),
    ...(vendorSlug && { vendor: { storeSlug: vendorSlug } }),
    ...(q && { name: { contains: q } }),
  };

  // Fetch one extra row to know whether another page exists, without a
  // separate COUNT query on every request.
  const rows = await prisma.product.findMany({
    where,
    include: {
      vendor: { select: { storeName: true, storeSlug: true } },
      category: { select: { name: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize + 1,
  });

  const hasMore = rows.length > pageSize;
  return NextResponse.json({ products: rows.slice(0, pageSize), page, pageSize, hasMore });
}

// Vendor-only creation — a vendor can only ever create products under
// their own vendorId, taken from the session, never from the request body.
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "VENDOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.vendorStatus !== "APPROVED") {
    return NextResponse.json({ error: "Vendor not yet approved" }, { status: 403 });
  }

  const body = await req.json();
  const { name, description, price, stockCount, sku, categoryId, images } = body;

  if (!name || !description || price == null || stockCount == null || !sku) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (price <= 0) {
    return NextResponse.json({ error: "Price must be positive" }, { status: 400 });
  }

  const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`;

  const product = await prisma.product.create({
    data: {
      vendorId: session.user.vendorId,
      categoryId: categoryId ?? null,
      name,
      slug,
      description,
      price,
      stockCount,
      sku,
      images: images ?? [],
    },
  });

  return NextResponse.json(product, { status: 201 });
}

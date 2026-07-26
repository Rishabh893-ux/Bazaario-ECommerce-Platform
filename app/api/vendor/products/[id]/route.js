// app/api/vendor/products/[id]/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireOwnProduct(id, vendorId) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || product.vendorId !== vendorId) return null;
  return product;
}

export async function PATCH(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "VENDOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await requireOwnProduct(params.id, session.user.vendorId);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const allowed = ["name", "description", "price", "stockCount", "images", "isActive", "categoryId"];
  const data = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)));

  const updated = await prisma.product.update({ where: { id: params.id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "VENDOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await requireOwnProduct(params.id, session.user.vendorId);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Soft delete — keeps order history intact for past buyers instead of
  // breaking foreign keys on OrderItem by hard-deleting the product.
  await prisma.product.update({ where: { id: params.id }, data: { isActive: false } });
  return NextResponse.json({ success: true });
}

export const dynamic = 'force-dynamic';
// app/api/vendor/orders/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "VENDOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const items = await prisma.orderItem.findMany({
    where: { vendorId: session.user.vendorId, order: { paymentStatus: "paid" } },
    include: {
      product: { select: { name: true } },
      order: { select: { id: true, createdAt: true, shippingAddress: true, user: { select: { name: true } } } },
    },
    orderBy: { order: { createdAt: "desc" } },
  });

  return NextResponse.json(items);
}

// PATCH { orderItemId, status }
export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "VENDOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { orderItemId, status } = await req.json();
  const validStatuses = ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  // Ownership check happens in the WHERE clause itself — updateMany
  // returns 0 rows touched if this vendor doesn't own the item, instead
  // of trusting the client-sent orderItemId blindly.
  const result = await prisma.orderItem.updateMany({
    where: { id: orderItemId, vendorId: session.user.vendorId },
    data: { status },
  });

  if (result.count === 0) {
    return NextResponse.json({ error: "Order item not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}


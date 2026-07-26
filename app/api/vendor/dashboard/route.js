import { headers } from "next/headers";
export const dynamic = 'force-dynamic';
// app/api/vendor/dashboard/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Every query below is scoped by vendorId from the session — never
// from a query param — so one vendor can never read another vendor's
// revenue or order data by editing the request.
export async function GET(req) {
  headers();

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "VENDOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const vendorId = session.user.vendorId;

  const [productCount, orderItems, lowStock] = await Promise.all([
    prisma.product.count({ where: { vendorId } }),
    prisma.orderItem.findMany({
      where: { vendorId, order: { paymentStatus: "paid" } },
      include: { order: { select: { createdAt: true } }, product: { select: { name: true } } },
    }),
    prisma.product.findMany({
      where: { vendorId, stockCount: { lt: 5 } },
      select: { id: true, name: true, stockCount: true },
    }),
  ]);

  const totalRevenue = orderItems.reduce((sum, i) => sum + i.priceAtSale * i.quantity, 0);
  const totalUnitsSold = orderItems.reduce((sum, i) => sum + i.quantity, 0);

  // Simple day-bucketed revenue — enough for a dashboard chart without
  // standing up a separate analytics pipeline at this scale.
  const revenueByDay = {};
  for (const item of orderItems) {
    const day = item.order.createdAt.toISOString().slice(0, 10);
    revenueByDay[day] = (revenueByDay[day] ?? 0) + item.priceAtSale * item.quantity;
  }

  const statusCounts = orderItems.reduce((acc, i) => {
    acc[i.status] = (acc[i.status] ?? 0) + 1;
    return acc;
  }, {});

  return NextResponse.json({
    productCount,
    totalRevenue: +totalRevenue.toFixed(2),
    totalUnitsSold,
    revenueByDay,
    orderStatusCounts: statusCounts,
    lowStockProducts: lowStock,
  });
}


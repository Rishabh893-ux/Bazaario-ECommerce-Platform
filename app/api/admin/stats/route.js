import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req) {
  headers();

  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Basic aggregations for the Admin dashboard
    const [totalUsers, totalVendors, pendingVendors, totalOrders, totalRevenue] = await Promise.all([
      prisma.user.count(),
      prisma.vendor.count(),
      prisma.vendor.count({ where: { status: "PENDING" } }),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: {
          total: true
        }
      })
    ]);

    // Fetch recent orders for the activity feed
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } }
      }
    });

    // Time-series data for the last 30 days (mocked slightly to simplify Prisma MongoDB date grouping limitations)
    // Normally we'd use aggregate raw, but we can just fetch the last 30 days of orders and group in memory
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const last30DaysOrders = await prisma.order.findMany({
      where: { createdAt: { gte: thirtyDaysAgo }, paymentStatus: "paid" },
      select: { createdAt: true, total: true }
    });

    const revenueMap = new Map();
    for (let i = 0; i < 30; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      revenueMap.set(d.toISOString().split("T")[0], 0);
    }

    last30DaysOrders.forEach(o => {
      const dateStr = o.createdAt.toISOString().split("T")[0];
      if (revenueMap.has(dateStr)) {
        revenueMap.set(dateStr, revenueMap.get(dateStr) + o.total);
      }
    });

    const revenueData = Array.from(revenueMap.entries())
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json({
      totalUsers,
      totalVendors,
      pendingVendors,
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      recentOrders,
      revenueData
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

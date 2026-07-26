export const dynamic = 'force-dynamic';
// app/api/admin/vendors/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") return null;
  return session;
}

export async function GET(req) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const vendors = await prisma.vendor.findMany({
    include: {
      user: { select: { name: true, email: true, createdAt: true } },
      _count: { select: { products: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(vendors);
}

// PATCH /api/admin/vendors  { vendorId, status: "APPROVED" | "SUSPENDED" }
export async function PATCH(req) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { vendorId, status } = await req.json();
  if (!["APPROVED", "SUSPENDED", "PENDING"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const vendor = await prisma.vendor.update({
    where: { id: vendorId },
    data: { status },
    include: { user: true },
  });

  if (status === "APPROVED" && vendor.user?.email) {
    // Dynamically import to avoid circular dependencies if any
    const { sendVendorApprovalEmail } = await import("@/lib/mailer");
    await sendVendorApprovalEmail(vendor.user.email, vendor.storeName);
  }

  return NextResponse.json(vendor);
}


export const dynamic = 'force-dynamic';
// app/api/cart/coupon/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Client sends the code + current cart subtotal (and optionally a vendorId
// if the cart is single-vendor); server returns the authoritative discount.
// The client never computes the discount itself — that number must come
// from here or a user could apply an expired/invalid coupon by editing
// the request that reaches checkout.
export async function POST(req) {
  const { code, subtotal, vendorId } = await req.json();

  if (!code || subtotal == null) {
    return NextResponse.json({ error: "Missing code or subtotal" }, { status: 400 });
  }

  const coupon = await prisma.coupon.findUnique({ where: { code } });

  if (!coupon || !coupon.isActive) {
    return NextResponse.json({ error: "Invalid coupon" }, { status: 404 });
  }
  if (coupon.expiresAt && coupon.expiresAt < new Date()) {
    return NextResponse.json({ error: "Coupon expired" }, { status: 400 });
  }
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return NextResponse.json({ error: "Coupon usage limit reached" }, { status: 400 });
  }
  // Vendor-scoped coupons only apply to that vendor's items.
  if (coupon.vendorId && coupon.vendorId !== vendorId) {
    return NextResponse.json({ error: "Coupon not valid for this vendor" }, { status: 400 });
  }

  const discount =
    coupon.discountType === "PERCENT"
      ? +(subtotal * (coupon.value / 100)).toFixed(2)
      : Math.min(coupon.value, subtotal);

  return NextResponse.json({
    valid: true,
    code: coupon.code,
    discount,
    total: +(subtotal - discount).toFixed(2),
  });
}

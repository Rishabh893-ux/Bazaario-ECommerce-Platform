export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { items, couponCode, shippingAddress } = await req.json();
  if (!items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: { id: { in: items.map((i) => i.productId) } },
    include: { vendor: true },
  });

  let subtotal = 0;
  const lineItems = [];
  
  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product || !product.isActive) {
      return NextResponse.json({ error: `Product unavailable: ${item.productId}` }, { status: 400 });
    }
    if (product.stockCount < item.quantity) {
      return NextResponse.json({ error: `Insufficient stock for ${product.name}` }, { status: 409 });
    }
    
    subtotal += product.price * item.quantity;
    
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: product.images[0] ? [product.images[0]] : [],
          tax_code: "txcd_10000000", // General - Electronically Supplied Services (Digital Goods) required by Managed Payments
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: item.quantity,
    });
  }

  let discountTotal = 0;
  let stripeCouponId = null;
  
  if (couponCode) {
    const coupon = await prisma.coupon.findUnique({ where: { code: couponCode } });
    if (coupon?.isActive && (!coupon.expiresAt || coupon.expiresAt > new Date())) {
      discountTotal =
        coupon.discountType === "PERCENT"
          ? subtotal * (coupon.value / 100)
          : Math.min(coupon.value, subtotal);
          
      // Create ephemeral Stripe coupon to represent this discount
      const stripeCoupon = await stripe.coupons.create({
        amount_off: coupon.discountType === "FIXED" ? Math.round(discountTotal * 100) : undefined,
        percent_off: coupon.discountType === "PERCENT" ? coupon.value : undefined,
        currency: coupon.discountType === "FIXED" ? "usd" : undefined,
        duration: "once",
      });
      stripeCouponId = stripeCoupon.id;
    }
  }
  
  const total = +(subtotal - discountTotal).toFixed(2);

  try {
    // Pre-create the order
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        subtotal,
        discountTotal,
        total,
        couponCode: couponCode ?? null,
        shippingAddress: shippingAddress,
        stripeSessionId: `pending_${Date.now()}_${Math.random()}`, // Prevent MongoDB unique constraint crash on null
        orderItems: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return {
              productId: product.id,
              vendorId: product.vendorId,
              quantity: item.quantity,
              priceAtSale: product.price,
            };
          }),
        },
      },
    });

    const transferGroup = `ORDER_${order.id}`;

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_URL;

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      discounts: stripeCouponId ? [{ coupon: stripeCouponId }] : undefined,
      success_url: `${origin}/cart?success=true`,
      cancel_url: `${origin}/checkout?canceled=true`,
      managed_payments: {
        enabled: false,
      },
      metadata: {
        orderId: order.id,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: stripeSession.id },
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Checkout process error:", error);
    return NextResponse.json({ error: error.message || "Failed to create checkout session" }, { status: 500 });
  }
}

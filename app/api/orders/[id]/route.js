// app/api/orders/[id]/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { orderItems: { include: { product: { select: { name: true } } } } },
  });

  if (!order || order.userId !== session.user.id) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // Update payment status dynamically from Stripe if it's currently UNPAID
  if (order.paymentStatus !== "PAID" && order.stripeSessionId && !order.stripeSessionId.startsWith("pending_")) {
    try {
      const stripeSession = await stripe.checkout.sessions.retrieve(order.stripeSessionId);
      if (stripeSession.payment_status === "paid") {
        order.paymentStatus = "PAID";
        await prisma.order.update({
          where: { id: order.id },
          data: { paymentStatus: "PAID" },
        });
      }
    } catch (err) {
      console.error("Failed to fetch Stripe session:", err);
    }
  }

  return NextResponse.json(order);
}

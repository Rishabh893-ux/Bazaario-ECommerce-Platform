import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderConfirmationEmail } from "@/lib/mailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const rawBody = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
  } catch (err) {
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId in metadata" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.paymentStatus === "paid") {
      return NextResponse.json({ received: true });
    }

    try {
      // 1. Atomic Transaction: Deduct inventory & mark processing
      await prisma.$transaction(async (tx) => {
        for (const item of order.orderItems) {
          const product = await tx.product.findUnique({ where: { id: item.productId } });
          if (!product || product.stockCount < item.quantity) {
            throw new Error(`Oversell prevented for product ${item.productId}`);
          }
          await tx.product.update({
            where: { id: product.id },
            data: { stockCount: { decrement: item.quantity } },
          });
          
          await tx.orderItem.update({
            where: { id: item.id },
            data: { status: "PROCESSING" }
          });
        }
        await tx.order.update({
          where: { id: order.id },
          data: { paymentStatus: "paid" },
        });
      });

      // Send the beautiful Resend order receipt email
      if (session.customer_details?.email) {
        await sendOrderConfirmationEmail(
          session.customer_details.email,
          session.customer_details.name || "Customer",
          order.id,
          order.total
        );
      }

      // 2. Execute Stripe Transfers to vendors
      if (session.transfer_group) {
        // Group amounts by vendor stripe account
        const vendorPayouts = {};
        const PLATFORM_FEE_PERCENT = 10;
        
        for (const item of order.orderItems) {
          const product = await prisma.product.findUnique({
            where: { id: item.productId },
            include: { vendor: true }
          });
          
          if (product?.vendor?.stripeAccountId) {
            const lineTotal = item.priceAtSale * item.quantity;
            const vendorShare = lineTotal * (1 - PLATFORM_FEE_PERCENT / 100);
            vendorPayouts[product.vendor.stripeAccountId] = 
              (vendorPayouts[product.vendor.stripeAccountId] || 0) + vendorShare;
          }
        }

        // We assume global order discount applies proportionally or we just calculate
        // a simple proportional discount. For simplicity, we'll apply it here.
        const totalPaid = session.amount_total / 100; // in dollars
        const dbTotal = order.total;
        const ratio = totalPaid / dbTotal;

        for (const [stripeAccountId, amount] of Object.entries(vendorPayouts)) {
          const finalAmountCents = Math.round((amount * ratio) * 100);
          if (finalAmountCents > 0) {
            await stripe.transfers.create({
              amount: finalAmountCents,
              currency: "usd",
              destination: stripeAccountId,
              transfer_group: session.transfer_group,
            });
          }
        }
      }

    } catch (err) {
      console.error("Webhook Fulfillment Error:", err.message);
      return NextResponse.json({ error: "Fulfillment failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}

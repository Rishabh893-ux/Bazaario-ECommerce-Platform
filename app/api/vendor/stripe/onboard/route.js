import { headers } from "next/headers";
export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Stripe from "stripe";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  headers();

  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const vendor = await prisma.vendor.findUnique({ where: { userId: session.user.id } });
  if (!vendor) return NextResponse.json({ error: "Vendor not found" }, { status: 404 });

  if (!vendor.stripeAccountId) {
    return NextResponse.json({ connected: false, payoutsEnabled: false });
  }

  const account = await stripe.accounts.retrieve(vendor.stripeAccountId);
  return NextResponse.json({
    connected: true,
    payoutsEnabled: account.payouts_enabled,
  });
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const vendor = await prisma.vendor.findUnique({ where: { userId: session.user.id } });
  if (!vendor) return NextResponse.json({ error: "Vendor not found" }, { status: 404 });

  let accountId = vendor.stripeAccountId;

  if (!accountId) {
    const account = await stripe.accounts.create({
      type: "express",
      email: session.user.email,
      capabilities: { transfers: { requested: true } },
    });
    accountId = account.id;
    await prisma.vendor.update({
      where: { id: vendor.id },
      data: { stripeAccountId: accountId },
    });
  }

  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    refresh_url: `${process.env.NEXT_PUBLIC_URL}/vendor/onboarding`,
    return_url: `${process.env.NEXT_PUBLIC_URL}/vendor/onboarding`,
    type: "account_onboarding",
  });

  return NextResponse.json({ url: accountLink.url });
}


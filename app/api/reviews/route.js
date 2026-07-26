import { headers } from "next/headers";
export const dynamic = 'force-dynamic';
// app/api/reviews/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId, rating, comment } = await req.json();
  if (!productId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 });
  }

  // Verified-purchase check: the user must have a DELIVERED order item
  // for this product. This can't be expressed as a DB constraint (it
  // spans Order + OrderItem + Product), so it's enforced here, before
  // the review write — not left to the UI to hide the review button.
  const purchase = await prisma.orderItem.findFirst({
    where: {
      productId,
      status: "DELIVERED",
      order: { userId: session.user.id },
    },
  });
  if (!purchase) {
    return NextResponse.json(
      { error: "You can only review products you've purchased and received" },
      { status: 403 }
    );
  }

  try {
    const review = await prisma.$transaction(async (tx) => {
      const created = await tx.review.create({
        data: { userId: session.user.id, productId, rating, comment },
      });

      // Recompute the cached average from all reviews rather than doing
      // incremental math — simpler to get right, and review volume per
      // product is small enough that this isn't a performance concern.
      const agg = await tx.review.aggregate({
        where: { productId },
        _avg: { rating: true },
        _count: true,
      });
      await tx.product.update({
        where: { id: productId },
        data: { ratingAvg: agg._avg.rating ?? 0, ratingCount: agg._count },
      });

      return created;
    });

    return NextResponse.json(review, { status: 201 });
  } catch (err) {
    // Unique constraint on [userId, productId] — one review per purchase.
    if (err.code === "P2002") {
      return NextResponse.json({ error: "You've already reviewed this product" }, { status: 409 });
    }
    throw err;
  }
}

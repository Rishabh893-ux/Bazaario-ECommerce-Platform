"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { Star, ShoppingCart, ChevronLeft } from "lucide-react";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useToast } from "@/app/components/Toast";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const showToast = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewError, setReviewError] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  const load = () => {
    setLoading(true);
    fetch(`/api/products/${slug}`)
      .then((r) => r.json())
      .then(setProduct)
      .finally(() => setLoading(false));
  };

  useEffect(load, [slug]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] ?? null,
        vendorId: product.vendorId,
        vendorName: product.vendor?.storeName ?? "Vendly Seller",
      })
    );
    showToast(`${product.name} added to cart`);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setReviewError("");
    setReviewSubmitting(true);
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, ...reviewForm }),
    });
    setReviewSubmitting(false);
    if (!res.ok) {
      const data = await res.json();
      setReviewError(data.error ?? "Could not submit review");
      return;
    }
    setReviewForm({ rating: 5, comment: "" });
    load();
  };

  if (loading) return <div className="p-10 text-ink/50">Loading…</div>;
  if (!product) return <div className="p-10 text-ink/50">Product not found.</div>;

  return (
    <main className="min-h-screen bg-background px-6 py-8 max-w-5xl mx-auto">
      <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-ink/50 mb-6 hover:text-brand">
        <ChevronLeft size={16} /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-squircle bg-brand-light h-80 flex items-center justify-center overflow-hidden">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.name} className="h-full w-full object-contain" />
          ) : (
            <div className="h-40 w-40 rounded-2xl bg-card/60" />
          )}
        </div>

        <div>
          <p className="text-xs font-semibold text-brand uppercase tracking-wide">
            {product.vendor?.storeName}
          </p>
          <h1 className="text-2xl font-extrabold text-ink mt-1">{product.name}</h1>

          <div className="flex items-center gap-1.5 mt-2 text-sm text-ink/60">
            <Star size={15} className="fill-accent text-accent" />
            <span>{product.ratingAvg?.toFixed(1) ?? "—"}</span>
            <span className="text-ink/30">({product.ratingCount ?? 0} reviews)</span>
          </div>

          <p className="mt-4 text-ink/70 text-sm leading-relaxed">{product.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-3xl font-bold text-ink">${product.price?.toFixed(2)}</span>
            {product.stockCount > 0 && product.stockCount < 5 && (
              <span className="text-xs font-semibold text-accent">Only {product.stockCount} left</span>
            )}
            {product.stockCount === 0 && (
              <span className="text-xs font-semibold text-red-600">Out of stock</span>
            )}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                handleAddToCart();
                router.push('/checkout');
              }}
              disabled={product.stockCount === 0}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-ink hover:bg-ink/80 disabled:bg-ink/20 text-background font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              Buy Now
            </button>
            <button
              onClick={() => {
                handleAddToCart();
                // Add a visual toast feedback if needed, but dispatch is synchronous
              }}
              disabled={product.stockCount === 0}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-brand hover:bg-brand-dark disabled:bg-ink/20 text-white font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <ShoppingCart size={18} /> Add to cart
            </button>
          </div>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-xl font-bold text-ink mb-4">Reviews</h2>

        {session ? (
          <form onSubmit={submitReview} className="mb-8 bg-card border border-brand-light rounded-2xl p-5">
            {reviewError && <p className="mb-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{reviewError}</p>}
            <label className="text-xs font-semibold text-ink/60">Your rating</label>
            <select
              value={reviewForm.rating}
              onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
              className="block mt-1 mb-3 px-3 py-2 rounded-lg border border-brand-light"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>
              ))}
            </select>
            <textarea
              placeholder="Share your thoughts on this product…"
              value={reviewForm.comment}
              onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-brand-light mb-3 text-sm"
              rows={3}
            />
            <button
              type="submit"
              disabled={reviewSubmitting}
              className="px-5 py-2 rounded-full bg-ink text-background text-sm font-semibold"
            >
              {reviewSubmitting ? "Submitting…" : "Submit review"}
            </button>
            <p className="mt-2 text-xs text-ink/40">
              You can only review products you've purchased and received.
            </p>
          </form>
        ) : (
          <p className="mb-8 text-sm text-ink/50">
            <a href="/login" className="text-brand font-medium">Log in</a> to leave a review.
          </p>
        )}

        {product.reviews?.length === 0 ? (
          <p className="text-sm text-ink/40">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {product.reviews?.map((r) => (
              <div key={r.id} className="border-b border-brand-light pb-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-ink">{r.user?.name}</span>
                  <div className="flex">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} size={13} className="fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                {r.comment && <p className="text-sm text-ink/60 mt-1">{r.comment}</p>}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

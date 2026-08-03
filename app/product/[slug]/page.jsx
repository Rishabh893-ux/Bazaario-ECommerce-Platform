"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { Star, ShoppingCart, ChevronLeft, ShieldCheck, Truck, RefreshCcw, Store, Heart, Share2, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useToast } from "@/app/components/Toast";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

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
  const [wishlisted, setWishlisted] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

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
    showToast(`${product.name} added to cart!`);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  const handleWishlist = async () => {
    if (!session) { router.push("/login"); return; }
    setWishlisted(w => !w);
    await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    });
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
    showToast("Review submitted!");
    load();
  };

  const isOutOfStock = product?.stockCount === 0;
  const isLowStock = product?.stockCount > 0 && product?.stockCount < 5;

  if (loading) return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background max-w-6xl mx-auto px-6 py-12 animate-pulse">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="h-[480px] bg-card rounded-[2rem] border border-brand-light/50" />
          <div className="space-y-5 pt-4">
            <div className="h-4 w-24 bg-card rounded-full" />
            <div className="h-10 w-full bg-card rounded-xl" />
            <div className="h-4 w-32 bg-card rounded-full" />
            <div className="h-24 bg-card rounded-xl" />
            <div className="h-12 w-40 bg-card rounded-full" />
            <div className="flex gap-3">
              <div className="h-14 flex-1 bg-card rounded-full" />
              <div className="h-14 w-14 bg-card rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );

  if (!product) return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-black text-ink mb-2">Product not found</h1>
        <p className="text-ink/50 mb-8">This product may have been removed or the link is incorrect.</p>
        <Link href="/" className="px-8 py-3.5 rounded-full bg-ink text-white font-bold hover:bg-brand-dark transition-all shadow-md">
          Browse all products
        </Link>
      </div>
      <Footer />
    </>
  );

  const images = product.images?.length ? product.images : [null];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pb-20">
        {/* Breadcrumb Back */}
        <div className="max-w-6xl mx-auto px-6 pt-6 pb-2">
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm text-ink/50 hover:text-brand transition-colors font-medium group">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-6 animate-fade-up">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[380px] md:h-[480px] rounded-[2rem] bg-gradient-to-br from-white to-slate-50 dark:from-card dark:to-brand/5 border border-brand-light/50 overflow-hidden flex items-center justify-center shadow-sm">
                {images[activeImage] ? (
                  <img
                    src={images[activeImage]}
                    alt={product.name}
                    className="object-contain h-full w-full p-8 transition-all duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center text-ink/20">
                    <Package size={64} />
                    <p className="text-sm mt-2 font-medium">No image</p>
                  </div>
                )}
                {isOutOfStock && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-[2rem]">
                    <span className="bg-white/90 text-ink font-black px-6 py-2 rounded-full text-sm">Out of Stock</span>
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`h-16 w-16 shrink-0 rounded-xl border-2 overflow-hidden bg-white transition-all ${activeImage === i ? 'border-accent shadow-md' : 'border-brand-light/50 hover:border-brand-light'}`}
                    >
                      {img && <img src={img} alt="" className="h-full w-full object-contain p-1" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="py-2">
              {/* Vendor */}
              {product.vendor?.storeName && (
                <Link href={`/store/${product.vendorId}`} className="inline-flex items-center gap-1.5 text-xs font-black text-accent uppercase tracking-widest mb-3 hover:text-accent-dark transition-colors">
                  <Store size={12} />
                  {product.vendor.storeName}
                </Link>
              )}

              <h1 className="text-2xl md:text-3xl font-black text-ink leading-tight mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} size={14} className={s <= Math.round(product.ratingAvg ?? 0) ? "fill-accent text-accent" : "fill-brand-light text-brand-light"} />
                  ))}
                </div>
                <span className="text-sm font-bold text-ink/70">
                  {product.ratingCount > 0 ? `${product.ratingAvg?.toFixed(1)} (${product.ratingCount} reviews)` : "No reviews yet"}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-4">
                <span className="text-4xl font-black text-ink">${product.price?.toFixed(2)}</span>
                {isLowStock && (
                  <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full mb-1 animate-pulse">
                    Only {product.stockCount} left!
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-ink/70 text-sm leading-relaxed mb-6 max-w-md">{product.description}</p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <button
                  onClick={() => { handleAddToCart(); router.push('/checkout'); }}
                  disabled={isOutOfStock}
                  className="flex-1 px-8 py-4 rounded-full bg-ink hover:bg-brand-dark disabled:opacity-40 text-white font-bold transition-all shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Buy Now
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 px-8 py-4 rounded-full font-bold transition-all shadow-sm flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-40 ${
                    cartAdded
                      ? "bg-green-500 text-white shadow-green-400/30"
                      : "bg-card border border-brand-light hover:border-brand-light/80 hover:bg-card text-ink"
                  }`}
                >
                  <ShoppingCart size={18} />
                  {cartAdded ? "Added!" : "Add to Cart"}
                </button>
                <button
                  onClick={handleWishlist}
                  className={`h-14 w-14 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                    wishlisted ? "bg-brand text-white border-brand shadow-md" : "bg-card border-brand-light hover:border-brand-light/80 text-ink/40 hover:text-brand"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={18} className={wishlisted ? "fill-white" : ""} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-brand-light/50">
                {[
                  { icon: ShieldCheck, label: "Secure Payment" },
                  { icon: Truck, label: "Fast Delivery" },
                  { icon: RefreshCcw, label: "Easy Returns" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                    <div className="p-2 bg-brand-light/30 rounded-xl">
                      <Icon size={16} className="text-brand/60" />
                    </div>
                    <span className="text-[10px] font-bold text-ink/50 uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <section className="mt-16 border-t border-brand-light/50 pt-12">
            <h2 className="text-2xl font-black text-ink mb-8">Customer Reviews</h2>

            {session ? (
              <div className="mb-10 bg-card border border-brand-light/50 rounded-[2rem] p-8 shadow-sm">
                <h3 className="font-bold text-ink mb-5">Leave a Review</h3>
                <form onSubmit={submitReview} className="space-y-4">
                  {reviewError && <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3 font-medium">{reviewError}</p>}
                  <div>
                    <label className="text-xs font-bold text-ink/50 uppercase tracking-wider mb-2 block">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setReviewForm({ ...reviewForm, rating: n })}
                          className="p-1"
                        >
                          <Star size={24} className={n <= reviewForm.rating ? "fill-accent text-accent" : "fill-brand-light text-brand-light"} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-ink/50 uppercase tracking-wider mb-2 block">Your Review</label>
                    <textarea
                      placeholder="Share your thoughts on this product…"
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      className="w-full px-5 py-4 rounded-2xl border border-brand-light/70 bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all font-medium text-ink placeholder:text-ink/30 resize-none"
                      rows={3}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="px-8 py-3.5 rounded-full bg-ink text-white font-bold hover:bg-brand-dark transition-all shadow-md disabled:opacity-50"
                  >
                    {reviewSubmitting ? "Submitting…" : "Submit Review"}
                  </button>
                  <p className="text-xs text-ink/40 font-medium">You can only review products you have purchased and received.</p>
                </form>
              </div>
            ) : (
              <div className="mb-10 bg-card border border-brand-light/50 rounded-[2rem] p-8 text-center">
                <p className="text-ink/60 font-medium">
                  <Link href="/login" className="text-accent font-bold hover:text-accent-dark transition-colors">Sign in</Link> to leave a review.
                </p>
              </div>
            )}

            {!product.reviews?.length ? (
              <div className="text-center py-16 bg-card rounded-[2rem] border border-brand-light/50">
                <div className="text-4xl mb-3">💬</div>
                <p className="text-ink/50 font-medium">No reviews yet — be the first!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {product.reviews.map((r) => (
                  <div key={r.id} className="bg-card border border-brand-light/50 rounded-[1.5rem] p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-brand/10 flex items-center justify-center text-xs font-black text-brand">
                        {r.user?.name?.[0]?.toUpperCase() ?? "U"}
                      </div>
                      <div>
                        <p className="font-bold text-ink text-sm">{r.user?.name ?? "Anonymous"}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={11} className={i < r.rating ? "fill-accent text-accent" : "fill-brand-light text-brand-light"} />
                          ))}
                        </div>
                      </div>
                    </div>
                    {r.comment && <p className="text-sm text-ink/70 leading-relaxed">{r.comment}</p>}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

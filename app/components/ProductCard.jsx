"use client";

import { Heart, Star, ShoppingCart, Check, Store } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "./Toast";

export default function ProductCard({ product, onAddToCart, initialWishlisted = false }) {
  const { data: session } = useSession();
  const router = useRouter();
  const showToast = useToast();
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [cartAdded, setCartAdded] = useState(false);

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) { router.push("/login"); return; }
    setWishlisted((w) => !w);
    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    });
    const data = await res.json();
    setWishlisted(data.wishlisted);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product.id);
    showToast(`${product.name} added to cart!`);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  const isOutOfStock = product.stockCount === 0;
  const isLowStock = product.stockCount > 0 && product.stockCount < 5;
  const hasRating = product.ratingCount > 0;

  return (
    <div
      onClick={() => router.push(`/product/${product.slug}`)}
      className="group relative rounded-squircle bg-card border border-brand-light/70 overflow-hidden cursor-pointer
                 transition-all duration-300 ease-out
                 hover:-translate-y-1.5 hover:shadow-card-hover hover:border-accent/30"
    >
      {/* Image area */}
      <div className="relative h-56 flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-slate-50 dark:from-card dark:to-brand/5 border-b border-brand-light/40 p-3">
        {product.images?.[0] ? (
          <>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-108 mix-blend-multiply dark:mix-blend-normal"
            />
            {/* hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          </>
        ) : (
          <div className="h-28 w-28 rounded-2xl bg-brand/5 flex items-center justify-center">
            <Store size={28} className="text-brand/20" />
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={toggleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 h-9 w-9 rounded-full backdrop-blur-sm flex items-center justify-center shadow-md
                      transition-all duration-300 hover:scale-115
                      ${wishlisted
                        ? "bg-brand text-white shadow-brand/30"
                        : "bg-white/90 dark:bg-card/90 text-ink/40 hover:bg-white hover:text-brand"
                      }`}
        >
          <Heart size={16} className={wishlisted ? "fill-white" : ""} />
        </button>

        {/* Stock badges */}
        {isOutOfStock && (
          <span className="absolute bottom-3 left-3 text-[10px] font-bold bg-red-500/90 text-white px-2.5 py-1 rounded-full shadow backdrop-blur-sm uppercase tracking-wide">
            Out of stock
          </span>
        )}
        {isLowStock && (
          <span className="absolute bottom-3 left-3 text-[10px] font-bold bg-amber-500/90 text-white px-2.5 py-1 rounded-full shadow backdrop-blur-sm uppercase tracking-wide animate-pulse">
            Only {product.stockCount} left
          </span>
        )}
      </div>

      {/* Info area */}
      <div className="p-4">
        {/* Vendor chip */}
        {product.vendor?.storeName && (
          <div className="flex items-center gap-1.5 mb-2">
            <Store size={10} className="text-accent shrink-0" />
            <span className="text-[10px] font-bold text-accent uppercase tracking-wider truncate">
              {product.vendor.storeName}
            </span>
          </div>
        )}

        {/* Product name */}
        <h3 className="font-bold text-ink text-[14px] leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mt-1.5 flex items-center gap-1">
          {[1,2,3,4,5].map((star) => (
            <Star
              key={star}
              size={11}
              className={
                hasRating && star <= Math.round(product.ratingAvg)
                  ? "fill-accent text-accent"
                  : "fill-brand-light text-brand-light"
              }
            />
          ))}
          <span className="text-[11px] text-ink/50 ml-1 font-medium">
            {hasRating ? `${product.ratingAvg?.toFixed(1)} (${product.ratingCount})` : "No reviews"}
          </span>
        </div>

        {/* Price + Actions */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <span className="text-lg font-black text-ink">${product.price?.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {/* Buy Now */}
            <button
              onClick={(e) => {
                handleAddToCart(e);
                router.push("/checkout");
              }}
              disabled={isOutOfStock}
              className="h-9 px-4 rounded-full bg-ink hover:bg-brand-dark disabled:opacity-40
                         text-background text-xs font-bold transition-all duration-200 shadow
                         hover:shadow-brand/20 hover:-translate-y-0.5 whitespace-nowrap"
              aria-label="Buy now"
            >
              Buy Now
            </button>

            {/* Add to cart with feedback */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              aria-label="Add to cart"
              className={`h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 shadow disabled:opacity-40
                          ${cartAdded
                            ? "bg-green-500 scale-110 shadow-green-400/40"
                            : "bg-gradient-to-br from-brand to-brand-dark hover:scale-110 hover:shadow-brand/30"
                          }`}
            >
              {cartAdded
                ? <Check size={16} className="text-white animate-spin-in" />
                : <ShoppingCart size={15} className="text-white" />
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

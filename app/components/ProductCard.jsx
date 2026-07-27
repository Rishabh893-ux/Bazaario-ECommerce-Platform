"use client";

import { Heart, Star, ShoppingCart } from "lucide-react";
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

  const toggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) {
      router.push("/login");
      return;
    }
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
    showToast(`${product.name} added to cart`);
  };

  return (
    <div 
      onClick={() => router.push(`/product/${product.slug}`)}
      className="group rounded-squircle bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-brand-light cursor-pointer"
    >
      <div
        className="relative h-80 flex items-center justify-center overflow-hidden bg-brand/5 border-b border-brand/10"
      >
        {product.images?.[0] ? (
          <>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand/40 via-transparent to-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </>
        ) : (
          <div className="h-32 w-32 rounded-2xl bg-brand/10" />
        )}

        <button
          onClick={toggleWishlist}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 hover:bg-white transition-all duration-300"
        >
          <Heart
            size={18}
            className={wishlisted ? "fill-brand text-brand" : "text-ink/40"}
          />
        </button>

        {product.stockCount === 0 && (
          <span className="absolute bottom-3 left-3 text-[11px] font-semibold bg-accent text-white px-2 py-1 rounded-full shadow-md">
            Out of stock
          </span>
        )}
        {product.stockCount > 0 && product.stockCount < 5 && (
          <span className="absolute bottom-3 left-3 text-[11px] font-semibold bg-ink/80 text-background px-2 py-1 rounded-full shadow-md">
            Only {product.stockCount} left
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-extrabold text-brand-dark text-[15px] leading-snug line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-1.5 flex items-center gap-1 text-xs text-ink/60">
          <Star size={13} className="fill-accent text-accent" />
          <span>{product.ratingAvg?.toFixed(1) ?? "—"}</span>
          <span className="text-ink/30">({product.ratingCount ?? 0})</span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-ink">
            ${product.price?.toFixed(2)}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                handleAddToCart(e);
                router.push('/checkout');
              }}
              disabled={product.stockCount === 0}
              className="h-10 px-5 rounded-full bg-gradient-to-r from-ink to-ink/90 hover:to-ink disabled:opacity-50 text-background text-xs font-bold flex items-center justify-center transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              aria-label="Buy now"
            >
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              disabled={product.stockCount === 0}
              className="h-10 w-10 rounded-full bg-gradient-to-br from-brand to-brand-dark disabled:opacity-50 flex items-center justify-center transition-all shadow-md hover:shadow-brand/30 hover:scale-105"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Heart } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useToast } from "../components/Toast";

export default function WishlistPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const showToast = useToast();

  useEffect(() => {
    fetch("/api/wishlist")
      .then((r) => (r.ok ? r.json() : []))
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-6 py-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-extrabold text-ink mb-6 flex items-center gap-2">
          <Heart size={22} className="text-accent fill-accent" /> Your wishlist
        </h1>

        {loading ? (
          <p className="text-ink/40 text-sm">Loading…</p>
        ) : products.length === 0 ? (
          <p className="text-ink/40 text-sm">
            Nothing saved yet — <Link href="/" className="text-brand font-medium">browse products</Link> and tap the heart on anything you like.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <Link key={p.id} href={`/product/${p.slug}`}>
                <ProductCard
                  product={p}
                  onAddToCart={() => {
                    dispatch(addToCart({
                      productId: p.id, name: p.name, price: p.price,
                      image: p.images?.[0] ?? null, vendorId: p.vendorId,
                      vendorName: p.vendor?.storeName ?? "Vendly Seller",
                    }));
                    showToast(`${p.name} added to cart`);
                  }}
                />
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { addToCart } from "@/lib/features/cart/cartSlice";

const CATEGORY_CHIPS = ["All", "Electronics", "Home", "Fashion", "Beauty", "Sports"];

export default function HomePage() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams({ page: String(page), pageSize: "12" });
    if (activeCategory !== "All") params.set("category", activeCategory.toLowerCase());
    if (initialQuery) params.set("q", initialQuery);

    setLoading(true);
    fetch(`/api/products?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.products ?? data);
        setHasMore(Boolean(data.hasMore));
      })
      .finally(() => setLoading(false));
  }, [activeCategory, page, initialQuery]);

  const handleAddToCart = (product) => {
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
  };

  return (
    <>
      <Navbar initialQuery={initialQuery} />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-accent to-brand py-10 sm:py-14">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent blur-3xl opacity-40 mix-blend-screen" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-brand blur-3xl opacity-40 mix-blend-screen" />
          <div className="relative max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white max-w-3xl mx-auto leading-tight drop-shadow-lg">
              Independent sellers.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-yellow-100 to-white drop-shadow-md">
                One effortless checkout.
              </span>
            </h1>
            <p className="mt-6 text-cyan-50 max-w-xl mx-auto text-lg sm:text-xl font-medium">
              Every listing on Vendly comes from a different small business — browse them all in one place.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pt-8 pb-6">
          {initialQuery && (
            <p className="text-sm text-ink/50 mb-4">
              Showing results for <span className="font-semibold text-ink">"{initialQuery}"</span> — <Link href="/" className="text-brand">clear</Link>
            </p>
          )}
          <div className="flex gap-2 flex-wrap">
            {CATEGORY_CHIPS.map((c) => (
              <button
                key={c}
                onClick={() => { setActiveCategory(c); setPage(1); }}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                  activeCategory === c
                    ? "bg-gradient-to-r from-brand to-brand-dark text-white shadow-brand/20 border border-transparent"
                    : "bg-card text-ink/70 border-2 border-brand/10 hover:border-brand/30 hover:bg-brand/5"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 pb-16">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-72 rounded-squircle bg-brand-light animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 text-ink/50">
              No products found — try a different category or search.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} onAddToCart={() => handleAddToCart(p)} />
                ))}
              </div>

              <div className="mt-12 flex justify-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-6 py-2.5 rounded-full border-2 border-brand/20 hover:border-brand hover:bg-brand/5 text-ink text-sm font-bold disabled:opacity-40 transition-all duration-300 shadow-sm"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm font-bold text-ink/70 flex items-center">Page {page}</span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!hasMore}
                  className="px-6 py-2.5 rounded-full border-2 border-brand/20 hover:border-brand hover:bg-brand/5 text-ink text-sm font-bold disabled:opacity-40 transition-all duration-300 shadow-sm"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

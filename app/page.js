"use client";

import { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, ShieldCheck, Truck, Users, Zap } from "lucide-react";
import ProductCard from "./components/ProductCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { addToCart } from "@/lib/features/cart/cartSlice";

const CATEGORY_CHIPS = [
  { name: "All", icon: "✨" },
  { name: "Electronics", icon: "💻" },
  { name: "Home", icon: "🏡" },
  { name: "Fashion", icon: "👕" },
  { name: "Beauty", icon: "💄" },
  { name: "Sports", icon: "⚽" },
  { name: "Toys", icon: "🧸" },
  { name: "Books", icon: "📚" },
];

function HomeContent() {
  const dispatch = useDispatch();
  const router = useRouter();
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
        {/* Animated Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-card via-background to-card py-16 sm:py-24 border-b border-brand-light/30">
          {/* Animated floating orbs */}
          <div className="absolute top-10 left-[10%] w-64 h-64 bg-accent/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-60 animate-float-orb" style={{ animationDelay: "0s" }}></div>
          <div className="absolute top-40 right-[15%] w-72 h-72 bg-brand/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-60 animate-float-orb" style={{ animationDelay: "2s" }}></div>
          <div className="absolute -bottom-20 left-[40%] w-80 h-80 bg-accent/15 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-60 animate-float-orb" style={{ animationDelay: "4s" }}></div>

          <div className="relative max-w-6xl mx-auto px-6 text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent-dark font-semibold text-sm mb-6 shadow-sm border border-accent/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Over 500+ independent sellers joined
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-ink max-w-4xl mx-auto leading-tight tracking-tight">
              Support small businesses.<br />
              <span className="text-gradient">
                One effortless checkout.
              </span>
            </h1>
            
            <p className="mt-6 text-ink/60 max-w-xl mx-auto text-lg font-medium leading-relaxed">
              Every listing on Vendly comes from a different independent seller. Browse their unique collections and check out in a single cart.
            </p>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-10 text-ink/70">
              <div className="flex items-center gap-2 font-semibold text-sm">
                <div className="p-2 bg-card rounded-full shadow-sm border border-brand-light/50"><ShieldCheck size={18} className="text-brand" /></div>
                Secure Payments
              </div>
              <div className="flex items-center gap-2 font-semibold text-sm">
                <div className="p-2 bg-card rounded-full shadow-sm border border-brand-light/50"><Truck size={18} className="text-accent-dark" /></div>
                Fast Shipping
              </div>
              <div className="flex items-center gap-2 font-semibold text-sm">
                <div className="p-2 bg-card rounded-full shadow-sm border border-brand-light/50"><Users size={18} className="text-brand" /></div>
                Direct to Seller
              </div>
            </div>

            {/* Hero CTA Buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="#products"
                className="px-8 py-3.5 rounded-full bg-ink text-background font-bold text-sm hover:bg-brand-dark hover:text-white dark:hover:text-white transition-all shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
              >
                Shop Now
              </Link>
              <Link
                href="/deals"
                className="px-8 py-3.5 rounded-full bg-accent/10 border border-accent/30 text-accent-dark dark:text-accent font-bold text-sm hover:bg-accent hover:text-white dark:hover:text-white transition-all shadow-sm hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Zap size={15} className="fill-current" /> Browse Deals
              </Link>
            </div>
          </div>
        </section>

        {/* Categories & Search Feedback */}
        <section className="max-w-6xl mx-auto px-6 pt-10 pb-6 sticky top-[68px] z-20 bg-background/90 backdrop-blur-md">
          {initialQuery && (
            <div className="flex items-center gap-3 mb-6 bg-brand/5 p-4 rounded-2xl border border-brand-light/50 animate-pop-in">
              <div className="p-2 bg-white rounded-full shadow-sm"><Search size={16} className="text-brand" /></div>
              <p className="text-sm text-ink/70 font-medium">
                Showing results for <span className="font-bold text-ink">"{initialQuery}"</span>
              </p>
              <Link href="/" className="ml-auto text-sm font-bold text-accent hover:text-accent-dark transition-colors">
                Clear search
              </Link>
            </div>
          )}
          
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
            {CATEGORY_CHIPS.map((c) => (
              <button
                key={c.name}
                onClick={() => { setActiveCategory(c.name); setPage(1); }}
                className={`relative px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 snap-center flex items-center gap-2
                  ${activeCategory === c.name
                    ? "bg-ink text-background shadow-card-hover scale-105"
                    : "bg-card text-ink/70 border border-brand-light/70 hover:border-brand/30 hover:bg-card hover:shadow-sm"
                  }`}
              >
                <span>{c.icon}</span>
                {c.name}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section id="products" className="max-w-6xl mx-auto px-6 pb-20 pt-4">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-squircle bg-card border border-brand-light/50 overflow-hidden shadow-sm">
                  <div className="h-56 skeleton border-b border-brand-light/30"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 w-20 skeleton rounded-full"></div>
                    <div className="h-5 w-full skeleton rounded-md"></div>
                    <div className="h-4 w-1/2 skeleton rounded-md"></div>
                    <div className="flex justify-between items-end pt-2">
                      <div className="h-6 w-16 skeleton rounded-md"></div>
                      <div className="h-9 w-24 skeleton rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 bg-card rounded-3xl border border-brand-light/60 shadow-sm flex flex-col items-center animate-fade-up">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-ink mb-2">No products found</h3>
              <p className="text-ink/60 max-w-md mx-auto mb-6">
                We couldn't find anything matching your criteria. Try adjusting your search or selecting a different category.
              </p>
              <button onClick={() => { setActiveCategory("All"); }} className="px-6 py-2.5 rounded-full bg-ink text-white font-bold hover:bg-brand-dark transition-colors shadow-sm">
                View all products
              </button>
            </div>
          ) : (
            <div className="animate-fade-up">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} onAddToCart={() => handleAddToCart(p)} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-16 flex items-center justify-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-6 py-3 rounded-full border border-brand-light/80 bg-card hover:border-brand/40 hover:bg-card text-ink text-sm font-bold disabled:opacity-40 transition-all shadow-sm flex items-center gap-2"
                >
                  Previous
                </button>
                <div className="px-4 py-2 text-sm font-bold text-ink/60 bg-brand-light/20 rounded-full border border-brand-light/30">
                  Page {page}
                </div>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!hasMore}
                  className="px-8 py-3 rounded-full bg-ink hover:bg-brand-dark text-white text-sm font-bold disabled:opacity-40 transition-all shadow-md flex items-center gap-2"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center font-bold text-brand text-lg">Loading Vendly<span className="animate-pulse">...</span></div>}>
      <HomeContent />
    </Suspense>
  );
}

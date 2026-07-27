"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Heart, ShoppingCart, Search, LogOut, User, Hexagon } from "lucide-react";
import { useState, useEffect } from "react";
import CartBadge from "./CartBadge";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  useEffect(() => {
    // Safely get query params on client-side to avoid Next.js useSearchParams Suspense boundaries
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get("q") || "");
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/");
    }
  };

  return (
    <header className="bg-brand sticky top-0 z-20 shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Hexagon className="text-accent stroke-[2.5px] group-hover:scale-110 transition-transform" size={28} />
          <span className="text-[17px] font-extrabold text-white tracking-wider shrink-0 uppercase">
            Vendly<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] font-bold tracking-widest text-white uppercase">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <Link href="/about" className="hover:text-accent transition-colors">About</Link>
          <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
          {session?.user?.vendorId ? (
            <Link href="/vendor/dashboard" className="hover:text-accent transition-colors">Dashboard</Link>
          ) : (
            <Link href={session ? "/vendor/onboarding" : "/login?type=vendor"} className="hover:text-accent transition-colors">Sell</Link>
          )}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-3 sm:gap-5 text-white">
          <form 
            onSubmit={handleSearch}
            className={`flex items-center rounded-full transition-all duration-300 ease-in-out mr-2 sm:mr-4 ${isSearchExpanded ? 'bg-white/10 px-3 py-1 focus-within:ring-1 focus-within:ring-accent w-48 lg:w-64' : 'w-8 bg-transparent'}`}
          >
            {isSearchExpanded && (
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..." 
                className="bg-transparent border-none focus:outline-none text-white text-sm w-full placeholder-white/70"
                autoFocus
                onBlur={() => {
                  // Only collapse if empty, wait a tiny bit to allow button clicks to register
                  setTimeout(() => {
                    if (!query) setIsSearchExpanded(false);
                  }, 150);
                }}
              />
            )}
            <button 
              type={isSearchExpanded ? "submit" : "button"} 
              onClick={(e) => {
                if (!isSearchExpanded) {
                  e.preventDefault();
                  setIsSearchExpanded(true);
                }
              }}
              className="hover:text-accent transition-transform hover:scale-110 text-white cursor-pointer ml-auto shrink-0 flex items-center justify-center p-1"
            >
              <Search size={18} strokeWidth={isSearchExpanded ? 2 : 1.5} className="pointer-events-none" />
            </button>
          </form>

          <Link href="/wishlist" className="relative hover:text-accent transition-transform hover:scale-110">
            <Heart size={18} strokeWidth={1.5} />
            <div className="absolute top-[2px] right-[-2px] w-[5px] h-[5px] bg-accent rounded-full border border-brand border-[0.5px]"></div>
          </Link>
          
          <Link href="/cart" className="relative hover:text-accent transition-transform hover:scale-110 mr-2">
            <ShoppingCart size={18} strokeWidth={1.5} />
            <div className="absolute -top-2.5 -right-3">
              <CartBadge />
            </div>
          </Link>
          <ThemeToggle className="text-white hover:text-accent" />
          {session ? (
            <div className="relative group cursor-pointer flex items-center">
              <div className="hover:text-accent transition-transform hover:scale-110">
                <User size={18} strokeWidth={1.5} />
              </div>
              <div className="absolute right-0 top-full mt-2 w-40 bg-card border border-brand-light rounded-md shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-2 text-ink">
                  <Link href="/profile" className="px-4 py-2 text-sm hover:bg-brand/10 hover:text-brand transition-colors flex items-center gap-2"><User size={14} /> Profile</Link>
                  {session?.user?.role === "ADMIN" && (
                    <Link href="/admin" className="px-4 py-2 text-sm hover:bg-brand/10 hover:text-brand transition-colors flex items-center gap-2"><User size={14} /> Admin</Link>
                  )}
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full text-left px-4 py-2 text-sm hover:bg-brand/10 hover:text-brand transition-colors flex items-center gap-2"><LogOut size={14} /> Sign out</button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login" className="hover:text-accent transition-transform hover:scale-110">
              <User size={18} strokeWidth={1.5} />
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}

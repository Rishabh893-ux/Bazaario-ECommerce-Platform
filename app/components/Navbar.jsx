"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Heart, ShoppingCart, Search, LogOut, User } from "lucide-react";
import { useState } from "react";
import CartBadge from "./CartBadge";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ initialQuery = "" }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(query ? `/?q=${encodeURIComponent(query)}` : "/");
  };

  return (
    <header className="border-b border-brand-light bg-card/90 backdrop-blur sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex items-center gap-6">
        <Link href="/" className="text-xl font-extrabold text-ink shrink-0">
          Vendly<span className="text-accent">.</span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden sm:flex items-center relative">
          <Search size={15} className="absolute left-3 text-ink/30" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full pl-9 pr-3 py-2 text-sm rounded-full border border-brand-light focus:outline-none focus:ring-2 focus:ring-brand bg-background"
          />
        </form>

        <nav className="ml-auto flex items-center gap-4 text-sm font-medium text-ink/60">
          <Link href="/" className="hidden md:inline hover:text-brand font-bold px-2 py-1 text-[13px] rounded-full hover:bg-brand/10 transition-colors">Home</Link>
          <Link href="/about" className="hidden md:inline hover:text-brand px-2 py-1 text-[13px] rounded-full hover:bg-brand/10 transition-colors">About</Link>
          <Link href="/contact" className="hidden md:inline hover:text-brand px-2 py-1 text-[13px] rounded-full hover:bg-brand/10 transition-colors">Contact</Link>
          
          {/* Dynamic Dashboard/Sell Link */}
          {session?.user?.vendorId ? (
            <Link href="/vendor/dashboard" className="hidden md:inline hover:text-brand px-2 py-1 text-[13px] rounded-full hover:bg-brand/10 transition-colors">Dashboard</Link>
          ) : (
            <Link href={session ? "/vendor/onboarding" : "/login?type=vendor"} className="hidden md:inline hover:text-brand px-2 py-1 text-[13px] rounded-full hover:bg-brand/10 transition-colors">Sell</Link>
          )}

          {session && <Link href="/orders" className="hover:text-brand px-2 py-1 text-[13px] rounded-full hover:bg-brand/10 transition-colors">Orders</Link>}
          <Link href="/wishlist" className="relative p-2 bg-brand/5 rounded-full text-brand hover:bg-brand hover:text-white transition-all shadow-sm hover:shadow-brand/20 hover:-translate-y-0.5">
            <Heart size={16} />
          </Link>
          <Link href="/cart" className="relative p-2 flex items-center justify-center bg-brand/5 rounded-full text-brand hover:bg-brand hover:text-white transition-all shadow-sm hover:shadow-brand/20 hover:-translate-y-0.5 mr-2">
            <ShoppingCart size={16} />
            <div className="absolute -top-1 -right-1">
              <CartBadge />
            </div>
          </Link>
          <ThemeToggle />
          {session ? (
            <div className="relative group cursor-pointer flex items-center">
              <div className="hover:text-brand transition-transform hover:scale-110 p-1">
                <User size={18} />
              </div>
              <div className="absolute right-0 top-full mt-1 w-36 bg-card border border-brand-light rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="py-1">
                  <Link
                    href="/profile"
                    className="w-full text-left px-4 py-2 text-sm text-ink hover:bg-brand hover:text-white transition-colors flex items-center gap-2"
                  >
                    <User size={14} />
                    Profile
                  </Link>
                  {session?.user?.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="w-full text-left px-4 py-2 text-sm text-ink hover:bg-brand hover:text-white transition-colors flex items-center gap-2"
                    >
                      <User size={14} />
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={() => signOut({ callbackUrl: "/" })} 
                    className="w-full text-left px-4 py-2 text-sm text-ink hover:bg-brand hover:text-white transition-colors flex items-center gap-2"
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login" className="px-5 py-2 rounded-full bg-gradient-to-r from-brand to-brand-dark text-white font-bold hover:shadow-lg hover:shadow-brand/30 hover:-translate-y-0.5 transition-all">Log in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

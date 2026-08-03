"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Heart, ShoppingCart, Search, LogOut, User, Hexagon,
  Menu, X, LayoutDashboard, ShieldCheck, ChevronDown
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import CartBadge from "./CartBadge";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setQuery(params.get("q") || "");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/");
    }
    setIsSearchExpanded(false);
  };

  const isActive = (href) => pathname === href;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/deals", label: "Deals" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/help", label: "Help" },
    { href: "/contact", label: "Contact" },
    session?.user?.vendorId
      ? { href: "/vendor/dashboard", label: "Dashboard" }
      : { href: session ? "/vendor/onboarding" : "/login?type=vendor", label: "Sell" },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-30 transition-all duration-300 ${
          scrolled
            ? "bg-brand/95 backdrop-blur-md shadow-xl shadow-brand-dark/20"
            : "bg-brand shadow-md"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <Hexagon
              className="text-accent stroke-[2.5px] group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
              size={26}
            />
            <span className="text-[17px] font-black text-white tracking-wider uppercase">
              Vendly<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-[11px] font-bold tracking-widest text-white/80 uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors duration-200 hover:text-accent group ${
                  isActive(link.href) ? "text-accent" : ""
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-accent transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-2 sm:gap-3 text-white">

            {/* Search */}
            <form
              onSubmit={handleSearch}
              ref={searchRef}
              className={`flex items-center rounded-full transition-all duration-300 ease-in-out ${
                isSearchExpanded
                  ? "bg-white/15 backdrop-blur-sm px-3 py-1.5 ring-1 ring-accent/50 w-44 sm:w-56"
                  : "w-8 bg-transparent"
              }`}
            >
              {isSearchExpanded && (
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="bg-transparent border-none focus:outline-none text-white text-sm w-full placeholder-white/50 font-medium"
                  autoFocus
                  onBlur={() => {
                    setTimeout(() => { if (!query) setIsSearchExpanded(false); }, 200);
                  }}
                />
              )}
              <button
                type={isSearchExpanded ? "submit" : "button"}
                onClick={(e) => {
                  if (!isSearchExpanded) { e.preventDefault(); setIsSearchExpanded(true); }
                }}
                className="hover:text-accent transition-all hover:scale-110 cursor-pointer ml-auto shrink-0 flex items-center justify-center p-1"
                aria-label="Search"
              >
                <Search size={17} strokeWidth={isSearchExpanded ? 2 : 1.8} className="pointer-events-none" />
              </button>
            </form>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-1.5 hover:text-accent transition-all hover:scale-110 rounded-full hover:bg-white/10"
              aria-label="Wishlist"
            >
              <Heart size={17} strokeWidth={1.8} />
              <div className="absolute top-1 right-1 w-[5px] h-[5px] bg-accent rounded-full border border-brand" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-1.5 hover:text-accent transition-all hover:scale-110 rounded-full hover:bg-white/10"
              aria-label="Cart"
            >
              <ShoppingCart size={17} strokeWidth={1.8} />
              <div className="absolute -top-1.5 -right-1.5">
                <CartBadge />
              </div>
            </Link>

            {/* Theme Toggle */}
            <ThemeToggle className="text-white/70 hover:text-accent" />

            {/* User menu — desktop */}
            <div className="hidden sm:block relative" ref={userMenuRef}>
              {session ? (
                <>
                  <button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    className="flex items-center gap-1.5 p-1.5 hover:text-accent transition-all hover:scale-105 rounded-full hover:bg-white/10"
                    aria-label="User menu"
                  >
                    <User size={17} strokeWidth={1.8} />
                    <ChevronDown
                      size={12}
                      className={`transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2.5 w-48 bg-card border border-brand-light rounded-2xl shadow-card-hover overflow-hidden animate-fade-up z-40">
                      <div className="px-4 py-3 border-b border-brand-light/50">
                        <p className="text-xs font-semibold text-ink/50 uppercase tracking-wider">Account</p>
                        <p className="text-sm font-bold text-ink mt-0.5 truncate">{session.user?.name || session.user?.email}</p>
                      </div>
                      <div className="py-1.5 text-ink">
                        <Link
                          href="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="px-4 py-2.5 text-sm hover:bg-brand/8 hover:text-brand transition-colors flex items-center gap-2.5 font-medium"
                        >
                          <User size={14} className="text-brand/60" /> Profile
                        </Link>
                        <Link
                          href="/orders"
                          onClick={() => setUserMenuOpen(false)}
                          className="px-4 py-2.5 text-sm hover:bg-brand/8 hover:text-brand transition-colors flex items-center gap-2.5 font-medium"
                        >
                          <ShoppingCart size={14} className="text-brand/60" /> My Orders
                        </Link>
                        {session?.user?.vendorId && (
                          <Link
                            href="/vendor/dashboard"
                            onClick={() => setUserMenuOpen(false)}
                            className="px-4 py-2.5 text-sm hover:bg-brand/8 hover:text-brand transition-colors flex items-center gap-2.5 font-medium"
                          >
                            <LayoutDashboard size={14} className="text-brand/60" /> Dashboard
                          </Link>
                        )}
                        {session?.user?.role === "ADMIN" && (
                          <Link
                            href="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="px-4 py-2.5 text-sm hover:bg-brand/8 hover:text-brand transition-colors flex items-center gap-2.5 font-medium"
                          >
                            <ShieldCheck size={14} className="text-brand/60" /> Admin
                          </Link>
                        )}
                        <div className="my-1 mx-3 h-px bg-brand-light/40" />
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-colors flex items-center gap-2.5 font-medium"
                        >
                          <LogOut size={14} /> Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent/20 hover:bg-accent/30 text-white text-xs font-bold tracking-wider uppercase transition-all hover:scale-105"
                >
                  Sign in
                </Link>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-1.5 hover:text-accent transition-all hover:bg-white/10 rounded-full"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-brand-dark/95 backdrop-blur-md border-t border-white/10 px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-accent/20 text-accent"
                    : "text-white/80 hover:text-accent hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/80 hover:text-accent hover:bg-white/10 transition-all"
                >
                  <User size={16} /> Profile
                </Link>
                <Link
                  href="/orders"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/80 hover:text-accent hover:bg-white/10 transition-all"
                >
                  <ShoppingCart size={16} /> My Orders
                </Link>
                {session?.user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/80 hover:text-accent hover:bg-white/10 transition-all"
                  >
                    <ShieldCheck size={16} /> Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </>
            ) : (
              <div className="flex gap-3 px-2 pt-1">
                <Link
                  href="/login"
                  className="flex-1 text-center py-3 rounded-xl bg-accent/20 text-accent text-sm font-bold hover:bg-accent/30 transition-all"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="flex-1 text-center py-3 rounded-xl bg-accent text-brand-dark text-sm font-bold hover:bg-accent-dark transition-all"
                >
                  Join free
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

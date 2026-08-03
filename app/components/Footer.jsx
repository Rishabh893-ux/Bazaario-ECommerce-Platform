"use client";

import Link from "next/link";
import { Twitter, Instagram, Facebook, Mail, MapPin, Hexagon, ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useToast } from "./Toast";

export default function Footer() {
  const { data: session } = useSession();
  const isVendor = !!session?.user?.vendorId;
  const showToast = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      showToast("Thanks for subscribing to our newsletter!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-card border-t border-brand/10 pt-20 pb-8 relative overflow-hidden mt-auto">
      {/* Subtle ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Newsletter Section */}
        <div className="mb-16 bg-brand-dark rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-brand-dark/20 animate-fade-up">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
          <div className="relative z-10 md:max-w-md">
            <h3 className="text-2xl font-black text-white mb-2">Join the Vendly Insider</h3>
            <p className="text-white/70 text-sm font-medium">Get exclusive deals, new vendor alerts, and platform updates delivered straight to your inbox.</p>
          </div>
          <form onSubmit={handleSubscribe} className="relative z-10 w-full md:w-auto flex-1 max-w-md flex gap-2">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address" 
              required
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent transition-all text-sm font-medium"
            />
            <button type="submit" className="px-6 py-3.5 rounded-full bg-accent hover:bg-accent-dark text-brand-dark font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group inline-flex mb-5">
              <Hexagon className="text-accent stroke-[2.5px] group-hover:rotate-12 transition-transform duration-300" size={28} />
              <span className="text-2xl font-black text-ink tracking-wider uppercase">
                Vendly<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-ink/60 leading-relaxed text-sm font-medium mb-6 max-w-xs">
              Independent sellers, one unified storefront. Discover amazing products and support small businesses directly.
            </p>
            <div className="flex items-center gap-4 text-ink/40">
              <a href="#" className="p-2.5 rounded-full bg-brand-light/20 hover:bg-[#1DA1F2] hover:text-white transition-all duration-300 hover:-translate-y-1"><Twitter size={18} /></a>
              <a href="#" className="p-2.5 rounded-full bg-brand-light/20 hover:bg-[#E1306C] hover:text-white transition-all duration-300 hover:-translate-y-1"><Instagram size={18} /></a>
              <a href="#" className="p-2.5 rounded-full bg-brand-light/20 hover:bg-[#4267B2] hover:text-white transition-all duration-300 hover:-translate-y-1"><Facebook size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-ink mb-6 text-sm uppercase tracking-widest">Shop</h4>
            <ul className="space-y-3.5 text-sm font-medium text-ink/60">
              <li><Link href="/" className="animated-link hover:text-brand dark:hover:text-white">Browse Catalog</Link></li>
              <li><Link href="/deals" className="animated-link hover:text-brand dark:hover:text-white">Flash Deals</Link></li>
              <li><Link href="/blog" className="animated-link hover:text-brand dark:hover:text-white">Journal & Blog</Link></li>
              <li><Link href="/help" className="animated-link hover:text-brand dark:hover:text-white">Help Center</Link></li>
              <li><Link href="/orders" className="animated-link hover:text-brand dark:hover:text-white">Track an Order</Link></li>
              <li><Link href="/wishlist" className="animated-link hover:text-brand dark:hover:text-white">My Wishlist</Link></li>
              <li><Link href="/cart" className="animated-link hover:text-brand dark:hover:text-white">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h4 className="font-black text-ink mb-6 text-sm uppercase tracking-widest">Sell</h4>
            <ul className="space-y-3.5 text-sm font-medium text-ink/60">
              {isVendor ? (
                <li><Link href="/vendor/dashboard" className="animated-link hover:text-brand dark:hover:text-white">Vendor Dashboard</Link></li>
              ) : (
                <li><Link href="/vendor/onboarding" className="animated-link hover:text-brand dark:hover:text-white">Become a Vendor</Link></li>
              )}
              <li><Link href="/vendor/policies" className="animated-link hover:text-brand dark:hover:text-white">Seller Policies</Link></li>
              <li><Link href="/vendor/help" className="animated-link hover:text-brand dark:hover:text-white">Seller Help Center</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-ink mb-6 text-sm uppercase tracking-widest">Contact</h4>
            <ul className="space-y-4 text-sm font-medium text-ink/60">
              <li className="flex items-start gap-3">
                <div className="p-1.5 bg-brand-light/30 rounded-md text-brand shrink-0"><MapPin size={14} /></div>
                <span>123 Market Street, Suite 400<br />San Francisco, CA 94105</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-1.5 bg-brand-light/30 rounded-md text-brand shrink-0"><Mail size={14} /></div>
                <a href="mailto:support@vendly.com" className="animated-link hover:text-brand dark:hover:text-white">support@vendly.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-light/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-ink/40">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Vendly Inc. — By Rishabh Kasaudhan.<br />
            All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-ink transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-ink transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

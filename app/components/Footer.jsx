"use client";

import Link from "next/link";
import { Twitter, Instagram, Facebook, Mail, MapPin } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Footer() {
  const { data: session } = useSession();
  const isVendor = !!session?.user?.vendorId;

  return (
    <footer className="bg-card border-t border-brand/10 pt-16 pb-8 relative overflow-hidden mt-20">
      {/* Subtle ambient light */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-extrabold text-ink inline-block mb-4 hover:text-brand transition-colors">
              Vendly<span className="text-brand">.</span>
            </Link>
            <p className="text-ink/60 leading-relaxed text-sm mb-6 max-w-xs">
              Independent sellers, one unified storefront. Discover amazing products and support small businesses directly.
            </p>
            <div className="flex items-center gap-4 text-ink/40">
              <a href="#" className="hover:text-brand transition-transform hover:-translate-y-1"><Twitter size={20} /></a>
              <a href="#" className="hover:text-brand transition-transform hover:-translate-y-1"><Instagram size={20} /></a>
              <a href="#" className="hover:text-brand transition-transform hover:-translate-y-1"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-ink mb-5 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm text-ink/60">
              <li><Link href="/" className="hover:text-brand transition-colors hover:translate-x-1 inline-block">Browse Catalog</Link></li>
              <li><Link href="/orders" className="hover:text-brand transition-colors hover:translate-x-1 inline-block">Track an Order</Link></li>
              <li><Link href="/wishlist" className="hover:text-brand transition-colors hover:translate-x-1 inline-block">My Wishlist</Link></li>
              <li><Link href="/cart" className="hover:text-brand transition-colors hover:translate-x-1 inline-block">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h4 className="font-bold text-ink mb-5 text-sm uppercase tracking-wider">Sell</h4>
            <ul className="space-y-3 text-sm text-ink/60">
              {isVendor ? (
                <li><Link href="/vendor/dashboard" className="hover:text-brand transition-colors hover:translate-x-1 inline-block">Vendor Dashboard</Link></li>
              ) : (
                <li><Link href="/vendor/onboarding" className="hover:text-brand transition-colors hover:translate-x-1 inline-block">Become a Vendor</Link></li>
              )}
              <li><Link href="/vendor/policies" className="hover:text-brand transition-colors hover:translate-x-1 inline-block">Seller Policies</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-ink mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-ink/60">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand shrink-0 mt-0.5" />
                <span>123 Market Street, Suite 400<br />San Francisco, CA 94105</span>
              </li>
              <li className="flex items-center gap-3 mt-2">
                <Mail size={16} className="text-brand shrink-0" />
                <a href="mailto:support@vendly.com" className="hover:text-brand transition-colors">support@vendly.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink/40">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Vendly Inc. — By Rishabh Kasaudhan.<br />
            All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

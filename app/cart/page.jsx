"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import { Minus, Plus, X, ShoppingCart, CheckCircle2, ArrowLeft, Ticket } from "lucide-react";
import Link from "next/link";
import {
  selectCartItems,
  selectCartSubtotal,
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
} from "@/lib/features/cart/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);

  useEffect(() => {
    if (success) {
      dispatch(clearCart());
    }
  }, [success, dispatch]);

  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  const applyCoupon = async () => {
    setCouponError("");
    if (!couponCode) return;
    const vendorId = items[0]?.vendorId;
    const res = await fetch("/api/cart/coupon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: couponCode, subtotal, vendorId }),
    });
    const data = await res.json();
    if (!res.ok) {
      setCoupon(null);
      setCouponError(data.error ?? "Invalid coupon");
      return;
    }
    setCoupon(data);
  };

  const total = coupon ? coupon.total : subtotal;

  return (
    <main className="min-h-screen bg-background px-4 sm:px-6 py-10 max-w-6xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-ink tracking-tight">Your Cart</h1>
        {!success && items.length > 0 && (
          <span className="bg-ink text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        )}
      </div>

      {success ? (
        <div className="text-center py-24 sm:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-900/10 dark:to-background rounded-[2.5rem] border border-green-200/60 shadow-lg flex flex-col items-center animate-pop-in relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
          
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-8 shadow-[0_0_60px_rgba(34,197,94,0.4)] animate-pulse">
            <CheckCircle2 size={48} className="text-green-600 drop-shadow-md" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-ink mb-4 tracking-tight">Payment Successful!</h2>
          <p className="text-ink/60 mb-10 max-w-md text-lg font-medium">
            Thank you for your purchase. Your order has been placed and is being processed by the sellers.
          </p>
          <Link href="/" className="px-8 py-4 rounded-full bg-ink text-white font-bold hover:bg-brand-dark transition-all shadow-md hover:shadow-xl hover:-translate-y-1 relative z-10 flex items-center gap-2">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-24 sm:py-32 bg-card rounded-[2.5rem] border border-brand-light/60 shadow-sm flex flex-col items-center">
          <div className="h-28 w-28 bg-brand-light/40 rounded-full flex items-center justify-center mb-8 relative">
            <ShoppingCart size={48} className="text-brand/40 absolute" />
            <div className="absolute -top-2 -right-2 h-8 w-8 bg-card rounded-full border border-brand-light flex items-center justify-center">
              <span className="text-brand font-bold text-xs">0</span>
            </div>
          </div>
          <h2 className="text-2xl font-black text-ink mb-3">Your cart is feeling lonely</h2>
          <p className="text-ink/50 mb-10 max-w-sm font-medium">
            Looks like you haven't added anything yet. Discover our top vendors and find something you love!
          </p>
          <Link href="/" className="px-8 py-4 rounded-full bg-ink text-white font-bold hover:bg-brand-dark transition-all shadow-md hover:shadow-xl hover:-translate-y-1">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b border-brand-light text-xs font-bold text-ink/40 uppercase tracking-wider px-2">
              <div className="col-span-6">Product</div>
              <div className="col-span-3 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-card border border-brand-light/60 hover:border-brand-light rounded-3xl p-4 sm:p-5 transition-all shadow-sm hover:shadow-md">
                  
                  {/* Remove Button (Mobile top-right, Desktop absolute) */}
                  <button 
                    onClick={() => dispatch(removeItem(item.productId))} 
                    className="absolute top-4 right-4 sm:top-auto sm:-right-3 sm:-translate-y-0 sm:opacity-0 group-hover:opacity-100 sm:translate-x-2 group-hover:translate-x-0 h-8 w-8 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-all z-10 shadow-sm"
                    aria-label="Remove item"
                  >
                    <X size={14} strokeWidth={2.5} />
                  </button>

                  {/* Image & Product Info (Col 1) */}
                  <div className="flex items-center gap-4 sm:w-1/2 min-w-0 pr-8 sm:pr-0">
                    <Link href={`/product/${item.productId}`} className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-white border border-brand-light/40 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="h-full w-full object-contain p-2 mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="h-10 w-10 rounded-xl bg-brand/5" />
                      )}
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-wider text-accent-dark font-black mb-1 truncate">{item.vendorName}</p>
                      <Link href={`/product/${item.productId}`} className="font-bold text-ink text-sm sm:text-base line-clamp-2 hover:text-brand transition-colors mb-1">
                        {item.name}
                      </Link>
                      <p className="text-sm font-semibold text-ink/60">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-1/2 pt-3 sm:pt-0 border-t border-brand-light/30 sm:border-0">
                    {/* Quantity (Col 2) */}
                    <div className="flex items-center gap-1 bg-background border border-brand-light/60 p-1 rounded-full shadow-inner">
                      <button onClick={() => dispatch(decrementItem(item.productId))} className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-card flex items-center justify-center text-ink/60 hover:text-ink transition-colors shadow-sm">
                        <Minus size={14} strokeWidth={2.5} />
                      </button>
                      <span className="w-6 sm:w-8 text-center text-sm font-bold text-ink">{item.quantity}</span>
                      <button onClick={() => dispatch(incrementItem(item.productId))} className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-card flex items-center justify-center text-ink/60 hover:text-ink transition-colors shadow-sm">
                        <Plus size={14} strokeWidth={2.5} />
                      </button>
                    </div>

                    {/* Line Total (Col 3) */}
                    <div className="text-right sm:flex-1 pr-2">
                      <p className="text-base sm:text-lg font-black text-ink">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:sticky lg:top-[100px] h-fit animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-card border border-brand-light/60 rounded-[2rem] p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-black text-ink mb-6">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-6 group">
                <label className="text-xs font-bold text-ink/50 uppercase tracking-wider mb-2 block">Promo Code</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/30 group-focus-within:text-brand transition-colors" />
                    <input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="w-full pl-10 pr-4 py-3 text-sm font-medium rounded-xl border border-brand-light bg-background focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all uppercase placeholder:normal-case"
                    />
                  </div>
                  <button onClick={applyCoupon} className="px-5 py-3 text-sm font-bold rounded-xl bg-brand/5 hover:bg-brand/10 text-brand transition-colors">
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-xs text-red-500 mt-2 font-semibold flex items-center gap-1"><X size={12}/> {couponError}</p>}
                {coupon && (
                  <div className="mt-3 bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-xl border border-green-200/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-sm font-bold">
                      <CheckCircle2 size={16} /> Code applied
                    </div>
                    <span className="text-green-700 dark:text-green-400 font-black">-${coupon.discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="h-px bg-brand-light/50 my-6" />

              {/* Totals */}
              <div className="space-y-3.5 mb-8">
                <div className="flex justify-between text-sm font-medium text-ink/70">
                  <span>Subtotal</span>
                  <span className="font-bold text-ink">${subtotal.toFixed(2)}</span>
                </div>
                
                {coupon && (
                  <div className="flex justify-between text-sm font-bold text-green-600">
                    <span>Discount</span>
                    <span>-${coupon.discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm font-medium text-ink/70">
                  <span>Shipping</span>
                  <span className="italic text-ink/50 text-xs mt-0.5">Calculated at checkout</span>
                </div>
                
                <div className="flex justify-between font-black text-ink text-2xl pt-4 border-t border-brand-light/50">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push(`/checkout${coupon ? `?coupon=${coupon.code}` : ""}`)}
                className="w-full py-4 rounded-xl bg-ink hover:bg-brand-dark text-white font-bold text-base transition-all shadow-[0_8px_20px_-6px_rgba(15,23,42,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Checkout securely
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-ink/40">
                <ShieldCheck size={14} /> Secure SSL encrypted payment
              </div>

              {/* Continue Shopping Link */}
              <div className="mt-6 text-center">
                <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:text-accent-dark transition-colors animated-link pb-0.5">
                  <ArrowLeft size={14} /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

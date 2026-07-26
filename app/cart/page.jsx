"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useRouter } from "next/navigation";
import { Minus, Plus, X, ShoppingCart, CheckCircle2 } from "lucide-react";
import {
  selectCartItems,
  selectCartSubtotal,
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
} from "@/lib/features/cart/cartSlice";
import { useEffect } from "react";

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
    const vendorId = items[0]?.vendorId; // single-vendor coupon scoping, if applicable
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
    <main className="min-h-screen bg-background px-6 py-12 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-10">
        <h1 className="text-3xl font-extrabold text-ink tracking-tight">Your Cart</h1>
        {!success && items.length > 0 && (
          <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-sm font-semibold">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        )}
      </div>

      {success ? (
        <div className="text-center py-32 bg-card rounded-3xl border border-green-200 shadow-sm flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-ink mb-3 tracking-tight">Payment Successful!</h2>
          <p className="text-ink/60 mb-8 max-w-md text-lg">
            Thank you for your purchase. We've emptied your cart and are preparing your items for shipment.
          </p>
          <button onClick={() => router.push("/")} className="px-8 py-3.5 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
            Continue Shopping
          </button>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-32 bg-card rounded-3xl border border-brand-light shadow-sm flex flex-col items-center">
          <div className="h-24 w-24 bg-brand-light/50 rounded-full flex items-center justify-center mb-6">
            <ShoppingCart size={40} className="text-brand/40" />
          </div>
          <h2 className="text-xl font-bold text-ink mb-2">Your cart is feeling lonely</h2>
          <p className="text-ink/50 mb-8 max-w-sm">
            Looks like you haven't added anything yet. Discover our top vendors and find something you love!
          </p>
          <button onClick={() => router.push("/")} className="px-8 py-3.5 rounded-full bg-brand text-white font-semibold hover:bg-brand-dark transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-5">
            {items.map((item) => (
              <div key={item.productId} className="group flex items-center gap-5 bg-card border border-brand-light/60 hover:border-brand-light rounded-3xl p-5 transition-all shadow-sm hover:shadow-md">
                <div className="h-24 w-24 rounded-2xl bg-brand-light/30 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="h-12 w-12 rounded-xl bg-card/60" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] uppercase tracking-wider text-brand font-bold mb-1">{item.vendorName}</p>
                  <p className="font-semibold text-ink text-base truncate mb-1">{item.name}</p>
                  <p className="text-lg font-bold text-ink/80">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-1 bg-background border border-brand-light/60 p-1 rounded-full">
                    <button onClick={() => dispatch(decrementItem(item.productId))} className="h-8 w-8 rounded-full hover:bg-card flex items-center justify-center text-ink/60 hover:text-ink transition-colors shadow-sm">
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => dispatch(incrementItem(item.productId))} className="h-8 w-8 rounded-full hover:bg-card flex items-center justify-center text-ink/60 hover:text-ink transition-colors shadow-sm">
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <button onClick={() => dispatch(removeItem(item.productId))} className="text-ink/30 hover:text-red-500 bg-red-50/0 hover:bg-red-50 h-10 w-10 flex items-center justify-center rounded-full transition-colors" aria-label="Remove item">
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card border border-brand-light/60 rounded-3xl p-7 shadow-sm">
              <h2 className="text-lg font-extrabold text-ink mb-6">Order Summary</h2>

              <div className="flex gap-2 mb-6">
                <input
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Promo code"
                  className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-brand-light bg-background focus:bg-card focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all"
                />
                <button onClick={applyCoupon} className="px-5 py-2.5 text-sm font-bold rounded-xl bg-ink/5 hover:bg-ink/10 text-ink transition-colors">
                  Apply
                </button>
              </div>
              {couponError && <p className="text-xs text-red-600 mb-4 font-medium">{couponError}</p>}
              {coupon && <p className="text-xs text-green-600 mb-4 font-medium bg-green-50 px-3 py-2 rounded-lg border border-green-100 flex items-center gap-2">Coupon applied: -${coupon.discount.toFixed(2)}</p>}

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-ink/60 font-medium">
                  <span>Subtotal</span>
                  <span className="text-ink">${subtotal.toFixed(2)}</span>
                </div>
                {coupon && (
                  <div className="flex justify-between text-sm font-semibold text-green-600">
                    <span>Discount</span>
                    <span>-${coupon.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-ink/60 font-medium pb-4 border-b border-brand-light/50">
                  <span>Shipping</span>
                  <span className="text-ink">Calculated at checkout</span>
                </div>
                
                <div className="flex justify-between font-extrabold text-ink text-xl pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => router.push(`/checkout${coupon ? `?coupon=${coupon.code}` : ""}`)}
                className="w-full py-4 rounded-full bg-brand hover:bg-brand-dark text-white font-bold text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Checkout securely
              </button>
              
              <p className="mt-4 text-center text-xs font-medium text-ink/40 flex items-center justify-center gap-1.5">
                🔒 Secure SSL encrypted payment
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

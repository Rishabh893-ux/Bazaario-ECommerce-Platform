"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { selectCartItems } from "@/lib/features/cart/cartSlice";

export default function CheckoutPage() {
  const items = useSelector(selectCartItems);
  const searchParams = useSearchParams();
  const couponCode = searchParams.get("coupon") ?? null;

  const [form, setForm] = useState({ line1: "", city: "", state: "", postalCode: "", country: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        couponCode,
        shippingAddress: form,
      }),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = { error: "An unexpected server error occurred." };
    }

    if (!res.ok) {
      setLoading(false);
      setError(data.error ?? "Checkout failed");
      return;
    }

    if (data.url) {
      window.location.href = data.url;
    } else {
      setLoading(false);
      setError("No checkout URL returned from server.");
    }
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center text-ink/50">
        Your cart is empty. <a href="/" className="text-brand font-medium ml-1">Go shopping</a>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-extrabold text-ink mb-6">Shipping details</h1>

      {error && <p className="mb-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-card border border-brand-light rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-xs font-semibold text-ink/60">Address line</label>
          <input required value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-brand-light" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-ink/60">City</label>
            <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-brand-light" />
          </div>
          <div>
            <label className="text-xs font-semibold text-ink/60">State</label>
            <input required value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-brand-light" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-ink/60">Postal code</label>
            <input required value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-brand-light" />
          </div>
          <div>
            <label className="text-xs font-semibold text-ink/60">Country</label>
            <input required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-brand-light" />
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3 rounded-full bg-brand hover:bg-brand-dark disabled:opacity-60 text-white font-semibold">
          {loading ? "Processing…" : "Continue to payment"}
        </button>
        <p className="text-xs text-ink/40 text-center">You'll be redirected to Stripe to complete payment securely.</p>
      </form>
    </main>
  );
}

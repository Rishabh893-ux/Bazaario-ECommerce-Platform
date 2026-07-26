"use client";

import { useEffect, useState } from "react";

const STATUS_OPTIONS = ["PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];
const STATUS_COLORS = {
  PROCESSING: "bg-accent/15 text-accent",
  SHIPPED: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function VendorOrdersPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("/api/vendor/orders").then((r) => r.json()).then(setItems).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const updateStatus = async (orderItemId, status) => {
    setItems((prev) => prev.map((i) => (i.id === orderItemId ? { ...i, status } : i)));
    await fetch("/api/vendor/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderItemId, status }),
    });
  };

  return (
    <main className="min-h-screen bg-background px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold text-ink mb-6">Orders to fulfill</h1>

      {loading ? (
        <p className="text-ink/40 text-sm">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-ink/40 text-sm">No paid orders yet.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-card border border-brand-light rounded-2xl p-4">
              <div className="min-w-0">
                <p className="font-semibold text-ink text-sm truncate">{item.product.name} × {item.quantity}</p>
                <p className="text-xs text-ink/50">
                  Order #{item.order.id.slice(-8)} · {item.order.user?.name}
                </p>
              </div>
              <select
                value={item.status}
                onChange={(e) => updateStatus(item.id, e.target.value)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border-0 ${STATUS_COLORS[item.status]}`}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

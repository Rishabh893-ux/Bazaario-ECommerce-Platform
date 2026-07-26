"use client";

import { useEffect, useState } from "react";
import { Package, TrendingUp, AlertTriangle, ShoppingBag } from "lucide-react";

function StatCard({ icon: Icon, label, value, tint }) {
  return (
    <div className="rounded-2xl bg-card border border-brand-light p-5 flex items-center gap-4">
      <div
        className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: tint }}
      >
        <Icon size={20} className="text-brand" />
      </div>
      <div>
        <p className="text-xs text-ink/50 font-medium">{label}</p>
        <p className="text-xl font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}

export default function VendorDashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/vendor/dashboard")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return <div className="p-10 text-ink/50">Loading your dashboard…</div>;
  }

  const days = Object.entries(data.revenueByDay ?? {}).sort();
  const maxRevenue = Math.max(...days.map(([, v]) => v), 1);

  return (
    <main className="min-h-screen bg-background px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-extrabold text-ink">Your store, at a glance</h1>
      <p className="text-ink/50 text-sm mt-1">
        Figures below are scoped to your store only.
      </p>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Total revenue" value={`$${data.totalRevenue}`} tint="#EEF2FF" />
        <StatCard icon={ShoppingBag} label="Units sold" value={data.totalUnitsSold} tint="#FEF3C7" />
        <StatCard icon={Package} label="Listed products" value={data.productCount} tint="#DCFCE7" />
        <StatCard icon={AlertTriangle} label="Low stock items" value={data.lowStockProducts?.length ?? 0} tint="#FCE7F3" />
      </div>

      <div className="mt-8 rounded-2xl bg-card border border-brand-light p-6">
        <h2 className="font-bold text-ink mb-4">Revenue by day</h2>
        {days.length === 0 ? (
          <p className="text-sm text-ink/40">No paid orders yet.</p>
        ) : (
          <div className="flex items-end gap-2 h-40">
            {days.map(([day, revenue]) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-md bg-brand"
                  style={{ height: `${Math.max((revenue / maxRevenue) * 100, 4)}%` }}
                  title={`$${revenue.toFixed(2)}`}
                />
                <span className="text-[10px] text-ink/40">{day.slice(5)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {data.lowStockProducts?.length > 0 && (
        <div className="mt-6 rounded-2xl bg-accent/10 border border-accent/30 p-5">
          <h2 className="font-bold text-ink mb-2 flex items-center gap-2">
            <AlertTriangle size={16} className="text-accent" /> Running low
          </h2>
          <ul className="text-sm text-ink/70 space-y-1">
            {data.lowStockProducts.map((p) => (
              <li key={p.id}>{p.name} — {p.stockCount} left</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

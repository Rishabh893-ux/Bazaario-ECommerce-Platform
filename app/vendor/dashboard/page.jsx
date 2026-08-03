"use client";

import { useEffect, useState } from "react";
import { Package, TrendingUp, AlertTriangle, ShoppingBag, Plus, List, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

function StatCard({ icon: Icon, label, value, tint, trend, highlightClass }) {
  return (
    <div className="rounded-[1.5rem] bg-card border border-brand-light/70 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${highlightClass}`}
          style={{ backgroundColor: tint }}
        >
          <Icon size={24} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <ArrowUpRight size={14} /> {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-ink/60 font-semibold mb-1 uppercase tracking-wider">{label}</p>
        <p className="text-3xl font-black text-ink">{value}</p>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-brand-light p-3 rounded-xl shadow-lg">
        <p className="text-sm font-semibold text-ink mb-1">{label}</p>
        <p className="text-lg font-black text-brand">
          ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

export default function VendorDashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/vendor/dashboard")
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-background px-4 sm:px-6 py-10 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-64 bg-card rounded-md"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-36 bg-card rounded-[1.5rem] border border-brand-light/50"></div>)}
          </div>
          <div className="h-96 bg-card rounded-[2rem] border border-brand-light/50"></div>
        </div>
      </main>
    );
  }

  const days = Object.entries(data.revenueByDay ?? {}).sort();
  const chartData = days.map(([day, revenue]) => ({
    name: day.slice(5), // MM-DD
    revenue: revenue,
  }));

  return (
    <main className="min-h-screen bg-background px-4 sm:px-6 py-10 max-w-6xl mx-auto animate-fade-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-ink tracking-tight">Store Overview</h1>
          <p className="text-ink/60 text-sm font-medium mt-1">
            Track your performance and manage your business.
          </p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <Link href="/vendor/products/new" className="px-4 py-2.5 rounded-full bg-ink hover:bg-brand-dark text-white text-sm font-bold transition-all shadow-md hover:-translate-y-0.5 flex items-center gap-2">
            <Plus size={16} /> Add Product
          </Link>
          <Link href="/vendor/products" className="px-4 py-2.5 rounded-full bg-card border border-brand-light hover:border-brand-light/80 hover:bg-white text-ink text-sm font-bold transition-all shadow-sm flex items-center gap-2">
            <List size={16} /> Inventory
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={TrendingUp} label="Total Revenue" value={`$${data.totalRevenue?.toFixed(2) || '0.00'}`} tint="#EEF2FF" highlightClass="text-blue-600" trend="+12%" />
        <StatCard icon={ShoppingBag} label="Units Sold" value={data.totalUnitsSold || 0} tint="#FEF3C7" highlightClass="text-amber-600" trend="+5%" />
        <StatCard icon={Package} label="Active Listings" value={data.productCount || 0} tint="#DCFCE7" highlightClass="text-green-600" />
        <StatCard icon={AlertTriangle} label="Low Stock Items" value={data.lowStockProducts?.length ?? 0} tint="#FCE7F3" highlightClass="text-rose-600" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 rounded-[2rem] bg-card border border-brand-light/70 p-6 sm:p-8 shadow-sm">
          <h2 className="font-black text-ink text-xl mb-6">Revenue by Day</h2>
          {chartData.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-ink/40 bg-brand-light/10 rounded-2xl border border-brand-light/50 border-dashed">
              <TrendingUp size={32} className="mb-2 opacity-50" />
              <p className="text-sm font-medium">No paid orders yet.</p>
            </div>
          ) : (
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="revenue" radius={[6, 6, 0, 0]} maxBarSize={50}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="var(--text-ink)" className="hover:opacity-80 transition-opacity" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Alerts / Tasks Sidebar */}
        <div className="space-y-6">
          {data.lowStockProducts?.length > 0 ? (
            <div className="rounded-[2rem] bg-rose-50/50 dark:bg-rose-900/10 border border-rose-200/60 p-6 shadow-sm">
              <h2 className="font-black text-ink text-lg mb-4 flex items-center gap-2">
                <div className="p-2 bg-rose-100 dark:bg-rose-900/40 rounded-xl text-rose-600"><AlertTriangle size={18} /></div>
                Running low
              </h2>
              <ul className="space-y-3">
                {data.lowStockProducts.map((p) => (
                  <li key={p.id} className="flex items-center justify-between bg-white dark:bg-card p-3 rounded-xl shadow-sm border border-brand-light/40">
                    <span className="text-sm font-semibold text-ink line-clamp-1">{p.name}</span>
                    <span className="text-xs font-bold bg-rose-100 text-rose-700 px-2 py-1 rounded-md shrink-0">
                      {p.stockCount} left
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/vendor/products" className="mt-4 inline-block text-sm font-bold text-rose-600 hover:text-rose-700 transition-colors animated-link">
                Manage inventory
              </Link>
            </div>
          ) : (
            <div className="rounded-[2rem] bg-green-50/50 dark:bg-green-900/10 border border-green-200/60 p-6 shadow-sm flex flex-col items-center justify-center text-center py-10">
              <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-2xl text-green-600 mb-3"><CheckCircle2 size={24} /></div>
              <h2 className="font-bold text-ink text-lg mb-1">Inventory healthy</h2>
              <p className="text-sm text-ink/60 font-medium">All your products are well stocked.</p>
            </div>
          )}

          <div className="rounded-[2rem] bg-card border border-brand-light/70 p-6 shadow-sm">
             <h2 className="font-black text-ink text-lg mb-4">Quick Links</h2>
             <div className="space-y-2">
               <Link href="/vendor/orders" className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-light/30 transition-colors group">
                 <div className="flex items-center gap-3 text-sm font-bold text-ink/80 group-hover:text-ink"><ShoppingBag size={16} className="text-brand/60 group-hover:text-brand" /> Manage Orders</div>
                 <ArrowUpRight size={14} className="text-brand/40 group-hover:text-brand" />
               </Link>
               <Link href="/vendor/stripe" className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-light/30 transition-colors group">
                 <div className="flex items-center gap-3 text-sm font-bold text-ink/80 group-hover:text-ink"><TrendingUp size={16} className="text-brand/60 group-hover:text-brand" /> Payouts & Stripe</div>
                 <ArrowUpRight size={14} className="text-brand/40 group-hover:text-brand" />
               </Link>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}

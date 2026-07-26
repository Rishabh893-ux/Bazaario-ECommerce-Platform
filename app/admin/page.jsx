"use client";

import { useState, useEffect } from "react";
import { Users, Store, DollarSign, ShoppingBag, Loader2 } from "lucide-react";
import RevenueChart from "./components/RevenueChart";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-extrabold text-ink mb-8">Platform Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-card p-6 rounded-2xl border border-brand-light shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-ink/60">Total Revenue</h3>
            <DollarSign size={20} className="text-brand" />
          </div>
          <p className="text-3xl font-black text-ink">${stats?.totalRevenue?.toFixed(2)}</p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-brand-light shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-ink/60">Total Orders</h3>
            <ShoppingBag size={20} className="text-brand" />
          </div>
          <p className="text-3xl font-black text-ink">{stats?.totalOrders}</p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-brand-light shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-ink/60">Registered Users</h3>
            <Users size={20} className="text-brand" />
          </div>
          <p className="text-3xl font-black text-ink">{stats?.totalUsers}</p>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-brand-light shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="text-sm font-semibold text-ink/60">Active Vendors</h3>
            <Store size={20} className="text-brand" />
          </div>
          <p className="text-3xl font-black text-ink relative z-10">{stats?.totalVendors}</p>
          
          {stats?.pendingVendors > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-amber-100 text-amber-800 text-xs font-bold py-1.5 px-6">
              {stats.pendingVendors} pending approval
            </div>
          )}
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="mb-10">
        <RevenueChart data={stats.revenueData} />
      </div>

      <h2 className="text-xl font-bold text-ink mb-4">Recent Orders</h2>
      <div className="bg-card rounded-2xl border border-brand-light shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-background border-b border-brand-light text-ink/60">
            <tr>
              <th className="px-6 py-4 font-semibold">Order ID</th>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-light">
            {stats?.recentOrders?.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center text-ink/50">No orders yet.</td>
              </tr>
            ) : (
              stats?.recentOrders?.map((order) => (
                <tr key={order.id} className="hover:bg-brand/5 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-brand">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-ink">{order.user.name}</div>
                    <div className="text-ink/50 text-xs">{order.user.email}</div>
                  </td>
                  <td className="px-6 py-4 text-ink/70">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-semibold text-ink">
                    ${order.total.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

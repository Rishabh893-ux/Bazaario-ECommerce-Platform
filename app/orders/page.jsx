"use client";

import { useEffect, useState } from "react";
import { Package, ChevronRight, ShoppingBag, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((r) => r.json())
      .then((d) => setOrders(d.orders ?? []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-background px-6 py-12 md:py-16 font-sans">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-3 mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="w-12 h-12 bg-card rounded-2xl shadow-sm border border-ink/5 flex items-center justify-center">
            <Package className="text-brand" size={24} />
          </div>
          <h1 className="text-3xl font-extrabold text-ink tracking-tight">My Orders</h1>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full h-32 bg-card rounded-3xl border border-ink/5 animate-pulse flex p-6 gap-4">
                <div className="w-16 h-16 bg-ink/5 rounded-xl"></div>
                <div className="flex-1 space-y-3 py-2">
                  <div className="w-1/3 h-4 bg-ink/5 rounded-full"></div>
                  <div className="w-1/4 h-4 bg-ink/5 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-card rounded-3xl shadow-sm border border-ink/5 p-12 text-center flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={40} className="text-ink/20" />
            </div>
            <h2 className="text-2xl font-bold text-ink mb-3">No orders yet</h2>
            <p className="text-ink/50 mb-8 max-w-sm">Looks like you haven't made your first purchase yet. Discover something amazing today!</p>
            <Link href="/" className="px-8 py-3.5 bg-brand text-white rounded-full font-semibold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 hover:-translate-y-0.5 inline-flex items-center gap-2">
              Start Shopping <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {orders.map((o) => (
              <Link 
                key={o.id} 
                href={`/orders/${o.id}`} 
                className="group block bg-card border border-ink/5 rounded-3xl p-6 md:p-8 hover:shadow-xl hover:shadow-brand/5 hover:border-brand/30 transition-all duration-300 relative overflow-hidden"
              >
                {/* Status Indicator */}
                <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: o.paymentStatus?.toUpperCase() === 'PAID' ? '#22c55e' : '#f97316' }}></div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-ink/50 bg-background px-2.5 py-1 rounded-md font-medium tracking-wide">
                        #{o.id.slice(-8).toUpperCase()}
                      </span>
                      <div className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide ${
                        o.paymentStatus?.toUpperCase() === 'PAID' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                      }`}>
                        {o.paymentStatus?.toUpperCase() === 'PAID' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                        {o.paymentStatus}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-ink leading-tight mb-2 group-hover:text-brand transition-colors">
                      {o.orderItems[0]?.product?.name || "Order Items"}
                      {o.orderItems.length > 1 && <span className="text-ink/40 font-medium ml-2 text-sm">+{o.orderItems.length - 1} more</span>}
                    </h3>
                    
                    <p className="text-sm text-ink/50">
                      {new Date(o.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:gap-4 border-t md:border-t-0 border-ink/5 pt-4 md:pt-0">
                    <p className="text-2xl font-black text-ink">
                      ${o.total.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-1 text-brand font-medium text-sm group-hover:translate-x-1 transition-transform">
                      View Receipt <ChevronRight size={16} />
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

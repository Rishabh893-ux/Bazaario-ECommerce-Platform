"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { CheckCircle2, ArrowLeft, Package, MapPin, ReceiptText } from "lucide-react";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => {
        setOrder(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  if (!order && !loading) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold text-ink mb-2">Order Not Found</h1>
        <p className="text-ink/60 mb-6">We couldn't locate this order in our system.</p>
        <Link href="/" className="px-6 py-3 bg-brand text-white rounded-full font-medium hover:bg-brand-dark transition-colors">
          Return to Home
        </Link>
      </main>
    );
  }

  let address = null;
  try {
    if (order.shippingAddress) address = JSON.parse(order.shippingAddress);
  } catch (e) {}

  return (
    <main className="min-h-screen bg-background px-6 py-12 md:py-20 font-sans">
      <div className="max-w-2xl mx-auto">
        
        {/* Success Header */}
        <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
            <CheckCircle2 size={40} className="text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {success ? "Payment Successful!" : "Order Details"}
          </h1>
          <p className="text-ink/60 text-lg max-w-md mx-auto">
            {success 
              ? "Thank you for your purchase. We're getting your order ready to be shipped."
              : "Here is the current status and breakdown of your order."}
          </p>
        </div>

        {/* Receipt Card */}
        <div className="bg-card rounded-3xl shadow-xl shadow-black/[0.03] overflow-hidden border border-ink/5 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          
          {/* Header Info */}
          <div className="bg-background p-6 md:p-8 border-b border-ink/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-ink/50 font-medium mb-1">Order Number</p>
              <p className="font-mono text-ink font-semibold tracking-wide">#{order.id.slice(-8).toUpperCase()}</p>
            </div>
            <div className="md:text-right">
              <p className="text-sm text-ink/50 font-medium mb-1">Status</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold tracking-wide ${
                order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {order.paymentStatus}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            
            {/* Items List */}
            <div className="mb-8">
              <h3 className="flex items-center text-lg font-bold text-ink mb-4 gap-2">
                <ReceiptText size={20} className="text-brand" />
                Order Summary
              </h3>
              <div className="space-y-4">
                {order.orderItems?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start pb-4 border-b border-dashed border-ink/10 last:border-0 last:pb-0">
                    <div>
                      <p className="font-semibold text-ink line-clamp-1">{item.product?.name || "Product"}</p>
                      <p className="text-sm text-ink/50 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-ink">${(item.priceAtSale * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="bg-background rounded-2xl p-5 space-y-3 mb-8">
              <div className="flex justify-between text-ink/70 text-sm font-medium">
                <span>Subtotal</span>
                <span>${order.subtotal?.toFixed(2)}</span>
              </div>
              {order.discountTotal > 0 && (
                <div className="flex justify-between text-green-600 text-sm font-medium">
                  <span>Discount</span>
                  <span>-${order.discountTotal?.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-ink/70 text-sm font-medium">
                <span>Shipping & Tax</span>
                <span>Calculated by Stripe</span>
              </div>
              <div className="pt-3 border-t border-ink/10 flex justify-between items-center mt-2">
                <span className="font-bold text-ink text-lg">Total Paid</span>
                <span className="font-black text-brand text-2xl">${order.total?.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Address */}
            {address && (
              <div>
                <h3 className="flex items-center text-lg font-bold text-ink mb-4 gap-2">
                  <MapPin size={20} className="text-brand" />
                  Shipping Details
                </h3>
                <div className="bg-card border border-ink/10 rounded-2xl p-5 text-sm text-ink/70 leading-relaxed shadow-sm">
                  <p className="font-semibold text-ink mb-1">{address.firstName} {address.lastName}</p>
                  <p>{address.line1}</p>
                  {address.line2 && <p>{address.line2}</p>}
                  <p>{address.city}, {address.state} {address.postal_code}</p>
                  <p>{address.country}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          <Link href="/" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brand text-white rounded-full font-semibold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 hover:shadow-brand/40 hover:-translate-y-0.5">
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>
        </div>

      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, ExternalLink, Store, TrendingUp, ShieldCheck } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function VendorOnboardingPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadStatus = () => {
    fetch("/api/vendor/stripe/onboard").then((r) => r.json()).then(setStatus);
  };

  useEffect(loadStatus, []);

  const startOnboarding = async () => {
    setLoading(true);
    const res = await fetch("/api/vendor/stripe/onboard", { method: "POST" });
    const data = await res.json();
    setLoading(false);
    if (data.url) window.location.href = data.url;
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-16">
          
          {/* Marketing Content */}
          <div className="flex-1">
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand font-bold text-sm mb-6 border border-brand/20">
              Vendly for Sellers
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-ink leading-tight mb-6">
              Turn your passion into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-dark">global business.</span>
            </h1>
            <p className="text-lg text-ink/60 mb-10 max-w-lg">
              Join thousands of independent creators and sellers. We handle the payments, checkout, and platform — you focus on creating amazing products.
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-brand/10 flex items-center justify-center shrink-0 text-brand">
                  <Store size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-ink text-lg">Your Own Storefront</h3>
                  <p className="text-ink/60 text-sm mt-1">Get a dedicated page for all your products, complete with your own branding.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-brand/10 flex items-center justify-center shrink-0 text-brand">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-ink text-lg">Reach Millions</h3>
                  <p className="text-ink/60 text-sm mt-1">Tap into Vendly's massive customer base and watch your sales skyrocket.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-brand/10 flex items-center justify-center shrink-0 text-brand">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-ink text-lg">Secure Payouts</h3>
                  <p className="text-ink/60 text-sm mt-1">Get paid out directly to your bank account securely via Stripe Connect.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Onboarding Card */}
          <div className="w-full max-w-md shrink-0">
            <div className="bg-card border-2 border-brand/10 rounded-[2rem] p-8 shadow-xl shadow-brand/5 relative overflow-hidden">
              {/* Card accent */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand to-brand-dark"></div>
              
              <h2 className="text-2xl font-extrabold text-ink mb-2 text-center mt-2">Get paid on Vendly</h2>
              <p className="text-sm text-ink/60 mb-8 text-center px-4">
                Connect your bank account securely via Stripe to start receiving payouts for your sales.
              </p>

              {status?.payoutsEnabled ? (
                <div className="flex flex-col items-center justify-center gap-3 p-6 bg-green-50 rounded-2xl border border-green-100">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
                    <CheckCircle2 size={24} />
                  </div>
                  <p className="text-green-800 font-bold text-center">Payouts are active</p>
                  <p className="text-xs text-green-600/80 text-center">You're all set to receive funds!</p>
                </div>
              ) : (
                <button
                  onClick={startOnboarding}
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-brand to-brand-dark hover:shadow-lg hover:shadow-brand/30 hover:-translate-y-1 transition-all disabled:opacity-60 text-white font-bold flex items-center justify-center gap-2"
                >
                  {loading ? "Redirecting to Stripe…" : "Connect with Stripe"} <ExternalLink size={18} />
                </button>
              )}

              {status && !status.payoutsEnabled && status.connected && (
                <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-3">
                  <p className="text-xs text-amber-800 font-medium leading-relaxed">
                    <strong>Almost there!</strong> Your account is created but onboarding isn't finished yet. Click the button above to complete it.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}

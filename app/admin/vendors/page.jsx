"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Store } from "lucide-react";

const STATUS_STYLES = {
  PENDING: "bg-accent/15 text-accent",
  APPROVED: "bg-green-100 text-green-700",
  SUSPENDED: "bg-red-100 text-red-700",
};

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("/api/admin/vendors")
      .then((r) => r.json())
      .then(setVendors)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const setStatus = async (vendorId, status) => {
    // Optimistic update — the queue shouldn't feel sluggish for a
    // decision an admin makes dozens of times a day.
    setVendors((v) => v.map((x) => (x.id === vendorId ? { ...x, status } : x)));
    await fetch("/api/admin/vendors", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vendorId, status }),
    });
  };

  return (
    <main className="min-h-screen bg-background px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold text-ink">Vendor approvals</h1>
      <p className="text-ink/50 text-sm mt-1">
        New stores wait here until you approve them — they can't list products until then.
      </p>

      <div className="mt-6 rounded-2xl bg-card border border-brand-light divide-y divide-brand-light">
        {loading ? (
          <div className="p-6 text-ink/40 text-sm">Loading vendors…</div>
        ) : vendors.length === 0 ? (
          <div className="p-6 text-ink/40 text-sm">No vendors yet.</div>
        ) : (
          vendors.map((v) => (
            <div key={v.id} className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-brand-light flex items-center justify-center">
                  <Store size={18} className="text-brand" />
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm">{v.storeName}</p>
                  <p className="text-xs text-ink/50">
                    {v.user?.name} · {v.user?.email} · {v._count?.products ?? 0} products
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[v.status]}`}>
                  {v.status}
                </span>
                {v.status !== "APPROVED" && (
                  <button
                    onClick={() => setStatus(v.id, "APPROVED")}
                    className="h-8 w-8 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center"
                    aria-label="Approve vendor"
                  >
                    <CheckCircle2 size={16} className="text-green-700" />
                  </button>
                )}
                {v.status !== "SUSPENDED" && (
                  <button
                    onClick={() => setStatus(v.id, "SUSPENDED")}
                    className="h-8 w-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center"
                    aria-label="Suspend vendor"
                  >
                    <XCircle size={16} className="text-red-700" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

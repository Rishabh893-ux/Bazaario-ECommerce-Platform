"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Package } from "lucide-react";

const emptyForm = { name: "", description: "", price: "", stockCount: "", sku: "" };

export default function VendorProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/vendor/products").then((r) => r.json()).then(setProducts).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const [imageUploading, setImageUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setForm({ ...form, images: [data.url] });
      } else {
        const data = await res.json();
        setError(data.error ?? "Failed to upload image");
      }
    } catch (err) {
      setError("Error uploading image");
    } finally {
      setImageUploading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        stockCount: parseInt(form.stockCount, 10),
        images: form.images ?? [],
      }),
    });
    setSaving(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Could not create product");
      return;
    }
    setForm(emptyForm);
    load();
  };

  const updateStock = async (id, stockCount) => {
    setProducts((p) => p.map((x) => (x.id === id ? { ...x, stockCount } : x)));
    await fetch(`/api/vendor/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stockCount }),
    });
  };

  const deactivate = async (id) => {
    setProducts((p) => p.filter((x) => x.id !== id));
    await fetch(`/api/vendor/products/${id}`, { method: "DELETE" });
  };

  return (
    <main className="min-h-screen bg-background px-6 py-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold text-ink mb-6">Your products</h1>

      <form onSubmit={handleCreate} className="bg-card border border-brand-light rounded-2xl p-5 mb-8">
        <h2 className="font-bold text-ink mb-4 flex items-center gap-2"><Plus size={18} /> List a new product</h2>
        {error && <p className="mb-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        <div className="grid sm:grid-cols-2 gap-3 mb-3">
          <input required placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="px-3 py-2 rounded-lg border border-brand-light text-sm" />
          <input required placeholder="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} className="px-3 py-2 rounded-lg border border-brand-light text-sm" />
          <input required type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="px-3 py-2 rounded-lg border border-brand-light text-sm" />
          <input required type="number" placeholder="Stock count" value={form.stockCount} onChange={(e) => setForm({ ...form, stockCount: e.target.value })} className="px-3 py-2 rounded-lg border border-brand-light text-sm" />
        </div>
        <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-brand-light text-sm mb-3" rows={2} />
        
        <div className="mb-3">
          <label className="block text-sm text-ink/70 mb-1">Product Image</label>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageUpload} className="block w-full text-sm text-ink/70 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand/10 file:text-brand hover:file:bg-brand/20" />
          {imageUploading && <p className="text-xs text-brand mt-1">Uploading image...</p>}
          {form.images?.[0] && (
            <div className="mt-2">
              <img src={form.images[0]} alt="Preview" className="h-20 w-20 object-cover rounded-lg border border-brand-light" />
            </div>
          )}
        </div>

        <button type="submit" disabled={saving || imageUploading} className="px-5 py-2 rounded-full bg-brand hover:bg-brand-dark text-white text-sm font-semibold">
          {saving ? "Saving…" : "Add product"}
        </button>
      </form>

      {loading ? (
        <p className="text-ink/40 text-sm">Loading…</p>
      ) : products.length === 0 ? (
        <p className="text-ink/40 text-sm">No products listed yet.</p>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center justify-between bg-card border border-brand-light rounded-2xl p-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-brand-light flex items-center justify-center flex-shrink-0">
                  <Package size={16} className="text-brand" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-ink text-sm truncate">{p.name}</p>
                  <p className="text-xs text-ink/50">${p.price.toFixed(2)} · SKU {p.sku}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={p.stockCount}
                  onChange={(e) => updateStock(p.id, parseInt(e.target.value || "0", 10))}
                  className="w-20 px-2 py-1.5 rounded-lg border border-brand-light text-sm text-center"
                />
                <button onClick={() => deactivate(p.id)} className="h-8 w-8 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center">
                  <Trash2 size={14} className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

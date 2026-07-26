"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { User, MapPin, Save, Loader2 } from "lucide-react";
import { useToast } from "@/app/components/Toast";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const showToast = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      window.location.href = "/login";
    }
  }, [status]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile")
        .then((r) => r.json())
        .then((data) => {
          setFormData({
            name: data.name || "",
            street: data.defaultAddress?.street || "",
            city: data.defaultAddress?.city || "",
            state: data.defaultAddress?.state || "",
            zip: data.defaultAddress?.zip || "",
            country: data.defaultAddress?.country || "",
          });
        })
        .finally(() => setLoading(false));
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      name: formData.name,
      defaultAddress: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
      }
    };

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast("Profile updated successfully!");
      } else {
        showToast("Failed to update profile", "error");
      }
    } catch (err) {
      showToast("An error occurred", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background px-6 py-12 md:py-20 font-sans">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-card rounded-2xl shadow-sm border border-ink/5 flex items-center justify-center">
              <User className="text-brand" size={24} />
            </div>
            <h1 className="text-3xl font-extrabold text-ink tracking-tight">My Profile</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-ink/5 rounded-3xl p-8 shadow-sm">
            <div className="space-y-8">
              {/* Personal Info */}
              <div>
                <h2 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                  <User size={18} className="text-brand" /> Personal Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-ink/70 mb-2">Email Address</label>
                    <input
                      type="email"
                      disabled
                      value={session?.user?.email || ""}
                      className="w-full px-4 py-3 bg-background border border-ink/10 rounded-xl text-ink/50 cursor-not-allowed"
                    />
                    <p className="text-xs text-ink/40 mt-1">Email cannot be changed.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-ink/70 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-background border border-ink/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-ink/10" />

              {/* Address */}
              <div>
                <h2 className="text-lg font-bold text-ink mb-4 flex items-center gap-2">
                  <MapPin size={18} className="text-brand" /> Default Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-ink/70 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      placeholder="123 Main St, Apt 4B"
                      className="w-full px-4 py-3 bg-background border border-ink/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand transition-all"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-semibold text-ink/70 mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="New York"
                        className="w-full px-4 py-3 bg-background border border-ink/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-ink/70 mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="NY"
                        className="w-full px-4 py-3 bg-background border border-ink/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-ink/70 mb-2">Zip Code</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        placeholder="10001"
                        className="w-full px-4 py-3 bg-background border border-ink/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-ink/70 mb-2">Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="United States"
                        className="w-full px-4 py-3 bg-background border border-ink/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 bg-brand text-white rounded-xl font-bold hover:bg-brand-dark hover:-translate-y-0.5 transition-all shadow-lg shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

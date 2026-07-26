"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
      return;
    }
    router.push("/login");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card border border-brand-light rounded-squircle p-8"
      >
        <h1 className="text-2xl font-extrabold text-ink mb-1">Create your account</h1>
        <p className="text-sm text-ink/50 mb-6">Shop across every vendor on Vendly.</p>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
        )}

        <label className="text-xs font-semibold text-ink/60">Name</label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full mt-1 mb-4 px-3 py-2 rounded-lg border border-brand-light focus:outline-none focus:ring-2 focus:ring-brand"
        />

        <label className="text-xs font-semibold text-ink/60">Email</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mt-1 mb-4 px-3 py-2 rounded-lg border border-brand-light focus:outline-none focus:ring-2 focus:ring-brand"
        />

        <label className="text-xs font-semibold text-ink/60">Password</label>
        <input
          type="password"
          required
          minLength={8}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mt-1 mb-6 px-3 py-2 rounded-lg border border-brand-light focus:outline-none focus:ring-2 focus:ring-brand"
        />

        <button
          type="submit"
          className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-2.5 rounded-lg transition-colors"
        >
          Create account
        </button>

        <p className="mt-5 text-center text-sm text-ink/50">
          Already have one? <a href="/login" className="text-brand font-medium">Log in</a>
        </p>
      </form>
    </main>
  );
}

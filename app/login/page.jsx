"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Set default tab based on URL query
  const [loginType, setLoginType] = useState("customer");
  
  useEffect(() => {
    if (searchParams.get("type") === "vendor") {
      setLoginType("vendor");
    }
  }, [searchParams]);

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    
    if (res?.error) {
      setError(res.error);
    } else {
      if (loginType === "vendor") {
        router.push("/vendor/dashboard");
      } else {
        router.push("/");
      }
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        
        {/* Login Type Tabs */}
        <div className="flex bg-card border border-brand/20 p-1 rounded-full mb-6 shadow-sm">
          <button
            onClick={() => setLoginType("customer")}
            className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${
              loginType === "customer"
                ? "bg-brand text-white shadow-md"
                : "text-ink/60 hover:bg-brand/5 hover:text-brand"
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setLoginType("vendor")}
            className={`flex-1 py-2 text-sm font-bold rounded-full transition-all ${
              loginType === "vendor"
                ? "bg-brand text-white shadow-md"
                : "text-ink/60 hover:bg-brand/5 hover:text-brand"
            }`}
          >
            Vendor
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-brand-light rounded-squircle p-8 shadow-sm"
        >
          <h1 className="text-2xl font-extrabold text-ink mb-1">
            {loginType === "vendor" ? "Vendor Portal" : "Welcome back"}
          </h1>
          <p className="text-sm text-ink/50 mb-6">
            {loginType === "vendor" ? "Log in to manage your storefront." : "Log in to your Vendly account."}
          </p>

          {error && (
            <p className="mb-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
          )}

          <label className="text-xs font-semibold text-ink/60">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full mt-1 mb-4 px-3 py-2 rounded-lg border border-brand-light focus:outline-none focus:ring-2 focus:ring-brand"
          />

          <label className="text-xs font-semibold text-ink/60">Password</label>
          <div className="flex justify-between items-center mt-1 mb-6">
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-brand-light focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
          <div className="flex justify-end mb-4 -mt-4">
            <a href="/forgot-password" className="text-xs text-brand font-medium hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-2.5 rounded-lg transition-colors mb-4 shadow-sm"
          >
            Log in {loginType === "vendor" && "as Vendor"}
          </button>

          <div className="relative flex items-center justify-center my-4">
            <div className="absolute border-t border-brand-light w-full"></div>
            <span className="relative bg-card px-3 text-xs text-ink/40 uppercase tracking-widest font-semibold">Or</span>
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: loginType === "vendor" ? "/vendor/dashboard" : "/" })}
            className="w-full bg-background border border-brand-light hover:bg-brand-light text-ink font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <p className="mt-5 text-center text-sm text-ink/50">
            No account? <a href="/register" className="text-brand font-medium">Sign up</a>
          </p>
        </form>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}

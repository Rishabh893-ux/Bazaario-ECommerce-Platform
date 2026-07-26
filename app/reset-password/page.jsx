"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setErrorMsg("Missing reset token");
      return;
    }

    setStatus("loading");
    
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to reset password");
      }
      
      setStatus("success");
      setTimeout(() => router.push("/login"), 3000);
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  if (!token) {
    return (
      <div className="w-full max-w-sm bg-card border border-brand-light rounded-squircle p-8 text-center">
        <h1 className="text-xl font-bold text-red-600 mb-2">Invalid Link</h1>
        <p className="text-sm text-ink/60 mb-6">This password reset link is invalid or missing the token.</p>
        <a href="/forgot-password" className="text-brand font-semibold">Request a new link</a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm bg-card border border-brand-light rounded-squircle p-8">
      <h1 className="text-2xl font-extrabold text-ink mb-1">Set New Password</h1>
      
      {status === "success" ? (
        <div className="text-center py-4">
          <p className="text-sm text-green-700 bg-green-50 p-4 rounded-lg font-medium mb-6">
            Password reset successfully! Redirecting to login...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className="text-sm text-ink/50 mb-6">Enter your new password below.</p>
          
          {status === "error" && (
            <p className="mb-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{errorMsg}</p>
          )}

          <label className="text-xs font-semibold text-ink/60">New Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 mb-6 px-3 py-2 rounded-lg border border-brand-light focus:outline-none focus:ring-2 focus:ring-brand"
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Updating..." : "Update Password"}
          </button>
        </form>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <Suspense fallback={<div className="text-sm text-ink/50">Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}

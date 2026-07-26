"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send reset email");
      }
      
      setStatus("success");
    } catch (err) {
      setErrorMsg(err.message);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm bg-card border border-brand-light rounded-squircle p-8">
        <h1 className="text-2xl font-extrabold text-ink mb-1">Reset Password</h1>
        
        {status === "success" ? (
          <div className="text-center py-4">
            <p className="text-sm text-green-700 bg-green-50 p-4 rounded-lg font-medium mb-6">
              If an account with that email exists, we have sent a password reset link.
            </p>
            <a href="/login" className="text-brand font-semibold text-sm hover:underline">Return to login</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-sm text-ink/50 mb-6">Enter your email address and we'll send you a link to reset your password.</p>
            
            {status === "error" && (
              <p className="mb-4 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{errorMsg}</p>
            )}

            <label className="text-xs font-semibold text-ink/60">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 mb-6 px-3 py-2 rounded-lg border border-brand-light focus:outline-none focus:ring-2 focus:ring-brand"
            />

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send Reset Link"}
            </button>
            
            <div className="mt-5 text-center">
              <a href="/login" className="text-sm text-ink/50 hover:text-brand font-medium">Back to login</a>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}

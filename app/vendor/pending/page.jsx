"use client";

import { useSession } from "next-auth/react";

export default function PendingVendorPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-card p-8 rounded-2xl shadow-sm text-center border border-brand/20">
        <svg
          className="w-16 h-16 mx-auto text-amber-500 mb-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-ink mb-2">Account Under Review</h1>
        <p className="text-ink/60 mb-6">
          Thank you for applying to be a vendor on Vendly! Your application is currently pending review by our administration team. This usually takes 1-2 business days.
        </p>
        <div className="bg-amber-50 text-amber-800 text-sm p-4 rounded-lg text-left">
          <strong>Note:</strong> You will not be able to access the vendor dashboard until your account is approved.
        </div>
        <a
          href="/"
          className="inline-block mt-6 px-6 py-2 bg-brand text-white font-medium rounded-lg hover:bg-brand-dark transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

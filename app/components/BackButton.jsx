"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Do not show on home page or if not mounted
  if (!mounted || pathname === "/") return null;

  const hasNavbar = ["/wishlist", "/vendor", "/profile", "/admin"].some(p => pathname.startsWith(p));
  const topClass = hasNavbar ? "top-24 md:top-28" : "top-6 md:top-8";
  const leftClass = pathname.startsWith("/admin") ? "left-6 md:left-[280px]" : "left-6 md:left-12";

  return (
    <button
      onClick={() => router.back()}
      className={`fixed ${topClass} ${leftClass} z-50 inline-flex items-center gap-2 text-ink/70 hover:text-ink transition-colors text-sm font-medium bg-card px-4 py-2 rounded-full border border-brand-light shadow-sm hover:shadow-md backdrop-blur-sm group`}
      aria-label="Go back"
    >
      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
      Go Back
    </button>
  );
}

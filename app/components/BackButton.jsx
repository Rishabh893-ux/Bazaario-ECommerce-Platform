"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

// Pages that have their own inline Back/breadcrumb navigation — skip the global button
const PAGES_WITH_OWN_BACK = ["/product/"];

// Pages that do NOT have a Navbar (so BackButton uses top-6 positioning)
const PAGES_WITHOUT_NAVBAR = ["/login", "/register", "/checkout"];

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Do not show on home page or if not mounted
  if (!mounted || pathname === "/") return null;

  // Don't show if the page has its own back navigation
  if (PAGES_WITH_OWN_BACK.some(p => pathname.startsWith(p))) return null;

  // Position: below navbar by default; at top for pages without navbar
  const hasNoNavbar = PAGES_WITHOUT_NAVBAR.some(p => pathname.startsWith(p));
  const topClass = hasNoNavbar ? "top-6 md:top-8" : "top-[76px] md:top-[80px]";
  const leftClass = pathname.startsWith("/admin") ? "left-6 md:left-[280px]" : "left-4 md:left-6";

  return (
    <button
      onClick={() => router.back()}
      className={`fixed ${topClass} ${leftClass} z-40 inline-flex items-center gap-2 text-ink/70 hover:text-ink transition-colors text-sm font-medium bg-card/90 backdrop-blur-md px-4 py-2 rounded-full border border-brand-light shadow-sm hover:shadow-md group`}
      aria-label="Go back"
    >
      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
      Go Back
    </button>
  );
}

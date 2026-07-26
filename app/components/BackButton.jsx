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

  return (
    <button
      onClick={() => router.back()}
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-12 h-12 bg-card text-ink rounded-full border border-brand-light shadow-lg hover:bg-brand/10 hover:text-brand transition-all hover:scale-105 active:scale-95 group"
      aria-label="Go back"
    >
      <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
    </button>
  );
}

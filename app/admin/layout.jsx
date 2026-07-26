"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, Users, LogOut, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || (session && session.user.role !== "ADMIN")) {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading" || !session || session.user.role !== "ADMIN") {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r border-brand-light p-6 hidden md:block">
          <div className="mb-8">
            <h2 className="text-sm font-bold text-ink/40 uppercase tracking-wider">Admin Panel</h2>
          </div>
          <nav className="space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-ink/70 hover:bg-brand/5 hover:text-brand font-medium transition-colors">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link href="/admin/vendors" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-ink/70 hover:bg-brand/5 hover:text-brand font-medium transition-colors">
              <Users size={18} />
              Vendors
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 sm:p-10">
          {children}
        </main>
      </div>
    </>
  );
}

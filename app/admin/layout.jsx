import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import Navbar from "../components/Navbar";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
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

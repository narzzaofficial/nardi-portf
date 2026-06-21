"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FolderKanban, Briefcase, Award, MessageSquareQuote, FileText, LogOut, Loader2 } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/articles", label: "Articles", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      if (pathname !== "/admin/login") {
        router.push("/admin/login");
      }
      return;
    }
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        } else {
          setLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)]">
        <Loader2 className="w-8 h-8 animate-spin text-[#4f8ef7]" />
      </div>
    );
  }

  // If on login page, don't show the dashboard layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans transition-colors duration-300" style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r flex flex-col transition-colors duration-300"
        style={{ borderColor: "var(--border)", background: "var(--bg-surface)" }}>
        <div className="p-6">
          <Link href="/admin" className="font-display font-bold text-xl tracking-tight">
            Nardi<span style={{ color: "var(--blue)" }}>.</span> Admin
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: isActive ? "rgba(59, 130, 246, 0.15)" : "transparent",
                  color: isActive ? "var(--blue)" : "var(--text-muted)",
                }}
              >
                <l.icon className="w-4 h-4" />
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t transition-colors duration-300" style={{ borderColor: "var(--border)" }}>
          <button 
            onClick={() => signOut(auth)}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors rounded-lg hover:bg-[rgba(248,113,113,0.1)] hover:text-[#f87171]"
            style={{ color: "var(--text-muted)" }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="p-6 md:p-10 max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

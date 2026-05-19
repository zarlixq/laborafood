"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FlaskConical, Newspaper, FileText, LogOut, Leaf } from "lucide-react";
import { signOut } from "@/app/actions/auth";

const navItems = [
  { href: "/admin",         label: "Paneli",   icon: LayoutDashboard, exact: true },
  { href: "/admin/samples", label: "Mostrat",  icon: FlaskConical },
  { href: "/admin/blog",    label: "Blog",     icon: Newspaper },
  { href: "/admin/quotes",  label: "Ofertat",  icon: FileText },
];

export default function AdminSidebar({ email }) {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex w-64 flex-col bg-ink text-white/80 fixed inset-y-0 left-0">
      <div className="px-6 py-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2 text-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-ink">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="font-serif text-lg font-semibold">LaboraFood</span>
        </Link>
        <div className="mt-1 text-xs text-white/50">Panel administrativ</div>
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                active ? "bg-brand text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-5 border-t border-white/10">
        <div className="text-xs text-white/50 mb-2 truncate">{email || ""}</div>
        <form action={signOut}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Dil
          </button>
        </form>
      </div>
    </aside>
  );
}

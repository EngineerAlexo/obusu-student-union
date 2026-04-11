"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, CalendarDays, LayoutDashboard, LogOut, Mail, Shield } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/announcements", label: "Announcements", icon: Bell },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out");
      router.push("/admin/login");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to logout";
      toast.error(message);
    }
  };

  return (
    <aside className="border-b bg-gradient-to-b from-primary via-blue-800 to-slate-900 text-white shadow-xl md:min-h-screen md:w-72 md:border-r md:border-b-0">
      <div className="flex h-full flex-col p-4 md:p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-lg bg-white/15 p-2 text-white">
            <Shield className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm text-white/70">OBUSU</p>
            <h2 className="text-base font-semibold">Admin Dashboard</h2>
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-white text-primary shadow"
                    : "text-white/80 hover:bg-white/15 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-4">
          <Button variant="secondary" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}

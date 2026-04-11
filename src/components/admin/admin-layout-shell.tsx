"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/context/auth-context";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

type AdminLayoutShellProps = {
  children: React.ReactNode;
};

export function AdminLayoutShell({ children }: AdminLayoutShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoadingAuth } = useAuth();

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoadingAuth && !user && !isLoginPage) {
      router.replace("/admin/login");
    }
    if (!isLoadingAuth && user && isLoginPage) {
      router.replace("/admin");
    }
  }, [isLoadingAuth, isLoginPage, router, user]);

  if (isLoadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Loading authentication...
      </div>
    );
  }

  if (isLoginPage) {
    return <div className="min-h-screen bg-muted/30">{children}</div>;
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
        Redirecting to login...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col md:flex-row">
        <AdminSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

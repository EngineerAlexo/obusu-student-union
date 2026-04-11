import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteShell } from "@/components/layout/site-shell";
import { Toaster } from "@/components/ui/sonner";
import { AdminDataProvider } from "@/context/admin-data-context";
import { AuthProvider } from "@/context/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OBUSU - Student Union",
  description: "Modern student union platform for announcements, events, and student services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <AdminDataProvider>
            <SiteShell>{children}</SiteShell>
            <Toaster richColors position="top-right" />
          </AdminDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

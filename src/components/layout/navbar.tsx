"use client";

import Link from "next/link";
import { Menu, School } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { navLinks } from "@/lib/site-data";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="rounded-lg bg-primary p-2 text-primary-foreground shadow">
            <School className="h-4 w-4" />
          </span>
          <span>
            <span className="block text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Student Union
            </span>
            <span className="block text-lg font-semibold leading-none">OBUSU</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={buttonVariants({
              size: "sm",
              className: "hidden sm:inline-flex shadow-sm",
            })}
          >
            Join Union
          </Link>
          <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

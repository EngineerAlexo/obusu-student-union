import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { navLinks } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-primary text-primary-foreground">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h3 className="text-lg font-semibold">OBUSU Student Union</h3>
          <p className="mt-2 max-w-sm text-sm text-primary-foreground/80">
            Organizing opportunities, support, and leadership experiences for every student.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/80">
            Quick Links
          </h4>
          <div className="mt-3 grid gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-primary-foreground/90 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-primary-foreground/80">
            Contact
          </h4>
          <div className="mt-3 space-y-2 text-sm text-primary-foreground/90">
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              OBUSU Secretariat, Main Campus
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              +233 20 000 0000
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              info@obusu.edu
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-xs text-primary-foreground/70 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} OBUSU. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

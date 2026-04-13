"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Menu, School } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { NAV_MENU } from "@/lib/navigation-config";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mobileAccordionId, setMobileAccordionId] = useState<string | null>(null);

  const closeMobile = () => {
    setIsMobileOpen(false);
    setMobileAccordionId(null);
  };

  const dropdownPanelClass = (itemCount: number) =>
    cn(
      "rounded-xl border border-border/60 bg-white text-foreground shadow-lg dark:bg-card",
      itemCount > 6 ? "min-w-[min(100vw-2rem,420px)] p-3" : "min-w-[220px] p-2",
    );

  const gridClass = (itemCount: number) =>
    itemCount > 6 ? "grid grid-cols-1 gap-0.5 sm:grid-cols-2 sm:gap-x-4" : "flex flex-col gap-0.5";

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-background shadow-sm">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2" onClick={closeMobile}>
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
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-expanded={isMobileOpen}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMobileOpen((current) => !current)}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Desktop mega menu */}
      <div className="hidden bg-primary md:block">
        <nav
          className="mx-auto flex h-12 w-full max-w-6xl items-center gap-1 overflow-x-auto px-4 sm:px-6 lg:gap-2 lg:px-8 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/30"
          aria-label="Primary"
        >
          {NAV_MENU.map((section) => (
            <div
              key={section.id}
              className="relative shrink-0"
              onMouseEnter={() => setHoveredId(section.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link
                href={section.href}
                className="inline-flex items-center gap-1 whitespace-nowrap px-2 py-3 text-sm font-medium text-white/90 transition-colors hover:text-white lg:px-3"
              >
                {section.label}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 opacity-90 transition-transform duration-200 ease-out",
                    hoveredId === section.id && "rotate-180",
                  )}
                  aria-hidden
                />
              </Link>

              <AnimatePresence>
                {hoveredId === section.id ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                    className="pointer-events-auto absolute left-0 top-full z-50 pt-2"
                  >
                    <div className={dropdownPanelClass(section.items.length)}>
                      <div className={gridClass(section.items.length)}>
                        {section.items.map((item) => (
                          <Link
                            key={`${section.id}-${item.label}`}
                            href={item.href}
                            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                          >
                            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile accordion */}
      <AnimatePresence>
        {isMobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-t bg-card md:hidden"
          >
            <nav className="max-h-[min(80vh,calc(100dvh-5rem))] space-y-2 overflow-y-auto p-3" aria-label="Mobile primary">
              {NAV_MENU.map((section) => {
                const isExpanded = mobileAccordionId === section.id;
                return (
                  <div key={section.id} className="overflow-hidden rounded-xl border border-border/60 bg-muted/20">
                    <div className="flex items-stretch gap-0">
                      <Link
                        href={section.href}
                        className="flex flex-1 items-center px-3 py-3 text-sm font-semibold text-foreground"
                        onClick={closeMobile}
                      >
                        {section.label}
                      </Link>
                      <button
                        type="button"
                        className="flex items-center justify-center border-l border-border/50 px-3 text-muted-foreground transition-colors hover:bg-muted"
                        aria-expanded={isExpanded}
                        aria-controls={`mobile-submenu-${section.id}`}
                        onClick={() =>
                          setMobileAccordionId((current) => (current === section.id ? null : section.id))
                        }
                      >
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform duration-200", isExpanded && "rotate-180")}
                        />
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {isExpanded ? (
                        <motion.div
                          id={`mobile-submenu-${section.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="border-t border-border/50 bg-background/80"
                        >
                          <div className="space-y-0.5 p-2">
                            {section.items.map((item) => (
                              <Link
                                key={`${section.id}-${item.label}`}
                                href={item.href}
                                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                                onClick={closeMobile}
                              >
                                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

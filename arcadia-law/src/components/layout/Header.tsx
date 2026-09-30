"use client";

import Link from "next/link";
import { Menu, X, Gavel } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Attorneys", href: "/attorneys" },
  { label: "Insights", href: "/insights" },
  { label: "Case Results", href: "/case-results" },
  { label: "Intake", href: "/intake" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground transition-colors group-hover:bg-accent">
            <Gavel className="h-4 w-4" />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            Arcadia<span className="text-accent ml-0.5">Law</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm" render={<Link href="/intake" />}>
            Start a Matter
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col gap-1 pt-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 px-3">
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm" render={<Link href="/intake" />}>
                  Start a Matter
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
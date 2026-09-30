import Link from "next/link";
import { Gavel, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[oklch(0.12_0.03_255)] text-white">
      <div className="container mx-auto px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded bg-accent text-accent-foreground">
                <Gavel className="h-3.5 w-3.5" />
              </div>
              <span className="text-lg font-semibold text-white">
                Arcadia<span className="text-accent ml-0.5">Law</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              A modern corporate law firm. Precise counsel. Clear strategy.
              Predictable results.
            </p>
            <div className="mt-4 flex gap-3">
              <Link
                href="/intake"
                className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors font-medium uppercase tracking-wider"
              >
                Start a Matter
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Practice Areas", href: "/practice-areas" },
                { label: "Attorneys", href: "/attorneys" },
                { label: "Insights", href: "/insights" },
                { label: "Case Results", href: "/case-results" },
                { label: "Intake Wizard", href: "/intake" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Services
            </h3>
            <ul className="space-y-2.5">
              {[
                "Corporate Law",
                "Mergers & Acquisitions",
                "Intellectual Property",
                "Commercial Litigation",
                "Real Estate",
              ].map((area) => (
                <li key={area}>
                  <Link
                    href="/practice-areas"
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>200 Park Avenue, Suite 2500<br />New York, NY 10166</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <span>(212) 555-0900</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <span>info@arcadialaw.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} Arcadia Law PC. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-white/40">
            <Link href="/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
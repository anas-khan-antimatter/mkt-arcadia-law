import Link from "next/link";
import { Scale, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Scale className="h-5 w-5 text-amber-600" />
              <span className="text-lg font-semibold">
                Arcadia<span className="text-amber-600">Law</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              A modern corporate law firm built for the way business works today.
              Trusted counsel. Clear strategy. Real results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Practice Areas", href: "/practice-areas" },
                { label: "Attorneys", href: "/attorneys" },
                { label: "Insights", href: "/insights" },
                { label: "Case Results", href: "/case-results" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Practice Areas
            </h3>
            <ul className="space-y-2">
              {[
                "Corporate Law",
                "Mergers & Acquisitions",
                "Intellectual Property",
                "Litigation",
                "Real Estate",
              ].map((area) => (
                <li key={area}>
                  <Link
                    href="/practice-areas"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span>200 Park Avenue, Suite 2500<br />New York, NY 10166</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0 text-amber-600" />
                <span>(212) 555-0900</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 text-amber-600" />
                <span>info@arcadialaw.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Arcadia Law PC. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
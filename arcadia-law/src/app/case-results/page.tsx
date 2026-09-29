import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Award, TrendingUp, ShieldCheck, Scale } from "lucide-react";
import Link from "next/link";

const caseResults = [
  {
    title: "Landmark Securities Fraud Defense",
    outcome: "Defense Verdict",
    client: "Fortune 500 Financial Services Firm",
    value: "$2.3B at issue",
    description:
      "Represented a major financial institution in a multi-billion-dollar securities class action alleging misrepresentation in mortgage-backed securities offerings. After a six-week trial, the jury returned a complete defense verdict on all claims.",
    attorney: "David Okonkwo",
    tags: ["Litigation", "Securities", "Trial"],
    icon: Scale,
  },
  {
    title: "Cross-Border Acquisition of Tech Platform",
    outcome: "Successful Closing",
    client: "Private Equity Firm",
    value: "$875M transaction",
    description:
      "Led end-to-end M&A counsel for a PE sponsor acquiring a European SaaS platform. Managed multi-jurisdictional due diligence, structured complex earn-out provisions, and navigated CFIUS review — all completed within an aggressive 90-day timeline.",
    attorney: "Aisha Khan",
    tags: ["M&A", "Cross-Border", "Private Equity"],
    icon: TrendingUp,
  },
  {
    title: "Patent Portfolio Enforcement Against Competitor",
    outcome: "Settlement + Licensing",
    client: "Medical Device Manufacturer",
    value: "$340M settlement",
    description:
      "Enforced a portfolio of medical device patents against a Fortune 500 competitor. Following claim construction favorable to our client, the defendant agreed to a $340 million settlement plus ongoing licensing royalties.",
    attorney: "Elena Vasquez",
    tags: ["IP", "Patent Litigation", "Licensing"],
    icon: ShieldCheck,
  },
  {
    title: "Commercial Real Estate Development Joint Venture",
    outcome: "Transaction Closed",
    client: "Major Real Estate Developer",
    value: "$1.2B mixed-use project",
    description:
      "Structured a complex joint venture between a real estate developer and an institutional investor for a $1.2 billion mixed-use development in downtown Chicago. Negotiated tax increment financing, environmental remediation agreements, and phased leasing structures.",
    attorney: "Michael Torres",
    tags: ["Real Estate", "Joint Venture", "Development"],
    icon: Award,
  },
  {
    title: "Executive Non-Compete Defense",
    outcome: "Injunction Denied + Damages",
    client: "Technology Executive",
    value: "$12.5M",
    description:
      "Defended a C-level executive against a multi-state non-compete enforcement action brought by a former employer. Successfully opposed the preliminary injunction motion and secured a $12.5 million settlement for lost compensation and legal fees.",
    attorney: "Sarah Park",
    tags: ["Employment", "Non-Compete", "Executive"],
    icon: Scale,
  },
  {
    title: "Multi-National Corporate Governance Review",
    outcome: "Compliance Program Implemented",
    client: "Publicly Traded Manufacturer",
    value: "Regulatory exposure mitigated",
    description:
      "Conducted a comprehensive corporate governance review for a public company facing SEC scrutiny. Recommended and implemented enhanced compliance protocols, board committee restructuring, and disclosure improvements — resulting in no enforcement action.",
    attorney: "Aisha Khan",
    tags: ["Corporate Governance", "Compliance", "SEC"],
    icon: ShieldCheck,
  },
];

export default function CaseResultsPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-950 via-slate-900 to-zinc-900 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Badge className="mb-4 border-amber-600/40 bg-amber-600/10 text-amber-400 text-xs tracking-widest uppercase">
            Track Record
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Case Results
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-400">
            Our work speaks for itself. Every engagement is a partnership
            aimed at achieving the best possible outcome, whether in the
            courtroom, the boardroom, or the negotiating table.
          </p>
        </div>
      </section>

      {/* Results grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {caseResults.map((result) => {
              const Icon = result.icon;
              return (
                <Card
                  key={result.title}
                  className="flex flex-col transition-all hover:shadow-lg hover:border-amber-600/30"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-600/10 text-amber-600 shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge className="bg-amber-600/15 text-amber-700 border-0">
                        {result.outcome}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-3">
                      {result.title}
                    </CardTitle>
                    <CardDescription className="text-xs uppercase tracking-wider font-medium">
                      {result.client}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="rounded-md bg-muted px-2 py-1 text-xs font-semibold text-foreground">
                        {result.value}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        • Led by {result.attorney}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {result.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {result.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center md:px-6">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Want to discuss how we can help with your case?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            Results depend on the specific facts of each case. We&apos;d be
            glad to discuss your situation in a confidential consultation.
          </p>
          <div className="mt-6">
            <Button
              asChild
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Link href="/contact">
                Schedule a Confidential Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
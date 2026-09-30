"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Award,
  TrendingUp,
  ShieldCheck,
  Scale,
  Gavel,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

interface CaseResult {
  title: string;
  outcome: string;
  client: string;
  value: string;
  description: string;
  attorney: string;
  industry: string;
  year: number;
  tags: string[];
  icon: typeof Scale;
}

const caseResults: CaseResult[] = [
  {
    title: "Landmark Securities Fraud Defense",
    outcome: "Defense Verdict",
    client: "Fortune 500 Financial Services Firm",
    value: "$2.3B at issue",
    description:
      "Represented a major financial institution in a multi-billion-dollar securities class action. After a six-week trial, the jury returned a complete defense verdict on all claims.",
    attorney: "David Okonkwo",
    industry: "Financial Services",
    year: 2024,
    tags: ["Litigation", "Securities", "Trial"],
    icon: Scale,
  },
  {
    title: "Cross-Border Acquisition of Tech Platform",
    outcome: "Successful Closing",
    client: "Private Equity Firm",
    value: "$875M transaction",
    description:
      "Led end-to-end M&A counsel for a PE sponsor acquiring a European SaaS platform. Managed multi-jurisdictional due diligence and CFIUS review within a 90-day timeline.",
    attorney: "Aisha Khan",
    industry: "Technology",
    year: 2024,
    tags: ["M&A", "Cross-Border", "Private Equity"],
    icon: TrendingUp,
  },
  {
    title: "Patent Portfolio Enforcement Against Competitor",
    outcome: "Settlement & Licensing",
    client: "Medical Device Manufacturer",
    value: "$340M settlement",
    description:
      "Enforced a portfolio of medical device patents against a Fortune 500 competitor. Following claim construction favorable to our client, the defendant agreed to a $340M settlement plus ongoing royalties.",
    attorney: "Elena Vasquez",
    industry: "Healthcare",
    year: 2023,
    tags: ["IP", "Patent Litigation", "Licensing"],
    icon: ShieldCheck,
  },
  {
    title: "Commercial Real Estate Development JV",
    outcome: "Transaction Closed",
    client: "Major Real Estate Developer",
    value: "$1.2B mixed-use project",
    description:
      "Structured a complex joint venture for a $1.2 billion mixed-use development. Negotiated tax increment financing, environmental remediation, and phased leasing structures.",
    attorney: "Michael Torres",
    industry: "Real Estate",
    year: 2025,
    tags: ["Real Estate", "Joint Venture", "Development"],
    icon: Award,
  },
  {
    title: "Executive Non-Compete Defense",
    outcome: "Injunction Denied & Damages",
    client: "Technology Executive",
    value: "$12.5M recovery",
    description:
      "Defended a C-level executive against a multi-state non-compete enforcement action. Successfully opposed the preliminary injunction and secured a $12.5M settlement.",
    attorney: "Sarah Park",
    industry: "Technology",
    year: 2024,
    tags: ["Employment", "Non-Compete", "Executive"],
    icon: Scale,
  },
  {
    title: "Multi-National Corporate Governance Review",
    outcome: "Compliance Program Implemented",
    client: "Publicly Traded Manufacturer",
    value: "Regulatory exposure mitigated",
    description:
      "Conducted a comprehensive corporate governance review facing SEC scrutiny. Implemented enhanced compliance protocols resulting in no enforcement action.",
    attorney: "Aisha Khan",
    industry: "Manufacturing",
    year: 2025,
    tags: ["Corporate Governance", "Compliance", "SEC"],
    icon: ShieldCheck,
  },
  {
    title: "Healthcare Merger Clearance",
    outcome: "Regulatory Approval",
    client: "Regional Health System",
    value: "$2.8B transaction",
    description:
      "Navigated FTC merger review and state regulatory approvals for a healthcare system merger. Successfully defended against a preliminary injunction challenge.",
    attorney: "Aisha Khan",
    industry: "Healthcare",
    year: 2023,
    tags: ["M&A", "Regulatory", "Antitrust"],
    icon: TrendingUp,
  },
  {
    title: "Fintech Patent Defense",
    outcome: "Summary Judgment",
    client: "Payments Technology Company",
    value: "$520M exposure avoided",
    description:
      "Obtained summary judgment of non-infringement in a patent case involving core payments technology. The court adopted our claim construction arguments in full.",
    attorney: "Elena Vasquez",
    industry: "Financial Services",
    year: 2024,
    tags: ["IP", "Patent Litigation", "Tech"],
    icon: ShieldCheck,
  },
  {
    title: "Class Action Wage & Hour Defense",
    outcome: "Decertification Granted",
    client: "National Retail Chain",
    value: "$185M exposure reduced",
    description:
      "Successfully decertified a nationwide class action involving wage and hour claims. Obtained favorable ruling on summary judgment, reducing exposure from class-wide to individual claims.",
    attorney: "David Okonkwo",
    industry: "Retail",
    year: 2023,
    tags: ["Litigation", "Employment", "Class Action"],
    icon: Gavel,
  },
];

const allIndustries = [...new Set(caseResults.map((r) => r.industry))].sort();
const allYears = [...new Set(caseResults.map((r) => r.year))].sort((a, b) => b - a);
const allOutcomes = [...new Set(caseResults.map((r) => r.outcome))].sort();

export default function CaseResultsPage() {
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [yearFilter, setYearFilter] = useState<number | "">("");
  const [outcomeFilter, setOutcomeFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return caseResults.filter((r) => {
      if (search && !r.title.toLowerCase().includes(search.toLowerCase()) && !r.client.toLowerCase().includes(search.toLowerCase())) return false;
      if (industryFilter && r.industry !== industryFilter) return false;
      if (yearFilter !== "" && r.year !== yearFilter) return false;
      if (outcomeFilter && r.outcome !== outcomeFilter) return false;
      return true;
    });
  }, [search, industryFilter, yearFilter, outcomeFilter]);

  const clearFilters = () => {
    setSearch("");
    setIndustryFilter("");
    setYearFilter("");
    setOutcomeFilter("");
  };

  const hasActiveFilters = search || industryFilter || yearFilter !== "" || outcomeFilter;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[oklch(0.08_0.03_255)] scan-line py-16 md:py-20">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Badge className="mb-4 border-accent/30 bg-accent/10 text-accent text-[11px] tracking-[0.2em] uppercase font-mono">
            Proven Outcomes
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Case Results
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/55 font-mono text-[15px]">
            A selection of representative matters across our practice groups.
            Every result is specific to its facts and circumstances.
          </p>
        </div>
      </section>

      {/* Filters & Results */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {/* Search bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search cases by title or client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 font-mono text-[14px]"
              />
            </div>
          </div>

          {/* Filter toggles */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-xs font-mono"
            >
              <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
              Filters
            </Button>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs font-mono text-muted-foreground"
              >
                <X className="mr-1 h-3 w-3" /> Clear all
              </Button>
            )}
            <span className="text-xs text-muted-foreground font-mono ml-auto">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Filter chips */}
          {showFilters && (
            <div className="mb-8 flex flex-wrap gap-3 rounded-xl border border-border bg-card p-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Industry</label>
                <select
                  value={industryFilter}
                  onChange={(e) => setIndustryFilter(e.target.value)}
                  className="h-9 rounded-lg border border-border bg-background px-3 text-sm font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="">All Industries</option>
                  {allIndustries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Year</label>
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value ? Number(e.target.value) : "")}
                  className="h-9 rounded-lg border border-border bg-background px-3 text-sm font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="">All Years</option>
                  {allYears.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Result Type</label>
                <select
                  value={outcomeFilter}
                  onChange={(e) => setOutcomeFilter(e.target.value)}
                  className="h-9 rounded-lg border border-border bg-background px-3 text-sm font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value="">All Outcomes</option>
                  {allOutcomes.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="space-y-6">
            {filtered.length === 0 ? (
              <Card className="border-border">
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground font-mono text-[15px]">No matching cases found. Try adjusting your filters.</p>
                  <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4 font-mono text-xs">
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filtered.map((result) => {
                const Icon = result.icon;
                return (
                  <Card key={result.title} className="border-border group hover:border-accent/20 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-accent group-hover:bg-accent/10 transition-colors">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-primary">
                              {result.title}
                            </CardTitle>
                            <CardDescription className="font-mono text-[13px] mt-0.5">
                              {result.client} · {result.attorney}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge className="shrink-0 border-accent/30 bg-accent/10 text-accent text-[10px] tracking-[0.15em] uppercase font-mono whitespace-nowrap">
                          {result.outcome}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground leading-relaxed font-mono text-[13px]">
                        {result.description}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                        <span className="font-mono text-accent font-semibold">{result.value}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="font-mono text-muted-foreground">{result.industry}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="font-mono text-muted-foreground">{result.year}</span>
                        <div className="flex flex-wrap gap-1.5 ml-auto">
                          {result.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[10px] font-mono text-muted-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
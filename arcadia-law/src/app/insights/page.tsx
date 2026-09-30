"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  Clock,
  Search,
  User,
  X,
} from "lucide-react";
import Link from "next/link";

const articles = [
  {
    slug: "delaware-2025-corporate-law-updates",
    title: "Delaware Corporate Law Updates Every Board Should Know in 2025",
    excerpt:
      "Recent amendments to the Delaware General Corporation Law introduce significant changes to stockholder rights, fiduciary duties, and board practices.",
    author: "Aisha Khan",
    date: "March 15, 2025",
    readTime: "6 min read",
    category: "Corporate Law",
  },
  {
    slug: "ai-intellectual-property-strategy",
    title: "Building an IP Strategy for AI-Generated Works",
    excerpt:
      "As courts and the USPTO grapple with AI authorship questions, companies need proactive IP strategies.",
    author: "Elena Vasquez",
    date: "March 8, 2025",
    readTime: "8 min read",
    category: "Intellectual Property",
  },
  {
    slug: "ma-trends-2025",
    title: "M&A Outlook 2025: Key Trends Shaping Dealmaking",
    excerpt:
      "From regulatory shifts to valuation dynamics, the M&A landscape is evolving rapidly.",
    author: "Aisha Khan",
    date: "February 22, 2025",
    readTime: "10 min read",
    category: "Mergers & Acquisitions",
  },
  {
    slug: "non-compete-enforcement-2025",
    title: "Non-Compete Enforcement After the FTC Rule",
    excerpt:
      "With the FTC's non-compete rule vacated by federal courts, employers face renewed uncertainty.",
    author: "Sarah Park",
    date: "February 10, 2025",
    readTime: "5 min read",
    category: "Employment & Labor",
  },
  {
    slug: "commercial-real-estate-opportunity-zone",
    title: "Opportunity Zone Investments: Tax Strategies for CRE",
    excerpt:
      "Qualified Opportunity Funds remain a powerful vehicle for commercial real estate investors.",
    author: "Michael Torres",
    date: "January 28, 2025",
    readTime: "7 min read",
    category: "Real Estate",
  },
  {
    slug: "shareholder-litigation-trends",
    title: "Shareholder Litigation in 2025: What to Watch",
    excerpt:
      "Derivative suits, M&A challenges, and Section 220 demands are on the rise.",
    author: "David Okonkwo",
    date: "January 15, 2025",
    readTime: "9 min read",
    category: "Litigation",
  },
  {
    slug: "private-credit-regulation-2025",
    title: "Private Credit Regulation: What Borrowers Should Know",
    excerpt:
      "As private credit markets surpass $2 trillion, regulatory scrutiny is intensifying.",
    author: "Aisha Khan",
    date: "December 18, 2024",
    readTime: "7 min read",
    category: "Corporate Law",
  },
  {
    slug: "data-privacy-compliance",
    title: "Data Privacy Compliance: State Law Patchwork in 2025",
    excerpt:
      "With 15+ state privacy laws now in effect, companies need a unified compliance strategy.",
    author: "Elena Vasquez",
    date: "December 5, 2024",
    readTime: "6 min read",
    category: "Intellectual Property",
  },
];

const allCategories = [...new Set(articles.map((a) => a.category))].sort();

export default function InsightsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.excerpt.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoryFilter && a.category !== categoryFilter) return false;
      return true;
    });
  }, [search, categoryFilter]);

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("");
  };

  const hasFilters = search || categoryFilter;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[oklch(0.08_0.03_255)] scan-line py-16 md:py-20">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <Badge className="mb-4 border-accent/30 bg-accent/10 text-accent text-[11px] tracking-[0.2em] uppercase font-mono">
            News & Resources
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Insights
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/55 font-mono text-[15px]">
            Analysis, updates, and practical guidance from the attorneys at
            Arcadia Law. Search by keyword or filter by practice area.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-12 md:py-8">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search insights by title or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 font-mono text-[14px]"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="h-10 rounded-lg border border-border bg-background px-3 text-sm font-mono text-[13px] focus:outline-none focus:ring-1 focus:ring-accent sm:w-52"
            >
              <option value="">All Practice Areas</option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs font-mono text-muted-foreground shrink-0"
              >
                <X className="mr-1 h-3 w-3" /> Clear
              </Button>
            )}
          </div>
          <p className="mt-3 text-xs text-muted-foreground font-mono">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          {filtered.length === 0 ? (
            <Card className="border-border">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground font-mono text-[15px]">No articles found matching your search.</p>
                <Button variant="outline" size="sm" onClick={clearFilters} className="mt-4 font-mono text-xs">
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((article) => (
                <Link key={article.slug} href={`/insights/${article.slug}`} className="group">
                  <Card className="h-full border-border transition-all group-hover:border-accent/30 group-hover:shadow-sm">
                    <CardHeader>
                      <Badge variant="outline" className="w-fit border-accent/20 text-accent text-[10px] tracking-[0.15em] uppercase font-mono mb-2">
                        {article.category}
                      </Badge>
                      <CardTitle className="text-base text-primary leading-snug group-hover:text-accent transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 font-mono text-[13px] mt-1">
                        {article.excerpt}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

  // Empty state for CardContent
  return null;
}

// Need CardContent — already imported above